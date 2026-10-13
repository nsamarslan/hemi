import { t, L, fmtDur, fmtClock } from "./i18n.js";
import { settings, saveSettings, store, paramsFor, saveParams, getLog, dayKey, streak, favorites, journal, logSession } from "./store.js";
import { content, sections, getEx, allIds, routineDefault } from "./content.js";
import { buildTimeline, buildRoutine, expandPhases, holdSeconds } from "./timeline.js";
import { clipDur, loadPacks, playTest, startReminderLoop, unlockAudio } from "./audio.js";
import { runSession } from "./session.js";
import { renderVisual } from "./visuals.js";
import { moonPhase, moonSvg } from "./moon.js";
import { isNative, scheduleEyeReminders, cancelEyeReminders, scheduleMorning } from "./native.js";

const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const view = $("view");
let tab = store.get("tab", "home");
let current = null;     // exercise in detail view
let searchQ = "";

// ---------- helpers ----------
const practicedCount = id => getLog().filter(x => x.id === id).length;
const estimateFor = (ex, params, mode) => buildTimeline(ex, params, timelineOpts(mode)).duration;
function timelineOpts(mode, extra = {}) {
  return Object.assign({ lang: settings.lang, mode: mode || "partner", pauseScale: settings.pauseScale, remindEvery: settings.remind, nightBeep: settings.nightBeep, dur: clipDur(settings.lang), seed: Date.now() % 100000, ending: "done" }, extra);
}
const modeFor = ex => store.get("mode." + ex.id, "mirror");
function toast(msg) {
  const el = document.createElement("div"); el.className = "toast"; el.textContent = msg;
  document.body.appendChild(el); setTimeout(() => el.remove(), 2200);
}
function applyLang() {
  document.documentElement.lang = settings.lang;
  document.title = t("appName");
  document.querySelectorAll("[data-tab]").forEach(b => {
    b.querySelector("span").textContent = t({ home: "tabExercises", program: "tabProgram", journal: "tabJournal", settings: "tabSettings" }[b.dataset.tab]);
    b.setAttribute("aria-current", b.dataset.tab === tab ? "page" : "false");
  });
}

// ---------- navigation ----------
function go(name) {
  tab = name; store.set("tab", name);
  current = null;
  applyLang();
  ({ home: renderHome, program: renderProgram, journal: renderJournal, settings: renderSettings }[name] || renderHome)();
  window.scrollTo(0, 0);
}
document.addEventListener("click", e => {
  const tb = e.target.closest("[data-tab]");
  if (tb) go(tb.dataset.tab);
});

