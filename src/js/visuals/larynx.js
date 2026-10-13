// Throat friction areas (2.1): side cross-section of head and neck, profile facing left.
// L = larynx / lower back of the throat (the right place), M = middle of mouth, F = front near the teeth,
// N = upper pharynx behind the nasal cavity.
const T = {
  tr: {
    aria: "Baş ve boyun kesiti: sürtünme L bölgesinden, gırtlaktan gelir. M ağzın ortası, F ön dişler, N geniz: bunlar yanlış yerlerdir.",
    L: "gırtlak", ok: "doğru yer", M: "ağız ortası", F: "ön dişler", N: "geniz",
  },
  en: {
    aria: "Head and neck cross-section: the friction comes from area L, the larynx. M (middle of the mouth), F (front, near the teeth) and N (behind the nose) are the wrong places.",
    L: "larynx", ok: "the right place", M: "mid-mouth", F: "front teeth", N: "behind the nose",
  },
};

// head outline (profile facing left)
const HEAD = "M104 236 C103 224 100 212 99 204 C98 199 100 195 100 192 C100 186 101 181 102 177 C94 173 78 172 66 169 C57 167 50 163 48.5 156 C47.5 152 49 149 52 147.5 C49.5 146 48.5 142.5 49.5 139.5 C50 138 51 136.5 52.5 135.5 C50 134.5 47.5 132 47.5 128 C47.5 125.5 49 123.5 51 122.5 C47 121 42 120.5 40 118.5 C36.5 116.5 36.5 111.5 39.5 108.5 C44 101 50 92 52 85 C53 82 52 79 51 76 C49 66 51 50 58 38 C68 22 88 12 112 11 C142 10 166 24 176 50 C182 68 182 92 174 110 C170 118 166 126 165 136 C164 150 166 164 170 178 C174 196 178 216 180 236";
// inner skull (brain case + skull base)
const SKULL = "M62 80 C58 62 62 44 74 32 C86 20 100 17 114 17 C140 17 160 30 168 50 C174 66 174 90 168 104 C164 112 158 118 150 120 L142 118 C136 110 126 100 116 94 L106 90 C94 88 80 86 68 86 C64 86 62 84 62 80 Z";
// nasal roof, nasopharynx roof and back wall of the pharynx
const NOSE = "M53 89 C68 90 90 91 106 93";
const PHAR = "M106 93 C116 94 126 98 130 106 C133 114 133 126 132 140 C131 170 132 200 133 236";
const TURB = "M68 99 C80 96 98 97 106 102 C96 104 80 104 68 99 Z M62 108 C74 104 94 105 106 110 C96 112 76 112 62 108 Z";
// hard palate + soft palate (velum, hanging back with the uvula)
const PALATE = "M54 120 C70 118 90 117 106 118 C114 120 120 126 123 133 C124 138 122 140 119 138 C116 132 112 127 104 124 C90 123 70 124 55 125 Z";
// teeth
const TEETH = "M52 124 C54 127 55 131 54 135 C52 134 51 130 51 126 Z M53 146 C55 143 55 139 54 137 C52 139 51 143 52 146 Z";
// tongue (dorsum and root), floor of the mouth
const TONGUE = "M56 140 C60 134 68 130 80 128.5 C94 127 106 128 114 134 C120 140 121 150 120 158 C120 162 119 165 118 168";
const TBODY = "M56 140 C60 134 68 130 80 128.5 C94 127 106 128 114 134 C120 140 121 150 120 158 C120 162 119 165 118 168 L112 172 C108 170 102 168 94 165 C78 160 64 154 56 145 Z";
const FLOOR = "M56 145 C64 154 78 160 94 165 C102 168 108 170 112 172";
// epiglottis
const EPI = "M118 168 C119 160 123 152 128 148 C129 154 127 162 122 170";
// larynx: front wall (thyroid, cricoid) + trachea; back wall + oesophagus; vocal folds
const LAR = "M112 172 C110 180 107 188 107 196 C108 204 111 212 112 236 M127 182 C124 190 123 200 123 210 L123 236";
const FOLDS = "M108 192 L117 194 M123 193 L118 194";

function spine() {
  let s = `<path class="larynx-bone" d="M136 120 C136 114 141 112 145 116 L147 126"/>`;
  for (let i = 0; i < 6; i++) {
    s += `<rect class="larynx-bone" x="${136.5 + i * 0.6}" y="${128 + i * 18}" width="13" height="13" rx="3.5"/>`;
  }
  return s + `<path class="larynx-faint" d="M156 124 C156 160 158 200 160 236 M163 126 C163 160 165 200 167 236"/>`;
}

const DOT = { N: [121, 106], M: [88, 128], F: [61, 131] };
const LBL = { N: 100, M: 120, F: 142 };
const L = [122, 184];

