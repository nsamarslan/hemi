// First opening of the third eye (3.2): lying on the back, side view, head on the left, eyes closed.
// throat → glow at the larynx with friction waves; eyebrows → glow between the eyebrows linked to the throat;
// palm → one palm hovering 3–5 cm above the point between the eyebrows (no contact); still → hand back, stillness.
const T = {
  tr: {
    aria: {
      throat: "Sırt üstü yatan kişi, gözler kapalı: gırtlakta sürtünmenin titreşimi.",
      eyebrows: "Sırt üstü yatan kişi: farkındalık kaşların arasında, gırtlak sürtünmesiyle bağlantılı.",
      palm: "Sırt üstü yatan kişi: bir avuç kaşların arasının 3–5 cm üstünde, cilde dokunmadan duruyor.",
      still: "Sırt üstü yatan kişi: el yanda, kaşların arasında sessiz bir parıltı, tam hareketsizlik.",
    },
    throat: "gırtlak sürtünmesi", brows: "kaşların arası", gap: "3–5 cm", touch: "dokunmadan", still: "hareketsizlik",
  },
  en: {
    aria: {
      throat: "Person lying on the back, eyes closed: the vibration of the friction in the larynx.",
      eyebrows: "Person lying on the back: awareness between the eyebrows, connected with the throat friction.",
      palm: "Person lying on the back: one palm 3–5 cm above the point between the eyebrows, not touching the skin.",
      still: "Person lying on the back: hand back by the side, a quiet glow between the eyebrows, complete stillness.",
    },
    throat: "throat friction", brows: "between the eyebrows", gap: "3–5 cm", touch: "not touching", still: "stillness",
  },
};

// Head profile drawn upright, facing right, origin at the crown (1 unit ≈ 0.3 cm here); placed lying by P().
const HEAD = "M-11 62 C-12 54 -23 47 -23 31 C-23 12 -11 0 3 0 C17 0 26 9 27 21 C27.6 24.5 27 26.5 26.2 28.2 " +
  "C28.4 31.5 31.6 35 33.4 38.6 C34 40.4 31.6 41.8 28.6 41.6 C29.6 43 29.2 44.6 28.3 45.2 C28.9 46.2 28.9 47.6 27.9 48.6 " +
  "C28.2 51.2 27.6 54.2 25 56 C21 58.8 16.5 59 13 60";
const EAR = "M1 28 C-4 27 -6 33 -4 37 C-3 40 0 41 1 39";
const EYE = "M19 29.6 C20.5 31.4 23 31.6 24.6 30.2";
const JAW = "M-1 44 C1 50 4 53 9 55.5 C13 57.5 18 58 22 57.2";

const TX = 66, TY = 177, S = 1.35, FLOOR = 208;
const P = (x, y) => [TX + S * y, TY - S * x];       // upright head coords → lying screen coords
const f = n => +n.toFixed(1);
const G = P(27.3, 25).map(f);                        // between the eyebrows (skin)
const L = P(12.5, 66).map(f);                        // larynx

// body, screen coords
const NECK = "M147 159.5 C155 161 165 161.5 175 161";
const CHEST = "M175 161 C190 156 205 140 230 138 C252 136 268 147 290 148 C305 149 315 147 330 150";
const NAPE = "M150 191.9 C160 191.9 168 196 178 202 C184 205.5 190 207.6 197 208";
const ARM = "M163 188 C166 179 178 175 194 175 C226 177 262 180 330 184";
// raised arm, palm down 3-5 cm over the point between the eyebrows (palm state)
const RAISED = "M163 189 C170 186 176 180 177 168 C178 145 174 122 176 100 M220 180 C212 176 207 170 207 160 C208 135 206 110 204 90 C205 80 198 75 190 77 " +
  "C165 86 140 100 122 110 C110 108 95 109 82 112 C74 114 66 118 60 123 C57 126 57 129 61 129 " +
  "C68 128 76 126 84 126 C92 126 98 127 104 127 C112 127 118 125 122 121 C140 113 160 106 176 100";
