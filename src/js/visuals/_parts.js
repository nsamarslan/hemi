// Shared drawing helpers for the technique visuals (same strokes, labels and glow as larynx / first-opening).
let n = 0;
export const uid = p => `${p}${++n}`;

export function css(p, extra = "") {
  return `<style>
.${p}-b{fill:none;stroke:var(--ink);stroke-opacity:.62;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.${p}-f{fill:none;stroke:var(--ink);stroke-opacity:.28;stroke-width:1.2;stroke-linecap:round}
.${p}-a{fill:none;stroke:var(--accent);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.${p}-d{stroke-dasharray:5 5}
.${p}-t{font:12px var(--font-body);fill:var(--muted)}
.${p}-k{font:700 12.5px var(--font-body);fill:var(--accent)}
.${p}-dot{fill:var(--accent)}
@media (prefers-reduced-motion:no-preference){
.${p}-pulse{animation:${p}-pulse 4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
@keyframes ${p}-pulse{0%,100%{opacity:.45;transform:scale(.85)}50%{opacity:1;transform:scale(1.08)}}
.${p}-flow{stroke-dasharray:6 8;animation:${p}-flow 2.4s linear infinite}
@keyframes ${p}-flow{to{stroke-dashoffset:-28}}
${extra}}
</style>`;
}

/** Radial glow gradient definition + a circle using it. */
export const glowDef = id => `<radialGradient id="${id}"><stop offset="0" style="stop-color:var(--accent);stop-opacity:.75"/><stop offset=".55" style="stop-color:var(--accent);stop-opacity:.22"/><stop offset="1" style="stop-color:var(--accent);stop-opacity:0"/></radialGradient>`;
export const glow = (id, x, y, r, cls = "") => `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}" fill="url(#${id})"/>`;

export const svg = (vb, aria, body) =>
  `<svg viewBox="${vb}" width="100%" role="img" aria-label="${aria.replace(/"/g, "&quot;")}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;

export const label = (p, x, y, text, key = false, anchor = "start") =>
  `<text x="${x}" y="${y}" class="${p}-${key ? "k" : "t"}" text-anchor="${anchor}">${text}</text>`;

/** A leader line from (x1,y1) to a label point. */
export const leader = (p, x1, y1, x2, y2) => `<path class="${p}-f" d="M${x1} ${y1} L${x2} ${y2}"/>`;

/** Seated figure, front view, cross-legged; centre x=cx, head centre y=hy. Returns key points too. */
export function seatedFront(p, cx = 160, hy = 58, armsOut = true) {
  const s = `
<circle class="${p}-b" cx="${cx}" cy="${hy}" r="16"/>
<path class="${p}-b" d="M${cx - 6} ${hy + 15} L${cx - 6} ${hy + 24} M${cx + 6} ${hy + 15} L${cx + 6} ${hy + 24}"/>
<path class="${p}-b" d="M${cx - 6} ${hy + 24} C${cx - 22} ${hy + 25} ${cx - 33} ${hy + 30} ${cx - 34} ${hy + 44} C${cx - 33} ${hy + 70} ${cx - 30} ${hy + 92} ${cx - 27} ${hy + 108}
M${cx + 6} ${hy + 24} C${cx + 22} ${hy + 25} ${cx + 33} ${hy + 30} ${cx + 34} ${hy + 44} C${cx + 33} ${hy + 70} ${cx + 30} ${hy + 92} ${cx + 27} ${hy + 108}"/>
<path class="${p}-b" d="M${cx - 27} ${hy + 108} C${cx - 60} ${hy + 110} ${cx - 82} ${hy + 118} ${cx - 82} ${hy + 130} C${cx - 82} ${hy + 140} ${cx - 50} ${hy + 142} ${cx} ${hy + 134}
C${cx + 50} ${hy + 142} ${cx + 82} ${hy + 140} ${cx + 82} ${hy + 130} C${cx + 82} ${hy + 118} ${cx + 60} ${hy + 110} ${cx + 27} ${hy + 108}"/>
<path class="${p}-f" d="M${cx - 40} ${hy + 128} C${cx - 15} ${hy + 120} ${cx + 15} ${hy + 120} ${cx + 40} ${hy + 128}"/>
<path class="${p}-b" d="M${cx - 6} ${hy + 4} C${cx - 4} ${hy + 6} ${cx - 2} ${hy + 6} ${cx - 1} ${hy + 4} M${cx + 1} ${hy + 4} C${cx + 2} ${hy + 6} ${cx + 4} ${hy + 6} ${cx + 6} ${hy + 4}"/>
${armsOut ? `<path class="${p}-b" d="M${cx - 31} ${hy + 34} C${cx - 42} ${hy + 60} ${cx - 50} ${hy + 86} ${cx - 56} ${hy + 104} M${cx + 31} ${hy + 34} C${cx + 42} ${hy + 60} ${cx + 50} ${hy + 86} ${cx + 56} ${hy + 104}"/>
<path class="${p}-b" d="M${cx - 64} ${hy + 104} C${cx - 58} ${hy + 108} ${cx - 50} ${hy + 108} ${cx - 44} ${hy + 104} M${cx + 44} ${hy + 104} C${cx + 50} ${hy + 108} ${cx + 58} ${hy + 108} ${cx + 64} ${hy + 104}"/>` : ""}`;
  return { s, brow: [cx, hy - 3], palmL: [cx - 54, hy + 101], palmR: [cx + 54, hy + 101], belly: [cx, hy + 96], crown: [cx, hy - 16], chest: [cx, hy + 50] };
}
