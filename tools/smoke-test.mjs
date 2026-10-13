// End-to-end smoke test: boots the built app in jsdom and walks through the whole UI
// (home → detail → session → done → programme → journal → settings → search).
//
// Dev dependencies (NOT part of the app): jsdom + esbuild, installed in a scratch dir:
//   mkdir /tmp/smoke && cd /tmp/smoke && npm init -y && npm i jsdom esbuild
//   npx esbuild <repo>/www/js/app.js --bundle --format=iife --outfile=/tmp/smoke/app.bundle.js
//   SMOKE_DIR=/tmp/smoke node <repo>/tools/smoke-test.mjs
import { createRequire } from "node:module";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SMOKE_DIR = process.env.SMOKE_DIR || "/tmp/smoke";
const require = createRequire(join(SMOKE_DIR, "package.json"));
const { JSDOM } = require("jsdom");
const WWW = join(root, "www");
const BUNDLE = process.env.SMOKE_BUNDLE || join(SMOKE_DIR, "app.bundle.js");
const html = readFileSync(`${WWW}/index.html`, "utf8");
const contentJs = readFileSync(`${WWW}/content.js`, "utf8");
const bundle = readFileSync(BUNDLE, "utf8");

const dom = new JSDOM(html, { url: "https://gateway.local/", runScripts: "dangerously", pretendToBeVisual: true });
const { window } = dom;
const { document } = window;

// jsdom lacks these; the app guards most of them, polyfill the rest
window.URL.createObjectURL = () => "blob:smoke";
window.URL.revokeObjectURL = () => {};

let pass = 0, fail = 0;
const ok = (cond, name) => { cond ? pass++ : fail++; console.log(`${cond ? "PASS" : "FAIL"} ${name}`); };
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));

// inject content + app bundle as inline scripts
const s1 = document.createElement("script"); s1.textContent = contentJs; document.body.appendChild(s1);
const s2 = document.createElement("script"); s2.textContent = bundle; document.body.appendChild(s2);
await sleep(300);

// ---------- home ----------
ok($("#view h1")?.textContent === "Gateway", "home renders, app title");
ok($$(".ex-card").length === 145, `home lists 145 session cards (${$$(".ex-card").length})`);
ok($$(".wave-head").length === 17, "17 wave sections");
ok($$(".series-block").length === 7, "7 series sections");
ok($('[data-open="ffp-metamorphosite"]') != null, "Prospecting card present (Metamorphosite)");
ok($('[data-open="hp-attention"]') != null, "Human Plus card present (Attention)");
ok($$(".quick-card").length === 3, "3 quick cards");
ok($$("[data-tab]").length === 7, "7 tabs in the nav");
ok($("#q") != null, "search input");

// Human Plus detail shows the function command
$('[data-open="hp-attention"]').click();
await sleep(100);
ok(/Dikkat|Attention/.test($(".d-head h1")?.textContent || ""), "Human Plus detail opens (Dikkat/Attention)");
ok(($(".cmd-chip b")?.textContent || "") === "Plus Focus", "function command chip shows Plus Focus");
$('[data-act="back"]').click();
await sleep(100);

// ---------- detail ----------
$('[data-open="w2-intro-12"]').click();
await sleep(100);
ok($(".d-head h1")?.textContent.length > 0, "detail view opens with title");
ok($(".focus-strip .focus-pill")?.textContent.includes("F12"), "focus pill shows F12");
ok($$(".seg button").length === 3, "3 length presets");
ok($('[data-d="start"]') != null, "start button");
await sleep(200);
ok($(".d-visual [data-vis] svg") != null, "detail shows the selected visual pack preview");
ok(window.history.state?.v === "detail", "opening a detail pushes a history entry (phone back button)");
// change preset to short
$$('.seg button')[1].click();
await sleep(50);
ok($$('.seg button')[1].getAttribute("aria-pressed") === "true", "preset switches to Short");
// favorite toggle
$('.icon-btn.fav').click();
await sleep(50);
ok($(".icon-btn.fav").classList.contains("on"), "favorite toggles on");

// ---------- start a session (jsdom: audio element is fake, but the whole pipeline runs) ----------
$('[data-d="start"]').click();
await sleep(600);
ok($("#session") && !$("#session").hidden, "session overlay opens");
ok(window.history.state?.v === "session", "session pushes its own history entry");
window.history.back();
await sleep(200);
ok(!$("#session").hidden && window.history.state?.v === "session", "hardware back during a session keeps it running");
ok($(".s-title")?.textContent.length > 0, "session title shown");
ok($(".s-phase")?.textContent.length > 0, `session phase shown (${$(".s-phase")?.textContent})`);
ok(($(".s-say")?.textContent || "").length > 0, `current line text shown (${($(".s-say")?.textContent || "").slice(0, 40)})`);
ok(/Focus 10/.test($(".s-focus")?.textContent || ""), `focus readout shows Focus 10 during prep (${$(".s-focus")?.textContent})`);
ok(/7.5 Hz/.test($(".s-focus")?.textContent || ""), "prep readout shows the 7.5 Hz beat");
// skip to the entry phase → the bed glides to Focus 12
$('[data-a="skip"]').click();
await sleep(300);
ok(/Focus 12/.test($(".s-focus")?.textContent || ""), `focus readout follows to Focus 12 (${$(".s-focus")?.textContent})`);
ok(/4.5 Hz/.test($(".s-focus")?.textContent || ""), "entry readout shows the 4.5 Hz beat");
ok(/Hz/.test($(".s-focus")?.textContent || ""), "focus readout shows beat Hz");
ok($(".s-visual svg") != null, "gateway portal visual rendered");
ok($('[data-a="pause"]') != null, "controls rendered");
// pause/resume/stop controls
$('[data-a="pause"]').click(); await sleep(100);
ok($(".s-sub")?.textContent === "Paused", "pause works");
$('[data-a="pause"]').click(); await sleep(100);
$('[data-a="stop"]').click(); await sleep(100);
ok($(".s-confirm") && !$(".s-confirm").hidden, "stop shows confirmation");
$('[data-a="yes"]').click(); await sleep(300);
ok($("#session").hidden, "session ends after confirm");
ok(/Tamamlandı|Oturum bitirildi|Complete|ended/.test($(".done-mark")?.textContent || ""), "done screen shows");
ok($$(".pill").length === 12, "12 experience tags on done screen");
// save a journal entry
$('[data-tag="tagVibration"]').click();
$("#note").value = "Smoke test notu — titreşim hissettim.";
$('[data-n="save"]').click();
await sleep(400);
ok(true, "journal entry save attempted");
$('[data-act="back"]').click();
await sleep(250);
ok($("#q") != null, "done screen back returns home");
ok(window.history.state == null, "leaving for a tab root unwinds all pushed history entries");
// hardware back from a detail view goes home instead of leaving the app
$('[data-open="w2-intro-12"]').click();
await sleep(100);
window.history.back();
await sleep(250);
ok($("#q") != null && window.history.state == null, "hardware back from a detail returns to the list");

// ---------- program tab ----------
$('[data-tab="program"]').click();
await sleep(300);
ok(/Programme|Program/.test($("#view h1")?.textContent || ""), "program tab renders");
ok($$(".routine li").length === 2, `default routine has 2 sessions (${$$(".routine li").length})`);
ok($$('[data-wave]').length === 17, "17 wave quick-start cards");
ok($$(".path li").length === 145, "learning path lists 145 sessions");
ok($$(".path li.next").length === 1, "one suggested-next session highlighted");

// ---------- journal tab ----------
$('[data-tab="journal"]').click();
await sleep(400);
ok(/Journal|Günlük/.test($("#view h1")?.textContent || ""), "journal tab renders");
ok($(".heat") != null, "heatmap rendered");
// backup: export produces a JSON blob with the saved entry; import merges it back (idempotent)
ok($("#bkExport") != null && $("#bkImport") != null, "journal backup buttons present");
{
  let captured = null, clicked = null;
  const origCreate = window.URL.createObjectURL, origClick = window.HTMLAnchorElement.prototype.click;
  window.URL.createObjectURL = b => { captured = b; return "blob:backup"; };
  window.HTMLAnchorElement.prototype.click = function () { clicked = this.download; };
  $("#bkExport").click();
  await sleep(300);
  window.URL.createObjectURL = origCreate; window.HTMLAnchorElement.prototype.click = origClick;
  ok(/^gateway-backup-\d{4}-\d{2}-\d{2}\.json$/.test(clicked || ""), `backup download named by date (${clicked})`);
  const txt = captured ? await captured.text() : "";
  let data = null; try { data = JSON.parse(txt); } catch {}
  ok(data && data.format === "gateway-backup/1" && Array.isArray(data.journal) && Array.isArray(data.log), "backup JSON has format, journal and log");
  ok(data && data.journal.some(e => /Smoke test notu/.test(e.text || "")), "backup contains the journal entry saved after the session");
  const before = $$(".entry").length;
  const file = new window.File([JSON.stringify(data)], "gateway-backup.json", { type: "application/json" });
  Object.defineProperty($("#bkFile"), "files", { value: [file], configurable: true });
  $("#bkFile").dispatchEvent(new window.Event("change"));
  await sleep(300);
  ok(/Yedek yüklendi|Backup restored/.test($("#bkMsg")?.textContent || ""), `import reports success (${$("#bkMsg")?.textContent})`);
  await sleep(1100);
  ok($$(".entry").length === before, `re-importing the same backup does not duplicate entries (${before} → ${$$(".entry").length})`);
  const badFile = new window.File(["{\"x\":1}"], "x.json", { type: "application/json" });
  Object.defineProperty($("#bkFile"), "files", { value: [badFile], configurable: true });
  $("#bkFile").dispatchEvent(new window.Event("change"));
  await sleep(300);
  ok(/değil|not a Gateway backup/.test($("#bkMsg")?.textContent || ""), "import rejects a non-backup file");
  // a crafted backup (hand-edited file, or a slot on the PC server) must not inject markup into the journal
  const evil = { format: "gateway-backup/1", log: [], journal: [
    { id: "xss-s", at: 1000, exId: "w1-orientation", sec: 60, text: "s", tags: ["<b id=xssT>"], drawing: "data:x\" onerror=\"window.__xss=1" },
    { id: "xss-d", at: 2000, kind: "dream", text: "d", signs: "not-a-list", lucid: "<img id=xssL src=x onerror=\"window.__xss=2\">", recall: "<i id=xssR>", drawing: "javascript:alert(1)" },
  ] };
  Object.defineProperty($("#bkFile"), "files", { value: [new window.File([JSON.stringify(evil)], "evil.json", { type: "application/json" })], configurable: true });
  $("#bkFile").dispatchEvent(new window.Event("change"));
  await sleep(1300);
  const sCard = $('.entry[data-id="xss-s"]');
  ok(sCard != null && !sCard.querySelector("img") && !$("#xssT") && sCard.textContent.includes("<b id=xssT>"), "imported session entry: unknown tag shown as text, non-image drawing dropped");
  $('[data-jmode="dreams"]').click(); await sleep(300);
  const dCard = $('.entry[data-id="xss-d"]');
  ok(dCard != null && !dCard.querySelector("img") && !$("#xssL") && !$("#xssR") && dCard.querySelector(".pill.lucid.l0") != null, "imported dream entry: lucidity/recall coerced to numbers, no injected markup");
  ok(window.__xss === undefined, "no script ran from the crafted backup");
  dCard?.querySelector("[data-del]")?.click(); await sleep(300);
  $('[data-jmode="sessions"]').click(); await sleep(300);
  $('.entry[data-id="xss-s"] [data-del]')?.click(); await sleep(300);
  ok(!$('.entry[data-id="xss-s"]'), "crafted entries removed again");
}

