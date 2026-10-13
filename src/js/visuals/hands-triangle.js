// Connected shaking / rubbing (4.2, 4.3): seated, eyes closed; hands shaken, rubbed, held palms up, then linked to the eye.
import { css, svg, glowDef, glow, label, seatedFront, uid } from "./_parts.js";

const T = {
  tr: { aria: { shake: "Oturan kişi ellerini silkeliyor.", rub: "Oturan kişi ellerini göğsünün önünde ovuyor.", still: "Avuçlar yukarı, dizlerin hemen üstünde asılı; avuçlarda titreşim.", connect: "Kaşların arası ile iki avuç arasında titreşim üçgeni." },
    shake: "silkele", rub: "ov", palms: "avuçlar yukarı", connect: "göz ve avuçlar bağlı" },
  en: { aria: { shake: "Seated person shaking the hands.", rub: "Seated person rubbing the hands in front of the chest.", still: "Palms up, suspended just above the knees; vibration in the palms.", connect: "A triangle of vibration linking the point between the eyebrows and both palms." },
    shake: "shake", rub: "rub", palms: "palms up", connect: "eye and palms linked" },
};
export default {
  id: "hands-triangle",
  states: ["shake", "rub", "still", "connect"],
  render(state, lang) {
    const st = this.states.includes(state) ? state : "connect";
    const t = T[lang] || T.en, p = "ht", g = uid("htg");
    const f = seatedFront(p, 160, 52, st === "still" || st === "connect");
    let extra = "";
    if (st === "shake") {
      extra = `<g class="ht-shake"><path class="ht-b" d="M129 86 C120 110 112 128 110 140 M191 86 C200 110 208 128 210 140"/>
<path class="ht-b" d="M104 140 l12 0 M204 140 l12 0"/></g>
<path class="ht-a" d="M98 128 l0 -10 M98 152 l0 10 M222 128 l0 -10 M222 152 l0 10"/>${label(p, 160, 228, t.shake, true, "middle")}`;
    } else if (st === "rub") {
      extra = `<path class="ht-b" d="M129 86 C130 104 140 118 153 122 M191 86 C190 104 180 118 167 122"/>
<g class="ht-rub"><ellipse cx="160" cy="122" rx="12" ry="7" fill="none" class="ht-a"/></g>
<path class="ht-f" d="M140 136 l40 0 M140 108 l40 0"/>${label(p, 160, 228, t.rub, true, "middle")}`;
    } else {
      const dots = [f.palmL, f.palmR].map(([x, y]) => glow(g, x, y - 4, 16, "ht-pulse")).join("");
      extra = dots + label(p, 160, 228, st === "connect" ? t.connect : t.palms, true, "middle");
      if (st === "connect") extra += glow(g, f.brow[0], f.brow[1], 14, "ht-pulse") +
        `<path class="ht-a ht-d ht-flow" d="M${f.brow[0]} ${f.brow[1]} L${f.palmL[0]} ${f.palmL[1] - 4} L${f.palmR[0]} ${f.palmR[1] - 4} Z" stroke-width="1.6" stroke-opacity=".8"/>`;
    }
    const anim = `.ht-shake{animation:ht-sh .35s ease-in-out infinite alternate}@keyframes ht-sh{from{transform:translateY(-4px)}to{transform:translateY(4px)}}
.ht-rub{animation:ht-rb .5s ease-in-out infinite alternate}@keyframes ht-rb{from{transform:translateX(-5px)}to{transform:translateX(5px)}}`;
    return svg("0 0 320 240", t.aria[st], `<defs>${glowDef(g)}</defs>${css(p, anim)}${f.s}${extra}`);
  },
};
