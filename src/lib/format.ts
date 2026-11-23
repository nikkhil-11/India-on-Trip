/** Shown wherever a real price has not been confirmed yet. */
export const PRICE_PLACEHOLDER = "₹[Price]";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/**
 * Formats a price as `₹1,23,456`.
 * Returns the visible `₹[Price]` placeholder while the value is unconfirmed,
 * so the site never implies a price we have not been given.
 */
export function formatPrice(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return PRICE_PLACEHOLDER;
  return inr.format(value).replace(/\s/g, "");
}

/** Joins non-empty parts with a middot, e.g. "Group Trip · 7N / 8D". */
export function joinMeta(parts: (string | null | undefined | false)[]): string {
  return parts.filter(Boolean).join(" · ");
}

/** "Winter Spiti Valley Group Trip" -> initials for avatar chips. */
export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** Drops the word "Valley" so headings read "Let's Plan Your Spiti Adventure!". */
export function shortDestination(destination: string): string {
  return destination.replace(/\s*valley\s*/i, " ").trim();
}
