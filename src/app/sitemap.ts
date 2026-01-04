import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/contact", "/privacy", "/terms"].map((route) => ({
    url: new URL(`${process.env.NEXT_PUBLIC_APP_URL}${route}`).toString(),
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1,
  }));

  return routes;
}
