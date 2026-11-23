import type { IconName } from "@/components/ui/Icon";

export const spitiPage = {
  title: "Spiti Valley Packages",
  subtitle:
    "Group trips, 4x4 self-drive expeditions and private journeys through Himachal's high-altitude cold desert.",
  bannerAlt: "Snow-covered Spiti Valley with a hilltop monastery",
} as const;

/** "About Spiti Valley" explainer cards. */
export const aboutSpiti: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "mountain",
    title: "A high-altitude cold desert",
    text: "Spiti sits in Himachal's Lahaul & Spiti district, between Ladakh and Tibet.",
  },
  {
    icon: "temple",
    title: "Monasteries & villages",
    text: "Key, Dhankar, Tabo; Kibber and Langza. [Confirm stops per itinerary.]",
  },
  {
    icon: "sun",
    title: "Summer vs winter",
    text: "Summer opens the Manali side over high passes; in winter the valley is reached via Shimla and Kinnaur. [Add your season dates.]",
  },
];

export const seasonFilters = ["All", "Winter", "Summer"] as const;
export const travelTypeFilters = ["All", "Group", "Self-Drive", "Private"] as const;

export type SeasonFilter = (typeof seasonFilters)[number];
export type TravelTypeFilter = (typeof travelTypeFilters)[number];
