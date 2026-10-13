// Tests for src/js/native.js: the web build must see harmless no-ops, and the Android build must call the
// Capacitor plugins with the right shapes. The module reads `window.Capacitor` at import time, so the native case
// loads a second instance (query-string import) after installing a fake bridge that records every call.
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import path from "node:path";

const here = path.dirname(new URL(import.meta.url).pathname);
const modUrl = pathToFileURL(path.join(here, "../src/js/native.js")).href;
let passed = 0;
const ok = (name, fn) => { try { fn(); passed++; } catch (e) { console.error("FAIL", name, "\n ", e && e.message || e); process.exitCode = 1; } };
const okAsync = async (name, fn) => { try { await fn(); passed++; } catch (e) { console.error("FAIL", name, "\n ", e && e.message || e); process.exitCode = 1; } };

// ---------- 1. web build: no window.Capacitor ----------
globalThis.window = { history: { length: 1, back() {} } };
const web = await import(modUrl + "?web");
ok("web: not native", () => { assert.equal(web.isNative, false); assert.equal(web.platform, "web"); assert.equal(web.plugin("LocalNotifications"), null); });
await okAsync("web: service/reminders/share/tts are no-ops", async () => {
  assert.equal(await web.sessionService(true, { title: "x" }), false);
  assert.equal(await web.scheduleReminders("rc", [{ at: Date.now() + 1e6, title: "a", body: "b" }]), 0);
  assert.equal(await web.scheduleWake(Date.now() + 1e6), false);
  assert.equal(await web.shareFile("t", "n.txt", "text/plain"), false);
  assert.equal(web.nativeTts.available(), false);
  assert.equal(web.nativeTts.speak("hi", "en"), false);
  assert.equal(await web.notifyPermission(true), null);
  assert.equal(await web.exactAlarmsAllowed(), null);
  assert.equal(await web.initNative({}), false);
  assert.equal(await web.nativeInfo(), null);
  assert.equal(await web.ensureChannels(), false);
});

// ---------- reminderSlots (pure) ----------
const local = (y, m, d, h, mi = 0) => new Date(y, m - 1, d, h, mi).getTime();
const now = local(2026, 10, 10, 10, 30);
ok("slots: anchored at the window start, two days ahead", () => {
  const s = web.reminderSlots({ every: 2, from: 9, to: 22, now });
  const hours = s.map(ms => { const d = new Date(ms); return `${d.getDate()}@${d.getHours()}`; });
  assert.deepEqual(hours.slice(0, 7), ["10@11", "10@13", "10@15", "10@17", "10@19", "10@21", "11@9"]);
  assert.equal(s.length, 14);                                  // 6 today + 7 tomorrow + 09:00 the day after
  assert.ok(s.every((v, i) => v > now && (i === 0 || v > s[i - 1])));
  assert.ok(s.every(ms => { const h = new Date(ms).getHours(); return h >= 9 && h < 22; }));
});
ok("slots: window across midnight", () => {
  const s = web.reminderSlots({ every: 2, from: 22, to: 6, now });
  const hs = s.map(ms => new Date(ms).getHours());
  assert.deepEqual(hs.slice(0, 4), [22, 0, 2, 4]);
  assert.ok(hs.every(h => h >= 22 || h < 6));
  assert.ok(s.length >= 8);
});
ok("slots: off, cap, every hour, same from/to = whole day", () => {
  assert.deepEqual(web.reminderSlots({ every: 0, now }), []);
  assert.equal(web.reminderSlots({ every: 1, from: 9, to: 22, now, cap: 5 }).length, 5);
  assert.equal(web.reminderSlots({ every: 1, from: 9, to: 22, now }).length, 26);   // 11 today + 13 tomorrow + 2
  const all = web.reminderSlots({ every: 6, from: 0, to: 0, now, days: 1 });
  assert.deepEqual(all.map(ms => new Date(ms).getHours()), [12, 18, 0, 6]);
});