// ---------- home ----------
function todayLine() {
  const log = getLog().filter(x => x.day === dayKey());
  if (!log.length) return t("todayNone");
  return t("today", { n: log.length, m: fmtDur(log.reduce((a, x) => a + x.sec, 0)) });
}
function moonChip() {
  const m = moonPhase();
  const sub = m.nearFull ? t("moonFull") + " · " + t("moonToday") : m.nearNew ? t("moonNew") + " · " + t("moonToday")
    : (m.toFull < m.toNew ? t("moonNextFull", { n: Math.round(m.toFull) }) : t("moonNextNew", { n: Math.round(m.toNew) }));
  return `<button class="moon-chip" data-act="moon">${moonSvg(m.frac, 26)}<span><b>${t(m.name)}</b><small>${sub}</small></span></button>`;
}
function exCard(id) {
  const ex = getEx(id);
  if (!ex) return "";
  const p = paramsFor(ex);
  const n = practicedCount(id);
  return `<button class="ex-card" data-open="${id}">
    <span class="ex-ref">${esc(ex.section)}</span>
    <span class="ex-main"><span class="ex-title">${esc(L(ex.title))}</span>
    <span class="ex-sum">${esc(L(ex.summary))}</span>
    <span class="ex-meta">${t("approx", { d: fmtDur(estimateFor(ex, p, modeFor(ex))) })}${ex.night ? ` · <i class="tag">${t("tagNight")}</i>` : ""}${ex.partner ? ` · <i class="tag">${t("tagPartner")}</i>` : ""}${n ? ` · ${t("practiced", { n })}` : ""}</span></span>
  </button>`;
}
function renderHome() {
  const q = searchQ.trim().toLocaleLowerCase(settings.lang);
  const match = id => { const ex = getEx(id); return ex && (!q || (L(ex.title) + " " + L(ex.summary) + " " + ex.section).toLocaleLowerCase(settings.lang).includes(q)); };
  const favs = favorites.all().filter(match);
  const secs = sections.map(s => ({ s, items: s.items.filter(match) })).filter(x => x.items.length);
  view.innerHTML = `
  <header class="home-head">
    <div class="hh-text"><span class="eyebrow">${esc(t("bookTitle"))}</span><h1>${t("appName")}</h1><p class="muted small">${esc(todayLine())}</p></div>
    ${moonChip()}
  </header>
  <div class="quick">
    <button class="quick-card" data-act="program"><b>${t("morningProgram")}</b><small>${t("approx", { d: fmtDur(routineDuration()) })}</small></button>
    <button class="quick-card" data-act="path"><b>${t("learningPath")}</b><small>${esc(suggestedNextTitle())}</small></button>
    <button class="quick-card ${reminderRunning() ? "on" : ""}" data-act="reminder"><b>${t("eyeReminder")}</b><small>${reminderStatus()}</small></button>
  </div>
  <label class="search"><span class="sr">${t("search")}</span><input id="q" type="search" placeholder="${t("search")}" value="${esc(searchQ)}" autocomplete="off"></label>
  <div id="lists">
  ${favs.length ? `<section><h2 class="sec-h">${t("favorites")}</h2><div class="list">${favs.map(exCard).join("")}</div></section>` : ""}
  ${secs.map(({ s, items }) => `<section><h2 class="sec-h">${esc(L(s.title))} <small>${t("chapter", { c: s.chapter })}</small></h2><div class="list">${items.map(exCard).join("")}</div></section>`).join("")}
  ${!secs.length && !favs.length ? `<p class="muted">${t("noResults")}</p>` : ""}
  </div>`;
  const qi = $("q");
  qi.oninput = () => { searchQ = qi.value; const pos = qi.selectionStart; renderHome(); const n = $("q"); n.focus(); n.setSelectionRange(pos, pos); };
}
view.addEventListener("click", e => {
  const o = e.target.closest("[data-open]");
  if (o) return openDetail(o.dataset.open);
  const a = e.target.closest("[data-act]")?.dataset.act;
  if (a === "moon") return openMoon();
  if (a === "program") return go("program");
  if (a === "path") { go("program"); setTimeout(() => $("path")?.scrollIntoView({ behavior: "smooth" }), 50); return; }
  if (a === "reminder") { go("program"); setTimeout(() => $("reminder")?.scrollIntoView({ behavior: "smooth" }), 50); return; }
  if (a === "back") return go(tab);
});

