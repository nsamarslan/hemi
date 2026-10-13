// Inner arm, palm up, fingers to the left, shoulder to the right (4.5–4.8).
// heart-constrictor: middle of the inner forearm and biceps; heart: little-finger side; lung: thumb side to the front of the shoulder.
import { css, svg, glowDef, glow, label, uid } from "./_parts.js";

const T = {
  tr: { names: { "heart-constrictor": "Kalp Zarı meridyeni", heart: "Kalp meridyeni", lung: "Akciğer meridyeni" },
    where: { "heart-constrictor": "ön kolun ve pazunun tam ortası", heart: "serçe parmak tarafı", lung: "başparmak tarafı, omzun önüne" },
    rub: "avuç köprüsüyle hat boyunca ov", thumb: "başparmak", little: "serçe parmak", shoulder: "omuz", aria: "Kolun iç yüzü, avuç yukarı: " },
  en: { names: { "heart-constrictor": "Heart Constrictor meridian", heart: "Heart meridian", lung: "Lung meridian" },
    where: { "heart-constrictor": "middle of the inner forearm and biceps", heart: "little-finger side", lung: "thumb side, to the front of the shoulder" },
    rub: "rub along the line with the bridge of the palm", thumb: "thumb", little: "little finger", shoulder: "shoulder", aria: "Inner side of the arm, palm up: " },
};
// arm outline: thumb side on top, little-finger side below
const ARM = `M84 98 C110 96 140 96 168 100 C200 92 240 86 284 84 C296 84 304 92 306 104
M84 146 C110 148 140 150 168 150 C200 156 240 162 284 164 C296 164 304 154 306 140`;
const HAND = `M84 98 C76 96 70 94 60 92 C50 90 38 92 26 98 C18 102 16 108 24 110 C34 112 46 108 56 108
M56 108 C46 112 30 114 20 118 C14 121 16 128 24 128 C36 126 48 124 60 124
M60 124 C48 128 32 132 24 136 C18 140 22 146 30 145 C42 143 54 140 66 138
M66 138 C58 142 46 148 42 152 C38 157 44 160 50 158 C62 154 74 150 84 146
M84 98 C78 88 70 80 60 74 C54 70 48 74 52 80 C58 88 62 96 66 102`;
const LINES = {
  "heart-constrictor": "M84 122 C110 123 140 124 168 125 C200 124 240 123 296 122",
  heart: "M84 142 C110 144 140 146 168 146 C200 151 240 156 292 154",
  lung: "M84 102 C110 101 140 101 168 104 C200 96 240 90 292 92",
};
export default {
  id: "arm-meridians",
  states: Object.keys(LINES).flatMap(s => [s, s + "-rub"]),
  render(state, lang) {
    const rub = /-rub$/.test(state || "");
    const k = LINES[(state || "").replace(/-rub$/, "")] ? state.replace(/-rub$/, "") : "heart-constrictor";
    const t = T[lang] || T.en, p = "am", g = uid("amg");
    const others = Object.entries(LINES).filter(([n]) => n !== k).map(([, d]) => `<path class="am-f am-d" d="${d}"/>`).join("");
    const d = LINES[k];
    const rubber = rub ? `<g class="am-slide"><ellipse cx="0" cy="0" rx="18" ry="8" fill="var(--glow)" stroke="var(--accent)" stroke-width="1.6"/><animateMotion dur="3s" repeatCount="indefinite" keyPoints="0;1;0" keyTimes="0;.5;1" calcMode="spline" keySplines=".4 0 .6 1;.4 0 .6 1" path="${d}"/></g>` : "";
    const body = `<defs>${glowDef(g)}</defs>${css(p)}
<path class="am-b" d="${ARM}"/><path class="am-b" d="${HAND}"/>
<path class="am-f" d="M168 100 C171 116 171 134 168 150"/>
${others}
<path class="am-a am-d" d="${d}"/><path class="am-a am-flow" d="${d}" stroke-opacity=".35" stroke-width="6"/>
${rubber}
${label(p, 160, 28, t.names[k], true, "middle")}
${label(p, 160, 46, rub ? t.rub : t.where[k], false, "middle")}
${label(p, 40, 64, t.thumb)}${label(p, 40, 182, t.little)}${label(p, 300, 182, t.shoulder, false, "end")}`;
    return svg("0 0 320 220", t.aria + t.names[k] + ", " + t.where[k], body);
  },
};
