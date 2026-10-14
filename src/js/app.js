import { t, L, fmtDur, fmtClock, TAG_KEYS } from "./i18n.js";
import { settings, saveSettings, store, paramsFor, saveParams, getLog, dayKey, favorites, journal, logSession } from "./store.js";
import { content, waves, focusLevels, getEx, allIds, waveOf, focusById, routineDefault, series } from "./content.js";
import { speak, ttsVoices, onVoices, ttsSupported } from "./tts.js";
import { renderJournal, scheduleRealityChecks, openDreamComposer } from "./journal.js";
import { isHp, commandOf, userCommands, practice, practiceStats, commandOfDay, shuffleCommand, scheduleCommandReminders, commandReminder, setReminderHours, encodedIds, hpIds } from "./practice.js";
import { buildTimeline, buildRoutine, expandPhases, holdSeconds, FADE_PHASE, breathPattern } from "./timeline.js";
import { clipDur, playTest, unlockAudio } from "./audio.js";
import { runSession } from "./session.js";
import { findTrackFor, findTracksForHints, pcConfigured, pcPing, pcIndex, pcLibrary, pcRescan, saveMatch, rankFilesFor, nextInFolder, trackOf, pcPositions, savePosition, resumePointFor, deviceName } from "./pcsource.js";
import { packs, renderVisual } from "./visuals.js";
import { storyboards, renderThumb, createPlayer, sweepPlayers } from "./storyboard.js";
import { techniques, reference } from "./content.js";
import { isNative, initNative, notifyPermission, exactAlarmsAllowed, openExactAlarmSettings, nativeInfo } from "./native.js";

const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const view = $("view");
let tab = store.get("tab", "home");
let current = null;     // session in detail view
let searchQ = "";

// ---------- helpers ----------
// times each session was practised: parsed once per synchronous render (renderHome asks for it ~900 times)
let logCounts = null;
const practicedCount = id => {
  if (!logCounts) { logCounts = new Map(); for (const x of getLog()) logCounts.set(x.id, (logCounts.get(x.id) || 0) + 1); queueMicrotask(() => { logCounts = null; }); }
  return logCounts.get(id) || 0;
};
const estimateFor = (ex, params) => buildTimeline(ex, params, timelineOpts()).duration;
function timelineOpts(extra = {}) {
  return Object.assign({ lang: settings.lang, pauseScale: settings.pauseScale, remindEvery: settings.remind, dur: clipDur(settings.lang), seed: Date.now() % 100000, ending: "done", sleepFade: sleepFadeSec() }, extra);
}
const sleepFadeSec = () => (Number(settings.sleepFade) || 2) * 60;
// ---------- night plan (sleep sessions): wake bell after N hours (WBTB) or at a set time ----------
const WAKE_OPTS = ["off", "wbtb:4.5", "wbtb:6", "after:7.5", "after:9", "at"];
const nightPlan = () => Object.assign({ wake: "off", at: "07:00" }, store.get("nightPlan", {}));
function wakeAtFor(plan, from = Date.now()) {
  if (!plan || !plan.wake || plan.wake === "off") return null;
  if (plan.wake === "at") {
    const [h, m] = String(plan.at || "07:00").split(":").map(Number);
    const d = new Date(from); d.setHours(h || 0, m || 0, 0, 0);
    if (d.getTime() <= from + 60e3) d.setDate(d.getDate() + 1);
    return d.getTime();
  }
  return from + (Number(plan.wake.split(":")[1]) || 0) * 3600e3;
}
const wakeKind = plan => (plan.wake.startsWith("wbtb") ? "wbtb" : "morning");
const clockOf = ms => new Date(ms).toLocaleTimeString(settings.lang === "tr" ? "tr-TR" : "en-GB", { hour: "2-digit", minute: "2-digit" });
const fadeOptions = cur => [1, 2, 3, 5, 10].map(n => `<option value="${n}" ${Number(cur || 2) === n ? "selected" : ""}>${t("minutes", { n })}</option>`).join("");
function nightPlanPanel() {
  const plan = nightPlan(), wakeAt = wakeAtFor(plan);
  const wakeLabel = v => v === "off" ? t("wakeOff") : v === "at" ? t("wakeAtTime") : t("wakeAfter", { h: v.split(":")[1].replace(".", settings.lang === "tr" ? "," : ".") }) + (v.startsWith("wbtb") ? " · WBTB" : "");
  return `<section class="panel night-plan">
    <h3>☾ ${t("nightPlan")}</h3>
    <div class="row"><label for="dFade">${t("fadeOut")}</label><select id="dFade">${fadeOptions(settings.sleepFade)}</select></div>
    <div class="row"><label for="dWake">${t("wakeBell")}</label><select id="dWake">${WAKE_OPTS.map(v => `<option value="${v}" ${plan.wake === v ? "selected" : ""}>${wakeLabel(v)}</option>`).join("")}</select></div>
    <div class="row" id="dWakeAtRow" ${plan.wake === "at" ? "" : "hidden"}><label for="dWakeAt">${t("wakeTime")}</label><input type="time" id="dWakeAt" value="${esc(plan.at)}"></div>
    <p class="muted small" id="dWakeInfo">${wakeAt ? t("wakeInfo", { time: clockOf(wakeAt) }) + " " : ""}${t("wakeLimit")}</p>
  </section>`;
}
function toast(msg) {
  const el = document.createElement("div"); el.className = "toast"; el.textContent = msg;
  document.body.appendChild(el); setTimeout(() => el.remove(), 2200);
}
/** Theme, motion and text size from settings → <html> attributes (tokens.css reads them). */
export function applyAppearance() {
  const root = document.documentElement;
  if (settings.theme === "dark" || settings.theme === "light") root.dataset.theme = settings.theme; else delete root.dataset.theme;
  if (settings.motion === "reduce" || settings.motion === "full") root.dataset.motion = settings.motion; else delete root.dataset.motion;
  const f = Number(settings.fontScale) || 1;
  root.style.fontSize = f !== 1 ? `${Math.round(f * 100)}%` : "";
}
function applyLang() {
  document.documentElement.lang = settings.lang;
  document.title = t("appName");
  document.querySelectorAll("[data-tab]").forEach(b => {
    b.querySelector("span").textContent = t({ home: "tabExercises", techniques: "tabTechniques", program: "tabProgram", journal: "tabJournal", settings: "tabSettings" }[b.dataset.tab]);
    b.setAttribute("aria-current", b.dataset.tab === tab ? "page" : "false");
  });
}
const focusChip = f => `<i class="tag focus-chip">F${esc(f)}</i>`;

