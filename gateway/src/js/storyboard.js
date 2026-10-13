// Technique storyboards: small step-by-step animated illustrations (SVG + CSS keyframes in app.css)
// that show what a technique *looks like* — the energy loop of the REBAL, worries going into the
// Energy Conversion Box and the box being set aside, the bar of the EBT scanning the body, and so on.
// Each storyboard is a list of steps; every step draws a complete 240×160 scene and carries a short
// bilingual caption. The player (createPlayer) auto-advances, loops, and can be stepped by hand.
// Scenes are pictograms drawn from a few primitives so all 21 techniques share one visual language.

const C = {
  ink: "#d9d3ff", soft: "rgba(217,211,255,.16)", accent: "#8f7bff", teal: "#4fd1c5", warm: "#e8a94a",
  rose: "#d98ac2", green: "#7fc28b", red: "#e2655f", blue: "#6fa8ff", yellow: "#f0d060", purple: "#a07ae8",
  white: "#f4f1ff", gray: "#8a8698", earth: "#a97c50", sky: "#6fa8ff", dark: "#1a1733",
};
const RAINBOW = [C.red, "#f08a3c", C.yellow, C.green, C.blue, "#4c5bd4", "#9b6bd6"];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const T = (lang, tr, en) => (lang === "tr" ? tr : en);
const at = o => (o.cls ? ` class="${esc(o.cls)}"` : "") + (o.style ? ` style="${esc(o.style)}"` : "") + (o.t ? ` transform="${esc(o.t)}"` : "");

// ---------- primitives ----------
const line = (x1, y1, x2, y2, o = {}) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.c || C.ink}" stroke-width="${o.w ?? 5}" stroke-linecap="round" opacity="${o.o ?? 1}"${at(o)}/>`;
const circ = (cx, cy, r, o = {}) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${o.f || "none"}" stroke="${o.c || "none"}" stroke-width="${o.w ?? 1.5}" opacity="${o.o ?? 1}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}${at(o)}/>`;
const ell = (cx, cy, rx, ry, o = {}) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${o.f || "none"}" stroke="${o.c || "none"}" stroke-width="${o.w ?? 1.5}" opacity="${o.o ?? 1}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}${at(o)}/>`;
const path = (d, o = {}) => `<path d="${d}" fill="${o.f || "none"}" stroke="${o.c || C.ink}" stroke-width="${o.w ?? 2}" stroke-linecap="round" stroke-linejoin="round" opacity="${o.o ?? 1}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}${at(o)}/>`;
const rect = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 2}" fill="${o.f || "none"}" stroke="${o.c || "none"}" stroke-width="${o.w ?? 1.5}" opacity="${o.o ?? 1}"${at(o)}/>`;
const text = (x, y, s, o = {}) => `<text x="${x}" y="${y}" fill="${o.c || C.ink}" font-size="${o.s ?? 8}" font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-weight="${o.b ? 700 : 500}" text-anchor="${o.a || "middle"}" opacity="${o.o ?? 1}"${at(o)}>${esc(s)}</text>`;
const grp = (inner, o = {}) => `<g${at(o)}>${inner}</g>`;
const glow = (cx, cy, r, c, o = .5, extra = {}) => grp(circ(cx, cy, r, { f: c, o: o * .3 }) + circ(cx, cy, r * .62, { f: c, o: o * .45 }) + circ(cx, cy, r * .3, { f: c, o }), extra);
const fadeIn = (d = 0, dur = 1) => `animation:sb-in ${dur}s ease ${d}s both`;
const move = (tx, ty, d = 0, dur = 1.6, fill = "forwards") => `--tx:${tx}px;--ty:${ty}px;animation:sb-move ${dur}s ease-in-out ${d}s ${fill}`;

// ---------- figures (pictograms) ----------
const F = {
  /** Side view, head on the left; (x, y) = left end of the mat. Length ≈ 118. */
  lying(x, y, o = {}) {
    const c = o.c || C.ink, arm = o.c || "rgba(170,162,222,.95)";
    return grp(
      line(x, y + 3, x + 122, y + 3, { c: C.ink, w: 1.2, o: .25 }) +
      circ(x + 9, y - 11, 7.5, { f: c }) +
      line(x + 20, y - 8, x + 66, y - 8, { c, w: 8 }) +
      line(x + 66, y - 8, x + 92, y - 9.5, { c, w: 5.5 }) +
      line(x + 92, y - 9.5, x + 116, y - 7, { c, w: 5 }) +
      line(x + 116, y - 7, x + 117, y - 15, { c, w: 3.5 }) +
      line(x + 32, y - 3, x + 60, y - 2, { c: arm, w: 3.2 }), o);
  },
  /** Front view, cross-legged; (x, y) = hips. */
  sitting(x, y, o = {}) {
    const c = o.c || C.ink;
    return grp(
      circ(x, y - 40, 7.5, { f: c }) +
      line(x, y - 30, x, y - 8, { c, w: 8 }) +
      line(x, y - 6, x - 20, y + 3, { c, w: 5.5 }) + line(x, y - 6, x + 20, y + 3, { c, w: 5.5 }) +
      path(`M${x - 22} ${y + 2} Q${x} ${y + 14} ${x + 22} ${y + 2}`, { c, w: 5 }) +
      line(x, y - 26, x - 15, y - 2, { c, w: 4 }) + line(x, y - 26, x + 15, y - 2, { c, w: 4 }), o);
  },
  /** Front view; (x, y) = between the feet. `arms`: "down" | "up" | "out". */
  standing(x, y, o = {}) {
    const c = o.c || C.ink, a = o.arms || "down";
    const arms = a === "up" ? line(x, y - 44, x - 14, y - 64, { c, w: 4 }) + line(x, y - 44, x + 14, y - 64, { c, w: 4 })
      : a === "out" ? line(x, y - 44, x - 20, y - 40, { c, w: 4 }) + line(x, y - 44, x + 20, y - 40, { c, w: 4 })
      : line(x, y - 44, x - 12, y - 22, { c, w: 4 }) + line(x, y - 44, x + 12, y - 22, { c, w: 4 });
    return grp(
      circ(x, y - 58, 7.5, { f: c }) +
      line(x, y - 48, x, y - 24, { c, w: 8 }) + arms +
      line(x, y - 24, x - 7, y, { c, w: 5 }) + line(x, y - 24, x + 7, y, { c, w: 5 }), o);
  },
  /** Side view, mid-stride, facing right; (x, y) = ground under the hips. */
  walking(x, y, o = {}) {
    const c = o.c || C.ink;
    return grp(
      circ(x + 3, y - 58, 7.5, { f: c }) +
      line(x + 1, y - 48, x - 1, y - 24, { c, w: 8 }) +
      line(x, y - 44, x + 11, y - 30, { c, w: 4 }) + line(x, y - 44, x - 9, y - 31, { c, w: 4 }) +
      line(x - 1, y - 24, x + 12, y, { c, w: 5 }) + line(x - 1, y - 24, x - 12, y, { c, w: 5 }), o);
  },
};

