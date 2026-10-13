// Journal tab: session entries (edit / delete), dream journal mode (morning entry, dream signs, lucidity),
// Markdown export, print/PDF, backup, and the reality-check reminder that runs while the app is open.
import { t, L, fmtDur, fmtClock, TAG_KEYS, DREAM_SIGN_KEYS } from "./i18n.js";
import { settings, saveSettings, store, getLog, dayKey, streak, journal, dreamSigns, exportBackup, importBackup } from "./store.js";
import { pcConfigured, pcBackupPush, pcBackupPull, deviceName } from "./pcsource.js";
import { isNative, shareFile, scheduleReminders, reminderSlots, notifyPermission } from "./native.js";

const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const toast = msg => { const el = document.createElement("div"); el.className = "toast"; el.textContent = msg; document.body.appendChild(el); setTimeout(() => el.remove(), 2200); };
const locale = () => (settings.lang === "tr" ? "tr-TR" : "en-GB");
const when = at => new Date(at).toLocaleString(locale(), { dateStyle: "medium", timeStyle: "short" });
const isDream = e => e.kind === "dream";
/** Dream-sign label: preset keys translate, custom signs are shown as typed. */
const signLabel = k => (DREAM_SIGN_KEYS.includes(k) ? t(k) : k);
// Entries can come from an imported or PC-pulled backup, so every field is untrusted here:
/** Drawings are canvas PNG data URLs; anything else is not shown. */
const imgSrc = s => (typeof s === "string" && /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(s) ? s : "");
/** Lucidity / recall as an integer 0…max. */
const level = (v, max) => Math.min(max, Math.max(0, Math.trunc(Number(v)) || 0));
const list = v => (Array.isArray(v) ? v : []);

let mode = "sessions";          // "sessions" | "dreams"
let editing = null;             // entry id being edited
let composing = false;          // dream form open
let draft = { signs: new Set(), lucid: 0, recall: 2 };

/** Next render of the journal opens in dream mode with the morning entry form ready (used after sleep sessions). */
export function openDreamComposer() { mode = "dreams"; composing = true; editing = null; draft = { signs: new Set(), lucid: 0, recall: 2 }; }

