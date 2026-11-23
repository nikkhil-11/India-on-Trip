import type { DestinationItem, PackageCardItem, WeekendTripItem } from "@/types/package";
import { tripHref } from "./trip-slugs";

/**
 * Every card shown on the homepage and the Spiti Valley destination page.
 *
 * Durations are only stated where they have been confirmed; everywhere else a
 * visible `[Duration]` placeholder is used rather than a guess. Private trips
 * carry the yellow "Flexible Plans" badge instead of a duration.
 */

/** Enquiry link used by cards whose own page is not built yet. */
function enquiryHref(title: string): string {
  return `/contact?package=${encodeURIComponent(title)}`;
}

export const spitiPackages: (PackageCardItem & { slug: string })[] = [
  {
    slug: "winter-spiti-valley-group-trip",
    title: "Winter Group Trip",
    season: "Winter",
    type: "Group Trip",
    typeIcon: "users",
    badge: "7N / 8D",
    meta: "Delhi → Shimla → Chitkul → Kaza → Delhi",
    href: tripHref("winter-spiti-valley-group-trip", "Winter Spiti Valley Group Trip"),
  },
  {
    slug: "winter-spiti-valley-self-drive-expedition",
    title: "4x4 Winter Self-Drive Expedition",
    season: "Winter",
    type: "Self-Drive",
    typeIcon: "car",
    badge: "[Duration]",
    meta: "Drive your own 4x4 through winter Kinnaur and Spiti",
    href: tripHref("winter-spiti-valley-self-drive-expedition", "4x4 Winter Self-Drive Expedition"),
  },
  {
    slug: "winter-spiti-valley-private-trip",
    title: "Winter Private Customized Trip",
    season: "Winter",
    type: "Private",
    typeIcon: "user",
    badge: "Flexible Plans",
    meta: "Your own vehicle and pace, planned around your group",
    href: tripHref("winter-spiti-valley-private-trip", "Winter Private Customized Trip"),
  },
  {
    slug: "summer-spiti-valley-group-trip",
    title: "Summer Group Trip",
    season: "Summer",
    type: "Group Trip",
    typeIcon: "users",
    badge: "[Duration]",
    meta: "The Manali side over the high passes",
    href: tripHref("summer-spiti-valley-group-trip", "Summer Spiti Valley Group Trip"),
  },
  {
    slug: "summer-spiti-valley-self-drive-expedition",
    title: "4x4 Summer Self-Drive Expedition",
    season: "Summer",
    type: "Self-Drive",
    typeIcon: "car",
    badge: "[Duration]",
    meta: "Kunzum La, Chandratal and the Spiti circuit",
    href: tripHref("summer-spiti-valley-self-drive-expedition", "4x4 Summer Self-Drive Expedition"),
  },
  {
    slug: "summer-spiti-valley-private-trip",
    title: "Summer Private Customized Trip",
    season: "Summer",
    type: "Private",
    typeIcon: "user",
    badge: "Flexible Plans",
    meta: "Choose your route, stays and pace",
    href: tripHref("summer-spiti-valley-private-trip", "Summer Private Customized Trip"),
  },
];

/** Related-trips rows: the Spiti line-up minus the trips being excluded. */
export function spitiPackagesExcept(titles: string[]): PackageCardItem[] {
  return spitiPackages.filter((item) => !titles.includes(item.title));
}

export const himachalDestinations: DestinationItem[] = [
  {
    title: "Shimla – Manali",
    badge: "5N / 6D",
    text: "Colonial ridges, deodar forests and the Beas valley.",
    href: enquiryHref("Shimla – Manali"),
  },
  {
    title: "Grand Himachal",
    badge: "8N / 9D",
    text: "A longer loop through Himachal's most loved hill country.",
    href: enquiryHref("Grand Himachal"),
  },
  {
    title: "Private Customized Trip",
    badge: "Flexible Plans",
    text: "Your own vehicle and pace, planned around your group.",
    href: enquiryHref("Himachal Private Customized Trip"),
  },
];

export const weekendTrips2N3D: WeekendTripItem[] = [
  {
    title: "Manali – Sissu – Kasol",
    duration: "2N / 3D",
    meta: "Beas valley, the Atal Tunnel and a riverside night.",
    href: enquiryHref("Manali – Sissu – Kasol (2N / 3D)"),
  },
  {
    title: "McLeodganj – Triund",
    duration: "2N / 3D",
    meta: "Dharamshala's Tibetan quarter and the Triund ridge.",
    href: enquiryHref("McLeodganj – Triund (2N / 3D)"),
  },
  {
    title: "Jibhi – Jalori Tirthan",
    duration: "2N / 3D",
    meta: "Forest villages, Jalori Pass and the Tirthan river.",
    href: enquiryHref("Jibhi – Jalori Tirthan (2N / 3D)"),
  },
  {
    title: "Kasol – Kheerganga",
    duration: "2N / 3D",
    meta: "The Parvati valley trail up to Kheerganga.",
    href: enquiryHref("Kasol – Kheerganga (2N / 3D)"),
  },
  {
    title: "Chopta – Tungnath",
    duration: "2N / 3D",
    meta: "High meadows and the Tungnath temple trail.",
    href: enquiryHref("Chopta – Tungnath (2N / 3D)"),
  },
  {
    title: "Solan – Churdhar",
    duration: "2N / 3D",
    meta: "Pine country and the climb to Churdhar.",
    href: enquiryHref("Solan – Churdhar (2N / 3D)"),
  },
];

export const weekendTrips3N4D: WeekendTripItem[] = [
  {
    title: "Shimla – Kalpa – Chitkul",
    duration: "3N / 4D",
    meta: "Into Kinnaur along the Sutlej to the Baspa valley.",
    href: enquiryHref("Shimla – Kalpa – Chitkul (3N / 4D)"),
  },
  {
    title: "Manali – Solang – Kasol",
    duration: "3N / 4D",
    meta: "Solang's slopes and the Parvati valley.",
    href: enquiryHref("Manali – Solang – Kasol (3N / 4D)"),
  },
  {
    title: "Jibhi – Tirthan – Kasol",
    duration: "3N / 4D",
    meta: "Great Himalayan National Park country.",
    href: enquiryHref("Jibhi – Tirthan – Kasol (3N / 4D)"),
  },
  {
    title: "McLeodganj – Triund – Bir",
    duration: "3N / 4D",
    meta: "Ridge walks and Bir's paragliding meadows.",
    href: enquiryHref("McLeodganj – Triund – Bir (3N / 4D)"),
  },
];

export const domesticDestinations: DestinationItem[] = [
  {
    title: "Ladakh",
    text: "High passes, vast lakes and cliff-top monasteries.",
    href: enquiryHref("Ladakh Tour"),
  },
  {
    title: "Kerala",
    text: "Backwaters, tea hills and the Malabar coast.",
    href: enquiryHref("Kerala Tour"),
  },
  {
    title: "Rajasthan",
    text: "Desert forts, lake palaces and old trading towns.",
    href: enquiryHref("Rajasthan Tour"),
  },
  {
    title: "Kashmir",
    text: "Valleys, lakes and meadows under the Himalaya.",
    href: enquiryHref("Kashmir Tour"),
  },
];
