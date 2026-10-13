// Device text-to-speech (the fallback for lines without a recorded clip, and the settings "try" button).
// In the Android package the native engine is used (it keeps speaking with the screen off); in the browser the
// Web Speech API.
import { settings } from "./store.js";
import { nativeTts } from "./native.js";

const bcp = lang => (lang === "tr" ? "tr-TR" : "en-US");
const native = () => nativeTts.available();

/** Installed voices for a language ("tr" | "en"); empty until the engine has loaded its voice list. */
export function ttsVoices(lang) {
  try {
    if (native()) return nativeTts.voices(lang);
    if (!("speechSynthesis" in window)) return [];
    return (speechSynthesis.getVoices() || []).filter(v => (v.lang || "").toLowerCase().replace("_", "-").startsWith(lang));
  } catch { return []; }
}

/** Fires cb once (and again when the voice list changes) so a select can be filled lazily. */
export function onVoices(cb) {
  if (native()) { cb(); nativeTts.load(cb); return; }
  if (!("speechSynthesis" in window)) return;
  cb();
  try { speechSynthesis.addEventListener("voiceschanged", cb, { once: true }); } catch {}
}

export const ttsSupported = () => native() || (typeof window !== "undefined" && "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function");

/** Speak text with the configured voice and rate. Returns false when the device has no speech synthesis. */
export function speak(text, lang = settings.lang) {
  if (native()) return nativeTts.speak(text, lang, { rate: Number(settings.ttsRate) || 0.9, voiceURI: settings.ttsVoice || "" });
  if (!ttsSupported()) return false;
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = bcp(lang);
    u.rate = Number(settings.ttsRate) || 0.9;
    const v = settings.ttsVoice && ttsVoices(lang).find(x => x.voiceURI === settings.ttsVoice);
    if (v) u.voice = v;
    speechSynthesis.speak(u);
    return true;
  } catch { return false; }
}

export function stopSpeaking() {
  if (native()) return nativeTts.stop();
  try { speechSynthesis.cancel(); } catch {}
}
