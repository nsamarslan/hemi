// Will centre (18.6, 18.7): kneeling on the heels, side view facing right; point one inch below the navel.
import { css, svg, glowDef, glow, label, leader, uid } from "./_parts.js";

const T = {
  tr: { aria: { massage: "Diz üstü topuklara oturmuş kişi; orta parmak göbeğin bir parmak altındaki noktayı daire çizerek ovuyor.", hands: "Eller üst üste, alt karnın birkaç santim önünde; titreşimi irade merkezine yansıtıyor.", "eye-belly": "Kaşların arası ile irade merkezi birlikte parlıyor ve bağlı." },
    point: "irade merkezi", sub: "göbeğin 2,5 cm altı", massage: "orta parmakla daire çiz", hands: "eller 5–7 cm önde", eye: "kaşların arası" },
  en: { aria: { massage: "Kneeling, sitting on the heels; the middle finger circles the point one inch below the navel.", hands: "Hands flat one above the other a few inches in front of the lower belly, reflecting the vibration into the will centre.", "eye-belly": "The point between the eyebrows and the will centre glow together, linked." },
    point: "will centre", sub: "1 inch below the navel", massage: "circle with the middle finger", hands: "hands 2–3 inches away", eye: "between the eyebrows" },
};
// kneeling figure facing right
const FIG = `M132 40 m-17 0 a17 19 0 1 0 34 0 a17 19 0 1 0 -34 0 M147 46 l6 4 l-6 2
M124 58 L122 70 M140 58 L142 70
M122 70 C110 76 106 92 108 112 C110 136 112 150 112 166
M142 70 C152 78 156 96 156 118 C158 138 156 152 150 166
M112 166 C100 172 92 180 92 192 C92 202 104 206 120 206 L214 206 C224 206 228 200 222 194 C210 186 180 182 150 176 C150 172 150 168 150 166
M92 192 C84 196 80 200 82 206 L120 206`;
const ARM_REST = `M130 76 C124 104 126 130 140 150 C150 164 168 170 186 176`;
const ARM_MASSAGE = `M132 76 C126 100 130 122 146 132 C152 136 158 138 162 139`;
const ARM_HANDS = `M130 76 C124 98 132 118 150 124 L176 120 M134 80 C130 106 140 130 158 140 L178 144`;
export default {
  id: "will-centre",
  states: ["massage", "hands", "eye-belly"],
  render(state, lang) {
    const st = this.states.includes(state) ? state : "eye-belly";
    const t = T[lang] || T.en, p = "wc", g = uid("wcg");
    const W = [158, 140], B = [148, 36];
    let arm = ARM_REST, extra = "";
    if (st === "massage") {
      arm = ARM_MASSAGE;
      extra = `<circle class="wc-a wc-d wc-spin" cx="${W[0]}" cy="${W[1]}" r="7" stroke-width="1.6"/>${label(p, 300, 226, t.massage, false, "end")}`;
    } else if (st === "hands") {
      arm = ARM_HANDS;
      extra = `<path class="wc-a" d="M176 112 L180 128 M178 136 L182 152" stroke-width="3"/>
<path class="wc-a wc-flow" d="M174 126 L${W[0] + 6} ${W[1] - 2} M176 146 L${W[0] + 6} ${W[1] + 3}" stroke-width="1.4"/>${label(p, 300, 226, t.hands, false, "end")}`;
    } else {
      extra = glow(g, B[0], B[1], 13, "wc-pulse") + `<path class="wc-a wc-d wc-flow" d="M${B[0]} ${B[1] + 6} C175 70 175 110 ${W[0] + 2} ${W[1] - 6}" stroke-width="1.5"/>` + label(p, 300, 40, t.eye, false, "end") + leader(p, 200, 37, 160, 36);
    }
    const anim = `.wc-spin{animation:wc-s 2.2s linear infinite;transform-box:fill-box;transform-origin:center}@keyframes wc-s{to{transform:rotate(360deg)}}`;
    return svg("0 0 320 240", t.aria[st], `<defs>${glowDef(g)}</defs>${css(p, anim)}<path class="wc-b" d="${FIG}"/><path class="wc-b" d="${arm}"/>
${glow(g, W[0], W[1], 17, "wc-pulse")}<circle class="wc-dot" cx="${W[0]}" cy="${W[1]}" r="3"/>
${leader(p, 166, 140, 192, 120)}${label(p, 196, 118, t.point, true)}${label(p, 196, 134, t.sub)}${extra}`);
  },
};