const THUMB = "M115 124.5 C106 125.5 97 125 90 123.5";
const ARMHOLE = "M170 185 L174 98 L188 72 L210 82 L210 175 Z";
let uid = 0;

export default {
  id: "first-opening",
  states: ["throat", "eyebrows", "palm", "still"],
  render(state, lang) {
    const t = T[lang] || T.en;
    const st = this.states.includes(state) ? state : "palm";
    const id = "first-opening-" + (++uid);
    const head = `<g transform="translate(${TX} ${TY}) rotate(-90) scale(${S})">` +
      `<path class="first-opening-ink" style="stroke-width:${f(2 / S)}" d="${HEAD}"/>` +
      `<path class="first-opening-soft" style="stroke-width:${f(1.5 / S)}" d="${EAR} ${EYE} ${JAW}"/></g>`;
    const glow = (c, r, cls = "") =>
      `<circle class="first-opening-glow ${cls}" style="fill:url(#${id}-g)" cx="${c[0]}" cy="${c[1]}" r="${r}"/>`;
    const dot = (c, r = 2.6, cls = "") => `<circle class="first-opening-dot ${cls}" cx="${c[0]}" cy="${c[1]}" r="${r}"/>`;
    const arc = (c, r, a0, a1) => {
      const p = a => [f(c[0] + r * Math.cos(a * Math.PI / 180)), f(c[1] + r * Math.sin(a * Math.PI / 180))];
      const [x0, y0] = p(a0), [x1, y1] = p(a1);
      return `M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}`;
    };
    const gIn = [G[0] + 1, f(G[1] + 2.5)];             // just inside the skin
    const label = (x, y, txt, key) =>
      `<text class="first-opening-${key ? "ta" : "t"}" x="${x}" y="${y}" text-anchor="middle">${txt}</text>`;

    let body = `<path class="first-opening-floor" d="M14 ${FLOOR} H316"/>` + head +
      `<path class="first-opening-body" style="stroke:url(#${id}-f)" d="${NAPE}"/>`;
    if (st === "palm") {
      body += `<g clip-path="url(#${id}-c)"><path class="first-opening-body" style="stroke:url(#${id}-f)" d="${NECK} ${CHEST}"/></g>` +
        `<path class="first-opening-ink" d="${RAISED}"/><path class="first-opening-soft" d="${THUMB}"/>`;
    } else {
      body += `<path class="first-opening-body" style="stroke:url(#${id}-f)" d="${NECK} ${CHEST}"/>` +
        `<path class="first-opening-arm" style="stroke:url(#${id}-f)" d="${ARM}"/>`;
    }

    let marks, labels;
    if (st === "throat") {
      const waves = [7, 11.5, 16].map((r, i) =>
        `<path class="first-opening-wave first-opening-w${i}" d="${arc(L, r, -118, -42)}"/>`).join("");
      marks = glow(L, 20, "first-opening-pulse") + waves + dot(L);
      labels = label(L[0], 120, t.throat, 1);
    } else if (st === "eyebrows") {
      marks = glow(L, 10) + glow(gIn, 22, "first-opening-pulse") +
        `<path class="first-opening-link" d="M${L[0]} ${L[1]} Q${L[0] - 22} ${L[1] - 2} ${gIn[0]} ${gIn[1]}"/>` +
        dot(L, 2, "first-opening-faint") + dot(gIn);
      labels = label(G[0] + 6, 118, t.brows, 1);
    } else if (st === "palm") {
      const top = 127.5, bot = f(G[1] - 1.2), x = G[0];
      marks = glow(gIn, 17, "first-opening-pulse") + dot(gIn, 2.2) +
        `<path class="first-opening-dim" d="M${x} ${top + 1.5} V${bot - 1.5} M${x - 2.5} ${top} h5 M${x - 2.5} ${bot} h5"/>`;
      labels = label(x, 104, t.gap, 1) + label(x, 87, t.touch);
    } else {
      marks = `<path class="first-opening-aura" style="filter:url(#${id}-b)" d="M58 206 C52 180 62 150 82 134 C94 125 108 121 122 121 C138 122 148 132 162 146 C182 144 200 127 230 125 C258 124 280 134 312 137"/>` +
        glow(gIn, 26, "first-opening-slow") + dot(gIn, 2, "first-opening-faint");
      labels = label(G[0] + 30, 98, t.still);
    }

    return `<svg viewBox="0 0 320 240" width="100%" role="img" aria-label="${t.aria[st]}" xmlns="http://www.w3.org/2000/svg">
<style>
.first-opening-ink{fill:none;stroke:var(--ink);stroke-opacity:.8;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.first-opening-soft{fill:none;stroke:var(--ink);stroke-opacity:.5;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
.first-opening-body{fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.first-opening-arm{fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;opacity:.7}
.first-opening-floor{fill:none;stroke:var(--line);stroke-width:1.5;stroke-linecap:round}
.first-opening-glow{stroke:none}
.first-opening-dot{fill:var(--accent);stroke:none}
.first-opening-faint{opacity:.55}
.first-opening-wave{fill:none;stroke:var(--accent);stroke-width:1.6;stroke-linecap:round}
.first-opening-w1{opacity:.7}.first-opening-w2{opacity:.4}
.first-opening-link{fill:none;stroke:var(--accent);stroke-width:1.4;stroke-linecap:round;stroke-dasharray:2 4;opacity:.75}
.first-opening-dim{fill:none;stroke:var(--accent);stroke-width:1.4;stroke-linecap:round}
.first-opening-lead{fill:none;stroke:var(--accent);stroke-width:1;stroke-dasharray:1.5 2.5;opacity:.8}
.first-opening-aura{fill:none;stroke:var(--glow);stroke-width:9;stroke-linecap:round;opacity:.6}
.first-opening-t{fill:var(--muted);font:12px var(--font-body)}
.first-opening-ta{fill:var(--accent);font:700 12.5px var(--font-body)}
@media (prefers-reduced-motion: no-preference){
.first-opening-pulse,.first-opening-slow{transform-box:fill-box;transform-origin:center;animation:first-opening-p 5s ease-in-out infinite}
.first-opening-slow{animation-duration:8s}
@keyframes first-opening-p{0%,100%{opacity:.6;transform:scale(.88)}50%{opacity:1;transform:scale(1.06)}}
.first-opening-wave{animation:first-opening-w 3s ease-out infinite}
.first-opening-w1{animation-delay:.5s}.first-opening-w2{animation-delay:1s}
@keyframes first-opening-w{0%{opacity:.1}35%{opacity:1}100%{opacity:.1}}
.first-opening-link{animation:first-opening-l 3s linear infinite}
@keyframes first-opening-l{to{stroke-dashoffset:-12}}
.first-opening-aura{animation:first-opening-a 8s ease-in-out infinite}
@keyframes first-opening-a{0%,100%{opacity:.35}50%{opacity:.8}}
}
</style>
<defs>
<radialGradient id="${id}-g"><stop offset="0" style="stop-color:var(--accent);stop-opacity:.5"/><stop offset=".45" style="stop-color:var(--glow);stop-opacity:1"/><stop offset="1" style="stop-color:var(--glow);stop-opacity:0"/></radialGradient>
<linearGradient id="${id}-f" gradientUnits="userSpaceOnUse" x1="262" y1="0" x2="318" y2="0"><stop offset="0" style="stop-color:var(--ink);stop-opacity:.8"/><stop offset="1" style="stop-color:var(--ink);stop-opacity:0"/></linearGradient>
<filter id="${id}-b" x="-10%" y="-30%" width="120%" height="160%"><feGaussianBlur stdDeviation="4"/></filter>
<clipPath id="${id}-c"><path clip-rule="evenodd" d="M0 0H320V240H0Z ${ARMHOLE}"/></clipPath>
</defs>
${body}
${marks}
${labels}
</svg>`;
  },
};
