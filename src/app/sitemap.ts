import type { MetadataRoute } from "next";
import { tripSlugs } from "@/data/trips";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/spiti-valley`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const tripRoutes: MetadataRoute.Sitemap = tripSlugs.map((slug) => ({
    url: `${site.url}/spiti-valley/${slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...tripRoutes];
}