// ---------- navigation ----------
// Sub-views (detail, technique, reference, gallery, library, session/done) push a history entry
// so the phone's back button/gesture goes one level up instead of leaving the app. `histDepth`
// counts the entries we own; leaving for a tab root unwinds them all at once.
let subView = null, popGuard = 0, histDepth = 0;
let refFrom = null;              // session id to return to when the catalogue was opened from a detail backlink
let backTo = null;               // reopens the parent when a sub-view was pushed on top of another (detail → gallery, library → detail)
function pushHist(kind) { try { history.pushState({ v: kind }, ""); histDepth++; } catch {} }
function enter(kind, opts = {}) {
  if (subView && !opts.push) { try { history.replaceState({ v: kind }, ""); } catch {} }
  else pushHist(kind);
  subView = kind;
}
/** Silently drop `n` of our history entries (the resulting popstate is swallowed). */
function unwindHist(n = histDepth) {
  n = Math.min(n, histDepth);
  if (n <= 0) return;
  popGuard++; histDepth -= n;
  try { history.go(-n); } catch { popGuard--; }
}
const TABS = { home: () => renderHome(), techniques: () => renderTechniques(), program: () => renderProgram(), journal: () => renderJournal(), settings: () => renderSettings() };
function go(name) {
  if (!TABS[name]) name = "home";        // e.g. a stored "guide"/"research" tab (moved to the Obsidian vault in obsidian/)
  unwindHist();
  subView = null; refFrom = null; backTo = null;
  tab = name; store.set("tab", name);
  current = null; currentTech = null;
  applyLang();
  TABS[name]();
  window.scrollTo(0, 0);
}
/** UI back buttons: one level up — a parent sub-view first, then the tab root. */
function uiBack() {
  if (subView === "reference" && refFrom) { const id = refFrom; refFrom = null; unwindHist(1); return openDetail(id); }
  if (backTo) { const f = backTo; backTo = null; unwindHist(1); return f(); }
  if (subView) return go(tab);
}
function mountSheet(sheet) {
  sheet.onclick = e => { if (e.target === sheet || e.target.closest("[data-close]")) closeSheet(sheet); };
  document.body.appendChild(sheet);
  pushHist("sheet");
}
function closeSheet(sheet) {
  if (!sheet || !sheet.isConnected) return;
  sheet.remove();
  if (history.state && history.state.v === "sheet") unwindHist(1);
}
window.addEventListener("popstate", () => {
  if (popGuard > 0) { popGuard--; return; }
  if (histDepth > 0) histDepth--;
  const sheet = document.querySelector(".sheet-wrap");
  if (sheet) { sheet.remove(); return; }
  if ($("session") && !$("session").hidden) { pushHist("session"); return; }   // back never kills a running session
  if (subView === "reference" && refFrom) { const id = refFrom; refFrom = null; return openDetail(id); }
  if (backTo) { const f = backTo; backTo = null; return f(); }
  if (subView) return go(tab);
  if (history.state && history.state.v) { try { history.back(); } catch {} }   // stale entry (e.g. after a reload)
});
function startSession(spec) { pushHist("session"); subView = "session"; return runSession(spec); }
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
function exCard(id) {
  const ex = getEx(id);
  if (!ex) return "";
  const p = paramsFor(ex);
  const n = practicedCount(id);
  const locked = (ex.prereq || []).some(pr => !practicedCount(pr));
  return `<button class="ex-card ${locked ? "locked" : ""}" data-open="${id}">
    <span class="ex-ref">${esc(ex.section || ex.no)}</span>
    <span class="ex-main"><span class="ex-title">${esc(L(ex.title))}</span>
    <span class="ex-sum">${esc(L(ex.summary))}</span>
    <span class="ex-meta">${ex.focus.map(focusChip).join("")}${ex.night ? ` · <i class="tag">${t("tagNight")}</i>` : ""}${n ? ` · ${t("practiced", { n })}` : ""}</span></span>
  </button>`;
}
// ---------- catalogue filters (persisted; combine with the text search) ----------
const FILTER_DEFAULTS = { focus: "", dur: "", series: "", done: "", fav: false, night: false };
let filters = Object.assign({}, FILTER_DEFAULTS, store.get("filters", {}));
const filtersActive = () => Object.keys(FILTER_DEFAULTS).some(k => filters[k] !== FILTER_DEFAULTS[k]);
function setFilters(patch) { Object.assign(filters, patch); store.set("filters", filters); renderHome(); }
const durCache = new Map();
/** Estimated length in minutes with the current parameters (cached; rebuilt when params or pause scale change). */
function exMinutes(ex) {
  const p = paramsFor(ex), k = ex.id + "|" + JSON.stringify(p) + "|" + settings.pauseScale + "|" + settings.remind;
  if (!durCache.has(k)) { try { durCache.set(k, estimateFor(ex, p) / 60); } catch { durCache.set(k, 0); } }
  return durCache.get(k);
}
function passFilters(ex) {
  if (filters.fav && !favorites.has(ex.id)) return false;
  if (filters.night && !ex.night) return false;
  if (filters.focus && !(ex.focus || []).map(String).includes(String(filters.focus))) return false;
  if (filters.series && waveOf(ex.id)?.series !== filters.series) return false;
  const n = practicedCount(ex.id);
  if (filters.done === "yes" && !n) return false;
  if (filters.done === "no" && n) return false;
  if (filters.dur) {
    const m = exMinutes(ex);
    if (filters.dur === "short" && m > 20) return false;
    if (filters.dur === "mid" && (m <= 20 || m > 30)) return false;
    if (filters.dur === "long" && m <= 30) return false;
  }
  return true;
}
function filterBar() {
  const opt = (v, cur, label) => `<option value="${esc(String(v))}" ${String(v) === String(cur) ? "selected" : ""}>${label}</option>`;
  const focusVals = [...new Set(allIds.flatMap(id => (getEx(id)?.focus || []).map(String)))].sort((a, b) => Number(a) - Number(b));
  const sel = (key, label, opts) => `<label class="f-sel ${filters[key] ? "on" : ""}"><span class="sr">${label}</span><select data-f="${key}" aria-label="${label}">${opt("", filters[key], label + ": " + t("fAll"))}${opts}</select></label>`;
  return `<div class="filters" role="group" aria-label="${t("filters")}">
    ${sel("focus", t("fFocus"), focusVals.map(f => opt(f, filters.focus, "Focus " + f)).join(""))}
    ${sel("dur", t("fDuration"), opt("short", filters.dur, t("fShort")) + opt("mid", filters.dur, t("fMid")) + opt("long", filters.dur, t("fLong")))}
    ${sel("series", t("fSeries"), series.map(x => opt(x.id, filters.series, L(x.title))).join(""))}
    ${sel("done", t("fStatus"), opt("no", filters.done, t("fNotDone")) + opt("yes", filters.done, t("fDone")))}
    <button class="f-chip ${filters.fav ? "on" : ""}" data-f="fav" aria-pressed="${filters.fav}">★ ${t("fFav")}</button>
    <button class="f-chip ${filters.night ? "on" : ""}" data-f="night" aria-pressed="${filters.night}">☾ ${t("fNight")}</button>
  </div>`;
}
function renderHome() {
  const q = searchQ.trim().toLocaleLowerCase(settings.lang);
  const match = id => { const ex = getEx(id); return ex && passFilters(ex) && (!q || (L(ex.title) + " " + L(ex.summary) + " " + ex.id).toLocaleLowerCase(settings.lang).includes(q)); };
  const favs = favorites.all().filter(match);
  const blocks = series.map(s => ({
    s,
    ws: waves.filter(w => w.series === s.id).map(w => ({ w, items: w.items.filter(match) })).filter(x => x.items.length)
  })).filter(b => b.ws.length);
  const narrowed = !!q || filtersActive();
  const total = new Set(blocks.flatMap(b => b.ws.flatMap(x => x.items))).size;
  const nextId = suggestedNext();
  view.innerHTML = `
  <header class="home-head">
    <div class="hh-text"><span class="eyebrow">${esc(t("appTag"))}</span><h1>${t("appName")}</h1><p class="muted small">${esc(todayLine())}</p></div>
    <button class="moon-chip" data-act="focus"><span><b>${t("focusLevels")}</b><small>10 · 12 · 15 · 21</small></span></button>
  </header>
  <div class="quick">
    <button class="quick-card" data-act="next"><b>${t("suggestedNext")}</b><small>${nextId ? esc(L(getEx(nextId).title)) : "✓"}</small></button>
    <button class="quick-card" data-act="wave"><b>${t("waveQuick")}</b><small>${esc(nextWaveTitle())}</small></button>
    <button class="quick-card" data-act="headphones"><b>${t("safety")}</b><small>${t("lockHint")}</small></button>
  </div>
  ${!q ? hpCardHtml() : ""}
  <label class="search"><span class="sr">${t("search")}</span><input id="q" type="search" placeholder="${t("search")}" value="${esc(searchQ)}" autocomplete="off"></label>
  ${filterBar()}
  ${narrowed ? `<p class="muted small filter-sum"><span id="fCount">${t("resultCount", { n: total })}</span>${filtersActive() ? ` · <button class="link" data-act="clearFilters">${t("clearFilters")}</button>` : ""}</p>` : ""}
  <div id="lists">
  ${favs.length ? `<section><h2 class="sec-h">${t("favorites")}</h2><div class="list">${favs.map(exCard).join("")}</div></section>` : ""}
  ${blocks.map(({ s, ws }) => `<section class="series-block">
    <h2 class="sec-h series-h">${esc(L(s.title))}</h2>
    <p class="muted small series-intro">${esc(L(s.intro))}</p>
    ${ws.map(({ w, items }) => `<details class="wave-head" ${narrowed || (w.series === "waves-of-change" && w.no <= 2) ? "open" : ""}>
      <summary><h3 class="sec-h wave-h">${esc(L(w.title))} <small>${w.focus.map(focusChip).join("")}</small></h3></summary>
      <p class="muted small">${esc(L(w.intro))}</p>
    </details>
    <div class="list">${items.map(exCard).join("")}</div>`).join("")}
  </section>`).join("")}
  ${!blocks.length && !favs.length ? `<p class="muted">${t("noResults")}</p>` : ""}
  ${!q ? `<section class="ref-entry"><button class="ref-card" data-act="reference"><span class="ex-ref">♪</span><span class="ex-main"><span class="ex-title">${t("refTitle")}</span><span class="ex-sum">${t("refCard", { n: reference.items.length })}</span></span></button>${pcConfigured() ? `<button class="ref-card" data-act="library"><span class="ex-ref">▤</span><span class="ex-main"><span class="ex-title">${t("libTitle")}</span><span class="ex-sum">${t("libCard")}</span></span></button>` : ""}</section>` : ""}
  </div>`;
  const qi = $("q");
  qi.oninput = () => { searchQ = qi.value; const pos = qi.selectionStart; renderHome(); const n = $("q"); n.focus(); n.setSelectionRange(pos, pos); };
  view.querySelectorAll(".filters select").forEach(el => { el.onchange = () => setFilters({ [el.dataset.f]: el.value }); });
}
// ---------- Human Plus: command of the day (home card) ----------
function hpCardHtml() {
  const c = commandOfDay();
  if (!c) return "";
  const st = practiceStats(c.id), all = practiceStats();
  const shuffle = c.pool > 1 ? `<button class="btn" data-hp="shuffle">${t("hpShuffle")}</button>` : "";
  return `<section class="hp-card" data-hpid="${c.id}">
    <div class="hp-head"><span class="eyebrow">✦ ${t("hpDay")}</span><span class="muted small">${settings.hpRemind ? `⏰ ${t("hpEvery", { h: settings.hpRemind })}` : `${encodedIds().length}/${hpIds().length} ${t("hpEncodedWord")}`}</span></div>
    <button class="hp-main" data-open="${c.id}"><b class="hp-cmd">${esc(c.cmd.text)}</b><span class="hp-title">${esc(L(c.ex.title))}${c.cmd.yours ? ` <small class="muted">(${t("hpCmdYours")})</small>` : ""}</span><span class="ex-sum">${esc(L(c.ex.summary))}</span></button>
    ${c.encoded
      ? `<p class="small hp-stats">${t("hpToday")} <b>${st.today}</b> · ${t("hpWeek")} <b>${st.week}</b> · ${t("hpTotal")} <b>${st.total}</b>${all.streak ? ` · ${t("hpStreak", { n: all.streak })}` : ""}</p>
         <div class="row-btns"><button class="btn primary" data-hp="practiced">+1 ${t("hpPracticed")}</button>${shuffle}</div>`
      : `<p class="muted small">${t("hpNone")}</p><div class="row-btns"><button class="btn primary" data-open="${c.id}">${t("hpEncodeFirst")}</button>${shuffle}</div>`}
  </section>`;
}
/** Programme tab: Human Plus practice summary (encoded functions, taps, streak, most-used commands). */
function hpProgramBlock() {
  const all = practiceStats(), enc = encodedIds().length, total = hpIds().length;
  const top = hpIds().map(id => ({ id, n: practiceStats(id).total })).filter(x => x.n).sort((a, b) => b.n - a.n).slice(0, 5);
  return `<section class="panel hp-sum"><p class="small"><b>✦ ${t("hpStats")}</b></p>
    <div class="stats four"><div><b>${enc}/${total}</b><span>${t("hpEncodedWord")}</span></div><div><b>${all.week}</b><span>${t("hpWeek")}</span></div><div><b>${all.total}</b><span>${t("hpTotal")}</span></div><div><b>${all.streak}</b><span>${t("hpStreakWord")}</span></div></div>
    ${top.length ? `<div class="tag-pills">${top.map(x => `<button class="pill on" data-open="${x.id}">${esc(commandOf(getEx(x.id))?.text || L(getEx(x.id).title))} · ${x.n}</button>`).join("")}</div>` : `<p class="muted small">${t("hpStatsHint")}</p>`}
  </section>`;
}
function refreshHpCard() { const el = view.querySelector(".hp-card"); if (el) el.outerHTML = hpCardHtml(); }
/** One real-life use of a function command: count it and confirm. */
function practiced(id) {
  practice.add(id);
  const st = practiceStats(id), cmd = commandOf(getEx(id));
  toast(`✓ ${cmd ? cmd.text + " · " : ""}${t("hpToday")} ${st.today}`);
}
view.addEventListener("click", e => {
  const hp = e.target.closest("[data-hp]");
  if (hp) {
    const id = hp.closest(".hp-card")?.dataset.hpid;
    if (hp.dataset.hp === "practiced" && id) practiced(id);
    if (hp.dataset.hp === "shuffle") shuffleCommand();
    scheduleCommandReminders();                       // Android notifications carry today's command text
    return refreshHpCard();
  }
  const o = e.target.closest("[data-open]");
  if (o && subView === "library") { backTo = () => { enter("library"); renderLibrary(); }; return openDetail(o.dataset.open, { push: true }); }
  if (o) return openDetail(o.dataset.open);
  const tg = e.target.closest("[data-tech]");
  if (tg) return openTechnique(tg.dataset.tech);
  const rp = e.target.closest("[data-refplay]");
  if (rp) return playRefTrack(rp.dataset.refplay, Number(rp.dataset.i || 0));
  const rc = e.target.closest("[data-refcat]");
  if (rc) { refCat = rc.dataset.refcat; return renderReference(); }
  const rcol = e.target.closest("[data-refcol]");
  if (rcol) { refCol = refCol === rcol.dataset.refcol ? "" : rcol.dataset.refcol; return renderReference(); }
  const rt = e.target.closest("[data-reftag]");
  if (rt) { refTag = rt.dataset.reftag; return renderReference(); }
  const ro = e.target.closest("[data-refopen]");
  if (ro) return openReference({ item: ro.dataset.refopen, col: ro.dataset.col || "", from: current?.id });
  const fc = e.target.closest(".f-chip[data-f]");
  if (fc) return setFilters({ [fc.dataset.f]: !filters[fc.dataset.f] });
  const a = e.target.closest("[data-act]")?.dataset.act;
  if (a === "clearFilters") return setFilters({ ...FILTER_DEFAULTS });
  if (a === "focus") return openFocusSheet();
  if (a === "next") { const id = suggestedNext(); if (id) return openDetail(id); return go("program"); }
  if (a === "wave") return go("program");
  if (a === "headphones") return openSafetySheet();
  if (a === "reference") return openReference();
  if (a === "library") return openLibrary();
  if (a === "gallery") {
    const from = subView === "detail" && current ? current.id : null;
    if (from) backTo = () => openDetail(from);
    enter("gallery", { push: !!from });
    return renderGallery();
  }
  if (a === "galfull") return openGalleryFull();
  if (a === "gback" || a === "back") return uiBack();
  const vs = e.target.closest("[data-vstate]");
  if (vs) { galState = vs.dataset.vstate; view.querySelectorAll("[data-vstate]").forEach(b => b.classList.toggle("on", b.dataset.vstate === galState)); return paintGallery(); }
  const vp = e.target.closest("[data-vpack]");
  if (vp) { settings.visualPack = vp.dataset.vpack; saveSettings(); view.querySelectorAll("[data-vpack]").forEach(c => { const on = c.dataset.vpack === settings.visualPack; c.classList.toggle("on", on); c.querySelector("small").textContent = on ? t("gallerySelected") : t("gallerySelect"); }); return toast(t("packSet")); }
});

