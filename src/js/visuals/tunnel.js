// Third eye tunnel (3.6): side view of a head facing left; the eye is a tunnel running horizontally
// from between the eyebrows to the occipital bone at the back of the head.
const T = {
  tr: {
    aria: "Yandan baş: üçüncü göz, kaşların arasından başın arkasındaki artkafa kemiğine yatay uzanan bir tüneldir.",
    front: ["kaşların", "arası"], back: ["artkafa", "kemiği"], tunnel: "üçüncü göz tüneli",
  },
  en: {
    aria: "Head in profile: the third eye is a tunnel running horizontally from between the eyebrows to the occipital bone at the back of the head.",
    front: ["between the", "eyebrows"], back: ["occipital", "bone"], tunnel: "third eye tunnel",
  },
};

// same head as the larynx visual (profile facing left), drawn from outside
const HEAD = "M104 236 C103 224 100 212 99 204 C98 199 100 195 100 192 C100 186 101 181 102 177 C94 173 78 172 66 169 C57 167 50 163 48.5 156 C47.5 152 49 149 52 147.5 C49.5 146 48.5 142.5 49.5 139.5 C50 138 51 136.5 52.5 135.5 C50 134.5 47.5 132 47.5 128 C47.5 125.5 49 123.5 51 122.5 C47 121 42 120.5 40 118.5 C36.5 116.5 36.5 111.5 39.5 108.5 C44 101 50 92 52 85 C53 82 52 79 51 76 C49 66 51 50 58 38 C68 22 88 12 112 11 C142 10 166 24 176 50 C182 68 182 92 174 110 C170 118 166 126 165 136 C164 150 166 164 170 178 C174 196 178 216 180 236";
const SKULL = "M62 80 C58 62 62 44 74 32 C86 20 100 17 114 17 C140 17 160 30 168 50 C174 66 174 90 168 104 C164 112 158 118 150 120 L142 118 C136 110 126 100 116 94 L106 90 C94 88 80 86 68 86 C64 86 62 84 62 80 Z";
const OCCIPUT = "M168.5 50 C172.5 60 174 72 174 86 C174 98 170 108 164 114 C160 118 155 120 150 121";
const BROW = "M55 77 C59 75 65 75 70 77.5";
const EYE = "M56.5 91.5 C59.5 94.5 64 95 67.5 92.5";
const EAR = "M121 92 C124 86 133 85 137 90 C141 96 139 104 135 110 C132 115 132 121 127 123 C124 124 122 122 122 119 M126 94 C129 91 133 93 133 98 C133 103 129 106 128 110";
const JAW = "M122 127 C121 137 119 145 114 151 C108 157 96 162 84 165";
const X0 = 51.5, X1 = 175, Y0 = 74, Y1 = 87, YC = 80.5, DX = 57; // tunnel (head coordinates), head offset

