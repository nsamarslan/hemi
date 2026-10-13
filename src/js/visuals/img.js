// "Cosmic Images" visual pack: generated artwork (src/visuals/img/*.jpg) shown as a slowly
// breathing circular image. State → image mapping: prep → the box, return → the waves,
// everything else → the energy orb.
const MAP = {
  prep: "visuals/img/box.jpg",
  return: "visuals/img/waves.jpg",
};

export default function render(state, lang) {
  const src = MAP[state] || "visuals/img/orb.jpg";
  return `<img src="${src}" alt="" class="gw-img gw-img-${state || "explore"}" loading="eager" decoding="async">`;
}
