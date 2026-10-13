// Native bridge for the Android package (Capacitor). Every export degrades to a no-op or a web fallback in the
// browser/PWA build, so the rest of the app can call these unconditionally. The plugins are reached through
// `window.Capacitor.Plugins` (Capacitor's runtime registers them from capacitor.plugins.json), so no bundler is
// needed. Texts are passed in by the caller: this module deliberately imports nothing (tools/test-native.mjs loads
// it with a fake `window.Capacitor`).
const win = typeof window !== "undefined" ? window : undefined;
const Cap = win && win.Capacitor;
export const isNative = !!(Cap && typeof Cap.isNativePlatform === "function" && Cap.isNativePlatform());
export const platform = isNative && typeof Cap.getPlatform === "function" ? Cap.getPlatform() : "web";
export const plugin = name => (isNative && Cap.Plugins ? Cap.Plugins[name] || null : null);

export const IDS = { service: 9000, wake: 9100, rc: 7000, hp: 7200, span: 60 };
export const CHANNELS = { session: "gateway-session", remind: "gateway-remind", wake: "gateway-wake" };
const SMALL_ICON = "ic_stat_gateway";

// ---------- keep the screen on (web wake lock; the Android service keeps the CPU/audio alive when the screen is off) ----------
let wakeLock = null;
export async function keepAwake(on) {
  try {
    if (!win || !("wakeLock" in navigator)) return;
    if (on && !wakeLock) {
      wakeLock = await navigator.wakeLock.request("screen");
      wakeLock.addEventListener("release", () => { wakeLock = null; });
    } else if (!on && wakeLock) { await wakeLock.release(); wakeLock = null; }
  } catch {}
}

// ---------- channels + permissions ----------
let channelsReady = null, channelKey = "";
/** Create the notification channels once (names are user-visible; calling again with other names renames them). */
export function ensureChannels(names = {}) {
  if (!isNative) return Promise.resolve(false);
  const key = JSON.stringify(names);
  if (channelsReady && (key === "{}" || key === channelKey)) return channelsReady;
  channelKey = key;
  channelsReady = (async () => {
    const fg = plugin("ForegroundService"), ln = plugin("LocalNotifications");
    try { if (fg?.createNotificationChannel) await fg.createNotificationChannel({ id: CHANNELS.session, name: names.session || "Session", description: names.sessionDesc || "", importance: 2 }); } catch {}
    try { if (ln?.createChannel) await ln.createChannel({ id: CHANNELS.remind, name: names.remind || "Reminders", description: names.remindDesc || "", importance: 3, visibility: 1, vibration: true }); } catch {}
    try { if (ln?.createChannel) await ln.createChannel({ id: CHANNELS.wake, name: names.wake || "Wake bell", description: names.wakeDesc || "", importance: 5, visibility: 1, sound: "bell.wav", vibration: true, lights: true }); } catch {}
    return true;
  })();
  return channelsReady;
}
/** Notification permission: "granted" | "denied" | "prompt" (null when not native). `ask` opens the system prompt. */
export async function notifyPermission(ask = false) {
  const ln = plugin("LocalNotifications");
  if (!ln) return null;
  try {
    let st = await ln.checkPermissions();
    if (ask && st.display !== "granted") st = await ln.requestPermissions();
    return st.display || "prompt";
  } catch { return "denied"; }
}
/** Exact alarms (the wake bell): true/false, null when unknown or not native. */
export async function exactAlarmsAllowed() {
  const ln = plugin("LocalNotifications");
  if (!ln || !ln.checkExactNotificationSetting) return null;
  try { return (await ln.checkExactNotificationSetting()).exact_alarm === "granted"; } catch { return null; }
}
export async function openExactAlarmSettings() {
  const ln = plugin("LocalNotifications");
  if (!ln || !ln.changeExactNotificationSetting) return null;
  try { return (await ln.changeExactNotificationSetting()).exact_alarm === "granted"; } catch { return null; }
}

// ---------- the session service (foreground service with a persistent notification + wake lock) ----------
let serviceOn = false, stopCbs = [], fgListening = false;
/**
 * Start/stop the Android foreground service around a running session so audio, the live voice and the wake bell
 * survive the screen turning off. `info` = { title, body, stopLabel }.
 */
