// Audio engine. The session (voice guidance + binaural bed + bells + ambience) is rendered in pure
// JavaScript into stereo 22.05 kHz WAV chunks that play through one <audio> element — so playback
// continues with the screen locked (OS media playback) and lock-screen controls work.
//
// The binaural bed is rendered sample-exactly: every bed segment carries its absolute oscillator phase,
// so chunks can be rendered independently and join with phase continuity (no clicks at boundaries).
import { content, packFor, clipInfo } from "./content.js";
import { settings } from "./store.js";
import { freqIntegral } from "./timeline.js";
import { t } from "./i18n.js";

export const SR = 22050;
const CHUNK = 150; // seconds per rendered chunk

// ---------- recorded voice clips (packs built by tools/build.mjs from content/voice/; see tools/voice-pack.py) ----------
const decoded = new Map();     // `${lang}/${key}` → Float32Array (mono)
const packLoads = new Map();   // `${lang}/${pack}` → Promise
let decoder = null;
const getDecoder = () => (decoder ||= new OfflineAudioContext(1, 1, SR));

// Fetch one pack file and decode its clips; never throws — a missing pack simply leaves the lines to text-to-speech.
export function loadPack(lang, pack) {
  if (settings.recordedVoice === false) return Promise.resolve();
  const id = `${lang}/${pack}`;
  if (packLoads.has(id)) return packLoads.get(id);
  const p = packFor(lang, pack);
  if (!p) return Promise.resolve();
  const pr = (async () => {
    try {
      const r = await fetch(p.file);
      if (!r.ok) throw new Error(String(r.status));
      const buf = await r.arrayBuffer();
      await Promise.all(Object.entries(p.clips).map(async ([key, [off, len]]) => {
        if (decoded.has(`${lang}/${key}`)) return;
        try {
          const ab = await getDecoder().decodeAudioData(buf.slice(off, off + len));
          decoded.set(`${lang}/${key}`, ab.getChannelData(0));
        } catch {}
      }));
    } catch { packLoads.delete(id); }
  })();
  packLoads.set(id, pr);
  return pr;
}
export const loadPacks = (lang, packs) => Promise.all([...new Set(packs)].map(p => loadPack(lang, p)));

/** Duration lookup used by the timeline builder. */
export function clipDur(lang) {
  return (key, text) => {
    if (settings.recordedVoice === false) key = null;
    const b = key && decoded.get(`${lang}/${key}`);
    if (b) return { sec: b.length / SR, missing: false };
    const info = key && clipInfo(lang, key);
    if (info) return { sec: info.dur, missing: false };
    return { sec: Math.max(1.2, (text || "").length / 13 + 0.4), missing: true };
  };
}

// ---------- pure-JS sample rendering ----------
const BELL_PARTS = {
  beep: [[880, 0.25, 0.35]],
  soft: [[392, 0.6, 2.6], [1056, 0.22, 1.6], [1740, 0.08, 0.9]],
  start: [[196, 1, 7], [541, 0.5, 5], [1060, 0.25, 3.5], [1745, 0.12, 2.2]],
  end: [[196, 1, 7], [541, 0.5, 5], [1060, 0.25, 3.5], [1745, 0.12, 2.2]],
};

/** Raised-cosine envelope: fade in over `fade`, hold, fade out over the last `fadeOut` (default `fade`) seconds. */
function envCos(t, len, fade, fadeOut = fade) {
  let g = 1;
  if (fade > 0 && t < fade) g = 0.5 - 0.5 * Math.cos(Math.PI * t / fade);
  if (fadeOut > 0 && t > len - fadeOut) { const u = (len - t) / fadeOut; g *= u <= 0 ? 0 : 0.5 - 0.5 * Math.cos(Math.PI * u); }
  return g;
}