// ---------- objects ----------
const O = {
  /** Box with a lid; `open` lifts the lid on its back hinge. */
  box(x, y, w, h, o = {}) {
    const c = o.c || C.warm;
    const lidStyle = `transform-origin:${x - 2}px ${y + 1}px;${o.open ? "transform:rotate(-75deg);" : ""}${o.lidStyle || ""}`;
    return grp(
      rect(x, y, w, h, { f: "rgba(232,169,74,.16)", c, w: 1.6, rx: 2 }) +
      line(x + 3, y + h - 3, x + w - 3, y + h - 3, { c, w: 1, o: .4 }) +
      rect(x - 2, y - 4, w + 4, 5, { f: "rgba(232,169,74,.35)", c, w: 1.6, rx: 1.2, cls: o.lidCls, style: lidStyle }),
      { cls: o.cls, style: o.style, t: o.t });
  },
  /** Small worry/thought glyphs: list, clock, bill, phone. */
  item(kind, x, y, o = {}) {
    const c = o.c || C.ink;
    let g = "";
    if (kind === "list") g = rect(x - 5, y - 6, 10, 12, { c, w: 1.2, rx: 1 }) + line(x - 3, y - 3, x + 3, y - 3, { c, w: 1.2 }) + line(x - 3, y, x + 3, y, { c, w: 1.2 }) + line(x - 3, y + 3, x + 1, y + 3, { c, w: 1.2 });
    else if (kind === "clock") g = circ(x, y, 6, { c, w: 1.2 }) + line(x, y, x, y - 3.5, { c, w: 1.2 }) + line(x, y, x + 2.5, y + 1.5, { c, w: 1.2 });
    else if (kind === "bill") g = rect(x - 6, y - 4, 12, 8, { c, w: 1.2, rx: 1 }) + circ(x, y, 1.8, { c, w: 1.2 }) + line(x - 4, y - 2, x - 4, y + 2, { c, w: 1 }) + line(x + 4, y - 2, x + 4, y + 2, { c, w: 1 });
    else if (kind === "phone") g = rect(x - 3.5, y - 6, 7, 12, { c, w: 1.2, rx: 1.5 }) + circ(x, y + 3.6, .8, { f: c });
    else if (kind === "heart") g = path(`M${x} ${y + 4} C${x - 7} ${y - 1} ${x - 4} ${y - 6} ${x} ${y - 2} C${x + 4} ${y - 6} ${x + 7} ${y - 1} ${x} ${y + 4}Z`, { f: c, c, w: 1 });
    else if (kind === "bulb") g = circ(x, y - 1, 4.5, { c, w: 1.2 }) + rect(x - 2, y + 3.5, 4, 3, { c, w: 1.2, rx: .8 });
    else if (kind === "cup") g = path(`M${x - 5} ${y - 5} L${x - 3.5} ${y + 5} L${x + 3.5} ${y + 5} L${x + 5} ${y - 5}Z`, { c, w: 1.2 }) + line(x - 4, y - 2, x + 4, y - 2, { c: C.blue, w: 1.2 });
    else if (kind === "apple") g = circ(x, y + 1, 5, { c, w: 1.2 }) + line(x, y - 4, x + 2, y - 7, { c: C.green, w: 1.4 });
    else if (kind === "mirror") g = ell(x, y, 4.5, 6, { c, w: 1.2 }) + line(x, y + 6, x, y + 9, { c, w: 1.2 }) + line(x - 3, y + 9, x + 3, y + 9, { c, w: 1.2 });
    else if (kind === "hands") g = path(`M${x - 8} ${y + 2} q4 -6 8 -1 q4 -5 8 1`, { c, w: 1.6 }) + path(`M${x - 8} ${y + 5} q8 6 16 0`, { c, w: 1.6 });
    else if (kind === "star") g = path(`M${x} ${y - 5} L${x + 1.5} ${y - 1.5} L${x + 5} ${y - 1} L${x + 2.3} ${y + 1.4} L${x + 3} ${y + 5} L${x} ${y + 3} L${x - 3} ${y + 5} L${x - 2.3} ${y + 1.4} L${x - 5} ${y - 1} L${x - 1.5} ${y - 1.5}Z`, { f: c, c, w: .8 });
    return grp(g, { cls: o.cls, style: o.style, t: o.t });
  },
  /** Thought bubble with two trailing dots toward (tx, ty). */
  bubble(x, y, w, h, tx, ty, o = {}) {
    const c = o.c || C.ink;
    return grp(
      rect(x, y, w, h, { f: "rgba(217,211,255,.07)", c, w: 1.2, rx: 8 }) +
      circ(x + (tx - x) * .35 + w * .15, y + h + (ty - y - h) * .35, 2.4, { c, w: 1.1 }) +
      circ(x + (tx - x) * .65 + w * .05, y + h + (ty - y - h) * .62, 1.5, { c, w: 1.1 }), o);
  },
  badge(x, y, label, c = C.accent, o = {}) {
    return grp(rect(x - 12, y - 7, 24, 14, { f: "rgba(143,123,255,.18)", c, w: 1.2, rx: 7 }) + text(x, y + 3, label, { c, s: 8, b: true }), o);
  },
  tree(x, y, s = 1, o = {}) {
    return grp(line(x, y, x, y - 18 * s, { c: C.earth, w: 3 * s }) + circ(x, y - 24 * s, 9 * s, { f: C.green, o: .75 }) + circ(x - 6 * s, y - 18 * s, 6 * s, { f: C.green, o: .7 }) + circ(x + 6 * s, y - 19 * s, 6.5 * s, { f: C.green, o: .7 }), o);
  },
  sun(cx, cy, r = 9, o = {}) {
    const rays = [0, 45, 90, 135, 180, 225, 270, 315].map(a => { const k = Math.PI * a / 180; return line(cx + Math.cos(k) * (r + 3), cy + Math.sin(k) * (r + 3), cx + Math.cos(k) * (r + 7), cy + Math.sin(k) * (r + 7), { c: C.warm, w: 1.6 }); }).join("");
    return grp(circ(cx, cy, r, { f: C.warm, o: .9 }) + rays, o);
  },
  water(y, o = {}) { return path(`M0 ${y} q15 -5 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0`, { c: C.blue, w: 1.4, o: .6, ...o }); },
  ground(y, o = {}) { return line(0, y, 240, y, { c: C.ink, w: 1.2, o: .25, ...o }); },
  grass(y, from = 0, to = 240) { let g = ""; for (let x = from + 6; x < to; x += 14) g += path(`M${x} ${y} l-2 -6 M${x} ${y} l2 -7 M${x} ${y} l0 -8`, { c: C.green, w: 1.1, o: .7 }); return g; },
  bell(x, y, o = {}) { return grp(path(`M${x - 8} ${y + 6} q0 -14 8 -14 q8 0 8 14 Z`, { f: "rgba(232,169,74,.3)", c: C.warm, w: 1.4 }) + circ(x, y + 9, 2, { f: C.warm }) + line(x, y - 8, x, y - 11, { c: C.warm, w: 1.6 }), o); },
  notebook(x, y, o = {}) { return grp(rect(x - 10, y - 13, 20, 26, { f: "rgba(217,211,255,.07)", c: C.ink, w: 1.2, rx: 2 }) + line(x - 6, y - 7, x + 6, y - 7, { c: C.ink, w: 1, o: .6 }) + line(x - 6, y - 2, x + 6, y - 2, { c: C.ink, w: 1, o: .6 }) + line(x - 6, y + 3, x + 2, y + 3, { c: C.ink, w: 1, o: .6 }), o); },
  pen(x, y, o = {}) { return grp(line(x, y, x + 10, y - 12, { c: C.warm, w: 2.4 }) + line(x, y, x - 1.5, y + 3, { c: C.ink, w: 1.4 }), o); },
  eye(x, y, o = {}) { return grp(path(`M${x - 9} ${y} q9 -8 18 0 q-9 8 -18 0Z`, { c: C.ink, w: 1.3 }) + circ(x, y, 3, { f: C.accent }), o); },
  headphones(cx, cy, r, o = {}) { return grp(path(`M${cx - r - 2} ${cy + 2} A${r + 2} ${r + 2} 0 0 1 ${cx + r + 2} ${cy + 2}`, { c: C.teal, w: 2 }) + rect(cx - r - 5, cy, 5, 8, { f: C.teal, rx: 1.5 }) + rect(cx + r, cy, 5, 8, { f: C.teal, rx: 1.5 }), o); },
  speaker(x, y, level = 1, o = {}) { return grp(path(`M${x - 6} ${y - 3} h4 l5 -4 v14 l-5 -4 h-4Z`, { f: C.ink, c: C.ink, w: 1 }) + (level >= 1 ? path(`M${x + 6} ${y - 3} q3 3 0 6`, { c: C.ink, w: 1.4 }) : "") + (level >= 2 ? path(`M${x + 9} ${y - 6} q6 6 0 12`, { c: C.ink, w: 1.4 }) : ""), o); },
  question(x, y, c = C.accent, o = {}) { return text(x, y, "?", { c, s: 20, b: true, ...o }); },
  cross(x, y, c = C.red, o = {}) { return grp(line(x - 5, y - 5, x + 5, y + 5, { c, w: 2.2 }) + line(x + 5, y - 5, x - 5, y + 5, { c, w: 2.2 }), o); },
  pin(x, y, c = C.rose, o = {}) { return grp(path(`M${x} ${y} C${x - 7} ${y - 8} ${x - 7} ${y - 16} ${x} ${y - 16} C${x + 7} ${y - 16} ${x + 7} ${y - 8} ${x} ${y}Z`, { f: c, c, w: 1 }) + circ(x, y - 11, 2.4, { f: C.dark }), o); },
  calendar(x, y, o = {}) { return grp(rect(x - 11, y - 9, 22, 20, { c: C.ink, w: 1.2, rx: 2 }) + line(x - 11, y - 4, x + 11, y - 4, { c: C.ink, w: 1.2 }) + [[-6, 1], [0, 1], [6, 1], [-6, 6], [0, 6]].map(([dx, dy]) => circ(x + dx, y + dy, 1.3, { f: C.ink, o: .7 })).join(""), o); },
};

// ---------- energy effects ----------
const E = {
  egg: (cx, cy, rx, ry, c = C.accent, o = {}) => grp(ell(cx, cy, rx, ry, { f: c, o: .07 }) + ell(cx, cy, rx, ry, { c, w: 1.6, o: .9 }), o),
  flow: (d, c = C.accent, o = {}) => path(d, { c, w: o.w ?? 2.2, o: o.o ?? .95, cls: "sb-flow" + (o.slow ? " slow" : "") + (o.cls ? " " + o.cls : ""), style: o.style }),
  rings: (cx, cy, r, c = C.accent, n = 3, dur = 2.4) => Array.from({ length: n }, (_, i) => circ(cx, cy, r, { c, w: 1.4, cls: "sb-ring", style: `animation-delay:${(i * dur / n).toFixed(2)}s;animation-duration:${dur}s` })).join(""),
  sparks: (pts, c = C.teal, r = 1.6, dur = 2.6) => pts.map(([x, y], i) => circ(x, y, r, { f: c, cls: "sb-float", style: `animation-delay:${((i * .37) % dur).toFixed(2)}s;animation-duration:${dur}s` })).join(""),
  twinkle: (pts, c = C.white, r = 1.4) => pts.map(([x, y], i) => circ(x, y, r, { f: c, cls: "sb-pulse", style: `animation-delay:${(i * .5).toFixed(2)}s` })).join(""),
  aura: (cx, cy, rx, ry, c = C.accent, o = .25) => ell(cx, cy, rx, ry, { f: c, o, cls: "sb-breathe" }),
  shake: (inner, amp = 1) => grp(inner, { cls: "sb-shake", style: `--amp:${amp}px` }),
};

// Shared layout anchors
const MAT = { x: 61, y: 112 };          // lying figure: head ≈ (70, 101), body 81 … 175
const SIT = { x: 120, y: 118 };          // sitting figure
const STAND = { x: 120, y: 142 };        // standing figure

