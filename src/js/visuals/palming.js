// Palming (5.5): seated person in three-quarter view (turned to the viewer's left), head slightly bowed;
// both palms cupped over the closed eyes, touching the skin, fingers resting on the forehead; warmth at the palms.
const T = {
  tr: {
    aria: "Oturan kişi, baş hafifçe öne eğik: iki avuç kapalı gözlerin üstünde, cilde değiyor; parmaklar alında. Avuçların sıcaklığı gözlere işliyor.",
    palms: "avuçlar gözlerde", skin: "cilde değerek", fingers: ["parmaklar", "alında"],
  },
  en: {
    aria: "Seated person, head slightly bowed: both palms over the closed eyes, touching the skin, fingers on the forehead. The warmth of the palms sinks into the eyes.",
    palms: "palms on the eyes", skin: "touching the skin", fingers: ["fingers on", "the forehead"],
  },
};

const f = n => +n.toFixed(1);
// transform every absolute "x y" pair of a path (paths here use only M/L/C/Z)
const tp = (d, fn) => d.replace(/(-?[\d.]+)[ ,]+(-?[\d.]+)/g, (_, x, y) => fn(+x, +y).map(f).join(" "));

// hand seen from the back, fingers up, thumb on the -x side; wrist centre at 0 0, middle fingertip at 0 -60
const HAND = "M9.5 0 C11.5 -6 13.2 -12 13.4 -20 C13.6 -27 14 -33 14 -38 L13.8 -47 C13.8 -51.5 7.6 -52 7.5 -48 L7.5 -53 " +
  "C7.5 -58.5 0.6 -59 0.5 -55 L0.5 -56.5 C0.5 -62 -6.5 -62 -6.6 -56.5 L-6.6 -54 C-6.8 -59.5 -13.6 -59 -13.6 -54 L-13.8 -36 " +
  "C-14 -31 -14.4 -27 -14.8 -24.5 C-15.6 -27 -16.2 -29.5 -16.8 -31.5 C-17.6 -35 -21.4 -34.5 -21 -31 C-20.4 -23 -16.6 -10 -9.5 0";
const FINGERS = "M7.5 -48 L7.3 -36 M0.5 -55 L0.5 -36 M-6.6 -54 L-6.5 -36";
// wrist (x, y), tip direction, width scale, length scale, mirrored (thumb on +x)
const placer = (wx, wy, tx, ty, sw, sl, m) => {
  const a = Math.atan2(tx - wx, wy - ty), c = Math.cos(a), s = Math.sin(a);
  return (x, y) => { x *= (m ? -sw : sw); y *= sl; return [wx + x * c - y * s, wy + x * s + y * c]; };
};
// the head and hands are drawn upright-ish, then bowed forward (to the left) about the neck
const BOW = -7 * Math.PI / 180, PX = 192, PY = 90;
const hr = (x, y) => [PX + (x - PX) * Math.cos(BOW) - (y - PY) * Math.sin(BOW), PY + (x - PX) * Math.sin(BOW) + (y - PY) * Math.cos(BOW)];
const nearL = placer(167.5, 89.5, 151, 38, 1.05, 0.97, true);  // person's left hand (nearer), thumb toward the ear
const farL = placer(141, 89.5, 135, 38, 0.64, 0.95, false);    // person's right hand, seen obliquely
const near = (x, y) => hr(...nearL(x, y)), far = (x, y) => hr(...farL(x, y));
const P = (fn, x, y) => fn(x, y).map(f);
const [nl, nr] = [P(near, 9.5, 0), P(near, -9.5, 0)]; // near wrist: little-finger side (left), thumb side (right)
const [fl, fr] = [P(far, -9.5, 0), P(far, 9.5, 0)];

// head: jaw and chin, then the back of the skull, crown and forehead (the eyes are under the hands)
const HEAD = tp("M160 92 C169 93 178 87 184 78 C186 74 187.5 70 188 66 " +
  "M191 67 C196 61 198.5 51 197 40 C194.5 26 182 17 166 17 C154 17 146 23 143 33 C141 40 141 47 141 54 C141 62 142 70 145 77 C149 85 154 90 160 92", hr);