// ---------- detail ----------
function openDetail(id) {
  const ex = getEx(id);
  if (!ex) return;
  current = ex;
  loadPacks(settings.lang, ["common", ex.id]);   // prefetch audio
  renderDetail();
  window.scrollTo(0, 0);
}
function renderDetail() {
  const ex = current, p = paramsFor(ex), mode = modeFor(ex);
  const phases = expandPhases(ex, p);
  const flow = [];
  for (const ph of phases) {
    const name = L(ph.name), hs = holdSeconds(ex, ph.hold, p);
    const last = flow[flow.length - 1];
    if (last && last.name === name) { last.n++; continue; }
    flow.push({ name, hs, n: 1 });
  }
  const dur = estimateFor(ex, p, mode);
  const missing = buildTimeline(ex, p, timelineOpts(mode)).events.some(e => e.type === "clip" && e.missing);
  const presetActive = pr => Object.entries(pr.values).every(([k, v]) => p[k] === v);
  view.innerHTML = `
  <button class="back" data-act="back">‹ ${t("back")}</button>
  <div class="d-head">
    <span class="eyebrow">${t("section", { s: esc(ex.section) })}</span>
    <div class="d-title-row"><h1>${esc(L(ex.title))}</h1>
      <button class="icon-btn fav ${favorites.has(ex.id) ? "on" : ""}" data-d="fav" aria-label="${favorites.has(ex.id) ? t("removeFavorite") : t("addFavorite")}">
        <svg viewBox="0 0 24 24"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/></svg></button></div>
    <p>${esc(L(ex.summary))}</p>
  </div>
  ${ex.visual ? `<figure class="d-visual" id="dvis"></figure>` : ""}
  ${ex.partner ? `<div class="seg" role="group">${["partner", "mirror"].map(m => `<button data-mode="${m}" aria-pressed="${mode === m}">${t(m === "partner" ? "withPartner" : "withMirror")}</button>`).join("")}</div>` : ""}
  ${ex.presets?.length ? `<div class="seg" role="group" aria-label="${t("presets")}">${ex.presets.map(pr => `<button data-preset="${esc(pr.id)}" aria-pressed="${presetActive(pr)}">${esc(L(pr.label))}</button>`).join("")}</div>` : ""}
  ${ex.params?.length ? `<details class="panel params" ${ex.presets?.length ? "" : "open"}><summary>${t("customize")}</summary>${ex.params.map(paramRow).join("")}</details>` : ""}
  <button class="btn primary big" data-d="start">${t("startApprox", { d: fmtDur(dur) })}</button>
  ${missing ? `<p class="note">${t("audioMissing")}</p>` : ""}
  <details class="panel" open><summary>${t("flow")}</summary><ol class="flow">${flow.map(f => `<li><span>${esc(f.name)}</span><span class="muted">${f.hs ? fmtClock(f.hs) + (f.n > 1 ? " × " + f.n : "") : t("spoken")}</span></li>`).join("")}</ol></details>
  <details class="panel"><summary>${t("setting")}</summary><p>${esc(L(ex.setting))}</p></details>
  ${ex.prereq?.length ? `<details class="panel" open><summary>${t("learnFirst")}</summary><ul class="links">${ex.prereq.filter(getEx).map(id => `<li><button class="link" data-open="${id}">${esc(L(getEx(id).title))} <span class="muted">${esc(getEx(id).section)}</span></button></li>`).join("")}</ul></details>` : ""}
  ${ex.tips?.length ? `<details class="panel"><summary>${t("tips")}</summary><ul>${ex.tips.map(x => `<li>${esc(L(x))}</li>`).join("")}</ul></details>` : ""}
  ${ex.warnings?.length ? `<details class="panel warn" open><summary>${t("warnings")}</summary><ul>${ex.warnings.map(x => `<li>${esc(L(x))}</li>`).join("")}</ul></details>` : ""}
  <div id="fs-box"></div>`;
  if (ex.visual) renderVisual(ex.visual, "", settings.lang).then(svg => { const f = $("dvis"); if (f) f.innerHTML = svg; });
}
function paramRow(def) {
  const p = paramsFor(current), v = p[def.key];
  if (def.unit === "bool") return `<div class="row"><label for="pp-${def.key}">${esc(L(def.label))}</label><span class="switch"><input type="checkbox" id="pp-${def.key}" data-bool="${def.key}" ${v ? "checked" : ""}><span></span></span></div>`;
  const unit = def.unit === "min" ? t("minutes", { n: v }) : def.unit === "sec" ? t("seconds", { n: v }) : String(v);
  return `<div class="row"><span class="lbl">${esc(L(def.label))}</span><div class="stepper"><button data-step="${def.key}" data-dir="-1" aria-label="−">−</button><output>${unit}</output><button data-step="${def.key}" data-dir="1" aria-label="+">+</button></div></div>`;
}
view.addEventListener("click", e => {
  if (!current) return;
  const ex = current, p = paramsFor(ex);
  const st = e.target.closest("[data-step]");
  if (st) {
    const def = ex.params.find(x => x.key === st.dataset.step);
    p[def.key] = Math.min(def.max, Math.max(def.min, Math.round((p[def.key] + def.step * Number(st.dataset.dir)) * 100) / 100));
    saveParams(ex, p); return renderDetailKeep();
  }
  const pr = e.target.closest("[data-preset]");
  if (pr) { Object.assign(p, ex.presets.find(x => x.id === pr.dataset.preset).values); saveParams(ex, p); return renderDetailKeep(); }
  const md = e.target.closest("[data-mode]");
  if (md) { store.set("mode." + ex.id, md.dataset.mode); return renderDetailKeep(); }
  const d = e.target.closest("[data-d]")?.dataset.d;
  if (d === "fav") { favorites.toggle(ex.id); return renderDetailKeep(); }
  if (d === "start") return ex.special === "false-sentence" ? falseSentenceSetup(ex) : startExercise(ex);
});
view.addEventListener("change", e => {
  if (!current) return;
  const b = e.target.closest("[data-bool]");
  if (b) { const p = paramsFor(current); p[b.dataset.bool] = b.checked; saveParams(current, p); renderDetailKeep(); }
});
function renderDetailKeep() {
  const y = window.scrollY, open = [...view.querySelectorAll("details")].map(d => d.open);
  renderDetail();
  view.querySelectorAll("details").forEach((d, i) => { if (open[i] != null) d.open = open[i]; });
  window.scrollTo(0, y);
}