function addBed(L, R, a, seg, bedVol) {
  const i0 = Math.max(0, Math.ceil((Math.max(a, seg.t0) - a) * SR));
  const i1 = Math.min(L.length, Math.floor((Math.min(seg.t0 + seg.len, a + L.length / SR) - a) * SR));
  if (i1 <= i0) return;
  for (const [ch, f0, f1, ph0] of [[L, seg.f0L, seg.f1L, seg.phaseL], [R, seg.f0R, seg.f1R, seg.phaseR]]) {
    const g = seg.glide > 0 ? seg.glide : 1;
    const fAt = g > 0 && seg.glide > 0 ? τ => f0 + (f1 - f0) * Math.min(τ / g, 1) : () => f0;
    const τ0 = Math.max(0, a - seg.t0);
    let phi = ph0 + 2 * Math.PI * freqIntegral(f0, f1, seg.glide, τ0);
    for (let i = i0; i < i1; i++) {
      const τ = (a + i / SR) - seg.t0;
      phi += 2 * Math.PI * fAt(τ) / SR;
      ch[i] += Math.sin(phi) * envCos(Math.min(τ, seg.len), seg.len, seg.fade, seg.fadeOut ?? seg.fade) * seg.gain * bedVol;
    }
  }
}

function addBell(L, R, a, at, kind, vol) {
  const g0 = kind === "beep" ? 0.12 : 0.42;
  for (const [f, amp, d] of BELL_PARTS[kind] || BELL_PARTS.start) {
    const i0 = Math.max(0, Math.round((at - a) * SR));
    const n = Math.min(L.length - i0, Math.ceil((d + 0.05) * SR));
    for (let i = 0; i < n; i++) {
      const t = i / SR;
      const s = Math.sin(2 * Math.PI * f * t) * Math.min(1, t / 0.012) * Math.exp(-3 * t / d) * amp * g0 * vol;
      L[i0 + i] += s; R[i0 + i] += s;
    }
  }
}

/** Soft humming tone (resonant tuning cue) from `start` for `len` seconds; phase follows absolute time, so chunks join seamlessly. */
function addHum(L, R, a, start, len, vol) {
  const i0 = Math.max(0, Math.round((start - a) * SR)), i1 = Math.min(L.length, Math.round((start + len - a) * SR));
  for (let i = i0; i < i1; i++) {
    const tAbs = a + i / SR, τ = tAbs - start;
    const env = envCos(τ, len, Math.min(0.8, len / 3));
    const s = (Math.sin(2 * Math.PI * 110 * tAbs) + 0.45 * Math.sin(2 * Math.PI * 220 * tAbs) + 0.2 * Math.sin(2 * Math.PI * 330 * tAbs)) * env * vol * 0.075;
    L[i] += s; R[i] += s;
  }
}
/** Breath cues of every paced-breathing hold overlapping [a, b): a hum on each exhale or a soft tick at each stage change. */
function addBreathCues(L, R, a, b, breath, vol) {
  for (const seg of breath || []) {
    if (seg.t1 <= a || seg.t0 >= b || !seg.tone) continue;
    const first = Math.max(0, Math.floor((a - seg.t0) / seg.period) - 1);
    for (let c = first; ; c++) {
      const cs = seg.t0 + c * seg.period;
      if (cs >= Math.min(b, seg.t1)) break;
      if (seg.tone === "hum") {
        const start = cs + seg.in + seg.hold, len = Math.min(seg.out, seg.t1 - start);
        if (len > 0.5 && start < b && start + len > a) addHum(L, R, a, start, len, vol);
      } else {
        let at = cs;
        for (const len of [seg.in, seg.hold, seg.out, seg.rest]) {
          if (len > 0 && at >= a && at < b && at < seg.t1 - 0.5) addBell(L, R, a, at, "beep", vol * 0.5);
          at += len;
        }
      }
    }
  }
}

function addClip(L, R, a, buf, at, vol) {
  const off = Math.max(0, Math.round((a - at) * SR)); // clip may have started before this chunk
  const i0 = Math.max(0, Math.round((at - a) * SR));
  const n = Math.min(buf.length - off, L.length - i0);
  for (let i = 0; i < n; i++) { const s = buf[off + i] * vol; L[i0 + i] += s; R[i0 + i] += s; }
}

