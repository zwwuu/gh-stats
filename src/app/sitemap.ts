import fs from "node:fs";
import type { MetadataRoute } from "next";

const appFolders = fs.readdirSync("src/app", { withFileTypes: true });
const pages = appFolders
  .filter((file) => file.isDirectory())
  .filter((folder) => !folder.name.startsWith("_"))
  .filter((folder) => !folder.name.startsWith("("))
  .filter((folder) => !folder.name.startsWith("["))
  .map((folder) => folder.name);
const BASE_URL = new URL(`${process.env.NEXT_PUBLIC_APP_URL}`).href;

const sitemap = async (): Promise<MetadataRoute.Sitemap> => [
  {
    url: new URL("/", BASE_URL).href,
    lastModified: new Date(),
  },
  ...pages.map((page) => ({
    url: new URL(page, BASE_URL).href,
    lastModified: new Date(),
  })),
];

export default sitemap;