function startExercise(ex, after) {
  const params = paramsFor(ex), mode = modeFor(ex);
  runSession({
    title: L(ex.title), packs: [ex.id], night: ex.night, logId: ex.id,
    build: dur => buildTimeline(ex, params, timelineOpts(mode, { dur })),
    onFinish: r => showDone(ex, r, after),
  });
}

// ---------- false sentence game (7.11) ----------
let fsSecret = null;
function falseSentenceSetup(ex) {
  fsSecret = 1 + Math.floor(Math.random() * 5);
  const box = $("fs-box");
  box.innerHTML = `<div class="panel fs"><h3>${t("fsTitle")}</h3><p class="muted small">${t("fsHint")}</p>
    <p><b>${t("fsSpeaker")}</b></p><button class="btn" data-fs="reveal">${t("fsReveal")}</button>
    <p class="fs-secret" hidden>${t("fsSecret", { n: fsSecret })}</p>
    <button class="btn primary" data-fs="go" hidden>${t("fsHide")} · ${t("start")}</button></div>`;
  box.scrollIntoView({ behavior: "smooth" });
  box.onclick = e => {
    const a = e.target.closest("[data-fs]")?.dataset.fs;
    if (a === "reveal") { box.querySelector(".fs-secret").hidden = false; box.querySelector('[data-fs="go"]').hidden = false; }
    if (a === "go") { box.innerHTML = ""; startExercise(ex); }
  };
}