// ---------- detail ----------
function openDetail(id, opts = {}) {
  const ex = getEx(id);
  if (!ex) return;
  current = ex;
  enter("detail", opts);
  renderDetail();
  window.scrollTo(0, 0);
}
function renderDetail() {
  const ex = current, p = paramsFor(ex);
  const w = waveOf(ex.id);
  const phases = expandPhases(ex, p);
  const flow = [];
  for (const ph of phases) {
    const name = L(ph.name), hs = holdSeconds(ex, ph.hold, p);
    const last = flow[flow.length - 1];
    if (last && last.name === name) { last.n++; continue; }
    flow.push({ name, hs, n: 1, breath: hs > 0 ? breathPattern(ph) : null });
  }
  if (ex.night) flow.push({ name: L(FADE_PHASE), hs: sleepFadeSec(), n: 1 });
  const dur = estimateFor(ex, p);
  const presetActive = pr => Object.entries(pr.values).every(([k, v]) => p[k] === v);
  const focusInfo = ex.focus.map(f => focusById(f)).filter(Boolean)
    .map(f => `<li><b>${t("focusLevel", { n: f.id })} — ${esc(L(f.title))}</b><small class="muted">${esc(L(f.text))}</small></li>`).join("");
  view.innerHTML = `
  <button class="back" data-act="back">‹ ${t("back")}</button>
  <div class="d-head">
    <span class="eyebrow">${esc(L(w.title))} · ${t("exerciseNo", { n: ex.no })}</span>
    <div class="d-title-row"><h1>${esc(L(ex.title))}</h1>
      <button class="icon-btn fav ${favorites.has(ex.id) ? "on" : ""}" data-d="fav" aria-label="${favorites.has(ex.id) ? t("removeFavorite") : t("addFavorite")}">
        <svg viewBox="0 0 24 24"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/></svg></button></div>
    <p>${esc(L(ex.summary))}</p>
  </div>
  <div class="focus-strip">${ex.focus.map(f => { const fl = focusById(f); return fl ? `<span class="focus-pill"><b>F${esc(fl.id)}</b> ${esc(L(fl.title))}</span>` : ""; }).join("")}</div>
  <button class="d-visual" data-act="gallery"><span class="s-stage mini"><span class="s-visual" data-vis="${esc(settings.visualPack || "gateway")}"></span></span><span class="d-visual-cap"><b>${t("visualPack")}: ${esc(L(packs.find(p => p.id === (settings.visualPack || "gateway"))?.title || packs[0].title))}</b><small>${t("galleryChange")}</small></span></button>
  ${isHp(ex) ? hpDetailPanel(ex) : ex.command ? `<div class="cmd-chip"><span>${t("funcCommand")}</span><b>${esc(L(ex.command))}</b></div>` : ""}
  ${settings.audioSource === "pc" ? `<button class="track-chip" data-trackchip data-d="pick">${t("pcTesting")}</button>` : ""}
  ${ex.presets?.length ? `<div class="seg" role="group" aria-label="${t("presets")}">${ex.presets.map(pr => `<button data-preset="${esc(pr.id)}" aria-pressed="${presetActive(pr)}">${esc(L(pr.label))}</button>`).join("")}</div>` : ""}
  ${ex.params?.length ? `<details class="panel params" ${ex.presets?.length ? "" : "open"}><summary>${t("customize")}</summary>${ex.params.map(paramRow).join("")}</details>` : ""}
  ${ex.night ? nightPlanPanel() : ""}
  <button class="btn primary big" data-d="start">${t("startApprox", { d: fmtDur(dur) })}</button>
  <p class="note">${sessionFullyRecorded(ex) ? t("voiceNoteFull") : t("voiceNote")}</p>
  <details class="panel" open><summary>${t("flow")}</summary><ol class="flow">${flow.map(f => `<li><span>${esc(f.name)}${f.breath ? `<small class="breath-chip">◌ ${breathLabel(f.breath)}</small>` : ""}</span><span class="muted">${f.hs ? fmtClock(f.hs) + (f.n > 1 ? " × " + f.n : "") : t("spoken")}</span></li>`).join("")}</ol></details>
  <details class="panel" open><summary>${t("goal")}</summary><p>${esc(L(ex.goal))}</p></details>
  <details class="panel"><summary>${t("setting")}</summary><p>${esc(L(ex.setting))}</p></details>
  ${focusInfo ? `<details class="panel"><summary>${t("focusLevels")}</summary><ul>${focusInfo}</ul></details>` : ""}
  ${ex.prereq?.length ? `<details class="panel" open><summary>${t("learnFirst")}</summary><ul class="links">${ex.prereq.filter(getEx).map(id => `<li><button class="link" data-open="${id}">${esc(L(getEx(id).title))} <span class="muted">${esc(L(waveOf(id)?.title || ""))}</span></button></li>`).join("")}</ul></details>` : ""}
  ${ex.tips?.length ? `<details class="panel"><summary>${t("tips")}</summary><ul>${ex.tips.map(x => `<li>${esc(L(x))}</li>`).join("")}</ul></details>` : ""}
  ${refPanel(ex.id)}
  ${ex.warnings?.length ? `<details class="panel warn" open><summary>${t("warnings")}</summary><ul>${ex.warnings.map(x => `<li>${esc(L(x))}</li>`).join("")}</ul></details>` : ""}`;
  paintVisualBoxes(ex.focus?.length ? "focus" + ex.focus[0] : "prep");
  if (settings.audioSource === "pc") {
    const chip = view.querySelector("[data-trackchip]");
    findTrackFor(ex.id).then(m => {
      if (!chip || current !== ex) return;
      chip.innerHTML = `<b>${m ? t(m.manual ? "pcTrackManual" : "pcTrackChip") : t("pcNoTrack")}</b>${m ? `<small>${esc(m.title)}</small>` : ""}<i>${m ? t("pcPick") : t("pcPickNone")}</i>`;
      chip.title = m ? m.path : "";
      chip.classList.toggle("on", !!m);
      chip.classList.toggle("manual", !!(m && m.manual));
    }).catch(() => { if (chip && current === ex) chip.textContent = t("pcFailed"); });
  }
}
/** Detail panel: Hemi-Sync reference titles that point at this session, and the collections listing it. */
function refPanel(id) {
  const { items, cols } = refBacklinks(id);
  if (!items.length && !cols.length) return "";
  return `<details class="panel"><summary>${t("refInCatalogue")}</summary><ul class="links">
    ${cols.map(c => `<li><button class="link" data-refopen="" data-col="${c.id}">${esc(L(c.title))} <span class="muted">${t("refColWord")}</span></button></li>`).join("")}
    ${items.map(it => `<li><button class="link" data-refopen="${it.id}">${esc(it.title)} <span class="muted">${esc(L(refCatOf(it.cat)?.title || ""))}</span></button></li>`).join("")}
  </ul></details>`;
}
/** "4 s in · 6 s out · hum tone" for a breathing pattern. */
function breathLabel(b) {
  const parts = [b.in && t("bIn", { n: b.in }), b.hold && t("bHold", { n: b.hold }), b.out && t("bOut", { n: b.out }), b.rest && t("bRest", { n: b.rest })].filter(Boolean);
  if (b.tone === "hum") parts.push(t("toneHum")); else if (b.tone === "tick") parts.push(t("toneTick"));
  return parts.join(" · ");
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
  const d = e.target.closest("[data-d]")?.dataset.d;
  if (d === "fav") { favorites.toggle(ex.id); return renderDetailKeep(); }
  if (d === "start") return startExercise(ex);
  if (d === "practiced") { practiced(ex.id); return renderDetailKeep(); }
  if (d === "undo") { if (practice.undo(ex.id)) toast(t("hpUndone")); return renderDetailKeep(); }
  if (d === "cmd") return openCommandSheet(ex);
  if (d === "pick") return openPickSheet(ex);
});
// ---------- PC source: choose/override the file of a session ----------
/** Sheet listing the PC files for a session, likeliest first; the pick is saved on the PC (and mirrored locally). */
async function openPickSheet(ex) {
  if (!pcConfigured()) return toast(t("pcFailed"));
  const sheet = document.createElement("div");
  sheet.className = "sheet-wrap";
  sheet.innerHTML = `<div class="sheet pick" role="dialog" aria-modal="true"><h2>${t("pickTitle")}</h2><p class="muted small">${esc(L(ex.title))} · ${t("pickIntro")}</p>
    <input id="pq" type="search" placeholder="${t("pickSearch")}" autocomplete="off">
    <div class="pick-list"><p class="muted">${t("libLoading")}</p></div>
    <div class="row-btns"><button class="btn" data-pickauto hidden>${t("pickAuto")}</button><button class="btn" data-close>${t("back")}</button></div></div>`;
  mountSheet(sheet);
  let paths = [], cur = null;
  try { paths = ((await pcIndex()).files || []).map(f => f.path); cur = await findTrackFor(ex.id); } catch {}
  const list = sheet.querySelector(".pick-list"), q = sheet.querySelector("#pq");
  sheet.querySelector("[data-pickauto]").hidden = !(cur && cur.manual);
  const paint = () => {
    if (!paths.length) { list.innerHTML = `<p class="muted">${t("libEmpty")}</p>`; return; }
    const rows = rankFilesFor(ex.id, paths, q.value).slice(0, 60);
    list.innerHTML = rows.length ? `<ul class="lib-files">${rows.map(r => `<li><button class="link ${cur && cur.path === r.path ? "on" : ""}" data-pick="${esc(r.path)}"><b>${esc(r.path.split("/").pop())}</b><small>${esc(r.path.slice(0, Math.max(0, r.path.lastIndexOf("/"))))}${cur && cur.path === r.path ? ` · ${t("pickCurrent")}` : ""}${r.s > 69 ? " · ★" : ""}</small></button></li>`).join("")}</ul>` : `<p class="muted">${t("libNoResults")}</p>`;
  };
  q.oninput = paint;
  paint();
  sheet.addEventListener("click", async e => {
    const pk = e.target.closest("[data-pick]");
    const auto = e.target.closest("[data-pickauto]");
    if (!pk && !auto) return;
    const r = await saveMatch(ex.id, pk ? pk.dataset.pick : null);
    toast(pk ? t(r.shared ? "pcMatchSaved" : "pcMatchLocal") : t("pcMatchCleared"));
    closeSheet(sheet);
    if (current === ex) renderDetailKeep();
  });
}
/** Human Plus detail: command (documented or the user's note) + the daily-practice counter. */
function hpDetailPanel(ex) {
  const cmd = commandOf(ex), st = practiceStats(ex.id), enc = practicedCount(ex.id) > 0;
  const max = Math.max(1, ...st.series);
  return `<div class="cmd-chip">${cmd
    ? `<span>${t("funcCommand")}</span><b>${esc(cmd.text)}</b>${cmd.yours ? `<small class="muted">${t("hpCmdYours")}</small><button class="link" data-d="cmd">${t("hpCmdEdit")}</button>` : ""}`
    : `<span>${t("funcCommand")}</span><button class="link" data-d="cmd">${t("hpCmdAdd")}</button>`}</div>
  <details class="panel hp-practice" open><summary>✦ ${t("hpPanel")}</summary>
    <p class="muted small">${t("hpHow")}</p>
    <div class="stats four hp-stat-row"><div><b>${st.today}</b><span>${t("hpToday")}</span></div><div><b>${st.week}</b><span>${t("hpWeek")}</span></div><div><b>${st.total}</b><span>${t("hpTotal")}</span></div><div><b>${st.streak}</b><span>${t("hpStreakWord")}</span></div></div>
    <div class="hp-bars" aria-hidden="true">${st.series.map(n => `<span class="${n ? "on" : ""}" style="height:${Math.round(6 + 30 * n / max)}px" title="${n}"></span>`).join("")}</div>
    <div class="row-btns"><button class="btn primary" data-d="practiced">+1 ${t("hpPracticed")}</button><button class="btn" data-d="undo" ${st.today ? "" : "disabled"}>${t("hpUndo")}</button></div>
    ${!enc ? `<p class="note">${t("hpNotEncoded")}</p>` : ""}
  </details>`;
}
/** Sheet for noting the command word of a function whose official command is not public. */
function openCommandSheet(ex) {
  const sheet = document.createElement("div");
  sheet.className = "sheet-wrap";
  sheet.innerHTML = `<div class="sheet" role="dialog" aria-modal="true">
    <h2>${esc(L(ex.title))}</h2>
    <p class="muted small">${t("hpCmdHint")}</p>
    <label class="search"><span class="sr">${t("funcCommand")}</span><input id="hpCmdInput" type="text" maxlength="60" autocomplete="off" placeholder="${t("hpCmdPlaceholder")}" value="${esc(userCommands.get(ex.id))}"></label>
    <div class="row-btns"><button class="btn" data-close>${t("cancel")}</button><button class="btn primary" data-cmdsave>${t("save")}</button></div></div>`;
  mountSheet(sheet);
  sheet.querySelector("[data-cmdsave]").onclick = () => { userCommands.set(ex.id, $("hpCmdInput").value); scheduleCommandReminders(); closeSheet(sheet); toast(t("saved")); if (current === ex) renderDetailKeep(); };
  $("hpCmdInput").focus();
}
view.addEventListener("change", e => {
  if (!current) return;
  const b = e.target.closest("[data-bool]");
  if (b) { const p = paramsFor(current); p[b.dataset.bool] = b.checked; saveParams(current, p); renderDetailKeep(); }
  if (e.target.id === "dFade") { settings.sleepFade = Number(e.target.value) || 2; saveSettings(); renderDetailKeep(); }
  if (e.target.id === "dWake" || e.target.id === "dWakeAt") {
    const plan = nightPlan();
    if (e.target.id === "dWake") plan.wake = WAKE_OPTS.includes(e.target.value) ? e.target.value : "off"; else plan.at = e.target.value || "07:00";
    store.set("nightPlan", plan); renderDetailKeep();
  }
});
function renderDetailKeep() {
  const y = window.scrollY, open = [...view.querySelectorAll("details")].map(d => d.open);
  renderDetail();
  view.querySelectorAll("details").forEach((d, i) => { if (open[i] != null) d.open = open[i]; });
  window.scrollTo(0, y);
}

