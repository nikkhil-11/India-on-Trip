import type { Lead } from "@/types/lead";
import {
  isTemplateField,
  leadTemplateParams,
  leadWhatsAppText,
  type TemplateField,
} from "./leadMessage";

/**
 * Server-side WhatsApp delivery for new enquiries.
 *
 * Who the message goes to and which service carries it are both environment
 * driven, so the business can start on the free CallMeBot relay and move to the
 * official Meta Cloud API later without touching this code.
 *
 * Nothing here ever runs in the browser: the module is imported only by
 * `/api/leads`, and every credential it reads is a server-only variable.
 */

export type WhatsAppProvider = "callmebot" | "meta" | "twilio" | "webhook";

const PROVIDERS: WhatsAppProvider[] = ["callmebot", "meta", "twilio", "webhook"];

export type SendResult =
  /** Delivered — `provider` is whichever service accepted it. */
  | { ok: true; provider: WhatsAppProvider }
  /** Nothing configured. Not an error: the site is simply not wired up yet. */
  | { ok: false; skipped: true; reason: string }
  | { ok: false; skipped?: false; provider: WhatsAppProvider; error: string };

const TIMEOUT_MS = 8000;
const ATTEMPTS = 2;

function env(name: string): string {
  return (process.env[name] ?? "").trim();
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * The business number that receives enquiry alerts. `LEAD_WHATSAPP_TO` wins so
 * alerts can be routed to a different handset than the public CTA number, but
 * falls back to the public number — one variable is enough for most setups.
 */
export function leadRecipient(): string {
  return (
    digitsOnly(env("LEAD_WHATSAPP_TO")) ||
    digitsOnly(env("NEXT_PUBLIC_WHATSAPP_NUMBER"))
  );
}

/**
 * Picks the provider. An explicit `WHATSAPP_PROVIDER` always wins; otherwise the
 * first provider whose credentials are present is used, so adding a token is
 * all it takes to switch.
 */
export function resolveProvider(): WhatsAppProvider | null {
  const explicit = env("WHATSAPP_PROVIDER").toLowerCase();
  if (explicit) {
    if ((PROVIDERS as string[]).includes(explicit)) return explicit as WhatsAppProvider;
    console.error(
      `[whatsapp] unknown WHATSAPP_PROVIDER "${explicit}" — expected one of ${PROVIDERS.join(", ")}`,
    );
    return null;
  }

  if (env("WHATSAPP_CLOUD_TOKEN") && env("WHATSAPP_PHONE_NUMBER_ID")) return "meta";
  if (env("TWILIO_ACCOUNT_SID") && env("TWILIO_AUTH_TOKEN") && env("TWILIO_WHATSAPP_FROM"))
    return "twilio";
  if (env("CALLMEBOT_API_KEY")) return "callmebot";
  if (env("WHATSAPP_WEBHOOK_URL")) return "webhook";
  return null;
}

/** True when a provider and a recipient are both configured. */
export function whatsappNotifyConfigured(): boolean {
  return resolveProvider() !== null && leadRecipient().length > 0;
}

type Attempt = { ok: true } | { ok: false; error: string; retry: boolean };

/**
 * Retries once on a network fault, a timeout, a 429 or a 5xx — the failures that
 * tend to clear on their own. A 4xx is a configuration problem and is final.
 */
async function withRetry(send: () => Promise<Attempt>): Promise<Attempt> {
  let last: Attempt = { ok: false, error: "not attempted", retry: false };

  for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
    last = await send();
    if (last.ok || !last.retry) return last;
    if (attempt < ATTEMPTS) await new Promise((resolve) => setTimeout(resolve, 400 * attempt));
  }

  return last;
}

