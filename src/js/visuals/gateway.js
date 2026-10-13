// The Gateway portal visual: concentric rings around a slowly turning dashed ring.
// State = the current focus level (focus10 … focus27), "prep", "explore" or "return".
const COLORS = {
  prep: "#625d78", focus10: "#8f7bff", focus12: "#6fa8ff", focus15: "#4fd1c5",
  focus21: "#e8a94a", focus23: "#d98ac2", focus25: "#c2836f", focus27: "#9b7fe0",
  explore: "#b7a6ff", return: "#7fc28b",
};
const LABELS = {
  prep: "…", explore: "∞", return: "↩",
};

export default function render(state, lang) {
  const m = /^focus(\d+)$/.exec(state || "");
  const key = m ? "focus" + m[1] : (state || "explore");
  const color = COLORS[key] || COLORS.explore;
  const num = m ? m[1] : null;
  const label = num ? num : (LABELS[key] || "∞");
  const rings = [30, 22, 14].map((r, i) =>
    `<circle cx="50" cy="50" r="${r}" fill="none" stroke="${color}" stroke-width="${i === 0 ? 1.4 : 1}" opacity="${0.9 - i * 0.22}"/>`).join("");
  return `<svg viewBox="0 0 100 100" aria-hidden="true" class="gw-portal gw-${key}">
    <defs><radialGradient id="gwGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${color}" stop-opacity=".28"/><stop offset="70%" stop-color="${color}" stop-opacity=".06"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/></radialGradient></defs>
    <circle cx="50" cy="50" r="46" fill="url(#gwGlow)"/>
    ${rings}
    <circle cx="50" cy="50" r="37" fill="none" stroke="${color}" stroke-width=".8" opacity=".55"
      stroke-dasharray="2 5" class="gw-spin"/>
    <circle cx="50" cy="50" r="8.5" fill="none" stroke="${color}" stroke-width="1.1" opacity=".9"/>
    <text x="50" y="50" text-anchor="middle" dominant-baseline="central"
      font-family="Marcellus, Georgia, serif" font-size="${num ? 11 : 9}" fill="${color}">${label}</text>
  </svg>`;
}