// ---------- 2. Android build: fake Capacitor bridge ----------
const calls = [];
const rec = (p, m, ret) => (...a) => { calls.push([p, m, a[0]]); return Promise.resolve(typeof ret === "function" ? ret(a[0]) : ret); };
const listeners = {};
const listen = p => (ev, cb) => { (listeners[p + ":" + ev] ||= []).push(cb); return Promise.resolve({ remove() {} }); };
const fire = (p, ev, data) => (listeners[p + ":" + ev] || []).forEach(cb => cb(data));
let notifState = "prompt", exactState = "granted", shareError = null;
const Plugins = {
  LocalNotifications: {
    checkPermissions: rec("LN", "check", () => ({ display: notifState })),
    requestPermissions: rec("LN", "request", () => { notifState = "granted"; return { display: notifState }; }),
    schedule: rec("LN", "schedule", o => ({ notifications: o.notifications.map(n => ({ id: n.id })) })),
    cancel: rec("LN", "cancel", undefined),
    createChannel: rec("LN", "createChannel", undefined),
    checkExactNotificationSetting: rec("LN", "checkExact", () => ({ exact_alarm: exactState })),
    changeExactNotificationSetting: rec("LN", "changeExact", () => ({ exact_alarm: "granted" })),
    addListener: listen("LN"),
  },
  ForegroundService: {
    createNotificationChannel: rec("FG", "createChannel", undefined),
    startForegroundService: rec("FG", "start", undefined),
    updateForegroundService: rec("FG", "update", undefined),
    stopForegroundService: rec("FG", "stop", undefined),
    addListener: listen("FG"),
  },
  Filesystem: { writeFile: rec("FS", "writeFile", o => ({ uri: "file:///cache/" + o.path })) },
  Share: { share: (...a) => { calls.push(["SH", "share", a[0]]); return shareError ? Promise.reject(new Error(shareError)) : Promise.resolve({ activityType: "x" }); } },
  TextToSpeech: {
    getSupportedVoices: rec("TTS", "voices", { voices: [{ voiceURI: "en-x-a", name: "A", lang: "en-US" }, { voiceURI: "tr-x-b", name: "B", lang: "tr_TR" }, { voiceURI: "tr-x-c", name: "C", lang: "tr-TR" }] }),
    speak: rec("TTS", "speak", undefined),
    stop: rec("TTS", "stop", undefined),
  },
  App: { addListener: listen("App"), minimizeApp: rec("App", "minimize", undefined), getInfo: rec("App", "getInfo", { version: "0.7.0", build: "700" }) },
};
let backs = 0;
globalThis.window = { Capacitor: { isNativePlatform: () => true, getPlatform: () => "android", Plugins }, history: { length: 3, back() { backs++; } } };
const nat = await import(modUrl + "?android");
const last = (p, m) => [...calls].reverse().find(c => c[0] === p && c[1] === m)?.[2];
const count = (p, m) => calls.filter(c => c[0] === p && c[1] === m).length;