let starting = false;                    // a PC lookup is pending: a second tap must not start the session twice
async function startExercise(ex, after) {
  const params = paramsFor(ex);
  let track = null;
  if (settings.audioSource === "pc" && settings.pcUrl) {
    if (starting) return;
    unlockAudio();                       // still inside the tap: the awaits below would otherwise lose iOS's playback permission
    const btn = view.querySelector('[data-d="start"]'); if (btn) btn.disabled = true;
    starting = true;
    try {
      track = await findTrackFor(ex.id);
      if (!track) toast(t("pcNoTrackFallback"));
      else await withResume(track);
    } finally { starting = false; if (btn) btn.disabled = false; }
  }
  const plan = ex.night ? nightPlan() : null, wakeAt = plan ? wakeAtFor(plan) : null;
  startSession({
    title: L(ex.title), packs: [ex.id], night: ex.night, logId: ex.id, track,
    sleep: wakeAt ? { wakeAt, kind: wakeKind(plan) } : null,
    build: dur => buildTimeline(ex, params, timelineOpts({ dur })),
    onFinish: r => showDone(ex, r, after),
  });
}

/** PC track extras: resume point (synced with the PC), position memory while playing, and the part to pre-buffer. */
async function withResume(track, next = null) {
  const pos = await pcPositions();
  track.resumeAt = resumePointFor(track.path, pos);
  track.onPosition = (sec, dur, done) => savePosition(track.path, sec, dur, done);
  track.next = next;
  return track;
}

// ---------- after a session ----------
let doneTags = new Set();
function showDone(ex, r, after) {
  const today = getLog().filter(x => x.day === dayKey());
  current = null; subView = "done";
  doneTags = new Set();
  view.innerHTML = `
  <div class="done">
    <div class="done-mark">${r.completed ? t("done") : t("ended")}</div>
    <p class="muted">${esc(ex ? L(ex.title) : t("programTab"))}</p>
    <div class="stats"><div><b>${fmtClock(r.sec)}</b><span>${t("thisSession")}</span></div><div><b>${today.length}</b><span>${t("todaySessions")}</span></div></div>
    ${isHp(ex) && commandOf(ex) ? `<div class="cmd-chip done-cmd"><span>${t("funcCommand")}</span><b>${esc(commandOf(ex).text)}</b><small class="muted">${t("hpDoneHint")}</small></div>` : ""}
    ${r.night ? `<div class="row-btns night-cta"><button class="btn primary" data-n="dream">☾ ${t("dreamJournalCta")}</button>${r.woke && r.kind === "wbtb" && getEx("ex-wbtb") && ex?.id !== "ex-wbtb" ? `<button class="btn" data-open="ex-wbtb">${t("wbtbCta")}</button>` : ""}</div>` : ""}
    <div class="panel note-box">
      <h3>${t("addNote")}</h3>
      <p class="muted small">${t("noteHint")}</p>
      <p class="small"><b>${t("tags")}</b> — ${t("tagsHint")}</p>
      <div class="tag-pills">${TAG_KEYS.map(k => `<button class="pill" data-tag="${k}">${t(k)}</button>`).join("")}</div>
      <textarea id="note" rows="3" placeholder="${t("notePlaceholder")}"></textarea>
      <canvas id="pad" width="600" height="360" aria-label="${t("draw")}"></canvas>
      <div class="row-btns"><button class="btn" data-n="clear">${t("clear")}</button><button class="btn primary" data-n="save">${t("save")}</button></div>
    </div>
    <button class="btn big" data-act="back">${t("backToList")}</button>
  </div>`;
  const pad = setupPad($("pad"));
  view.querySelector(".done").onclick = async e => {
    const tg = e.target.closest("[data-tag]");
    if (tg) { const k = tg.dataset.tag; doneTags.has(k) ? doneTags.delete(k) : doneTags.add(k); tg.classList.toggle("on"); return; }
    const a = e.target.closest("[data-n]")?.dataset.n;
    if (a === "dream") { openDreamComposer(); return go("journal"); }
    if (a === "clear") pad.clear();
    if (a === "save") {
      const text = $("note").value.trim();
      if (!text && pad.empty() && !doneTags.size) return;
      await journal.add({ exId: ex?.id || "program", title: ex ? ex.title : null, sec: Math.round(r.sec), text, tags: [...doneTags], drawing: pad.empty() ? null : pad.data() });
      toast(t("saved"));
      e.target.disabled = true;
    }
  };
  window.scrollTo(0, 0);
  if (after) after();
}
function setupPad(c) {
  const g = c.getContext("2d");
  if (!g) return { clear() {}, empty: () => true, data: () => null }; // no canvas support (rare webviews)
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
  try { return buildRoutine(routine(), getEx, paramsFor, timelineOpts()).duration; } catch { return 0; }
}
function suggestedNext() {
  return allIds.find(id => practicedCount(id) === 0 && (getEx(id).prereq || []).every(p => !getEx(p) || practicedCount(p) > 0));
}
const nextWave = () => waves.find(w => w.items.some(id => !practicedCount(id)));
const nextWaveTitle = () => { const w = nextWave(); return w ? L(w.title) : "✓"; };
function waveDuration(w) {
  try { return buildRoutine(w.items.map(id => ({ id })), getEx, paramsFor, timelineOpts()).duration; } catch { return 0; }
}

