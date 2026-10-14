// End-to-end smoke of the Android wiring in jsdom: the app boots with a fake `window.Capacitor` bridge (the shape
// Capacitor's runtime provides) and we check that the UI drives the plugins — channels at boot, the Settings
// Android panel, the session service around a session, scheduled reminders from the journal/settings, and the
// share sheet for exports. Same harness as smoke-test.mjs (SMOKE_DIR with jsdom; SMOKE_BUNDLE = esbuild IIFE).
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
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

const dom = new JSDOM(html, { url: "http://localhost/", runScripts: "dangerously", pretendToBeVisual: true });
const { window } = dom;
const { document } = window;
window.URL.createObjectURL = () => "blob:smoke";
window.URL.revokeObjectURL = () => {};
window.localStorage.setItem("gateway.settings", JSON.stringify({ lang: "tr" }));   // jsdom reports en-US; the checks below read Turkish UI texts

let pass = 0, fail = 0;
const ok = (cond, name) => { cond ? pass++ : fail++; console.log(`${cond ? "PASS" : "FAIL"} ${name}`); };
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ---------- the fake bridge ----------
const calls = [];
const listeners = {};
const rec = (p, m, ret) => (...a) => { calls.push([p, m, a[0]]); return Promise.resolve(typeof ret === "function" ? ret(a[0]) : ret); };
const listen = p => (ev, cb) => { (listeners[p + ":" + ev] ||= []).push(cb); return Promise.resolve({ remove() {} }); };
const fire = (p, ev, data) => (listeners[p + ":" + ev] || []).forEach(cb => cb(data));
const last = (p, m) => [...calls].reverse().find(c => c[0] === p && c[1] === m)?.[2];
const count = (p, m) => calls.filter(c => c[0] === p && c[1] === m).length;
let notif = "prompt";
window.Capacitor = {
  isNativePlatform: () => true, getPlatform: () => "android",
  Plugins: {
    App: { addListener: listen("App"), minimizeApp: rec("App", "minimize"), getInfo: rec("App", "getInfo", { version: "0.7.0", build: "700" }) },
    LocalNotifications: {
      checkPermissions: rec("LN", "check", () => ({ display: notif })),
      requestPermissions: rec("LN", "request", () => { notif = "granted"; return { display: notif }; }),
      schedule: rec("LN", "schedule", o => ({ notifications: o.notifications.map(n => ({ id: n.id })) })),
      cancel: rec("LN", "cancel"), createChannel: rec("LN", "createChannel"),
      checkExactNotificationSetting: rec("LN", "checkExact", { exact_alarm: "granted" }),
      changeExactNotificationSetting: rec("LN", "changeExact", { exact_alarm: "granted" }),
      addListener: listen("LN"),
    },
    ForegroundService: { createNotificationChannel: rec("FG", "createChannel"), startForegroundService: rec("FG", "start"), updateForegroundService: rec("FG", "update"), stopForegroundService: rec("FG", "stop"), addListener: listen("FG") },
    Filesystem: { writeFile: rec("FS", "writeFile", o => ({ uri: "file:///cache/" + o.path })) },
    Share: { share: rec("SH", "share", { activityType: "x" }) },
    TextToSpeech: { getSupportedVoices: rec("TTS", "voices", { voices: [{ voiceURI: "en-x-a", name: "English A", lang: "en-US" }, { voiceURI: "tr-x-a", name: "Türkçe A", lang: "tr_TR" }] }), speak: rec("TTS", "speak"), stop: rec("TTS", "stop") },
  },
};

const s1 = document.createElement("script"); s1.textContent = contentJs; document.body.appendChild(s1);
const s2 = document.createElement("script"); s2.textContent = bundle; document.body.appendChild(s2);
await sleep(400);

// ---------- boot ----------
ok($("#view h1")?.textContent === "Gateway" && document.documentElement.lang === "tr", "app boots with the native bridge (tr)");
ok(count("FG", "createChannel") === 1 && count("LN", "createChannel") === 2, "three notification channels created at boot");
ok(calls.some(c => c[0] === "LN" && c[1] === "createChannel" && c[2].id === "gateway-wake" && c[2].sound === "bell.wav"), "wake channel carries the bell sound");
ok(calls.some(c => c[0] === "LN" && c[1] === "createChannel" && c[2].name === "Hatırlatıcılar"), "channel names are localised (tr)");
ok((listeners["App:backButton"] || []).length === 1 && (listeners["App:appStateChange"] || []).length === 1, "back-button and app-state listeners installed");
ok((listeners["LN:localNotificationReceived"] || []).length === 1, "notification listener installed");
ok(count("LN", "cancel") >= 2 && count("LN", "schedule") === 0, "reminders off: id blocks cleared, nothing scheduled");

// ---------- settings: Android panel ----------
$('[data-tab="settings"]').click(); await sleep(300);
ok($("#androidPanel") != null, "settings show the Android panel");
ok(/izin yok/.test($("#sNotifStatus")?.textContent || ""), `notification status reads "not allowed" before the prompt (${$("#sNotifStatus")?.textContent})`);
ok($("#sExactOpen")?.hidden === true, "alarm-permission button hidden while exact alarms are allowed");
ok(/0\.7\.0/.test($("#sAndroidVersion")?.textContent || ""), `version line (${$("#sAndroidVersion")?.textContent})`);
$("#sNotifAllow").click(); await sleep(100);
ok(count("LN", "request") === 1 && /izin verildi/.test($("#sNotifStatus")?.textContent || ""), "allow button requests the permission and repaints");
ok($("#sNotifAllow").hidden === true, "allow button disappears once granted");
ok($("#pcMixedWarn") == null, "no https/mixed-content warning on Android");

