// "Energy Flow" visual pack: an egg-shaped energy body (the REBAL) with orbiting particles.
// State = the current focus level (focus10 … focus27), "prep", "explore" or "return".
const COLORS = {
  prep: "#625d78", focus10: "#8f7bff", focus12: "#6fa8ff", focus15: "#4fd1c5",
  focus21: "#e8a94a", focus23: "#d98ac2", focus25: "#c2836f", focus27: "#9b7fe0",
  explore: "#b7a6ff", return: "#7fc28b",
};

export default function render(state, lang) {
  const m = /^focus(\d+)$/.exec(state || "");
  const key = m ? "focus" + m[1] : (state || "explore");
  const color = COLORS[key] || COLORS.explore;
  return `<svg viewBox="0 0 100 100" aria-hidden="true" class="gw-aura gw-${key}">
    <defs><radialGradient id="auGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${color}" stop-opacity=".30"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </radialGradient></defs>
    <circle cx="50" cy="52" r="48" fill="url(#auGlow)"/>
    <ellipse cx="50" cy="52" rx="31" ry="42" fill="none" stroke="${color}" stroke-width=".7" opacity=".18"/>
    <ellipse cx="50" cy="52" rx="24" ry="34" fill="none" stroke="${color}" stroke-width=".9" opacity=".45" class="gw-pulse2"/>
    <ellipse cx="50" cy="52" rx="17" ry="26" fill="none" stroke="${color}" stroke-width="1.4" opacity=".9" class="gw-pulse"/>
    <g class="gw-orbit"><circle cx="50" cy="12" r="1.7" fill="${color}"/></g>
    <g class="gw-orbit2"><circle cx="50" cy="92" r="1.3" fill="${color}"/></g>
    <g class="gw-orbit3"><circle cx="12" cy="52" r="1.1" fill="${color}"/></g>
    <circle cx="50" cy="52" r="3.2" fill="${color}" opacity=".85"/>
  </svg>`;
}
