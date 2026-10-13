// Collects every spoken text (exercise lines, reminders, common lines, reminder cue) per language.
// Usage: node tools/extract-lines.mjs > build/lines.json
// Output: [{ lang, key, text, packs: [packName] }]  — key is the audio file name (hash of lang + text).
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const LANGS = ["tr", "en"];
export const audioKey = (lang, text) => createHash("sha1").update(lang + "|" + text.trim()).digest("hex").slice(0, 12);

export function spokenTexts() {
  const out = []; // { pack, t }
  const exDir = join(root, "content", "exercises");
  for (const f of readdirSync(exDir).filter(f => f.endsWith(".json"))) {
    const ex = JSON.parse(readFileSync(join(exDir, f), "utf8"));
    const walk = phases => phases.forEach(ph => {
      if (ph.repeat) return walk(ph.phases);
      (ph.lines || []).forEach(l => out.push({ pack: ex.id, t: l.text }));
      (ph.hold?.reminders || []).forEach(r => out.push({ pack: ex.id, t: r.text }));
    });
    walk(ex.phases);
  }
  const common = JSON.parse(readFileSync(join(root, "content", "common.json"), "utf8"));
  Object.values(common.lines).forEach(t => out.push({ pack: "common", t }));
  const rem = join(root, "content", "reminder.json");
  if (existsSync(rem)) out.push({ pack: "common", t: JSON.parse(readFileSync(rem, "utf8")).cue });
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const map = new Map();
  for (const { pack, t } of spokenTexts()) {
    for (const lang of LANGS) {
      const text = t[lang].trim();
      const key = audioKey(lang, text);
      const e = map.get(key) || { lang, key, text, packs: [] };
      if (!e.packs.includes(pack)) e.packs.push(pack);
      map.set(key, e);
    }
  }
  process.stdout.write(JSON.stringify([...map.values()], null, 1));
}
