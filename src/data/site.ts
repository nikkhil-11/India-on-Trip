import type { IconName } from "@/components/ui/Icon";

export const PHONE = process.env.NEXT_PUBLIC_PHONE ?? "";
export const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? "";

/** Visible placeholders used until the real details are confirmed. */
export const PHONE_LABEL = PHONE || "[Phone — to be confirmed]";
export const EMAIL_LABEL = EMAIL || "[Email — to be confirmed]";
export const ADDRESS_LABEL = "[Office address]";

export const site = {
  name: "IndiaOnTrip",
  tagline: "Your Journey, Our Passion.",
  url: "https://www.indiaontrip.com",
  description:
    "Explore India's most beautiful destinations with IndiaOnTrip — Spiti Valley, Himachal, weekend group trips and curated domestic journeys.",
  utilityMessage: "Explore India's Most Beautiful Destinations with IndiaOnTrip.",
  promoChip: "Winter Spiti season is open — ask for departures",
} as const;

/** Primary navigation. The active link gets a 3px yellow underline. */
export const navLinks: { label: string; href: string }[] = [
  { label: "Spiti Valley", href: "/spiti-valley" },
  { label: "Himachal", href: "/#himachal-packages" },
  { label: "Domestic Trips", href: "/#domestic-trips" },
  { label: "Weekend Group Trips", href: "/#weekend-trips" },
];

export const utilityLinks: { label: string; href: string }[] = [
  { label: "About Us", href: "/contact" },
  { label: "Blogs", href: "/contact" },
  { label: "Careers", href: "/contact" },
  { label: "Payments", href: "/contact" },
  { label: "Contact Us", href: "/contact" },
];

/** hrefs stay at "#" until the real profiles are confirmed. */
export const socialLinks: { label: string; icon: IconName; href: string }[] = [
  { label: "Instagram", icon: "camera", href: "#" },
  { label: "Facebook", icon: "globe", href: "#" },
  { label: "YouTube", icon: "play", href: "#" },
];

export const footerDestinations: { label: string; href: string }[] = [
  { label: "Spiti Valley Packages", href: "/spiti-valley" },
  { label: "Himachal Packages", href: "/#himachal-packages" },
  { label: "Ladakh Tours", href: "/#domestic-trips" },
  { label: "Kerala Tours", href: "/#domestic-trips" },
  { label: "Rajasthan Tours", href: "/#domestic-trips" },
  { label: "Kashmir Tours", href: "/#domestic-trips" },
];

export const quickLinks: { label: string; href: string }[] = [
  { label: "About Us", href: "/contact" },
  { label: "Blogs", href: "/contact" },
  { label: "Careers", href: "/contact" },
  { label: "Payments", href: "/contact" },
  { label: "FAQs", href: "/contact" },
  { label: "Terms & Conditions", href: "/contact" },
  { label: "Privacy Policy", href: "/contact" },
];

/**
 * Registrations and platform listings — never presented as awards.
 * Each tile keeps a dashed slot for the official logo artwork.
 */
export const recognitions: { title: string; kind: string }[] = [
  { title: "Government of India", kind: "Registration" },
  { title: "GST Registered Business", kind: "Registration" },
  { title: "Startup India", kind: "Recognition" },
  { title: "Goibibo", kind: "Platform listing" },
];

export const businessCredentials =
  "MSME | GST Registered | Startup India | [Other verified business credentials]";

export const copyright = `Copyright © 2026 ${site.name}. All rights reserved.`;