function renderProgram() {
  const items = routine();
  const nextId = suggestedNext();
  view.innerHTML = `
  <h1>${t("tabProgram")}</h1>
  <p class="muted">${t("programIntro")}</p>
  <ol class="routine">${items.map((it, i) => { const ex = getEx(it.id); return ex ? `<li><span class="r-name">${esc(L(ex.title))}<small class="muted">${esc(L(waveOf(it.id)?.title || ""))} · F${esc(ex.focus.join("/"))}</small></span>
    <span class="r-btns"><button class="icon-btn small" data-r="up" data-i="${i}" aria-label="${t("moveUp")}" ${i ? "" : "disabled"}>↑</button><button class="icon-btn small" data-r="rm" data-i="${i}" aria-label="${t("remove")}">×</button></span></li>` : ""; }).join("")}</ol>
  <div class="row-btns">
    <label class="add"><span class="sr">${t("addToProgram")}</span><select id="addEx"><option value="">+ ${t("addToProgram")}</option>${allIds.map(id => `<option value="${id}">${esc(L(getEx(id).title))} · ${esc(L(waveOf(id)?.title || ""))}</option>`).join("")}</select></label>
    <button class="btn" data-r="reset">${t("resetProgram")}</button>
  </div>
  <button class="btn primary big" data-r="start" ${items.length ? "" : "disabled"}>${t("startProgram", { d: fmtDur(routineDuration()) })}</button>
  ${hpProgramBlock()}

  <h2 class="sec-h">${t("waveQuick")}</h2>
  <p class="muted small">${t("waveHint")}</p>
  ${series.map(s => {
    const ws = waves.filter(w => w.series === s.id);
    if (!ws.length) return "";
    return `<h3 class="sec-h series-h small">${esc(L(s.title))}</h3>
  <div class="list">${ws.map(w => `<button class="ex-card" data-wave="${w.id}">
    <span class="ex-ref">${esc(w.no)}</span>
    <span class="ex-main"><span class="ex-title">${esc(L(w.title))}</span>
    <span class="ex-sum">${esc(L(w.intro))}</span>
    <span class="ex-meta">${w.focus.map(focusChip).join("")} · ${t("approx", { d: fmtDur(waveDuration(w)) })}</span></span></button>`).join("")}</div>`;
  }).join("")}

  <h2 class="sec-h" id="path">${t("learningPath")}</h2>
  <p class="muted">${t("pathIntro")}</p>
  <ol class="path">${allIds.map(id => {
    const ex = getEx(id), n = practicedCount(id);
    const missing = (ex.prereq || []).filter(p => getEx(p) && !practicedCount(p));
    return `<li class="${n ? "done" : ""} ${id === nextId ? "next" : ""}"><button class="path-item" data-open="${id}">
      <span class="dot" aria-hidden="true"></span><span class="p-main"><b>${esc(L(ex.title))}</b> <small class="muted">${esc(L(waveOf(id)?.title || ""))} · F${esc(ex.focus.join("/"))}</small>
      <small>${id === nextId ? `<span class="badge">${t("suggestedNext")}</span> ` : ""}${n ? t("practiced", { n }) : t("notYet")}${missing.length ? " · " + t("needsPrereq", { list: missing.map(p => esc(L(getEx(p).title))).join(", ") }) : ""}</small></span></button></li>`;
  }).join("")}</ol>`;
}
view.addEventListener("click", async e => {
  if (tab !== "program" || current) return;
  const wv = e.target.closest("[data-wave]");
  if (wv) { const w = waves.find(x => x.id === wv.dataset.wave); if (w) startRoutine(w.items.map(id => ({ id })), L(w.title)); return; }
  const b = e.target.closest("[data-r]");
  if (!b) return;
  const items = routine(), i = Number(b.dataset.i);
  const a = b.dataset.r;
  if (a === "up" && i > 0) { [items[i - 1], items[i]] = [items[i], items[i - 1]]; store.set("routine", items); return renderProgram(); }
  if (a === "rm") { items.splice(i, 1); store.set("routine", items); return renderProgram(); }
  if (a === "reset") { store.set("routine", null); return renderProgram(); }
  if (a === "start") return startRoutine(items, t("programTab"));
});
view.addEventListener("change", e => {
  if (tab !== "program" || current) return;
  if (e.target.id === "addEx" && e.target.value) { const items = routine(); items.push({ id: e.target.value }); store.set("routine", items); return renderProgram(); }
});
function startRoutine(items, title) {
  const packs = items.map(x => x.id);
  startSession({
    title, packs, night: false,
    build: dur => buildRoutine(items, getEx, paramsFor, timelineOpts({ dur })),
    // log each exercise of the programme for the time actually spent in it
    log: (tl, now) => {
      const per = {};
      tl.phases.forEach(p => { if (p.exId && now > p.start) per[p.exId] = (per[p.exId] || 0) + Math.min(now, p.end) - p.start; });
      Object.entries(per).forEach(([id, sec]) => { if (sec >= 20) logSession({ id, sec: Math.round(sec), completed: now >= tl.duration - 1, via: "program" }); });
    },
    onFinish: r => showDone(null, r),
  });
}

// ---------- journal tab ----------
// ---------- settings tab ----------
// true when every spoken line of the session (and the common lines) has a recorded clip in the current language
export function sessionFullyRecorded(ex) {
  const lang = settings.lang, packs = content.audio?.[lang]?.packs;
  if (!packs || settings.recordedVoice === false) return false;
  const has = key => Object.values(packs).some(p => p.clips[key]);
  const keys = [];
  for (const ph of ex.phases || []) {
    for (const l of ph.lines || []) keys.push(l.audio?.[lang]);
    for (const l of ph.hold?.reminders || []) keys.push(l.audio?.[lang]);
  }
  for (const l of Object.values(content.common?.lines || {})) keys.push(l.audio?.[lang]);
  return keys.length > 0 && keys.every(k => k && has(k));
}

// recorded-voice coverage for the settings screen ("21 / 532 lines"); packs come from APP_CONTENT.audio
export function voiceCoverageText(lang) {
  const a = content.audio?.[lang];
  if (!a || !a.recorded) return t("voiceCoverageNone");
  return t("voiceCoverage", { n: a.recorded, total: a.lines, pct: Math.round(100 * a.recorded / a.lines) });
}