export default {
  id: "tunnel",
  states: [],
  render(state, lang) {
    const t = T[lang] || T.en;
    const rings = [82, 110, 138].map(x =>
      `<ellipse class="tunnel-ring" cx="${x}" cy="${YC}" rx="2.4" ry="6.5"/>`).join("");
    const fx = X0 + DX, bx = 181.6 + DX; // front skin point, back of head (viewBox coords)
    return `<svg viewBox="0 0 320 240" width="100%" role="img" aria-label="${t.aria}" xmlns="http://www.w3.org/2000/svg">
<style>
.tunnel-ink{fill:none;stroke:var(--ink);stroke-opacity:.8;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.tunnel-soft{fill:none;stroke:var(--ink);stroke-opacity:.5;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.tunnel-faint{fill:none;stroke:var(--ink);stroke-opacity:.22;stroke-width:1.5;stroke-linecap:round}
.tunnel-skull{fill:none;stroke:var(--line);stroke-width:1.8;stroke-linejoin:round}
.tunnel-bone{fill:none;stroke:var(--muted);stroke-opacity:.7;stroke-width:3;stroke-linecap:round}
.tunnel-band{fill:url(#tunnel-lg);stroke:none}
.tunnel-edge{fill:none;stroke:var(--accent);stroke-width:1.8;stroke-linecap:round}
.tunnel-ring{fill:none;stroke:var(--accent);stroke-opacity:.35;stroke-width:1.2}
.tunnel-mouth{fill:var(--accent);fill-opacity:.25;stroke:var(--accent);stroke-width:1.8}
.tunnel-end{fill:var(--violet);fill-opacity:.25;stroke:var(--accent);stroke-opacity:.7;stroke-width:1.5}
.tunnel-halo{fill:url(#tunnel-rg);stroke:none}
.tunnel-lead{fill:none;stroke:var(--muted);stroke-width:1}
.tunnel-t{fill:var(--muted);font:12.5px var(--font-body)}
.tunnel-ta{fill:var(--accent);font:600 12px var(--font-body)}
.tunnel-light{opacity:0}
@media (prefers-reduced-motion: no-preference){
.tunnel-light{animation:tunnel-go 7s ease-in-out infinite}
.tunnel-breathe{transform-box:fill-box;transform-origin:center;animation:tunnel-b 7s ease-in-out infinite}
@keyframes tunnel-go{0%{opacity:0;transform:translateX(0)}15%{opacity:.9}80%{opacity:.6}100%{opacity:0;transform:translateX(${X1 - X0 - 8}px)}}
@keyframes tunnel-b{0%,100%{opacity:.7;transform:scale(.9)}50%{opacity:1;transform:scale(1.08)}}
}
</style>
<defs>
<linearGradient id="tunnel-lg" x1="0" x2="1" y1="0" y2="0"><stop offset="0" style="stop-color:var(--accent);stop-opacity:.35"/><stop offset=".35" style="stop-color:var(--violet);stop-opacity:.22"/><stop offset="1" style="stop-color:var(--violet);stop-opacity:.12"/></linearGradient>
<radialGradient id="tunnel-rg"><stop offset="0" style="stop-color:var(--glow);stop-opacity:1"/><stop offset="1" style="stop-color:var(--glow);stop-opacity:0"/></radialGradient>
</defs>
<g transform="translate(${DX} 0)">
<path class="tunnel-skull" d="${SKULL}"/>
<path class="tunnel-bone" d="${OCCIPUT}"/>
<path class="tunnel-faint" d="${JAW}"/>
<path class="tunnel-soft" d="${EAR}"/>
<path class="tunnel-ink" d="${HEAD}"/>
<path class="tunnel-soft" d="${EYE}"/>
<rect class="tunnel-band" x="${X0}" y="${Y0}" width="${X1 - X0}" height="${Y1 - Y0}"/>
${rings}
<path class="tunnel-edge" d="M${X0} ${Y0} H${X1} M${X0} ${Y1} H${X1}"/>
<path class="tunnel-soft" d="${BROW}"/>
<ellipse class="tunnel-end" cx="${X1}" cy="${YC}" rx="2.4" ry="6.5"/>
<circle class="tunnel-halo tunnel-breathe" cx="${X0}" cy="${YC}" r="17"/>
<ellipse class="tunnel-mouth" cx="${X0}" cy="${YC}" rx="3.2" ry="6.5"/>
<ellipse class="tunnel-halo tunnel-light" cx="${X0 + 4}" cy="${YC}" rx="9" ry="9"/>
</g>
<text class="tunnel-ta" x="${(fx + X1 + DX) / 2}" y="57" text-anchor="middle">${t.tunnel}</text>
<text class="tunnel-t" x="86" y="${YC - 4}" text-anchor="end">${t.front[0]}</text>
<text class="tunnel-t" x="86" y="${YC + 13}" text-anchor="end">${t.front[1]}</text>
<path class="tunnel-lead" d="M90 ${YC} H${fx - 6}"/>
<text class="tunnel-t" x="${bx + 9}" y="${YC - 4}">${t.back[0]}</text>
<text class="tunnel-t" x="${bx + 9}" y="${YC + 13}">${t.back[1]}</text>
<path class="tunnel-lead" d="M${X1 + DX + 3} ${YC} H${bx + 5}"/>
</svg>`;
  },
};
