// Third eye meditation (3.7): seated cross-legged, side view, back very straight (vertical line seat → crown);
// one picture per phase: larynx, eyebrows, light, space, vortex (turning clockwise), above (the head), return.
const T = {
  tr: {
    who: "Dik oturan kişi: ",
    aria: {
      larynx: "Bağdaş kurup dimdik oturan kişi: gırtlakta titreşim; baş, boyun ve sırt tek dikey çizgide.",
      eyebrows: "kaşların arasında titreşim, gırtlak sürtünmesine bağlı.",
      light: "alnın önünde bir pus ve parlayan küçük ışık noktaları.",
      space: "başın önünde açılan derin, mor bir boşluk.",
      vortex: "başın önünde saat yönünde yavaşça dönen sarmal bir tünel, girdap.",
      above: "başın üstünde yumuşak bir parıltı, gerisi sessiz.",
      return: "her şey sakin ve soluk, beden yeniden belirgin.",
    },
    larynx: "gırtlak", upright: "dimdik", eyebrows: "kaşların arası", light: "ışık", space: "mor boşluk",
    vortex: "girdap", above: "başın üstü", aware: "sadece farkında", return: "dönüş",
  },
  en: {
    who: "Seated upright: ",
    aria: {
      larynx: "Sitting cross-legged, back very straight: vibration in the larynx; head, neck and back in one vertical line.",
      eyebrows: "vibration between the eyebrows, connected with the throat friction.",
      light: "a haze in front of the forehead and small shining points of light.",
      space: "a deep purple space opening in front of the head.",
      vortex: "a spiral tunnel, the vortex, turning slowly clockwise in front of the head.",
      above: "a soft glow above the head, everything else quiet.",
      return: "everything calm and dim, the body clear again.",
    },
    larynx: "larynx", upright: "upright", eyebrows: "between the eyebrows", light: "light", space: "purple space",
    vortex: "vortex", above: "above the head", aware: "just aware", return: "coming back",
  },
};

// same head profile as first-opening (upright, facing right, origin at the crown)
const HEAD = "M-11 62 C-12 54 -23 47 -23 31 C-23 12 -11 0 3 0 C17 0 26 9 27 21 C27.6 24.5 27 26.5 26.2 28.2 " +
  "C28.4 31.5 31.6 35 33.4 38.6 C34 40.4 31.6 41.8 28.6 41.6 C29.6 43 29.2 44.6 28.3 45.2 C28.9 46.2 28.9 47.6 27.9 48.6 " +
  "C28.2 51.2 27.6 54.2 25 56 C21 58.8 16.5 59 13 60";
const FACE = "M1 28 C-4 27 -6 33 -4 37 C-3 40 0 41 1 39 M19 29.6 C20.5 31.4 23 31.6 24.6 30.2 M-1 44 C1 50 4 53 9 55.5 C13 57.5 18 58 22 57.2";
const HX = 96, HY = 60, HS = 0.74, SX = 94, FL = 221.5;
const f = n => +n.toFixed(1);
const H = (x, y) => [f(HX + HS * x), f(HY + HS * y)];
const G = H(27.3, 25), GI = [f(G[0] - 2.2), G[1]], L = H(12, 66), CR = H(3, 0);
// body in screen coords: back + legs, front of neck and trunk; crossed shin; near arm with the hand on the knee
const BODY = "M87.9 105.9 C87 110 85.6 113.6 83 117 C79 122 75.6 129 75 140 C74.4 152 75.8 166 77.6 178 C78.6 186 75.6 194 73.8 202 " +
  "C72.4 210 76 219 88 220.5 H150 C160 221 172 221 178 219.5 C182 218.5 183.5 215.5 182 212.5 C185.5 210 187 206 186.5 201 " +
  "C186 195 181 191 172 191 C155 191.5 135 194 117 196 M105.6 104.4 C106 109 106.6 113 108.4 117 C113 122 118.6 128 120 139 " +
  "C121 147 119.4 154 118 160 C116.6 168 117.4 178 118 186 C118.3 190 117.8 193.5 117 196";