const EAR = tp("M184 45 C187.5 42 192.5 43.5 192.5 49.5 C192.5 55 190.5 59.5 187.5 61.5 C185.5 62.5 184 61.5 184.2 59.5", hr);
const nb = P(hr, 191, 67);
// back of the neck, shoulder, near side of the back
const NAPE = `M${nb[0]} ${nb[1]} C193 78 196 89 203 96 C209 99 214 100 219 103 C224 107 226 118 223 127 C221.5 131 218.5 133 215 133.5`;
const BACK = "M215 134 C218 156 217 180 214 200 C212 214 212 226 212 240";
// near arm: forearm down to the elbow and upper arm back to the shoulder (one outline)
const NARM_O = `M${nl[0]} ${nl[1]} C151 106 145 126 139 143 C136 151 139 159 147 160 C170 159 196 150 215 133`;
const NARM_I = `M${nr[0]} ${nr[1]} C171 108 167 124 162 134 C161 138 163 139 166 137 C179 127 192 114 205 104`;
const NARM_C = `${NARM_O} L218 118 L205 104 C192 114 179 127 166 137 C163 139 161 138 162 134 C167 124 171 108 ${nr[0]} ${nr[1]} Z`;
// far arm: forearm, and the upper arm going up to the far shoulder
const FARM_O = `M${fl[0]} ${fl[1]} C124 104 118 125 112 143 C109 151 112 157 119 157 C125 157 129 153 131 147`;
const FARM = `${FARM_O} M${fr[0]} ${fr[1]} C143 106 139 122 135 135 C133.8 139 132.6 143.5 131 147`;
const FARM_C = `${FARM_O} L135 135 C139 122 143 106 ${fr[0]} ${fr[1]} Z`;
const FUPPER = "M132 103 C127 102.5 121 104 117.5 108 C113.5 112.5 112 120 111.8 128 C111.7 134 111.9 139 112.4 142.5";
const CLAV = "M146 101.5 C149 102 152 102.5 155 103";
// front of the body, below the far elbow
const FRONT = "M125 158 C125 176 128 196 131 212 C132.5 222 133 230 133 240";
// whole figure → viewBox
const S = 1.1, DX = 14, DY = -2;
const G = (x, y) => [DX + S * x, DY + S * y];
const g = d => tp(d, G);
const PALM_N = P((x, y) => G(...near(x, y)), 0, -25), PALM_F = P((x, y) => G(...far(x, y)), 0, -25);
const LX = 128;
// hidden palm (the part touching the eye), as an ellipse in hand coordinates
const K = 0.5523, ell = (cx, cy, rx, ry) => `M${cx + rx} ${cy} C${cx + rx} ${cy + K * ry} ${cx + K * rx} ${cy + ry} ${cx} ${cy + ry} ` +
  `C${cx - K * rx} ${cy + ry} ${cx - rx} ${cy + K * ry} ${cx - rx} ${cy} C${cx - rx} ${cy - K * ry} ${cx - K * rx} ${cy - ry} ${cx} ${cy - ry} ` +
  `C${cx + K * rx} ${cy - ry} ${cx + rx} ${cy - K * ry} ${cx + rx} ${cy} Z`;
const PALM = ell(0, -24, 8.5, 11);
// final viewBox paths
const D = {
  near: g(tp(HAND, near)), far: g(tp(HAND, far)), nearF: g(tp(FINGERS, near)), farF: g(tp(FINGERS, far)),
  palms: g(tp(PALM, near)) + " " + g(tp(PALM, far)), clipN: g(NARM_C), clipF: g(FARM_C),
  body: g(BACK) + " " + g(FRONT), fupper: g(FUPPER), clav: g(CLAV), head: g(HEAD), ear: g(EAR),
  farm: g(FARM), nape: g(NAPE), narm: g(NARM_O) + " " + g(NARM_I),
};
let uid = 0;

