import { NextResponse } from "next/server";
import { enquirySchema } from "@/components/forms/enquirySchema";
import { deliverLead } from "@/lib/notify";
import type { Lead, LeadResponse } from "@/types/lead";

/**
 * Enquiry intake.
 *
 * Validates with the same zod schema the form uses, stamps a server-generated
 * `lead_id` and `created_at`, then hands the lead to every configured delivery
 * channel (`src/lib/notify`): a WhatsApp alert to the business number and the
 * `LEADS_WEBHOOK_URL` forward, run in parallel and independent of each other.
 *
 * With no channel configured it replies `{ ok: false, demo: true }` and the
 * form shows its DEMO MODE panel — the site never implies a lead was delivered
 * when it was not. The payload shape stays CRM-agnostic so email notifications
 * or an admin dashboard can be added behind the same endpoint.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

/**
 * Basic in-process rate limit. Good enough to blunt casual abuse on a single
 * instance; swap for Redis / Upstash if the app is scaled horizontally.
 */
const hits = new Map<string, number[]>();

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound on long-lived instances.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request): Promise<NextResponse<LeadResponse>> {
  const ip = clientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many enquiries from this connection. Please try again shortly." },
      { status: 429 },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Some details need fixing.",
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      },
      { status: 400 },
    );
  }

  // Honeypot: only automated submitters fill this in.
  if (parsed.data.company) {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  const data = parsed.data;

  const lead: Lead = {
    lead_id: crypto.randomUUID(),
    customer_name: data.fullName,
    mobile_number: data.mobile.replace(/\D/g, ""),
    country_code: data.countryCode,
    destination: data.destination ?? "",
    package_name: data.packageName,
    departure_batch: data.departureBatch ?? "",
    occupancy: data.occupancy ?? "",
    traveller_count: data.travellerCount ?? "",
    additional_requirements: data.requirements ?? "",
    source_page: data.sourcePage ?? "",
    enquiry_channel: "web_form",
    created_at: new Date().toISOString(),
  };

  const report = await deliverLead(lead);

  // Nothing wired up yet — say so rather than claiming the lead was sent.
  if (!report.configured) {
    return NextResponse.json({ ok: false, demo: true, lead }, { status: 200 });
  }

  if (!report.delivered) {
    return NextResponse.json(
      { ok: false, error: "We could not reach our enquiry service." },
      { status: 502 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      lead_id: lead.lead_id!,
      delivery: { whatsapp: report.whatsapp.status, webhook: report.webhook.status },
    },
    { status: 201 },
  );
}
