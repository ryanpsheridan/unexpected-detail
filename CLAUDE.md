## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Staging and production

Same setup as the portfolio:

- `main` is production. Vercel builds it to the production domain.
- `staging` is a long-lived branch that Vercel builds as a preview and serves
  at `staging.<domain>` once the domain is connected. Push work there to check
  it live without touching production, then merge `staging` into `main` to ship.
- Work happens on feature branches (Claude sessions use `claude/...`). Those
  merge into `staging` first, never straight into `main`.
- Never push to `main` without Ryan saying to ship it.

Every non-production Vercel deployment (staging and branch previews) is
`noindex` and serves `Disallow: /` from `/robots.txt`, driven by `VERCEL_ENV`
in `src/data/environment.ts`.

## Private until launch

The whole site is private until the podcast launches: `SITE_PRIVATE` in
`src/data/environment.ts` keeps every page `noindex` and `/robots.txt` closed
on production too, and `vercel.json` sends `X-Robots-Tag: noindex` on every
path.

### Going public

Only when Ryan says the site goes public:

1. Set `SITE_PRIVATE` to `false`.
2. Narrow the `X-Robots-Tag` header in `vercel.json` to the review pages
   (`/concept`, `/round-1`, `/round-2`), which stay private for good. They
   also pass `noindex` to the layout, so they stay out of search either way.
3. Add a sitemap that lists only the public pages.

## Pages

- `/`: the podcast's home page (round one of the site design).
- `/contact`: the contact form (a prototype until a form service is chosen).
- `/concept`: the final brand identity.
- `/round-2`: round 06, the identity presentation with its live editor.
- `/round-1`: rounds 01 to 05 of the identity exploration.

The nav (`src/components/Nav.astro`) links Home, Contact and Concept. The
rounds are linked from the foot of the concept page.

## Design direction for the site

From Ryan, and the November 2026 review with Marcy:

- Super minimal, in the concept page's system, not the look of the deck and
  one-pager PDFs. Paper, ink, hairlines, small section labels, one idea per
  spread, and a lot of white space. The page tells the story in order.
  Shared styles are in `src/styles/site.css`.
- Gloock is for the logo, and for numbering and stats. Everything else is Geist.
- No gold text, on any ground: it isn't accessible. Yellow is for the dot of
  the i and small graphics only: Butter (`#E8CB6A`) on dark grounds, Mustard
  (`#B8890F`, 3:1 on paper) on light ones. If an accent color is ever needed
  for text on light, Honey (`#7D6118`, 5.5:1 on paper) is the darker secondary.
- The wordmark sits top left in the nav, as the staggered two-line lockup
  without the tagline.
- No eyebrow labels or section numbers above headings. Numbers appear only
  where they carry information, like episode numbers.
- Product facts, audience and voice live in `PRODUCT.md`.
- The home page opens dark and flips to light as the visitor scrolls into
  "Curiosity flips the frame", as one continuous change. The rest stays light.
- Listener-facing pages leave out the conversation rhythm (the five beats),
  which stays internal, and the old mission line.
