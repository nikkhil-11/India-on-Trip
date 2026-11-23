import type { Lead } from "@/types/lead";
import { sendLeadToWhatsApp, whatsappNotifyConfigured } from "./whatsapp";

/**
 * Lead delivery, one call for every channel.
 *
 * Channels run in parallel and are independent: a WhatsApp alert that fails must
 * not stop the CRM forward, and vice versa. The route reports success to the
 * visitor when **any** configured channel accepted the lead, and DEMO MODE when
 * no channel is configured at all — the site never implies a lead was delivered
 * when it was not.
 */

export type ChannelOutcome =
  | { status: "sent"; detail?: string }
  | { status: "skipped"; detail: string }
  | { status: "failed"; detail: string };

export type DeliveryReport = {
  /** At least one channel is configured — i.e. this is not DEMO MODE. */
  configured: boolean;
  /** At least one configured channel accepted the lead. */
  delivered: boolean;
  whatsapp: ChannelOutcome;
  webhook: ChannelOutcome;
};

const WEBHOOK_TIMEOUT_MS = 8000;

async function forwardToWebhook(lead: Lead): Promise<ChannelOutcome> {
  const webhook = (process.env.LEADS_WEBHOOK_URL ?? "").trim();
  if (!webhook) return { status: "skipped", detail: "No LEADS_WEBHOOK_URL configured." };

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
      cache: "no-store",
    });

    if (!response.ok) return { status: "failed", detail: `HTTP ${response.status}` };
    return { status: "sent" };
  } catch (error) {
    return {
      status: "failed",
      detail: error instanceof Error ? error.message : String(error),
    };
  }
}

async function notifyWhatsApp(lead: Lead): Promise<ChannelOutcome> {
  const result = await sendLeadToWhatsApp(lead);

  if (result.ok) return { status: "sent", detail: result.provider };
  if (result.skipped) return { status: "skipped", detail: result.reason };
  return { status: "failed", detail: `${result.provider}: ${result.error}` };
}

/** True when nothing is wired up, so the route can answer in DEMO MODE. */
export function deliveryConfigured(): boolean {
  return whatsappNotifyConfigured() || (process.env.LEADS_WEBHOOK_URL ?? "").trim().length > 0;
}

export async function deliverLead(lead: Lead): Promise<DeliveryReport> {
  const [whatsapp, webhook] = await Promise.all([notifyWhatsApp(lead), forwardToWebhook(lead)]);

  const outcomes = [whatsapp, webhook];
  const configured = outcomes.some((outcome) => outcome.status !== "skipped");
  const delivered = outcomes.some((outcome) => outcome.status === "sent");

  /**
   * Logged loudly: a lead that reached the CRM but not WhatsApp still looks like
   * a success to the visitor, so the only trace is here.
   */
  for (const [channel, outcome] of [
    ["whatsapp", whatsapp],
    ["webhook", webhook],
  ] as const) {
    if (outcome.status === "failed") {
      console.error(`[leads] ${channel} delivery failed for ${lead.lead_id}: ${outcome.detail}`);
    }
  }

  if (configured && delivered) {
    console.log(
      `[leads] ${lead.lead_id} delivered (whatsapp: ${whatsapp.status}, webhook: ${webhook.status})`,
    );
  }

  return { configured, delivered, whatsapp, webhook };
}
