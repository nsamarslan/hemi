// Posture of the pillar (20.15): lying on the back, both legs raised straight up, head and shoulders lifted, hands behind the head.
import { css, svg, glowDef, glow, label, uid } from "./_parts.js";

const T = {
  tr: { aria: "Sırtüstü yatan kişi iki bacağını dimdik yukarı kaldırmış, başı ve omuzları hafifçe kalkık, eller başın arkasında kenetli.", legs: "bacaklar dik", head: "baş ve omuzlar kalkık", hands: "eller ensede", belly: "karın" },
  en: { aria: "Lying on the back with both legs raised straight up, head and shoulders slightly lifted, hands clasped behind the head.", legs: "legs vertical", head: "head and shoulders lifted", hands: "hands behind the head", belly: "belly" },
};
export default {
  id: "stambhasana",
  states: [],
  render(state, lang) {
    const t = T[lang] || T.en, p = "sb", g = uid("sbg");
    const body = `<defs>${glowDef(g)}</defs>${css(p)}
<path class="sb-f" d="M20 200 L300 200"/>
<path class="sb-b" d="M70 150 m-17 0 a17 18 0 1 0 34 0 a17 18 0 1 0 -34 0
M86 158 C100 170 120 182 150 188 C170 192 186 194 196 194
M74 168 C92 186 120 198 150 200 L198 200
M196 194 C198 150 200 110 202 52 C202 40 208 34 216 36 C220 38 220 44 218 48 C216 100 216 150 214 196
M198 200 L214 198
M206 52 C206 46 210 42 214 42"/>
<path class="sb-b" d="M90 170 C78 178 64 178 56 170 C50 162 52 150 58 144"/>
<path class="sb-f" d="M52 150 C48 138 56 128 66 130"/>
${glow(g, 170, 192, 16, "sb-pulse")}
${label(p, 226, 70, t.legs, true)}${label(p, 20, 112, t.head)}${label(p, 20, 226, t.hands)}${label(p, 150, 226, t.belly, false, "middle")}`;
    return svg("0 0 320 240", t.aria, body);
  },
};
