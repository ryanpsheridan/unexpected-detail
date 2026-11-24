import type { APIRoute } from "astro";
import { BLOCK_INDEXING } from "../data/environment";

// Closed while the site is private and on every preview (staging included);
// open on production once SITE_PRIVATE is false.
export const GET: APIRoute = () =>
  new Response(BLOCK_INDEXING ? "User-agent: *\nDisallow: /\n" : "User-agent: *\nAllow: /\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
