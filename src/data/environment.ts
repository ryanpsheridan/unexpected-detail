/**
 * True on any Vercel deployment that is not production: the staging branch and
 * every other branch preview. Vercel sets VERCEL_ENV at build time. Local dev
 * and builds leave it unset, so they are not treated as previews.
 */
export const IS_PREVIEW =
  !!process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";

/**
 * The whole site stays private until launch: every page noindex and robots.txt
 * closed, production included. Flip to false when the podcast goes public (see
 * "Going public" in CLAUDE.md). Previews stay private either way.
 */
export const SITE_PRIVATE = true;

/** Whether search engines should be kept out of this build. */
export const BLOCK_INDEXING = SITE_PRIVATE || IS_PREVIEW;