/** Android package: permission states for notifications and exact alarms, with the buttons to grant them. */
async function paintAndroidPanel(ask = false) {
  if (!$("androidPanel")) return;
  const yes = t("androidOk"), no = t("androidNo");
  $("sNotifAllow").onclick = () => { paintAndroidPanel(true).then(() => { scheduleRealityChecks(); scheduleCommandReminders(); }); };
  $("sExactOpen").onclick = async () => { await openExactAlarmSettings(); paintAndroidPanel(); };
  nativeInfo().then(i => { const el = $("sAndroidVersion"); if (i && el) el.textContent = `${t("androidVersion")}: ${i.version || ""}${i.build ? ` (${i.build})` : ""}`; });
  const p = await notifyPermission(ask);
  const nEl = $("sNotifStatus"), aEl = $("sNotifAllow");
  if (nEl) nEl.textContent = p === "granted" ? yes : no;
  if (aEl) aEl.hidden = p === "granted";
  const x = await exactAlarmsAllowed();
  const xEl = $("sExactStatus"), oEl = $("sExactOpen");
  if (xEl) xEl.textContent = x == null ? "" : `${t("androidChWake")}: ${x ? yes : no}`;
  if (oEl) oEl.hidden = x !== false;          // only offered when the user has revoked exact alarms
}
function renderSettings() {
  const opt = (v, cur, label) => `<option value="${v}" ${String(v) === String(cur) ? "selected" : ""}>${label}</option>`;
  view.innerHTML = `<h1>${t("tabSettings")}</h1>
  <div class="panel">
    <div class="row"><label for="sLang">${t("language")}<small>${t("languageHint")}</small></label>
      <select id="sLang">${opt("tr", settings.lang, "Türkçe")}${opt("en", settings.lang, "English")}</select></div>
    <div class="row"><label for="sRec">${t("recordedVoice")}<small>${t("recordedVoiceHint")}</small></label><span class="switch"><input type="checkbox" id="sRec" ${settings.recordedVoice !== false ? "checked" : ""}><span></span></span></div>
    <p class="note" id="voiceCov">${voiceCoverageText(settings.lang)}</p>
    <div class="row"><label for="sTtsVoice">${t("phoneTts")} · ${t("ttsVoice")}<small>${t("ttsVoiceHint")}</small></label>
      <select id="sTtsVoice"><option value="">${t("themeAuto")}</option></select></div>
    <div class="row"><label for="sTtsRate">${t("ttsRate")}</label><select id="sTtsRate">${opt(0.8, settings.ttsRate, t("ttsSlow"))}${opt(0.9, settings.ttsRate, t("normal"))}${opt(1, settings.ttsRate, t("ttsFast"))}</select></div>
    <div class="row-btns"><button class="btn" id="sTtsTest">${t("ttsTest")}</button><span class="muted small" id="sTtsStatus"></span></div>
    <div class="row"><label for="sVoice">${t("voiceVolume")}</label><select id="sVoice">${opt(0.6, settings.voiceVol, t("low"))}${opt(1, settings.voiceVol, t("normal"))}${opt(1.4, settings.voiceVol, t("high"))}</select></div>
    <div class="row"><label for="sBed">${t("bedVolume")}<small>${t("bedVolumeHint")}</small></label><select id="sBed">${opt(0.4, settings.bedVol, t("low"))}${opt(0.7, settings.bedVol, t("normal"))}${opt(1, settings.bedVol, t("high"))}</select></div>
    <div class="row"><label for="sBell">${t("bellVolume")}</label><select id="sBell">${opt(0, settings.bellVol, t("off"))}${opt(0.35, settings.bellVol, t("low"))}${opt(0.7, settings.bellVol, t("normal"))}${opt(1, settings.bellVol, t("high"))}</select></div>
    <div class="row"><label for="sAmb">${t("ambience")}<small>${t("ambienceHint")}</small></label><select id="sAmb">${opt(0, settings.ambience, t("off"))}${opt(0.02, settings.ambience, t("low"))}${opt(0.05, settings.ambience, t("normal"))}</select></div>
    <div class="row"><label for="sPause">${t("pauseLength")}<small>${t("pauseLengthHint")}</small></label><select id="sPause">${opt(0.7, settings.pauseScale, t("short"))}${opt(1, settings.pauseScale, t("normal"))}${opt(1.5, settings.pauseScale, t("long"))}</select></div>
    <div class="row"><label for="sRemind">${t("reminders")}<small>${t("remindersHint")}</small></label><select id="sRemind">${opt(0, settings.remind, t("off"))}${opt(45, settings.remind, t("remind45"))}${opt(90, settings.remind, t("remind90"))}${opt(180, settings.remind, t("remind180"))}</select></div>
    <div class="row"><label for="sAwake">${t("keepAwake")}</label><span class="switch"><input type="checkbox" id="sAwake" ${settings.keepAwake ? "checked" : ""}><span></span></span></div>
    <div class="row"><label for="sBreath">◌ ${t("breathGuide")}<small>${t("breathGuideHint")}</small></label><span class="switch"><input type="checkbox" id="sBreath" ${settings.breathGuide !== false ? "checked" : ""}><span></span></span></div>
    <div class="row"><label for="sFade">☾ ${t("fadeOut")}<small>${t("fadeOutHint")}</small></label><select id="sFade">${fadeOptions(settings.sleepFade)}</select></div>
    <div class="row"><label for="sHpRemind">✦ ${t("hpRemind")}<small>${t("hpRemindHint")}</small></label><select id="sHpRemind">${opt(0, settings.hpRemind, t("off"))}${[1, 2, 3, 4].map(h => opt(h, settings.hpRemind, t("hpEvery", { h }))).join("")}</select></div>
    <div class="row-btns"><button class="btn" id="sHpNow">${t("hpRemindNow")}</button><span class="muted small" id="sHpStatus">${settings.hpRemind ? t("remWindow", { a: String(settings.rcFrom ?? 9).padStart(2, "0"), b: String(settings.rcTo ?? 22).padStart(2, "0") }) : ""}</span></div>
    <div class="row"><label for="sSource">${t("audioSource")}<small>${t("audioSourceHint")}</small></label>
      <select id="sSource">${opt("synth", settings.audioSource, t("audioSourceSynth"))}${opt("pc", settings.audioSource, t("audioSourcePC"))}</select></div>
    <div class="row" id="pcRow" ${settings.audioSource === "pc" ? "" : "hidden"}><label for="sPcUrl">${t("pcUrl")}<small>${t("pcUrlHint")}</small></label>
      <input id="sPcUrl" type="text" inputmode="url" autocomplete="off" placeholder="http://192.168.1.20:8700" value="${esc(settings.pcUrl)}" style="max-width:15rem"></div>
    <div class="row-btns" id="pcTestRow" ${settings.audioSource === "pc" ? "" : "hidden"}><button class="btn" id="sPcTest">${t("pcTest")}</button><button class="btn" id="sLibrary">▤ ${t("libTitle")}</button><span class="muted small" id="sPcStatus"></span></div>
    <div class="row" id="pcDeviceRow" ${settings.audioSource === "pc" ? "" : "hidden"}><label for="sDevice">${t("deviceName")}<small>${t("deviceNameHint")}</small></label>
      <input id="sDevice" type="text" autocomplete="off" maxlength="40" placeholder="${esc(deviceName())}" value="${esc(settings.deviceName || "")}" style="max-width:11rem"></div>
    <div class="row"><label for="sPack">${t("visualPack")}<small>${t("visualPackHint")}</small></label>
      <select id="sPack">${packs.map(p => opt(p.id, settings.visualPack, L(p.title))).join("")}</select></div>
    <div class="row-btns"><span class="s-stage mini"><span class="s-visual" data-vis="${esc(settings.visualPack || "gateway")}"></span></span><button class="btn" data-act="gallery">${t("galleryOpen")}</button></div>
  </div>
  ${isNative ? `<h2>${t("androidTitle")}</h2>
  <div class="panel" id="androidPanel">
    <div class="row-btns"><button class="btn" id="sNotifAllow">${t("androidAllow")}</button><span class="muted small" id="sNotifStatus">…</span></div>
    <div class="row-btns"><button class="btn" id="sExactOpen">${t("androidExactOpen")}</button><span class="muted small" id="sExactStatus">…</span></div>
    <p class="muted small">${t("androidHint")}</p>
    <p class="muted small" id="sAndroidVersion"></p>
  </div>` : ""}
  <h2>${t("appearance")}</h2>
  <div class="panel">
    <div class="row"><label for="sTheme">${t("theme")}</label><select id="sTheme">${opt("auto", settings.theme, t("themeAuto"))}${opt("dark", settings.theme, t("themeDark"))}${opt("light", settings.theme, t("themeLight"))}</select></div>
    <div class="row"><label for="sFont">${t("fontSize")}</label><select id="sFont">${opt(0.9, settings.fontScale, t("fontSmall"))}${opt(1, settings.fontScale, t("normal"))}${opt(1.15, settings.fontScale, t("fontLarge"))}${opt(1.3, settings.fontScale, t("fontXLarge"))}</select></div>
    <div class="row"><label for="sMotion">${t("motion")}<small>${t("motionHint")}</small></label><select id="sMotion">${opt("auto", settings.motion, t("motionAuto"))}${opt("reduce", settings.motion, t("motionReduce"))}${opt("full", settings.motion, t("motionFull"))}</select></div>
  </div>
  <button class="btn big" id="sTest">${t("testSound")}</button>
  <button class="btn big" id="sFocus">${t("focusLevels")}</button>
  <details class="panel warn"><summary>${t("safety")}</summary><p>${t("safetyText")}</p></details>
  <details class="panel"><summary>${t("about")}</summary><p>${t("aboutText")}</p></details>`;
  const bind = (id, key, conv) => { $(id).onchange = e => { settings[key] = conv(e.target); saveSettings(); if (key === "lang") { applyLang(); renderSettings(); scheduleCommandReminders(); scheduleRealityChecks(); } if (key === "theme" || key === "motion" || key === "fontScale") applyAppearance(); }; };
  bind("sLang", "lang", el => el.value);
  bind("sVoice", "voiceVol", el => +el.value);
  bind("sRec", "recordedVoice", el => el.checked);
  bind("sBed", "bedVol", el => +el.value);
  bind("sBell", "bellVol", el => +el.value);
  bind("sAmb", "ambience", el => +el.value);
  bind("sPause", "pauseScale", el => +el.value);
  bind("sRemind", "remind", el => +el.value);
  bind("sAwake", "keepAwake", el => el.checked);
  bind("sFade", "sleepFade", el => +el.value || 2);
  bind("sBreath", "breathGuide", el => el.checked);
  $("sHpRemind").onchange = e => {
    setReminderHours(e.target.value);
    $("sHpStatus").textContent = settings.hpRemind ? t("remWindow", { a: String(settings.rcFrom ?? 9).padStart(2, "0"), b: String(settings.rcTo ?? 22).padStart(2, "0") }) : "";
    if (!settings.hpRemind) return;
    if (isNative) notifyPermission(true).then(() => scheduleCommandReminders());
    else { try { if (typeof Notification !== "undefined" && Notification.permission === "default") Notification.requestPermission(); } catch {} }
  };
  if (isNative) paintAndroidPanel();
  $("sHpNow").onclick = () => { if (!commandReminder(true)) toast(t("hpNone")); };
  bind("sTheme", "theme", el => el.value);
  bind("sFont", "fontScale", el => +el.value);
  bind("sMotion", "motion", el => el.value);
  bind("sTtsRate", "ttsRate", el => +el.value);
  bind("sTtsVoice", "ttsVoice", el => el.value);
  // device voices arrive asynchronously on some browsers
  const ttsStatus = $("sTtsStatus"), ttsSel = $("sTtsVoice");
  if (!ttsSupported()) { ttsStatus.textContent = t("ttsUnsupported"); ttsSel.disabled = true; $("sTtsRate").disabled = true; $("sTtsTest").disabled = true; }
  else onVoices(() => {
    const vs = ttsVoices(settings.lang);
    ttsSel.innerHTML = `<option value="">${t("themeAuto")}</option>` + vs.map(v => `<option value="${esc(v.voiceURI)}" ${v.voiceURI === settings.ttsVoice ? "selected" : ""}>${esc(v.name)}${v.localService === false ? " ☁" : ""}</option>`).join("");
    ttsStatus.textContent = vs.length ? "" : t("ttsNoVoices");
  });
  $("sTtsTest").onclick = () => { if (!speak(t("ttsSample"), settings.lang)) toast(t("ttsUnsupported")); };
  const syncPcRows = () => {
    const on = settings.audioSource === "pc";
    $("pcRow").hidden = !on;
    $("pcTestRow").hidden = !on;
    $("pcDeviceRow").hidden = !on;
    if (on && !isNative && location.protocol === "https:" && !$("pcMixedWarn")) {
      const w = document.createElement("p");
      w.id = "pcMixedWarn"; w.className = "small"; w.style.color = "var(--danger)";
      w.textContent = t("pcMixed");
      $("pcTestRow").after(w);
    }
  };
  $("sSource").onchange = e => { settings.audioSource = e.target.value; saveSettings(); syncPcRows(); };
  const pcUrlEl = $("sPcUrl");
  if (pcUrlEl) pcUrlEl.onchange = e => { settings.pcUrl = e.target.value.trim(); saveSettings(); };
  $("sDevice").onchange = e => { settings.deviceName = e.target.value.trim().slice(0, 40); saveSettings(); };
  $("sLibrary").onclick = () => openLibrary();
  syncPcRows();
  $("sPack").onchange = e => { settings.visualPack = e.target.value; saveSettings(); view.querySelectorAll("[data-vis]").forEach(b => { b.dataset.vis = settings.visualPack; }); paintVisualBoxes("focus10"); };
  paintVisualBoxes("focus10");
  $("sPcTest").onclick = async () => {
    const st = $("sPcStatus");
    st.textContent = t("pcTesting");
    if (!settings.pcUrl) { st.textContent = t("pcFailed"); return; }
    try { const j = await pcPing(); st.textContent = t("pcConnected", { n: j.tracks }); }
    catch { st.textContent = t("pcFailed"); }
  };
  $("sTest").onclick = () => { unlockAudio(); playTest(settings.lang).catch(err => toast(String(err))); };
  $("sFocus").onclick = () => openFocusSheet();
}

// ---------- focus levels sheet ----------
function openFocusSheet() {
  const sheet = document.createElement("div");
  sheet.className = "sheet-wrap";
  sheet.innerHTML = `<div class="sheet" role="dialog" aria-modal="true">
    <h2>${t("focusLevels")}</h2>
    <p class="muted small">${t("focusSheetIntro")}</p>
    <ol class="focus-list">${focusLevels.map(f => `<li>
      <b>${t("focusLevel", { n: f.id })} — ${esc(L(f.title))}</b>
      <small class="muted">${f.band ? t("focusBand", { b: esc(L(f.band)) }) : ""}${f.beat ? t("focusBeat", { b: f.beat }) : ""}${f.wave ? t("focusInWave", { w: f.wave }) : ""}</small>
      <p class="small">${esc(L(f.text))}</p></li>`).join("")}</ol>
    <button class="btn big" data-close>${t("back")}</button></div>`;
  mountSheet(sheet);
}

// ---------- safety sheet ----------
function openSafetySheet() {
  const sheet = document.createElement("div");
  sheet.className = "sheet-wrap";
  sheet.innerHTML = `<div class="sheet" role="dialog" aria-modal="true">
    <h2>${t("safety")}</h2>
    <p>${t("safetyText")}</p>
    <p class="muted small">${t("aboutText")}</p>
    <button class="btn big" data-close>${t("back")}</button></div>`;
  mountSheet(sheet);
}

// ---------- techniques tab ----------
const TECH_CATS = { prep: "catPrep", protection: "catProtection", tools: "catTools", breathing: "catBreathing", mental: "catMental", communication: "catCommunication", exploration: "catExploration", theory: "catTheory" };
let currentTech = null;
function renderTechniques() {
  const groups = [];
  for (const tech of techniques) {
    let g = groups.find(x => x.cat === tech.category);
    if (!g) groups.push(g = { cat: tech.category, items: [] });
    g.items.push(tech);
  }
  view.innerHTML = `<h1>${t("tabTechniques")}</h1><p class="muted">${t("techniquesIntro")}</p>
    <button class="ref-card" data-act="gallery"><span class="ex-ref">◎</span><span class="ex-main"><span class="ex-title">${t("galleryTitle")}</span><span class="ex-sum">${t("galleryCard", { n: packs.length })}</span></span></button>` +
    groups.map(g => `<h2 class="sec-h">${t(TECH_CATS[g.cat] || g.cat)}</h2>
      <div class="list">${g.items.map(x => `<button class="ex-card tech" data-tech="${x.id}">
        <span class="ex-ref">${esc(x.no)}</span>
        <span class="ex-main"><span class="ex-title">${esc(L(x.title))}</span>
        <span class="ex-sum">${esc(L(x.short))}</span></span>
        ${storyboards[x.id] ? `<span class="ex-thumb" aria-hidden="true">${renderThumb(x.id, settings.lang)}</span>` : ""}</button>`).join("")}</div>`).join("");
}
function openTechnique(id) {
  const tech = techniques.find(x => x.id === id);
  if (!tech) return;
  currentTech = tech;
  enter("technique");
  renderTechniqueDetail();
  window.scrollTo(0, 0);
}
function renderTechniqueDetail() {
  const tech = currentTech;
  const sections = (tech.sections || []).map(s => `
    <details class="panel" open><summary>${esc(L(s.h))}</summary>
      ${s.p ? `<p>${s.p.map(x => esc(L(x))).join("</p><p>")}</p>` : ""}
      ${s.steps ? `<ol class="steps">${s.steps.map(x => `<li>${esc(L(x))}</li>`).join("")}</ol>` : ""}
    </details>`).join("");
  view.innerHTML = `
  <button class="back" data-act="back">‹ ${t("back")}</button>
  <div class="d-head"><span class="eyebrow">${t("tabTechniques")}</span>
    <div class="d-title-row"><h1>${esc(L(tech.title))}</h1></div>
    <p>${esc(L(tech.short))}</p></div>
  ${storyboards[tech.id] ? `<section class="sb-wrap"><h2 class="sec-h">${t("techStoryboard")}</h2><div id="techSb"></div><p class="sb-hint">${t("techStoryboardHint")}</p></section>` : ""}
  ${sections}
  ${tech.tips?.length ? `<details class="panel"><summary>${t("tips")}</summary><ul>${tech.tips.map(x => `<li>${esc(L(x))}</li>`).join("")}</ul></details>` : ""}
  ${tech.warnings?.length ? `<details class="panel warn" open><summary>${t("warnings")}</summary><ul>${tech.warnings.map(x => `<li>${esc(L(x))}</li>`).join("")}</ul></details>` : ""}`;
  mountStoryboard($("techSb"), tech.id);
}
/** Storyboard player labels in the current UI language. */
const sbLabels = () => ({ step: (i, n) => t("sbStep", { i, n }), play: t("sbPlay"), pause: t("sbPause"), prev: t("sbPrev"), next: t("sbNext") });
function mountStoryboard(el, id) {
  sweepPlayers();
  if (!el || !storyboards[id]) return null;
  return createPlayer(el, id, settings.lang, sbLabels());
}