// ---------- after a session ----------
function showDone(ex, r, after) {
  const today = getLog().filter(x => x.day === dayKey());
  current = null;
  view.innerHTML = `
  <div class="done">
    <div class="done-mark">${r.completed ? t("done") : t("ended")}</div>
    <p class="muted">${esc(ex ? L(ex.title) : t("morningProgram"))}</p>
    <div class="stats"><div><b>${fmtClock(r.sec)}</b><span>${t("thisSession")}</span></div><div><b>${today.length}</b><span>${t("todaySessions")}</span></div></div>
    ${ex?.special === "false-sentence" && fsSecret ? `<div class="panel fs"><p><b>${t("fsGuess")}</b></p><div class="seg">${[1, 2, 3, 4, 5].map(n => `<button data-guess="${n}">${n}</button>`).join("")}</div><p class="fs-result"></p></div>` : ""}
    <div class="panel note-box">
      <h3>${t("addNote")}</h3>
      <p class="muted small">${t("noteHint")}</p>
      <textarea id="note" rows="3" placeholder="${t("notePlaceholder")}"></textarea>
      <canvas id="pad" width="600" height="360" aria-label="${t("draw")}"></canvas>
      <div class="row-btns"><button class="btn" data-n="clear">${t("clear")}</button><button class="btn primary" data-n="save">${t("save")}</button></div>
    </div>
    <button class="btn big" data-act="back">${t("backToList")}</button>
  </div>`;
  const pad = setupPad($("pad"));
  view.querySelector(".done").onclick = async e => {
    const g = e.target.closest("[data-guess]");
    if (g) { const n = +g.dataset.guess; view.querySelector(".fs-result").textContent = n === fsSecret ? t("fsRight", { n: fsSecret }) : t("fsWrong", { n: fsSecret }); }
    const a = e.target.closest("[data-n]")?.dataset.n;
    if (a === "clear") pad.clear();
    if (a === "save") {
      const text = $("note").value.trim();
      if (!text && pad.empty()) return;
      await journal.add({ exId: ex?.id || "program", title: ex ? ex.title : null, sec: Math.round(r.sec), text, drawing: pad.empty() ? null : pad.data() });
      toast(t("saved"));
      e.target.disabled = true;
    }
  };
  window.scrollTo(0, 0);
  if (after) after();
}
function setupPad(c) {
  const g = c.getContext("2d");
  let drawing = false, dirty = false, last = null;
  const color = () => getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#222";
  const pos = e => { const r = c.getBoundingClientRect(); return [(e.clientX - r.left) * c.width / r.width, (e.clientY - r.top) * c.height / r.height]; };
  c.onpointerdown = e => { drawing = true; last = pos(e); c.setPointerCapture(e.pointerId); };
  c.onpointermove = e => {
    if (!drawing) return;
    const p = pos(e);
    g.strokeStyle = color(); g.lineWidth = 3; g.lineCap = "round"; g.lineJoin = "round";
    g.beginPath(); g.moveTo(...last); g.lineTo(...p); g.stroke();
    last = p; dirty = true;
  };
  c.onpointerup = c.onpointercancel = () => { drawing = false; };
  return { clear() { g.clearRect(0, 0, c.width, c.height); dirty = false; }, empty: () => !dirty, data: () => c.toDataURL("image/png") };
}

// ---------- programme tab ----------
const routine = () => store.get("routine", null) || routineDefault();
function routineDuration() {
  try { return buildRoutine(routine(), getEx, paramsFor, timelineOpts("mirror")).duration; } catch { return 0; }
}
function suggestedNext() {
  return allIds.find(id => practicedCount(id) === 0 && (getEx(id).prereq || []).every(p => !getEx(p) || practicedCount(p) > 0));
}
const suggestedNextTitle = () => { const id = suggestedNext(); return id ? L(getEx(id).title) : "✓"; };

let reminderHandle = null;
const remCfg = () => Object.assign({ minutes: content.reminder?.interval || 7, from: "08:00", to: "22:00", on: false }, store.get("eyeRem", {}));
const reminderRunning = () => !!reminderHandle || (isNative && remCfg().on);
function reminderStatus() {
  const c = remCfg();
  return reminderRunning() ? t("on") + " · " + t("everyN", { n: c.minutes }) : t("everyN", { n: c.minutes });
}

