// Eye contact (5.2, 5.4): two seated people face to face about 90 cm apart, or one person and a mirror.
import { css, svg, glowDef, glow, label, uid } from "./_parts.js";

const T = {
  tr: { aria: { partner: "İki kişi yüz yüze oturuyor, aralarında yaklaşık 90 cm; bakışlar hareketsiz, farkındalık kaşların arasında.", mirror: "Kişi bir aynanın karşısında oturuyor, yansımasıyla arasında yaklaşık 90 cm." },
    dist: "≈ 90 cm", gaze: "hareketsiz bakış · farkındalık kaşların arasında", mirror: "ayna" },
  en: { aria: { partner: "Two people sit face to face about 90 cm (3 feet) apart; motionless gaze, awareness between the eyebrows.", mirror: "A person sits facing a mirror, about 90 cm (3 feet) from the reflection." },
    dist: "≈ 90 cm · 3 ft", gaze: "motionless gaze · aware between the eyebrows", mirror: "mirror" },
};
// seated profile facing right, origin = head centre
const person = (x, y, flip) => `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">
<path class="ec-b" d="M0 0 m-15 0 a15 17 0 1 0 30 0 a15 17 0 1 0 -30 0 M13 3 l5 3 l-5 2 M-6 16 L-7 26 M7 16 L9 26
M-7 26 C-18 32 -20 48 -18 70 C-17 84 -16 92 -14 100 M9 26 C20 32 22 48 20 70 C19 82 18 92 16 100
M-14 100 C-24 104 -26 112 -18 116 L44 116 C52 116 54 108 46 104 C34 100 22 100 16 100
M2 34 C0 56 4 74 16 86 C24 92 32 96 40 100"/>
<path class="ec-b" d="M6 -2 C8 0 10 0 12 -2"/></g>`;
export default {
  id: "eye-contact",
  states: ["partner", "mirror"],
  render(state, lang) {
    const st = state === "mirror" ? "mirror" : "partner";
    const t = T[lang] || T.en, p = "ec", g = uid("ecg");
    const A = [74, 74], B = [246, 74];
    const right = st === "partner" ? person(B[0], B[1], true)
      : `<path class="ec-b" d="M238 36 L238 196" stroke-width="3"/><path class="ec-f" d="M244 40 L262 22 M244 80 L270 54 M244 130 L270 104"/>${label(p, 244, 190, t.mirror)}<g opacity=".45">${person(B[0] + 64, B[1], true)}</g>`;
    const tx = st === "partner" ? B[0] - 2 : 238;
    return svg("0 0 320 240", t.aria[st], `<defs>${glowDef(g)}</defs>${css(p)}${person(A[0], A[1], false)}${right}
${glow(g, A[0] + 11, A[1] - 3, 9, "ec-pulse")}${st === "partner" ? glow(g, B[0] - 11, B[1] - 3, 9, "ec-pulse") : ""}
<path class="ec-a ec-d" d="M${A[0] + 18} ${A[1] - 2} L${tx - 18} ${A[1] - 2}" stroke-width="1.4"/>
<path class="ec-f" d="M${A[0] + 18} 206 L${tx - 18 + (st === "mirror" ? 18 : 0)} 206 M${A[0] + 18} 200 L${A[0] + 18} 212 M${tx - (st === "mirror" ? 0 : 18)} 200 L${tx - (st === "mirror" ? 0 : 18)} 212"/>
${label(p, 160, 226, t.dist, true, "middle")}${label(p, 160, 24, t.gaze, false, "middle")}`);
  },
};