const bodyPts = () => [[86, 102], [100, 106], [112, 101], [128, 105], [140, 102], [156, 106], [168, 103], [95, 98], [120, 97], [150, 99]];
const ringAround = (cx = 120, cy = 100) => Array.from({ length: 14 }, (_, i) => { const a = i / 14 * Math.PI * 2; return [Math.round(cx + Math.cos(a) * 72), Math.round(cy + Math.sin(a) * 34)]; });

// ---------- storyboards ----------
// Each step: { tr, en, draw() → inner SVG, dur? (ms) }
export const storyboards = {
  prep: { thumb: 2, steps: [
    { tr: "Sırt üstü uzan, başının altında alçak bir yastık. Kulaklığı tak, sesi kıs.", en: "Lie on your back with a low pillow. Headphones on, volume low.",
      draw: lang => F.lying(MAT.x, MAT.y) + rect(MAT.x + 2, MAT.y - 6, 14, 6, { f: C.soft, c: C.ink, w: 1, rx: 2 }) + O.headphones(70, 101, 8) + O.speaker(205, 40, 1) + text(205, 56, T(lang, "kısık", "low"), { s: 7, o: .7 }) },
    { tr: "Gözlerini kapat; kasları ayaklardan başa doğru tek tek gevşet.", en: "Close your eyes; relax every muscle, from the feet up to the head.",
      draw: () => F.lying(MAT.x, MAT.y) + grp(rect(166, 84, 16, 34, { f: C.teal, o: .22, rx: 8 }) + rect(170, 88, 8, 26, { f: C.teal, o: .35, rx: 4 }), { cls: "sb-move", style: move(-104, 0, .2, 4.2) }) + text(120, 60, "⟵", { c: C.teal, s: 14 }) },
    { tr: "Kaygılarını bir kutuya koy; kapağını kapat ve kutuyu kenara bırak.", en: "Put your worries into a box; close the lid and set the box aside.",
      draw: () => F.lying(MAT.x, MAT.y) + grp(O.box(126, 34, 30, 22, { open: true, lidStyle: "--from:-75deg;--to:0deg;animation:sb-lid 1s ease 2.4s forwards" }) +
        O.item("list", 80, 72, { cls: "sb-move", style: move(58, -30, .2, 1.2) }) + O.item("clock", 72, 80, { cls: "sb-move", style: move(68, -36, .9, 1.2) }) + O.item("bill", 86, 86, { cls: "sb-move", style: move(56, -42, 1.6, 1.2) }),
        { cls: "sb-move", style: move(60, 10, 3.6, 1.4) }) },
    { tr: "Gateway Afirmasyonu'nu içinden söyle: fiziksel bedeninden fazlasısın.", en: "Say the Gateway Affirmation silently: you are more than your physical body.",
      draw: () => F.lying(MAT.x, MAT.y) + E.rings(112, 104, 14, C.accent, 3, 3) + E.twinkle([[60, 40], [96, 28], [140, 34], [184, 44], [120, 52]]) },
    { tr: "Rezonans ayarı: burnundan uzun bir nefes al, mırıldanarak ver. Boğazında titreşim olsun.", en: "Resonant tuning: breathe in long through the nose, hum it out. Feel the throat vibrate.",
      draw: () => F.lying(MAT.x, MAT.y) + E.flow("M20 60 Q40 70 64 96", C.teal) + E.rings(84, 104, 8, C.warm, 3, 2) + text(96, 80, "hmmm", { c: C.warm, s: 9, b: true, cls: "sb-pulse" }) },
  ] },

  ecb: { thumb: 2, steps: [
    { tr: "Gözler kapalı; zihninin önünde bir kutu gör.", en: "Eyes closed; see a box in front of your mind.",
      draw: () => F.sitting(SIT.x, SIT.y) + O.bubble(132, 24, 72, 50, 126, 78) + O.box(154, 46, 28, 20, { open: true, cls: "sb-in", style: fadeIn(.4, 1.4) }) },
    { tr: "Aklında dönen her şeyi (işler, toplantı, fatura, telefon) tek tek kutunun içine koy.", en: "Put everything circling in your head (tasks, the meeting, the bill, the phone) into the box one by one.",
      draw: () => F.sitting(SIT.x, SIT.y) + O.bubble(132, 24, 72, 50, 126, 78) + O.box(154, 46, 28, 20, { open: true }) +
        O.item("list", 104, 60, { cls: "sb-move", style: move(64, -6, .2, 1.1) }) + O.item("clock", 98, 72, { cls: "sb-move", style: move(70, -18, 1.1, 1.1) }) + O.item("bill", 108, 84, { cls: "sb-move", style: move(60, -30, 2, 1.1) }) + O.item("phone", 96, 92, { cls: "sb-move", style: move(72, -38, 2.9, 1.1) }) },
    { tr: "Kapağı kapat. Kutuyu kenara koy: 'Burası benim alanım, kutu orası.'", en: "Close the lid. Set the box aside: 'This is my space; the box is over there.'",
      draw: () => F.sitting(SIT.x, SIT.y) + E.aura(120, 92, 34, 50, C.teal, .12) + grp(O.box(150, 50, 28, 20, { open: true, lidStyle: "--from:-75deg;--to:0deg;animation:sb-lid .9s ease .3s forwards" }), { cls: "sb-move", style: move(62, 48, 1.6, 1.8) }) + text(120, 36, "✓", { c: C.teal, s: 14, cls: "sb-in", style: fadeIn(2.8) }) },
    { tr: "Oturum bitince kutuyu geri getir; içindekileri gözden geçir, gerekeni geri al.", en: "After the session bring the box back; review what is inside and take back what you need.",
      draw: () => F.sitting(SIT.x, SIT.y) + grp(O.box(154, 46, 28, 20, { open: true, lidStyle: "--from:0deg;--to:-75deg;animation:sb-lid .9s ease 1.6s forwards" }) + O.item("list", 160, 58, { cls: "sb-in", style: fadeIn(2.4) }) + O.item("clock", 174, 58, { cls: "sb-in", style: fadeIn(2.8) }), { cls: "sb-move", style: "--tx:0px;--ty:0px;transform:translate(60px,48px);animation:sb-move 1.4s ease-in-out .1s forwards" }) + text(96, 50, "⟵", { c: C.warm, s: 14, cls: "sb-in", style: fadeIn(.2) }) },
  ] },

  affirmation: { thumb: 1, steps: [
    { tr: "Hazırlıkta, kutudan sonra: bedenin uzanmış, zihin sakin. Afirmasyon buradan başlar.", en: "In preparation, after the box: body lying still, mind quiet. The affirmation starts here.",
      draw: () => F.lying(MAT.x, MAT.y) + O.box(196, 118, 24, 16, {}) + glow(112, 104, 10, C.warm, .7, { cls: "sb-pulse" }) },
    { tr: "'Fiziksel bedenimden fazlasıyım.' Farkındalığının bedenin sınırlarını aştığını hisset; genişle, deneyimle, bil.", en: "'I am more than my physical body.' Feel awareness reaching past the body's edges; expand, experience, know.",
      draw: lang => F.lying(MAT.x, MAT.y) + ell(120, 102, 70, 32, { c: C.accent, w: 1.2, o: .5, dash: "3 5", cls: "sb-breathe" }) + E.rings(120, 102, 30, C.accent, 3, 3.2) + text(36, 40, T(lang, "genişle", "expand"), { s: 7, o: .75, c: C.accent }) + text(120, 30, T(lang, "deneyimle", "experience"), { s: 7, o: .75, c: C.accent }) + text(204, 40, T(lang, "bil", "know"), { s: 7, o: .75, c: C.accent }) },
    { tr: "İkinci bölüm: senden daha bilgili ve deneyimli varlıklardan yardım, rehberlik ve koruma iste.", en: "Second part: ask for help, guidance and protection from those with greater knowledge and experience.",
      draw: () => F.lying(MAT.x, MAT.y) + E.twinkle([[70, 26], [120, 18], [170, 28], [96, 40], [146, 42]], C.white, 1.8) + E.flow("M120 26 Q120 60 116 92", C.white, { slow: true, o: .6 }) + E.flow("M70 34 Q90 64 108 94", C.white, { slow: true, o: .4 }) + E.flow("M170 36 Q150 66 124 94", C.white, { slow: true, o: .4 }) },
  ] },

  tuning: { thumb: 1, steps: [
    { tr: "Burnundan uzun ve derin bir nefes al; göğsün dolsun.", en: "Breathe in long and deep through the nose; let the chest fill.",
      draw: lang => F.lying(MAT.x, MAT.y) + E.flow("M24 50 Q44 66 66 98", C.teal) + ell(104, 104, 16, 8, { f: C.teal, o: .25, cls: "sb-breathe" }) + text(40, 40, T(lang, "nefes al", "breathe in"), { c: C.teal, s: 7, o: .8 }) },
    { tr: "Ağzını hafifçe arala; sesi boğazından çıkar: 'hmmm'. Mırıldanarak ver.", en: "Part the lips slightly; let the sound come from the throat: 'hmmm'. Hum the breath out.",
      draw: () => F.lying(MAT.x, MAT.y) + E.rings(84, 104, 8, C.warm, 4, 2.4) + text(96, 72, "hmmm", { c: C.warm, s: 11, b: true, cls: "sb-pulse" }) },
    { tr: "Titreşimi hisset: önce boğazda, sonra göğüste, sonra tüm bedende.", en: "Feel the vibration: in the throat first, then the chest, then the whole body.",
      draw: () => E.shake(F.lying(MAT.x, MAT.y), .8) + E.sparks(bodyPts(), C.warm, 1.5) + ell(120, 102, 66, 26, { c: C.warm, w: 1, o: .4, dash: "2 4" }) },
    { tr: "Birkaç nefes böyle sür; sonra nefesi kendi haline bırak.", en: "Continue for a few breaths; then let the breath settle on its own.",
      draw: () => F.lying(MAT.x, MAT.y) + path("M96 44 a14 14 0 1 1 -2 20", { c: C.teal, w: 1.8 }) + path("M94 64 l-5 -1 l2 5", { c: C.teal, w: 1.8 }) + text(96, 34, "×3", { c: C.teal, s: 8 }) + ell(104, 104, 16, 8, { f: C.teal, o: .18, cls: "sb-breathe" }) },
  ] },

  rebal: { thumb: 2, steps: [
    { tr: "Focus 10'a geçtikten sonra bedeninin etrafında bir yumurta hayal et.", en: "Once in Focus 10, imagine an egg surrounding your body.",
      draw: () => F.lying(MAT.x, MAT.y) + O.badge(26, 20, "F10") + E.egg(120, 100, 78, 38, C.accent, { cls: "sb-in", style: fadeIn(.3, 1.6) }) },
    { tr: "Yumurtanın içindeki enerjiyi hisset: karıncalanma, bir alan, hafif bir kabuk.", en: "Feel the energy inside the egg: a tingling, a field, a faint shell.",
      draw: () => F.lying(MAT.x, MAT.y) + E.egg(120, 100, 78, 38) + E.sparks(ringAround().concat(bodyPts()), C.teal, 1.4) },
    { tr: "Enerjiyi tepeden çıkar, bedenin etrafından dolaştır, ayaklardan geri al; balonu her turda büyüt.", en: "Send the energy out of the crown, around the body, back in through the feet; grow the balloon with every loop.",
      draw: lang => F.lying(MAT.x, MAT.y) + E.egg(120, 100, 82, 42, C.accent, { cls: "sb-grow" }) + E.flow("M70 92 C64 40 186 34 178 98", C.teal, { w: 2.6 }) + E.flow("M70 104 C62 160 186 158 178 108", C.teal, { w: 2.6 }) + E.flow("M176 103 L84 102", C.teal, { w: 2 }) + text(36, 64, T(lang, "tepeden çık", "out at the crown"), { s: 7, c: C.teal, o: .85 }) + text(200, 148, T(lang, "ayaklardan gir", "in at the feet"), { s: 7, c: C.teal, o: .85 }) },
    { tr: "Oturum boyunca balon seni sarar ve korur; dışarıdan gelen hiçbir şey içeri sızmaz.", en: "Throughout the session the balloon surrounds and protects you; nothing from outside gets in.",
      draw: () => F.lying(MAT.x, MAT.y) + E.egg(120, 100, 82, 42, C.accent, { cls: "sb-pulse" }) + ell(120, 100, 82, 42, { f: C.accent, o: .08 }) +
        path("M18 30 L36 48", { c: C.gray, w: 2 }) + path("M34 46 l-4 -1 l1 4", { c: C.gray, w: 2 }) + path("M222 30 L204 48", { c: C.gray, w: 2 }) + path("M206 46 l4 -1 l-1 4", { c: C.gray, w: 2 }) },
    { tr: "Dönüşte balonu içeri doğru katla ve em; enerji bedenine geri dönsün.", en: "On return, fold the balloon inward and absorb it; let the energy come back into the body.",
      draw: () => F.lying(MAT.x, MAT.y) + E.egg(120, 100, 82, 42, C.accent, { cls: "sb-shrink" }) + glow(120, 104, 18, C.accent, .7, { cls: "sb-in", style: fadeIn(2.2, 1.2) }) },
  ] },

  ebt: { thumb: 1, steps: [
    { tr: "Focus 12'de, iki elinle ışıklı bir çubuk tuttuğunu hayal et.", en: "In Focus 12, imagine holding a bar of light in both hands.",
      draw: () => F.lying(MAT.x, MAT.y) + O.badge(26, 20, "F12") + grp(line(100, 62, 140, 62, { c: C.warm, w: 4 }) + glow(100, 62, 7, C.warm, .9) + glow(140, 62, 7, C.warm, .9), { cls: "sb-in", style: fadeIn(.3, 1.4) }) },
    { tr: "Çubuğu bedeninin üzerinde gezdir: ayaklar, bacaklar, karın, göğüs, kollar, baş.", en: "Pass the bar over the body: feet, legs, belly, chest, arms, head.",
      draw: () => F.lying(MAT.x, MAT.y) + grp(line(170, 70, 170, 128, { c: C.warm, w: 4 }) + glow(170, 70, 6, C.warm, .9) + glow(170, 128, 6, C.warm, .9) + rect(166, 76, 8, 46, { f: C.warm, o: .18, rx: 4 }), { cls: "sb-move", style: move(-100, 0, .2, 4.2) }) },
    { tr: "Düğüm, soğukluk ya da ağırlık hissettiğin yerde dur: topla, taşı, dengele.", en: "Stop where you feel a knot, coldness or heaviness: gather it, carry it off, balance.",
      draw: () => F.lying(MAT.x, MAT.y) + circ(118, 104, 9, { f: C.blue, o: .55, cls: "sb-shrink", style: "animation-duration:3.6s;animation-delay:.6s" }) + grp(line(118, 68, 118, 126, { c: C.warm, w: 4 }) + glow(118, 68, 6, C.warm, .9) + glow(118, 126, 6, C.warm, .9), { cls: "sb-pulse" }) + E.sparks([[110, 86], [126, 84], [114, 120], [124, 118]], C.warm) },
    { tr: "Tüm bedeni taradıktan sonra çubuğu indir; ellerini ovuştur.", en: "After scanning the whole body, lower the bar; rub your hands together.",
      draw: () => F.lying(MAT.x, MAT.y) + grp(line(100, 62, 140, 62, { c: C.warm, w: 4 }) + glow(100, 62, 7, C.warm, .9) + glow(140, 62, 7, C.warm, .9), { cls: "sb-move", style: move(0, 70, .3, 1.8) + ";opacity:.9" }) + O.item("hands", 206, 40, { c: C.warm }) + E.rings(206, 42, 6, C.warm, 2, 2) },
  ] },

  bodymap: { thumb: 0, steps: [
    { tr: "Focus 12'de bedeninin içindeki canlı haritayı hisset: iskelet, organlar, nabız atan noktalar.", en: "In Focus 12 feel the living map inside the body: skeleton, organs, pulsing points.",
      draw: () => F.lying(MAT.x, MAT.y, { c: "rgba(217,211,255,.35)" }) + line(81, 104, 174, 106, { c: C.ink, w: 1, o: .5, dash: "2 3" }) + ell(100, 104, 8, 4.5, { f: C.rose, o: .55 }) + ell(116, 104, 7, 4, { f: C.warm, o: .55 }) + circ(94, 101, 2.5, { f: C.red, cls: "sb-pulse" }) + E.twinkle([[132, 104], [150, 105], [166, 104], [86, 102]], C.teal, 1.3) + O.badge(26, 20, "F12") },
    { tr: "Dikkatini bir bölgeye ver: örneğin karaciğer, akciğerler ya da eller.", en: "Give your attention to one region: the liver, the lungs or the hands, for example.",
      draw: lang => F.lying(MAT.x, MAT.y, { c: "rgba(217,211,255,.35)" }) + ell(116, 104, 7, 4, { f: C.warm, o: .7 }) + circ(116, 104, 16, { c: C.warm, w: 1.4, dash: "4 4", cls: "sb-breathe" }) + line(116, 88, 116, 78, { c: C.warm, w: 1 }) + text(116, 72, T(lang, "karaciğer", "liver"), { c: C.warm, s: 7 }) },
    { tr: "Orada ne hissediyorsan onu izle: sıcaklık, soğukluk, nabız, akış.", en: "Watch whatever you feel there: warmth, coolness, pulse, flow.",
      draw: lang => F.lying(MAT.x, MAT.y, { c: "rgba(217,211,255,.35)" }) + ell(116, 104, 7, 4, { f: C.warm, o: .7 }) + E.rings(116, 104, 6, C.warm, 3, 2.6) + E.flow("M84 104 Q100 96 116 104 T150 104", C.teal, { w: 1.6 }) + text(60, 60, T(lang, "sıcak", "warm"), { c: C.warm, s: 7, o: .8 }) + text(180, 60, T(lang, "akış", "flow"), { c: C.teal, s: 7, o: .8 }) },
    { tr: "Gerekirse EBT çubuğuyla o bölgeyi destekle.", en: "If needed, support that region with the Energy Bar Tool.",
      draw: () => F.lying(MAT.x, MAT.y, { c: "rgba(217,211,255,.35)" }) + ell(116, 104, 7, 4, { f: C.warm, o: .7 }) + grp(line(116, 68, 116, 126, { c: C.warm, w: 4 }) + glow(116, 68, 6, C.warm, .9) + glow(116, 126, 6, C.warm, .9), { cls: "sb-pulse" }) },
  ] },

  color: { thumb: 3, steps: [
    { tr: "Nefes alırken bir renk çek: örneğin kırmızı. Renk burnundan girsin, göğsüne dolsun.", en: "Breathe a colour in: red, for example. Let it enter through the nose and fill the chest.",
      draw: () => F.lying(MAT.x, MAT.y) + E.flow("M24 48 Q46 64 66 98", C.red, { w: 3 }) + glow(104, 104, 16, C.red, .7, { cls: "sb-breathe" }) },
    { tr: "Rengi bedeninin ihtiyaç duyduğu yere yönlendir: karaciğere, akciğere, ellerine.", en: "Direct the colour to where the body needs it: the liver, the lungs, the hands.",
      draw: () => F.lying(MAT.x, MAT.y) + glow(104, 104, 12, C.red, .5) + E.flow("M104 104 Q112 92 120 100 T140 104 T166 104", C.red, { w: 2.4 }) + glow(118, 109, 7, C.red, .8, { cls: "sb-in", style: fadeIn(1.2) }) },
    { tr: "Nefes verirken kiri, yorgunluğu ve gerginliği gri bir duman gibi dışarı ver.", en: "Breathing out, release the grime, tiredness and tension like grey smoke.",
      draw: () => F.lying(MAT.x, MAT.y) + E.sparks([[74, 92], [66, 84], [78, 80], [60, 74], [70, 66], [56, 60]], C.gray, 2.2, 3) + glow(104, 104, 12, C.red, .35) },
    { tr: "Sırayla yedi rengi gez: kırmızı, turuncu, sarı, yeşil, mavi, lacivert, menekşe.", en: "Go through the seven colours in turn: red, orange, yellow, green, blue, indigo, violet.",
      draw: () => F.lying(MAT.x, MAT.y) + circ(104, 104, 16, { f: C.red, o: .45, cls: "sb-rainbow" }) + circ(104, 104, 9, { f: C.red, o: .7, cls: "sb-rainbow" }) + RAINBOW.map((c, i) => circ(60 + i * 20, 36, 5, { f: c, o: .9 })).join("") },
  ] },

  patterning: { thumb: 2, steps: [
    { tr: "Focus 12'de, ulaşmak istediğin sonucu tek bir cümleyle netleştir.", en: "In Focus 12, state the outcome you want in one clear sentence.",
      draw: () => F.sitting(SIT.x, SIT.y) + O.badge(26, 20, "F12") + O.bubble(128, 22, 84, 44, 126, 78) + line(140, 40, 196, 40, { c: C.ink, w: 2, o: .8, cls: "sb-in", style: fadeIn(.4) }) + line(140, 50, 180, 50, { c: C.ink, w: 2, o: .5, cls: "sb-in", style: fadeIn(1) }) + circ(186, 50, 1.6, { f: C.ink, cls: "sb-in", style: fadeIn(1.4) }) },
    { tr: "O sonucu şimdi yaşanıyormuş gibi gör: nerede, kimlerle, nasıl hissediyorsun.", en: "See that outcome as if it were happening now: where, with whom, how it feels.",
      draw: () => F.sitting(SIT.x, SIT.y) + O.bubble(128, 18, 90, 54, 126, 78) + O.sun(206, 32, 6) + path("M150 62 l0 -16 l10 -8 l10 8 l0 16 Z", { c: C.ink, w: 1.2 }) + circ(182, 52, 3, { f: C.ink }) + line(182, 56, 182, 64, { c: C.ink, w: 2 }) + circ(192, 53, 3, { f: C.ink }) + line(192, 57, 192, 64, { c: C.ink, w: 2 }) },
    { tr: "Görüntüye duygu kat: sevinç, minnettarlık, gurur. Duygu, örüntünün çimentosudur.", en: "Add feeling to the picture: joy, gratitude, pride. Feeling is the cement of the pattern.",
      draw: () => F.sitting(SIT.x, SIT.y) + O.bubble(128, 18, 90, 54, 126, 78) + O.item("heart", 120, 92, { c: C.rose }) + E.rings(120, 92, 6, C.rose, 3, 2.4) + E.flow("M124 86 Q140 60 160 44", C.rose, { w: 2 }) + glow(172, 44, 20, C.rose, .5, { cls: "sb-pulse" }) },
    { tr: "Örüntüyü yerine oturt: 'Bu benim yeni halim.' De ve çık.", en: "Set the pattern in place: 'This is my new state.' Say it and step out.",
      draw: () => F.sitting(SIT.x, SIT.y) + grp(O.bubble(128, 18, 90, 54, 126, 78) + O.item("star", 172, 44, { c: C.warm }), { cls: "sb-move", style: move(-52, 60, .3, 1.8) + ";opacity:.9" }) + glow(120, 92, 14, C.warm, .7, { cls: "sb-in", style: fadeIn(2) }) },
  ] },

  food: { thumb: 2, steps: [
    { tr: "Focus 12'de, bedeninin etrafındaki alanı hisset.", en: "In Focus 12, feel the field around your body.",
      draw: () => O.ground(140) + F.sitting(SIT.x, SIT.y) + E.aura(120, 92, 36, 52, C.accent, .18) + O.badge(26, 20, "F12") },
    { tr: "Bir kaynak seç: güneş, bir ağaç, toprak ya da deniz.", en: "Choose a source: the sun, a tree, the earth or the sea.",
      draw: () => O.ground(140) + F.sitting(SIT.x, SIT.y) + O.sun(36, 30, 8, { cls: "sb-pulse" }) + O.tree(206, 140, 1) + O.water(152) + O.grass(140, 0, 90) },
    { tr: "O kaynaktan bir enerji akışı çek: nefesinle içeri al.", en: "Draw a stream of energy from that source: breathe it in.",
      draw: () => O.ground(140) + F.sitting(SIT.x, SIT.y) + O.sun(36, 30, 8) + E.flow("M46 36 Q80 60 116 92", C.warm, { w: 2.8 }) + E.flow("M40 44 Q78 72 114 98", C.warm, { w: 1.6, o: .5 }) },
    { tr: "Enerjiyi bedeninin merkezinde depola; oradan tüm bedene yay.", en: "Store the energy at the centre of the body; spread it from there through the whole body.",
      draw: () => O.ground(140) + F.sitting(SIT.x, SIT.y) + glow(120, 96, 14, C.warm, .9) + E.rings(120, 96, 10, C.warm, 3, 3) + E.flow("M120 96 Q110 70 120 78 Q130 70 120 96", C.warm, { w: 1.4, o: .5 }) },
  ] },

  onebreath: { thumb: 1, steps: [
    { tr: "Burnundan derin bir nefes al; tüm bedenden enerji topla, başının tepesine taşı.", en: "Breathe in deeply through the nose; gather energy from the whole body and carry it to the crown.",
      draw: () => F.lying(MAT.x, MAT.y) + E.flow("M172 104 Q130 98 86 100 Q70 98 70 92", C.teal, { w: 2.6 }) + E.flow("M24 50 Q46 66 66 96", C.teal, { w: 1.6, o: .5 }) + glow(70, 92, 9, C.teal, .8, { cls: "sb-pulse" }) },
    { tr: "Nefesi tut; enerjiyi beynin etrafında döndür. Rahat olduğun kadar tut; zamanla on sayıya kadar çık.", en: "Hold the breath; circle the energy around the brain. Hold as long as is comfortable; build up to a count of ten.",
      draw: () => F.lying(MAT.x, MAT.y) + grp(circ(70, 101, 14, { c: C.teal, w: 1.4, dash: "3 5" }) + circ(84, 101, 2.6, { f: C.teal }), { cls: "sb-orbit", style: "transform-origin:70px 101px" }) + Array.from({ length: 10 }, (_, i) => circ(84 + i * 8, 40, 2.2, { f: C.teal, o: .9, cls: "sb-in", style: fadeIn(.3 + i * .35, .3) })).join("") + text(76, 43, "1", { s: 7, c: C.teal }) + text(170, 43, "10", { s: 7, c: C.teal }) },
    { tr: "Mırıldanarak ver; titreşimi boğazında hisset.", en: "Hum the breath out; feel the vibration in the throat.",
      draw: () => F.lying(MAT.x, MAT.y) + E.rings(84, 104, 8, C.warm, 4, 2.4) + text(96, 72, "hmmm", { c: C.warm, s: 11, b: true, cls: "sb-pulse" }) },
  ] },

  nvc: { thumb: 1, steps: [
    { tr: "Focus 12'de zihnini aç: bir soru sor ya da bir niyet tut.", en: "In Focus 12 open the mind: ask a question or hold an intention.",
      draw: () => F.sitting(SIT.x, SIT.y) + O.badge(26, 20, "F12") + O.question(150, 54, C.accent, { cls: "sb-float", style: "animation-duration:3.4s" }) + ell(120, 92, 40, 54, { c: C.accent, w: 1, o: .35, dash: "3 5" }) },
    { tr: "Cevabı beklerken kelime arama; imgeler, renkler, hisler gelsin.", en: "While waiting for the answer, do not search for words; let images, colours and feelings come.",
      draw: () => F.sitting(SIT.x, SIT.y) + grp(text(60, 50, "abc", { s: 10, o: .7 }) + O.cross(60, 47), { cls: "sb-in", style: fadeIn(.2) }) + circ(150, 44, 9, { f: C.blue, o: .8, cls: "sb-in", style: fadeIn(1.2) }) + path("M176 54 l10 -16 l10 16 Z", { f: C.warm, c: C.warm, w: 1, o: .85, cls: "sb-in", style: fadeIn(2) }) + O.item("heart", 206, 46, { c: C.rose, cls: "sb-in", style: fadeIn(2.8) }) },
    { tr: "Gelen her şeyi not et: sembol, renk, his, mekan.", en: "Note everything that comes: symbol, colour, feeling, place.",
      draw: () => F.sitting(SIT.x, SIT.y) + O.notebook(190, 56) + O.pen(196, 50, { cls: "sb-shake", style: "--amp:.8px" }) + circ(184, 44, 2.5, { f: C.blue }) + path("M188 50 l3 -5 l3 5 Z", { f: C.warm, c: C.warm, w: .8 }) + E.flow("M136 70 Q160 60 178 60", C.accent, { w: 1.4, o: .6 }) },
    { tr: "Zamanla kendi sembol dilini tanırsın: aynı imge, aynı anlam.", en: "In time you learn your own symbol language: the same image, the same meaning.",
      draw: () => F.sitting(SIT.x, SIT.y) + line(60, 40, 100, 60, { c: C.accent, w: 1, o: .5 }) + line(100, 60, 150, 38, { c: C.accent, w: 1, o: .5 }) + line(150, 38, 196, 60, { c: C.accent, w: 1, o: .5 }) + line(60, 40, 150, 38, { c: C.accent, w: 1, o: .3 }) + circ(60, 40, 4, { f: C.blue }) + path("M96 64 l4 -8 l4 8 Z", { f: C.warm, c: C.warm, w: .8 }) + O.item("heart", 150, 38, { c: C.rose }) + O.item("star", 196, 60, { c: C.white }) },
  ] },

  compoint: { thumb: 2, steps: [
    { tr: "Focus 12'de, NVC ile ilk temasını yaşa: bir varlık, bir imge, bir his.", en: "In Focus 12, have your first contact through NVC: a presence, an image, a feeling.",
      draw: () => F.sitting(SIT.x, SIT.y) + O.badge(26, 20, "F12") + glow(196, 40, 10, C.white, .9, { cls: "sb-pulse" }) + line(132, 80, 190, 44, { c: C.white, w: 1, o: .35, dash: "2 4" }) },
    { tr: "O temas noktasını zihninde sabitle: bir yer, bir renk, bir his.", en: "Fix that point of contact in your mind: a place, a colour, a feeling.",
      draw: () => F.sitting(SIT.x, SIT.y) + glow(196, 40, 10, C.white, .7) + O.pin(196, 36, C.rose, { cls: "sb-in", style: fadeIn(.4) }) + circ(196, 40, 18, { c: C.rose, w: 1.2, dash: "3 4", cls: "sb-in", style: fadeIn(1.2) }) },
    { tr: "Her oturumda aynı noktaya uğra; temas her seferinde güçlenir.", en: "Visit the same point every session; the contact grows stronger each time.",
      draw: () => F.sitting(SIT.x, SIT.y) + glow(196, 40, 10, C.white, .8) + O.pin(196, 36, C.rose) + E.flow("M132 80 Q160 70 188 46", C.white, { w: 1.4, o: .5, slow: true }) + E.flow("M132 82 Q164 76 190 48", C.white, { w: 2.2, o: .8 }) + E.flow("M134 86 Q168 82 192 50", C.white, { w: 3, o: 1, slow: true }) + O.calendar(40, 60) },
    { tr: "Oradan sorular sor, mesajlar al; iletişim sözsüzdür.", en: "From there ask questions and receive messages; the exchange is non-verbal.",
      draw: () => F.sitting(SIT.x, SIT.y) + glow(196, 40, 10, C.white, .8) + O.pin(196, 36, C.rose) + E.flow("M134 80 Q164 60 188 44", C.accent, { w: 2 }) + E.flow("M190 50 Q166 78 136 86", C.teal, { w: 2 }) + O.question(150, 54, C.accent) + circ(166, 80, 4, { f: C.teal }) },
  ] },

  fiveq: { thumb: 1, steps: [
    { tr: "Focus 12'de, aklındaki soruyu içinden sor.", en: "In Focus 12, ask your question silently.",
      draw: () => F.sitting(SIT.x, SIT.y) + O.badge(26, 20, "F12") + O.question(146, 52, C.accent, { cls: "sb-float", style: "animation-duration:3.4s" }) },
    { tr: "Cevabı bekle: bir imge, bir his, bir kelime ya da sessizlik.", en: "Wait for the answer: an image, a feeling, a word, or silence.",
      draw: () => F.sitting(SIT.x, SIT.y) + ell(120, 92, 44, 58, { c: C.accent, w: 1, o: .3, dash: "3 5" }) + circ(160, 44, 8, { f: C.blue, o: .8, cls: "sb-in", style: fadeIn(2.6, 1.6) }) + text(60, 50, "…", { s: 16, o: .6 }) },
    { tr: "Cevabı not et; şüphe duyma, sadece kaydet.", en: "Note the answer; do not doubt it, just record it.",
      draw: () => F.sitting(SIT.x, SIT.y) + O.notebook(190, 56) + O.pen(196, 50, { cls: "sb-shake", style: "--amp:.8px" }) + circ(184, 46, 3, { f: C.blue }) + E.flow("M136 70 Q160 60 178 60", C.accent, { w: 1.4, o: .6 }) },
    { tr: "Gerekirse ardıl sorular sor: cevap, yeni sorunun kapısıdır.", en: "Ask follow-up questions if needed: each answer opens the next question.",
      draw: () => F.sitting(SIT.x, SIT.y) + O.question(56, 50, C.accent) + line(66, 46, 84, 46, { c: C.ink, w: 1.2, o: .6 }) + circ(94, 46, 6, { f: C.blue, o: .8 }) + line(104, 46, 122, 46, { c: C.ink, w: 1.2, o: .6 }) + O.question(134, 50, C.accent, { cls: "sb-in", style: fadeIn(1.2) }) + line(144, 46, 162, 46, { c: C.ink, w: 1.2, o: .6, cls: "sb-in", style: fadeIn(2) }) + circ(172, 46, 6, { f: C.warm, o: .8, cls: "sb-in", style: fadeIn(2.6) }) },
  ] },

  freeflow: { thumb: 1, steps: [
    { tr: "Hazırlık ve giriş fazlarından sonra bir niyet tut, ya da hiç tutma.", en: "After preparation and entry, hold an intention, or hold none at all.",
      draw: lang => F.lying(MAT.x, MAT.y) + O.badge(26, 20, "F12") + glow(70, 70, 6, C.warm, .9, { cls: "sb-pulse" }) + text(70, 56, T(lang, "niyet", "intention"), { s: 7, c: C.warm, o: .8 }) },
    { tr: "Zihnini akışa bırak; ne gelirse gelsin, gözlemle.", en: "Let the mind drift; whatever comes, observe it.",
      draw: () => F.lying(MAT.x, MAT.y) + grp([[30, 40, C.blue], [80, 30, C.rose], [130, 46, C.teal], [180, 34, C.warm], [230, 44, C.purple], [280, 36, C.green]].map(([x, y, c]) => circ(x, y, 5 + (x % 3), { f: c, o: .6 })).join(""), { cls: "sb-drift" }) + path("M0 60 q30 -8 60 0 t60 0 t60 0 t60 0 t60 0", { c: C.accent, w: 1, o: .35 }) },
    { tr: "Yargılama, yorumlama; sadece fark et.", en: "Do not judge or interpret; just notice.",
      draw: lang => F.lying(MAT.x, MAT.y) + grp(path("M40 44 l0 20 M30 50 h20", { c: C.gray, w: 1.6 }) + line(26, 56, 54, 56, { c: C.gray, w: 1.6 }) + O.cross(40, 52, C.red), { cls: "sb-in", style: fadeIn(.2) }) + O.eye(130, 40, { cls: "sb-in", style: fadeIn(1.4) }) + text(176, 44, T(lang, "sadece fark et", "just notice"), { s: 7, c: C.accent, o: .8, cls: "sb-in", style: fadeIn(2) }) },
    { tr: "Çanlar seni geri çağırana kadar orada kal; sonra yavaşça dön.", en: "Stay there until the bells call you back; then return slowly.",
      draw: () => F.lying(MAT.x, MAT.y) + O.bell(206, 40) + E.rings(206, 40, 10, C.warm, 3, 2.4) + E.flow("M196 50 Q160 80 126 96", C.warm, { w: 1.6, o: .6 }) },
  ] },

  walks: { thumb: 3, steps: [
    { tr: "Focus 12'ye geç: oturumla ya da tek başına, gözlerin açık.", en: "Enter Focus 12: with a session or on your own, eyes open.",
      draw: () => O.ground(STAND.y) + O.grass(STAND.y, 0, 240) + F.standing(STAND.x, STAND.y) + O.badge(120, 24, "F12") + E.aura(120, 104, 22, 44, C.accent, .14) },
    { tr: "Yürümeye başla; her adımda farkındalığı ayak tabanlarında hisset.", en: "Start walking; feel awareness in the soles of the feet at every step.",
      draw: () => O.ground(STAND.y) + F.walking(STAND.x, STAND.y) + grp(O.tree(40, STAND.y, .9) + O.tree(200, STAND.y, 1.1) + O.tree(330, STAND.y, .9), { cls: "sb-drift", style: "animation-duration:6s;--dx:-130px" }) + E.twinkle([[108, 146], [132, 146], [84, 146]], C.teal, 2) },
    { tr: "Çevreye açıl: ağaçlar, gökyüzü, yer, rüzgar.", en: "Open up to the surroundings: trees, sky, ground, wind.",
      draw: () => O.ground(STAND.y) + F.walking(STAND.x, STAND.y) + O.tree(40, STAND.y, 1, { cls: "sb-sway" }) + O.tree(206, STAND.y, 1.1, { cls: "sb-sway", style: "animation-delay:.8s" }) + O.sun(206, 28, 7) + path("M20 50 q14 -6 28 0 t28 0", { c: C.ink, w: 1.2, o: .5, cls: "sb-flow" }) + path("M150 70 q12 -5 24 0 t24 0", { c: C.ink, w: 1.2, o: .4, cls: "sb-flow slow" }) },
    { tr: "Her adımda çevreden enerji topla; bedeninin merkezinde depola.", en: "Gather energy from the surroundings with each step; store it at the centre of the body.",
      draw: () => O.ground(STAND.y) + F.walking(STAND.x, STAND.y) + O.tree(40, STAND.y, 1) + O.sun(206, 28, 7) + E.flow("M50 110 Q90 100 116 104", C.green, { w: 2 }) + E.flow("M196 36 Q160 70 124 102", C.warm, { w: 2 }) + E.flow("M120 140 Q122 124 120 108", C.earth, { w: 2 }) + glow(120, 104, 9, C.warm, .9, { cls: "sb-pulse" }) },
  ] },

  grounding: { thumb: 1, steps: [
    { tr: "Yavaş kalk; bir süre oturarak ya da ayakta bekle.", en: "Get up slowly; stay seated or standing for a while.",
      draw: lang => O.ground(STAND.y) + F.lying(6, 136, { style: "opacity:.3" }) + F.sitting(184, 124) + path("M160 100 q10 -30 20 -40", { c: C.teal, w: 1.6, dash: "3 4" }) + path("M178 64 l2 -4 l3 3", { c: C.teal, w: 1.6 }) + text(60, 40, T(lang, "yavaş", "slowly"), { s: 7, c: C.teal, o: .8 }) },
    { tr: "Ayak tabanlarını hisset; yerin enerjisini kökler gibi içine çek.", en: "Feel the soles of the feet; draw the earth's energy up like roots.",
      draw: () => O.ground(STAND.y) + F.standing(STAND.x, STAND.y) + path("M113 142 q-6 10 -14 14 M113 142 q0 12 -2 16 M127 142 q6 10 14 14 M127 142 q0 12 2 16", { c: C.earth, w: 1.6 }) + E.flow("M100 158 Q112 148 120 118", C.earth, { w: 2 }) + E.flow("M140 158 Q128 148 120 118", C.earth, { w: 2 }) + glow(120, 112, 8, C.earth, .8, { cls: "sb-pulse" }) },
    { tr: "Su iç, bir şeyler ye; bedenini hatırla.", en: "Drink water, eat something; remember the body.",
      draw: lang => O.ground(STAND.y) + F.standing(STAND.x, STAND.y) + O.item("cup", 60, 60, { cls: "sb-in", style: fadeIn(.2) }) + O.item("apple", 180, 60, { cls: "sb-in", style: fadeIn(1) }) + text(60, 80, T(lang, "su", "water"), { s: 7, o: .7 }) + text(180, 80, T(lang, "yiyecek", "food"), { s: 7, o: .7 }) },
    { tr: "Yalınayak yürü; ellerini toprağa, çimene sürt.", en: "Walk barefoot; run your hands over soil and grass.",
      draw: () => O.ground(STAND.y) + O.grass(STAND.y, 0, 240) + F.walking(STAND.x, STAND.y) + E.twinkle([[108, 146], [132, 146]], C.green, 2) + O.item("hands", 196, 132, { c: C.green }) },
    { tr: "Hafif hareket: gerin, kollarını savur, omuzlarını indir.", en: "Light movement: stretch, swing the arms, drop the shoulders.",
      draw: () => O.ground(STAND.y) + F.standing(STAND.x, STAND.y, { arms: "up" }) + path("M92 86 q-6 -16 6 -28", { c: C.teal, w: 1.4, o: .7, dash: "2 3" }) + path("M148 86 q6 -16 -6 -28", { c: C.teal, w: 1.4, o: .7, dash: "2 3" }) + E.rings(120, 98, 8, C.teal, 2, 2.6) },
  ] },

  separation: { thumb: 1, steps: [
    { tr: "Focus 10 ya da 12'de REBAL'i kur; derin bir rahatlamaya gir.", en: "In Focus 10 or 12 set up the REBAL; settle into deep relaxation.",
      draw: () => F.lying(MAT.x, MAT.y) + E.egg(120, 100, 78, 38) + O.badge(26, 20, "F10") },
    { tr: "Bir yöntem seç ve uygula; örneğin 'kütük gibi yuvarlan': bedeninin suyun üstünde yana yuvarlandığını hisset.", en: "Choose one method and apply it; 'roll out like a log', for example: feel the body rolling sideways on water.",
      draw: () => F.lying(MAT.x, MAT.y) + E.egg(120, 100, 78, 38, C.accent, { style: "opacity:.5" }) + O.water(124) + F.lying(MAT.x, MAT.y - 10, { c: "rgba(79,209,197,.75)", cls: "sb-roll" }) + path("M196 56 a16 16 0 1 1 -4 24", { c: C.teal, w: 1.6 }) + path("M192 80 l-4 1 l2 -4", { c: C.teal, w: 1.6 }) },
    { tr: "Hareketi hisset; zorlama. Titreşim, dalga ya da hafiflik gelebilir.", en: "Feel the movement; do not force it. Vibration, a wave or lightness may come.",
      draw: () => E.shake(F.lying(MAT.x, MAT.y), .7) + E.egg(120, 100, 78, 38, C.accent, { style: "opacity:.5" }) + F.lying(MAT.x, MAT.y - 6, { c: "rgba(79,209,197,.75)", cls: "sb-move", style: move(0, -28, .4, 3.2) }) + E.sparks(bodyPts(), C.teal, 1.4) },
    { tr: "Yöntem bitince REBAL'i yeniden em; bedene dön.", en: "When the method is done, absorb the REBAL again; come back to the body.",
      draw: () => F.lying(MAT.x, MAT.y) + F.lying(MAT.x, MAT.y, { c: "rgba(79,209,197,.75)", cls: "sb-move", style: "--tx:0px;--ty:0px;transform:translate(0,-34px);animation:sb-move 2s ease-in-out .3s forwards" }) + E.egg(120, 100, 78, 38, C.accent, { cls: "sb-shrink", style: "animation-delay:2.2s" }) },
    { tr: "Her oturumda bir yöntemi dene; sabırla. İlk ayrışma çoğu zaman kısadır.", en: "Try one method per session; patiently. The first separation is usually brief.",
      draw: lang => O.calendar(40, 50) + grp(F.lying(0, 0, { c: C.teal, style: "opacity:.8" }), { t: "translate(66 64) scale(.55)" }) + text(150, 46, T(lang, "yuvarlan", "roll out"), { s: 7, a: "start", o: .8 }) + text(150, 62, T(lang, "yüksel", "lift out"), { s: 7, a: "start", o: .8 }) + text(150, 78, T(lang, "doğrul", "sit up"), { s: 7, a: "start", o: .8 }) + text(150, 94, T(lang, "dön", "spin"), { s: 7, a: "start", o: .8 }) + F.lying(MAT.x, MAT.y) },
  ] },

  rv: { thumb: 2, steps: [
    { tr: "Focus 12'de algını bedeninin sınırlarının ötesine genişlet.", en: "In Focus 12 extend your perception beyond the body's boundaries.",
      draw: () => F.sitting(SIT.x, SIT.y) + O.badge(26, 20, "F12") + ell(120, 92, 44, 56, { c: C.accent, w: 1.2, o: .5, dash: "3 5", cls: "sb-grow" }) + E.rings(120, 92, 40, C.accent, 2, 3.4) },
    { tr: "Bir hedef tut: koordinatlar, bir mekan ya da bir olay.", en: "Hold a target: coordinates, a place or an event.",
      draw: lang => F.sitting(SIT.x, SIT.y) + rect(156, 30, 64, 28, { f: "rgba(217,211,255,.07)", c: C.ink, w: 1.2, rx: 3 }) + text(188, 42, "4713 · 0021", { s: 8, b: true }) + text(188, 52, T(lang, "hedef", "target"), { s: 6.5, o: .7 }) + O.pin(40, 60, C.rose, { cls: "sb-pulse" }) + line(128, 72, 152, 48, { c: C.ink, w: 1, o: .4, dash: "2 4" }) },
    { tr: "Algını hedefe yönlendir; ilk izlenimleri kaydet: renk, doku, his. Yorumlama, isimlendirme.", en: "Direct perception at the target; record the first impressions: colour, texture, feeling. Do not interpret or name.",
      draw: () => F.sitting(SIT.x, SIT.y) + O.pin(40, 60, C.rose) + E.flow("M112 78 Q76 70 48 58", C.accent, { w: 2 }) + rect(160, 34, 14, 14, { f: C.blue, o: .8, rx: 2, cls: "sb-in", style: fadeIn(.6) }) + grp(rect(180, 34, 14, 14, { c: C.ink, w: 1, rx: 2 }) + path("M181 47 l12 -12 M181 41 l6 -6 M187 47 l6 -6", { c: C.ink, w: 1 }), { cls: "sb-in", style: fadeIn(1.4) }) + O.item("heart", 207, 41, { c: C.rose, cls: "sb-in", style: fadeIn(2.2) }) + O.notebook(190, 70) },
    { tr: "Detaylandıkça aşama aşama ilerle (ideogram, duyular, boyutlar…); her şeyi günlüğe yaz.", en: "Move stage by stage as detail grows (ideogram, senses, dimensions…); write everything in the journal.",
      draw: lang => [1, 2, 3, 4, 5, 6].map((n, i) => rect(16 + i * 30, 118 - i * 14, 26, 10, { f: i < 3 ? C.accent : "rgba(143,123,255,.25)", o: i < 3 ? .85 : 1, rx: 2, cls: "sb-in", style: fadeIn(.2 + i * .35) }) + text(29 + i * 30, 125.5 - i * 14, String(n), { s: 7, b: true, c: C.white, cls: "sb-in", style: fadeIn(.2 + i * .35) })).join("") + O.notebook(214, 60) + O.pen(220, 54) },
  ] },

  colors: { thumb: 0, steps: [
    { tr: "Renk Nefesi'nde yedi rezonans rengini sırayla kullan; her biri bir bilinç halidir.", en: "Use the seven resonant colours in turn in Colour Breathing; each is a state of consciousness.",
      draw: lang => F.sitting(SIT.x, SIT.y, { style: "opacity:.85" }) + [[C.blue, "mavi", "blue"], [C.red, "kırmızı", "red"], [C.yellow, "sarı", "yellow"], [C.rose, "gül", "rose"], [C.green, "yeşil", "green"], [C.purple, "mor", "purple"], [C.white, "beyaz", "white"]].map(([c, n, ne], i) => { const a = Math.PI + i * Math.PI / 6; const x = 120 + Math.cos(a) * 92, y = 118 + Math.sin(a) * 86; return circ(x, y, 7, { f: c, o: .9, cls: "sb-pulse", style: `animation-delay:${i * .4}s` }) + text(x, y + 16, T(lang, n, ne), { s: 6.5, o: .75 }); }).join("") },
    { tr: "Bir olayı yaşarken hangi renkte olduğunu hisset: yeni farkındalık mavi, kendini yargılama kırmızı, uzlaşma sarı.", en: "While living an event, sense which colour you are in: new awareness is blue, self-judgement red, reconciliation yellow.",
      draw: lang => glow(50, 64, 20, C.blue, .6) + O.item("bulb", 50, 62) + text(50, 100, T(lang, "farkındalık", "awareness"), { s: 7, o: .8 }) + glow(120, 64, 20, C.red, .6) + O.item("mirror", 120, 60) + text(120, 100, T(lang, "özyargı", "self-judgement"), { s: 7, o: .8 }) + glow(190, 64, 20, C.yellow, .6) + O.item("hands", 190, 62) + text(190, 100, T(lang, "uzlaşma", "reconciliation"), { s: 7, o: .8 }) },
    { tr: "Gül rengi rehberlik ve şifayla, beyaz bütünlükle ilişkilidir.", en: "Rose is linked with guidance and healing, white with wholeness.",
      draw: lang => glow(78, 70, 26, C.rose, .7, { cls: "sb-pulse" }) + O.item("hands", 78, 68, { c: C.rose }) + text(78, 110, T(lang, "gül rengi · şifa, rehberlik", "rose · healing, guidance"), { s: 7, o: .8 }) + circ(166, 70, 22, { f: C.white, o: .85, cls: "sb-breathe" }) + circ(166, 70, 28, { c: C.white, w: 1, o: .5 }) + text(166, 110, T(lang, "beyaz · bütünlük", "white · wholeness"), { s: 7, o: .8 }) },
  ] },

  focusmap: { thumb: 1, steps: [
    { tr: "Her oturumun başında o oturumun seviyesini gör (detay ekranındaki Focus rozetleri).", en: "At the start of each session see its level (the Focus badges on the detail screen).",
      draw: () => ["10", "12", "15", "21", "23", "25", "27"].map((f, i) => rect(14 + i * 31, 118 - i * 13, 28, 9, { f: i === 1 ? C.accent : "rgba(143,123,255,.28)", rx: 2 }) + text(28 + i * 31, 125 - i * 13, "F" + f, { s: 7, b: true, c: C.white })).join("") + circ(59, 98, 4, { f: C.white, cls: "sb-pulse" }) + O.badge(200, 24, "F12") },
    { tr: "Giriş fazlarında bir seviyeden diğerine geçişi hisset: ritim yavaşlar, dikkat genişler.", en: "In the entry phases feel the shift from one level to the next: the beat slows, attention widens.",
      draw: () => ["10", "12", "15", "21", "23", "25", "27"].map((f, i) => rect(14 + i * 31, 118 - i * 13, 28, 9, { f: "rgba(143,123,255,.28)", rx: 2 }) + text(28 + i * 31, 125 - i * 13, "F" + f, { s: 7, b: true, c: C.white })).join("") + circ(28, 111, 4, { f: C.white, cls: "sb-move", style: move(93, -39, .4, 3.6) }) + E.flow("M28 111 L59 98 L90 85 L121 72", C.accent, { w: 1.4, o: .6 }) },
    { tr: "Ansiklopedi için ana sayfadaki Focus seviyeleri kartına dokun; her seviyenin ne olduğunu ve hangi dalgada geçtiğini okursun.", en: "For the encyclopaedia tap the Focus levels card on the home screen; read what each level is and in which wave it appears.",
      draw: lang => rect(90, 40, 60, 76, { f: "rgba(217,211,255,.06)", c: C.ink, w: 1.2, rx: 3 }) + line(120, 40, 120, 116, { c: C.ink, w: 1, o: .5 }) + text(105, 60, "F10", { s: 7, b: true }) + text(105, 74, "F12", { s: 7, b: true }) + text(105, 88, "F15", { s: 7, b: true }) + text(135, 60, "F21", { s: 7, b: true }) + text(135, 74, "F23", { s: 7, b: true }) + text(135, 88, "F27", { s: 7, b: true }) + text(120, 134, T(lang, "Ana sayfa → Focus seviyeleri", "Home → Focus levels"), { s: 7, o: .75 }) },
  ] },
};

