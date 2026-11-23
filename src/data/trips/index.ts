import type { Trip } from "@/types/trip";
import { AVAILABLE_TRIP_SLUGS } from "../trip-slugs";
import { winterSpitiValleyGroupTrip } from "./winter-spiti-valley-group-trip";

/**
 * Every published itinerary. Adding a trip is two lines: import the data file
 * and list it here, then add its slug to `AVAILABLE_TRIP_SLUGS` so package
 * cards start linking to it. `generateStaticParams` picks it up automatically.
 */
export const trips: Trip[] = [winterSpitiValleyGroupTrip];

export const tripsBySlug: Record<string, Trip> = Object.fromEntries(
  trips.map((trip) => [trip.slug, trip]),
);

export function getTrip(slug: string): Trip | undefined {
  return tripsBySlug[slug];
}

export const tripSlugs = trips.map((trip) => trip.slug);

// Fail the build loudly rather than shipping cards that link to a 404, or a
// published trip that no card points at.
const missingData = AVAILABLE_TRIP_SLUGS.filter((slug) => !tripsBySlug[slug]);
const missingListing = tripSlugs.filter((slug) => !(AVAILABLE_TRIP_SLUGS as readonly string[]).includes(slug));

if (missingData.length > 0 || missingListing.length > 0) {
  throw new Error(
    [
      "data/trips/index.ts is out of sync with data/trip-slugs.ts.",
      missingData.length > 0 && `Listed in AVAILABLE_TRIP_SLUGS but no data file: ${missingData.join(", ")}.`,
      missingListing.length > 0 && `Has a data file but missing from AVAILABLE_TRIP_SLUGS: ${missingListing.join(", ")}.`,
    ]
      .filter(Boolean)
      .join(" "),
  );
}