ok("android: detected", () => { assert.equal(nat.isNative, true); assert.equal(nat.platform, "android"); assert.ok(nat.plugin("LocalNotifications")); });
await okAsync("android: init creates channels and wires listeners", async () => {
  let resumed = 0; const got = [];
  assert.equal(await nat.initNative({ channels: { session: "Oturum", remind: "Hatırlatıcılar", wake: "Çan" }, onResume: () => resumed++, onNotification: n => got.push(n) }), true);
  assert.equal(count("FG", "createChannel"), 1);
  assert.equal(count("LN", "createChannel"), 2);
  const wake = calls.find(c => c[0] === "LN" && c[1] === "createChannel" && c[2].id === nat.CHANNELS.wake)[2];
  assert.equal(wake.sound, "bell.wav"); assert.equal(wake.importance, 5); assert.equal(wake.name, "Çan");
  assert.equal(last("FG", "createChannel").importance, 2);
  fire("App", "appStateChange", { isActive: true }); fire("App", "appStateChange", { isActive: false });
  assert.equal(resumed, 1);
  fire("App", "backButton", { canGoBack: true }); assert.equal(backs, 1); assert.equal(count("App", "minimize"), 0);
  fire("App", "backButton", { canGoBack: false }); assert.equal(count("App", "minimize"), 1);
  fire("LN", "localNotificationReceived", { title: "T", body: "B", extra: { kind: "rc" } });
  fire("LN", "localNotificationActionPerformed", { notification: { extra: { kind: "hp" } } });
  assert.deepEqual(got, [{ kind: "rc", foreground: true, title: "T", body: "B" }, { kind: "hp", tapped: true }]);
  await nat.ensureChannels(); assert.equal(count("LN", "createChannel"), 2);   // once only
});
await okAsync("android: permissions", async () => {
  assert.equal(await nat.notifyPermission(false), "prompt");
  assert.equal(count("LN", "request"), 0);
  assert.equal(await nat.notifyPermission(true), "granted");
  assert.equal(count("LN", "request"), 1);
  assert.equal(await nat.exactAlarmsAllowed(), true);
  exactState = "denied";
  assert.equal(await nat.exactAlarmsAllowed(), false);
  assert.equal(await nat.openExactAlarmSettings(), true);
  exactState = "granted";
});
await okAsync("android: session service start/update/stop + stop button", async () => {
  let stops = 0; const off = nat.onServiceStop(() => stops++);
  assert.equal(await nat.sessionService(true, { title: "Focus 10", body: "Gateway", stopLabel: "Bitir" }), true);
  const st = last("FG", "start");
  assert.equal(st.id, nat.IDS.service); assert.equal(st.serviceType, 2); assert.equal(st.smallIcon, "ic_stat_gateway");
  assert.equal(st.notificationChannelId, nat.CHANNELS.session); assert.equal(st.silent, true);
  assert.deepEqual(st.buttons, [{ id: 1, title: "Bitir" }]); assert.equal(st.title, "Focus 10");
  assert.equal(nat.serviceRunning(), true);
  assert.equal(await nat.sessionService(true, { title: "Focus 10", body: "Uyku · çan 05:30", stopLabel: "Çanı iptal et" }), true);
  assert.equal(count("FG", "start"), 1); assert.equal(count("FG", "update"), 1);
  assert.equal(last("FG", "update").body, "Uyku · çan 05:30");
  fire("FG", "buttonClicked", { buttonId: 1 }); assert.equal(stops, 1);
  assert.equal(await nat.sessionService(false), true);
  assert.equal(count("FG", "stop"), 1); assert.equal(nat.serviceRunning(), false);
  await nat.sessionService(false); assert.equal(count("FG", "stop"), 1);          // idempotent
  off(); fire("FG", "buttonClicked", { buttonId: 1 }); assert.equal(stops, 1);
});
await okAsync("android: reminders replace their id block", async () => {
  const items = [1, 2, 3].map(i => ({ at: now + i * 3600e3, title: "Rc", body: "Body " + i }));
  assert.equal(await nat.scheduleReminders("rc", items), 3);
  const c = last("LN", "cancel");
  assert.equal(c.notifications.length, nat.IDS.span); assert.equal(c.notifications[0].id, nat.IDS.rc);
  const sch = last("LN", "schedule").notifications;
  assert.deepEqual(sch.map(n => n.id), [7000, 7001, 7002]);
  assert.equal(sch[0].channelId, nat.CHANNELS.remind); assert.equal(sch[0].isExactNotification, false);
  assert.equal(sch[0].schedule.at.getTime(), now + 3600e3); assert.equal(sch[0].schedule.allowWhileIdle, true);
  assert.deepEqual(sch[2].extra, { kind: "rc" }); assert.equal(sch[2].body, "Body 3");
  const before = count("LN", "schedule");
  assert.equal(await nat.scheduleReminders("hp", []), 0);
  assert.equal(count("LN", "schedule"), before); assert.equal(last("LN", "cancel").notifications[0].id, nat.IDS.hp);
  const many = Array.from({ length: 80 }, (_, i) => ({ at: now + i * 1e5, title: "x", body: "y" }));
  assert.equal(await nat.scheduleReminders("hp", many), nat.IDS.span);
  await nat.cancelReminders("rc"); assert.equal(last("LN", "cancel").notifications[0].id, nat.IDS.rc);
});
await okAsync("android: wake alarm exact when allowed, inexact when revoked", async () => {
  assert.equal(await nat.scheduleWake(now + 8 * 3600e3, { title: "Uyan!", body: "Focus 10" }), true);
  let n = last("LN", "schedule").notifications[0];
  assert.equal(n.id, nat.IDS.wake); assert.equal(n.channelId, nat.CHANNELS.wake); assert.equal(n.isExactNotification, true);
  assert.equal(n.schedule.at.getTime(), now + 8 * 3600e3); assert.equal(n.title, "Uyan!");
  exactState = "denied";
  await nat.scheduleWake(now + 9 * 3600e3);
  n = last("LN", "schedule").notifications[0];
  assert.equal(n.isExactNotification, false);
  exactState = "granted";
  await nat.cancelWake();
  assert.deepEqual(last("LN", "cancel").notifications, [{ id: nat.IDS.wake }]);
});
await okAsync("android: share writes to the cache dir and opens the sheet", async () => {
  assert.equal(await nat.shareFile("{\"a\":1}", "gateway-backup.json", "application/json", "Yedek"), true);
  const w = last("FS", "writeFile");
  assert.equal(w.path, "gateway-backup.json"); assert.equal(w.directory, "CACHE"); assert.equal(w.encoding, "utf8"); assert.equal(w.data, "{\"a\":1}");
  const sh = last("SH", "share");
  assert.deepEqual(sh.files, ["file:///cache/gateway-backup.json"]); assert.equal(sh.title, "Yedek");
  shareError = "Share canceled";
  assert.equal(await nat.shareFile("x", "a.md", "text/markdown"), true);       // dismissed: handled, no download fallback
  shareError = "Share is not implemented on this platform";
  assert.equal(await nat.shareFile("x", "a.md", "text/markdown"), false);
  shareError = null;
});
await okAsync("android: native text-to-speech", async () => {
  assert.equal(nat.nativeTts.available(), true);
  assert.deepEqual(nat.nativeTts.voices("tr"), []);                             // not loaded yet
  let cbs = 0;
  const vs = await nat.nativeTts.load(() => cbs++);
  await Promise.resolve();
  assert.equal(vs.length, 3); assert.equal(cbs, 1);
  assert.deepEqual(nat.nativeTts.voices("tr").map(v => v.voiceURI), ["tr-x-b", "tr-x-c"]);
  assert.deepEqual(nat.nativeTts.voices("en").map(v => v.name), ["A"]);
  await nat.nativeTts.load(); assert.equal(count("TTS", "voices"), 1);          // cached
  assert.equal(nat.nativeTts.speak("Zihnin uyanık.", "tr", { rate: 0.8, voiceURI: "tr-x-c" }), true);
  const sp = last("TTS", "speak");
  assert.equal(sp.lang, "tr-TR"); assert.equal(sp.rate, 0.8); assert.equal(sp.voice, 2); assert.equal(sp.queueStrategy, 1); assert.equal(sp.text, "Zihnin uyanık.");
  nat.nativeTts.speak("Mind awake.", "en", { voiceURI: "missing" });
  assert.equal(last("TTS", "speak").voice, undefined); assert.equal(last("TTS", "speak").lang, "en-US");
  nat.nativeTts.stop(); assert.equal(count("TTS", "stop"), 1);
  assert.deepEqual(await nat.nativeInfo(), { platform: "android", version: "0.7.0", build: "700" });
});

