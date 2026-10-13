// Human Plus daily practice: the "command of the day", the practice counter (one tap per real-life use of a
// function command), user-noted commands for functions whose official command is not public, and the
// command reminders (web: only while the app is open; Android: scheduled notifications).
import { t, L } from "./i18n.js";
import { store, settings, saveSettings, getLog, dayKey } from "./store.js";
import { sessions, waves, getEx } from "./content.js";
import { isNative, scheduleReminders, reminderSlots } from "./native.js";

const toast = msg => { const el = document.createElement("div"); el.className = "toast"; el.textContent = msg; document.body.appendChild(el); setTimeout(() => el.remove(), 2200); };

export const HP_WAVE = "human-plus";
/** All Human Plus function sessions in catalogue order. */
export const hpIds = () => (waves.find(w => w.id === HP_WAVE)?.items || []).filter(id => sessions[id]);
export const isHp = ex => !!ex && ex.wave === HP_WAVE;

// ---------- command words ----------
/** User-noted commands (functions whose official command could not be verified from public sources). */
export const userCommands = {
  all: () => store.get("hpCmd", {}),
  get: id => store.get("hpCmd", {})[id] || "",
  set(id, text) {
    const all = store.get("hpCmd", {});
    const v = String(text || "").trim().replace(/\s+/g, " ").slice(0, 60);
    if (v) all[id] = v; else delete all[id];
    store.set("hpCmd", all);
  },
};
/** The command to practise: the documented one, else the user's note; `yours` marks the latter. */
export function commandOf(ex) {
  if (!ex) return null;
  if (ex.command) return { text: L(ex.command), yours: false };
  const mine = userCommands.get(ex.id);
  return mine ? { text: mine, yours: true } : null;
}

// ---------- practice counter ----------
const MAX = 5000;
export const practice = {
  all: () => store.get("hpPractice", []),
  add(id) {
    const all = store.get("hpPractice", []);
    all.push({ id, at: Date.now(), day: dayKey() });
    store.set("hpPractice", all.slice(-MAX));
  },
  /** Remove the most recent tap for `id` today (undo). Returns true when something was removed. */
  undo(id) {
    const all = store.get("hpPractice", []);
    for (let i = all.length - 1; i >= 0; i--) if (all[i].id === id && all[i].day === dayKey()) { all.splice(i, 1); store.set("hpPractice", all); return true; }
    return false;
  },
  /** Merge entries from a backup (idempotent by at+id). Returns the number added. */
  merge(list) {
    if (!Array.isArray(list)) return 0;
    const all = store.get("hpPractice", []); const seen = new Set(all.map(x => x.at + ":" + x.id));
    let n = 0;
    for (const x of list) { const k = x.at + ":" + x.id; if (x && x.id && x.at && x.day && !seen.has(k)) { all.push(x); seen.add(k); n++; } }
    if (n) { all.sort((a, b) => a.at - b.at); store.set("hpPractice", all.slice(-MAX)); }
    return n;
  },
};
const shiftDay = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return dayKey(d); };
/** Counts for one function (or all when id is null): today, last 7 days, total, streak and a 7-day series (oldest first). */
export function practiceStats(id = null) {
  const rows = practice.all().filter(x => !id || x.id === id);
  const today = dayKey();
  const days7 = Array.from({ length: 7 }, (_, i) => shiftDay(6 - i));
  const per = Object.fromEntries(days7.map(d => [d, 0]));
  let todayN = 0;
  const daySet = new Set();
  for (const r of rows) { daySet.add(r.day); if (r.day === today) todayN++; if (r.day in per) per[r.day]++; }
  let streak = 0;
  const d = new Date();
  if (!daySet.has(dayKey(d))) d.setDate(d.getDate() - 1);
  while (daySet.has(dayKey(d))) { streak++; d.setDate(d.getDate() - 1); }
  return { today: todayN, week: days7.reduce((s, k) => s + per[k], 0), total: rows.length, streak, series: days7.map(k => per[k]), days: daySet.size };
}