function renderProgram() {
  const items = routine();
  const c = remCfg();
  const nextId = suggestedNext();
  const r = content.reminder;
  view.innerHTML = `
  <h1>${t("morningProgram")}</h1>
  <p class="muted">${t("programIntro")}</p>
  <ol class="routine">${items.map((it, i) => { const ex = getEx(it.id); return ex ? `<li><span class="r-name">${esc(L(ex.title))}<small class="muted">${esc(ex.section)}</small></span>
    <span class="r-btns"><button class="icon-btn small" data-r="up" data-i="${i}" aria-label="${t("moveUp")}" ${i ? "" : "disabled"}>↑</button><button class="icon-btn small" data-r="rm" data-i="${i}" aria-label="${t("remove")}">×</button></span></li>` : ""; }).join("")}</ol>
  <div class="row-btns">
    <label class="add"><span class="sr">${t("addToProgram")}</span><select id="addEx"><option value="">+ ${t("addToProgram")}</option>${allIds.map(id => `<option value="${id}">${esc(L(getEx(id).title))} · ${esc(getEx(id).section)}</option>`).join("")}</select></label>
    <button class="btn" data-r="reset">${t("resetProgram")}</button>
  </div>
  <button class="btn primary big" data-r="start" ${items.length ? "" : "disabled"}>${t("startProgram", { d: fmtDur(routineDuration()) })}</button>
  ${isNative ? `<div class="panel"><div class="row"><label for="mtime">${t("programAlarm")}<small>${t("programAlarmHint")}</small></label><input type="time" id="mtime" value="${esc(store.get("morningTime", ""))}"></div></div>` : ""}

  <h2 class="sec-h" id="reminder">${t("eyeReminder")}</h2>
  ${r ? `<p>${esc(L(r.summary))}</p><ol class="small">${(r.steps || []).map(s => `<li>${esc(L(s))}</li>`).join("")}</ol>` : ""}
  <div class="panel">
    <div class="row"><span class="lbl">${t("interval")}</span><div class="stepper"><button data-rem="-1">−</button><output>${t("minutes", { n: c.minutes })}</output><button data-rem="1">+</button></div></div>
    ${isNative ? `<div class="row"><label for="rfrom">${t("reminderFrom")}</label><input type="time" id="rfrom" value="${c.from}"></div><div class="row"><label for="rto">${t("reminderTo")}</label><input type="time" id="rto" value="${c.to}"></div>` : ""}
  </div>
  <button class="btn big ${reminderRunning() ? "" : "primary"}" data-r="rem">${reminderRunning() ? t("reminderStop") : t("reminderStart")}</button>
  <p class="note">${t("reminderWebNote")}</p>

  <h2 class="sec-h" id="path">${t("learningPath")}</h2>
  <p class="muted">${t("pathIntro")}</p>
  <ol class="path">${allIds.map(id => {
    const ex = getEx(id), n = practicedCount(id);
    const missing = (ex.prereq || []).filter(p => getEx(p) && !practicedCount(p));
    return `<li class="${n ? "done" : ""} ${id === nextId ? "next" : ""}"><button class="path-item" data-open="${id}">
      <span class="dot" aria-hidden="true"></span><span class="p-main"><b>${esc(L(ex.title))}</b> <small class="muted">${esc(ex.section)}</small>
      <small>${id === nextId ? `<span class="badge">${t("suggestedNext")}</span> ` : ""}${n ? t("practiced", { n }) : t("notYet")}${missing.length ? " · " + t("needsPrereq", { list: missing.map(p => esc(L(getEx(p).title))).join(", ") }) : ""}</small></span></button></li>`;
  }).join("")}</ol>`;
}
view.addEventListener("click", async e => {
  if (tab !== "program" || current) return;
  const b = e.target.closest("[data-r]");
  const rm = e.target.closest("[data-rem]");
  if (rm) { const c = remCfg(); c.minutes = Math.min(60, Math.max(2, c.minutes + Number(rm.dataset.rem))); store.set("eyeRem", c); if (reminderRunning()) await toggleReminder(true); return renderProgram(); }
  if (!b) return;
  const items = routine(), i = Number(b.dataset.i);
  const a = b.dataset.r;
  if (a === "up" && i > 0) { [items[i - 1], items[i]] = [items[i], items[i - 1]]; store.set("routine", items); return renderProgram(); }
  if (a === "rm") { items.splice(i, 1); store.set("routine", items); return renderProgram(); }
  if (a === "reset") { store.set("routine", null); return renderProgram(); }
  if (a === "start") return startRoutine(items);
  if (a === "rem") { await toggleReminder(!reminderRunning()); return renderProgram(); }
});
view.addEventListener("change", async e => {
  if (tab !== "program" || current) return;
  if (e.target.id === "addEx" && e.target.value) { const items = routine(); items.push({ id: e.target.value }); store.set("routine", items); return renderProgram(); }
  if (e.target.id === "mtime") {
    store.set("morningTime", e.target.value);
    await scheduleMorning({ time: e.target.value, lang: settings.lang, title: t("morningProgram"), body: t("startProgram", { d: fmtDur(routineDuration()) }) });
  }
  if (e.target.id === "rfrom" || e.target.id === "rto") {
    const c = remCfg(); c[e.target.id === "rfrom" ? "from" : "to"] = e.target.value; store.set("eyeRem", c);
    if (c.on) await toggleReminder(true);
  }
});
function startRoutine(items) {
  const packs = items.map(x => x.id);
  runSession({
    title: t("morningProgram"), packs, night: false,
    build: dur => buildRoutine(items, getEx, paramsFor, timelineOpts("mirror", { dur })),
    // log each exercise of the programme for the time actually spent in it
    log: (tl, now) => {
      const per = {};
      tl.phases.forEach(p => { if (p.exId && now > p.start) per[p.exId] = (per[p.exId] || 0) + Math.min(now, p.end) - p.start; });
      Object.entries(per).forEach(([id, sec]) => { if (sec >= 20) logSession({ id, sec: Math.round(sec), completed: now >= tl.duration - 1, via: "program" }); });
    },
    onFinish: r => showDone(null, r),
  });
}
async function toggleReminder(on) {
  const c = remCfg();
  const cue = content.reminder?.cue;
  if (isNative) {
    c.on = on; store.set("eyeRem", c);
    if (on) await scheduleEyeReminders({ minutes: c.minutes, from: c.from, to: c.to, lang: settings.lang, title: t("eyeReminder"), body: cue ? L(cue) : "" });
    else await cancelEyeReminders();
    return;
  }
  if (reminderHandle) { reminderHandle.stop(); reminderHandle = null; }
  if (on) { unlockAudio(); reminderHandle = await startReminderLoop(settings.lang, c.minutes, cue); }
}

