// Night practice body map (chapter 14): lying on the back seen from above, head at the top. Quiet and dim.
import { css, svg, glowDef, glow, label, uid } from "./_parts.js";

const T = {
  tr: { rest: "sırtüstü, hareketsiz", exhale: "uzun nefes verişler", parts: "dikkat bedende dolaşıyor", organs: "organlar", "breath-belly": "göbeğin altında · 33'ten geriye say", "breath-chest": "göğsün ortasında · geriye say", "breath-nose": "burun deliklerinde · geriye say", "breath-perineum": "kuyruk sokumu ve perine", senses: "koku · ses · tat", day: "gün geriye doğru", images: "kendiliğinden gelen imgeler", limbs: "astral kol yükseliyor", return: "uyanık bilince dönüş", aria: "Gece pratiği, sırtüstü yatan beden: " },
  en: { rest: "on the back, still", exhale: "long exhalations", parts: "attention travels through the body", organs: "organs", "breath-belly": "below the navel · count down from 33", "breath-chest": "middle of the chest · count down", "breath-nose": "at the nostrils · count down", "breath-perineum": "coccyx and perineum", senses: "smell · hearing · taste", day: "the day, backwards", images: "spontaneous images", limbs: "astral arm lifting", return: "back to waking consciousness", aria: "Night practice, body lying on the back: " },
};
const BODY = `M160 20 m-15 0 a15 17 0 1 0 30 0 a15 17 0 1 0 -30 0
M153 36 L153 44 M167 36 L167 44
M153 44 C136 46 126 50 124 60 C122 80 126 100 128 120 C130 130 134 136 140 140 M167 44 C184 46 194 50 196 60 C198 80 194 100 192 120 C190 130 186 136 180 140
M124 60 C116 80 112 104 110 128 C109 136 108 142 110 148 M196 60 C204 80 208 104 210 128 C211 136 212 142 210 148
M140 140 C138 170 140 196 142 222 L150 226 C152 200 156 170 160 150 C164 170 168 200 170 226 L178 222 C180 196 182 170 180 140`;
const P = { brow: [160, 16], nose: [160, 24], chest: [160, 72], belly: [160, 116], perineum: [160, 146] };
const ORG = `M146 78 a7 9 0 1 0 0.1 0 M174 78 a7 9 0 1 0 0.1 0 M160 82 a5 5 0 1 0 0.1 0 M140 98 c6 -3 14 -2 16 4 M176 96 c-6 -2 -10 2 -10 6 M146 112 a3 5 0 1 0 0.1 0 M174 112 a3 5 0 1 0 0.1 0 M160 130 a9 5 0 1 0 0.1 0`;
export default {
  id: "night-body",
  states: ["rest", "exhale", "parts", "organs", "breath-belly", "breath-chest", "breath-nose", "breath-perineum", "senses", "day", "images", "limbs", "return"],
  render(state, lang) {
    const st = this.states.includes(state) ? state : "rest";
    const t = T[lang] || T.en, p = "nb", g = uid("nbg");
    let x = "";
    if (st === "exhale") x = `<g class="nb-out">${glow(g, 160, 60, 26)}</g>`;
    if (st === "parts") x = `<circle r="12" fill="url(#${g})"><animateMotion dur="14s" repeatCount="indefinite" path="M160 20 L160 60 L118 120 L160 60 L202 120 L160 60 L160 130 L146 220 L160 130 L174 220 L160 130 L160 20"/></circle>`;
    if (st === "organs") x = `<path d="${ORG}" fill="var(--glow)" stroke="var(--accent)" stroke-width="1.1" stroke-opacity=".8"/>`;
    const breath = { "breath-belly": P.belly, "breath-chest": P.chest, "breath-nose": P.nose };
    if (breath[st]) x = `<g class="nb-breath">${glow(g, breath[st][0], breath[st][1], 18)}</g><circle class="nb-dot" cx="${breath[st][0]}" cy="${breath[st][1]}" r="2.6"/>`;
    if (st === "breath-perineum") x = glow(g, P.perineum[0], P.perineum[1], 14, "nb-pulse") + glow(g, P.belly[0], P.belly[1], 12, "nb-pulse");
    if (st === "senses") x = `<g class="nb-pulse"><circle cx="160" cy="22" r="22" fill="none" stroke="var(--accent)" stroke-opacity=".6"/><circle cx="160" cy="22" r="32" fill="none" stroke="var(--accent)" stroke-opacity=".3"/></g>`;
    if (st === "day") x = `<g transform="translate(250 40)"><circle r="18" fill="none" class="nb-f"/><path class="nb-a nb-back" d="M0 0 L0 -13" stroke-width="2"/><path class="nb-a" d="M-18 0 a18 18 0 0 1 9 -15.6" stroke-width="1.6"/><path class="nb-a" d="M-14 -16 l5 0.4 l-1 5" stroke-width="1.6"/></g>`;
    if (st === "images") x = `<g class="nb-img"><rect x="132" y="-8" width="24" height="18" rx="3" fill="none" stroke="var(--accent)" stroke-opacity=".7"/><rect x="166" y="-2" width="20" height="15" rx="3" fill="none" stroke="var(--accent)" stroke-opacity=".5"/></g>`.replace(/y="-8"/, 'y="2"').replace(/y="-2"/, 'y="6"');
    if (st === "limbs") x = `<path class="nb-lift" d="M196 60 C210 50 222 36 230 20 C232 16 236 16 236 20" fill="none" stroke="var(--accent)" stroke-width="7" stroke-opacity=".35" stroke-linecap="round"/>`;
    const op = st === "return" ? 1 : .8;
    const anim = `.nb-out{animation:nb-o 7s ease-in-out infinite;transform-box:fill-box;transform-origin:center}@keyframes nb-o{0%{opacity:.9;transform:scale(1)}70%,100%{opacity:0;transform:scale(1.9)}}
.nb-breath{animation:nb-b 6s ease-in-out infinite}@keyframes nb-b{0%,100%{transform:translateY(4px);opacity:.6}50%{transform:translateY(-4px);opacity:1}}
.nb-back{animation:nb-r 6s linear infinite;transform-origin:0 0}@keyframes nb-r{to{transform:rotate(-360deg)}}
.nb-img{animation:nb-i 5s ease-in-out infinite}@keyframes nb-i{0%,100%{opacity:0}50%{opacity:1}}
.nb-lift{animation:nb-l 6s ease-in-out infinite;transform-origin:196px 60px}@keyframes nb-l{0%,100%{opacity:.2;transform:rotate(25deg)}50%{opacity:.9;transform:rotate(0)}}`;
    return svg("0 0 320 240", t.aria + t[st], `<defs>${glowDef(g)}</defs>${css(p, anim)}<g opacity="${op}"><path class="nb-b" d="${BODY}"/></g>${x}${label(p, 160, 236, t[st], st !== "rest", "middle")}`);
  },
};