// ---------- settings: native TTS voices ----------
await sleep(50);
ok(count("TTS", "voices") === 1, "voice list fetched from the native engine");
ok($$("#sTtsVoice option").some(o => o.value === "tr-x-a") && !$$("#sTtsVoice option").some(o => o.value === "en-x-a"), "native voices of the UI language fill the voice select");
ok(!$("#sTtsTest").disabled && !$("#sTtsVoice").disabled, "TTS rows enabled with the native engine (no speechSynthesis in jsdom)");
$("#sTtsTest").click(); await sleep(50);
ok(last("TTS", "speak")?.lang === "tr-TR" && last("TTS", "speak")?.queueStrategy === 1, "test button speaks through the native engine");

// ---------- settings: command reminders → scheduled notifications ----------
$("#sHpRemind").value = "2"; $("#sHpRemind").dispatchEvent(new window.Event("change", { bubbles: true })); await sleep(100);
const hp = [...calls].reverse().find(c => c[0] === "LN" && c[1] === "schedule" && c[2].notifications[0].id >= 7200);
ok(hp != null && hp[2].notifications.length >= 6, `command reminders scheduled (${hp?.[2].notifications.length})`);
ok(hp && hp[2].notifications.every(n => n.channelId === "gateway-remind" && n.isExactNotification === false && n.extra.kind === "hp"), "command reminders: remind channel, inexact, kind hp");
ok(hp && /Plus /.test(hp[2].notifications[0].body), `command reminder body carries the command (${hp?.[2].notifications[0].body})`);
ok(hp && hp[2].notifications.every(n => { const h = n.schedule.at.getHours(); return h >= 9 && h < 22; }), "command reminders stay inside the 09–22 window");

// ---------- journal: reality checks → scheduled notifications; export → share sheet ----------
$('[data-tab="journal"]').click(); await sleep(300);
ok($("#jPrint")?.hidden === true, "print button hidden on Android");
$('[data-jmode="dreams"]').click(); await sleep(300);
$("#rcEvery").value = "3"; $("#rcEvery").dispatchEvent(new window.Event("change")); await sleep(100);
const rc = [...calls].reverse().find(c => c[0] === "LN" && c[1] === "schedule" && c[2].notifications[0].id >= 7000 && c[2].notifications[0].id < 7200);
ok(rc != null && rc[2].notifications.length >= 4, `reality checks scheduled (${rc?.[2].notifications.length})`);
ok(rc && rc[2].notifications[0].title === "Gerçeklik testi hatırlatıcısı" && rc[2].notifications[0].extra.kind === "rc", "reality-check notification title/kind");
const before = count("LN", "schedule");
$("#rcTo").value = "20"; $("#rcTo").dispatchEvent(new window.Event("change")); await sleep(100);
ok(count("LN", "schedule") === before + 2, "changing the window re-schedules both reminder kinds");
const hp2 = [...calls].reverse().find(c => c[0] === "LN" && c[1] === "schedule" && c[2].notifications[0].id >= 7200);
ok(hp2 && hp2[2].notifications.every(n => n.schedule.at.getHours() < 20), "command reminders follow the new window end");
// a foreground notification shows as a toast
fire("LN", "localNotificationReceived", { title: "T", body: "Rüyada mısın?", extra: { kind: "rc" } }); await sleep(50);
ok($$(".toast").some(t => /Rüyada mısın/.test(t.textContent)), "foreground notification becomes a toast");
$('[data-jmode="sessions"]').click(); await sleep(300);
$("#bkExport").click(); await sleep(300);
ok(last("FS", "writeFile")?.directory === "CACHE" && /gateway-backup-.*\.json$/.test(last("FS", "writeFile")?.path || ""), "backup export writes the file to the cache dir");
ok(Array.isArray(last("SH", "share")?.files) && last("SH", "share").files[0].startsWith("file:///cache/"), "…and opens the share sheet with it");

// ---------- a session runs inside the foreground service ----------
$('[data-tab="home"]').click(); await sleep(300);
$('[data-open="w2-intro-12"]').click(); await sleep(100);
$('[data-d="start"]').click(); await sleep(600);
ok($("#session") && !$("#session").hidden, "session overlay opens");
const st = last("FG", "start");
ok(st && st.serviceType === 2 && st.notificationChannelId === "gateway-session" && st.smallIcon === "ic_stat_gateway", "foreground service started as media playback on the session channel");
ok(st && st.buttons?.[0]?.title === "Bitir" && /Focus 12/.test(st.title), `service notification has the session title and an End button (${st?.title})`);
// hardware back must not kill the session
fire("App", "backButton", { canGoBack: true }); await sleep(200);
ok(!$("#session").hidden, "hardware back during a session keeps it running");
// the notification button ends it
fire("FG", "buttonClicked", { buttonId: 1 }); await sleep(300);
ok($("#session").hidden && count("FG", "stop") === 1, "End button on the notification stops the session and the service");
ok($(".done-mark") != null, "done screen shows afterwards");

// ---------- back button at the root minimises ----------
$('[data-tab="home"]').click(); await sleep(200);
const m = count("App", "minimize");
fire("App", "backButton", { canGoBack: false });
ok(count("App", "minimize") === m + 1, "back at the root minimises the app instead of killing it");

// ---------- app resume re-syncs the reminder queue ----------
const sch = count("LN", "schedule");
fire("App", "appStateChange", { isActive: true }); await sleep(100);
ok(count("LN", "schedule") === sch + 2, "returning to the app re-schedules both reminder kinds");

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
