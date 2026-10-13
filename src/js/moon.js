// Moon phase from a reference new moon and the mean synodic month (accurate to well under a day).
const SYNODIC = 29.530588853;
const REF_NEW = Date.UTC(2000, 0, 6, 18, 14) / 86400000; // 2000-01-06 18:14 UTC

export function moonPhase(date = new Date()) {
  const days = date.getTime() / 86400000 - REF_NEW;
  const age = ((days % SYNODIC) + SYNODIC) % SYNODIC;           // 0 = new, ~14.77 = full
  const frac = age / SYNODIC;
  const illum = (1 - Math.cos(2 * Math.PI * frac)) / 2;
  const names = ["moonNew", "moonWaxingCrescent", "moonFirstQuarter", "moonWaxingGibbous", "moonFull", "moonWaningGibbous", "moonLastQuarter", "moonWaningCrescent"];
  const name = names[Math.floor((frac * 8 + 0.5) % 8)];
  const toFull = ((SYNODIC / 2 - age) + SYNODIC) % SYNODIC;
  const toNew = SYNODIC - age;
  return { age, frac, illum, name, toFull, toNew, nearFull: Math.min(toFull, SYNODIC - toFull) < 1.5, nearNew: Math.min(age, toNew) < 1.5 };
}

/** Small moon drawing; lit part in accent, dark part in surface. */
export function moonSvg(frac, size = 28) {
  const r = 10, waxing = frac < 0.5;
  const k = Math.cos(2 * Math.PI * frac);                        // 1 new … -1 full
  const rx = Math.abs(k) * r;
  const lit = waxing ? 1 : 0;                                    // which limb is lit
  const sweepOuter = waxing ? 1 : 0;
  const sweepInner = k > 0 ? (waxing ? 0 : 1) : (waxing ? 1 : 0);
  const d = `M12 ${12 - r} A ${r} ${r} 0 0 ${sweepOuter} 12 ${12 + r} A ${rx} ${r} 0 0 ${sweepInner} 12 ${12 - r} Z`;
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true"><circle cx="12" cy="12" r="${r}" fill="var(--surface-2)" stroke="var(--line)" stroke-width="1"/>${frac > 0.02 && frac < 0.98 ? `<path d="${d}" fill="var(--accent)" opacity=".9"/>` : ""}</svg>`;
}