// ---------- rendering ----------
const clock = ms => new Date(ms).toLocaleString(settings.lang === "tr" ? "tr-TR" : "en-GB", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
/** "Last backup: … · last restore: …" for the PC sync panel. */
function pcSyncLine() {
  const s = store.get("pcSync", {});
  return t("pcSyncLast", { p: s.pushedAt ? clock(s.pushedAt) : t("never"), q: s.pulledAt ? clock(s.pulledAt) : t("never") });
}
export async function renderJournal() {
  const view = $("view");
  const log = getLog();
  const total = log.reduce((a, x) => a + x.sec, 0);
  view.innerHTML = `<h1>${t("tabJournal")}</h1>
    <div class="seg jmode" role="tablist">
      <button role="tab" data-jmode="sessions" aria-pressed="${mode === "sessions"}">${t("journalSessions")}</button>
      <button role="tab" data-jmode="dreams" aria-pressed="${mode === "dreams"}">☾ ${t("journalDreams")}</button>
    </div>
    ${mode === "sessions" ? `
    <div class="stats left"><div><b>${streak()}</b><span>${t("streak", { n: "" }).trim()}</span></div><div><b>${fmtDur(total)}</b><span>${t("totalTime", { d: "" }).trim()}</span></div><div><b>${log.length}</b><span>${t("todaySessions").replace(/today|bugünkü/i, "").trim()}</span></div></div>
    ${heatmap(log)}` : `<p class="note">${t("dreamIntro")}</p><div id="dreamStats"></div>`}
    <div id="entries"><p class="muted">…</p></div>
    <section class="backup">
      <p class="note">${t("exportHint")}</p>
      <div class="actions"><button class="btn" id="jMd">${t("exportMd")}</button><button class="btn" id="jPrint" ${isNative ? "hidden" : ""}>${t("printPdf")}</button></div>
      <p class="note">${t("backupHint")}</p>
      <div class="actions"><button class="btn" id="bkExport">${t("backupExport")}</button><button class="btn" id="bkImport">${t("backupImport")}</button><input type="file" id="bkFile" accept="application/json,.json" hidden></div>
      <p class="muted" id="bkMsg"></p>
      ${pcConfigured() ? `<p class="note">${t("pcSyncHint")}</p>
      <div class="actions"><button class="btn" id="bkPcPush">⇡ ${t("pcPush")}</button><button class="btn" id="bkPcPull">⇣ ${t("pcPull")}</button></div>
      <p class="muted" id="bkPcMsg">${pcSyncLine()}</p>` : ""}
    </section>`;
  const pcMsg = $("bkPcMsg");
  if (pcMsg) {
    $("bkPcPush").onclick = async () => {
      pcMsg.textContent = t("pcSyncing");
      try { const r = await pcBackupPush(await exportBackup(), deviceName()); pcMsg.textContent = t("pcPushed", { d: r.device || deviceName(), t: clock(Date.now()) }); }
      catch { pcMsg.textContent = t("pcSyncFail"); }
    };
    $("bkPcPull").onclick = async () => {
      pcMsg.textContent = t("pcSyncing");
      try {
        const got = await pcBackupPull();
        if (!got) { pcMsg.textContent = t("pcPullNone"); return; }
        const r = await importBackup(got.backup);
        pcMsg.textContent = t("pcPulled", { d: got.device || "PC", t: got.at ? clock(Date.parse(got.at) || Date.now()) : "", j: r.journal, l: r.log });
        setTimeout(renderJournal, 1200);
      } catch (e) { pcMsg.textContent = e && e.message === "format" ? t("backupBad") : t("pcSyncFail"); }
    };
  }
  view.querySelectorAll("[data-jmode]").forEach(b => { b.onclick = () => { mode = b.dataset.jmode; editing = null; composing = false; renderJournal(); }; });
  $("bkExport").onclick = async () => download(JSON.stringify(await exportBackup(), null, 1), `gateway-backup-${dayKey()}.json`, "application/json");
  $("bkImport").onclick = () => $("bkFile").click();
  $("bkFile").onchange = async e => {
    const f = e.target.files?.[0]; if (!f) return;
    try { const r = await importBackup(JSON.parse(await f.text())); $("bkMsg").textContent = t("backupDone", { j: r.journal, l: r.log }); setTimeout(renderJournal, 900); }
    catch { $("bkMsg").textContent = t("backupBad"); }
  };
  $("jMd").onclick = async () => download(await toMarkdown(await journal.all()), `gateway-journal-${dayKey()}.md`, "text/markdown");
  $("jPrint").onclick = () => { document.body.classList.add("printing"); const done = () => { document.body.classList.remove("printing"); window.removeEventListener("afterprint", done); }; window.addEventListener("afterprint", done); try { window.print(); } catch {} setTimeout(done, 1500); };
  const entries = (await journal.all()).filter(e => (mode === "dreams") === isDream(e));
  const box = $("entries");
  if (!box) return;
  if (mode === "dreams") paintDreamStats(entries);
  box.innerHTML = (mode === "dreams" ? dreamComposer() : "") + (entries.length ? entries.map(e => (editing === e.id ? editForm(e) : entryCard(e))).join("") : `<p class="muted">${t(mode === "dreams" ? "dreamsEmpty" : "journalEmpty")}</p>`);
  wireComposer(box);
  box.onclick = async e => {
    const del = e.target.closest("[data-del]");
    if (del) { await journal.remove(del.dataset.del); return renderJournal(); }
    const ed = e.target.closest("[data-edit]");
    if (ed) { editing = ed.dataset.edit; composing = false; return renderJournal(); }
    const pill = e.target.closest(".edit-form [data-tag]");
    if (pill) { pill.classList.toggle("on"); return; }
    const rmd = e.target.closest("[data-rmdraw]");
    if (rmd) { const f = rmd.closest(".edit-form"); f.dataset.rmdraw = "1"; f.querySelector("img")?.remove(); rmd.remove(); return; }
    const cancel = e.target.closest("[data-cancel]");
    if (cancel) { editing = null; return renderJournal(); }
    const save = e.target.closest("[data-saveedit]");
    if (save) {
      const f = save.closest(".edit-form");
      const patch = { text: f.querySelector("textarea").value.trim(), tags: [...f.querySelectorAll("[data-tag].on")].map(p => p.dataset.tag) };
      if (f.dataset.rmdraw) patch.drawing = null;
      if (f.dataset.kind === "dream") {
        patch.signs = patch.tags; delete patch.tags;
        patch.lucid = Number(f.querySelector("[data-lucid]").value);
        patch.recall = Number(f.querySelector("[data-recall]").value);
        const custom = f.querySelector("[data-customsign]")?.value.trim();
        if (custom) { dreamSigns.add(custom); if (!patch.signs.includes(custom)) patch.signs.push(custom); }
      }
      await journal.update(editing, patch);
      editing = null; toast(t("saved")); return renderJournal();
    }
  };
}

function entryCard(en) {
  const dream = isDream(en);
  const tags = dream ? list(en.signs).map(signLabel) : list(en.tags).map(k => t(k));
  const lucid = level(en.lucid, 3), recall = level(en.recall, 3), img = imgSrc(en.drawing);
  return `<article class="entry ${dream ? "dream" : ""}" data-id="${esc(en.id)}">
    <header><b>${dream ? "☾ " + esc(en.title || t("dreamTitle")) : esc(en.title ? L(en.title) : t("programTab"))}</b>
      <small class="muted">${when(en.at)}${dream ? "" : " · " + fmtClock(en.sec)}${en.editedAt ? ` · ${t("edited")}` : ""}</small></header>
    ${dream ? `<div class="tag-pills static"><span class="pill lucid l${lucid}">${t("lucid" + lucid)}</span>${recall ? `<span class="pill">${t("recallLevel")}: ${t("recall" + recall)}</span>` : ""}</div>` : ""}
    ${tags.length ? `<div class="tag-pills static">${tags.map(x => `<span class="pill on">${esc(x)}</span>`).join("")}</div>` : ""}
    ${en.text ? `<p>${esc(en.text)}</p>` : ""}${img ? `<img src="${img}" alt="">` : ""}
    <div class="row-btns"><button class="link" data-edit="${esc(en.id)}">${t("editEntry")}</button><button class="link danger" data-del="${esc(en.id)}">${t("deleteEntry")}</button></div>
  </article>`;
}

function editForm(en) {
  const dream = isDream(en);
  const chosen = new Set(dream ? list(en.signs) : list(en.tags));
  const pills = dream ? [...DREAM_SIGN_KEYS, ...dreamSigns.custom(), ...[...chosen].filter(k => !DREAM_SIGN_KEYS.includes(k) && !dreamSigns.custom().includes(k))] : TAG_KEYS;
  const img = imgSrc(en.drawing);
  return `<article class="entry edit-form" data-kind="${dream ? "dream" : "session"}">
    <header><b>${t("editEntry")}</b><small class="muted">${when(en.at)}</small></header>
    ${dream ? lucidRow(level(en.lucid, 3), level(en.recall, 3) || 2) : ""}
    <p class="small"><b>${dream ? t("dreamSigns") : t("tags")}</b></p>
    <div class="tag-pills">${pills.map(k => `<button type="button" class="pill ${chosen.has(k) ? "on" : ""}" data-tag="${esc(k)}">${esc(dream ? signLabel(k) : t(k))}</button>`).join("")}</div>
    ${dream ? `<div class="row-inline"><input type="text" data-customsign placeholder="${t("customSign")}" maxlength="40"></div>` : ""}
    <textarea rows="4" placeholder="${dream ? t("dreamPlaceholder") : t("notePlaceholder")}">${esc(en.text || "")}</textarea>
    ${img ? `<img src="${img}" alt=""><button class="link" data-rmdraw>${t("removeDrawing")}</button>` : ""}
    <div class="row-btns"><button class="btn" data-cancel>${t("cancel")}</button><button class="btn primary" data-saveedit>${t("save")}</button></div>
  </article>`;
}

const lucidRow = (lucid, recall) => `<div class="row"><label>${t("lucidity")}</label><select data-lucid>${[0, 1, 2, 3].map(i => `<option value="${i}" ${i === lucid ? "selected" : ""}>${t("lucid" + i)}</option>`).join("")}</select></div>
  <div class="row"><label>${t("recallLevel")}</label><select data-recall>${[1, 2, 3].map(i => `<option value="${i}" ${i === recall ? "selected" : ""}>${t("recall" + i)}</option>`).join("")}</select></div>`;

// ---------- dream composer ----------
function dreamComposer() {
  if (!composing) return `<button class="btn primary big" id="newDream">☾ ${t("newDream")}</button>${rcPanel()}`;
  const pills = [...DREAM_SIGN_KEYS, ...dreamSigns.custom()];
  return `<article class="entry edit-form composer" data-kind="dream">
    <header><b>${t("newDream")}</b><small class="muted">${when(Date.now())}</small></header>
    <textarea id="dreamText" rows="5" placeholder="${t("dreamPlaceholder")}"></textarea>
    ${lucidRow(draft.lucid, draft.recall)}
    <p class="small"><b>${t("dreamSigns")}</b> — ${t("dreamSignsHint")}</p>
    <div class="tag-pills" id="dreamSigns">${pills.map(k => `<button type="button" class="pill ${draft.signs.has(k) ? "on" : ""}" data-sign="${esc(k)}">${esc(signLabel(k))}</button>`).join("")}</div>
    <div class="row-inline"><input type="text" id="customSign" placeholder="${t("customSign")}" maxlength="40"><button class="btn" id="addSign">${t("addSign")}</button></div>
    <div class="row-btns"><button class="btn" id="dreamCancel">${t("cancel")}</button><button class="btn primary" id="dreamSave">${t("save")}</button></div>
  </article>${rcPanel()}`;
}
function wireComposer(box) {
  const nd = $("newDream");
  if (nd) nd.onclick = () => { composing = true; editing = null; draft = { signs: new Set(), lucid: 0, recall: 2 }; renderJournal(); };
  const signs = $("dreamSigns");
  if (signs) signs.onclick = e => { const p = e.target.closest("[data-sign]"); if (!p) return; const k = p.dataset.sign; draft.signs.has(k) ? draft.signs.delete(k) : draft.signs.add(k); p.classList.toggle("on"); };
  const add = $("addSign");
  if (add) add.onclick = () => {
    const v = $("customSign").value.trim(); if (!v) return;
    dreamSigns.add(v); draft.signs.add(v); $("customSign").value = "";
    draft.lucid = Number(box.querySelector("[data-lucid]").value); draft.recall = Number(box.querySelector("[data-recall]").value);
    const text = $("dreamText").value; renderJournal().then(() => { const ta = $("dreamText"); if (ta) ta.value = text; });
  };
  const cancel = $("dreamCancel");
  if (cancel) cancel.onclick = () => { composing = false; renderJournal(); };
  const save = $("dreamSave");
  if (save) save.onclick = async () => {
    const text = $("dreamText").value.trim();
    if (!text && !draft.signs.size) return;
    await journal.add({ kind: "dream", exId: "dream", title: null, sec: 0, text, signs: [...draft.signs], lucid: Number(box.querySelector("[data-lucid]").value), recall: Number(box.querySelector("[data-recall]").value), drawing: null });
    composing = false; toast(t("saved")); renderJournal();
  };
  const rc = $("rcEvery");
  if (rc) {
    rc.onchange = () => { settings.rcEvery = Number(rc.value); saveSettings(); scheduleRealityChecks(); if (settings.rcEvery) askNotify(); };
    // the window is shared with the Human Plus reminders (app.js re-syncs those on the same event)
    $("rcFrom").onchange = () => { settings.rcFrom = Number($("rcFrom").value); saveSettings(); scheduleRealityChecks(); window.dispatchEvent(new Event("gateway:window")); };
    $("rcTo").onchange = () => { settings.rcTo = Number($("rcTo").value); saveSettings(); scheduleRealityChecks(); window.dispatchEvent(new Event("gateway:window")); };
    $("rcNow").onclick = () => realityCheck(true);
    if (isNative) refreshNotifyStatus();
  }
}
function paintDreamStats(entries) {
  const el = $("dreamStats"); if (!el) return;
  const lucid = entries.filter(e => level(e.lucid, 3) >= 2).length;
  const freq = new Map();
  entries.forEach(e => list(e.signs).forEach(s => freq.set(s, (freq.get(s) || 0) + 1)));
  const top = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  el.innerHTML = `<div class="stats left"><div><b>${entries.length}</b><span>${t("dreamCount")}</span></div><div><b>${lucid}</b><span>${t("lucidCount")}</span></div><div><b>${freq.size}</b><span>${t("signCount")}</span></div></div>
    ${top.length ? `<div class="panel top-signs"><p class="small"><b>${t("topSigns")}</b></p><div class="tag-pills static">${top.map(([s, n]) => `<span class="pill on">${esc(signLabel(s))} · ${n}</span>`).join("")}</div><p class="muted small">${t("topSignsHint")}</p></div>` : ""}`;
}

// ---------- reality-check reminders (web: only while the app is open; Android: scheduled notifications) ----------
const hourOpts = (cur) => Array.from({ length: 24 }, (_, h) => `<option value="${h}" ${h === cur ? "selected" : ""}>${String(h).padStart(2, "0")}:00</option>`).join("");
function rcPanel() {
  return `<section class="panel rc"><p class="small"><b>${t("rcTitle")}</b></p>
    <div class="row"><label for="rcEvery">${t("rcTitle")}</label><select id="rcEvery">${[0, 1, 2, 3, 4].map(h => `<option value="${h}" ${h === (settings.rcEvery || 0) ? "selected" : ""}>${h ? t("rcEvery", { h }) : t("rcOff")}</option>`).join("")}</select></div>
    <div class="row"><label>${t("rcWindow")}</label><span class="row-inline"><select id="rcFrom">${hourOpts(settings.rcFrom ?? 9)}</select> – <select id="rcTo">${hourOpts(settings.rcTo ?? 22)}</select></span></div>
    <p class="muted small">${t("rcHint")}</p>
    <div class="row-btns"><button class="btn" id="rcNow">${t("rcNow")}</button><span class="muted small" id="rcStatus">${notifyStatus()}</span></div>
  </section>`;
}
const notifyStatus = () => (!isNative && typeof Notification !== "undefined" && Notification.permission === "granted" ? t("notifyOn") : (settings.rcEvery && !isNative ? t("notifyOff") : ""));
async function refreshNotifyStatus(ask = false) {
  const p = await notifyPermission(ask);
  const el = $("rcStatus"); if (el && p) el.textContent = p === "granted" ? t("notifyOn") : t("notifyOff");
}
async function askNotify() {
  if (isNative) { await refreshNotifyStatus(true); return scheduleRealityChecks(); }
  try { if (typeof Notification !== "undefined" && Notification.permission === "default") await Notification.requestPermission(); } catch {}
  const el = $("rcStatus"); if (el) el.textContent = notifyStatus();
}
let rcTimer = null;
/** Android: (re)schedule the next two days of reality-check notifications; they fire with the app closed. */
export function syncNativeRealityChecks() {
  if (!isNative) return Promise.resolve(0);
  const slots = settings.rcEvery ? reminderSlots({ every: settings.rcEvery, from: settings.rcFrom ?? 9, to: settings.rcTo ?? 22 }) : [];
  return scheduleReminders("rc", slots.map(at => ({ at, title: t("rcTitle"), body: t("rcBody") })));
}
export function scheduleRealityChecks() {
  clearInterval(rcTimer); rcTimer = null;
  if (isNative) { syncNativeRealityChecks(); return; }
  if (!settings.rcEvery) return;
  rcTimer = setInterval(() => {
    const h = new Date().getHours(), from = settings.rcFrom ?? 9, to = settings.rcTo ?? 22;
    const inWindow = from <= to ? h >= from && h < to : h >= from || h < to;
    const last = Number(localStorage.getItem("gateway.rcLast") || 0);
    if (inWindow && Date.now() - last >= settings.rcEvery * 3600e3) realityCheck(false);
  }, 60e3);
}
/** Show the reality-check prompt: in-app toast always; a web notification when permitted (also reaches a backgrounded tab). */
export function realityCheck(manual) {
  try { localStorage.setItem("gateway.rcLast", String(Date.now())); } catch {}
  toast("☾ " + t("rcBody"));
  if (!manual && !isNative && typeof Notification !== "undefined" && Notification.permission === "granted") {
    const show = () => new Notification(t("rcTitle"), { body: t("rcBody"), tag: "gateway-rc", silent: false });
    try { navigator.serviceWorker?.ready?.then(r => r.showNotification(t("rcTitle"), { body: t("rcBody"), tag: "gateway-rc" })).catch(show); } catch { try { show(); } catch {} }
  }
}

// ---------- export ----------
async function download(text, name, type) {
  if (isNative && await shareFile(text, name, type, name)) return;       // Android: share sheet (Drive, mail, files…)
  const blob = new Blob([text], { type });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => { try { URL.revokeObjectURL(a.href); } catch {} }, 5000);
}
/** The whole journal as Markdown: sessions and dreams in time order, tags as lists, drawings embedded as data URLs. */
export async function toMarkdown(entries) {
  const log = getLog();
  const total = log.reduce((a, x) => a + x.sec, 0);
  const out = [`# ${t("appName")} — ${t("tabJournal")}`, "", `${t("totalTime", { d: fmtDur(total) })} · ${log.length} ${t("journalSessions").toLowerCase()} · ${entries.filter(isDream).length} ${t("dreamCount")}`, "", `_${new Date().toLocaleString(locale())}_`, ""];
  for (const en of [...entries].sort((a, b) => b.at - a.at)) {
    const dream = isDream(en);
    out.push(`## ${when(en.at)} — ${dream ? "☾ " + (en.title || t("dreamTitle")) : (en.title ? L(en.title) : t("programTab"))}${dream ? "" : ` (${fmtClock(en.sec)})`}`, "");
    const recall = level(en.recall, 3), img = imgSrc(en.drawing);
    if (dream) out.push(`- **${t("lucidity")}:** ${t("lucid" + level(en.lucid, 3))}`, recall ? `- **${t("recallLevel")}:** ${t("recall" + recall)}` : null);
    const tags = dream ? list(en.signs).map(signLabel) : list(en.tags).map(k => t(k));
    if (tags.length) out.push(`- **${dream ? t("dreamSigns") : t("tags")}:** ${tags.join(", ")}`);
    if (en.editedAt) out.push(`- _${t("edited")}: ${when(en.editedAt)}_`);
    out.push("");
    if (en.text) out.push(String(en.text).replace(/\r?\n/g, "  \n"), "");
    if (img) out.push(`![${t("draw")}](${img})`, "");
  }
  return out.filter(x => x !== null).join("\n");
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
