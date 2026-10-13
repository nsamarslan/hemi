// Full-screen guided session: builds the timeline, renders audio, plays it and keeps the screen in sync.
import { t, L, fmtClock } from "./i18n.js";
import { settings, logSession } from "./store.js";
import { speak } from "./tts.js";
import { content, focusById } from "./content.js";
import { loadPacks, clipDur, SessionPlayer, TrackPlayer, SleepWaiter, unlockAudio, warmTrack } from "./audio.js";
import { keepAwake, sessionService, onServiceStop, scheduleWake, cancelWake, isNative } from "./native.js";
import { renderVisual } from "./visuals.js";
import { breathAt } from "./timeline.js";

const $ = id => document.getElementById(id);
let active = null;
// Android: the session notification's button ends the running session ("End") or the sleep wait ("Cancel the bell").
onServiceStop(() => { if (active) { if (active.waiter) active.finish(true, { woke: false }); else active.finish(false); } });

/**
 * @param spec { title, packs: [pack], night, sleep: { wakeAt (ms), kind: "wbtb" | "morning" } | null,
 *               build(dur) → timeline, onFinish({completed, sec, woke, kind}), logId }
 * Must be called synchronously from a tap (unlocks audio playback).
 */
export function runSession(spec) {
  unlockAudio();
  if (active) active.stop();
  const s = new Session(spec);
  active = s;
  s.begin();
  return s;
}