export default {
  id: "larynx",
  states: [],
  render(state, lang) {
    const t = T[lang] || T.en;
    let marks = "";
    for (const k of ["N", "M", "F"]) {
      const [x, y] = DOT[k], ly = LBL[k], a = Math.atan2(y - ly + 4, x - 20);
      marks += `<path class="larynx-lead" d="M20 ${ly - 4} L${(x - 4.2 * Math.cos(a)).toFixed(1)} ${(y - 4.2 * Math.sin(a)).toFixed(1)}"/>` +
        `<circle class="larynx-dot" cx="${x}" cy="${y}" r="3.6"/><text class="larynx-t" x="8" y="${ly}">${k}</text>`;
    }
    const row = (y, k, txt) =>
      `<path class="larynx-x" d="M188 ${y - 8} l6 6 m0 -6 l-6 6"/>` +
      `<text class="larynx-t" x="200" y="${y}">${k}</text><text class="larynx-tl" x="218" y="${y}">${txt}</text>`;
    return `<svg viewBox="0 0 320 240" width="100%" role="img" aria-label="${t.aria}" xmlns="http://www.w3.org/2000/svg">
<style>
.larynx-ink{fill:none;stroke:var(--ink);stroke-opacity:.8;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.larynx-soft{fill:none;stroke:var(--ink);stroke-opacity:.45;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.larynx-fill{fill:var(--ink);fill-opacity:.07;stroke:var(--ink);stroke-opacity:.45;stroke-width:1.5;stroke-linejoin:round}
.larynx-bone{fill:var(--line);fill-opacity:.35;stroke:var(--muted);stroke-opacity:.45;stroke-width:1.5;stroke-linejoin:round}
.larynx-body{fill:var(--ink);fill-opacity:.05;stroke:none}
.larynx-faint{fill:none;stroke:var(--line);stroke-width:1.5;stroke-linecap:round}
.larynx-skull{fill:none;stroke:var(--line);stroke-width:1.8;stroke-linejoin:round}
.larynx-lead{fill:none;stroke:var(--muted);stroke-opacity:.8;stroke-width:1}
.larynx-dot{fill:none;stroke:var(--muted);stroke-width:1.6}
.larynx-ring{fill:none;stroke:var(--accent);stroke-width:1.8;stroke-dasharray:4 3}
.larynx-core{fill:var(--accent);stroke:none}
.larynx-glow{fill:url(#larynx-g);stroke:none}
.larynx-t{fill:var(--muted);font:700 13px var(--font-body)}
.larynx-tl{fill:var(--muted);font:12px var(--font-body)}
.larynx-ta{fill:var(--accent);font:700 13px var(--font-body)}
.larynx-ts{fill:var(--accent);font:12px var(--font-body)}
.larynx-tick{fill:none;stroke:var(--accent);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.larynx-x{fill:none;stroke:var(--muted);stroke-width:1.4;stroke-linecap:round}
@media (prefers-reduced-motion: no-preference){
.larynx-pulse{transform-box:fill-box;transform-origin:center;animation:larynx-p 4s ease-in-out infinite}
@keyframes larynx-p{0%,100%{opacity:.5;transform:scale(.85)}50%{opacity:1;transform:scale(1.08)}}
}
</style>
<defs><radialGradient id="larynx-g"><stop offset="0" style="stop-color:var(--accent);stop-opacity:.45"/><stop offset=".5" style="stop-color:var(--glow);stop-opacity:1"/><stop offset="1" style="stop-color:var(--glow);stop-opacity:0"/></radialGradient></defs>
<path class="larynx-skull" d="${SKULL}"/>
${spine()}
<path class="larynx-faint" d="${TURB}"/>
<path class="larynx-soft" d="${NOSE}"/>
<path class="larynx-soft" d="${PHAR}"/>
<path class="larynx-fill" d="${PALATE}"/>
<path class="larynx-fill" d="${TEETH}"/>
<path class="larynx-body" d="${TBODY}"/>
<path class="larynx-soft" d="${TONGUE}"/>
<path class="larynx-faint" d="${FLOOR}"/>
<path class="larynx-fill" d="${EPI}"/>
<path class="larynx-soft" d="${LAR}"/>
<path class="larynx-soft" d="${FOLDS}"/>
<path class="larynx-ink" d="${HEAD}"/>
<circle class="larynx-glow larynx-pulse" cx="${L[0]}" cy="${L[1]}" r="26"/>
${marks}
<path class="larynx-lead" style="stroke:var(--accent)" d="M20 ${L[1] - 4} L${L[0] - 15.5} ${L[1] - 1}"/>
<circle class="larynx-ring" cx="${L[0]}" cy="${L[1]}" r="15"/>
<circle class="larynx-core" cx="${L[0]}" cy="${L[1]}" r="3"/>
<text class="larynx-ta" x="8" y="${L[1]}">L</text>
<path class="larynx-tick" d="M185.5 147 l3.5 4 l6 -8"/>
<text class="larynx-ta" x="200" y="152">L</text><text class="larynx-ta" x="218" y="152">${t.L}</text>
<text class="larynx-ts" x="218" y="168">${t.ok}</text>
${row(196, "M", t.M)}
${row(215, "F", t.F)}
${row(234, "N", t.N)}
</svg>`;
  },
};
