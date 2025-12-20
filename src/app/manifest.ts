import type { MetadataRoute } from "next";

import { colors } from "@/constants/colors";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: process.env.NEXT_PUBLIC_APP_NAME,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    dir: "auto",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    background_color: "#000000",
    display: "standalone",
    lang: "en",
    orientation: "any",
    short_name: process.env.NEXT_PUBLIC_APP_NAME,
    start_url: "/",
    theme_color: colors.primary,
  };
}
