// "Body Map" visual pack: a body outline with a scanning line and seven chakra points.
// State = the current focus level, "prep", "explore" or "return".
const COLORS = {
  prep: "#625d78", focus10: "#8f7bff", focus12: "#6fa8ff", focus15: "#4fd1c5",
  focus21: "#e8a94a", focus23: "#d98ac2", focus25: "#c2836f", focus27: "#9b7fe0",
  explore: "#b7a6ff", return: "#7fc28b",
};
const CHAKRAS = [88, 78, 68, 58, 48, 38, 28]; // root → crown

export default function render(state, lang) {
  const m = /^focus(\d+)$/.exec(state || "");
  const key = m ? "focus" + m[1] : (state || "explore");
  const color = COLORS[key] || COLORS.explore;
  const dots = CHAKRAS.map((y, i) =>
    `<circle cx="50" cy="${y}" r="1.8" fill="${color}" class="gw-chakra" style="animation-delay:${(i * 0.35).toFixed(2)}s"/>`).join("");
  return `<svg viewBox="0 0 100 100" aria-hidden="true" class="gw-body gw-${key}">
    <defs><radialGradient id="bdGlow" cx="50%" cy="52%" r="50%">
      <stop offset="0%" stop-color="${color}" stop-opacity=".24"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </radialGradient></defs>
    <circle cx="50" cy="52" r="48" fill="url(#bdGlow)"/>
    <g stroke="${color}" fill="none" stroke-width="1.4" opacity=".9">
      <circle cx="50" cy="15" r="6"/>
      <ellipse cx="50" cy="52" rx="13" ry="21" class="gw-pulse"/>
      <line x1="38" y1="38" x2="24" y2="60"/><line x1="62" y1="38" x2="76" y2="60"/>
      <line x1="45" y1="72" x2="42" y2="91"/><line x1="55" y1="72" x2="58" y2="91"/>
    </g>
    <g class="gw-scanline"><line x1="31" y1="52" x2="69" y2="52" stroke="${color}" stroke-width="1" opacity=".8"/></g>
    ${dots}
  </svg>`;
}
