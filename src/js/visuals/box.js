// "The Box (ECB)" visual pack: the Energy Conversion Box — a glowing cube with light rays
// streaming into it. State = the current focus level, "prep", "explore" or "return".
const COLORS = {
  prep: "#625d78", focus10: "#8f7bff", focus12: "#6fa8ff", focus15: "#4fd1c5",
  focus21: "#e8a94a", focus23: "#d98ac2", focus25: "#c2836f", focus27: "#9b7fe0",
  explore: "#b7a6ff", return: "#7fc28b",
};

export default function render(state, lang) {
  const m = /^focus(\d+)$/.exec(state || "");
  const key = m ? "focus" + m[1] : (state || "explore");
  const color = COLORS[key] || COLORS.explore;
  return `<svg viewBox="0 0 100 100" aria-hidden="true" class="gw-box gw-${key}">
    <defs>
      <radialGradient id="bxGlow" cx="50%" cy="55%" r="50%">
        <stop offset="0%" stop-color="${color}" stop-opacity=".26"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="bxRay" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${color}" stop-opacity=".95"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <circle cx="50" cy="55" r="47" fill="url(#bxGlow)"/>
    <g class="gw-rays" stroke-width="1.1" fill="none">
      <line x1="28" y1="3" x2="41" y2="33" stroke="url(#bxRay)"/>
      <line x1="50" y1="1" x2="50" y2="31" stroke="url(#bxRay)"/>
      <line x1="72" y1="3" x2="59" y2="33" stroke="url(#bxRay)"/>
    </g>
    <rect x="40" y="29" width="32" height="32" fill="none" stroke="${color}" stroke-width=".8" opacity=".4"/>
    <g stroke="${color}" opacity=".35" stroke-width=".7">
      <line x1="34" y1="35" x2="40" y2="29"/><line x1="66" y1="35" x2="72" y2="29"/>
      <line x1="34" y1="67" x2="40" y2="61"/><line x1="66" y1="67" x2="72" y2="61"/>
    </g>
    <rect x="34" y="35" width="32" height="32" fill="none" stroke="${color}" stroke-width="1.4" opacity=".95" class="gw-pulse"/>
    <circle cx="50" cy="51" r="4" fill="${color}" opacity=".8"/>
  </svg>`;
}
