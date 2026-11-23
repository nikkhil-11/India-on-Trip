import type { Lead } from "@/types/lead";

/**
 * Turns a `Lead` into the text the business owner reads on WhatsApp.
 *
 * Two shapes are produced from the same data:
 *
 * - `leadWhatsAppText` — a multi-line message for providers that allow free-form
 *   text (CallMeBot, Twilio, a self-hosted relay, or the Meta Cloud API inside an
 *   open 24-hour window).
 * - `leadTemplateParams` — single-line parameters for an approved Meta template.
 *   WhatsApp rejects template parameters containing newlines or tabs, so the
 *   summary is flattened with " | " separators instead.
 */

const istTime = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

/** Fields that may be used as Meta template parameters, in any order. */
export const templateFieldMap = {
  name: (lead: Lead) => lead.customer_name,
  phone: (lead: Lead) => e164(lead),
  trip: (lead: Lead) => lead.package_name,
  destination: (lead: Lead) => lead.destination,
  batch: (lead: Lead) => lead.departure_batch,
  travellers: (lead: Lead) => lead.traveller_count,
  occupancy: (lead: Lead) => lead.occupancy,
  notes: (lead: Lead) => lead.additional_requirements,
  page: (lead: Lead) => lead.source_page,
  summary: (lead: Lead) => leadSummaryLine(lead),
  received: (lead: Lead) => receivedAt(lead),
  ref: (lead: Lead) => shortRef(lead),
} as const;

export type TemplateField = keyof typeof templateFieldMap;

export function isTemplateField(value: string): value is TemplateField {
  return Object.hasOwn(templateFieldMap, value);
}

/**
 * Splits a lead's number into country code and local part.
 *
 * The form keeps the two apart, so `mobile_number` is normally just the local
 * number — but someone can still paste a full international number into the
 * field. A prefix match alone is not enough to tell the two cases apart: every
 * valid Indian mobile beginning `91…` would look like it already carried the
 * `+91` code. None of the supported countries has a local number longer than 10
 * digits, so total length is what actually distinguishes them.
 */
function splitNumber(lead: Lead): { code: string; local: string } {
  const code = lead.country_code.replace(/\D/g, "");
  const mobile = lead.mobile_number.replace(/\D/g, "");

  const carriesCode =
    mobile.length > 10 && mobile.startsWith(code) && mobile.length - code.length >= 6;

  return { code, local: carriesCode ? mobile.slice(code.length) : mobile };
}

/** Full international number, digits only, e.g. `919876543210`. */
export function leadDigits(lead: Lead): string {
  const { code, local } = splitNumber(lead);
  return `${code}${local}`;
}

/** Readable `+91 98765 43210`, falling back to an unspaced number elsewhere. */
function e164(lead: Lead): string {
  const { code, local } = splitNumber(lead);

  if (local.length === 10) return `+${code} ${local.slice(0, 5)} ${local.slice(5)}`;
  return `+${code} ${local}`;
}

function receivedAt(lead: Lead): string {
  const when = new Date(lead.created_at);
  if (Number.isNaN(when.getTime())) return "";
  return `${istTime.format(when)} IST`;
}

/** First block of the UUID — enough to match a WhatsApp ping to a CRM record. */
function shortRef(lead: Lead): string {
  return lead.lead_id ? lead.lead_id.split("-")[0]! : "";
}

/**
 * Collapses whitespace so free-text notes cannot break a single-line format or
 * smuggle fake labels into the message the owner reads.
 */
function oneLine(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

/** `Ankit Rastogi | +91 98765 43210 | Winter Spiti Valley Group Trip | 4 pax` */
export function leadSummaryLine(lead: Lead): string {
  return [
    oneLine(lead.customer_name),
    e164(lead),
    oneLine(lead.package_name),
    lead.traveller_count && `${oneLine(lead.traveller_count)} pax`,
    lead.departure_batch && oneLine(lead.departure_batch),
  ]
    .filter(Boolean)
    .join(" | ");
}

/**
 * The multi-line notification. Every optional field is dropped when empty, so
 * a bare enquiry stays short and a detailed one carries everything.
 *
 * The trailing `wa.me` link is the point of the whole message: the owner taps it
 * and is already in a chat with the traveller.
 */
export function leadWhatsAppText(lead: Lead): string {
  const rows: [string, string][] = [
    ["Name", oneLine(lead.customer_name)],
    ["Phone", e164(lead)],
    ["Trip", oneLine(lead.package_name)],
    ["Destination", oneLine(lead.destination)],
    ["Batch", oneLine(lead.departure_batch)],
    ["Travellers", oneLine(lead.traveller_count)],
    ["Occupancy", oneLine(lead.occupancy)],
    ["Notes", oneLine(lead.additional_requirements)],
    ["Page", oneLine(lead.source_page)],
  ];

  const body = rows
    .filter(([, value]) => value.length > 0)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  const footer = [
    `Reply: https://wa.me/${leadDigits(lead)}`,
    receivedAt(lead) && `Received: ${receivedAt(lead)}`,
    shortRef(lead) && `Ref: ${shortRef(lead)}`,
  ].filter(Boolean);

  return [`*New IndiaOnTrip enquiry*`, "", body, "", ...footer].join("\n");
}

/** Meta rejects a parameter longer than this, so a long note is trimmed. */
const MAX_PARAM_LENGTH = 900;

/**
 * Parameters for an approved Meta template, in the order its `{{n}}`
 * placeholders appear. With no field list configured the template is assumed to
 * take a single `{{1}}` holding the whole summary line.
 *
 * Two Meta rules shape this: a parameter may not be empty, and it may not
 * contain a newline or tab. A parameter of only punctuation is also a common
 * rejection, so an absent value becomes "N/A" rather than a dash.
 */
export function leadTemplateParams(lead: Lead, fields: TemplateField[] = []): string[] {
  const chosen = fields.length > 0 ? fields : (["summary"] as TemplateField[]);

  return chosen.map((field) => {
    const value = oneLine(templateFieldMap[field](lead));
    if (!value) return "N/A";
    return value.length > MAX_PARAM_LENGTH ? `${value.slice(0, MAX_PARAM_LENGTH - 1)}…` : value;
  });
}