export async function sessionService(on, info = {}) {
  const fg = plugin("ForegroundService");
  if (!fg) return false;
  try {
    if (on) {
      await ensureChannels();
      if (!fgListening && fg.addListener) {
        fgListening = true;
        fg.addListener("buttonClicked", () => { for (const cb of stopCbs) { try { cb(); } catch {} } });
      }
      const opts = { id: IDS.service, title: info.title || "Gateway", body: info.body || "", smallIcon: SMALL_ICON, serviceType: 2, silent: true, notificationChannelId: CHANNELS.session };
      if (info.stopLabel) opts.buttons = [{ id: 1, title: info.stopLabel }];
      if (serviceOn && fg.updateForegroundService) await fg.updateForegroundService(opts);
      else await fg.startForegroundService(opts);
      serviceOn = true;
    } else if (serviceOn) {
      serviceOn = false;
      await fg.stopForegroundService();
    }
    return true;
  } catch { return false; }
}
export const serviceRunning = () => serviceOn;
/** The notification's stop button was tapped. */
export function onServiceStop(cb) { stopCbs.push(cb); return () => { stopCbs = stopCbs.filter(f => f !== cb); }; }

// ---------- scheduled reminders (reality checks, Human Plus command) ----------
/**
 * Reminder times (ms) for a window that repeats daily: `from`..`to` hours (may wrap past midnight), one every
 * `every` hours anchored at the window start, from `now` over `days` days, at most `cap` of them.
 */
export function reminderSlots({ every, from = 9, to = 22, now = Date.now(), days = 2, cap = 40 }) {
  every = Number(every) || 0;
  if (every <= 0) return [];
  const len = ((to - from + 24) % 24) || 24;             // window length in hours
  const out = [];
  const base = new Date(now); base.setHours(0, 0, 0, 0);
  for (let d = -1; d <= days; d++) {
    const start = new Date(base); start.setDate(base.getDate() + d); start.setHours(from, 0, 0, 0);
    for (let k = 0; k * every < len; k++) {
      const t = new Date(start); t.setHours(start.getHours() + k * every);
      const ms = t.getTime();
      if (ms > now + 30e3 && ms <= now + days * 864e5) out.push(ms);
    }
  }
  return [...new Set(out)].sort((a, b) => a - b).slice(0, cap);
}
const idsOf = kind => Array.from({ length: IDS.span }, (_, i) => ({ id: IDS[kind] + i }));
/**
 * Replace the pending notifications of one kind ("rc" | "hp"). `items` = [{ at (ms), title, body }] — at most
 * IDS.span of them are kept. Returns the number scheduled (0 when not native).
 */
export async function scheduleReminders(kind, items) {
  const ln = plugin("LocalNotifications");
  if (!ln) return 0;
  try { await ln.cancel({ notifications: idsOf(kind) }); } catch {}
  const list = (items || []).slice(0, IDS.span);
  if (!list.length) return 0;
  await ensureChannels();
  const notifications = list.map((x, i) => ({
    id: IDS[kind] + i, title: x.title, body: x.body, channelId: CHANNELS.remind, smallIcon: SMALL_ICON,
    schedule: { at: new Date(x.at), allowWhileIdle: true }, isExactNotification: false, autoCancel: true, extra: { kind },
  }));
  try { await ln.schedule({ notifications }); return notifications.length; } catch { return 0; }
}
export async function cancelReminders(kind) {
  const ln = plugin("LocalNotifications");
  if (!ln) return;
  try { await ln.cancel({ notifications: idsOf(kind) }); } catch {}
}

// ---------- the wake bell as a real alarm ----------
/** Schedule the wake notification (exact alarm, loud channel) at `at` ms; it backs up the in-app bell. */
export async function scheduleWake(at, info = {}) {
  const ln = plugin("LocalNotifications");
  if (!ln) return false;
  await ensureChannels();
  try { await ln.cancel({ notifications: [{ id: IDS.wake }] }); } catch {}
  // Exact alarms are normally allowed (USE_EXACT_ALARM); if the user revoked them, fall back to an inexact alarm
  // silently instead of letting the plugin open the system settings in the middle of a night session.
  const exact = (await exactAlarmsAllowed()) !== false;
  try {
    await ln.schedule({ notifications: [{
      id: IDS.wake, title: info.title || "Gateway", body: info.body || "", channelId: CHANNELS.wake, smallIcon: SMALL_ICON,
      schedule: { at: new Date(at), allowWhileIdle: true }, isExactNotification: exact, autoCancel: true, extra: { kind: "wake" },
    }] });
    return true;
  } catch { return false; }
}
export async function cancelWake() {
  const ln = plugin("LocalNotifications");
  if (!ln) return;
  try { await ln.cancel({ notifications: [{ id: IDS.wake }] }); } catch {}
}

