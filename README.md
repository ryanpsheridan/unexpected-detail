# unexpected detail

The brand identity site for the unexpected detail podcast. Astro, deployed on Vercel.

- `/`: the podcast home page, round one
- `/contact`: contact
- `/concept`: the final identity
- `/round-1`: rounds 01 to 05 of the exploration
- `/round-2`: round 06, the presentation with its live editor

`main` is production and `staging` is the staging site. See `CLAUDE.md`.

```
npm install
npm run dev
```

The logo is live type: the staggered Gloock lockup, drawn by
`src/components/Wordmark.astro`, with the falling line in `Lines.astro` and
the square cover in `Cover.astro`.

The site is private until launch. Every page sets `noindex`, `/robots.txt`
disallows everything, and `vercel.json` sends `X-Robots-Tag: noindex`. The
switch is `SITE_PRIVATE` in `src/data/environment.ts`.
