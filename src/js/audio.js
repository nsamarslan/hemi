// Audio: loads recorded clips, renders a session timeline into WAV chunks and plays them through one
// <audio> element so playback continues with the screen locked (OS media playback), with lock-screen controls.
import { content, packFor, clipInfo } from "./content.js";
import { settings } from "./store.js";

export const SR = 22050;
const CHUNK = 300; // seconds per rendered chunk (split inside silences)

// ---------- clip loading ----------
const decoded = new Map();     // `${lang}/${key}` → AudioBuffer
const packLoads = new Map();   // `${lang}/${pack}` → Promise
let decoder = null;
const getDecoder = () => (decoder ||= new OfflineAudioContext(1, 1, SR));

export function loadPack(lang, pack) {
  const id = `${lang}/${pack}`;
  if (packLoads.has(id)) return packLoads.get(id);
  const p = packFor(lang, pack);
  if (!p) return Promise.resolve();
  const pr = fetch(p.file).then(r => { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); }).then(async buf => {
    await Promise.all(Object.entries(p.clips).map(async ([key, [off, len]]) => {
      if (decoded.has(`${lang}/${key}`)) return;
      try { decoded.set(`${lang}/${key}`, await getDecoder().decodeAudioData(buf.slice(off, off + len))); } catch {}
    }));
  }).catch(() => { packLoads.delete(id); });
  packLoads.set(id, pr);
  return pr;
}
export const loadPacks = (lang, packs) => Promise.all([...new Set(packs)].map(p => loadPack(lang, p)));

/** Duration lookup used by the timeline builder. */
export function clipDur(lang) {
  return (key, text) => {
    const b = key && decoded.get(`${lang}/${key}`);
    if (b) return { sec: b.duration, missing: false };
    const info = key && clipInfo(lang, key);
    if (info) return { sec: info.dur, missing: false };
    return { sec: Math.max(1.2, (text || "").length / 13 + 0.4), missing: true };
  };
}

// ---------- bells (synthesised) ----------
function addBell(ctx, dest, at, kind) {
  const parts = kind === "beep" ? [[880, 0.25, 0.35]]
    : kind === "soft" ? [[392, 0.6, 2.6], [1056, 0.22, 1.6], [1740, 0.08, 0.9]]
    : [[196, 1, 7], [541, 0.5, 5], [1060, 0.25, 3.5], [1745, 0.12, 2.2]];
  const g0 = ctx.createGain(); g0.gain.value = kind === "beep" ? 0.12 : 0.42; g0.connect(dest);
  for (const [f, a, d] of parts) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = "sine"; o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(a, at + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, at + d);
    o.connect(g); g.connect(g0); o.start(at); o.stop(at + d + 0.05);
  }
}

// ---------- rendering ----------
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

async function renderChunk(tl, ch, lang) {
  const len = Math.max(1, Math.ceil((ch.end - ch.start) * SR));
  const ctx = new OfflineAudioContext(1, len, SR);
  const voice = ctx.createGain(); voice.gain.value = settings.voiceVol; voice.connect(ctx.destination);
  const bells = ctx.createGain(); bells.gain.value = settings.bellVol; bells.connect(ctx.destination);
  for (const e of tl.events) {
    if (e.t + e.dur < ch.start || e.t >= ch.end) continue;
    const at = e.t - ch.start;
    if (e.type === "bell") addBell(ctx, bells, Math.max(0, at), e.kind);
    else {
      const buf = e.key && decoded.get(`${lang}/${e.key}`);
      if (!buf) continue;
      const s = ctx.createBufferSource(); s.buffer = buf; s.connect(voice);
      if (at >= 0) s.start(at); else s.start(0, -at);
    }
  }
  return toWav(await ctx.startRendering());
}