// ---------- journal: edit an entry ----------
{
  const card = $(".entry[data-id]");
  ok(card != null && card.querySelector("[data-edit]") != null, "session entry has an edit button");
  card.querySelector("[data-edit]").click();
  await sleep(300);
  const form = $(".entry.edit-form");
  ok(form != null && form.querySelector("textarea") != null, "edit form opens inline with the note");
  ok(/Smoke test notu/.test(form?.querySelector("textarea")?.value || ""), "edit form is pre-filled with the existing note");
  ok(form && form.querySelectorAll("[data-tag]").length >= 5, "edit form lists the tag pills");
  const firstOff = form && [...form.querySelectorAll("[data-tag]")].find(p => !p.classList.contains("on"));
  firstOff?.click();
  ok(firstOff && firstOff.classList.contains("on"), "tag pill toggles on in the edit form");
  form.querySelector("textarea").value = "Smoke test notu (düzenlendi) ikinci satır";
  form.querySelector("[data-cancel]").click();
  await sleep(300);
  ok($(".entry.edit-form") == null && /Smoke test notu/.test($(".entry[data-id] p")?.textContent || "") && !/düzenlendi/.test($(".entry[data-id] p")?.textContent || ""), "cancel discards the edit");
  $(".entry[data-id] [data-edit]").click();
  await sleep(300);
  const f2 = $(".entry.edit-form");
  const pill2 = [...f2.querySelectorAll("[data-tag]")].find(p => !p.classList.contains("on"));
  const pillKey = pill2?.dataset.tag; pill2?.click();
  f2.querySelector("textarea").value = "Smoke test notu (düzenlendi) ikinci satır";
  f2.querySelector("[data-saveedit]").click();
  await sleep(400);
  const saved = $(".entry[data-id]");
  ok(saved && /düzenlendi\) ikinci satır/.test(saved.querySelector("p")?.textContent || ""), "saved edit updates the note text");
  ok(saved && /düzenlendi|edited/.test(saved.querySelector("small")?.textContent || ""), "edited entries are marked as edited");
  ok(saved && pillKey && saved.querySelectorAll(".pill.on").length >= 1, "saved edit keeps the toggled tag");
  const lsJ = JSON.parse(window.localStorage.getItem("gateway.journal") || "[]");   // jsdom has no IndexedDB → localStorage fallback
  const edited = lsJ.find(e => /ikinci satır/.test(e.text || ""));
  ok(edited && typeof edited.editedAt === "number" && edited.at <= edited.editedAt, "update() persists text and editedAt");
}

