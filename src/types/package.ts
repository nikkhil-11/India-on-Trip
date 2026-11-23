import type { IconName } from "@/components/ui/Icon";

export type Season = "Winter" | "Summer";

/** One card in a package / destination / weekend-trip row. */
export type PackageCardItem = {
  title: string;
  season?: Season;
  /** e.g. "Group Trip", "Self-Drive", "Private". */
  type?: string;
  typeIcon?: IconName;
  /** Yellow duration badge, or "Flexible Plans" on private trips. */
  badge?: string;
  /** Secondary line under the title, e.g. the route. */
  meta?: string;
  href: string;
  /** Path under /public. Omitted until real photography lands. */
  image?: string;
};

/** Weekend getaway card (2N/3D and 3N/4D rows). */
export type WeekendTripItem = {
  title: string;
  duration: string;
  meta?: string;
  href: string;
  image?: string;
};

/** Tall destination card used by the Himachal and Domestic rows. */
export type DestinationItem = {
  title: string;
  text?: string;
  badge?: string;
  href: string;
  image?: string;
};
