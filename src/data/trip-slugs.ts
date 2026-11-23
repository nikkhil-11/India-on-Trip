/**
 * Slugs that currently have a data file under `data/trips/`.
 *
 * Package cards point at `/spiti-valley/<slug>` only when the slug is listed
 * here; everything else routes to the enquiry page so no card is a dead link.
 * Add the slug here in the same commit as the new data file —
 * `data/trips/index.ts` fails the build if the two ever disagree.
 */
export const AVAILABLE_TRIP_SLUGS = ["winter-spiti-valley-group-trip"] as const;

/** Slugs planned but not yet written up; kept so the card copy stays stable. */
export const PLANNED_TRIP_SLUGS = [
  "winter-spiti-valley-self-drive-expedition",
  "winter-spiti-valley-private-trip",
  "summer-spiti-valley-group-trip",
  "summer-spiti-valley-self-drive-expedition",
  "summer-spiti-valley-private-trip",
] as const;

export function isTripAvailable(slug: string): boolean {
  return (AVAILABLE_TRIP_SLUGS as readonly string[]).includes(slug);
}

/**
 * Trip-page link when the itinerary exists, otherwise the enquiry page with
 * the package name carried across so the form arrives prefilled.
 */
export function tripHref(slug: string, title: string): string {
  return isTripAvailable(slug)
    ? `/spiti-valley/${slug}`
    : `/contact?package=${encodeURIComponent(title)}`;
}
