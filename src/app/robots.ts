import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL(`${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`).href,
  };
}
