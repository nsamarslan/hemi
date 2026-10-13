// Turns an exercise (+ params, language, settings) into an exact timeline of sounds and phases.
// Times are in seconds from the start of the session.
import { content } from "./content.js";

export const BELL = { start: { len: 7, gap: 3.5 }, soft: { len: 3, gap: 1.2 }, end: { len: 7, gap: 3 }, beep: { len: 0.5, gap: 0 } };

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

/**
 * @param o { lang, mode: "partner"|"mirror", pauseScale, remindEvery (0 = off), nightBeep, dur(key, text) → sec,
 *            seed, ending: "done" | "none" | "routineDone" }
 */
export function buildTimeline(ex, params, o) {
  const events = [], phases = [];
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
    const rec = { uid: ph.uid, name: ph.name, iter: ph.iter, iters: ph.iters, visual: ph.visual || null, start: t, holdStart: null, holdEnd: null, lines: [] };
    if (ph.bell) t += bell(ph.bell, t);
    for (const l of ph.lines || []) {
      if (l.when === "first" && ph.iter !== 0) continue;
      if (l.when === "notFirst" && ph.iter === 0) continue;
      if (l.when === "last" && ph.iter !== ph.iters - 1) continue;
      if (l.mode && l.mode !== o.mode) continue;
      const d = clip(l.text, l.audio, t);
      t += d + scalePause(l.pause ?? 2);
    }
    const hs = holdSeconds(ex, ph.hold, params);
    if (hs > 0) {
      rec.holdStart = t; rec.holdEnd = t + hs;
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

  if (o.ending !== "none" && !ex.night) {
    t += 1;
    t += bell("end", t);
    const c = content.common.lines[o.ending === "routineDone" ? "routineDone" : "done"];
    t += clip(c, c.audio, t) + 2;
  } else if (o.ending === "routineDone") {
    const c = content.common.lines.routineDone;
    t += 2 + clip(c, c.audio, t + 2) + 2;
  } else {
    t += ex.night ? 8 : 2;
  }

  if (ex.night && o.nightBeep) {
    for (let at = 300; at < t - 30; at += 300) {
      const clash = events.some(e => e.type === "clip" && at < e.t + e.dur + 0.5 && at + 0.6 > e.t);
      events.push({ t: clash ? at + 6 : at, type: "bell", kind: "beep", dur: BELL.beep.len });
    }
  }
  events.sort((a, b) => a.t - b.t);
  return { events, phases, duration: t };
}

/** Concatenate several exercises (a programme) into one timeline. */
export function buildRoutine(items, getEx, getParams, o) {
  const events = [], phases = [];
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
    const tl = buildTimeline(ex, Object.assign(getParams(ex), preset ? preset.values : {}, it.params || {}), { ...o, mode: it.mode || "mirror", ending: last ? "routineDone" : "none", seed: (o.seed || 1) + i });
    tl.events.forEach(e => events.push({ ...e, t: e.t + t }));
    tl.phases.forEach(p => phases.push({ ...p, start: p.start + t, end: p.end + t, holdStart: p.holdStart == null ? null : p.holdStart + t, holdEnd: p.holdEnd == null ? null : p.holdEnd + t, exId: ex.id }));
    t += tl.duration;
  });
  return { events, phases, duration: t };
}