// ---------- journal: Markdown export + print ----------
{
  ok($("#jMd") != null && $("#jPrint") != null, "Markdown export and print buttons present");
  let captured = null, clicked = null;
  const origCreate = window.URL.createObjectURL, origClick = window.HTMLAnchorElement.prototype.click;
  window.URL.createObjectURL = b => { captured = b; return "blob:md"; };
  window.HTMLAnchorElement.prototype.click = function () { clicked = this.download; };
  $("#jMd").click();
  await sleep(300);
  window.URL.createObjectURL = origCreate; window.HTMLAnchorElement.prototype.click = origClick;
  ok(/^gateway-journal-\d{4}-\d{2}-\d{2}\.md$/.test(clicked || ""), `Markdown download named by date (${clicked})`);
  const md = captured ? await captured.text() : "";
  ok(md.startsWith("# ") && /\n## /.test(md), "Markdown has a title and one heading per entry");
  ok(/ikinci satır/.test(md), "Markdown contains the edited note");
  ok(captured && captured.type === "text/markdown", "Markdown blob has the markdown MIME type");
  let printed = 0;
  window.print = () => { printed++; };
  $("#jPrint").click();
  ok(printed === 1 && document.body.classList.contains("printing"), "print button calls window.print with the printing class set");
  window.dispatchEvent(new window.Event("afterprint"));
  ok(!document.body.classList.contains("printing"), "printing class is removed after printing");
}

// ---------- journal: dream mode ----------
{
  ok($$("[data-jmode]").length === 2, "journal has a sessions / dreams switch");
  $('[data-jmode="dreams"]').click();
  await sleep(300);
  ok($('[data-jmode="dreams"]').getAttribute("aria-pressed") === "true", "dream mode selected");
  ok($$(".entry[data-id]").length === 0 && /rüya|dream/i.test($("#entries")?.textContent || ""), "dream mode hides session entries and shows the empty state");
  ok($("#rcEvery") != null && $("#rcFrom") != null && $("#rcTo") != null && $("#rcNow") != null, "reality-check settings present in dream mode");
  ok($("#newDream") != null, "new dream button present");
  $("#newDream").click();
  await sleep(300);
  ok($("#dreamText") != null && $$("#dreamSigns [data-sign]").length >= 18, "dream composer opens with the dream-sign presets");
  $("#dreamText").value = "Uçuyordum ve ellerime baktım, altı parmak vardı.";
  $('#dreamSigns [data-sign="dsFlying"]').click();
  $('#dreamSigns [data-sign="dsHands"]').click();
  ok($('#dreamSigns [data-sign="dsFlying"]').classList.contains("on"), "dream sign toggles on");
  $("#customSign").value = "Mavi kapı";
  $("#addSign").click();
  await sleep(300);
  ok($('#dreamSigns [data-sign="Mavi kapı"]')?.classList.contains("on") && $("#dreamText").value.includes("Uçuyordum"), "custom dream sign is added, selected and the draft text survives");
  ok($('#dreamSigns [data-sign="dsFlying"]').classList.contains("on"), "preset selection survives adding a custom sign");
  $("[data-lucid]").value = "2";
  $("[data-recall]").value = "3";
  $("#dreamSave").click();
  await sleep(400);
  const dream = $(".entry.dream[data-id]");
  ok(dream != null, "dream entry saved and listed");
  ok(dream && /Uçuyordum/.test(dream.textContent) && dream.querySelector(".pill.lucid.l2") != null, "dream entry shows the text and the lucidity badge");
  ok(dream && [...dream.querySelectorAll(".pill.on")].some(p => /Mavi kapı/.test(p.textContent)) && [...dream.querySelectorAll(".pill.on")].some(p => /uçmak|flying/i.test(p.textContent)), "dream entry shows preset and custom dream signs");
  const stats = $("#dreamStats");
  ok(stats && stats.querySelectorAll(".stats b")[0]?.textContent === "1" && stats.querySelectorAll(".stats b")[1]?.textContent === "1" && stats.querySelectorAll(".stats b")[2]?.textContent === "3", "dream stats count dreams, lucid dreams and distinct signs");
  ok(stats && stats.querySelectorAll(".top-signs .pill").length === 3, "top dream signs listed");
  // custom signs persist in the store and show up in the next composer
  ok(JSON.parse(window.localStorage.getItem("gateway.dreamSigns") || "[]").includes("Mavi kapı"), "custom dream sign persisted");
  // edit the dream: change lucidity, add a sign
  dream.querySelector("[data-edit]").click();
  await sleep(300);
  const df = $(".entry.edit-form[data-kind=\"dream\"]");
  ok(df != null && df.querySelector("[data-lucid]")?.value === "2" && df.querySelector("[data-tag=\"dsFlying\"]")?.classList.contains("on"), "dream edit form pre-fills lucidity and signs");
  df.querySelector("[data-lucid]").value = "3";
  df.querySelector("[data-tag=\"dsText\"]").click();
  df.querySelector("[data-saveedit]").click();
  await sleep(400);
  const dream2 = $(".entry.dream[data-id]");
  ok(dream2 && dream2.querySelector(".pill.lucid.l3") != null && dream2.querySelectorAll(".pill.on").length === 4, "dream edit saves lucidity and the new sign");
  // sessions list is untouched by dream entries
  $('[data-jmode="sessions"]').click();
  await sleep(300);
  ok($$(".entry.dream").length === 0 && $$(".entry[data-id]").length >= 1, "sessions mode lists only session entries");
  $('[data-jmode="dreams"]').click();
  await sleep(300);
  // reality-check settings persist and the manual test shows the prompt
  $("#rcEvery").value = "2"; $("#rcEvery").dispatchEvent(new window.Event("change"));
  $("#rcFrom").value = "8"; $("#rcFrom").dispatchEvent(new window.Event("change"));
  $("#rcTo").value = "23"; $("#rcTo").dispatchEvent(new window.Event("change"));
  const st = JSON.parse(window.localStorage.getItem("gateway.settings") || "{}");
  ok(st.rcEvery === 2 && st.rcFrom === 8 && st.rcTo === 23, "reality-check interval and window persist in settings");
  $("#rcNow").click();
  await sleep(50);
  ok([...$$(".toast")].some(x => /Rüyada mısın|Are you dreaming/.test(x.textContent)), "manual reality check shows the prompt");
  ok(Number(window.localStorage.getItem("gateway.rcLast") || 0) > Date.now() - 5000, "reality check records its timestamp");
  // delete the dream
  $(".entry.dream [data-del]").click();
  await sleep(400);
  ok($$(".entry.dream").length === 0, "dream entry deleted");
  $('[data-jmode="sessions"]').click();
  await sleep(300);
}

// ---------- settings tab ----------
$('[data-tab="settings"]').click();
await sleep(200);
ok($("#sBed") != null, "bed volume setting present");
ok($("#sTest") != null, "binaural test button present");
$("#sFocus").click();
await sleep(100);
ok($$(".focus-list li").length === 12, "focus levels sheet lists 12 levels");
document.querySelector(".sheet-wrap .btn")?.click();
// PC audio source: settings rows, connection test (fetch polyfilled), track chips
ok($("#sSource") != null, "audio source setting present");
await sleep(200);
ok($(".row-btns [data-vis] svg") != null, "settings show a live preview of the selected visual pack");
ok($('.row-btns [data-act="gallery"]') != null, "settings link to the visual gallery");
ok($("#sPcUrl") != null, "PC server address setting present");
// fake PC server (pc-server.py v0.3 surface): index + shared state (manual matches, positions, backups)
const pcState = { matches: {}, positions: {}, backup: null, posts: [] };
window.fetch = async (url, opts = {}) => {
  const u = String(url), path = u.replace(/^https?:\/\/[^/]+/, "").replace(/\?.*$/, "");
  const J = obj => ({ ok: true, status: 200, json: async () => obj });
  if (u.endsWith("guide/index.json")) return { ok: true, json: async () => JSON.parse(readFileSync(join(WWW, "guide/index.json"), "utf8")) };
  const gm = /guide\/(tr|en)\/([^/]+\.md)$/.exec(u);
  if (gm) return { ok: true, text: async () => readFileSync(join(WWW, "guide", gm[1], gm[2]), "utf8") };
  if (u.endsWith("research/index.json")) return { ok: true, json: async () => JSON.parse(readFileSync(join(WWW, "research/index.json"), "utf8")) };
  const rm = /research\/(tr|en)\/([^/]+\.md)$/.exec(u);
  if (rm && existsSync(join(WWW, "research", rm[1], rm[2]))) return { ok: true, text: async () => readFileSync(join(WWW, "research", rm[1], rm[2]), "utf8") };
  if (!/^https?:\/\/pc\.local/.test(u)) return { ok: false, status: 404, json: async () => ({}) };
  if (opts.method === "POST") {
    const body = JSON.parse(opts.body || "{}");
    pcState.posts.push({ path, body });
    if (path === "/matches") { if (body.path) pcState.matches[body.id] = body.path; else delete pcState.matches[body.id]; return J({ ok: true, matches: { ...pcState.matches } }); }
    if (path === "/positions") { if (body.done || !(body.pos > 0)) delete pcState.positions[body.path]; else pcState.positions[body.path] = { pos: body.pos, dur: body.dur, at: Date.now() }; return J({ ok: true, count: Object.keys(pcState.positions).length }); }
    if (path === "/backup") { pcState.backup = { device: body.device, at: "2026-10-10T12:00:00+03:00", ts: Date.now(), backup: body.backup }; return J({ ok: true, device: body.device, at: pcState.backup.at, size: 1000, backups: [{ device: body.device }] }); }
    return { ok: false, status: 404, json: async () => ({}) };
  }
  if (path === "/ping") return J({ ok: true, tracks: 2, app: true, version: "0.3", features: ["matches", "positions", "backup"] });
  if (path === "/rescan") return J({ count: 5 });
  if (path === "/index.json") return J({ files: [
    { path: "Wave I Discovery/02 Introduction to Focus 10.flac", size: 1 },
    { path: "Human Plus/Attention.flac", size: 1 },
    { path: "Mind Food/Super Sleep.flac", size: 1 },
    { path: "Metamusic/Higher/01 Higher Part 1.flac", size: 1 },
    { path: "Metamusic/Higher/02 Higher Part 2.flac", size: 1 },
  ] });
  if (path === "/matches.json") return J({ matches: { ...pcState.matches } });
  if (path === "/positions.json") return J({ positions: { ...pcState.positions } });
  if (path === "/backups.json") return J({ backups: pcState.backup ? [{ device: pcState.backup.device }] : [] });
  if (path === "/backup") return pcState.backup ? J({ ok: true, ...pcState.backup }) : { ok: false, status: 404, json: async () => ({ ok: false }) };
  return { ok: false, status: 404, json: async () => ({}) };
};
$("#sSource").value = "pc";
$("#sSource").dispatchEvent(new window.Event("change", { bubbles: true }));
await sleep(50);
ok(!$("#pcRow").hidden, "PC rows appear in PC mode");
$("#sPcUrl").value = "http://pc.local:8700";
$("#sPcUrl").dispatchEvent(new window.Event("change", { bubbles: true }));
await sleep(50);
$("#sPcTest").click();
await sleep(300);
ok(/2/.test($("#sPcStatus")?.textContent || ""), `PC connection test counts tracks (${$("#sPcStatus")?.textContent})`);
ok($("#sPack") != null, "visual pack setting present");
ok($$("#sPack option").length === 6, "6 visual pack options in settings");
// recorded voice packs: manifest in the bundle, coverage line and the on/off switch in settings
const AU = window.APP_CONTENT.audio || {};
ok(AU.tr?.packs && AU.en?.packs, "voice pack manifest present for tr and en");
ok(Object.values(AU.en.packs).every(p => /^voice\/en\/[\w-]+\.mp3\?v=[0-9a-f]{8}$/.test(p.file)), "voice pack files are hashed voice/<lang>/<pack>.mp3 URLs");
ok($("#sRec")?.checked === true, "recorded voice switch present and on by default");
ok(/\d+ \/ \d+ \(\d+%\)/.test($("#voiceCov")?.textContent || ""), `settings show recorded-line coverage (${$("#voiceCov")?.textContent})`);
$("#sRec").checked = false;
$("#sRec").dispatchEvent(new window.Event("change", { bubbles: true }));
await sleep(50);
ok(JSON.parse(window.localStorage.getItem("gateway.settings") || "{}").recordedVoice === false, "recorded voice switch persists to settings");
$("#sRec").checked = true;
$("#sRec").dispatchEvent(new window.Event("change", { bubbles: true }));
await sleep(50);
// appearance (theme / text size / motion) + phone text-to-speech rows
const chg = (id, v) => { $(id).value = v; $(id).dispatchEvent(new window.Event("change", { bubbles: true })); };
ok($("#sTheme") && $("#sFont") && $("#sMotion"), "appearance settings present (theme, text size, motion)");
chg("#sTheme", "light"); await sleep(20);
ok(document.documentElement.dataset.theme === "light", "theme setting applies data-theme=light");
chg("#sTheme", "auto"); await sleep(20);
ok(!document.documentElement.dataset.theme, "auto theme follows the system (attribute cleared)");
chg("#sFont", "1.15"); await sleep(20);
ok(document.documentElement.style.fontSize === "115%", `text size applies to the root font size (${document.documentElement.style.fontSize})`);
chg("#sFont", "1"); await sleep(20);
ok(document.documentElement.style.fontSize === "", "normal text size clears the override");
chg("#sMotion", "reduce"); await sleep(20);
ok(document.documentElement.dataset.motion === "reduce", "motion setting applies data-motion=reduce");
chg("#sMotion", "auto"); await sleep(20);
ok(JSON.parse(window.localStorage.getItem("gateway.settings") || "{}").motion === "auto", "appearance settings persist");
ok($("#sTtsRate") && $("#sTtsVoice") && $("#sTtsTest"), "phone TTS voice, rate and try rows present");
ok($("#sTtsTest").disabled && /metin okuma|text-to-speech/i.test($("#sTtsStatus")?.textContent || ""), `no speechSynthesis in jsdom → TTS rows disabled with a note (${$("#sTtsStatus")?.textContent})`);
// switch language to Turkish
$("#sLang").value = "tr";
$("#sLang").dispatchEvent(new window.Event("change", { bubbles: true }));
await sleep(200);
ok(document.documentElement.lang === "tr", "language switches to Turkish");
ok(/Katalog/.test($("[data-tab='home'] span")?.textContent || ""), "tab labels localized");

// ---------- guide tab: bilingual topic list + reading view ----------
const guideTopicCount = JSON.parse(readFileSync(join(WWW, "guide/index.json"), "utf8")).topics.length;
$('[data-tab="guide"]').click();
await sleep(400);
ok($$("[data-guide]").length === guideTopicCount, `guide lists ${guideTopicCount} topics (${$$("[data-guide]").length})`);
$('[data-guide="01-giris"]').click();
await sleep(300);
ok(($(".guide-body h1")?.textContent || "").length > 0, "guide topic opens with its title");
ok($$(".guide-body p").length >= 3, "guide topic renders paragraphs");
ok($(".g-nav [data-guide='02-tarihce']") != null, "topic view offers a next-topic button");
const h2Count = $$(".guide-body h2").length;
ok(h2Count >= 2 && $$(".g-toc li").length === h2Count, `topic shows a table of contents with all ${h2Count} sections (${$$(".g-toc li").length})`);
ok($$(".g-toc [data-jump]").every(a => document.getElementById(a.dataset.jump)), "every contents link targets an existing section");
ok($('.g-fab[data-act="gchapters"]') != null, "floating sections button present while reading");
$('.g-fab').click();
await sleep(100);
ok($$(".sheet .g-chapters li").length === h2Count + 1, "sections sheet lists top + every section");
ok(window.history.state?.v === "sheet", "open sheet owns a history entry");
window.history.back();
await sleep(200);
ok($(".sheet-wrap") == null && $(".guide-body h1") != null, "hardware back closes the sheet but keeps the topic");
$('.g-fab').click();
await sleep(100);
$$(".sheet .g-chapters [data-jump]")[1].click();
await sleep(200);
ok($(".sheet-wrap") == null, "jumping to a section closes the sheet");
$('[data-act="gback"]').click();
await sleep(200);
ok($("#gq") != null, "back returns to the guide list with the search box");
// full-text search across all topics
$("#gq").value = "REBAL";
$("#gq").dispatchEvent(new window.Event("input", { bubbles: true }));
await sleep(600);
ok($$(".g-hit").length >= 3, `guide search "REBAL" finds sections in several topics (${$$(".g-hit").length})`);
ok($(".g-hit mark") != null, "search snippets highlight the term");
ok(/REBAL/i.test($(".g-hit mark")?.textContent || ""), "highlighted text is the searched term");
const firstHit = $(".g-hit");
const hitTopic = firstHit.dataset.guide;
firstHit.click();
await sleep(300);
ok($(".guide-body h1") != null && $$(".guide-body mark").length > 0, "opening a hit renders the topic with the term marked");
$('[data-act="gback"]').click();
await sleep(200);
ok($("#gq")?.value === "REBAL" && $$(".g-hit").length >= 3, "back from a hit keeps the search and its results");
// Turkish-aware folding: "isik" should find "ışık"
$("#gq").value = "isik";
$("#gq").dispatchEvent(new window.Event("input", { bubbles: true }));
await sleep(600);
ok($$(".g-hit").length > 0, `diacritic-insensitive search ("isik" → ışık) finds sections (${$$(".g-hit").length})`);
$("#gq").value = "";
$("#gq").dispatchEvent(new window.Event("input", { bubbles: true }));
await sleep(400);
ok($$("[data-guide]").length === guideTopicCount, "clearing the search restores the topic list");
// cross-topic references inside the text become links, with back navigation
$('[data-guide="06-araclar-ve-teknikler"]').click();
await sleep(300);
const embeds = $$(".guide-body .sb-embed");
ok(embeds.length === 13 && embeds.every(e => e.classList.contains("sb") && e.querySelector(".sb-stage svg")), `topic 06 embeds 13 hydrated technique storyboards (${embeds.length})`);
ok($(".guide-body [data-sb-embed='rebal']")?.previousElementSibling?.tagName === "H2", "REBAL storyboard sits right under its chapter heading");
ok(!/\[\[storyboard/.test($(".guide-body").textContent), "no raw [[storyboard]] directive leaks into the text");
const xrefs = $$(".guide-body a.xref");
ok(xrefs.length >= 3, `topic 06 has clickable cross-topic references (${xrefs.length})`);
ok(xrefs.every(a => /^\d{2}-/.test(a.dataset.guide)), "every cross-reference points at a topic id");
const toOther = xrefs.find(a => a.dataset.guide !== "06-araclar-ve-teknikler");
toOther.click();
await sleep(300);
ok(!/Araçlar/.test($(".guide-body h1")?.textContent || ""), "cross-reference opens the referenced topic");
ok(/·/.test($('[data-act="gback"]')?.textContent || ""), "back button names the topic we came from");
$('[data-act="gback"]').click();
await sleep(300);
ok(/Araçlar/.test($(".guide-body h1")?.textContent || ""), "back returns to the referring topic");
$('[data-act="gback"]').click();
await sleep(200);
ok($("#gq") != null, "second back returns to the guide list");
$('[data-guide="17-kaynaklar"]').click();
await sleep(300);
const listRefs = $$(".guide-body a.xref").map(a => [a.textContent, a.dataset.guide]);
ok(listRefs.some(([txt, id]) => txt === "5" && id === "05-hazirlik-sureci") && listRefs.some(([txt, id]) => /^8\. konular/.test(txt) && id === "08-beden-disi-yol"), "list references (\"5, 6, 7 ve 8. konularının\") link each number");
$('[data-act="gback"]').click();
await sleep(200);

// ---------- guide reading: progress, "where I left off", bookmarks, text size ----------
{
  ok($(".g-overall .g-bar") != null && /\b0\b/.test($(".g-overall .muted")?.textContent || ""), `guide list shows overall progress (${$(".g-overall .muted")?.textContent})`);
  ok($(".g-resume") == null && $(".g-marks") == null && $$(".g-topic .g-bar").length === 0, "no resume card, bookmarks or topic progress before reading");
  $('[data-guide="02-tarihce"]').click();
  await sleep(300);
  const tools = $(".g-tools");
  ok(tools != null && tools.querySelector('[data-act="gmark"]') != null && tools.querySelector('[data-act="fontUp"]') != null && tools.querySelector('[data-act="fontDown"]') != null, "topic toolbar has bookmark and text-size buttons");
  ok($("#gReadFill") != null && $$(".guide-body h2 .g-chmark").length === $$(".guide-body h2").length, "reading bar present and every section has a bookmark star");
  ok($$(".g-toc li").every(li => !/★/.test(li.textContent)), "section stars do not leak into the contents list");
  // text size steps through the same scale as the settings
  $('[data-act="fontUp"]').click();
  ok(document.documentElement.style.fontSize === "115%" && JSON.parse(window.localStorage.getItem("gateway.settings")).fontScale === 1.15, "A+ enlarges the text and persists the font scale");
  $('[data-act="fontUp"]').click(); $('[data-act="fontUp"]').click();
  ok(document.documentElement.style.fontSize === "130%" && $('[data-act="fontUp"]').disabled, "A+ stops at the largest step and disables itself");
  $('[data-act="fontDown"]').click(); $('[data-act="fontDown"]').click();
  ok(document.documentElement.style.fontSize === "" && !$('[data-act="fontUp"]').disabled, "A− returns to the normal size");
  // simulate layout: the article is 2000 px tall and we scrolled 1200 px into it → ~98 % seen
  const body = $(".guide-body");
  body.getBoundingClientRect = () => ({ top: -1200, height: 2000, bottom: 800, left: 0, right: 0, width: 0 });
  window.dispatchEvent(new window.Event("scroll"));
  await sleep(400);
  const prog = JSON.parse(window.localStorage.getItem("gateway.gprog") || "{}");
  ok(prog["02-tarihce"] && prog["02-tarihce"].pct >= 90 && typeof prog["02-tarihce"].ch === "string", `scrolling records topic progress (${prog["02-tarihce"]?.pct}% at ${prog["02-tarihce"]?.ch})`);
  ok($("#gReadFill").style.width === prog["02-tarihce"].pct + "%", "reading bar follows the progress");
  const last = JSON.parse(window.localStorage.getItem("gateway.glast") || "null");
  ok(last && last.id === "02-tarihce" && last.chTitle.length > 0, "\"where I left off\" remembers topic and section");
  // progress never shrinks when scrolling back up
  body.getBoundingClientRect = () => ({ top: 0, height: 2000, bottom: 2000, left: 0, right: 0, width: 0 });
  window.dispatchEvent(new window.Event("scroll"));
  await sleep(400);
  ok(JSON.parse(window.localStorage.getItem("gateway.gprog"))["02-tarihce"].pct === prog["02-tarihce"].pct, "progress keeps its maximum when scrolling back up");
  // bookmarks: topic + section
  $('[data-act="gmark"]').click();
  ok($('[data-act="gmark"]').classList.contains("on") && JSON.parse(window.localStorage.getItem("gateway.gmarks")).some(b => b.id === "02-tarihce" && !b.ch), "topic bookmark toggles on and persists");
  const star = $$(".guide-body h2 .g-chmark")[2];
  const starId = star.dataset.markch;
  star.click();
  ok(star.classList.contains("on") && JSON.parse(window.localStorage.getItem("gateway.gmarks")).some(b => b.id === "02-tarihce" && b.ch === starId), "section bookmark toggles on and persists with its heading id");
  // another topic, partially read → "go to where you left off" chip appears on reopen
  $('[data-act="gback"]').click();
  await sleep(300);
  ok($(".g-resume") != null && /02|Tarih|History/i.test($(".g-resume").textContent) && /%/.test($(".g-resume .ex-sum").textContent), `guide list shows the resume card (${$(".g-resume .ex-sum")?.textContent})`);
  ok($(".g-topic[data-guide='02-tarihce']").classList.contains("read") && $(".g-topic[data-guide='02-tarihce'] .ex-ref").textContent === "✓", "finished topic is ticked in the list");
  ok(/\b1\b/.test($(".g-overall .muted").textContent), `overall progress counts one topic read (${$(".g-overall .muted").textContent})`);
  ok($(".g-marks") != null && $$(".g-marklist li").length === 2 && $$(".g-marklist [data-guide]").some(b => b.dataset.ch === starId), "bookmark list shows the topic and the section bookmark");
  ok(/★/.test($(".g-topic[data-guide='02-tarihce'] .ex-title").textContent), "bookmarked topic is starred in the list");
  $('.g-topic[data-guide="03-bilimsel-zemin"]').click();
  await sleep(300);
  $(".guide-body").getBoundingClientRect = () => ({ top: -400, height: 3000, bottom: 2600, left: 0, right: 0, width: 0 });
  window.dispatchEvent(new window.Event("scroll"));
  await sleep(400);
  const p3 = JSON.parse(window.localStorage.getItem("gateway.gprog"))["03-bilimsel-zemin"];
  ok(p3 && p3.pct > 5 && p3.pct < 90, `partial progress recorded for topic 03 (${p3?.pct}%)`);
  $('[data-act="gback"]').click();
  await sleep(300);
  ok(/03|Bilim|Scien/i.test($(".g-resume")?.textContent || ""), "resume card moves to the most recent topic");
  ok($(".g-topic[data-guide='03-bilimsel-zemin'] .g-bar") != null && !$(".g-topic[data-guide='03-bilimsel-zemin']").classList.contains("read"), "partially read topic shows a progress bar without a tick");
  $('.g-topic[data-guide="03-bilimsel-zemin"]').click();
  await sleep(300);
  ok($('[data-act="gresume"]') != null, "reopening a partly read topic offers \"go to where you left off\"");
  let jumped = null;
  window.HTMLElement.prototype.scrollIntoView = function () { jumped = this.id; };
  $('[data-act="gresume"]').click();
  ok(jumped === p3.ch, `resume jumps to the saved section (${jumped})`);
  delete window.HTMLElement.prototype.scrollIntoView;
  $('[data-act="gback"]').click();
  await sleep(300);
  // resume card opens the topic; bookmark entries open the topic at the section; ✕ removes a bookmark
  $(".g-resume").click();
  await sleep(300);
  ok(/03|Bilim|Scien/i.test($(".guide-body h1")?.textContent || "") && $('[data-act="gresume"]') == null, "resume card opens the last topic (without the extra resume chip)");
  $('[data-act="gback"]').click();
  await sleep(300);
  $$(".g-marklist [data-guide]").find(b => b.dataset.ch === starId).click();
  await sleep(300);
  ok(/Tarih|History/i.test($(".guide-body h1")?.textContent || "") && document.getElementById(starId) != null && $$(".guide-body mark").length === 0, "section bookmark opens its topic without search highlights");
  ok($(`[data-markch="${starId}"]`).classList.contains("on"), "the bookmarked section shows its star lit");
  $('[data-act="gback"]').click();
  await sleep(300);
  $(`[data-unmark="02-tarihce#${starId}"]`).click();
  await sleep(100);
  ok($$(".g-marklist li").length === 1 && !JSON.parse(window.localStorage.getItem("gateway.gmarks")).some(b => b.ch === starId), "✕ removes the section bookmark from the list and storage");
  // backup carries reading progress and bookmarks
  let captured = null;
  const origCreate = window.URL.createObjectURL, origClick = window.HTMLAnchorElement.prototype.click;
  window.URL.createObjectURL = b => { captured = b; return "blob:backup"; };
  window.HTMLAnchorElement.prototype.click = function () {};
  $('[data-tab="journal"]').click();
  await sleep(300);
  $("#bkExport").click();
  await sleep(300);
  window.URL.createObjectURL = origCreate; window.HTMLAnchorElement.prototype.click = origClick;
  const bk = JSON.parse(await captured.text());
  ok(bk.reading && bk.reading["02-tarihce"]?.pct >= 90 && Array.isArray(bk.bookmarks) && bk.bookmarks.length === 1, "backup includes reading progress and bookmarks");
  $('[data-tab="guide"]').click();
  await sleep(400);
  $('.g-topic[data-guide="02-tarihce"]').click();
  await sleep(300);
  $('[data-act="gmark"]').click();
  ok(!$('[data-act="gmark"]').classList.contains("on") && JSON.parse(window.localStorage.getItem("gateway.gmarks")).length === 0, "topic bookmark toggles off again");
  $('[data-act="gback"]').click();
  await sleep(300);
  ok($(".g-marks") == null, "empty bookmark list disappears");
}

// ---------- techniques tab: cards, detail, visual packs ----------
$('[data-tab="techniques"]').click();
await sleep(200);
ok($$("[data-tech]").length === 21, `techniques tab lists 21 techniques (${$$("[data-tech]").length})`);
ok($('.ref-card[data-act="gallery"]') != null, "techniques tab offers the visual gallery card");
$('.ref-card[data-act="gallery"]').click();
await sleep(300);
ok($$(".gal-card").length === 6, `gallery shows 6 visual packs (${$$(".gal-card").length})`);
ok($$(".gal-card [data-vis]").every(b => b.querySelector("svg, img")), "every pack renders a preview");
ok($(".gal-card.on")?.dataset.vpack === "gateway", "default pack marked as selected");
$('[data-vstate="focus27"]').click();
await sleep(200);
ok($('[data-vstate="focus27"]').classList.contains("on") && $('.gal-card[data-vpack="gateway"] svg')?.classList.contains("gw-focus27"), "state pills re-render every pack in that state");
$('.gal-card[data-vpack="aura"]').click();
await sleep(100);
ok($(".gal-card.on")?.dataset.vpack === "aura", "tapping a card selects that pack");
$('[data-act="galfull"]').click();
await sleep(200);
ok($(".gal-full #galFullVis svg, .gal-full #galFullVis img") != null, "full-size preview opens");
$(".gal-full [data-close]").click();
await sleep(150);
ok($(".gal-full") == null, "full-size preview closes");
$('[data-act="back"]').click();
await sleep(200);
ok($$("[data-tech]").length === 21, "back from the gallery returns to the techniques list");
// every technique card carries a static storyboard thumbnail
ok($$("[data-tech] .ex-thumb .sb-static svg").length === 21, `all 21 technique cards show a storyboard thumbnail (${$$("[data-tech] .ex-thumb .sb-static svg").length})`);
$('[data-tech="rebal"]').click();
await sleep(400);
ok(/REBAL/.test($(".d-head h1")?.textContent || ""), "technique detail opens (REBAL)");
const sb = $("#techSb");
ok(sb?.classList.contains("sb") && sb.querySelector(".sb-stage svg.sb-svg") != null, "technique detail mounts the instructional storyboard player");
ok(sb.querySelectorAll(".sb-dot").length === 5, `REBAL storyboard has 5 scenes (${sb.querySelectorAll(".sb-dot").length})`);
ok(sb.querySelector(".sb-dot.on")?.dataset.sb === "0" && /^1\/5$/.test(sb.querySelector(".sb-n").textContent), "player starts at scene 1/5");
ok(/REBAL|Focus 10/.test(sb.querySelector(".sb-text").textContent), "scene caption describes the step in the UI language");
ok(/tepeden çık|out at the crown/.test(sb.innerHTML) === false, "scene 1 does not yet show the loop labels");
sb.querySelector("[data-sb='next']").click();
sb.querySelector("[data-sb='next']").click();
ok(sb.querySelector(".sb-dot.on")?.dataset.sb === "2" && /^3\/5$/.test(sb.querySelector(".sb-n").textContent), "next → scene 3/5");
ok(/tepeden çık|out at the crown/.test(sb.querySelector(".sb-stage").innerHTML), "scene 3 draws the energy loop (crown → feet) with labels");
sb.querySelector("[data-sb='prev']").click();
ok(/^2\/5$/.test(sb.querySelector(".sb-n").textContent), "prev → scene 2/5");
sb.querySelector(".sb-dot[data-sb='4']").click();
ok(/^5\/5$/.test(sb.querySelector(".sb-n").textContent), "dot → scene 5/5");
sb.querySelector("[data-sb='stage']").click();
ok(/^1\/5$/.test(sb.querySelector(".sb-n").textContent), "tapping the stage after the last scene loops to 1/5");
sb.querySelector("[data-sb='play']").click();
ok(sb.classList.contains("sb-paused") && sb.querySelector("[data-sb='play']").textContent === "▶", "play/pause toggles the paused state");
sb.querySelector("[data-sb='play']").click();
ok(!sb.classList.contains("sb-paused"), "play resumes");
ok($(".steps") != null, "how-to steps still listed under the storyboard");
$('[data-act="back"]').click();
await sleep(100);
$('[data-tech="ecb"]').click();
await sleep(300);
ok(/Kutu|Box/.test($(".d-head h1")?.textContent || "") && $("#techSb .sb-dot") != null, "ECB detail mounts its own storyboard");
$('[data-act="back"]').click();
await sleep(100);

// ---------- back home, search ----------
$('[data-tab="home"]').click();
await sleep(200);
// PC track chips on session details (audio source = pc, set in settings above)
$('[data-open="w1-intro-10"]').click();
await sleep(300);
ok($(".track-chip")?.classList.contains("on"), "w1-intro-10 detail shows a matched PC track chip");
ok(/Introduction to Focus 10/.test($(".track-chip")?.title || ""), "chip tooltip names the matched file");
$('[data-act="back"]').click();
await sleep(100);
$('[data-open="hp-attention"]').click();
await sleep(300);
ok($(".track-chip")?.classList.contains("on"), "hp-attention detail shows a matched PC track chip");
$('[data-act="back"]').click();
await sleep(100);
$('[data-open="w8-freeflow27"]').click();
await sleep(300);
ok($(".track-chip") != null && !$(".track-chip").classList.contains("on"), "w8-freeflow27 has no PC match (synthesis fallback)");
// ---------- P9: manual match override, library view, resume, folder play, PC backup sync ----------
ok(/Dosya seç|Pick a file/.test($(".track-chip")?.textContent || ""), "unmatched chip offers to pick a file");
$(".track-chip").click(); await sleep(300);
ok($(".sheet.pick #pq") != null && $$(".sheet.pick [data-pick]").length === 5, `pick sheet lists every PC file (${$$(".sheet.pick [data-pick]").length})`);
$("#pq").value = "higher"; $("#pq").dispatchEvent(new window.Event("input", { bubbles: true })); await sleep(50);
ok($$(".sheet.pick [data-pick]").length === 2, "pick sheet search narrows the files");
$('.sheet.pick [data-pick="Metamusic/Higher/01 Higher Part 1.flac"]').click(); await sleep(400);
ok(pcState.matches["w8-freeflow27"] === "Metamusic/Higher/01 Higher Part 1.flac", "manual match is POSTed to the PC");
ok($(".sheet.pick") == null && $(".track-chip")?.classList.contains("on") && $(".track-chip").classList.contains("manual") && /Higher Part 1/.test($(".track-chip").title), "detail chip now shows the manually chosen file");
$(".track-chip").click(); await sleep(300);
ok(!$(".sheet.pick [data-pickauto]")?.hidden, "pick sheet offers to return to automatic matching");
$(".sheet.pick [data-pickauto]").click(); await sleep(400);
ok(!("w8-freeflow27" in pcState.matches) && !$(".track-chip")?.classList.contains("on"), "clearing the override removes it on the PC and in the chip");
$('[data-act="back"]').click(); await sleep(150);
// library view
ok($('[data-act="library"]') != null, "home offers the PC library card in PC mode");
$('[data-act="library"]').click(); await sleep(500);
ok($("#lq") != null && $$(".lib-folder").length === 4, `library lists the PC folders (${$$(".lib-folder").length})`);
ok(/5/.test($("#libSum")?.textContent || "") && /3/.test($("#libSum")?.textContent || ""), `library summary counts files and matched files (${$("#libSum")?.textContent})`);
ok($('.lib-session[data-open="w1-intro-10"]') != null && $('.lib-session[data-open="hp-attention"]') != null, "files show the session they are matched to");
$("#lq").value = "super"; $("#lq").dispatchEvent(new window.Event("input", { bubbles: true })); await sleep(50);
ok($$(".lib-folder").length === 1 && $$("[data-libplay]").length === 1, "library search narrows to the matching file");
$("#lq").value = ""; $("#lq").dispatchEvent(new window.Event("input", { bubbles: true })); await sleep(50);
$('[data-libassign="Mind Food/Super Sleep.flac"]').click(); await sleep(300);
ok($(".sheet.pick #aq") != null && $$(".sheet.pick [data-assign]").length > 10, "assign sheet lists sessions");
$("#aq").value = "freeflow27"; $("#aq").dispatchEvent(new window.Event("input", { bubbles: true })); await sleep(50);
ok($$(".sheet.pick [data-assign]").length === 1, "assign sheet search by id narrows to one session");
$('.sheet.pick [data-assign="w8-freeflow27"]').click(); await sleep(600);
ok(pcState.matches["w8-freeflow27"] === "Mind Food/Super Sleep.flac" && /✎/.test($('.lib-session[data-open="w8-freeflow27"]')?.textContent || ""), "assigning from the library saves the match and marks it as manual");
$('[data-libassign="Mind Food/Super Sleep.flac"]').click(); await sleep(300);
$(".sheet.pick [data-assignrm]").click(); await sleep(600);
ok(!("w8-freeflow27" in pcState.matches) && $('.lib-session[data-open="w8-freeflow27"]') == null, "removing the match from the library clears it");
// play a file, remember the place, resume, restart
const audioLib = () => document.querySelector("audio");
$('[data-libplay="Metamusic/Higher/01 Higher Part 1.flac"]').click(); await sleep(200);
audioLib().dispatchEvent(new window.Event("loadedmetadata")); await sleep(300);
ok(!$("#session").hidden && /Higher Part 1/.test($(".s-title")?.textContent || ""), "library file plays in the session overlay");
ok($('#session [data-a="restart"]')?.hidden === true, "no restart button on a fresh start");
audioLib().currentTime = 100; await sleep(400);
const posSaved = JSON.parse(window.localStorage.getItem("gateway.pos") || "{}")["Metamusic/Higher/01 Higher Part 1.flac"];
ok(posSaved && posSaved.pos >= 100, `position is remembered while playing (${posSaved?.pos})`);
ok(pcState.posts.some(p => p.path === "/positions" && p.body.pos >= 100), "position is also sent to the PC");
$('#session [data-a="stop"]').click(); await sleep(100);
$('#session [data-a="yes"]').click(); await sleep(400);
ok($("#session").hidden && $(".done-mark") != null, "stopping a library file shows the done screen");
$('[data-act="back"]').click(); await sleep(300);
$('[data-act="library"]').click(); await sleep(500);
ok(/01:40|1:40/.test($('[data-libplay="Metamusic/Higher/01 Higher Part 1.flac"]')?.textContent || ""), "library shows where the file was left off");
audioLib().currentTime = 0;
$('[data-libplay="Metamusic/Higher/01 Higher Part 1.flac"]').click(); await sleep(200);
audioLib().dispatchEvent(new window.Event("loadedmetadata")); await sleep(300);
ok(Math.round(audioLib().currentTime) === 100 && /Kaldığın yerden|Resuming/.test($("#session .s-say")?.textContent || ""), `playback resumes from the saved place (${audioLib().currentTime})`);
ok($('#session [data-a="restart"]')?.hidden === false, "restart button offered after a resume");
$('#session [data-a="restart"]').click(); await sleep(100);
ok(audioLib().currentTime === 0 && $('#session [data-a="restart"]').hidden === true, "restart goes back to the beginning");
audioLib().dispatchEvent(new window.Event("ended")); await sleep(400);
ok(!JSON.parse(window.localStorage.getItem("gateway.pos") || "{}")["Metamusic/Higher/01 Higher Part 1.flac"], "finishing a file forgets its position");
$('[data-act="back"]').click(); await sleep(300);
// folder play chains to the next part
$('[data-act="library"]').click(); await sleep(500);
$('[data-libplayall="Metamusic/Higher"]').click(); await sleep(200);
Object.defineProperty(audioLib(), "duration", { value: 100, configurable: true });   // a 100 s "file"
audioLib().dispatchEvent(new window.Event("loadedmetadata")); await sleep(300);
ok(/Higher Part 1 · 1\/2/.test($(".s-title")?.textContent || ""), `folder play starts with part 1 (${$(".s-title")?.textContent})`);
ok($$("audio[data-warm]").length === 0, "the next part is not fetched early in the file");
audioLib().currentTime = 60; await sleep(400);
const warmEl = $("audio[data-warm]");
ok(warmEl != null && /Higher%20Part%202/.test(warmEl.src), "the next part starts pre-buffering 45 s before the end");
audioLib().dispatchEvent(new window.Event("ended")); await sleep(300);
const playing = [...$$("audio")].pop();
playing.dispatchEvent(new window.Event("loadedmetadata")); await sleep(300);
ok(!$("#session").hidden && /Higher Part 2 · 2\/2/.test($(".s-title")?.textContent || ""), `folder play continues with part 2 (${$(".s-title")?.textContent})`);
ok(playing !== audioLib() && !playing.dataset.warm && /Higher%20Part%202/.test(playing.src), "the pre-buffered element takes over for part 2 (no gap)");
$('#session [data-a="stop"]').click(); await sleep(100);
$('#session [data-a="yes"]').click(); await sleep(400);
ok($$("audio").length === 1, "the adopted element is removed after the session");
delete audioLib().duration;
$('[data-act="back"]').click(); await sleep(300);
// one-tap backup to the PC and restore from it
$('[data-tab="journal"]').click(); await sleep(300);
ok($("#bkPcPush") != null && $("#bkPcPull") != null && /henüz yok|none yet/.test($("#bkPcMsg")?.textContent || ""), "journal offers PC backup/restore with a last-sync line");
$("#bkPcPush").click(); await sleep(500);
ok(pcState.backup && pcState.backup.backup.format === "gateway-backup/1" && "positions" in pcState.backup.backup && /yedeklendi|Backed up/.test($("#bkPcMsg")?.textContent || ""), `backup pushed to the PC (${$("#bkPcMsg")?.textContent})`);
pcState.backup.backup.log = [...(pcState.backup.backup.log || []), { at: 1700000000000, day: "2023-11-14", id: "w1-orientation", sec: 1800, completed: true }];
$("#bkPcPull").click(); await sleep(600);
ok(/1 oturum|1 sessions/.test($("#bkPcMsg")?.textContent || "") && JSON.parse(window.localStorage.getItem("gateway.log") || "[]").some(x => x.at === 1700000000000), `restore from the PC merges the other device's sessions (${$("#bkPcMsg")?.textContent})`);
await sleep(1300);
$('[data-tab="home"]').click(); await sleep(200);
$('[data-open="w8-freeflow27"]').click(); await sleep(300);
$('[data-act="back"]').click();
await sleep(100);
// ---------- Hemi-Sync reference catalogue ----------
const refTotal = window.APP_CONTENT.reference.items.length;
ok($(".ref-card") != null, "home shows the reference catalogue entry card");
$(".ref-card").click();
await sleep(300);
ok($$(".ref-item").length === refTotal, `reference view lists ${refTotal} titles (${$$(".ref-item").length})`);
ok($$(".ref-item [data-open]").length > 0, "reference items link to related in-app sessions");
$('[data-refcat="metamusic"]').click();
await sleep(200);
const metaCount = $$(".ref-item").length;
ok(metaCount > 0 && metaCount < refTotal, `category filter narrows the list (${metaCount})`);
ok($('[data-refcat="metamusic"]').classList.contains("on"), "active category is marked");
$('[data-refcat="all"]').click();
await sleep(200);
// collections, tag pills and catalogue codes (P7)
ok($$("[data-refcol]").length >= 4, `collection chips rendered (${$$("[data-refcol]").length})`);
$('[data-refcol="healing"]').click(); await sleep(200);
const healN = $$(".ref-item").length;
ok(healN > 0 && healN < refTotal && $(".ref-col") != null, `healing collection narrows the list and shows its intro (${healN})`);
ok($$(".ref-col [data-open]").length >= 5, "collection lists the closest in-app sessions");
ok($$(".ref-item").every(c => c.querySelector('[data-reftag="health"]')), "every healing item carries the health tag");
ok($('[data-refcol="healing"]').classList.contains("on"), "active collection chip is marked");
$('[data-refcol="healing"]').click(); await sleep(200);
ok($$(".ref-item").length === refTotal && $(".ref-col") == null, "clicking the active collection again clears it");
$('.ref-item [data-reftag="shamanic"]').click(); await sleep(200);
const shN = $$(".ref-item").length;
ok(shN > 0 && shN < refTotal && $$(".ref-item").every(c => c.querySelector('[data-reftag="shamanic"]')), `tag pill filters the list by tag (${shN})`);
ok($('.ref-count [data-reftag=""]') != null, "active tag shown with a clear button");
$('.ref-count [data-reftag=""]').click(); await sleep(200);
ok($$(".ref-item").length === refTotal, "tag filter cleared");
ok($$(".ref-item .ref-code").length > 150, `catalogue codes shown (${$$(".ref-item .ref-code").length})`);
ok($$(".ref-item").every(c => c.querySelector("[data-open]")), "every title links to at least one in-app session (curated or by tag)");
ok($$(".ref-item").filter(c => /Metamusic/.test(c.querySelector(".ref-cat").textContent)).length >= 130, "the whole English Metamusic line is listed");
$("#rq").value = "MA023";
$("#rq").dispatchEvent(new window.Event("input", { bubbles: true }));
await sleep(200);
ok($$(".ref-item").length === 1 && $('.ref-item[data-ref="ref-higher"]') != null, "search matches the catalogue code");
$("#rq").value = "uyku";
$("#rq").dispatchEvent(new window.Event("input", { bubbles: true }));
await sleep(200);
const sleepCount = $$(".ref-item").length;
ok(sleepCount > 0 && sleepCount < refTotal, `reference search "uyku" narrows the list (${sleepCount})`);
ok($("#rq").value === "uyku", "search box keeps its value after re-render");
await sleep(400);
ok($('[data-refpc="ref-super-sleep"] .track-chip')?.classList.contains("on"), "Super Sleep found in the PC library");
ok($('[data-refplay="ref-super-sleep"]') != null, "play button offered for the owned recording");
$("#rq").value = "higher";
$("#rq").dispatchEvent(new window.Event("input", { bubbles: true }));
await sleep(600);
ok($$('[data-refplay="ref-higher"]').length === 2, `album folder match lists its tracks in order (${$$('[data-refplay="ref-higher"]').length})`);
ok(/Part 1/.test($('[data-refplay="ref-higher"]')?.textContent || ""), "first album track is listed first");
$('[data-refplay="ref-higher"]').click();
await sleep(100);
document.querySelector("audio")?.dispatchEvent(new window.Event("loadedmetadata"));
await sleep(300);
ok($("#session") && !$("#session").hidden, "reference track opens the session overlay");
ok(/Higher/.test($(".s-title")?.textContent || ""), "overlay title names the reference title");
$('[data-a="stop"]').click(); await sleep(100);
$('[data-a="yes"]').click(); await sleep(300);
ok($("#session").hidden, "reference playback stops on confirm");
ok($(".done-mark") != null, "done screen shows after reference playback");
$('[data-act="back"]').click();
await sleep(200);
ok($("#q") != null, "back from the reference flow returns home");
// session detail → catalogue backlinks → back to the same detail
$('.ex-card[data-open="hp-immunizing"]').click(); await sleep(200);
const bl = $$("[data-refopen]");
ok(bl.length >= 3, `detail lists Hemi-Sync catalogue backlinks (${bl.length})`);
ok(bl.some(b => b.dataset.col === "healing"), "backlinks include the healing collection");
$('[data-refopen="ref-chemo-companion"]').click(); await sleep(300);
ok($('.ref-item.hl[data-ref="ref-chemo-companion"]') != null, "backlink opens the catalogue on that title");
$('[data-act="back"]').click(); await sleep(200);
ok(/Bağışıklık|Immunizing/i.test($(".d-head h1")?.textContent || ""), "back returns to the same session detail");
$('[data-act="back"]').click(); await sleep(200);
ok($("#q") != null, "back again returns home");
// ---------- Human Plus daily practice: command of the day, counter, user-noted commands, reminders ----------
ok($(".hp-card") != null, "home shows the command-of-the-day card");
const hpId0 = $(".hp-card")?.dataset.hpid || "";
ok(/^hp-/.test(hpId0) && /^Plus/.test($(".hp-card .hp-cmd")?.textContent || ""), `card names a Human Plus function with its command (${hpId0}: ${$(".hp-card .hp-cmd")?.textContent})`);
ok($('.hp-card [data-hp="practiced"]') == null && $('.hp-card .row-btns [data-open]') != null, "before any encoding the card offers to encode first");
const dk = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const logNow = JSON.parse(window.localStorage.getItem("gateway.log") || "[]");
logNow.push({ id: "hp-relax", at: Date.now() - 86400e3, day: dk(new Date(Date.now() - 86400e3)), sec: 600, completed: true });
window.localStorage.setItem("gateway.log", JSON.stringify(logNow));
$('[data-tab="home"]').click(); await sleep(200);
ok($(".hp-card")?.dataset.hpid === "hp-relax" && $(".hp-card .hp-cmd").textContent === "Plus Relax", "after encoding Relax the card shows Plus Relax");
ok($('.hp-card [data-hp="shuffle"]') == null, "single encoded function → no shuffle button");
$('.hp-card [data-hp="practiced"]').click(); await sleep(50);
$('.hp-card [data-hp="practiced"]').click(); await sleep(50);
ok(/bugün|today/.test($(".hp-card .hp-stats")?.textContent || "") && $(".hp-card .hp-stats b").textContent === "2", `+1 twice → today 2 (${$(".hp-card .hp-stats")?.textContent})`);
ok([...$$(".toast")].some(x => /Plus Relax/.test(x.textContent)), "practice tap confirms with the command");
ok(JSON.parse(window.localStorage.getItem("gateway.hpPractice") || "[]").length === 2, "practice taps persist");
ok($(".hp-card") && $("#q") && $$(".ex-card").length > 0, "card refresh keeps the rest of the home intact");
// detail: practice panel with 7-day bars, undo
$('[data-open="hp-relax"]').click(); await sleep(200);
ok($(".hp-practice") != null && $$(".hp-bars span").length === 7 && $$(".hp-bars span.on").length === 1, "Relax detail shows the daily-practice panel with 7-day bars");
ok($(".hp-stat-row b").textContent === "2", "detail counter shows today's 2");
$('[data-d="undo"]').click(); await sleep(100);
ok($(".hp-stat-row b").textContent === "1" && JSON.parse(window.localStorage.getItem("gateway.hpPractice") || "[]").length === 1, "undo removes the last tap");
$('[data-d="practiced"]').click(); await sleep(100);
ok($(".hp-stat-row b").textContent === "2", "+1 from the detail page counts too");
$('[data-act="back"]').click(); await sleep(200);
// a function without a documented command: the user notes it → it becomes eligible for the daily card
$('[data-open="hp-reset"]').click(); await sleep(200);
ok($('.cmd-chip [data-d="cmd"]') != null && !$(".cmd-chip b"), "Reset has no public command → offers to note it");
ok($(".hp-practice .note") != null, "not-yet-encoded notice shown");
$('.cmd-chip [data-d="cmd"]').click(); await sleep(100);
ok($("#hpCmdInput") != null, "command sheet opens");
$("#hpCmdInput").value = "  Plus   Reset ";
$("[data-cmdsave]").click(); await sleep(150);
ok($(".cmd-chip b")?.textContent === "Plus Reset" && /senin notun|your note/.test($(".cmd-chip")?.textContent || ""), "noted command shows, normalised, marked as the user's note");
ok(JSON.parse(window.localStorage.getItem("gateway.hpCmd") || "{}")["hp-reset"] === "Plus Reset", "noted command persists");
$('[data-act="back"]').click(); await sleep(200);
const logNow2 = JSON.parse(window.localStorage.getItem("gateway.log") || "[]");
logNow2.push({ id: "hp-reset", at: Date.now() - 86400e3 + 1, day: dk(new Date(Date.now() - 86400e3)), sec: 600, completed: true });
window.localStorage.setItem("gateway.log", JSON.stringify(logNow2));
$('[data-tab="home"]').click(); await sleep(200);
ok($('.hp-card [data-hp="shuffle"]') != null, "two eligible functions → shuffle button appears");
const hpA = $(".hp-card").dataset.hpid;
$('.hp-card [data-hp="shuffle"]').click(); await sleep(100);
const hpB = $(".hp-card").dataset.hpid;
ok(hpA !== hpB && ["hp-relax", "hp-reset"].includes(hpB), `shuffle picks the other function (${hpA} → ${hpB})`);
ok(JSON.parse(window.localStorage.getItem("gateway.hpDay") || "{}").id === hpB, "today's pick persists");
$('[data-tab="program"]').click(); await sleep(200);
ok($(".hp-sum") != null && /2\/53/.test($(".hp-sum .stats").textContent) && $$(".hp-sum .pill").length === 1, "programme tab summarises encoded functions and the most-used commands");
// reminders: setting + manual trigger
$('[data-tab="settings"]').click(); await sleep(200);
ok($("#sHpRemind") != null && $("#sHpRemind").value === "0", "command reminder setting present and off by default");
$("#sHpRemind").value = "2"; $("#sHpRemind").dispatchEvent(new window.Event("change", { bubbles: true })); await sleep(50);
ok(JSON.parse(window.localStorage.getItem("gateway.settings")).hpRemind === 2 && /08:00–23:00/.test($("#sHpStatus").textContent), `reminder interval persists and shows the shared reminder window (${$("#sHpStatus").textContent})`);
$("#sHpNow").click(); await sleep(50);
ok([...$$(".toast")].some(x => /✦ Plus (Relax|Reset)/.test(x.textContent)), "manual reminder names the command of the day");
ok(Number(window.localStorage.getItem("gateway.hpLast")) > Date.now() - 5000, "reminder timestamp recorded");
$("#sHpRemind").value = "0"; $("#sHpRemind").dispatchEvent(new window.Event("change", { bubbles: true })); await sleep(50);
$('[data-tab="home"]').click(); await sleep(200);
ok(/kodlandı|encoded/.test($(".hp-head .muted")?.textContent || ""), "card header shows the encoded count when reminders are off");
// backup carries the practice taps and noted commands; re-import is idempotent
$('[data-tab="journal"]').click(); await sleep(300);
{
  let captured = null;
  const origCreate = window.URL.createObjectURL, origClick = window.HTMLAnchorElement.prototype.click;
  window.URL.createObjectURL = b => { captured = b; return "blob:backup"; };
  window.HTMLAnchorElement.prototype.click = function () {};
  $("#bkExport").click(); await sleep(300);
  window.URL.createObjectURL = origCreate; window.HTMLAnchorElement.prototype.click = origClick;
  let data = null; try { data = JSON.parse(captured ? await captured.text() : ""); } catch {}
  ok(data && Array.isArray(data.practice) && data.practice.length === 2 && data.hpCmd?.["hp-reset"] === "Plus Reset", "backup includes practice taps and noted commands");
  const file = new window.File([JSON.stringify(data)], "gateway-backup.json", { type: "application/json" });
  Object.defineProperty($("#bkFile"), "files", { value: [file], configurable: true });
  $("#bkFile").dispatchEvent(new window.Event("change")); await sleep(300);
  ok(JSON.parse(window.localStorage.getItem("gateway.hpPractice") || "[]").length === 2, "re-importing the backup does not duplicate practice taps");
  await sleep(1000);
}
$('[data-tab="home"]').click(); await sleep(200);
// ---------- catalogue filters (focus / length / series / status / favourite / night) ----------
ok($$(".filters select").length === 4 && $$(".f-chip").length === 2, "filter bar: 4 selects + favourite and night chips");
const baseCards = $$(".ex-card").length;   // 145 + the favourite shown again in the Favourites section
const setF = (k, v) => { const el = $(`.filters select[data-f="${k}"]`); el.value = v; el.dispatchEvent(new window.Event("change", { bubbles: true })); };
setF("focus", "21"); await sleep(100);
const f21 = $$(".ex-card").length;
ok(f21 > 0 && f21 < 145 && $$(".ex-card").every(c => /F21/.test(c.querySelector(".ex-meta").textContent)), `focus filter keeps only Focus 21 sessions (${f21})`);
ok(($("#fCount")?.textContent || "").startsWith(String(new Set($$(".ex-card").map(c => c.dataset.open)).size)), `result count matches the cards (${$("#fCount")?.textContent})`);
ok($$("details.wave-head").every(d => d.open), "filtered waves are expanded");
ok($('.filters select[data-f="focus"]').closest(".f-sel").classList.contains("on"), "active select is highlighted");
setF("done", "yes"); await sleep(100);
ok($$(".ex-card").length === 0 && $(".muted")?.textContent.length > 0, "focus 21 + done → nothing practised yet (empty state)");
$('[data-act="clearFilters"]').click(); await sleep(100);
ok($$(".ex-card").length === baseCards && !$("#fCount"), `clear filters restores all ${baseCards} cards and hides the count (${$$(".ex-card").length})`);
$('.f-chip[data-f="fav"]').click(); await sleep(100);
ok($$(".ex-card").length > 0 && $$(".ex-card").every(c => c.dataset.open === "w2-intro-12"), `favourite chip shows only the favourite (${$$(".ex-card").length} card(s))`);
$('.f-chip[data-f="fav"]').click(); await sleep(100);
setF("series", "waves-of-change"); setF("dur", "short"); await sleep(100);
const shortWoc = $$(".ex-card").length;
ok(shortWoc > 0 && shortWoc < 145, `series + length filters combine (${shortWoc} short Waves of Change sessions)`);
ok(JSON.parse(window.localStorage.getItem("gateway.filters") || "{}").dur === "short", "filters persist");
$('.f-chip[data-f="night"]').click(); await sleep(100);
ok($$(".ex-card").every(c => /Gece|Night/.test(c.querySelector(".ex-meta").textContent)), `night chip keeps night sessions only (${$$(".ex-card").length})`);
$('[data-act="clearFilters"]').click(); await sleep(100);
ok($$(".ex-card").length === baseCards, `all filters cleared (${$$(".ex-card").length})`);
$("#q").value = "enerji çubuğu";
$("#q").dispatchEvent(new window.Event("input", { bubbles: true }));
await sleep(100);
const cards = $$(".ex-card").length;
ok(cards === 4, `search "enerji çubuğu" matches 4 sessions (${cards})`);
$("#q").value = "girdaba";
$("#q").dispatchEvent(new window.Event("input", { bubbles: true }));
await sleep(100);
ok($$(".ex-card").length === 1, `search "girdaba" narrows to 1 session (${$$(".ex-card").length})`);
$('[data-open="w3-rv"]').click();
await sleep(100);
ok(/Uzaktan Görme/.test($(".d-head h1")?.textContent || ""), "Turkish detail title renders");

// ---------- English guide: cross-links + search work with the English text ----------
$('[data-tab="settings"]').click();
await sleep(200);
$("#sLang").value = "en";
$("#sLang").dispatchEvent(new window.Event("change", { bubbles: true }));
await sleep(200);
$('[data-tab="guide"]').click();
await sleep(400);
$('[data-guide="06-araclar-ve-teknikler"]').click();
await sleep(300);
const enRefs = $$(".guide-body a.xref");
ok(enRefs.length >= 3 && enRefs.every(a => /^\d{2}-/.test(a.dataset.guide)), `English topic text links "topic N" references (${enRefs.length})`);
$('[data-act="gback"]').click();
await sleep(200);
$("#gq").value = "resonant tuning";
$("#gq").dispatchEvent(new window.Event("input", { bubbles: true }));
await sleep(600);
ok($$(".g-hit").length > 0, `English search "resonant tuning" finds sections (${$$(".g-hit").length})`);
$('[data-tab="home"]').click();
await sleep(200);
ok($(".ref-card") == null, "reference entry card is hidden while a session search is active");
$("#q").value = "";
$("#q").dispatchEvent(new window.Event("input", { bubbles: true }));
await sleep(100);
$(".ref-card").click();
await sleep(300);
ok(/reference catalogue/i.test($(".d-head h1")?.textContent || ""), "reference view renders in English");

// ---------- sleep sessions: night plan, fade-out ending, wake bell (WBTB) in the same audio stream ----------
{
  $('[data-tab="home"]').click();
  await sleep(200);
  $('[data-act="clearFilters"]')?.click();
  await sleep(100);
  $('[data-open="w1-sleep"]').click();
  await sleep(200);
  ok(/Sleep/i.test($(".d-head h1")?.textContent || ""), "night session detail opens (Sleep)");
  ok($(".night-plan") != null && $("#dFade") != null && $("#dWake") != null && $("#dWakeAtRow")?.hidden === true, "night plan panel with fade-out and wake bell controls (time row hidden)");
  ok(!/Return/.test($(".flow")?.textContent || "") && /Fading out/.test($(".flow")?.textContent || ""), "flow lists a fade-out instead of a return phase");
  ok(/2:00$/.test([...$$(".flow li")].find(li => /Fading out/.test(li.textContent))?.textContent.trim() || ""), "default fade-out is 2 minutes");
  $("#dFade").value = "1"; $("#dFade").dispatchEvent(new window.Event("change", { bubbles: true }));
  await sleep(100);
  ok(JSON.parse(window.localStorage.getItem("gateway.settings")).sleepFade === 1 && /1:00$/.test([...$$(".flow li")].find(li => /Fading out/.test(li.textContent))?.textContent.trim() || ""), "fade-out length persists and the flow follows");
  $("#dWake").value = "wbtb:4.5"; $("#dWake").dispatchEvent(new window.Event("change", { bubbles: true }));
  await sleep(100);
  ok(JSON.parse(window.localStorage.getItem("gateway.nightPlan")).wake === "wbtb:4.5" && /\d{2}:\d{2}/.test($("#dWakeInfo")?.textContent || ""), `wake bell choice persists and shows the bell time (${$("#dWakeInfo")?.textContent.slice(0, 40)})`);
  $("#dWake").value = "at"; $("#dWake").dispatchEvent(new window.Event("change", { bubbles: true }));
  await sleep(100);
  ok($("#dWakeAtRow")?.hidden === false, "\"at a set time\" reveals the time input");
  $("#dWakeAt").value = "06:30"; $("#dWakeAt").dispatchEvent(new window.Event("change", { bubbles: true }));
  await sleep(100);
  ok(/06:30/.test($("#dWakeInfo")?.textContent || "") && JSON.parse(window.localStorage.getItem("gateway.nightPlan")).at === "06:30", "set time is used for the bell and persisted");
  $("#dWake").value = "wbtb:4.5"; $("#dWake").dispatchEvent(new window.Event("change", { bubbles: true }));
  await sleep(100);
  // start → drive the fake audio element to the end of the guided part
  $('[data-d="start"]').click();
  await sleep(600);
  ok(!$("#session").hidden && $("#session").classList.contains("night"), "night session starts in night mode");
  const audioEl = document.querySelector("audio");
  for (let i = 0; i < 40 && !$(".s-sleep"); i++) { audioEl.dispatchEvent(new window.Event("ended")); await sleep(120); }
  ok($(".s-sleep") != null && $("#session").classList.contains("sleeping"), "after the audio ends the session waits for the bell instead of finishing");
  ok(/\d{2}:\d{2}/.test($(".s-bell")?.textContent || "") && $('[data-a="cancelBell"]')?.hidden === false && $('[data-a="woke"]')?.hidden === true, `waiting screen shows the bell time (${$(".s-bell")?.textContent})`);
  ok(/Sleep/.test($(".s-phase")?.textContent || "") && $("#session .s-stage")?.hidden === true, "waiting screen hides the dial and names the sleep phase");
  // the silent piece ends 5 hours later → the bell rings
  const realNow = window.Date.now;
  window.Date.now = () => realNow() + 5 * 3600e3;
  audioEl.dispatchEvent(new window.Event("ended"));
  await sleep(400);
  ok($("#session").classList.contains("ringing") && $('[data-a="woke"]')?.hidden === false && $('[data-a="snooze"]')?.hidden === false, "bell rings once the wake time has passed");
  ok(audioEl.loop === true, "the bell loops until answered");
  ok(/Wake up/.test($(".s-wake-line")?.textContent || ""), `WBTB wake line shown (${$(".s-wake-line")?.textContent.slice(0, 30)})`);
  $('[data-a="snooze"]').click();
  await sleep(200);
  ok(!$("#session").classList.contains("ringing") && $('[data-a="woke"]')?.hidden === true && audioEl.loop === false, "snooze stops the bell and waits again");
  window.Date.now = () => realNow() + 5 * 3600e3 + 11 * 60e3;
  audioEl.dispatchEvent(new window.Event("ended"));
  await sleep(400);
  ok($("#session").classList.contains("ringing"), "bell rings again after the snooze");
  $('[data-a="woke"]').click();
  await sleep(300);
  window.Date.now = realNow;
  ok($("#session").hidden && $(".done-mark") != null, "\"I am awake\" ends the session on the done screen");
  ok($('[data-n="dream"]') != null && $('[data-open="ex-wbtb"]') != null, "done screen offers the dream journal and the WBTB session");
  const lastLog = JSON.parse(window.localStorage.getItem("gateway.log") || "[]").pop();
  ok(lastLog && lastLog.id === "w1-sleep" && lastLog.sec >= 20 && lastLog.sec < 3600, `log records the guided part only (${lastLog?.sec}s), not the hours of sleep`);
  $('[data-n="dream"]').click();
  await sleep(400);
  ok($('[data-jmode="dreams"]')?.getAttribute("aria-pressed") === "true" && $("#dreamText") != null, "dream journal opens in dream mode with the morning entry form ready");
  $("#dreamCancel").click();
  await sleep(200);
  $('[data-jmode="sessions"]').click();
  await sleep(200);
}

// ---------- breath guide: ring + label during paced-breathing holds, settings switch, flow chip ----------
{
  $('[data-tab="home"]').click();
  await sleep(200);
  $('[data-act="clearFilters"]')?.click();
  await sleep(100);
  $('[data-open="ex-boxbreath"]').click();
  await sleep(200);
  ok(/Box/i.test($(".d-head h1")?.textContent || ""), "box breathing detail opens");
  const chip = $(".flow .breath-chip");
  ok(chip != null && /in 4 s/.test(chip.textContent) && /hold 4 s/.test(chip.textContent) && /out 4 s/.test(chip.textContent) && /rest 4 s/.test(chip.textContent) && /tick/.test(chip.textContent), `flow shows the breathing pattern chip (${chip?.textContent})`);
  $('[data-act="back"]').click();
  await sleep(150);
  $('[data-open="w2-intro-12"]').click();
  await sleep(200);
  ok(/in 4 s · out 6 s · hum tone/.test($(".flow .breath-chip")?.textContent || ""), `every prep shows the resonant-tuning pattern (${$(".flow .breath-chip")?.textContent})`);
  $('[data-act="back"]').click();
  await sleep(150);
  $('[data-open="ex-boxbreath"]').click();
  await sleep(200);
  $('[data-d="start"]').click();
  await sleep(600);
  const audioEl = document.querySelector("audio");
  audioEl.currentTime = 0;               // jsdom keeps the previous test's currentTime across src changes; browsers reset it
  await sleep(400);
  ok(!$("#session").hidden && $("#session .s-breath") != null && $("#session .s-breath").hidden === true, `session starts with the breath ring present but hidden (spoken lines first; label=${$(".s-breath-label")?.textContent || "-"})`);
  audioEl.currentTime = 40;              // well inside the 300 s box hold (lines take ~12 s)
  await sleep(400);
  const breath = $("#session .s-breath");
  ok(breath.hidden === false && /^(In|Hold|Out|Rest) · \d$/.test($(".s-breath-label")?.textContent || ""), `breath ring shows during the hold with a stage label (${$(".s-breath-label")?.textContent})`);
  ok(/scale\(/.test($(".s-breath-ring")?.style.transform || ""), "ring is scaled with the breath level");
  ok(["in", "hold", "out", "rest"].includes(breath.dataset.stage), "ring carries the stage for styling");
  // the label advances with time
  const l1 = $(".s-breath-label").textContent;
  audioEl.currentTime = 44;
  await sleep(400);
  ok($(".s-breath-label").textContent !== l1, `label follows the timeline (${l1} → ${$(".s-breath-label").textContent})`);
  // skipping to the return phase hides the ring again
  $('[data-a="skip"]').click();
  await sleep(400);
  ok($("#session .s-breath").hidden === true, "ring hides outside paced-breathing holds");
  $('[data-a="stop"]').click(); await sleep(100);
  $('[data-a="yes"]').click(); await sleep(300);
  ok($("#session").hidden, "session ends");
  // settings switch turns the guide off; the ring stays hidden even inside the hold
  $('[data-tab="settings"]').click();
  await sleep(200);
  ok($("#sBreath") != null && $("#sBreath").checked === true, "breath guide switch present and on by default");
  $("#sBreath").checked = false; $("#sBreath").dispatchEvent(new window.Event("change", { bubbles: true }));
  await sleep(100);
  ok(JSON.parse(window.localStorage.getItem("gateway.settings")).breathGuide === false, "breath guide setting persists");
  $('[data-tab="home"]').click();
  await sleep(200);
  $('[data-open="ex-boxbreath"]').click();
  await sleep(200);
  $('[data-d="start"]').click();
  await sleep(600);
  document.querySelector("audio").currentTime = 40;
  await sleep(400);
  ok($("#session .s-breath").hidden === true, "with the guide off the ring never shows");
  document.querySelector("audio").currentTime = 0;
  $('[data-a="stop"]').click(); await sleep(100);
  $('[data-a="yes"]').click(); await sleep(300);
  $('[data-tab="settings"]').click();
  await sleep(200);
  $("#sBreath").checked = true; $("#sBreath").dispatchEvent(new window.Event("change", { bubbles: true }));
  await sleep(100);
}

// ---------- research tab (50-dossier Reality Investigation & Cross-Domain Hidden-Pattern Atlas) ----------
{
  $('[data-tab="research"]').click();
  await sleep(300);
  ok($$(".r-topic").length === 91, `research tab lists 50 dossiers, 40 Horizon areas and Φ-2 (got ${$$(".r-topic").length})`);
  ok($$("[data-res]").length === 132, `50 dossiers, 40 Horizon areas and Φ-2, plus 41 Horizon panel entries are clickable (got ${$$("[data-res]").length})`);
  ok($(".hp-atlas [data-diag='master-hidden-patterns'] svg") != null, "research tab embeds the Master Hidden-Pattern Atlas SVG diagram");
  ok($(".hp-deep [data-diag='deep-meta-patterns-omega'] svg") != null, "research tab embeds the 3-Tier Deep Hidden-Pattern Pyramid (MP-1..MP-4 & Omega-1) SVG diagram");
  ok($$(".mp-item").length === 4 && $(".omega-item") != null, "research tab renders all 4 Second-Order Meta-Laws (MP-1..MP-4) and the Omega-1 First Cause");
  ok($(".hp-hist [data-diag='historical-flow-macro-cycle'] svg") != null, "research tab embeds the Historical Flow Macro-Cycle (THP-1..THP-5 & Phi-1) SVG diagram");
  ok($$(".thp-item").length === 5 && $(".phi-item") != null, "research tab renders all 5 Historical Flow Laws (THP-1..THP-5) and the Phi-1 Planetary Macro-DMN Law");
  ok($(".hp-horizon [data-diag='horizon-areas-map'] svg") != null, "research tab embeds the 40-area Horizon Excavation map");
  ok($$(".hz-item").length === 40, `Horizon panel lists all 40 program areas (got ${$$(".hz-item").length})`);
  ok($$(".hz-item.ready").length === 40, `Batches 1-15 Horizon areas are ready and openable (got ${$$(".hz-item.ready").length})`);
  ok($(".hz-final[data-res='phi2-ufuk-sentezi']") != null && $$(".hz-item").length === 40, "Φ-2 has its own opening panel entry, distinct from the 40 areas");
  ok($$("[data-rpat]").length >= 16, `at least 16 cross-domain hidden pattern filter buttons (got ${$$("[data-rpat]").length})`);
  $('[data-rpat="HP-1"]').click();
  await sleep(100);
  ok($$(".r-topic").length < 50 && $$(".r-topic").length >= 6, "filtering by HP-1 narrows the dossier list to HP-1 participants");
  $('[data-rpat="HP-1"]').click();
  await sleep(100);
  $('[data-rlayer="ready"]').click();
  await sleep(100);
  ok($$(".r-topic.upcoming").length === 0 && $$("[data-res]").length === 132, "ready filter shows all 50 original monographs, 40 Horizon areas and Φ-2 (panel entries included)");
  $('[data-res="d01-epistemoloji-konsensus-ve-yontem"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='epistemic-bayes-filter'] svg") != null, "dossier 01 renders its embedded SVG scientific schematic");
  ok($(".guide-body blockquote.hp-callout") != null, "dossier 01 renders its Hidden Pattern callout box");
  ok($(".guide-body details.g-toc") != null, "dossier 01 builds a table of contents");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="d11-jacobo-grinberg-ve-sinterjik-kafes"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='grinberg-syntergic-lattice'] svg") != null, "dossier 11 renders its embedded Syntergic Lattice SVG schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="d21-tipta-zihin-beden-mason-ve-did"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='mason-ichthyosis-did-switch'] svg") != null, "dossier 21 renders its embedded Mason Ichthyosis & DID SVG schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="d31-janet-myers-xenoglossy-ve-scole"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='myers-subliminal-cross-correspondences'] svg") != null, "dossier 31 renders its embedded Myers Subliminal & Cross-Correspondences SVG schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="d40-uzay-zamanin-olumu-adscft-amplituhedron-4b"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='arkani-hamed-amplituhedron-adscft'] svg") != null, "dossier 40 renders its embedded AdS/CFT & Amplituhedron SVG schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="d50-kendi-muhakememiz-ve-5-kesin-deney"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='unified-reality-equation-5-experiments'] svg") != null, "dossier 50 renders its embedded Unified Reality Equation & 5 Definitive Experiments SVG schematic");
  ok($(".guide-body [data-diag='deep-meta-patterns-omega'] svg") != null, "dossier 50 renders its embedded 3-Tier Deep Hidden-Pattern Pyramid (MP-1..MP-4 & Omega-1) SVG schematic");
  ok($(".guide-body [data-diag='historical-flow-macro-cycle'] svg") != null, "dossier 50 renders its embedded Historical Flow Macro-Cycle (THP-1..THP-5 & Phi-1) SVG schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua17-kapali-dongu-ses-ve-norofeedback"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua17'] svg") != null, "UA-17 dossier renders its closed-loop phase-locking schematic");
  ok($(".guide-body blockquote.hp-callout") != null, "UA-17 dossier renders its Hidden Pattern callout box");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua24-bagirsak-beyin-mikrobiyom-oruc"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua24'] svg") != null, "UA-24 dossier renders its gut-brain calibration schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua25-solunum-termoregulasyon"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua25'] svg") != null, "UA-25 dossier renders its autonomic root-access schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua13-anlamin-farmakolojisi-plasebo"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua13'] svg") != null, "UA-13 dossier renders its meaning-pharmacy schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua16-engram-ve-yazilabilir-ani"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua16'] svg") != null, "UA-16 dossier renders its engram/access-key schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua05-yasam-boyu-filtre-egrisi"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua05'] svg") != null, "UA-05 dossier renders its lifespan U-shaped filter-curve schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua14-esrik-kapi-dmn-cozulmesi"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua14'] svg") != null, "UA-14 dossier renders its two-keys-one-lock schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua12-vakum-biyoloji-super-radyans"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua12'] svg") != null, "UA-12 dossier renders its superradiance coherence-bridge schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua35-zaman-algisinin-lastigi"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua35'] svg") != null, "UA-35 dossier renders its internal clock patch schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua36-interosepsiyon-derinligi"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua36'] svg") != null, "UA-36 dossier renders its interoceptive main-channel schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua39-obe-noro-anatomisi-tpj"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua39'] svg") != null, "UA-39 dossier renders its TPJ self-model gateway schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua40-olcum-problemi-ve-sinir-fizigi"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua40'] svg") != null, "UA-40 dossier renders its no-measurement boundary schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua30-epistemik-muhasebe"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua30'] svg") != null, "UA-30 dossier renders its epistemic immunity schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua08-nokturnal-kalibrasyon-uyku"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua08'] svg") != null, "UA-08 dossier renders its nightly synchronization schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua15-olumun-fizyolojisi"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua15'] svg") != null, "UA-15 dossier renders its reverse phase transition schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua02-noetik-inovasyon-hipnogojik-indirme"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua02'] svg") != null, "UA-02 dossier renders its two-phase noetic compression schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua06-harmonik-izolasyon-altin-oran"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua06'] svg") != null, "UA-06 dossier renders its harmonic isolation schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua01-kutsal-fonetik-ve-noro-akustik"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua01'] svg") != null, "UA-01 dossier renders its acoustic-autonomic driver schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua18-ritim-surusu-davul-sema"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua18'] svg") != null, "UA-18 dossier renders its collective driving schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua19-mekanin-fizigi-arkeoakustik"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua19'] svg") != null, "UA-19 dossier renders its archaeoacoustic lens schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua03-zoonoetik-alan-biyosferik-internet"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua03'] svg") != null, "UA-03 dossier renders its signal-market coupling schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua04-beyin-disi-dagitik-bellek"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua04'] svg") != null, "UA-04 dossier renders its access-key memory schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua09-onko-biyoelektrik-yabancilasma"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua09'] svg") != null, "UA-09 dossier renders its multi-layered defection schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua07-astro-jeofizik-kuplaj-lst"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua07'] svg") != null, "UA-07 dossier renders its sidereal-hour window schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua10-mitoloji-noro-topolojik-sema"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua10'] svg") != null, "UA-10 dossier renders its neuro-phenomenological descent schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua22-ic-manyetik-duyu-epifiz"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua22'] svg") != null, "UA-22 dossier renders its silent magnetic signature schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua26-ayna-devreleri-morfik-alan"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua26'] svg") != null, "UA-26 dossier renders its three-rival-models schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua27-zihin-zihin-havuzu-ganzfeld"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua27'] svg") != null, "UA-27 dossier renders its tuned-receiver schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua28-zihin-madde-havuzu-sifa-dua"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua28'] svg") != null, "UA-28 dossier renders its quality-gradient schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua20-fasya-sebekesi-spontan-hareket"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua20'] svg") != null, "UA-20 dossier renders its release-threshold schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua32-akis-hali-zirve-performans"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua32'] svg") != null, "UA-32 dossier renders its self-vector alignment schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua33-doga-temasi-orman-topraklanma"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua33'] svg") != null, "UA-33 dossier renders its external-green calibration schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua11-sentetik-bilinc-ve-anten"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua11'] svg") != null, "UA-11 dossier renders its field-evidence ladder schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua21-orch-or-un-donusu"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua21'] svg") != null, "UA-21 dossier renders its microtubule mediation ladder schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua23-arayuz-elektirigi-ez-suyu"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua23'] svg") != null, "UA-23 dossier renders its interface-electricity budget schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua29-retrokausalite-fizigi"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua29'] svg") != null, "UA-29 dossier renders its time-boundary schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua31-uap-trickster-fenomenolojisi"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua31'] svg") != null, "UA-31 dossier renders its record-selection schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-res="ua34-ay-dongusu-biyolojik-gelgit"]').click();
  await sleep(250);
  ok($(".guide-body [data-diag='horizon-ua34'] svg") != null, "UA-34 dossier renders its lunar-modulation schematic");
  $('[data-act="gback"]').click();
  await sleep(200);
  for (const [slug, diagram, label] of [
    ["ua37-bikameral-zihin-jaynes", "horizon-ua37", "UA-37"],
    ["ua38-sugestopedi-hizlandirilmis-ogrenme", "horizon-ua38", "UA-38"]
  ]) {
    $(`[data-res="${slug}"]`).click();
    await sleep(250);
    ok($(".guide-body [data-diag='" + diagram + "'] svg") != null, `${label} dossier renders its bilingual evidence schematic`);
    $('[data-act="gback"]').click();
    await sleep(200);
  }
  $(".hz-final").click();
  await sleep(250);
  ok(/Φ-2/.test($(".guide-body h1")?.textContent || "") && $(".guide-body [data-diag='horizon-phi2'] svg") != null && /Horizon Synthesis/.test($(".guide-body h1")?.textContent || "") && $(".guide-body").textContent.includes("UA-40") && $(".guide-body [data-diag=\'horizon-phi2\'] svg").textContent.includes("Input X"), "English Φ-2 finale opens with complete ledger and localized diagram");
  $('[data-act="gback"]').click();
  await sleep(200);
  $('[data-tab="settings"]').click();
  await sleep(200);
  $("#sLang").value = "tr";
  $("#sLang").dispatchEvent(new window.Event("change", { bubbles: true }));
  await sleep(200);
  $('[data-tab="research"]').click();
  await sleep(300);
  $(".hz-final").click();
  await sleep(250);
  ok(/Ufuk Sentezi/.test($(".guide-body h1")?.textContent || "") && $(".guide-body [data-diag='horizon-phi2'] svg")?.textContent.includes("Girdi X"), "Turkish Φ-2 finale and diagram follow the UI language");
  $('[data-act="gback"]').click();
  await sleep(200);
  $("#resq").value = "Bentov";
  $("#resq").dispatchEvent(new window.Event("input", { bubbles: true }));
  await sleep(350);
  ok($$(".g-hit[data-res]").length >= 2, "research full-text search finds Bentov across dossiers");
  $("#resq").value = "";
  $("#resq").dispatchEvent(new window.Event("input", { bubbles: true }));
  await sleep(250);
  $('[data-tab="home"]').click();
  await sleep(150);
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
