import type { MetadataRoute } from "next";
import { getProjectsWithDetailPages } from "@/lib/projects";

const baseUrl = "https://ravettini.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = new Date();
  const projectPages = getProjectsWithDetailPages().map((project) => ({
    url: `${baseUrl}/proyectos/${project.slug}`,
    lastModified: lastMod,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: `${baseUrl}/`, lastModified: lastMod, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/demo`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.5 },
    ...projectPages,
  ];
}
