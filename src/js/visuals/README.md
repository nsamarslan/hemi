# Technique visuals

One ES module per visual: `src/js/visuals/<id>.js`, registered in `src/js/visuals/index.js`.

```js
// src/js/visuals/larynx.js
export default {
  id: "larynx",
  states: [],                       // allowed states (see content/SCHEMA.md "Visual ids"); [] = static
  render(state, lang) { return `<svg ...>...</svg>`; }   // returns an SVG string
};
```

## Rules

- **Line art**, calm and precise, like a clean anatomy/yoga manual: 1.5–2.5 px strokes, round caps/joins,
  few fills. The figure itself in `var(--ink)` (often at reduced opacity), structure lines in `var(--line)`
  or `var(--muted)`, the thing the person must notice in `var(--accent)` (honey), the purple space in
  `var(--violet)`, soft halos in `var(--glow)`. **Only these CSS variables** for colour — never hex/rgb literals —
  so the drawing works in light, dark and the dim night theme. Every shape gets an explicit `fill`
  (`none` or a variable).
- `viewBox="0 0 320 240"` (landscape) unless the subject really needs `0 0 240 320` (standing figure).
  The SVG has `width="100%"` and no fixed height; `role="img"` and an `aria-label` in the current language.
- Labels: short, in the current language (`lang` is `"tr"` or `"en"`), `font-family: var(--font-body)`,
  12–13 px, `fill: var(--muted)` (or `var(--accent)` for the key label). Keep labels inside the viewBox with margin.
- **States**: `render(state)` must draw a visibly different picture per state (highlight the relevant
  part, move the glow, change the arrow). Unknown/empty state → a sensible default.
- **Animation** only where motion explains something (rubbing direction, vortex spin, aura expanding and
  contracting, a glow moving up the spine). Use CSS `@keyframes` inside the SVG's own `<style>`; prefix all class
  names and keyframes with the visual id (e.g. `.larynx-glow`) so visuals never collide. Slow and gentle
  (2–8 s cycles). Wrap animations in `@media (prefers-reduced-motion: no-preference) { ... }`.
- No external resources, no images, no `<script>`, no fonts other than the variables. Keep each visual under ~12 KB.
- Draw it yourself; don't trace or copy the book's figures — follow the book's *description* of where things are.

## Preview

`node tools/visual-preview.mjs` renders every visual × state × theme (light, dark, night) to
`build/visual-preview/*.png` and a contact sheet `build/visual-preview/sheet.png`. Look at them and fix what is
unclear, clipped, overlapping or ugly.
