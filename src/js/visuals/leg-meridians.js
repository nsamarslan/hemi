// Leg lines (6.2 Gallbladder: side; 6.6 Urinary Bladder: back; 6.12 Stomach: front), standing figure.
import { css, svg, label, uid } from "./_parts.js";

const T = {
  tr: { names: { gallbladder: "Safra Kesesi meridyeni", bladder: "Mesane meridyeni", stomach: "Mide meridyeni" },
    where: { gallbladder: "ayağın dışından bacağın yan yüzüne, gövdenin yanından başa", bladder: "topuktan bacağın arkasına, omurganın yanından başın arkasına", stomach: "ayağın üstünden bacağın önüne, kasıktan gövdenin önüne" },
    view: { gallbladder: "yandan", bladder: "arkadan", stomach: "önden" }, rub: "hat boyunca ov", aria: "Ayakta duran kişi: " },
  en: { names: { gallbladder: "Gallbladder meridian", bladder: "Urinary Bladder meridian", stomach: "Stomach meridian" },
    where: { gallbladder: "outer foot, side of the leg, side of the trunk, to the head", bladder: "heel, back of the leg, beside the spine, to the back of the head", stomach: "top of the foot, front of the leg, groin, front of the trunk" },
    view: { gallbladder: "side view", bladder: "back view", stomach: "front view" }, rub: "rub along the line", aria: "Standing person: " },
};
// front/back figure (x centre 120)
const FRONT = `M120 22 m-16 0 a16 18 0 1 0 32 0 a16 18 0 1 0 -32 0
M112 39 L112 48 M128 39 L128 48
M112 48 C96 50 86 54 84 64 C82 90 84 120 88 150 M128 48 C144 50 154 54 156 64 C158 90 156 120 152 150
M84 64 C78 92 74 120 72 150 M156 64 C162 92 166 120 168 150
M88 150 C86 170 92 176 96 180 M152 150 C154 170 148 176 144 180
M96 180 C96 220 98 250 100 290 C100 298 94 302 88 304 L104 304 C108 300 110 294 112 288 C114 250 116 220 118 186
M144 180 C144 220 142 250 140 290 C140 298 146 302 152 304 L136 304 C132 300 130 294 128 288 C126 250 124 220 122 186
M118 186 L122 186`;
// side figure facing right
const SIDE = `M118 22 m-16 0 a16 18 0 1 0 32 0 a16 18 0 1 0 -32 0 M131 28 l6 4 l-6 2
M112 39 L110 50 M124 39 L128 50
M110 50 C100 56 98 70 100 90 C102 120 104 140 106 160 M128 50 C140 56 144 70 142 90 C140 116 138 140 138 160
M106 160 C104 200 106 250 108 292 L106 304 L140 304 C138 300 130 296 124 292 C126 250 132 200 138 160
M114 70 C116 96 118 116 120 140`;
const LINES = {
  gallbladder: { fig: SIDE, d: "M126 302 C124 270 128 230 132 196 C136 172 136 158 134 140 C132 110 130 80 128 60 C126 48 124 40 128 30" },
  bladder: { fig: FRONT, d: "M134 302 C132 270 130 230 128 196 C127 180 126 168 126 150 C126 120 125 90 124 60 C124 44 123 30 122 10" },
  stomach: { fig: FRONT, d: "M110 300 C110 268 108 230 106 196 C105 184 108 176 110 168 C112 140 112 110 110 80 C110 66 112 58 116 52" },
};
export default {
  id: "leg-meridians",
  states: Object.keys(LINES).flatMap(s => [s, s + "-rub"]),
  render(state, lang) {
    const rub = /-rub$/.test(state || "");
    const k = LINES[(state || "").replace(/-rub$/, "")] ? state.replace(/-rub$/, "") : "gallbladder";
    const t = T[lang] || T.en, p = "lm", L = LINES[k];
    const spine = k === "bladder" ? `<path class="lm-f" d="M120 50 L120 170"/>` : "";
    const rubber = rub ? `<g><ellipse cx="0" cy="0" rx="9" ry="16" fill="var(--glow)" stroke="var(--accent)" stroke-width="1.6"/><animateMotion dur="3.4s" repeatCount="indefinite" keyPoints="0;.45;0" keyTimes="0;.5;1" calcMode="spline" keySplines=".4 0 .6 1;.4 0 .6 1" path="${L.d}"/></g>` : "";
    // wrap description into lines
    const words = (rub ? t.rub : t.where[k]).split(" "), rows = [""];
    for (const w of words) (rows[rows.length - 1] + " " + w).trim().length > 19 ? rows.push(w) : rows[rows.length - 1] = (rows[rows.length - 1] + " " + w).trim();
    const body = `${css(p)}<g transform="translate(-50 4)"><path class="lm-b" d="${L.fig}"/>${spine}
<path class="lm-a lm-d" d="${L.d}"/><path class="lm-a lm-flow" d="${L.d}" stroke-opacity=".35" stroke-width="6"/>${rubber}</g>
${label(p, 118, 40, t.names[k].split(" ").slice(0, -1).join(" "), true)}${label(p, 118, 56, t.names[k].split(" ").slice(-1)[0], true)}
${label(p, 118, 76, t.view[k])}
${rows.map((r, i) => label(p, 118, 120 + i * 16, r)).join("")}`;
    return svg("0 0 240 320", t.aria + t.names[k] + ", " + t.where[k], body);
  },
};