const LEG = "M182 212.5 C172 211 160 211.5 150 213.5 C143 215 137.5 217.5 134 220.6";
const ARM = "M83.5 121 C86 113 99 111.5 104.5 119.5 C107 131 108.6 147 110 160 C125 167 140 174 153 178.5 " +
  "C162 180 172 182.5 179 187 C184 190 187 194 186.5 198 C185.5 200 183 200 182.5 197.5 C180 194 174 191 166 190 " +
  "C160 189.5 155 188 152 186.5 C138 183 122 179 106 175 C101 173.5 97.5 170.5 96.5 166 C92 156 87.5 140 85.5 128 C85 125 84 123 83.5 121 Z";
const SPACE = `M${G[0] + 2} ${G[1]} C132 54 176 12 236 12 C284 12 302 50 302 80 C302 110 284 148 236 148 C176 148 132 104 ${G[0] + 2} ${G[1]} Z`;
const VX = 226, VY = 80, VR = 58; // vortex centre and radius
let uid = 0;

export default {
  id: "meditation-phases",
  states: ["larynx", "eyebrows", "light", "space", "vortex", "above", "return"],
  render(state, lang) {
    const t = T[lang] || T.en;
    const st = this.states.includes(state) ? state : "eyebrows";
    const C = "meditation-phases", id = C + "-" + (++uid);
    const glow = (c, r, cls = "", g = "g") => `<circle class="${cls}" style="fill:url(#${id}-${g})" cx="${c[0]}" cy="${c[1]}" r="${r}"/>`;
    const dot = (c, r = 2.4, o = 1) => `<circle class="${C}-dot" style="opacity:${o}" cx="${c[0]}" cy="${c[1]}" r="${r}"/>`;
    const label = (x, y, txt, key, anchor = "start") => `<text class="${C}-${key ? "ta" : "t"}" x="${x}" y="${y}" text-anchor="${anchor}">${txt}</text>`;
    const link = o => `<path class="${C}-link" style="opacity:${o}" d="M${L[0]} ${L[1]} Q${L[0] - 6} ${L[1] - 18} ${GI[0]} ${GI[1]}"/>`;
    const space = o => `<g style="opacity:${o}"><path class="${C}-open" style="fill:url(#${id}-v);filter:url(#${id}-b)" d="${SPACE}"/></g>`;
    const stop = (o, c, a) => `<stop offset="${o}" style="stop-color:var(--${c});stop-opacity:${a}"/>`;
    const grad = (k, at, ...s) => `<radialGradient id="${id}-${k}" ${at}>${s.map(a => stop(...a)).join("")}</radialGradient>`;
    const pulse = C + "-pulse", slow = C + "-slow";

    let back = "", marks = "", labels = "";
    if (st === "larynx") {
      const arc = r => { const p = a => f(L[0] + r * Math.cos(a)) + " " + f(L[1] + r * Math.sin(a)); return `M${p(-.44)} A${r} ${r} 0 0 1 ${p(.7)}`; };
      marks = glow(L, 18, pulse) + [7, 11, 15].map((r, i) => `<path class="${C}-wave ${C}-w${i}" d="${arc(r)}"/>`).join("") + dot(L, 2.2);
      labels = label(128, L[1] + 4, t.larynx, 1) + label(SX, 30, t.upright, 0, "middle");
    } else if (st === "eyebrows") {
      marks = glow(L, 9) + glow(GI, 18, pulse) + link(.8) + dot(L, 1.8, .55) + dot(GI);
      labels = label(128, G[1] - 6, t.eyebrows, 1);
    } else if (st === "light") {
      const P = [[136, 70, 1.3], [143, 63, 1], [150, 73, 2.1], [158, 65, 1.2], [141, 83, 1.7], [153, 86, 1.1], [163, 78, 1.6],
        [132, 79, .9], [147, 93, 1], [168, 89, .9], [160, 55, .9], [170, 68, 1]];
      marks = `<ellipse class="${C}-haze" style="fill:url(#${id}-h)" cx="148" cy="76" rx="34" ry="26"/>` + glow(GI, 11) + link(.35) + dot(L, 1.6, .4) +
        P.map(([x, y, r], i) => `<g class="${C}-tw" style="animation-delay:${f(-i * .9)}s">` +
          (r > 1.5 ? `<path class="${C}-ray" d="M${f(x - r * 2.6)} ${y}h${f(r * 5.2)}M${x} ${f(y - r * 2.6)}v${f(r * 5.2)}"/>` : "") +
          dot([x, y], r) + `</g>`).join("");
      labels = label(150, 38, t.light, 1, "middle");
    } else if (st === "space") {
      back = space(1);
      marks = glow(GI, 10) + [[246, 58], [208, 100], [258, 98], [222, 44], [184, 72]].map(([x, y], i) =>
        `<circle class="${C}-mote" style="animation-delay:${f(-i * 1.7)}s" cx="${x}" cy="${y}" r="${i % 2 ? 1.1 : 1.5}"/>`).join("");
      labels = label(220, 178, t.space, 1, "middle");
    } else if (st === "vortex") {
      // three trailing log-spiral arms, foreshortened into a tunnel mouth facing the person
      const arm = ph => {
        let d = "";
        for (let k = 0; k <= 48; k++) {
          const a = k * .2, r = VR * Math.exp(-.27 * a);
          d += (k ? "L" : "M") + f(r * Math.cos(a + ph)) + " " + f(r * Math.sin(a + ph));
        }
        return `<path class="${C}-arm" d="${d}"/>`;
      };
      const a = VR / 2 + 10, b = VR + 9, p = u => [f(VX + a * Math.cos(u)), f(VY + b * Math.sin(u))];
      const [x0, y0] = p(-2.5), [x1, y1] = p(-.85), dir = Math.atan2(b * Math.cos(-.85), a * Math.sin(.85));
      const h = k => `M${x1} ${y1}L${f(x1 - 6 * Math.cos(dir + k))} ${f(y1 - 6 * Math.sin(dir + k))}`;
      back = space(.6);
      marks = glow(GI, 10) + `<g transform="translate(${VX} ${VY}) scale(.5 1)">` +
        [1, .62, .36].map((k, i) => `<circle class="${C}-ring" style="animation-delay:${f(-i * 8 / 3)}s" r="${f(VR * k)}"/>`).join("") +
        `<g class="${C}-spin" style="stroke:url(#${id}-s)"><circle r="${VR}" style="fill:none"/>` + [0, 2.094, 4.189].map(arm).join("") +
        `</g><circle class="${C}-core" r="7"/></g>` + dot([VX, VY], 1.6, .8) +
        `<path class="${C}-turn" d="M${x0} ${y0} A${a} ${b} 0 0 1 ${x1} ${y1} ${h(.5)} ${h(-.5)}"/>`;
      labels = label(VX, VY + VR + 22, t.vortex, 1, "middle");
    } else if (st === "above") {
      marks = glow([CR[0], 33], 31, slow, "a") + glow([CR[0], 33], 12, slow);
      labels = label(138, 32, t.above, 1) + label(138, 48, t.aware);
    } else {
      marks = glow(GI, 9, slow) + dot(GI, 1.6, .5);
      labels = label(132, G[1] - 6, t.return);
    }
    const on = st === "larynx";

    return `<svg class="${C}" viewBox="0 0 320 240" width="100%" role="img" aria-label="${on ? "" : t.who}${t.aria[st]}" xmlns="http://www.w3.org/2000/svg">
<style>
.${C} *{stroke-linecap:round;stroke-linejoin:round}
.${C}-ink{fill:none;stroke:var(--ink);stroke-width:2}
.${C}-soft{fill:none;stroke:var(--ink);stroke-opacity:.55;stroke-width:1.5}
.${C}-floor{fill:none;stroke:var(--line);stroke-width:1.5}
.${C}-spine{fill:none;stroke:var(--muted);stroke-opacity:.45;stroke-width:1.5}
.${C}-on{stroke:var(--accent);stroke-opacity:.6}
.${C}-plumb{fill:none;stroke:var(--accent);stroke-opacity:.6;stroke-width:1.2;stroke-dasharray:1.5 3.5}
.${C}-dot,.${C}-mote{fill:var(--accent)}
.${C}-mote{opacity:.55}
.${C}-wave{fill:none;stroke:var(--accent);stroke-width:1.5}
.${C}-w1{opacity:.7}.${C}-w2{opacity:.4}
.${C}-link{fill:none;stroke:var(--accent);stroke-width:1.4;stroke-dasharray:2 4}
.${C}-ray{fill:none;stroke:var(--accent);stroke-width:.8;opacity:.7}
.${C}-turn{fill:none;stroke:var(--muted);stroke-opacity:.7;stroke-width:1.3}
.${C}-ring{fill:none;stroke:var(--violet);stroke-opacity:.3;stroke-width:1.2;vector-effect:non-scaling-stroke}
.${C}-arm{fill:none;stroke-width:1.8;vector-effect:non-scaling-stroke}
.${C}-core{fill:var(--violet);fill-opacity:.55}
.${C}-t{fill:var(--muted);font:12px var(--font-body)}
.${C}-ta{fill:var(--accent);font:700 12.5px var(--font-body)}
@media (prefers-reduced-motion: no-preference){
.${pulse},.${slow},.${C}-open,.${C}-spin,.${C}-ring{transform-box:fill-box;transform-origin:center;animation:${C}-p 5s ease-in-out infinite}
.${slow}{animation-duration:8s}
@keyframes ${C}-p{0%,100%{opacity:.6;transform:scale(.88)}50%{opacity:1;transform:scale(1.06)}}
.${C}-wave{animation:${C}-w 3s ease-out infinite}
.${C}-w1{animation-delay:.5s}.${C}-w2{animation-delay:1s}
@keyframes ${C}-w{0%{opacity:.1}35%{opacity:1}100%{opacity:.1}}
.${C}-link{animation:${C}-l 3s linear infinite}
@keyframes ${C}-l{to{stroke-dashoffset:-12}}
.${C}-haze{animation:${C}-h 8s ease-in-out infinite}
@keyframes ${C}-h{0%,100%{opacity:1}50%{opacity:.45}}
.${C}-tw{animation:${C}-t 5.4s ease-in-out infinite}
@keyframes ${C}-t{0%,100%{opacity:.35}50%{opacity:1}}
.${C}-open{transform-origin:0 50%;animation:${C}-o 8s ease-in-out infinite}
@keyframes ${C}-o{0%,100%{transform:scale(.94)}50%{transform:scale(1.04)}}
.${C}-mote{animation:${C}-m 8s ease-in-out infinite}
@keyframes ${C}-m{0%{opacity:0;transform:translateX(0)}30%,70%{opacity:.7}100%{opacity:0;transform:translateX(-14px)}}
.${C}-spin{animation:${C}-s 8s linear infinite}
@keyframes ${C}-s{to{transform:rotate(120deg)}}
.${C}-ring{animation:${C}-z 8s linear infinite}
@keyframes ${C}-z{0%{transform:scale(.25);opacity:0}40%{opacity:1}100%{transform:scale(1.05);opacity:0}}
}
</style>
<defs>
${grad("g", "", [0, "accent", .5], [.45, "glow", 1], [1, "glow", 0])}
${grad("a", "", [0, "accent", .4], [.4, "glow", 1], [1, "glow", 0])}
${grad("h", "", [0, "glow", 1], [.6, "glow", .5], [1, "glow", 0])}
${grad("v", `gradientUnits="userSpaceOnUse" cx="226" cy="${G[1]}" r="114" fx="${G[0]}" fy="${G[1]}"`, [0, "violet", .12], [.2, "violet", .34], [.48, "violet", .5], [.8, "violet", 0])}
${grad("s", `gradientUnits="userSpaceOnUse" cx="0" cy="0" r="${VR}"`, [0, "accent", .95], [.28, "accent", .55], [.5, "violet", .85], [1, "violet", 0])}
<filter id="${id}-b" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="9"/></filter>
<clipPath id="${id}-c"><path clip-rule="evenodd" d="M0 0H320V240H0Z ${ARM}"/></clipPath>
</defs>
<g transform="translate(12 0)">
${back}
<path class="${C}-floor" d="M30 ${FL} H278"/>
<g style="opacity:${st === "return" ? .9 : .6}">
<g clip-path="url(#${id}-c)"><path class="${C}-ink" d="${BODY}"/><path class="${C}-soft" d="${LEG}"/></g>
<path class="${C}-ink" d="${ARM}"/>
<g transform="translate(${HX} ${HY}) scale(${HS})"><path class="${C}-ink" style="stroke-width:${f(2 / HS)}" d="${HEAD}"/>
<path class="${C}-soft" style="stroke-width:${f(1.5 / HS)}" d="${FACE}"/></g>
</g>
<path class="${C}-spine${on ? ` ${C}-on` : ""}" d="M${SX} 212 V68"/>${on ? `<path class="${C}-plumb" d="M${SX} 56 V38 M${SX} 216 V${FL}"/>` : ""}
${marks}
${labels}
</g>
</svg>`;
  },
};
