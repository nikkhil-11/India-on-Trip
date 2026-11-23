/**
 * WhatsApp deep links.
 *
 * The number is intentionally empty until the business confirms it. Until then
 * `whatsappEnabled` is false and every WhatsApp CTA falls back to the on-page
 * enquiry form rather than linking somewhere that does not exist.
 */
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");

export const whatsappEnabled = WHATSAPP_NUMBER.length > 0;

export type WhatsAppMessageInput = {
  name?: string;
  packageName?: string;
  destination?: string;
  batch?: string;
  travellers?: string;
};

/** Builds the prefilled message, leaving out any line we have no value for. */
export function buildWhatsAppMessage(input: WhatsAppMessageInput = {}): string {
  const lines = [
    "Hi IndiaOnTrip! I would like to plan a trip.",
    input.name && `Name: ${input.name}`,
    input.packageName && `Package: ${input.packageName}`,
    input.destination && `Destination: ${input.destination}`,
    input.batch && `Travel batch: ${input.batch}`,
    input.travellers && `Travellers: ${input.travellers}`,
  ].filter(Boolean);

  return lines.join("\n");
}

/**
 * Returns a wa.me link, or `null` when no number is configured so callers can
 * fall back to `#enquiry` instead of rendering a dead link.
 */
export function whatsappHref(input: WhatsAppMessageInput = {}): string | null {
  if (!whatsappEnabled) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(input))}`;
}

/** wa.me link when configured, otherwise the in-page enquiry anchor. */
export function whatsappHrefOrFallback(input: WhatsAppMessageInput = {}, fallback = "#enquiry"): string {
  return whatsappHref(input) ?? fallback;
}
