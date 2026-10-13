// Full-screen guided session: builds the timeline, renders audio, plays it and keeps the screen in sync.
import { t, L, fmtClock } from "./i18n.js";
import { settings, logSession } from "./store.js";
import { content } from "./content.js";
import { loadPacks, clipDur, SessionPlayer, unlockAudio } from "./audio.js";
import { keepAwake, sessionService } from "./native.js";
import { renderVisual } from "./visuals.js";

const $ = id => document.getElementById(id);
let active = null;

/**
 * @param spec { title, packs: [pack], night, build(dur) → timeline, onFinish({completed, sec}) }
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
      <div class="s-top"><div class="s-title"></div><div class="s-phase" aria-live="polite"></div></div>
      <div class="s-stage"><div class="s-visual"></div>
        <div class="s-dial"><svg viewBox="0 0 100 100" aria-hidden="true"><circle class="track" cx="50" cy="50" r="46"/><circle class="bar" cx="50" cy="50" r="46" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000"/></svg>
        <div class="s-center"><div class="s-time">·</div><div class="s-sub"></div></div></div></div>
      <p class="s-say"></p>
      <p class="s-next"></p>
      <div class="s-controls">
        <button class="btn" data-a="pause">${t("pause")}</button>
        <button class="btn" data-a="skip">${t("nextPhase")}</button>
        <button class="btn" data-a="stop">${t("stop")}</button>
      </div>
      <div class="s-confirm" hidden><span>${t("confirmStop")}</span>
        <button class="btn" data-a="no">${t("keepGoing")}</button><button class="btn primary" data-a="yes">${t("stop")}</button></div>
      <p class="s-hint">${t("lockHint")}</p>`;
    r.querySelector(".s-title").textContent = this.spec.title;
    r.querySelector(".s-say").textContent = t("preparing");
    r.onclick = e => { const a = e.target.closest("[data-a]")?.dataset.a; if (a) this.action(a); };
    try {
      await loadPacks(this.lang, ["common", ...this.spec.packs]);
      this.tl = this.spec.build(clipDur(this.lang));
      this.player = new SessionPlayer(this.tl, this.lang, { title: this.spec.title, artist: t("appName") });
      this.player.addEventListener("end", () => this.finish(true));
      this.player.addEventListener("stoprequest", () => this.finish(false));
      this.player.addEventListener("state", () => this.paint());
      await this.player.start();
    } catch (e) {
      r.querySelector(".s-say").textContent = String(e && e.message || e);
      return;
    }
    if (settings.keepAwake && !this.spec.night) keepAwake(true);
    sessionService(true, this.spec.title);
    this.timer = setInterval(() => this.paint(), 250);
    this.onVis = () => { if (document.visibilityState === "visible" && settings.keepAwake && !this.spec.night) keepAwake(true); };
    document.addEventListener("visibilitychange", this.onVis);
    this.paint();
  }
  action(a) {
    const r = this.root;
    if (!this.player) { if (a === "stop" || a === "yes") this.finish(false); return; }
    if (a === "pause") { this.player.paused ? this.player.resume() : this.player.pause(); }
    if (a === "skip") {
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
    const r = this.root, now = this.player.time(), tl = this.tl;
    const ph = [...tl.phases].reverse().find(p => now >= p.start) || tl.phases[0];
    if (ph && ph !== this.lastPhase) {
      this.lastPhase = ph;
      const name = L(ph.name) + (ph.iters > 1 ? ` · ${ph.iter + 1}/${ph.iters}` : "");
      r.querySelector(".s-phase").textContent = name;
      const nxt = tl.phases[tl.phases.indexOf(ph) + 1];
      r.querySelector(".s-next").textContent = nxt ? t("next", { n: L(nxt.name) }) : "";
      const vis = ph.visual || null;
      const key = vis ? vis.id + "/" + (vis.state || "") : "";
      if (key !== this.lastVisualKey) {
        this.lastVisualKey = key;
        const box = r.querySelector(".s-visual");
        r.querySelector(".s-stage").classList.toggle("has-visual", !!vis);
        if (vis) renderVisual(vis.id, vis.state, this.lang).then(svg => { if (this.lastVisualKey === key) box.innerHTML = svg; });
        else box.innerHTML = "";
      }
    }
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
  speakLive(e) {
    this.spoken.add(e);
    try {
      if (!window.speechSynthesis || document.visibilityState !== "visible") return;
      const u = new SpeechSynthesisUtterance(e.text);
      u.lang = this.lang === "tr" ? "tr-TR" : "en-US";
      u.rate = 0.9;
      speechSynthesis.speak(u);
    } catch {}
  }
  stop() {
    clearInterval(this.timer);
    this.player?.stop();
    document.removeEventListener("visibilitychange", this.onVis);
    keepAwake(false);
    sessionService(false);
  }
  finish(completed) {
    if (this.done) return;
    this.done = true;
    const sec = this.player ? Math.min(this.player.time(), this.tl.duration) : 0;
    this.stop();
    active = null;
    this.root.hidden = true;
    this.root.innerHTML = "";
    document.body.classList.remove("in-session");
    document.documentElement.classList.remove("night-mode");
    if (this.spec.log) { if (this.tl) this.spec.log(this.tl, sec); }
    else if (sec >= 20) logSession({ id: this.spec.logId, sec: Math.round(sec), completed });
    this.spec.onFinish({ completed, sec });
  }
}