// ---------- share a text file (journal export, backup) ----------
/** Write `text` to the cache dir and open the Android share sheet. Returns false when not native (caller downloads). */
export async function shareFile(text, name, type, title) {
  const fs = plugin("Filesystem"), sh = plugin("Share");
  if (!fs || !sh) return false;
  try {
    const r = await fs.writeFile({ path: name, data: text, directory: "CACHE", encoding: "utf8", recursive: true });
    await sh.share({ title: title || name, dialogTitle: title || name, files: [r.uri] });
    return true;
  } catch (e) {
    // the user dismissed the sheet, or no app could take the file
    return !(e && /not installed|not implemented|unavailable/i.test(String(e.message || e)));
  }
}

// ---------- device TTS through the native engine ----------
let voiceList = null, voicesPromise = null;
const bcp = lang => (lang === "tr" ? "tr-TR" : "en-US");
export const nativeTts = {
  available: () => !!plugin("TextToSpeech"),
  /** Cached voice list (filled by load()). */
  voices(lang) { return (voiceList || []).filter(v => (v.lang || "").toLowerCase().replace("_", "-").startsWith(lang)); },
  load(cb) {
    const tts = plugin("TextToSpeech");
    if (!tts) return Promise.resolve([]);
    if (!voicesPromise) voicesPromise = tts.getSupportedVoices().then(r => { voiceList = (r && r.voices) || []; return voiceList; }).catch(() => { voiceList = []; return voiceList; });
    if (cb) voicesPromise.then(() => cb());
    return voicesPromise;
  },
  speak(text, lang, { rate = 0.9, voiceURI = "" } = {}) {
    const tts = plugin("TextToSpeech");
    if (!tts) return false;
    const opts = { text, lang: bcp(lang), rate: Number(rate) || 0.9, pitch: 1, volume: 1, queueStrategy: 1 };
    const idx = voiceURI && voiceList ? voiceList.findIndex(v => v.voiceURI === voiceURI) : -1;
    if (idx >= 0) opts.voice = idx;
    tts.speak(opts).catch(() => {});
    return true;
  },
  stop() { const tts = plugin("TextToSpeech"); if (tts) tts.stop().catch(() => {}); },
};

// ---------- app lifecycle ----------
/**
 * One-time wiring for the native shell: back button (history first, then minimise), resume callback, taps on
 * our notifications. `cfg` = { onResume(), onNotification({kind}), channels: {session, remind, wake, ...Desc} }.
 */
export async function initNative(cfg = {}) {
  if (!isNative) return false;
  await ensureChannels(cfg.channels || {});
  const app = plugin("App"), ln = plugin("LocalNotifications");
  try {
    if (app?.addListener) {
      app.addListener("backButton", ({ canGoBack }) => {
        if (canGoBack && win.history.length > 1) win.history.back();
        else app.minimizeApp?.();
      });
      app.addListener("appStateChange", ({ isActive }) => { if (isActive && cfg.onResume) { try { cfg.onResume(); } catch {} } });
    }
    if (ln?.addListener) {
      ln.addListener("localNotificationReceived", n => { if (cfg.onNotification) { try { cfg.onNotification({ kind: n?.extra?.kind, foreground: true, title: n?.title, body: n?.body }); } catch {} } });
      ln.addListener("localNotificationActionPerformed", a => { if (cfg.onNotification) { try { cfg.onNotification({ kind: a?.notification?.extra?.kind, tapped: true }); } catch {} } });
    }
  } catch {}
  return true;
}
/** App version/platform for the Settings page (null on the web). */
export async function nativeInfo() {
  const app = plugin("App");
  if (!app) return null;
  try { const i = await app.getInfo(); return { platform, version: i.version, build: i.build }; } catch { return { platform }; }
}
