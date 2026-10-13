// "Color Waves" visual pack: the seven resonant colors as flowing waves (color breathing).
// State = the current focus level, "prep", "explore" or "return".
const STATE_COLORS = {
  prep: "#625d78", focus10: "#e8c84a", focus12: "#5fae6e", focus15: "#4a90d9",
  focus21: "#e8e2d0", focus23: "#e05a4f", focus25: "#d98a8a", focus27: "#9b5fd9",
  explore: "#b7a6ff", return: "#7fc28b",
};
const RESONANT = ["#e05a4f", "#e8913a", "#e8c84a", "#5fae6e", "#4a90d9", "#5a4fd9", "#9b5fd9"];

export default function render(state, lang) {
  const m = /^focus(\d+)$/.exec(state || "");
  const key = m ? "focus" + m[1] : (state || "explore");
  const accent = STATE_COLORS[key] || STATE_COLORS.explore;
  const waves = RESONANT.map((c, i) =>
    `<path d="M -6 ${18 + i * 10.5} q 12.5 -7 25 0 t 25 0 t 25 0 t 25 0 t 25 0 t 25 0"
       fill="none" stroke="${c}" stroke-width="1.7" opacity="${0.9 - i * 0.07}"
       class="gw-wave" style="animation-delay:${(i * 0.45).toFixed(2)}s"/>`).join("");
  return `<svg viewBox="0 0 100 100" aria-hidden="true" class="gw-waves gw-${key}">
    <defs><radialGradient id="wvGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${accent}" stop-opacity=".22"/><stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient></defs>
    <circle cx="50" cy="50" r="48" fill="url(#wvGlow)"/>
    ${waves}
    <circle cx="50" cy="50" r="2.6" fill="${accent}" opacity=".9"/>
  </svg>`;
}
