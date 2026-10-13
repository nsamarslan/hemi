// Opening and sealing the aura (18.3, 20.10, 20.11): open = wide, pale, above the head; seal = pulled in from the will centre.
import { css, svg, glowDef, glow, label, seatedFront, uid } from "./_parts.js";

const T = {
  tr: { aria: { open: "Aura açık: geniş, seyrek, başın üstüne doğru yayılmış.", seal: "Aura mühürlü: göbeğin altındaki irade merkezinden içeri çekilmiş, bedene yakın yoğun bir kabuk." },
    open: "aç · başın üstü", seal: "mühürle · irade merkezi" },
  en: { aria: { open: "Aura open: wide, sparse, spread out above the head.", seal: "Aura sealed: pulled in from the will centre below the navel into a dense shell close to the body." },
    open: "open · above the head", seal: "seal · will centre" },
};
export default {
  id: "aura",
  states: ["open", "seal"],
  render(state, lang) {
    const st = state === "seal" ? "seal" : "open";
    const t = T[lang] || T.en, p = "au", g = uid("aug");
    const f = seatedFront(p, 160, 62, true);
    let body;
    if (st === "open") {
      body = `<g class="au-exp"><ellipse cx="160" cy="112" rx="132" ry="104" fill="var(--glow)" opacity=".18"/>
<ellipse cx="160" cy="112" rx="132" ry="104" fill="none" stroke="var(--accent)" stroke-opacity=".35" stroke-width="1.2" stroke-dasharray="3 7"/></g>
${glow(g, 160, 26, 22, "au-pulse")}`;
    } else {
      body = `<path d="M160 36 C200 36 214 70 214 104 C222 150 236 186 236 196 C236 210 84 210 84 196 C84 186 98 150 106 104 C106 70 120 36 160 36 Z" fill="var(--glow)" opacity=".5"/>
<path class="au-a" d="M160 36 C200 36 214 70 214 104 C222 150 236 186 236 196 C236 210 84 210 84 196 C84 186 98 150 106 104 C106 70 120 36 160 36 Z" stroke-width="2"/>
${glow(g, f.belly[0], f.belly[1] + 6, 15, "au-pulse")}${glow(g, f.brow[0], f.brow[1], 10, "")}
<path class="au-a au-d" d="M${f.brow[0]} ${f.brow[1] + 8} L${f.belly[0]} ${f.belly[1]}" stroke-width="1.4"/>`;
    }
    const anim = `.au-exp{animation:au-e 8s ease-in-out infinite;transform-origin:160px 112px}@keyframes au-e{0%,100%{transform:scale(.92)}50%{transform:scale(1.04)}}`;
    return svg("0 0 320 240", t.aria[st], `<defs>${glowDef(g)}</defs>${css(p, anim)}${body}${f.s}${label(p, 160, 232, st === "open" ? t.open : t.seal, true, "middle")}`);
  },
};