/** Deterministic brown noise, one-pole lowpassed — a soft floor under the bed. */
function addAmbience(L, R, vol, seed) {
  let s = (seed >>> 0) || 1;
  const rnd = () => { s = (s + 0x6d2b79f5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  let bl = 0, br = 0, ll = 0, lr = 0;
  for (let i = 0; i < L.length; i++) {
    bl = (bl + (rnd() * 2 - 1) * 0.02) * 0.998;
    br = (br + (rnd() * 2 - 1) * 0.02) * 0.998;
    ll += (bl - ll) * 0.05;
    lr += (br - lr) * 0.05;
    L[i] += ll * vol * 6;
    R[i] += lr * vol * 6;
  }
}

/**
 * Render [a, b) seconds of the timeline into stereo samples. Pure and deterministic (given seed).
 * @param o { bedVol, bellVol, voiceVol, ambience, seed, breathCue (default: settings.breathGuide) }
 */
export function renderChunkSamples(tl, a, b, lang, o = {}) {
  const len = Math.max(1, Math.ceil((b - a) * SR));
  const L = new Float32Array(len), R = new Float32Array(len);
  const bedVol = o.bedVol ?? settings.bedVol, bellVol = o.bellVol ?? settings.bellVol;
  const voiceVol = (o.voiceVol ?? settings.voiceVol) * 0.8, amb = o.ambience ?? settings.ambience;
  for (const seg of tl.bed || []) if (seg.t0 < b && seg.t0 + seg.len > a) addBed(L, R, a, seg, bedVol);
  if (amb) addAmbience(L, R, amb, (o.seed ?? 1) + Math.floor(a));
  if (o.breathCue ?? settings.breathGuide !== false) addBreathCues(L, R, a, b, tl.breath, Math.max(0.3, bellVol));
  for (const e of tl.events) {
    if (e.t + e.dur < a || e.t >= b) continue;
    if (e.type === "bell") addBell(L, R, a, Math.max(a, e.t), e.kind, bellVol);
    else if (e.type === "clip") {
      const buf = e.key && settings.recordedVoice !== false && decoded.get(`${lang}/${e.key}`);
      if (buf) addClip(L, R, a, buf, Math.max(a, e.t), voiceVol);
    }
  }
  // 15 ms edge fades: no clicks at chunk boundaries
  const ef = Math.max(1, Math.floor(0.015 * SR));
  for (let i = 0; i < ef && i < len; i++) {
    const g = 0.5 - 0.5 * Math.cos(Math.PI * i / ef);
    L[i] *= g; R[i] *= g; L[len - 1 - i] *= g; R[len - 1 - i] *= g;
  }
  for (let i = 0; i < len; i++) {
    if (L[i] > 1) L[i] = 1; else if (L[i] < -1) L[i] = -1;
    if (R[i] > 1) R[i] = 1; else if (R[i] < -1) R[i] = -1;
  }
  return { L, R };
}

// ---------- WAV ----------
export function toWav({ L, R }) {
  const n = L.length;
  const out = new DataView(new ArrayBuffer(44 + n * 4));
  const w = (o, s) => [...s].forEach((c, i) => out.setUint8(o + i, c.charCodeAt(0)));
  w(0, "RIFF"); out.setUint32(4, 36 + n * 4, true); w(8, "WAVE"); w(12, "fmt ");
  out.setUint32(16, 16, true); out.setUint16(20, 1, true); out.setUint16(22, 2, true);
  out.setUint32(24, SR, true); out.setUint32(28, SR * 4, true); out.setUint16(32, 4, true); out.setUint16(34, 16, true);
  w(36, "data"); out.setUint32(40, n * 4, true);
  for (let i = 0; i < n; i++) {
    out.setInt16(44 + i * 4, Math.max(-1, Math.min(1, L[i])) * 32767, true);
    out.setInt16(46 + i * 4, Math.max(-1, Math.min(1, R[i])) * 32767, true);
  }
  return new Blob([out], { type: "audio/wav" });
}

// ---------- sleep: silence + wake bell ----------
const SILENT_SR = 8000;
/** Exact-length silence as a small mono 8 kHz WAV: keeps the audio stream alive while the sleeper waits for the bell. */
export function silenceWav(sec) {
  const n = Math.max(1, Math.round(sec * SILENT_SR));
  const out = new DataView(new ArrayBuffer(44 + n * 2));   // data bytes are already zero
  const w = (o, s) => [...s].forEach((c, i) => out.setUint8(o + i, c.charCodeAt(0)));
  w(0, "RIFF"); out.setUint32(4, 36 + n * 2, true); w(8, "WAVE"); w(12, "fmt ");
  out.setUint32(16, 16, true); out.setUint16(20, 1, true); out.setUint16(22, 1, true);
  out.setUint32(24, SILENT_SR, true); out.setUint32(28, SILENT_SR * 2, true); out.setUint16(32, 2, true); out.setUint16(34, 16, true);
  w(36, "data"); out.setUint32(40, n * 2, true);
  return new Blob([out], { type: "audio/wav" });
}
/** One minute of wake bell (looped by the player): soft bells every few seconds, rising from gentle to full, then the wake line if recorded. */
export function alarmSamples(lang, kind = "morning", o = {}) {
  const len = 60, L = new Float32Array(len * SR), R = new Float32Array(len * SR);
  const base = Math.max(0.6, o.bellVol ?? settings.bellVol ?? 0.8);
  for (let at = 0.5, i = 0; at < len - 4; at += 4.5, i++) addBell(L, R, 0, at, i % 3 === 2 ? "start" : "soft", base * (0.3 + 0.7 * Math.min(1, at / 30)));
  const line = content.common.lines?.[kind === "wbtb" ? "wakeWbtb" : "wake"];
  const key = line?.audio?.[lang];
  const buf = key && settings.recordedVoice !== false && decoded.get(`${lang}/${key}`);
  if (buf) addClip(L, R, 0, buf, 24, (o.voiceVol ?? settings.voiceVol ?? 1) * 0.9);
  for (let i = 0; i < L.length; i++) { if (L[i] > 1) L[i] = 1; else if (L[i] < -1) L[i] = -1; if (R[i] > 1) R[i] = 1; else if (R[i] < -1) R[i] = -1; }
  return { L, R, text: line ? line[lang] : "" };
}

/**
 * After a sleep session: keep the (silent) stream playing on the same <audio> element until `wakeAt`
 * (wall clock, re-checked at every chunk end), then ring the wake bell in a loop until stopped.
 * Events: "wait" (next silent piece started), "ring", "timeout" (nobody answered for 20 min).
 */
export class SleepWaiter extends EventTarget {
  constructor(wakeAt, lang, meta = {}) {
    super();
    this.wakeAt = wakeAt; this.lang = lang; this.meta = meta;
    this.a = mediaElement(); this.url = null; this.ringing = false; this.stopped = false; this.timer = 0;
  }
  start() {
    this.a.loop = false;
    this.a.onended = () => this.next();
    this.setupMediaSession();
    this.next();
  }
  swap(url, loop) {
    if (this.url) { try { URL.revokeObjectURL(this.url); } catch {} }
    this.url = url; this.a.loop = loop; this.a.src = url;
    playSafe(this.a);
  }
  next() {
    if (this.stopped || this.ringing) return;
    const rem = (this.wakeAt - Date.now()) / 1000;
    if (rem > 0.5) { this.swap(URL.createObjectURL(silenceWav(Math.min(rem, 600))), false); this.dispatchEvent(new Event("wait")); return; }
    this.ring();
  }
  ring() {
    if (this.stopped) return;
    this.ringing = true;
    const s = alarmSamples(this.lang, this.meta.kind);
    this.text = s.text;
    this.swap(URL.createObjectURL(toWav(s)), true);
    this.dispatchEvent(new Event("ring"));
    clearTimeout(this.timer);
    this.timer = setTimeout(() => { if (this.ringing && !this.stopped) { this.dispatchEvent(new Event("timeout")); } }, 20 * 60e3);
  }
  /** Stop ringing and wait again for `min` minutes. */
  snooze(min = 10) {
    clearTimeout(this.timer);
    this.ringing = false; this.a.loop = false;
    this.wakeAt = Date.now() + min * 60e3;
    this.next();
  }
  stop() {
    this.stopped = true; this.ringing = false; clearTimeout(this.timer);
    this.a.onended = null; this.a.loop = false; this.a.pause();
    if (this.url) { try { URL.revokeObjectURL(this.url); } catch {} this.url = null; }
  }
  setupMediaSession() {
    if (!("mediaSession" in navigator)) return;
    try { navigator.mediaSession.metadata = new MediaMetadata({ title: this.meta.title || "", artist: this.meta.artist || "", artwork: [{ src: "icons/icon-512.png", sizes: "512x512", type: "image/png" }] }); } catch {}
  }
}

// ---------- rendering plan ----------
function chunkPlan(tl) {
  const sounds = tl.events.map(e => [e.t, e.t + e.dur + 0.1]).sort((a, b) => a[0] - b[0]);
  const chunks = [];
  let start = 0;
  while (start < tl.duration) {
    let end = start + CHUNK;
    if (end >= tl.duration - 30) end = tl.duration;
    else for (const [a, b] of sounds) if (end > a && end < b) end = b + 0.05;
    chunks.push({ start, end: Math.min(end, tl.duration) });
    start = Math.min(end, tl.duration);
  }
  return chunks;
}

export function renderChunk(tl, ch, lang) {
  const { L, R } = renderChunkSamples(tl, ch.start, ch.end, lang);
  return URL.createObjectURL(toWav({ L, R }));
}

// ---------- player ----------
let el = null;
const SILENT = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=";
export function mediaElement() {
  if (!el) { el = new Audio(); el.preload = "auto"; el.setAttribute("playsinline", ""); document.body.appendChild(el); el.hidden = true; }
  return el;
}
/** play() that never throws and works even where it returns no promise (old webviews). */
export function playSafe(a) { try { const p = a.play(); if (p && p.catch) p.catch(() => {}); } catch {} return a; }
/** Call synchronously inside the tap that starts a session (unlocks playback on iOS/Android). */
export function unlockAudio() {
  const a = mediaElement();
  a.src = SILENT; a.loop = false;
  playSafe(a);
}

export class SessionPlayer extends EventTarget {
  constructor(tl, lang, meta) {
    super();
    this.tl = tl; this.lang = lang; this.meta = meta;
    this.chunks = chunkPlan(tl);
    this.urls = []; this.renders = [];
    this.i = 0; this.ended = false; this.stopped = false;
    this.a = mediaElement();
  }
  render(i) {
    if (i >= this.chunks.length) return Promise.resolve(null);
    return (this.renders[i] ||= Promise.resolve(renderChunk(this.tl, this.chunks[i], this.lang)).then(u => (this.urls[i] = u)));
  }
  async start() {
    this.a.loop = false;
    await this.load(0, 0);
    this.a.onended = () => this.advance();
    this.setupMediaSession();
    await playSafe(this.a);
    this.render(1);
  }
  async load(i, offset) {
    this.i = i;
    const url = await this.render(i);
    if (this.stopped) return;
    this.a.src = url;
    if (offset > 0) await new Promise(r => { this.a.onloadedmetadata = () => { this.a.currentTime = offset; r(); }; });
    // free chunks that are no longer needed
    this.urls.forEach((u, k) => { if (u && k < i - 1) { URL.revokeObjectURL(u); this.urls[k] = null; this.renders[k] = null; } });
  }
  async advance() {
    if (this.stopped) return;
    if (this.i + 1 >= this.chunks.length) { this.ended = true; this.dispatchEvent(new Event("end")); return; }
    await this.load(this.i + 1, 0);
    await playSafe(this.a);
    this.render(this.i + 1);
  }
  time() {
    if (this.ended) return this.tl.duration;
    return (this.chunks[this.i]?.start || 0) + (this.a.currentTime || 0);
  }
  get paused() { return this.a.paused && !this.ended; }
  pause() { this.a.pause(); this.dispatchEvent(new Event("state")); }
  resume() { playSafe(this.a); this.dispatchEvent(new Event("state")); }
  async seek(t) {
    t = Math.max(0, Math.min(t, this.tl.duration - 0.5));
    const i = this.chunks.findIndex(c => t >= c.start && t < c.end);
    const wasPaused = this.a.paused;
    if (i === this.i) this.a.currentTime = t - this.chunks[i].start;
    else await this.load(i, t - this.chunks[i].start);
    if (!wasPaused) await playSafe(this.a);
    this.render(i + 1);
  }
  stop() {
    this.stopped = true;
    this.a.onended = null;
    this.a.pause();
    this.a.removeAttribute("src"); this.a.load();
    this.urls.forEach(u => u && URL.revokeObjectURL(u));
    if ("mediaSession" in navigator) { try { navigator.mediaSession.metadata = null; ["play", "pause", "stop"].forEach(a => navigator.mediaSession.setActionHandler(a, null)); } catch {} }
  }
  setupMediaSession() {
    if (!("mediaSession" in navigator)) return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({ title: this.meta.title, artist: this.meta.artist, artwork: [{ src: "icons/icon-512.png", sizes: "512x512", type: "image/png" }] });
      navigator.mediaSession.setActionHandler("play", () => this.resume());
      navigator.mediaSession.setActionHandler("pause", () => this.pause());
      navigator.mediaSession.setActionHandler("stop", () => this.dispatchEvent(new Event("stoprequest")));
    } catch {}
  }
}

// ---------- PC track player ----------
// Next-part pre-buffering: a second hidden <audio preload="auto"> starts fetching the following
// file while the current one is still playing. On the next start() with that URL the element is
// adopted as the player (metadata and the first seconds are already there — no gap between parts).
// iOS only lets an element that was unlocked by a tap play, so there we keep the shared element
// and the warm fetch merely primes the browser cache.
const IOS = typeof navigator !== "undefined" && /iP(hone|ad|od)/.test(navigator.userAgent || "");
let warm = null;   // { url, el }
export function warmTrack(url) {
  if (!url || (warm && warm.url === url)) return;
  dropWarm();
  try {
    const a = new Audio();
    a.preload = "auto"; a.setAttribute("playsinline", ""); a.hidden = true; a.dataset.warm = "1";
    a.src = url;
    document.body.appendChild(a);
    warm = { url, el: a };
  } catch { warm = null; }
}
export function dropWarm() {
  if (!warm) return;
  try { warm.el.removeAttribute("src"); warm.el.load(); warm.el.remove(); } catch {}
  warm = null;
}
export const warmUrl = () => (warm ? warm.url : null);

/** Plays a recording served by tools/pc-server.py through the hidden <audio> element:
 *  the real Hemi-Sync track replaces the synthesised bed, voice and bells.
 *  opts.startAt (seconds) resumes a partly played file once its metadata is known. */
export class TrackPlayer extends EventTarget {
  constructor(url, meta, opts = {}) {
    super();
    this.url = url; this.meta = meta; this.opts = opts;
    this.a = mediaElement();
    this.adopted = false;
    this.ended = false; this.stopped = false;
    this.duration = 0; this.startedAt = 0;
  }
  async start() {
    if (warm && warm.url === this.url && !IOS) {           // adopt the pre-buffered element
      const shared = this.a;
      this.a = warm.el; this.adopted = true; warm = null;
      try { delete this.a.dataset.warm; } catch {}
      try { shared.pause(); shared.removeAttribute("src"); shared.load(); } catch {}
    } else {
      dropWarm();
      this.a.loop = false;
      this.a.src = this.url;
    }
    const a = this.a;
    await new Promise((res, rej) => {
      const timer = setTimeout(() => rej(new Error(t("pcTrackLoadFailed"))), 10000);
      const ready = () => {
        clearTimeout(timer);
        this.duration = Number.isFinite(a.duration) ? a.duration : 0;
        res();
      };
      a.onloadedmetadata = ready;
      a.onerror = () => { clearTimeout(timer); rej(new Error(t("pcTrackLoadFailed"))); };
      if (a.readyState >= 1) ready();                       // adopted element: metadata already loaded
    });
    const at = Number(this.opts.startAt) || 0;
    if (at > 0 && (!this.duration || at < this.duration - 5)) { try { a.currentTime = at; this.startedAt = at; } catch {} }
    else { try { a.currentTime = 0; } catch {} }
    a.onended = () => { this.ended = true; this.dispatchEvent(new Event("end")); };
    this.setupMediaSession();
    let p = null;
    try { p = a.play(); } catch { p = null; }
    if (p && p.catch) p.catch(err => { if (this.adopted && !this.stopped && err && err.name === "NotAllowedError") this.rescue(); });
  }
  /** The pre-buffered element was refused (no gesture — e.g. iPadOS with a desktop UA): continue on the unlocked shared element. */
  rescue() {
    const at = this.a.currentTime || this.startedAt || 0;
    try { this.a.pause(); this.a.removeAttribute("src"); this.a.load(); this.a.remove(); } catch {}
    this.a = mediaElement(); this.adopted = false;
    const a = this.a;
    a.loop = false; a.src = this.url;
    a.onloadedmetadata = () => { this.duration = Number.isFinite(a.duration) ? a.duration : 0; try { a.currentTime = at; } catch {} playSafe(a); };
    a.onerror = () => this.dispatchEvent(new Event("stoprequest"));
    a.onended = () => { this.ended = true; this.dispatchEvent(new Event("end")); };
  }
  time() { return this.ended ? this.duration : (this.a.currentTime || 0); }
  get paused() { return this.a.paused && !this.ended; }
  pause() { this.a.pause(); this.dispatchEvent(new Event("state")); }
  resume() { playSafe(this.a); this.dispatchEvent(new Event("state")); }
  seek(sec) { try { this.a.currentTime = Math.max(0, Math.min(sec, (this.duration || sec) - 0.5)); } catch {} this.dispatchEvent(new Event("state")); }
  /** Back to the beginning (after a resume the listener may prefer the whole exercise). */
  restart() { this.startedAt = 0; this.seek(0); }
  stop() {
    this.stopped = true;
    this.a.onended = null; this.a.onerror = null; this.a.onloadedmetadata = null;
    this.a.pause();
    this.a.removeAttribute("src"); this.a.load();
    if (this.adopted) { try { this.a.remove(); } catch {} }
    if ("mediaSession" in navigator) { try { navigator.mediaSession.metadata = null; ["play", "pause", "stop"].forEach(a => navigator.mediaSession.setActionHandler(a, null)); } catch {} }
  }
  setupMediaSession() {
    if (!("mediaSession" in navigator)) return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({ title: this.meta.title, artist: this.meta.artist, artwork: [{ src: "icons/icon-512.png", sizes: "512x512", type: "image/png" }] });
      navigator.mediaSession.setActionHandler("play", () => this.resume());
      navigator.mediaSession.setActionHandler("pause", () => this.pause());
      navigator.mediaSession.setActionHandler("stop", () => this.dispatchEvent(new Event("stoprequest")));
    } catch {}
  }
}

/** Short binaural test: the bed glides from an alpha/theta beat down to a theta beat, with a soft bell. */
export async function playTest(lang) {
  const tl = {
    duration: 14,
    events: [{ t: 0.2, type: "bell", kind: "soft", dur: 3 }],
    bed: [{
      t0: 0, len: 14.5, glide: 11, fade: 2, gain: content.bedDefaultGain ?? 0.14,
      f0L: 180, f1L: 170, f0R: 188, f1R: 174.5, phaseL: 0, phaseR: 0,
    }],
  };
  const url = renderChunk(tl, { start: 0, end: tl.duration }, lang);
  const a = mediaElement(); a.loop = false; a.onended = () => URL.revokeObjectURL(url); a.src = url; await playSafe(a);
  try {
    if (window.speechSynthesis) {
      const u = new SpeechSynthesisUtterance(lang === "tr"
        ? "Test sesi. Zihnin uyanık, bedenin uykuda. Kulaklığın takılı olduğundan emin ol."
        : "Test sound. Mind awake, body asleep. Make sure your headphones are on.");
      u.lang = lang === "tr" ? "tr-TR" : "en-US";
      u.rate = 0.9;
      speechSynthesis.speak(u);
    }
  } catch {}
}
