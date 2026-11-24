// @ts-check
import { defineConfig } from "astro/config";

// The unexpected detail brand site: the final identity at /, the archived
// explorations at /round-1 and /round-2. Private: every page is noindex, and
// robots.txt and vercel.json say the same to crawlers.
export default defineConfig({
  // Links are written without a trailing slash; vercel.json matches it.
  trailingSlash: "never",
});