// ---------- command of the day ----------
/** Functions the user has encoded at least once (a completed or long-enough session in the log). */
export const encodedIds = () => { const done = new Set(getLog().map(x => x.id)); return hpIds().filter(id => done.has(id)); };
/** Candidates for the daily card: encoded functions with a command; before any encoding, the documented ones. */
export function commandPool() {
  const enc = encodedIds().filter(id => commandOf(getEx(id)));
  return { ids: enc.length ? enc : hpIds().filter(id => getEx(id).command), encoded: enc.length > 0 };
}
const hash = s => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return h; };
/** The function of a day (today by default): deterministic per day over the pool, unless the user picked another one that day. */
export function commandOfDay(date = new Date()) {
  const { ids, encoded } = commandPool();
  if (!ids.length) return null;
  const day = dayKey(date);
  const pick = store.get("hpDay", null);
  const id = pick && pick.day === day && ids.includes(pick.id) ? pick.id : ids[hash(day) % ids.length];
  return { id, ex: getEx(id), cmd: commandOf(getEx(id)), encoded, pool: ids.length };
}
/** Choose another function for today (rotates through the pool). */
export function shuffleCommand() {
  const cur = commandOfDay();
  if (!cur || cur.pool < 2) return cur;
  const { ids } = commandPool();
  const next = ids[(ids.indexOf(cur.id) + 1) % ids.length];
  store.set("hpDay", { day: dayKey(), id: next });
  return commandOfDay();
}

// ---------- reminders (same window as the reality checks: settings.rcFrom / rcTo) ----------
let timer = null;
/** Android: (re)schedule the next two days of command notifications (each day's own command). */
export function syncNativeCommandReminders() {
  if (!isNative) return Promise.resolve(0);
  const slots = settings.hpRemind ? reminderSlots({ every: settings.hpRemind, from: settings.rcFrom ?? 9, to: settings.rcTo ?? 22 }) : [];
  const items = slots.map(at => ({ at, title: t("hpDay"), body: reminderText(new Date(at)) })).filter(x => x.body);
  return scheduleReminders("hp", items);
}
export function scheduleCommandReminders() {
  clearInterval(timer); timer = null;
  if (isNative) { syncNativeCommandReminders(); return; }
  if (!settings.hpRemind) return;
  timer = setInterval(() => {
    const h = new Date().getHours(), from = settings.rcFrom ?? 9, to = settings.rcTo ?? 22;
    const inWindow = from <= to ? h >= from && h < to : h >= from || h < to;
    const last = Number(localStorage.getItem("gateway.hpLast") || 0);
    if (inWindow && Date.now() - last >= settings.hpRemind * 3600e3) commandReminder(false);
  }, 60e3);
}
/** The reminder text for a day's command (today by default), or null when there is nothing to remind. */
export function reminderText(date = new Date()) {
  const c = commandOfDay(date);
  return c && c.cmd ? t("hpRemindBody", { cmd: c.cmd.text, title: L(c.ex.title) }) : null;
}
/** Show the reminder: in-app toast always; a notification when permitted (reaches a backgrounded tab too). */
export function commandReminder(manual) {
  const body = reminderText();
  if (!body) return false;
  try { localStorage.setItem("gateway.hpLast", String(Date.now())); } catch {}
  toast("✦ " + body);
  if (!manual && !isNative && typeof Notification !== "undefined" && Notification.permission === "granted") {
    const show = () => new Notification(t("hpDay"), { body, tag: "gateway-hp", silent: false });
    try { navigator.serviceWorker?.ready?.then(r => r.showNotification(t("hpDay"), { body, tag: "gateway-hp" })).catch(show); } catch { try { show(); } catch {} }
  }
  return true;
}
export function setReminderHours(h) { settings.hpRemind = Number(h) || 0; saveSettings(); scheduleCommandReminders(); }
