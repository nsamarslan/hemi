// Turns an exercise (+ params, language, settings) into an exact timeline of sounds, phases and the
// binaural bed. Times are in seconds from the start of the session.
//
// The binaural bed is continuous across the whole session: one segment per phase, overlapping by
// BED_FADE seconds (crossfade), with the beat frequency gliding from the previous segment's frequency
// to this segment's target. Each segment records the absolute oscillator phase at its start, so any
// chunk can be rendered independently with exact phase continuity (see audio.js).
import { content } from "./content.js";

export const BELL = { start: { len: 7, gap: 3.5 }, soft: { len: 3, gap: 1.2 }, end: { len: 7, gap: 3 }, beep: { len: 0.5, gap: 0 } };
export const BED_FADE = 8; // crossfade seconds between bed segments

function rng(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const shuffle = (arr, rand) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/** Expand repeats and conditions into a flat list of phases (with iteration info). */
export function expandPhases(ex, params) {
  const out = [];
  const add = (ph, iter = 0, iters = 1) => {
    if (ph.when && !params[ph.when]) return;
    out.push({ ...ph, uid: iters > 1 ? `${ph.id}-${iter + 1}` : ph.id, iter, iters });
  };
  for (const ph of ex.phases) {
    if (ph.repeat) {
      const n = Math.max(1, Math.round(ph.repeat.param ? params[ph.repeat.param] : ph.repeat.times));
      for (let i = 0; i < n; i++) ph.phases.forEach(p => add(p, i, n));
    } else add(ph);
  }
  return out;
}

export function holdSeconds(ex, hold, params) {
  if (!hold) return 0;
  if (hold.param) {
    const def = ex.params.find(p => p.key === hold.param);
    return (params[hold.param] ?? def?.def ?? 0) * (def?.unit === "min" ? 60 : 1);
  }
  return hold.sec || 0;
}

// ---------- binaural bed ----------
// Integral of a linearly gliding frequency f0→f1 (over g seconds) from 0 to T — used for exact phases.
// Cycles an oscillator completes in T seconds: f0 for the first `hold` seconds, then a linear glide to f1 over g seconds.
export const freqIntegral = (f0, f1, g, T, hold = 0) => {
  if (T <= hold) return f0 * T;
  const u = T - hold;
  return f0 * hold + (g > 0 ? (u <= g ? f0 * u + (f1 - f0) * u * u / (2 * g) : f0 * g + (f1 - f0) * g / 2 + f1 * (u - g)) : f0 * u);
};
/** Start each bed segment at the phase the previous one's oscillator has at that moment, so their crossfade does not cancel. */
function chainPhases(bed) {
  for (let i = 1; i < bed.length; i++) {
    const p = bed[i - 1], s = bed[i], T = s.t0 - p.t0;
    s.phaseL = (p.phaseL + 2 * Math.PI * freqIntegral(p.f0L, p.f1L, p.glide, T, p.hold)) % (2 * Math.PI);
    s.phaseR = (p.phaseR + 2 * Math.PI * freqIntegral(p.f0R, p.f1R, p.glide, T, p.hold)) % (2 * Math.PI);
  }
  return bed;
}

function bedSpecFor(ex, ph, inherited) {
  const spec = ph.bed || inherited || { beat: "focus" };
  const focusId = String(ph.focus ?? ex.focus?.[0] ?? "10");
  const beat = spec.beat === "focus" ? (content.common.focusBeats?.[focusId] ?? 7.5) : spec.beat;
  const carrier = spec.carrier ?? (content.common.focusCarrier?.[focusId] ?? 180);
  return {
    beat, carrier, focusId,
    gain: spec.gain ?? content.common.bedDefaultGain ?? 0.14,
    glide: spec.glide ?? null,   // seconds, or "phase" = whole phase
    fade: spec.fade ?? BED_FADE,
  };
}

/**
 * @param o { lang, pauseScale, remindEvery (0 = off), dur(key, text) → sec, seed,
 *            ending: "done" | "none" | "routineDone", sleepFade (seconds, night sessions; default 120) }
 */
export const FADE_PHASE = { tr: "Sönümlenme", en: "Fading out" };
/** Normalised breathing pattern of a phase (seconds per stage) or null. */
export function breathPattern(ph) {
  const b = ph && ph.breath;
  if (!b || !(b.in > 0) || !(b.out > 0)) return null;
  const p = { in: +b.in, hold: +b.hold || 0, out: +b.out, rest: +b.rest || 0, tone: b.tone === "hum" || b.tone === "tick" ? b.tone : null };
  p.period = p.in + p.hold + p.out + p.rest;
  return p;
}
/**
 * Where the breath guide stands at time `now`: null outside paced-breathing holds, otherwise
 * { seg, stage: "in"|"hold"|"out"|"rest", k (0–1 within the stage), left (s left in the stage), level (0–1 lung fill), cycle }.
 */
export function breathAt(tl, now) {
  const seg = (tl.breath || []).find(b => now >= b.t0 && now < b.t1);
  if (!seg) return null;
  const τ = (now - seg.t0) % seg.period, cycle = Math.floor((now - seg.t0) / seg.period);
  const stages = [["in", seg.in], ["hold", seg.hold], ["out", seg.out], ["rest", seg.rest]];
  let acc = 0;
  for (const [stage, len] of stages) {
    if (len > 0 && τ < acc + len) {
      const k = (τ - acc) / len;
      const level = stage === "in" ? k : stage === "hold" ? 1 : stage === "out" ? 1 - k : 0;
      return { seg, stage, k, left: acc + len - τ, level, cycle };
    }
    acc += len;
  }
  return { seg, stage: "rest", k: 1, left: 0, level: 0, cycle };
}

export function buildTimeline(ex, params, o) {
  const events = [], phases = [], breath = [];
  const rand = rng(o.seed ?? 1);
  let t = 0;
  const scalePause = p => (p >= 3 ? p * o.pauseScale : p);
  const clip = (textObj, audio, at) => {
    const text = textObj[o.lang], key = audio?.[o.lang];
    const d = o.dur(key, text);
    events.push({ t: at, type: "clip", key, text, dur: d.sec, missing: d.missing });
    return d.sec;
  };
  const bell = (kind, at) => { events.push({ t: at, type: "bell", kind, dur: BELL[kind].len }); return BELL[kind].gap; };

  for (const ph of expandPhases(ex, params)) {
    const rec = { uid: ph.uid, name: ph.name, iter: ph.iter, iters: ph.iters, visual: ph.visual || null, focus: ph.focus ?? null, bed: ph.bed ?? null, start: t, holdStart: null, holdEnd: null, lines: [] };
    if (ph.bell) t += bell(ph.bell, t);
    for (const l of ph.lines || []) {
      if (l.when === "first" && ph.iter !== 0) continue;
      if (l.when === "notFirst" && ph.iter === 0) continue;
      if (l.when === "last" && ph.iter !== ph.iters - 1) continue;
      const d = clip(l.text, l.audio, t);
      t += d + scalePause(l.pause ?? 2);
    }
    const hs = holdSeconds(ex, ph.hold, params);
    if (hs > 0) {
      rec.holdStart = t; rec.holdEnd = t + hs;
      const bp = breathPattern(ph);
      if (bp) { rec.breath = bp; breath.push({ ...bp, t0: t, t1: t + hs, phase: ph.uid }); }
      const h = ph.hold;
      const every = h.essential ? (h.every || 90) : (o.remindEvery ? (h.every || o.remindEvery) : 0);
      const lastMin = h.lastMinute !== false && !ex.night && hs >= 180 ? rec.holdEnd - 60 : null;
      let busyUntil = t;
      if (lastMin) { const c = content.common.lines.oneMinute; events.push({ t: lastMin, type: "clip", key: c.audio?.[o.lang], text: c[o.lang], dur: o.dur(c.audio?.[o.lang], c[o.lang]).sec }); }
      if (every && h.reminders?.length) {
        let order = shuffle(h.reminders, rand), i = 0;
        for (let at = t + every; ; at += every) {
          const r = order[i % order.length];
          const d = o.dur(r.audio?.[o.lang], r.text[o.lang]).sec;
          const s = Math.max(at, busyUntil + 4);
          if (s + d > rec.holdEnd - 15) break;
          if (lastMin && s < lastMin + 12 && s + d > lastMin - 4) continue;
          clip(r.text, r.audio, s);
          busyUntil = s + d;
          if (++i % order.length === 0) order = shuffle(h.reminders, rand);
        }
      }
      t = rec.holdEnd;
    }
    rec.end = t;
    phases.push(rec);
  }

  if (ex.night) {
    // sleep sessions never count back up or ring: the bed fades out slowly while the sleeper drifts off
    const fadeSec = Math.max(10, o.sleepFade ?? 120);
    const prev = phases[phases.length - 1];
    phases.push({ uid: "fade", name: FADE_PHASE, iter: 0, iters: 1, visual: null, focus: prev?.focus ?? null, bed: null, start: t, holdStart: t, holdEnd: t + fadeSec, lines: [], fadeOut: true, end: t + fadeSec });
    t += fadeSec;
  } else if (o.ending !== "none") {
    t += 1;
    t += bell("end", t);
    const c = content.common.lines[o.ending === "routineDone" ? "routineDone" : "done"];
    t += clip(c, c.audio, t) + 2;
  } else {
    t += 2;
  }
  events.sort((a, b) => a.t - b.t);

  // ---------- binaural bed: one continuous segment per phase ----------
  const bed = [];
  let prevF = null, inheritedSpec = null;
  for (const rec of phases) {
    const explicit = rec.bed || null;
    const spec = bedSpecFor(ex, rec, explicit ? null : inheritedSpec);
    inheritedSpec = explicit || inheritedSpec;
    const f1L = spec.carrier, f1R = spec.carrier + spec.beat;
    const f0L = prevF ? prevF.fL : f1L, f0R = prevF ? prevF.fR : f1R;
    const phaseLen = rec.end - rec.start;
    let glide = spec.glide === "phase" ? Math.max(1, phaseLen) : spec.glide;
    if (glide == null) glide = prevF && (f0L !== f1L || f0R !== f1R) ? Math.min(600, Math.max(30, phaseLen / 2)) : 0;
    const isLast = rec === phases[phases.length - 1];
    // a glide waits out the crossfade (both segments at the same frequency) and ends by the next segment's start
    const hold = prevF && glide > 0 ? BED_FADE : 0;
    if (glide > 0 && !isLast) glide = Math.max(1, Math.min(glide, phaseLen - hold));
    const len = (isLast ? (t - rec.start) + 4 : phaseLen + BED_FADE);
    const fade = Math.min(spec.fade, len / 3);
    const seg = { t0: rec.start, len, glide, hold, fade, gain: spec.gain, f0L, f1L, f0R, f1R, phaseL: 0, phaseR: 0 };
    if (rec.fadeOut) seg.fadeOut = len;    // the whole segment is one long fade-out (sleep ending)
    bed.push(seg);
    prevF = { fL: f1L, fR: f1R };
    rec.bed = { beat: spec.beat, focus: spec.focusId };
  }

  return { events, phases, bed: chainPhases(bed), breath, duration: t };
}

/** Concatenate several exercises (a programme or a whole wave) into one timeline. */
export function buildRoutine(items, getEx, getParams, o) {
  const events = [], phases = [], bed = [], breath = [];
  let t = 0;
  items.forEach((it, i) => {
    const ex = getEx(it.id);
    if (!ex) return;
    if (i > 0) {
      const c = content.common.lines.next;
      const d1 = o.dur(c.audio?.[o.lang], c[o.lang]).sec;
      events.push({ t, type: "clip", key: c.audio?.[o.lang], text: c[o.lang], dur: d1 });
      t += d1 + 1;
      const d2 = o.dur(ex.titleAudio?.[o.lang], ex.title[o.lang]).sec;
      events.push({ t, type: "clip", key: ex.titleAudio?.[o.lang], text: ex.title[o.lang], dur: d2 });
      t += d2 + 2;
    }
    const last = i === items.length - 1;
    const preset = it.preset && (ex.presets || []).find(p => p.id === it.preset);
    const tl = buildTimeline(ex, Object.assign(getParams(ex), preset ? preset.values : {}, it.params || {}), { ...o, ending: last ? "routineDone" : "none", seed: (o.seed || 1) + i });
    // keep the bed continuous across the transition clips: extend the previous session's last segment through the
    // gap so it fades out exactly while this session's first segment fades in, and carry the frequency over
    // (oscillator phases are chained over the whole routine at the end)
    if (i > 0 && bed.length && tl.bed.length) {
      const prev = bed[bed.length - 1];
      const gap = t - prev.t0 - prev.len + BED_FADE;
      if (gap > 0) prev.len += gap;
      const first = tl.bed[0];
      if (first.f0L !== prev.f1L || first.f0R !== prev.f1R) {
        first.f0L = prev.f1L; first.f0R = prev.f1R;
        first.hold = BED_FADE;
        first.glide = Math.max(1, Math.min(600, Math.max(30, first.len / 2), first.len - 2 * BED_FADE));
      }
    }
    tl.events.forEach(e => events.push({ ...e, t: e.t + t }));
    tl.phases.forEach(p => phases.push({ ...p, start: p.start + t, end: p.end + t, holdStart: p.holdStart == null ? null : p.holdStart + t, holdEnd: p.holdEnd == null ? null : p.holdEnd + t, exId: ex.id }));
    tl.bed.forEach(s => bed.push({ ...s, t0: s.t0 + t }));
    (tl.breath || []).forEach(b => breath.push({ ...b, t0: b.t0 + t, t1: b.t1 + t }));
    t += tl.duration;
  });
  events.sort((a, b) => a.t - b.t);
  return { events, phases, bed: chainPhases(bed), breath, duration: t };
}