export const storyboardIds = Object.keys(storyboards);

const STEP_MS = 5200;
export function renderFrame(id, i, lang) {
  const sb = storyboards[id];
  if (!sb) return "";
  const n = ((i % sb.steps.length) + sb.steps.length) % sb.steps.length;
  const st = sb.steps[n];
  return `<svg viewBox="0 0 240 160" class="sb-svg" role="img" aria-label="${esc(st[lang] || st.en)}">${st.draw(lang === "tr" ? "tr" : "en")}</svg>`;
}
/** Static thumbnail (animations disabled by the .sb-static wrapper in CSS). */
export function renderThumb(id, lang) {
  const sb = storyboards[id];
  return sb ? `<span class="sb-static">${renderFrame(id, sb.thumb ?? 0, lang)}</span>` : "";
}

const players = new Set();
/**
 * Mount an animated, steppable storyboard into `el`.
 * labels: { step: (i, n) => string, play, pause, prev, next }
 */
export function createPlayer(el, id, lang, labels) {
  const sb = storyboards[id];
  if (!sb || !el) return null;
  const n = sb.steps.length;
  el.classList.add("sb");
  el.innerHTML = `<div class="sb-stage" data-sb="stage"></div>
    <div class="sb-cap"><span class="sb-n"></span><span class="sb-text"></span></div>
    <div class="sb-ctl">
      <button type="button" class="sb-btn" data-sb="prev" aria-label="${esc(labels.prev)}">‹</button>
      <div class="sb-dots">${Array.from({ length: n }, (_, i) => `<button type="button" class="sb-dot" data-sb="${i}" aria-label="${i + 1}"></button>`).join("")}</div>
      <button type="button" class="sb-btn" data-sb="play" aria-label="${esc(labels.pause)}">❚❚</button>
      <button type="button" class="sb-btn" data-sb="next" aria-label="${esc(labels.next)}">›</button>
    </div>`;
  const stage = el.querySelector("[data-sb='stage']"), cap = el.querySelector(".sb-text"), num = el.querySelector(".sb-n"), playBtn = el.querySelector("[data-sb='play']");
  const p = { el, i: 0, timer: null, playing: true, visible: true };
  const show = i => {
    p.i = ((i % n) + n) % n;
    const st = sb.steps[p.i];
    stage.innerHTML = renderFrame(id, p.i, lang);
    cap.textContent = st[lang] || st.en;
    num.textContent = labels.step(p.i + 1, n);
    el.querySelectorAll(".sb-dot").forEach((d, k) => d.classList.toggle("on", k === p.i));
    schedule();
  };
  const schedule = () => {
    clearTimeout(p.timer);
    if (!p.playing || !p.visible) return;
    p.timer = setTimeout(() => { if (!el.isConnected) return destroy(); show(p.i + 1); }, sb.steps[p.i].dur || STEP_MS);
  };
  const setPlaying = v => { p.playing = v; playBtn.textContent = v ? "❚❚" : "▶"; playBtn.setAttribute("aria-label", v ? labels.pause : labels.play); el.classList.toggle("sb-paused", !v); schedule(); };
  const destroy = () => { clearTimeout(p.timer); p.io?.disconnect(); players.delete(p); };
  el.addEventListener("click", e => {
    const b = e.target.closest("[data-sb]");
    if (!b) return;
    const a = b.dataset.sb;
    if (a === "prev") { show(p.i - 1); }
    else if (a === "next" || a === "stage") { show(p.i + 1); }
    else if (a === "play") setPlaying(!p.playing);
    else if (/^\d+$/.test(a)) show(Number(a));
  });
  if (typeof IntersectionObserver === "function") {
    p.io = new IntersectionObserver(es => { for (const x of es) { p.visible = x.isIntersecting; el.classList.toggle("sb-off", !p.visible); } schedule(); }, { threshold: .15 });
    p.io.observe(el);
  }
  players.add(p);
  p.destroy = destroy; p.show = show; p.setPlaying = setPlaying;
  show(0);
  return p;
}
/** Stop every player whose element left the document (call when a view is replaced). */
export function sweepPlayers() { for (const p of [...players]) if (!p.el.isConnected) p.destroy(); }
