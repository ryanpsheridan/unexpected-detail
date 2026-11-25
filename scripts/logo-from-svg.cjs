// Builds src/components/Logo.astro from the supplied color SVG. Geometry is
// Usage: node scripts/logo-from-svg.cjs public/brand/logo-dark-color.svg src/components/Logo.astro
// copied verbatim; only fill/stop colors are swapped for CSS-driven ones.
const fs = require('fs');
const [,, src, out] = process.argv;
const svg = fs.readFileSync(src, 'utf8');
const body = svg.slice(svg.indexOf('>') + 1, svg.indexOf('<defs>')).trim()
  .replace(/ fill="#141414"/g, '')
  .replace(/fill="url\(#paint0_linear_40000323_300\)"/, 'fill={`url(#${gid})`}');
const grad = svg.match(/<linearGradient id="[^"]+"([^>]*)>/)[1];
const lines = body.split('\n').map((l) => '    ' + l).join('\n');
const tpl = `---
/*
  The primary logo, from the approved artwork (public/brand/logo-*.svg,
  800 by 216). Every path and stroke below is copied verbatim from
  logo-dark-color.svg; only the colors are left to CSS, so one copy of the
  artwork serves every ground:

    --logo-fg    the letters and the lines   (#141414 on light, #fff on dark)
    --logo-dot   the dot of the i            (#B8890F on light, #EECA57 on dark)

  Those defaults are the supplied assets' own colors (site.css sets them
  per ground). \`mono\` draws the single-color version: the dot takes the
  letter color. Size it with width or height in CSS; the viewBox keeps the
  proportions. Regenerate with scripts/logo-from-svg.cjs, never
  by hand: the artwork is final.
*/
interface Props {
  mono?: boolean;
  class?: string;
  /** The accessible name. Pass "" when a parent already names it (a link). */
  label?: string;
}
const { mono = false, class: cls, label = "unexpected detail" } = Astro.props;
// Each copy needs its own gradient id (the nav and the footer share a page).
const gid = \`ud-logo-i-\${Math.random().toString(36).slice(2, 8)}\`;
---

<svg
  class:list={["ud-logo", { "ud-logo--mono": mono }, cls]}
  viewBox="0 0 800 216"
  fill="currentColor"
  role={label ? "img" : undefined}
  aria-label={label || undefined}
  aria-hidden={label ? undefined : "true"}
>
  <g>
${lines}
  </g>
  <defs>
    <linearGradient id={gid}${grad}>
      <stop class="ud-logo-dot" />
      <stop class="ud-logo-dot" offset="0.279358" />
      <stop offset="0.279358" stop-color="currentColor" />
    </linearGradient>
  </defs>
</svg>

<style>
  .ud-logo {
    display: block;
    overflow: visible;
    color: var(--logo-fg, #141414);
  }
  .ud-logo-dot {
    stop-color: var(--logo-dot, #b8890f);
  }
  .ud-logo--mono .ud-logo-dot {
    stop-color: currentColor;
  }
</style>
`;
fs.writeFileSync(out, tpl);
