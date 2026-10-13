// Thin wrappers over native (Capacitor) features with web fallbacks.
const Cap = window.Capacitor;
export const isNative = !!(Cap && Cap.isNativePlatform && Cap.isNativePlatform());
const plugin = name => (isNative && Cap.Plugins ? Cap.Plugins[name] : null);

// ---------- keep the screen on ----------
let wakeLock = null;
export async function keepAwake(on) {
  const ka = plugin("KeepAwake");
  try {
    if (ka) return on ? ka.keepAwake() : ka.allowSleep();
    if (on && "wakeLock" in navigator && !wakeLock) {
      wakeLock = await navigator.wakeLock.request("screen");
      wakeLock.addEventListener("release", () => { wakeLock = null; });
    } else if (!on && wakeLock) { await wakeLock.release(); wakeLock = null; }
  } catch {}
}

// ---------- background session (Android foreground service keeps the app alive while audio plays) ----------
export async function sessionService(on, title) {
  const s = plugin("SessionService");
  try { if (s) return on ? s.start({ title }) : s.stop(); } catch {}
}

// ---------- local notifications ----------
const LN = () => plugin("LocalNotifications");
export const canNotify = () => !!LN();

async function ensurePermission() {
  const ln = LN();
  if (!ln) return false;
  let p = await ln.checkPermissions();
  if (p.display !== "granted") p = await ln.requestPermissions();
  return p.display === "granted";
}

async function cancelRange(from, to) {
  const ln = LN();
  const pending = await ln.getPending();
  const ids = pending.notifications.filter(n => n.id >= from && n.id < to).map(n => ({ id: n.id }));
  if (ids.length) await ln.cancel({ notifications: ids });
}

async function channels(lang) {
  const ln = LN();
  await ln.createChannel({ id: "eye-" + lang, name: lang === "tr" ? "Göz hatırlatıcısı" : "Eye reminder", importance: 4, sound: "eye_cue_" + lang + ".wav", vibration: true }).catch(() => {});
  await ln.createChannel({ id: "morning", name: lang === "tr" ? "Sabah programı" : "Morning programme", importance: 4, sound: "bell.wav" }).catch(() => {});
}

/** Eye reminder: schedule notifications every `minutes` between from/to (HH:MM) for the next days. */
export async function scheduleEyeReminders({ minutes, from, to, lang, title, body }) {
  if (!(await ensurePermission())) return false;
  const ln = LN();
  await channels(lang);
  await cancelRange(1000, 9000);
  const [fh, fm] = from.split(":").map(Number), [th, tm] = to.split(":").map(Number);
  const list = [];
  const now = Date.now();
  for (let day = 0; day < 3 && list.length < 400; day++) {
    const d0 = new Date(); d0.setDate(d0.getDate() + day);
    const start = new Date(d0.getFullYear(), d0.getMonth(), d0.getDate(), fh, fm).getTime();
    let end = new Date(d0.getFullYear(), d0.getMonth(), d0.getDate(), th, tm).getTime();
    if (end <= start) end += 86400000;
    for (let at = start; at <= end && list.length < 400; at += minutes * 60000) {
      if (at > now + 30000) list.push({ id: 1000 + list.length, title, body, channelId: "eye-" + lang, schedule: { at: new Date(at), allowWhileIdle: true }, sound: "eye_cue_" + lang + ".wav" });
    }
  }
  await ln.schedule({ notifications: list });
  return true;
}
export async function cancelEyeReminders() { if (LN()) await cancelRange(1000, 9000); }

export async function scheduleMorning({ time, lang, title, body }) {
  if (!(await ensurePermission())) return false;
  const ln = LN();
  await channels(lang);
  await cancelRange(10, 11);
  if (!time) return true;
  const [h, m] = time.split(":").map(Number);
  await ln.schedule({ notifications: [{ id: 10, title, body, channelId: "morning", schedule: { on: { hour: h, minute: m }, allowWhileIdle: true, repeats: true }, sound: "bell.wav" }] });
  return true;
}
