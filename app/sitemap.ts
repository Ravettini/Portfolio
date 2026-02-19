import type { MetadataRoute } from "next";

const baseUrl = "https://ravettini.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = new Date();

  return [
    { url: `${baseUrl}/`, lastModified: lastMod, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/#sobre-mi`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/#especialidades`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/#experiencia`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/#proyectos`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/#habilidades`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/#contacto`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.8 },
  ];
}