class Session {
  constructor(spec) {
    this.spec = spec;
    this.lang = settings.lang;
    this.root = $("session");
    this.lastPhase = null;
    this.lastVisualKey = null;
    this.spoken = new Set();
  }
  async begin() {
    const r = this.root;
    r.classList.toggle("night", !!this.spec.night);
    document.documentElement.classList.toggle("night-mode", !!this.spec.night);
    r.hidden = false;
    document.body.classList.add("in-session");
    r.innerHTML = `
      <div class="s-top"><div class="s-title"></div><div class="s-phase" aria-live="polite"></div><div class="s-focus"></div></div>
      <div class="s-stage"><div class="s-visual"></div>
        <div class="s-breath" hidden><div class="s-breath-ring"></div><div class="s-breath-label"></div></div>
        <div class="s-dial"><svg viewBox="0 0 100 100" aria-hidden="true"><circle class="track" cx="50" cy="50" r="46"/><circle class="bar" cx="50" cy="50" r="46" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000"/></svg>
        <div class="s-center"><div class="s-time">·</div><div class="s-sub"></div></div></div></div>
      <p class="s-say"></p>
      <p class="s-next"></p>
      <div class="s-controls">
        <button class="btn" data-a="pause">${t("pause")}</button>
        <button class="btn" data-a="skip">${t("nextPhase")}</button>
        <button class="btn" data-a="restart" hidden>${t("trackRestart")}</button>
        <button class="btn" data-a="stop">${t("stop")}</button>
      </div>
      <div class="s-confirm" hidden><span>${t("confirmStop")}</span>
        <button class="btn" data-a="no">${t("keepGoing")}</button><button class="btn primary" data-a="yes">${t("stop")}</button></div>
      <p class="s-hint">${t("lockHint")}</p>`;
    r.querySelector(".s-title").textContent = this.spec.title;
    r.querySelector(".s-say").textContent = t("preparing");
    r.onclick = e => { const a = e.target.closest("[data-a]")?.dataset.a; if (a) this.action(a); };
    try {
      this.tl = this.spec.build(clipDur(this.lang));
      if (this.spec.track) {
        // PC source: the real recording plays; the app only keeps time, phases and the journal.
        const resumeAt = Number(this.spec.track.resumeAt) || 0;
        this.player = new TrackPlayer(this.spec.track.url, { title: this.spec.title, artist: this.spec.track.title || t("appName") }, { startAt: resumeAt });
        r.querySelector('[data-a="skip"]').hidden = true;
        r.querySelector('[data-a="restart"]').hidden = !resumeAt;
        this.sayText = resumeAt ? t("trackResumed", { t: fmtClock(resumeAt) }) : t("trackModeHint");
        r.querySelector(".s-say").textContent = this.sayText;
        r.querySelector(".s-next").textContent = this.spec.track.path || "";
      } else {
        await loadPacks(this.lang, ["common", ...this.spec.packs]);
        this.player = new SessionPlayer(this.tl, this.lang, { title: this.spec.title, artist: t("appName") });
      }
      this.player.addEventListener("end", () => this.onEnd());
      this.player.addEventListener("stoprequest", () => this.finish(false));
      this.player.addEventListener("state", () => this.paint());
      await this.player.start();
    } catch (e) {
      r.querySelector(".s-say").textContent = String(e && e.message || e);
      return;
    }
    if (settings.keepAwake && !this.spec.night) keepAwake(true);
    sessionService(true, { title: this.spec.title, body: t("appName"), stopLabel: t("stop") });
    this.timer = setInterval(() => this.paint(), 250);
    const frame = () => { if (this.done) return; this.paintBreath(); this.raf = requestAnimationFrame(frame); };
    if (typeof requestAnimationFrame === "function") this.raf = requestAnimationFrame(frame);
    this.onVis = () => { if (document.visibilityState === "visible" && settings.keepAwake && !this.spec.night) keepAwake(true); };
    document.addEventListener("visibilitychange", this.onVis);
    this.paint();
  }
  /** The guided audio has ended: either finish, or (sleep sessions with a wake bell) keep the stream alive until the bell. */
  onEnd() {
    if (this.done || this.waiter) return;
    if (this.spec.sleep?.wakeAt) return this.enterSleepWait();
    this.finish(true);
  }
  enterSleepWait() {
    const r = this.root;
    this.sessionSec = this.tl?.duration || 0;          // what gets logged: the guided part, not the hours of sleep
    r.classList.add("sleeping");
    r.querySelector(".s-stage").hidden = true;
    r.querySelector(".s-focus").hidden = true;
    r.querySelector(".s-say").textContent = "";
    r.querySelector(".s-next").textContent = "";
    r.querySelector(".s-controls").hidden = true;
    r.querySelector(".s-confirm").hidden = true;
    const box = document.createElement("div");
    box.className = "s-sleep";
    box.innerHTML = `<div class="s-clock">··:··</div><div class="s-bell"></div><p class="s-wake-line"></p>
      <div class="s-controls"><button class="btn" data-a="snooze" hidden>${t("snooze")}</button><button class="btn primary" data-a="woke" hidden>${t("woke")}</button><button class="btn" data-a="cancelBell">${t("cancelBell")}</button></div>`;
    r.querySelector(".s-hint").before(box);
    r.querySelector(".s-hint").textContent = t("sleepHint");
    this.waiter = new SleepWaiter(this.spec.sleep.wakeAt, this.lang, { title: this.spec.title, artist: t("sleepWaiting", { time: clock(this.spec.sleep.wakeAt, this.lang) }), kind: this.spec.sleep.kind });
    this.waiter.addEventListener("ring", () => { this.paintSleep(); try { navigator.vibrate?.([600, 400, 600, 400, 600]); } catch {} });
    this.waiter.addEventListener("timeout", () => this.finish(true, { woke: false }));
    this.waiter.start();
    // Android: a real alarm at the same moment backs up the in-app bell (survives the system killing the web view)
    this.armWake();
    sessionService(true, { title: this.spec.title, body: t("sleepWaiting", { time: clock(this.spec.sleep.wakeAt, this.lang) }), stopLabel: t("cancelBell") });
    this.paintSleep();
  }
  armWake() {
    if (!isNative || !this.waiter) return;
    scheduleWake(this.waiter.wakeAt, { title: t("wakeNow"), body: this.spec.title });
  }
  paintSleep() {
    const r = this.root, w = this.waiter;
    if (!w || this.done) return;
    r.classList.toggle("ringing", w.ringing);
    r.querySelector(".s-clock").textContent = clock(Date.now(), this.lang);
    r.querySelector(".s-phase").textContent = w.ringing ? t("wakeNow") : t("sleepPhase");
    r.querySelector(".s-bell").textContent = w.ringing ? t("bellRinging") : t("bellAt", { time: clock(w.wakeAt, this.lang) });
    r.querySelector(".s-wake-line").textContent = w.ringing ? (w.text || "") : "";
    r.querySelector('[data-a="woke"]').hidden = !w.ringing;
    r.querySelector('[data-a="snooze"]').hidden = !w.ringing;
    r.querySelector('[data-a="cancelBell"]').hidden = w.ringing;
  }
  action(a) {
    const r = this.root;
    if (this.waiter) {
      if (a === "woke") return this.finish(true, { woke: true });
      if (a === "snooze") { this.waiter.snooze(10); this.armWake(); return this.paintSleep(); }
      if (a === "cancelBell") return this.finish(true, { woke: false });
      return;
    }
    if (!this.player) { if (a === "stop" || a === "yes") this.finish(false); return; }
    if (a === "pause") { this.player.paused ? this.player.resume() : this.player.pause(); }
    if (a === "restart" && this.spec.track) {
      this.player.restart?.();
      r.querySelector('[data-a="restart"]').hidden = true;
      this.sayText = t("trackModeHint"); r.querySelector(".s-say").textContent = this.sayText;
    }
    if (a === "skip" && !this.spec.track) {
      const now = this.player.time();
      const next = this.tl.phases.find(p => p.start > now + 0.5);
      this.player.seek(next ? next.start : this.tl.duration - 1);
    }
    if (a === "stop") { r.querySelector(".s-controls").hidden = true; r.querySelector(".s-confirm").hidden = false; }
    if (a === "no") { r.querySelector(".s-controls").hidden = false; r.querySelector(".s-confirm").hidden = true; }
    if (a === "yes") this.finish(false);
    this.paint();
  }
  paint() {
    if (!this.player || this.done) return;
    if (this.waiter) return this.paintSleep();
    const r = this.root, now = this.player.time(), tl = this.tl;
    const ph = [...tl.phases].reverse().find(p => now >= p.start) || tl.phases[0];
    if (ph && ph !== this.lastPhase) {
      this.lastPhase = ph;
      const name = L(ph.name) + (ph.iters > 1 ? ` · ${ph.iter + 1}/${ph.iters}` : "");
      r.querySelector(".s-phase").textContent = name;
      if (!this.spec.track) {
        const nxt = tl.phases[tl.phases.indexOf(ph) + 1];
        r.querySelector(".s-next").textContent = nxt ? t("next", { n: L(nxt.name) }) : "";
      }
      // focus readout: current level + binaural beat frequency (or the PC source label)
      const focusEl = r.querySelector(".s-focus");
      if (this.spec.track) {
        focusEl.textContent = t("trackFrom");
        focusEl.hidden = false;
      } else if (ph.bed?.focus) {
        const fl = focusById(ph.bed.focus);
        const beat = ph.bed.beat.toLocaleString(this.lang === "tr" ? "tr-TR" : "en-US", { maximumFractionDigits: 1 });
        focusEl.textContent = `${t("focusLevel", { n: ph.bed.focus })} · ${t("beatHz", { b: beat })}`;
        focusEl.hidden = false;
      } else focusEl.hidden = true;
      const vis = ph.visual || null;
      const key = vis ? vis.id + "/" + (vis.state || "") : (ph.bed?.focus ? "gateway/focus" + ph.bed.focus : "gateway/explore");
      if (key !== this.lastVisualKey) {
        this.lastVisualKey = key;
        const box = r.querySelector(".s-visual");
        const state = vis ? vis.state : (ph.bed?.focus ? "focus" + ph.bed.focus : "explore");
        r.querySelector(".s-stage").classList.toggle("has-visual", true);
        renderVisual(settings.visualPack || "gateway", state, this.lang).then(svg => { if (this.lastVisualKey === key) box.innerHTML = svg; });
      }
    }
    if (this.spec.track) {
      // real recording: no spoken lines; the dial shows the real remaining time
      const dur = this.player.duration || tl.duration;
      const rem = Math.max(0, dur - now);
      const sayEl = r.querySelector(".s-say");
      if (sayEl.textContent !== this.sayText) sayEl.textContent = this.sayText;
      // remember the position every ten seconds (resume later, on any device) and pre-buffer the next part near the end
      const track = this.spec.track;
      if (track.onPosition && now - (this.lastPosAt || 0) >= 10) { this.lastPosAt = now; try { track.onPosition(now, this.player.duration || 0, false); } catch {} }
      if (track.next && !this.warmed && this.player.duration && rem <= 45) { this.warmed = true; warmTrack(track.next.url); }
      const time = r.querySelector(".s-time"), bar = r.querySelector(".bar");
      r.querySelector(".s-dial").classList.remove("guiding");
      time.textContent = fmtClock(rem);
      bar.style.strokeDashoffset = String(1000 * rem / Math.max(dur, 1));
      r.querySelector(".s-sub").textContent = this.player.paused ? t("paused") : `${t("trackFrom")} · ${fmtClock(now)} / ${fmtClock(dur)}`;
      r.querySelector('[data-a="pause"]').textContent = this.player.paused ? t("resume") : t("pause");
      return;
    }
    this.paintBreath(now);
    // current spoken text: the latest clip that has started
    let said = null;
    for (const e of tl.events) { if (e.t > now) break; if (e.type === "clip" && (!ph || e.t >= ph.start - 0.05)) said = e; }
    const sayEl = r.querySelector(".s-say");
    const txt = said ? said.text : "";
    if (sayEl.textContent !== txt) sayEl.textContent = txt;
    if (said && said.missing && !this.spoken.has(said) && now - said.t < 2 && !this.player.paused) this.speakLive(said);
    // dial: hold countdown, otherwise quiet
    const time = r.querySelector(".s-time"), bar = r.querySelector(".bar");
    const inHold = ph && ph.holdStart != null && now >= ph.holdStart && now < ph.holdEnd;
    r.querySelector(".s-dial").classList.toggle("guiding", !inHold);
    if (inHold) {
      const rem = ph.holdEnd - now;
      time.textContent = fmtClock(rem);
      bar.style.strokeDashoffset = String(1000 * rem / (ph.holdEnd - ph.holdStart));
    } else {
      time.textContent = "";
      bar.style.strokeDashoffset = "1000";
    }
    r.querySelector(".s-sub").textContent = this.player.paused ? t("paused") : t("remainingTotal", { d: fmtClock(tl.duration - now) });
    r.querySelector('[data-a="pause"]').textContent = this.player.paused ? t("resume") : t("pause");
  }
  /** Breath ring + label during paced-breathing holds (from the same timeline as the audio cue). */
  paintBreath(now = null) {
    if (!this.player || this.done || this.spec.track || !this.tl) return;
    const box = this.root.querySelector(".s-breath");
    if (!box) return;
    const b = settings.breathGuide !== false ? breathAt(this.tl, now ?? this.player.time()) : null;
    if (!b) { if (!box.hidden) { box.hidden = true; this.breathStage = null; } return; }
    box.hidden = false;
    const reduce = document.documentElement.dataset.motion === "reduce" || (document.documentElement.dataset.motion !== "full" && typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches);
    const ring = box.querySelector(".s-breath-ring");
    if (reduce) { ring.style.transform = ""; ring.style.opacity = String(0.3 + 0.7 * b.level); }
    else { ring.style.opacity = ""; ring.style.transform = `scale(${(0.55 + 0.45 * b.level).toFixed(3)})`; }
    const key = b.stage + ":" + Math.ceil(b.left);
    if (key !== this.breathStage) {
      this.breathStage = key;
      box.querySelector(".s-breath-label").textContent = `${t({ in: "breathIn", hold: "breathHold", out: "breathOut", rest: "breathRest" }[b.stage])} · ${Math.max(1, Math.ceil(b.left))}`;
      box.dataset.stage = b.stage;
    }
  }
  speakLive(e) {
    this.spoken.add(e);
    try {
      if (!isNative && document.visibilityState !== "visible") return;   // browsers mute/queue speech in background tabs; the Android engine keeps going
      speak(e.text, this.lang);
    } catch {}
  }
  stop() {
    clearInterval(this.timer);
    if (this.raf && typeof cancelAnimationFrame === "function") cancelAnimationFrame(this.raf);
    this.waiter?.stop();
    this.player?.stop();
    document.removeEventListener("visibilitychange", this.onVis);
    keepAwake(false);
    sessionService(false);
    if (this.waiter) cancelWake();
  }
  finish(completed, extra = {}) {
    if (this.done) return;
    this.done = true;
    const cap = this.spec.track ? (this.player?.duration || this.tl?.duration || 0) : (this.tl?.duration || 0);   // no tl when build() failed
    const sec = this.waiter ? this.sessionSec : (this.player ? Math.min(this.player.time(), cap) : 0);
    if (this.spec.track?.onPosition && this.player) { try { this.spec.track.onPosition(sec, this.player.duration || 0, completed); } catch {} }
    this.stop();
    active = null;
    this.root.hidden = true;
    this.root.innerHTML = "";
    document.body.classList.remove("in-session");
    document.documentElement.classList.remove("night-mode");
    if (this.spec.log) { if (this.tl) this.spec.log(this.tl, sec); }
    else if (sec >= 20) logSession({ id: this.spec.logId, sec: Math.round(sec), completed });
    this.spec.onFinish({ completed, sec, night: !!this.spec.night, kind: this.spec.sleep?.kind || null, ...extra });
  }
}
const clock = (ms, lang) => new Date(ms).toLocaleTimeString(lang === "tr" ? "tr-TR" : "en-GB", { hour: "2-digit", minute: "2-digit" });