// ---------- visual gallery: every pack in every session state, select by tapping ----------
const VIS_STATES = ["prep", "focus10", "focus12", "focus15", "focus21", "focus27", "explore", "return"];
let galState = "focus10";
const visStateLabel = st => { const m = /^focus(\d+)$/.exec(st); return m ? t("focusLevel", { n: m[1] }) : t({ prep: "visPrep", explore: "visExplore", return: "visReturn" }[st] || "visExplore"); };
/** Fill every `[data-vis="<pack>"]` box in the view with that pack's rendering for `state`. */
function paintVisualBoxes(state) {
  view.querySelectorAll("[data-vis]").forEach(box => {
    const id = box.dataset.vis;
    renderVisual(id, state, settings.lang).then(html => { if (box.isConnected && box.dataset.vis === id) box.innerHTML = html; });
  });
}
function renderGallery() {
  current = null; currentTech = null;
  view.innerHTML = `<button class="back" data-act="back">‹ ${t("back")}</button>
    <div class="d-head"><h1>${t("galleryTitle")}</h1><p class="muted small">${t("galleryIntro")}</p></div>
    <div class="tag-pills gal-states">${VIS_STATES.map(st => `<button class="pill ${st === galState ? "on" : ""}" data-vstate="${st}">${esc(visStateLabel(st))}</button>`).join("")}</div>
    <div class="gal-grid">${packs.map(p => { const on = p.id === (settings.visualPack || "gateway"); return `<button class="gal-card ${on ? "on" : ""}" data-vpack="${p.id}" aria-pressed="${on}">
      <span class="s-stage"><span class="s-visual" data-vis="${p.id}"></span></span>
      <b>${esc(L(p.title))}</b><small>${on ? t("gallerySelected") : t("gallerySelect")}</small></button>`; }).join("")}</div>
    <p class="note">${t("galleryNote")}</p>
    <button class="btn big" data-act="galfull">${t("galleryFull")}</button>`;
  paintGallery();
}
function paintGallery() { paintVisualBoxes(galState); }
/** Full-size preview of the selected pack, as it appears during a session. */
function openGalleryFull() {
  const sheet = document.createElement("div");
  sheet.className = "sheet-wrap gal-full";
  const title = L(packs.find(p => p.id === (settings.visualPack || "gateway"))?.title || packs[0].title);
  sheet.innerHTML = `<div class="gal-full-stage" role="dialog" aria-modal="true">
    <div class="s-stage big"><div class="s-visual" id="galFullVis"></div></div>
    <p class="muted">${esc(title)} · <span id="galFullState">${esc(visStateLabel(galState))}</span></p>
    <div class="tag-pills">${VIS_STATES.map(st => `<button class="pill ${st === galState ? "on" : ""}" data-fstate="${st}">${esc(visStateLabel(st))}</button>`).join("")}</div>
    <button class="btn big" data-close>${t("back")}</button></div>`;
  const paint = () => renderVisual(settings.visualPack || "gateway", galState, settings.lang).then(h => { const b = sheet.querySelector("#galFullVis"); if (b) b.innerHTML = h; });
  sheet.addEventListener("click", e => {
    const f = e.target.closest("[data-fstate]");
    if (!f) return;
    galState = f.dataset.fstate;
    sheet.querySelectorAll("[data-fstate]").forEach(b => b.classList.toggle("on", b.dataset.fstate === galState));
    sheet.querySelector("#galFullState").textContent = visStateLabel(galState);
    view.querySelectorAll("[data-vstate]").forEach(b => b.classList.toggle("on", b.dataset.vstate === galState));
    paint(); paintGallery();                          // the grid behind follows the newly picked state
  });
  mountSheet(sheet);
  paint();
}

// ---------- Hemi-Sync reference catalogue (titles without a session; playable from the PC source) ----------
let refCat = "all", refQ = "", refTag = "", refCol = "";
const refMatches = new Map();   // item id → [{ path, url, title }] from the PC library
const refTagName = k => L(reference.tags[k] || { tr: k, en: k });
const refCatOf = id => reference.categories.find(c => c.id === id);
const refColOf = id => (reference.collections || []).find(c => c.id === id);
const REF_CAT_ORDER = reference.categories.map(c => c.id);
const refSortKey = it => it.title.replace(/^(the|a|an)\s+/i, "");
/** Closest in-app sessions for a reference title: the curated list, else defaults by tag (max 3). */
function relatedFor(it) {
  const out = [];
  const add = id => { if (getEx(id) && !out.includes(id)) out.push(id); };
  (it.related || []).forEach(add);
  if (!out.length) for (const tg of it.tags || []) (reference.relatedByTag?.[tg] || []).forEach(add);
  return out.slice(0, 3);
}
/** Reference titles pointing at a session (curated `related` only) and the collections that list it. */
function refBacklinks(id) {
  return {
    items: reference.items.filter(it => (it.related || []).includes(id)).slice(0, 6),
    cols: (reference.collections || []).filter(c => (c.sessions || []).includes(id)),
  };
}
function openReference(o = {}) {
  refCat = o.cat || "all"; refQ = o.q || ""; refTag = o.tag || ""; refCol = o.col || "";
  refFrom = o.from || null;
  enter("reference", { push: !!o.from });
  renderReference();
  const el = o.item && view.querySelector(`[data-ref="${o.item}"]`);
  if (el) { el.classList.add("hl"); el.scrollIntoView?.({ block: "start" }); } else window.scrollTo(0, 0);
}
function renderReference() {
  current = null;
  const q = refQ.trim().toLocaleLowerCase(settings.lang);
  const col = refColOf(refCol);
  if (refCol && !col) refCol = "";
  const items = reference.items.filter(it => (refCat === "all" || it.cat === refCat) &&
    (!col || col.items.includes(it.id)) &&
    (!refTag || (it.tags || []).includes(refTag)) &&
    (!q || [it.title, it.creator || "", it.code || "", ...(it.hints || []), L(it.desc), ...(it.tags || []).map(refTagName), L(refCatOf(it.cat)?.title || "")].join(" ").toLocaleLowerCase(settings.lang).includes(q)))
    .sort((a, b) => (REF_CAT_ORDER.indexOf(a.cat) - REF_CAT_ORDER.indexOf(b.cat)) || refSortKey(a).localeCompare(refSortKey(b), "en"));
  const pc = pcConfigured();
  const chip = (id, label) => `<button class="pill ${refCat === id ? "on" : ""}" data-refcat="${id}">${esc(label)}</button>`;
  const colChip = c => `<button class="pill ${refCol === c.id ? "on" : ""}" data-refcol="${c.id}" aria-pressed="${refCol === c.id}">${esc(L(c.title))} <small>${c.items.length}</small></button>`;
  const sessionLinks = ids => ids.filter(getEx).map(id => `<button class="link" data-open="${id}">${esc(L(getEx(id).title))}</button>`).join(" · ");
  view.innerHTML = `<button class="back" data-act="back">‹ ${t("back")}</button>
    <div class="d-head"><h1>${t("refTitle")}</h1><p class="muted small">${t("refIntro")}</p></div>
    ${pc ? "" : `<p class="note">${t("refPcOff")}</p>`}
    ${reference.collections?.length ? `<p class="eyebrow ref-cols-cap">${t("refCols")}</p><div class="tag-pills ref-cols">${reference.collections.map(colChip).join("")}</div>` : ""}
    ${col ? `<section class="ref-col"><p>${esc(L(col.intro))}</p>${col.sessions?.filter(getEx).length ? `<p class="small"><b>${t("refColSessions")}:</b> ${sessionLinks(col.sessions)}</p>` : ""}</section>` : ""}
    <div class="tag-pills ref-cats">${chip("all", t("refAll"))}${reference.categories.map(c => chip(c.id, L(c.title))).join("")}</div>
    ${refCat !== "all" && !col ? `<p class="muted small">${esc(L(refCatOf(refCat).intro))}</p>` : ""}
    <label class="search"><span class="sr">${t("refSearch")}</span><input id="rq" type="search" placeholder="${t("refSearch")}" value="${esc(refQ)}" autocomplete="off"></label>
    <p class="muted small ref-count">${t("refCount", { n: items.length })}${refTag ? ` · ${t("refTagFilter")}: <button class="pill on" data-reftag="">${esc(refTagName(refTag))} ✕</button>` : ""}</p>
    <div class="list ref-list">${items.map(it => `<article class="ref-item" data-ref="${it.id}">
      <header><b>${esc(it.title)}</b><span class="ref-cat">${esc(L(refCatOf(it.cat)?.title || ""))}</span></header>
      ${it.creator || it.code ? `<p class="muted small">${esc(it.creator || "")}${it.code ? ` <span class="ref-code">${esc(it.code)}</span>` : ""}</p>` : ""}
      <p>${esc(L(it.desc))}</p>
      ${it.tags?.length ? `<div class="tag-pills">${it.tags.map(k => `<button class="pill ${refTag === k ? "on" : ""}" data-reftag="${k}">${esc(refTagName(k))}</button>`).join("")}</div>` : ""}
      ${relatedFor(it).length ? `<p class="small">${t("refRelated")}: ${sessionLinks(relatedFor(it))}</p>` : ""}
      <div class="ref-pc" data-refpc="${it.id}">${pc ? `<span class="track-chip">${t("refScanning")}</span>` : ""}</div>
    </article>`).join("") || `<p class="muted">${t("refNoResults")}</p>`}</div>`;
  const qi = $("rq");
  qi.oninput = () => { refQ = qi.value; const pos = qi.selectionStart; renderReference(); const n = $("rq"); n.focus(); n.setSelectionRange(pos, pos); };
  if (pc) for (const it of items) resolveRefMatches(it);
}
function paintRefMatches(it, list) {
  const box = view.querySelector(`[data-refpc="${it.id}"]`);
  if (!box) return;
  box.innerHTML = !list.length ? `<span class="track-chip">${t("refNotFound")}</span>`
    : `<span class="track-chip on">${t("refFound", { n: list.length })}</span>
       <ul class="ref-tracks">${list.map((x, i) => `<li><button class="link" data-refplay="${it.id}" data-i="${i}" title="${esc(x.path)}">▶ ${esc(x.title)}</button></li>`).join("")}</ul>`;
}
async function resolveRefMatches(it) {
  const key = settings.pcUrl + "|" + it.id;
  if (!refMatches.has(key)) refMatches.set(key, await findTracksForHints(it.hints));
  paintRefMatches(it, refMatches.get(key));
}
/** Play one file of a reference title straight from the PC (no guidance); an album continues with the next file. */
function playRefTrack(itemId, i) {
  const it = reference.items.find(x => x.id === itemId);
  const list = refMatches.get(settings.pcUrl + "|" + itemId) || [];
  const track = list[i];
  if (!it || !track) return;
  const title = it.title + (list.length > 1 ? ` · ${track.title}` : "");
  const pseudo = { id: "ref:" + it.id, title: { tr: title, en: title } };
  unlockAudio();
  withResume({ ...track }, list[i + 1] || null).then(tr => startSession({
    title, packs: [], night: false, logId: "ref:" + it.id, track: tr,
    build: () => ({ duration: 3600, phases: [{ id: "track", name: { tr: it.title, en: it.title }, start: 0 }], events: [], bed: [] }),
    onFinish: r => {
      if (r.completed && i + 1 < list.length) return playRefTrack(itemId, i + 1);
      showDone(pseudo, r);
    },
  }));
}