// ---------- journal tab ----------
async function renderJournal() {
  const log = getLog();
  const total = log.reduce((a, x) => a + x.sec, 0);
  view.innerHTML = `<h1>${t("tabJournal")}</h1>
    <div class="stats left"><div><b>${streak()}</b><span>${t("streak", { n: "" }).trim()}</span></div><div><b>${fmtDur(total)}</b><span>${t("totalTime", { d: "" }).trim()}</span></div><div><b>${log.length}</b><span>${t("todaySessions").replace(/today|bugünkü /i, "")}</span></div></div>
    ${heatmap(log)}
    <div id="entries"><p class="muted">…</p></div>`;
  const entries = await journal.all();
  const box = $("entries");
  if (!box) return;
  box.innerHTML = entries.length ? entries.map(en => `<article class="entry">
      <header><b>${esc(en.title ? L(en.title) : t("morningProgram"))}</b><small class="muted">${new Date(en.at).toLocaleString(settings.lang === "tr" ? "tr-TR" : "en-GB", { dateStyle: "medium", timeStyle: "short" })} · ${fmtClock(en.sec)}</small></header>
      ${en.text ? `<p>${esc(en.text)}</p>` : ""}${en.drawing ? `<img src="${en.drawing}" alt="">` : ""}
      <button class="link danger" data-del="${en.id}">${t("deleteEntry")}</button></article>`).join("")
    : `<p class="muted">${t("journalEmpty")}</p>`;
  box.onclick = async e => { const d = e.target.closest("[data-del]"); if (d) { await journal.remove(d.dataset.del); renderJournal(); } };
}
function heatmap(log) {
  const per = {};
  log.forEach(x => { per[x.day] = (per[x.day] || 0) + x.sec; });
  const cells = [];
  const d = new Date(); d.setDate(d.getDate() - 7 * 12 + 1);
  for (let i = 0; i < 7 * 12; i++) {
    const k = dayKey(d), v = per[k] || 0;
    const lvl = v === 0 ? 0 : v < 600 ? 1 : v < 1800 ? 2 : 3;
    cells.push(`<i class="l${lvl}" title="${k}: ${fmtDur(v)}"></i>`);
    d.setDate(d.getDate() + 1);
  }
  return `<div class="heat" aria-hidden="true">${cells.join("")}</div>`;
}

