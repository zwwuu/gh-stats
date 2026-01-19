import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      new URL("https://www.lduhtrp.net/**"),
      new URL("https://www.tqlkg.com/**"),
      new URL("https://www.awltovhc.com/**"),
      new URL("https://www.ftjcfx.com/**"),
    ],
  },
};

export default nextConfig;
