import type { IconName } from "@/components/ui/Icon";
import type { PackageCardItem, Season } from "./package";

export type OccupancyId = "quad" | "triple" | "double";

export type BatchStatus = "Available" | "Filling Fast" | "Sold Out";

export type TripBatch = {
  id: string;
  month: string;
  start: string;
  end: string;
  status: BatchStatus;
  /** Per-occupancy price overrides. Null until confirmed. */
  prices?: Partial<Record<OccupancyId, number>> | null;
};

export type ItineraryDayData = {
  n: number;
  title: string;
  summary: string;
  details: string;
  drive: string;
  distance: string;
  stay: string;
  meals: string;
  media?: { src?: string; alt: string }[];
};

/**
 * The entire trip page renders from one of these objects. No trip component
 * contains trip-specific copy, so dropping a new data file into `data/trips/`
 * is all it takes to publish another itinerary.
 */
export type Trip = {
  title: string;
  slug: string;
  destination: string;
  destinationHref: string;
  shortName: string;
  season: Season;
  type: string;
  duration: string;

  route: string[];
  routeStops: { name: string; note: string }[];

  gallery: { src?: string; alt: string }[];

  facts: { icon: IconName; label: string; value: string }[];
  includedStrip: { icon: IconName; label: string }[];
  trust: string[];

  about: { heading: string; intro: string; more: string[] };
  highlights: string[];
  months: { name: string; temp: string; snow: string; text: string }[];
  places: { name: string; text: string; src?: string }[];
  altitude: { title: string; points: string[]; note: string };

  /** Empty string means "not uploaded yet" and the PDF button says so. */
  itineraryPdf?: string;
  days: ItineraryDayData[];

  inclusions: string[];
  exclusions: string[];

  pricing: {
    fromPrice: number | null;
    oldPrice: number | null;
    offer: string;
    occupancy: { id: OccupancyId; label: string; short: string; price: number | null }[];
    gst: string;
    booking: string;
  };

  batchMonths: string[];
  batches: TripBatch[];

  packing: { title: string; icon: IconName; items: string[] }[];
  responsible: { icon: IconName; text: string }[];
  cancellationPolicy: { rows: { period: string; refund: string }[]; link: string };
  faqs: { q: string; a: string }[];
  reviews: { name: string; initials: string; city: string; dest: string; text: string }[];
  relatedTrips: PackageCardItem[];
  cta: { heading: string; text: string };
  enquiryConfig: { packageName: string; sourcePage: string };
};