/** Keeps provider error bodies short enough to read in a log line. */
function clip(value: string, max = 300): string {
  const flat = value.replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max)}…` : flat;
}

async function describeFailure(response: Response): Promise<Attempt> {
  let body = "";
  try {
    body = await response.text();
  } catch {
    body = "<unreadable body>";
  }

  return {
    ok: false,
    error: `HTTP ${response.status}: ${clip(body)}`,
    retry: response.status === 429 || response.status >= 500,
  };
}

function describeThrown(error: unknown): Attempt {
  const message = error instanceof Error ? error.message : String(error);
  // Network faults and timeouts are worth a second try.
  return { ok: false, error: clip(message), retry: true };
}

/* ------------------------------------------------------------------ *
 * CallMeBot — free, no account, personal use only.
 * One-time opt-in from the receiving handset yields the API key.
 * ------------------------------------------------------------------ */
async function sendViaCallMeBot(to: string, text: string): Promise<Attempt> {
  const url = new URL("https://api.callmebot.com/whatsapp.php");
  url.searchParams.set("phone", `+${to}`);
  url.searchParams.set("text", text);
  url.searchParams.set("apikey", env("CALLMEBOT_API_KEY"));

  try {
    const response = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });

    if (!response.ok) return describeFailure(response);

    /**
     * CallMeBot answers 200 with an HTML page even when it rejects the request,
     * so the body has to be inspected rather than trusted.
     */
    const body = await response.text();
    if (/APIKey is invalid|not registered|error/i.test(body) && !/queued|sent/i.test(body)) {
      return { ok: false, error: `provider rejected: ${clip(body, 200)}`, retry: false };
    }

    return { ok: true };
  } catch (error) {
    return describeThrown(error);
  }
}

/* ------------------------------------------------------------------ *
 * Meta WhatsApp Cloud API — the official route.
 *
 * Free-form text only reaches a number that messaged the business in the last
 * 24 hours. For a reliable alert to the owner's own handset, configure an
 * approved template via WHATSAPP_TEMPLATE_NAME.
 * ------------------------------------------------------------------ */
function templateFields(): TemplateField[] {
  return env("WHATSAPP_TEMPLATE_FIELDS")
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
    .filter((part): part is TemplateField => {
      if (isTemplateField(part)) return true;
      console.error(`[whatsapp] ignoring unknown WHATSAPP_TEMPLATE_FIELDS entry "${part}"`);
      return false;
    });
}

async function sendViaMeta(to: string, lead: Lead, text: string): Promise<Attempt> {
  const version = env("WHATSAPP_GRAPH_VERSION") || "v26.0";
  const url = `https://graph.facebook.com/${version}/${env("WHATSAPP_PHONE_NUMBER_ID")}/messages`;
  const template = env("WHATSAPP_TEMPLATE_NAME");

  const payload = template
    ? {
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: template,
          language: { code: env("WHATSAPP_TEMPLATE_LANG") || "en" },
          components: [
            {
              type: "body",
              parameters: leadTemplateParams(lead, templateFields()).map((value) => ({
                type: "text",
                text: value,
              })),
            },
          ],
        },
      }
    : {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { preview_url: false, body: text },
      };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env("WHATSAPP_CLOUD_TOKEN")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });

    if (!response.ok) return describeFailure(response);
    return { ok: true };
  } catch (error) {
    return describeThrown(error);
  }
}

/* ------------------------------------------------------------------ *
 * Twilio WhatsApp — handy for testing via the Twilio sandbox.
 * ------------------------------------------------------------------ */
async function sendViaTwilio(to: string, text: string): Promise<Attempt> {
  const sid = env("TWILIO_ACCOUNT_SID");
  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;

  const form = new URLSearchParams({
    From: `whatsapp:+${digitsOnly(env("TWILIO_WHATSAPP_FROM"))}`,
    To: `whatsapp:+${to}`,
    Body: text,
  });

  const messagingService = env("TWILIO_MESSAGING_SERVICE_SID");
  if (messagingService) {
    form.delete("From");
    form.set("MessagingServiceSid", messagingService);
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${sid}:${env("TWILIO_AUTH_TOKEN")}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });

    if (!response.ok) return describeFailure(response);
    return { ok: true };
  } catch (error) {
    return describeThrown(error);
  }
}

/* ------------------------------------------------------------------ *
 * Generic webhook — n8n, Make, Zapier, AiSensy, Interakt, WATI or any
 * in-house relay. Receives both the rendered text and the raw lead.
 * ------------------------------------------------------------------ */
async function sendViaWebhook(to: string, lead: Lead, text: string): Promise<Attempt> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  const auth = env("WHATSAPP_WEBHOOK_AUTH");
  if (auth) headers[env("WHATSAPP_WEBHOOK_AUTH_HEADER") || "Authorization"] = auth;

  try {
    const response = await fetch(env("WHATSAPP_WEBHOOK_URL"), {
      method: "POST",
      headers,
      body: JSON.stringify({ to, text, lead }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });

    if (!response.ok) return describeFailure(response);
    return { ok: true };
  } catch (error) {
    return describeThrown(error);
  }
}

/**
 * Sends one enquiry alert to the business WhatsApp number.
 *
 * Never throws: the caller decides what a failure means for the visitor, and a
 * failed alert must not turn into an unhandled error on the enquiry route.
 */
export async function sendLeadToWhatsApp(lead: Lead): Promise<SendResult> {
  const to = leadRecipient();
  if (!to) {
    return {
      ok: false,
      skipped: true,
      reason: "No LEAD_WHATSAPP_TO (or NEXT_PUBLIC_WHATSAPP_NUMBER) configured.",
    };
  }

  const provider = resolveProvider();
  if (!provider) {
    return {
      ok: false,
      skipped: true,
      reason: "No WhatsApp provider credentials configured.",
    };
  }

  const text = leadWhatsAppText(lead);

  const result = await withRetry(() => {
    switch (provider) {
      case "callmebot":
        return sendViaCallMeBot(to, text);
      case "meta":
        return sendViaMeta(to, lead, text);
      case "twilio":
        return sendViaTwilio(to, text);
      case "webhook":
        return sendViaWebhook(to, lead, text);
    }
  });

  if (result.ok) return { ok: true, provider };
  return { ok: false, provider, error: result.error };
}
