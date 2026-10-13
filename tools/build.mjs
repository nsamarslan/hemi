// Builds the app into www/: expands + validates content, writes www/content.js, copies src/.
// Usage: node tools/build.mjs
import { writeFileSync, rmSync, mkdirSync, cpSync, readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { expandContent } from "./expand.mjs";
import { voiceLines } from "./voice-lines.mjs";
import { createHash } from "node:crypto";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const www = join(root, "www");

try { execFileSync("node", [join(root, "tools/validate-content.mjs")], { stdio: "inherit" }); }
catch { console.error("content validation failed"); process.exit(1); }

const bundle = expandContent();
rmSync(www, { recursive: true, force: true });
mkdirSync(www, { recursive: true });
cpSync(join(root, "src"), www, { recursive: true });

// recorded voice packs: content/voice/<lang>/{index.json,<key>.mp3} → www/voice/<lang>/<pack>.mp3 + manifest in APP_CONTENT.audio
// (one file per pack = the clips concatenated; every clip is a standalone MP3 so a byte range decodes on its own)
export function buildVoicePacks(bundle, srcRoot = root, outRoot = www) {
  const audio = {}, usage = voiceLines(bundle);
  for (const lang of ["tr", "en"]) {
    const dir = join(srcRoot, "content", "voice", lang);
    if (!existsSync(join(dir, "index.json"))) continue;
    const idx = JSON.parse(readFileSync(join(dir, "index.json"), "utf8"));
    const packs = {};
    for (const ln of usage[lang].lines) {
      const clip = idx.clips[ln.key];
      if (!clip || clip.text !== ln.text || !existsSync(join(dir, ln.key + ".mp3"))) continue;
      (packs[ln.shared ? "common" : ln.uses[0]] ||= []).push({ key: ln.key, dur: clip.dur });
    }
    const outDir = join(outRoot, "voice", lang);
    mkdirSync(outDir, { recursive: true });
    const manifest = {};
    let recorded = 0;
    for (const [name, clips] of Object.entries(packs)) {
      const parts = clips.map(c => readFileSync(join(dir, c.key + ".mp3")));
      const file = Buffer.concat(parts);
      writeFileSync(join(outDir, `${name}.mp3`), file);
      let off = 0; const m = {};
      clips.forEach((c, i) => { m[c.key] = [off, parts[i].length, c.dur]; off += parts[i].length; });
      manifest[name] = { file: `voice/${lang}/${name}.mp3?v=${createHash("sha1").update(file).digest("hex").slice(0, 8)}`, clips: m };
      recorded += clips.length;
    }
    audio[lang] = { packs: manifest, voice: idx.voice || "", lines: usage[lang].lines.length, recorded };
  }
  bundle.audio = audio;
  return audio;
}
const voiceStats = buildVoicePacks(bundle);
writeFileSync(join(www, "content.js"), "window.APP_CONTENT=" + JSON.stringify(bundle) + ";\n");

// guide topics (bilingual markdown) → www/guide/<lang>/ + index.json
const guideSrc = join(root, "content", "guide");
const guideOut = join(www, "guide");
const topics = [];
for (const lang of ["tr", "en"]) {
  const dir = join(guideSrc, lang);
  mkdirSync(join(guideOut, lang), { recursive: true });
  for (const f of readdirSync(dir).filter(f => f.endsWith(".md")).sort()) {
    const text = readFileSync(join(dir, f), "utf8");
    cpSync(join(dir, f), join(guideOut, lang, f));
    const title = (text.match(/^#\s+(.+)$/m) || [, f])[1].trim();
    const summary = (text.split("\n").find(l => l.trim() && !l.trim().startsWith("#")) || "").trim().slice(0, 160);
    if (lang === "tr") topics.push({ id: f.replace(/\.md$/, ""), title: { tr: title }, summary: { tr: summary } });
    else {
      const t = topics.find(t => t.id === f.replace(/\.md$/, ""));
      if (t) { t.title.en = title; t.summary.en = summary; }
    }
  }
}
writeFileSync(join(guideOut, "index.json"), JSON.stringify({ topics }, null, 2) + "\n");

// research dossiers (50-dossier Reality & Hidden-Pattern Investigation) → www/research/ + RESEARCH-REALITY.md
const resSrc = join(root, "content", "research");
const resOut = join(www, "research");
const resTopics = [];
if (existsSync(join(resSrc, "meta.json"))) {
  const meta = JSON.parse(readFileSync(join(resSrc, "meta.json"), "utf8"));
  mkdirSync(join(resOut, "tr"), { recursive: true });
  const trDir = join(resSrc, "tr");
  const enDir = join(resSrc, "en");
  if (existsSync(enDir)) mkdirSync(join(resOut, "en"), { recursive: true });
  const mdTexts = [];
  for (const item of meta.planned) {
    const f = item.id + ".md";
    const trPath = join(trDir, f);
    if (existsSync(trPath)) {
      const text = readFileSync(trPath, "utf8");
      cpSync(trPath, join(resOut, "tr", f));
      if (existsSync(join(enDir, f))) cpSync(join(enDir, f), join(resOut, "en", f));
      const summary = (text.split("\n").find(l => l.trim() && !l.trim().startsWith("#") && !l.trim().startsWith("|") && !l.trim().startsWith("[[")) || "").replace(/[*_`]/g, "").trim().slice(0, 180);
      resTopics.push({
        id: item.id,
        no: item.no,
        layer: item.layer,
        patterns: item.patterns || [],
        ready: true,
        title: item.title,
        summary: { tr: summary, en: summary }
      });
      mdTexts.push(text.trim());
    } else {
      resTopics.push({
        id: item.id,
        no: item.no,
        layer: item.layer,
        patterns: item.patterns || [],
        ready: false,
        title: item.title,
        summary: {
          tr: "Sıradaki araştırma paketinde ayrıntılı monografi olarak eklenecek.",
          en: "Scheduled in the upcoming research batch."
        }
      });
    }
  }
  // ---- Horizon Excavation program (40-area UA-01..UA-40, content/research/horizon.json) ----
  const pick = (o, k) => (o && typeof o === "object" ? (o[k] || o.tr || "") : (o || ""));
  const enOutDir = join(resOut, "en");
  const horizonPath = join(resSrc, "horizon.json");
  const horizon = existsSync(horizonPath) ? JSON.parse(readFileSync(horizonPath, "utf8")) : null;
  const horizonTopics = [];
  if (horizon) {
    mkdirSync(enOutDir, { recursive: true });
    for (const a of horizon.areas || []) {
      const fTr = join(trDir, a.id + ".md");
      const fEn = join(enDir, a.id + ".md");
      const ready = existsSync(fTr);
      let summaryTr = pick(a.summary, "tr"), summaryEn = pick(a.summary, "en");
      if (ready) {
        const tTr = readFileSync(fTr, "utf8");
        cpSync(fTr, join(resOut, "tr", a.id + ".md"));
        const lineTr = tTr.split("\n").find(l => l.trim() && !l.trim().startsWith("#") && !l.trim().startsWith("|") && !l.trim().startsWith("[[") && !l.trim().startsWith(">"));
        if (lineTr) summaryTr = lineTr.replace(/[*_`]/g, "").trim().slice(0, 200);
        if (existsSync(fEn)) {
          const tEn = readFileSync(fEn, "utf8");
          cpSync(fEn, join(enOutDir, a.id + ".md"));
          const lineEn = tEn.split("\n").find(l => l.trim() && !l.trim().startsWith("#") && !l.trim().startsWith("|") && !l.trim().startsWith("[[") && !l.trim().startsWith(">"));
          if (lineEn) summaryEn = lineEn.replace(/[*_`]/g, "").trim().slice(0, 200);
        }
      }
      horizonTopics.push({
        id: a.id, no: 100 + (a.no || 0), layer: "HZ", patterns: [],
        ready, title: a.title, summary: { tr: summaryTr, en: summaryEn },
        hz: { code: a.code, thermometer: a.thermometer, law: a.law, batch: a.batch, cross: a.cross || null, anomaly: a.anomaly || null }
      });
    }
  }
  // The finale is a separate bilingual synthesis, not a 41st area or a 51st original dossier.
  const finalId = horizon?.final?.id;
  const finalTr = finalId ? join(resSrc, "final", "tr", finalId + ".md") : null;
  const finalEn = finalId ? join(resSrc, "final", "en", finalId + ".md") : null;
  const finalReady = !!(finalTr && finalEn && existsSync(finalTr) && existsSync(finalEn));
  if (finalReady) {
    cpSync(finalTr, join(resOut, "tr", finalId + ".md"));
    cpSync(finalEn, join(resOut, "en", finalId + ".md"));
    const finalText = readFileSync(finalTr, "utf8").trim();
    const finalMaster = join(root, "RESEARCH-PHI2.md");
    if (!existsSync(finalMaster) || readFileSync(finalMaster, "utf8") !== finalText + "\n") writeFileSync(finalMaster, finalText + "\n");
    horizonTopics.push({
      id: finalId, no: 141, layer: "HZ", patterns: [], ready: true,
      title: horizon.final.title, summary: horizon.final.summary,
      hz: { code: horizon.final.code, thermometer: "O", law: horizon.final.title.tr, batch: 16, final: true }
    });
  }
  const hzLayer = horizon ? {
    id: "HZ",
    range: "UA-01–UA-40",
    title: { tr: "IX. Ufuk Kazısı — 40 Alanlı Gizli Örüntü Programı", en: "IX. Horizon Excavation — 40-Area Hidden-Pattern Program" },
    intro: { tr: "Kanıt gücü sırasıyla işlenen 40 sınır alanı; her biri kendi iki-dilli dossier dosyası, Kanıt Termometresi damgası ve Aday Gizli Örüntü önerisiyle.", en: "Forty frontier areas processed in evidence-strength order, each with its own bilingual dossier file, Evidence Thermometer stamp and Candidate Hidden Pattern." }
  } : null;
  writeFileSync(join(resOut, "index.json"), JSON.stringify({
    layers: [...meta.layers, ...(hzLayer ? [hzLayer] : [])],
    patterns: meta.patterns,
    metaPatterns: meta.metaPatterns || [],
    omegaPattern: meta.omegaPattern || null,
    historicalPatterns: meta.historicalPatterns || [],
    chronoLaw: meta.chronoLaw || null,
    horizon: horizon ? {
      title: horizon.title, intro: horizon.intro, thermometer: horizon.thermometer || [],
      batches: horizon.batches || [], final: horizon.final ? { ...horizon.final, ready: finalReady } : null,
      areas: horizonTopics.filter(t => !t.hz.final).map(t => ({
        id: t.id, code: t.hz.code, thermometer: t.hz.thermometer, law: t.hz.law, batch: t.hz.batch,
        ready: t.ready, title: t.title, cross: t.hz.cross, anomaly: t.hz.anomaly, summary: t.summary
      }))
    } : null,
    topics: [...resTopics, ...horizonTopics]
  }, null, 2) + "\n");

  // Compile standalone Horizon master markdown file: gateway/RESEARCH-HORIZON.md
  if (horizon) {
    const hzReady = horizonTopics.filter(t => !t.hz.final && t.ready).length;
    const hzMd = [
      "# Ufuk Kazısı: 40 Alanlı Gizli Örüntü Programı (UA-01 – UA-40)",
      "",
      `> **Durum:** ${hzReady} / ${(horizon.areas || []).length} alan tamamlandı · 16 partilik üretim planı · her alan TR + EN çift tam metin. Kanıt sırası: 🟢 laboratuvar kanıtı → 🟡 anlamlı veri ve süren tartışma → 🟠 ön veri veya güçlü kuram.`,
      "",
      horizon.intro ? horizon.intro.tr : "",
      "",
      "## I. Kanıt Termometresi Ölçeği",
      "",
      ...(horizon.thermometer || []).map(x => `- **${x.icon} ${x.key}** — ${x.tr}`),
      "",
      "## II. 40 Alanın Haritası (Kanıt Gücü Sırasıyla)",
      "",
      ...horizonTopics.filter(t => !t.hz.final).map(t => `- [${t.ready ? "x" : " "}] **${t.hz.code}** — ${t.title.tr} · *${t.hz.thermometer}* · Parti ${t.hz.batch} · **Aday yasa:** ${t.hz.law}`),
      "",
      "## III. Üretim Planı (16 Parti)",
      "",
      ...(horizon.batches || []).flatMap(b => {
        const items = horizonTopics.filter(t => !t.hz.final && t.hz.batch === b.no).map(t => t.hz.code);
        return [`### Parti ${b.no} — ${b.name.tr}${items.length ? ` · ${items.join(", ")}` : ""}`, ""];
      }),
      ...(horizon.final ? [
        `## IV. FİNAL SENTEZ — ${horizon.final.code}: ${horizon.final.title.tr}`,
        "",
        horizon.final.summary.tr,
        ""
      ] : []),
      "---",
      "",
      ...horizonTopics.filter(t => !t.hz.final && t.ready).flatMap(t => {
        const f = join(trDir, t.id + ".md");
        return existsSync(f) ? [readFileSync(f, "utf8").trim(), "", "---", ""] : [];
      }),
      ...(finalReady ? [readFileSync(finalTr, "utf8").trim(), ""] : [])
    ].join("\n");
    const hzMaster = join(root, "RESEARCH-HORIZON.md");
    if (!existsSync(hzMaster) || readFileSync(hzMaster, "utf8") !== hzMd) writeFileSync(hzMaster, hzMd);
  }

  // Extract per-dossier Hidden Pattern discovery sections for the final synthesis appendix
  const discoveredBlocks = [];
  for (let i = 0; i < mdTexts.length; i++) {
    const txt = mdTexts[i];
    const titleLine = (txt.split("\n").find(l => l.startsWith("# ")) || "").replace(/^#\s+/, "").trim();
    const hpMatch = txt.match(/##\s+\d*\.?\s*🔍[^\n]+\n+([\s\S]*?)(?=\n---\n|\n##\s+📚|$)/);
    if (hpMatch) {
      discoveredBlocks.push({
        title: titleLine,
        body: hpMatch[1].trim()
      });
    }
  }

  // Compile standalone master markdown file: gateway/RESEARCH-REALITY.md
  const readyCount = resTopics.filter(t => t.ready).length;
  const masterMd = [
    "# Gateway, Bilinç ve Gerçeklik Araştırması: 50 Dosyalık Bağımsız Muhakeme ve Gizli Örüntü Atlası",
    "",
    `> **Durum:** ${readyCount} / ${resTopics.length} dosya tamamlandı (Katman I–VIII) · **${meta.patterns.length} Çapraz-Alan Gizli Örüntüsü (HP-1 – HP-${meta.patterns.length})**, **${(meta.metaPatterns || []).length} İkinci-Derece Meta-Yasa (MP-1 – MP-${(meta.metaPatterns || []).length})**, **En Derin Ontolojik İlk Neden (Ω-1: 'Neden Durum Böyle?')** ve **${(meta.historicalPatterns || []).length} Tarihsel Akış Yasası (THP-1 – THP-${(meta.historicalPatterns || []).length}) + Gezegensel Makro-DMN Üst-Yasası (Φ-1)** keşfedildi. Her dosya birincil deney verilerini, fizyolojik/fiziksel mekanizmayı, çelik adam karşı-argümanlarını, çapraz-alan **Gizli Örüntü (Hidden Pattern)** analizini ve **İleri Okuma (Further Reading)** kaynakçasını içerir. Araştırmanın en sonunda ise tüm dosyalarda keşfedilen gizli örüntülerin 4 boyutlu bağımsız sentez bölümü yer almaktadır.`,
    "",
    `## I. Birinci-Derece Gizli Örüntü Atlası (${meta.patterns.length} Çapraz-Alan Değişmezi)`,
    "",
    ...meta.patterns.map(p => `- **${p.code} — ${p.title.tr}:** ${p.summary.tr} *(İlgili dosyalar: ${p.dossiers.join(", ")})*`),
    "",
    `## II. Derin Katman II: 16 Örüntüyü Üreten ${(meta.metaPatterns || []).length} İkinci-Derece Meta-Yasa (MP-1 – MP-${(meta.metaPatterns || []).length})`,
    "",
    ...(meta.metaPatterns || []).map(mp => `- **${mp.code} — ${mp.title.tr} *(Birleştirdiği örüntüler: ${mp.unifies.join(", ")})*:** ${mp.summary.tr}`),
    "",
    ...(meta.omegaPattern ? [
      `## III. Derin Katman III (En Derin Seviye — ${meta.omegaPattern.code}): ${meta.omegaPattern.title.tr}`,
      "",
      `> ${meta.omegaPattern.summary.tr}`,
      ""
    ] : []),
    ...((meta.historicalPatterns || []).length ? [
      `## IV. Derin Katman IV (Tarihsel Olayların Akışından Çıkan Örüntü Katmanı): ${(meta.historicalPatterns || []).length} Krono-Epistemik Yasa (THP-1 – THP-${(meta.historicalPatterns || []).length}) ve Gezegensel Üst-Yasa (Φ-1)`,
      "",
      ...(meta.historicalPatterns || []).map(tp => `- **${tp.code} — ${tp.title.tr}:** ${tp.summary.tr}`),
      ...(meta.chronoLaw ? [
        "",
        `> **${meta.chronoLaw.code} — ${meta.chronoLaw.title.tr}:** ${meta.chronoLaw.summary.tr}`
      ] : []),
      ""
    ] : []),
    "## 50 Araştırma Dosyası Tam Dizini",
    "",
    ...meta.layers.flatMap(l => [
      `### ${l.title.tr} (Dosya ${l.range})`,
      ...resTopics.filter(t => t.layer === l.id).map(t => `- [${t.ready ? "x" : " "}] **${t.title.tr}** ${t.patterns.length ? `*(${t.patterns.join(", ")})*` : ""}`),
      ""
    ]),
    "---",
    "",
    ...mdTexts.flatMap(txt => [txt, "", "---", ""]),
    "# GİZLİ ÖRÜNTÜLER (CROSS-DOMAIN HIDDEN PATTERNS): 4 KATMANLI KEŞİF VE ÖZEL SENTEZ BÖLÜMÜ",
    "",
    "> Bu özel bölüm, farklı disiplinlerdeki (nörofizyoloji, kardiyoloji, kuantum biyofiziği, Sovyet psikotroniği, Doğu biyo-enerjetiği, klinik tıp ve 30.000 yıllık bilim/felsefe tarihi) uzmanların birbirlerinden habersiz olarak kaydettikleri veriler üst üste konduğunda ortaya çıkan **Seviye I (HP-1–HP-16)**, **Seviye II (MP-1–MP-4 Meta-Yasaları)**, **Seviye III (Ω-1: 'Neden Durum Böyle?' İlk Neden Teoremi)** ve **Seviye IV (THP-1–THP-5 & Φ-1: Tarihsel Akışın Krono-Epistemik Yasaları)** değişmezlerini tek bir çatı altında toplar.",
    "",
    `## I. Seviye I: ${meta.patterns.length} Ana Çapraz-Alan Yasası (HP-1 – HP-${meta.patterns.length})`,
    "",
    ...meta.patterns.flatMap(p => [
      `### ${p.code}: ${p.title.tr}`,
      "",
      p.summary.tr,
      "",
      `* **Kapsadığı Dosyalar:** \`${p.dossiers.join("`, `")}\``,
      ""
    ]),
    `## II. Seviye II (1 Seviye Daha Derin): 16 Örüntüyü Üreten ${(meta.metaPatterns || []).length} İkinci-Derece Meta-Yasa (MP-1 – MP-${(meta.metaPatterns || []).length})`,
    "",
    ...(meta.metaPatterns || []).flatMap(mp => [
      `### ${mp.code}: ${mp.title.tr}`,
      "",
      mp.summary.tr,
      "",
      `* **Birleştirdiği Seviye-I Örüntüler:** \`${mp.unifies.join("`, `")}\``,
      ""
    ]),
    ...(meta.omegaPattern ? [
      `## III. Seviye III (En Derin Seviye — ${meta.omegaPattern.code}): ${meta.omegaPattern.title.tr}`,
      "",
      meta.omegaPattern.summary.tr,
      ""
    ] : []),
    ...((meta.historicalPatterns || []).length ? [
      `## IV. Seviye IV (Tarihsel Olayların Akışından Çıkan Örüntü Katmanı): ${(meta.historicalPatterns || []).length} Krono-Epistemik Yasa (THP-1 – THP-${(meta.historicalPatterns || []).length}) ve Gezegensel Üst-Yasa (Φ-1)`,
      "",
      ...(meta.historicalPatterns || []).flatMap(tp => [
        `### ${tp.code}: ${tp.title.tr}`,
        "",
        tp.summary.tr,
        ""
      ]),
      ...(meta.chronoLaw ? [
        `### ${meta.chronoLaw.code}: ${meta.chronoLaw.title.tr}`,
        "",
        meta.chronoLaw.summary.tr,
        ""
      ] : [])
    ] : []),
    `## V. Dosya Bazında Keşfedilen Tüm Spesifik Gizli Örüntü Kanıtları (Dosya 01–${String(readyCount).padStart(2, "0")})`,
    "",
    ...discoveredBlocks.flatMap(b => [
      `### 🔍 ${b.title}`,
      "",
      b.body,
      ""
    ])
  ].join("\n");
  const masterPath = join(root, "RESEARCH-REALITY.md");
  if (!existsSync(masterPath) || readFileSync(masterPath, "utf8") !== masterMd) {
    writeFileSync(masterPath, masterMd);
  }
}

// service worker: precache list = every file in www/ except the voice packs (cache-first at runtime) and sw.js;
// the cache name carries a hash of those files, so any content or code change installs as a new version.
export function finishServiceWorker(outRoot = www) {
  const files = [];
  const walk = (dir, rel) => {
    for (const f of readdirSync(dir, { withFileTypes: true })) {
      const r = rel ? `${rel}/${f.name}` : f.name;
      if (f.name.startsWith(".")) continue;
      if (f.isDirectory()) { if (r !== "voice") walk(join(dir, f.name), r); }
      else if (r !== "sw.js" && !r.endsWith(".map")) files.push(r);
    }
  };
  walk(outRoot, "");
  files.sort();
  const h = createHash("sha1");
  for (const f of files) h.update(f).update(readFileSync(join(outRoot, f)));
  const build = h.digest("hex").slice(0, 10);
  const urls = ["./", ...files.filter(f => f !== "index.html"), "index.html"];
  const swPath = join(outRoot, "sw.js");
  const sw = readFileSync(swPath, "utf8").replace("__BUILD__", build).replace("__PRECACHE__", JSON.stringify(urls));
  writeFileSync(swPath, sw);
  return { build, files: urls.length };
}
writeFileSync(join(www, ".nojekyll"), "");            // GitHub Pages: serve files as they are
const sw = finishServiceWorker();

const secs = Object.values(bundle.sessions)
  .map(s => `${s.phases.length} phases`)
  .length;
console.log(`www/ built: ${Object.keys(bundle.sessions).length} sessions (${secs}), ${bundle.waves.waves.length} waves, ${bundle.series.series.length} series, ${bundle.focus.levels.length} focus levels, ${topics.length} guide topics; sw gateway-${sw.build} precaches ${sw.files} files`);
for (const [lang, a] of Object.entries(voiceStats)) console.log(`voice ${lang}: ${a.recorded}/${a.lines} lines recorded in ${Object.keys(a.packs).length} packs`);
