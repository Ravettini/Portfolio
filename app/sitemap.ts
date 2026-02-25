import type { MetadataRoute } from "next";

const baseUrl = "https://ravettini.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = new Date();

  return [
    { url: `${baseUrl}/`, lastModified: lastMod, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/demo`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.5 },
  ];
}