// ---------- my library: every folder on the PC ----------
let libQ = "", libData = null, libOpen = new Set();
function openLibrary() {
  enter("library");
  libQ = "";
  renderLibrary();
  window.scrollTo(0, 0);
}
const fmtSize = b => (b >= 1 << 30 ? (b / (1 << 30)).toFixed(1) + " GB" : b >= 1 << 20 ? Math.round(b / (1 << 20)) + " MB" : Math.round(b / 1024) + " KB");
async function renderLibrary(force = false) {
  current = null;
  view.innerHTML = `<button class="back" data-act="back">‹ ${t("back")}</button>
  <div class="d-head"><h1>▤ ${t("libTitle")}</h1><p class="muted small">${t("libIntro")}</p></div>
  <div class="lib-tools"><input id="lq" type="search" placeholder="${t("libSearch")}" value="${esc(libQ)}" autocomplete="off"><button class="btn" data-lib="rescan">${t("libRescan")}</button></div>
  <p class="muted small" id="libSum">${t("libLoading")}</p><div id="libBody"></div>`;
  const qi = $("lq");
  qi.oninput = () => { libQ = qi.value; paintLibrary(); };
  if (!pcConfigured()) { $("libSum").textContent = t("libEmpty"); return; }
  try { libData = await pcLibrary(force); } catch { libData = null; }
  if (subView !== "library") return;
  paintLibrary();
}
function paintLibrary() {
  const sum = $("libSum"), body = $("libBody");
  if (!sum || !body) return;
  if (!libData || !libData.total) { sum.textContent = t("libEmpty"); body.innerHTML = ""; return; }
  const positions = store.get("pos", {});
  const q = libQ.trim().toLocaleLowerCase(settings.lang);
  sum.textContent = t("libSummary", { n: libData.total, f: libData.folders.length, m: libData.matched });
  const folders = libData.folders.map(f => ({ ...f, files: q ? f.files.filter(x => x.path.toLocaleLowerCase(settings.lang).includes(q) || (x.session && L(getEx(x.session)?.title || "").toLocaleLowerCase(settings.lang).includes(q))) : f.files })).filter(f => f.files.length);
  if (!folders.length) { body.innerHTML = `<p class="muted">${t("libNoResults")}</p>`; return; }
  body.innerHTML = folders.map(f => `<details class="panel lib-folder" data-folder="${esc(f.path)}" ${q || libOpen.has(f.path) || folders.length === 1 ? "open" : ""}>
    <summary><span class="lib-fname">${esc(f.path || "/")}</span><small class="muted">${t("libFiles", { n: f.files.length })}</small><button class="chip" data-libplayall="${esc(f.path)}">▶ ${t("libPlayAll")}</button></summary>
    <ul class="lib-files">${f.files.map(x => { const ex = x.session ? getEx(x.session) : null; const rp = resumePointFor(x.path, positions); return `<li>
      <button class="link lib-play" data-libplay="${esc(x.path)}"><b>▶ ${esc(x.name)}</b><small>${fmtSize(x.size)}${rp ? ` · ${t("libResume", { t: fmtClock(rp) })}` : ""}</small></button>
      ${ex ? `<button class="chip on lib-session" data-open="${esc(x.session)}" title="${esc(L(waveOf(x.session)?.title || ""))}">${esc(L(ex.title))}${x.manual ? " ✎" : ""}</button>` : ""}
      <button class="chip lib-assign" data-libassign="${esc(x.path)}" aria-label="${t("libAssign")}">${ex ? "✎" : t("libAssign")}</button></li>`; }).join("")}</ul></details>`).join("");
  body.querySelectorAll("details.lib-folder").forEach(d => { d.ontoggle = () => { if (d.open) libOpen.add(d.dataset.folder); else libOpen.delete(d.dataset.folder); }; });
}
document.addEventListener("click", async e => {
  if (subView !== "library" && !e.target.closest(".sheet-wrap")) return;
  const rs = e.target.closest("[data-lib=\"rescan\"]");
  if (rs) { rs.disabled = true; try { const n = await pcRescan(); toast(t("libRescanned", { n })); } catch { toast(t("pcFailed")); } if (subView === "library") renderLibrary(true); return; }
  const pa = e.target.closest("[data-libplayall]");
  if (pa) { e.preventDefault(); const f = libData?.folders.find(x => x.path === pa.dataset.libplayall); if (f) playLibraryFile(f.files.map(x => x.path), 0); return; }
  const pl = e.target.closest("[data-libplay]");
  if (pl) return playLibraryFile([pl.dataset.libplay], 0);
  const as = e.target.closest("[data-libassign]");
  if (as) return openAssignSheet(as.dataset.libassign);
});
/** Play PC files in order (one file, or a whole folder); the next one is pre-buffered near the end and the place is remembered. */
async function playLibraryFile(queue, i) {
  const path = queue[i];
  if (!path) return;
  unlockAudio();
  const track = await withResume(trackOf(path), queue[i + 1] ? trackOf(queue[i + 1]) : null);
  const title = track.title + (queue.length > 1 ? ` · ${i + 1}/${queue.length}` : "");
  const folder = path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : t("libTitle");
  const pseudo = { id: "pc:" + path, title: { tr: title, en: title } };
  startSession({
    title, packs: [], night: false, logId: "pc:" + path, track,
    build: () => ({ duration: 3600, phases: [{ id: "track", name: { tr: folder, en: folder }, start: 0 }], events: [], bed: [] }),
    onFinish: r => {
      if (r.completed && i + 1 < queue.length) return playLibraryFile(queue, i + 1);
      showDone(pseudo, r);
    },
  });
}
/** Sheet: which session is this file? Sessions whose official track names fit the file come first. */
function openAssignSheet(path) {
  const lib = libData, curId = lib?.folders.flatMap(f => f.files).find(x => x.path === path)?.session || null;
  const manual = !!lib?.folders.flatMap(f => f.files).find(x => x.path === path && x.manual);
  const sheet = document.createElement("div");
  sheet.className = "sheet-wrap";
  sheet.innerHTML = `<div class="sheet pick" role="dialog" aria-modal="true"><h2>${t("assignTitle")}</h2><p class="muted small">${esc(path)}</p>
    <input id="aq" type="search" placeholder="${t("assignSearch")}" autocomplete="off">
    <div class="pick-list"></div>
    <div class="row-btns">${manual ? `<button class="btn" data-assignrm>${t("assignRemove")}</button>` : ""}<button class="btn" data-close>${t("back")}</button></div></div>`;
  mountSheet(sheet);
  const list = sheet.querySelector(".pick-list"), q = sheet.querySelector("#aq");
  const ranked = allIds.map(id => ({ id, s: rankFilesFor(id, [path])[0]?.s ?? -1 })).sort((a, b) => b.s - a.s);
  const paint = () => {
    const needle = q.value.trim().toLocaleLowerCase(settings.lang);
    const rows = ranked.filter(r => { const ex = getEx(r.id); return !needle || L(ex.title).toLocaleLowerCase(settings.lang).includes(needle) || r.id.includes(needle) || L(waveOf(r.id)?.title || "").toLocaleLowerCase(settings.lang).includes(needle); }).slice(0, 80);
    list.innerHTML = rows.length ? `<ul class="lib-files">${rows.map(r => { const ex = getEx(r.id); return `<li><button class="link ${r.id === curId ? "on" : ""}" data-assign="${r.id}"><b>${esc(L(ex.title))}</b><small>${esc(L(waveOf(r.id)?.title || ""))}${r.id === curId ? ` · ${t("pickCurrent")}` : ""}${r.s > 69 ? " · ★" : ""}</small></button></li>`; }).join("")}</ul>` : `<p class="muted">${t("noResults")}</p>`;
  };
  q.oninput = paint;
  paint();
  sheet.addEventListener("click", async e => {
    const a = e.target.closest("[data-assign]"), rm = e.target.closest("[data-assignrm]");
    if (!a && !rm) return;
    const r = await saveMatch(a ? a.dataset.assign : curId, a ? path : null);
    toast(a ? t(r.shared ? "pcMatchSaved" : "pcMatchLocal") : t("pcMatchCleared"));
    closeSheet(sheet);
    if (subView === "library") {                      // repaint in place: keep the list and the scroll position
      try { libData = await pcLibrary(); } catch {}
      if (subView === "library") paintLibrary();
    }
  });
}
// ---------- boot ----------
applyAppearance();
applyLang();
window.addEventListener("gateway:window", () => scheduleCommandReminders());   // the reminder window changed in the journal
go(tab);
if (isNative) {
  // channels first (localised names), then the two-day reminder queue
  initNative({
    channels: { session: t("androidChSession"), remind: t("androidChRemind"), wake: t("androidChWake") },
    onResume: () => { scheduleRealityChecks(); scheduleCommandReminders(); },   // keep two days of reminders queued
    onNotification: ({ kind, foreground, tapped, body }) => {
      if (foreground && body) { toast((kind === "hp" ? "✦ " : kind === "rc" ? "☾ " : "") + body); try { localStorage.setItem(kind === "hp" ? "gateway.hpLast" : "gateway.rcLast", String(Date.now())); } catch {} }
      if (tapped && kind === "rc") go("journal");
      if (tapped && kind === "hp") go("home");
    },
  }).finally(() => { scheduleRealityChecks(); scheduleCommandReminders(); });
} else {
  scheduleRealityChecks();
  scheduleCommandReminders();
  if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(() => {});
}