function toWav(buf) {
  const x = buf.getChannelData(0), n = x.length;
  const out = new DataView(new ArrayBuffer(44 + n * 2));
  const w = (o, s) => [...s].forEach((c, i) => out.setUint8(o + i, c.charCodeAt(0)));
  w(0, "RIFF"); out.setUint32(4, 36 + n * 2, true); w(8, "WAVE"); w(12, "fmt ");
  out.setUint32(16, 16, true); out.setUint16(20, 1, true); out.setUint16(22, 1, true);
  out.setUint32(24, SR, true); out.setUint32(28, SR * 2, true); out.setUint16(32, 2, true); out.setUint16(34, 16, true);
  w(36, "data"); out.setUint32(40, n * 2, true);
  for (let i = 0; i < n; i++) out.setInt16(44 + i * 2, Math.max(-1, Math.min(1, x[i])) * 32767, true);
  return URL.createObjectURL(new Blob([out], { type: "audio/wav" }));
}

// ---------- player ----------
let el = null;
const SILENT = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=";
export function mediaElement() {
  if (!el) { el = new Audio(); el.preload = "auto"; el.setAttribute("playsinline", ""); document.body.appendChild(el); el.hidden = true; }
  return el;
}
/** Call synchronously inside the tap that starts a session (unlocks playback on iOS/Android). */
export function unlockAudio() {
  const a = mediaElement();
  a.src = SILENT; a.loop = false;
  a.play().catch(() => {});
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
    return (this.renders[i] ||= renderChunk(this.tl, this.chunks[i], this.lang).then(u => (this.urls[i] = u)));
  }
  async start() {
    this.a.loop = false;
    await this.load(0, 0);
    this.a.onended = () => this.advance();
    this.setupMediaSession();
    await this.a.play();
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
    await this.a.play().catch(() => {});
    this.render(this.i + 1);
  }
  time() {
    if (this.ended) return this.tl.duration;
    return (this.chunks[this.i]?.start || 0) + (this.a.currentTime || 0);
  }
  get paused() { return this.a.paused && !this.ended; }
  pause() { this.a.pause(); this.dispatchEvent(new Event("state")); }
  resume() { this.a.play().catch(() => {}); this.dispatchEvent(new Event("state")); }
  async seek(t) {
    t = Math.max(0, Math.min(t, this.tl.duration - 0.5));
    const i = this.chunks.findIndex(c => t >= c.start && t < c.end);
    const wasPaused = this.a.paused;
    if (i === this.i) this.a.currentTime = t - this.chunks[i].start;
    else await this.load(i, t - this.chunks[i].start);
    if (!wasPaused) await this.a.play().catch(() => {});
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

/** Looping reminder track: chime + spoken cue, then silence until the next interval. */
export async function startReminderLoop(lang, minutes, cue) {
  if (cue?.audio?.[lang]) await loadPack(lang, "common");
  const len = minutes * 60;
  const d = clipDur(lang)(cue?.audio?.[lang], cue?.[lang]).sec;
  const tl = { duration: len, events: [{ t: 0.2, type: "bell", kind: "soft", dur: 3 }, { t: 1.6, type: "clip", key: cue?.audio?.[lang], dur: d }] };
  const url = await renderChunk(tl, { start: 0, end: len }, lang);
  const a = mediaElement();
  a.onended = null; a.src = url; a.loop = true;
  await a.play();
  return { stop() { a.pause(); a.loop = false; a.removeAttribute("src"); a.load(); URL.revokeObjectURL(url); }, element: a };
}

/** Short test: bell then a sentence. */
export async function playTest(lang) {
  await loadPack(lang, "common");
  const c = content.common.lines.done;
  const key = c.audio?.[lang];
  const d = clipDur(lang)(key, c[lang]).sec;
  const tl = { duration: 3 + d + 1, events: [{ t: 0.1, type: "bell", kind: "start", dur: 7 }, { t: 2.5, type: "clip", key, dur: d }] };
  const url = await renderChunk(tl, { start: 0, end: tl.duration }, lang);
  const a = mediaElement(); a.loop = false; a.onended = () => URL.revokeObjectURL(url); a.src = url; await a.play();
}