// ---------- 3. the plugin list the Android project will register ----------
await okAsync("project: capacitor config + plugin deps + manifest wiring", async () => {
  const fs = await import("node:fs");
  const root = path.join(here, "..");
  const cfg = JSON.parse(fs.readFileSync(path.join(root, "capacitor.config.json"), "utf8"));
  assert.equal(cfg.appId, "dev.nsamarslan.gateway"); assert.equal(cfg.webDir, "www");
  assert.equal(cfg.plugins.LocalNotifications.smallIcon, "ic_stat_gateway");
  assert.equal(cfg.android.allowMixedContent, true);                            // PC streaming over plain http
  const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  for (const dep of ["@capacitor/core", "@capacitor/android", "@capacitor/app", "@capacitor/filesystem", "@capacitor/local-notifications", "@capacitor/share", "@capawesome-team/capacitor-android-foreground-service", "@capacitor-community/text-to-speech"]) assert.ok(pkg.dependencies[dep], dep);
  const man = fs.readFileSync(path.join(root, "android/app/src/main/AndroidManifest.xml"), "utf8");
  for (const p of ["POST_NOTIFICATIONS", "FOREGROUND_SERVICE_MEDIA_PLAYBACK", "USE_EXACT_ALARM", "WAKE_LOCK", "RECEIVE_BOOT_COMPLETED"]) assert.ok(man.includes(`android.permission.${p}`), p);
  assert.ok(man.includes('android:foregroundServiceType="mediaPlayback"'));
  assert.ok(man.includes("NotificationActionBroadcastReceiver"));
  assert.ok(man.includes('android:usesCleartextTraffic="true"'));
  const res = path.join(root, "android/app/src/main/res");
  for (const f of ["drawable/ic_stat_gateway.xml", "raw/bell.wav", "mipmap-xxxhdpi/ic_launcher.png", "mipmap-anydpi-v26/ic_launcher.xml"]) assert.ok(fs.existsSync(path.join(res, f)), f);
  const gradle = fs.readFileSync(path.join(root, "android/app/build.gradle"), "utf8");
  assert.ok(gradle.includes("GATEWAY_KEYSTORE_FILE") && gradle.includes("signingConfig signingConfigs.release"));
  assert.ok(fs.existsSync(path.join(root, "android/keystore/gateway.p12")));
  assert.equal(pkg.version.split(".").length, 3);
});

console.log(`test-native: ${passed} checks passed`);