// ---------- settings tab ----------
function renderSettings() {
  const opt = (v, cur, label) => `<option value="${v}" ${String(v) === String(cur) ? "selected" : ""}>${label}</option>`;
  view.innerHTML = `<h1>${t("tabSettings")}</h1>
  <div class="panel">
    <div class="row"><label for="sLang">${t("language")}<small>${t("languageHint")}</small></label>
      <select id="sLang">${opt("tr", settings.lang, "Türkçe")}${opt("en", settings.lang, "English")}</select></div>
    <div class="row"><label for="sVoice">${t("voiceVolume")}</label><select id="sVoice">${opt(0.6, settings.voiceVol, t("low"))}${opt(1, settings.voiceVol, t("normal"))}${opt(1.4, settings.voiceVol, t("high"))}</select></div>
    <div class="row"><label for="sBell">${t("bellVolume")}</label><select id="sBell">${opt(0, settings.bellVol, t("off"))}${opt(0.35, settings.bellVol, t("low"))}${opt(0.7, settings.bellVol, t("normal"))}${opt(1, settings.bellVol, t("high"))}</select></div>
    <div class="row"><label for="sPause">${t("pauseLength")}<small>${t("pauseLengthHint")}</small></label><select id="sPause">${opt(0.7, settings.pauseScale, t("short"))}${opt(1, settings.pauseScale, t("normal"))}${opt(1.5, settings.pauseScale, t("long"))}</select></div>
    <div class="row"><label for="sRemind">${t("reminders")}<small>${t("remindersHint")}</small></label><select id="sRemind">${opt(0, settings.remind, t("off"))}${opt(45, settings.remind, t("remind45"))}${opt(90, settings.remind, t("remind90"))}${opt(180, settings.remind, t("remind180"))}</select></div>
    <div class="row"><label for="sBeep">${t("nightBeep")}<small>${t("nightBeepHint")}</small></label><span class="switch"><input type="checkbox" id="sBeep" ${settings.nightBeep ? "checked" : ""}><span></span></span></div>
    <div class="row"><label for="sAwake">${t("keepAwake")}</label><span class="switch"><input type="checkbox" id="sAwake" ${settings.keepAwake ? "checked" : ""}><span></span></span></div>
  </div>
  <button class="btn big" id="sTest">${t("testSound")}</button>
  <details class="panel"><summary>${t("about")}</summary><p>${t("aboutText")}</p></details>`;
  const bind = (id, key, conv) => { $(id).onchange = e => { settings[key] = conv(e.target); saveSettings(); if (key === "lang") { applyLang(); renderSettings(); } }; };
  bind("sLang", "lang", el => el.value);
  bind("sVoice", "voiceVol", el => +el.value);
  bind("sBell", "bellVol", el => +el.value);
  bind("sPause", "pauseScale", el => +el.value);
  bind("sRemind", "remind", el => +el.value);
  bind("sBeep", "nightBeep", el => el.checked);
  bind("sAwake", "keepAwake", el => el.checked);
  $("sTest").onclick = () => { unlockAudio(); playTest(settings.lang).catch(err => toast(String(err))); };
}

// ---------- moon sheet ----------
function openMoon() {
  const m = moonPhase(), mj = content.moon || {};
  const sheet = document.createElement("div");
  sheet.className = "sheet-wrap";
  sheet.innerHTML = `<div class="sheet" role="dialog" aria-modal="true">
    <div class="moon-big">${moonSvg(m.frac, 72)}<div><h2>${t(m.name)}</h2><p class="muted">${Math.round(m.illum * 100)}% · ${t("moonNextFull", { n: Math.round(m.toFull) })} · ${t("moonNextNew", { n: Math.round(m.toNew) })}</p></div></div>
    ${mj.new ? `<h3>${esc(L(mj.new.title))}</h3><p>${esc(L(mj.new.text))}</p>` : ""}
    ${mj.full ? `<h3>${esc(L(mj.full.title))}</h3><p>${esc(L(mj.full.text))}</p>` : ""}
    ${mj.general ? `<p class="muted">${esc(L(mj.general))}</p>` : ""}
    <button class="btn big" data-close>${t("back")}</button></div>`;
  sheet.onclick = e => { if (e.target === sheet || e.target.closest("[data-close]")) sheet.remove(); };
  document.body.appendChild(sheet);
}

// ---------- boot ----------
applyLang();
go(tab);
if ("serviceWorker" in navigator && location.protocol === "https:" && !isNative && !location.hostname.endsWith("claude.ai") && !location.hostname.includes("claudeusercontent")) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
