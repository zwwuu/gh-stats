import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL(`${process.env.NEXT_PUBLIC_APP_URL}`).toString(),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
