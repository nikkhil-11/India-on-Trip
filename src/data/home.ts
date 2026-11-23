import type { IconName } from "@/components/ui/Icon";

export type HeroSlide = {
  eyebrow: string;
  title: string;
  text: string;
  chips: { icon: IconName; label: string }[];
  cta: { label: string; href: string };
  secondaryHref: string;
  image?: string;
  imageAlt: string;
};

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Spiti Valley – The Land of High Passes",
    title: "Explore Spiti Valley",
    text: "Discover breathtaking landscapes, ancient monasteries and unforgettable Himalayan adventures.",
    chips: [
      { icon: "mountain", label: "Epic Landscapes" },
      { icon: "temple", label: "Ancient Monasteries" },
      { icon: "snow", label: "Snow Adventures" },
      { icon: "users", label: "Group Experiences" },
    ],
    cta: { label: "Plan Your Spiti Trip Now", href: "#enquiry" },
    secondaryHref: "/spiti-valley",
    imageAlt: "Spiti Valley under snow with a hilltop monastery",
  },
  {
    eyebrow: "Himachal Adventures",
    title: "The Best of Himachal",
    text: "From Shimla's ridges to Manali's valleys — curated trips through Himachal's most loved hill country.",
    chips: [
      { icon: "mountain", label: "Snow Peaks" },
      { icon: "car", label: "Valley Drives" },
      { icon: "bed", label: "Hill Stays" },
      { icon: "sliders", label: "Private Plans" },
    ],
    cta: { label: "Explore Himachal", href: "#himachal-packages" },
    secondaryHref: "#himachal-packages",
    imageAlt: "Deodar forests and snow peaks above a Himachal valley",
  },
  {
    eyebrow: "Weekend Group Trips",
    title: "Weekend Getaways, Big Experiences",
    text: "Short 2N/3D and 3N/4D trips for friends, couples and solo travellers.",
    chips: [
      { icon: "clock", label: "2N/3D & 3N/4D" },
      { icon: "users", label: "Group Trips" },
      { icon: "route", label: "Treks & Trails" },
      { icon: "user", label: "Solo-friendly" },
    ],
    cta: { label: "See Weekend Trips", href: "#weekend-trips" },
    secondaryHref: "#weekend-trips",
    imageAlt: "Group of travellers on a Himalayan ridge trail at sunrise",
  },
];

export const whyTravel: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "award",
    title: "Trusted Travel Experts",
    text: "Trips planned by a team that knows these mountain routes.",
  },
  {
    icon: "shield",
    title: "Safe & Hassle-Free Trips",
    text: "Clear itineraries and briefings, so you know what to expect.",
  },
  {
    icon: "tag",
    title: "Best Value Packages",
    text: "Costs and inclusions shared upfront before you confirm.",
  },
  {
    icon: "sliders",
    title: "Customizable Itineraries",
    text: "Adjust dates, stays and pace to suit your group.",
  },
  {
    icon: "headset",
    title: "On-Trip Support",
    text: "A team you can reach while you are travelling.",
  },
  {
    icon: "compass",
    title: "Local Experience",
    text: "Villages, food and stays that reflect each region.",
  },
];

export const bookingSteps: { icon: IconName; title: string; text: string }[] = [
  { icon: "compass", title: "Choose Your Trip", text: "Explore packages that fit your travel style." },
  { icon: "chat", title: "Enquire With Us", text: "Share your travel dates and group details." },
  { icon: "checkcircle", title: "Get Confirmation", text: "Receive trip details, cost and availability." },
  { icon: "bag", title: "Pack & Travel", text: "Get ready for an unforgettable journey!" },
];

/**
 * Placeholder testimonials. Every field is bracketed so nothing here can be
 * mistaken for a real traveller review — replace once reviews are collected.
 */
export const sampleReviews = [
  {
    name: "[Traveller Name]",
    initials: "TN",
    city: "[City]",
    dest: "Winter Spiti Valley",
    text: "[Sample review text — replace with a real traveller review once collected. Nothing on this card is a genuine quote.]",
  },
  {
    name: "[Traveller Name]",
    initials: "TN",
    city: "[City]",
    dest: "Himachal",
    text: "[Sample review text — replace with a real traveller review once collected. Nothing on this card is a genuine quote.]",
  },
  {
    name: "[Traveller Name]",
    initials: "TN",
    city: "[City]",
    dest: "Weekend Group Trip",
    text: "[Sample review text — replace with a real traveller review once collected. Nothing on this card is a genuine quote.]",
  },
];
