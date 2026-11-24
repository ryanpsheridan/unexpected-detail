// @ts-check
import { defineConfig } from "astro/config";

// The unexpected detail site: the podcast home at /, the final identity at
// /concept, the archived explorations at /round-1 and /round-2. Private until
// launch (src/data/environment.ts): every page is noindex, and robots.txt and
// vercel.json say the same to crawlers.
export default defineConfig({
  // The production address, for absolute links like the share image.
  site: "https://unexpecteddetail.com",
  // Links are written without a trailing slash; vercel.json matches it.
  trailingSlash: "never",
});