export default {
  id: "palming",
  states: [],
  render(state, lang) {
    const t = T[lang] || T.en;
    const id = "palming-" + (++uid);
    const R = "M-10 -10H330V250H-10Z";
    return `<svg viewBox="0 0 320 240" width="100%" role="img" aria-label="${t.aria}" xmlns="http://www.w3.org/2000/svg">
<style>
.palming-ink{fill:none;stroke:var(--ink);stroke-opacity:.8;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.palming-back{fill:none;stroke:var(--ink);stroke-opacity:.55;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.palming-soft{fill:none;stroke:var(--ink);stroke-opacity:.4;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round}
.palming-body{fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.palming-glow{stroke:none}
.palming-palm{fill:var(--accent);fill-opacity:.12;stroke:var(--accent);stroke-width:1.6;stroke-dasharray:3.5 2.5}
.palming-lead{fill:none;stroke:var(--muted);stroke-width:1}
.palming-leada{fill:none;stroke:var(--accent);stroke-width:1}
.palming-t{fill:var(--muted);font:12px var(--font-body)}
.palming-ta{fill:var(--accent);font:700 12.5px var(--font-body)}
@media (prefers-reduced-motion: no-preference){
.palming-pulse{transform-box:fill-box;transform-origin:center;animation:palming-p 6s ease-in-out infinite}
@keyframes palming-p{0%,100%{opacity:.55;transform:scale(.9)}50%{opacity:1;transform:scale(1.06)}}
}
</style>
<defs>
<radialGradient id="${id}-g"><stop offset="0" style="stop-color:var(--accent);stop-opacity:.5"/><stop offset=".45" style="stop-color:var(--glow);stop-opacity:1"/><stop offset="1" style="stop-color:var(--glow);stop-opacity:0"/></radialGradient>
<linearGradient id="${id}-f" gradientUnits="userSpaceOnUse" x1="0" y1="178" x2="0" y2="232"><stop offset="0" style="stop-color:var(--ink);stop-opacity:.8"/><stop offset="1" style="stop-color:var(--ink);stop-opacity:0"/></linearGradient>
<clipPath id="${id}-n"><path clip-rule="evenodd" d="${R} ${D.near} Z ${D.clipN}"/></clipPath>
<clipPath id="${id}-r"><path clip-rule="evenodd" d="${R} ${D.far} Z ${D.clipF}"/></clipPath>
</defs>
<g clip-path="url(#${id}-n)"><g clip-path="url(#${id}-r)">
<path class="palming-body" style="stroke:url(#${id}-f)" d="${D.body}"/>
<path class="palming-back" d="${D.fupper}"/>
<path class="palming-soft" d="${D.clav}"/>
<path class="palming-ink" d="${D.head}"/>
<path class="palming-soft" d="${D.ear}"/>
</g>
<path class="palming-back" d="${D.farm}"/>
<path class="palming-back" d="${D.far}"/>
<path class="palming-soft" d="${D.farF}"/>
</g>
<path class="palming-ink" d="${D.nape}"/>
<path class="palming-ink" d="${D.narm}"/>
<path class="palming-ink" d="${D.near}"/>
<path class="palming-soft" d="${D.nearF}"/>
<circle class="palming-glow palming-pulse" style="fill:url(#${id}-g)" cx="${PALM_N[0]}" cy="${PALM_N[1]}" r="26"/>
<circle class="palming-glow palming-pulse" style="fill:url(#${id}-g)" cx="${PALM_F[0]}" cy="${PALM_F[1]}" r="20"/>
<path class="palming-palm" d="${D.palms}"/>
<text class="palming-t" x="${LX}" y="34" text-anchor="end">${t.fingers[0]}</text>
<text class="palming-t" x="${LX}" y="48" text-anchor="end">${t.fingers[1]}</text>
<path class="palming-lead" d="M${LX + 4} 41 L${PALM_F[0] - 4} 45"/>
<text class="palming-ta" x="${LX}" y="78" text-anchor="end">${t.palms}</text>
<text class="palming-t" x="${LX}" y="93" text-anchor="end">${t.skin}</text>
<path class="palming-leada" d="M${LX + 4} 74 L${f(PALM_F[0] - 7)} ${f(PALM_F[1] + 1)}"/>
</svg>`;
  },
};
