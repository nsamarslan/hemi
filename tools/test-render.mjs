// Node smoke tests for the timeline builder and the pure-JS binaural renderer.
// Renders real WAV chunks, checks bed continuity, carrier/beat frequencies and chunk-boundary
// phase continuity. Usage: node tools/test-render.mjs
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { expandContent } from "./expand.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const B = expandContent();
globalThis.window = { APP_CONTENT: B };
const { buildTimeline, buildRoutine, expandPhases, BED_FADE } = await import("../src/js/timeline.js");
const audio = await import("../src/js/audio.js");

let pass = 0, fail = 0;
const ok = (cond, name) => { cond ? pass++ : fail++; console.log(`${cond ? "PASS" : "FAIL"} ${name}`); };
const close = (a, b, tol) => Math.abs(a - b) <= tol;

const dur = (key, text) => ({ sec: Math.max(1.2, (text || "").length / 13 + 0.4), missing: true });
const opts = { lang: "en", pauseScale: 1, remindEvery: 0, dur, seed: 42, ending: "done" };
const paramsOf = ex => Object.fromEntries(ex.params.map(p => [p.key, p.def]));
const SR = audio.SR;

// ---------- timeline structure ----------
const ex = B.sessions["w2-intro-12"];
const tl = buildTimeline(ex, paramsOf(ex), opts);
ok(tl.phases.length >= 3, `timeline has phases (${tl.phases.length})`);
ok(tl.duration > 300, `duration ${(tl.duration / 60).toFixed(1)} min > 5 min`);
ok(tl.bed.length === tl.phases.length, "one bed segment per phase");
ok(tl.bed[0].t0 === 0, "bed starts at 0");
let noGap = true;
for (let i = 1; i < tl.bed.length; i++) if (tl.bed[i].t0 > tl.bed[i - 1].t0 + tl.bed[i - 1].len + 1e-6) noGap = false;
ok(noGap, "bed segments overlap (no gaps)");
ok(tl.bed[tl.bed.length - 1].t0 + tl.bed[tl.bed.length - 1].len >= tl.duration - 1e-6, "bed covers the whole session");
let freqCont = true;
for (let i = 1; i < tl.bed.length; i++) {
  const p = tl.bed[i - 1], s = tl.bed[i];
  if (!close(s.f0L, p.f1L, 1e-9) || !close(s.f0R, p.f1R, 1e-9)) freqCont = false;
}
ok(freqCont, "beat frequency is continuous across segments (glide starts where previous ended)");
// focus transition 10 → 12 in w2-intro-12: entry phase glides 180/187.5 Hz → 170/174.5 Hz
const entrySeg = tl.bed.find(s => close(s.f1L, 170, 1e-9) && close(s.f1R, 174.5, 1e-9));
ok(!!entrySeg, "entry segment glides to the Focus 12 carrier/beat");
ok(entrySeg && close(entrySeg.f0L, 180, 1e-9) && close(entrySeg.f0R, 187.5, 1e-9), "entry glide starts from the Focus 10 carrier/beat");
ok(entrySeg && entrySeg.glide > 60, `entry glide is slow (${entrySeg?.glide.toFixed(0)} s)`);
// events sorted
ok(tl.events.every((e, i) => i === 0 || tl.events[i - 1].t <= e.t), "events sorted by time");

// ---------- pick a clean 30 s window inside one bed segment, free of bells ----------
const hold = tl.phases.filter(p => p.holdStart != null).sort((a, b) => (b.holdEnd - b.holdStart) - (a.holdEnd - a.holdStart))[0];
const seg = tl.bed.find(s => s.t0 <= hold.holdStart + 10 && s.t0 + s.len >= hold.holdStart + 40);
// after the glide (a glide with f0 === f1 is a no-op, so no need to wait for it), inside the segment
const a = Math.max(hold.holdStart + 8, seg.f0L === seg.f1L ? seg.t0 + 2 : seg.t0 + (seg.hold || 0) + seg.glide + 2);
const b = a + 30;
const bellsIn = tl.events.filter(e => e.type === "bell" && e.t < b && e.t + e.dur > a);
ok(bellsIn.length === 0 && b <= seg.t0 + seg.len - 1, `clean render window [${a.toFixed(0)}, ${b.toFixed(0)}] inside one segment, no bells`);

// ---------- render and verify frequencies ----------
const O = { bedVol: 0.7, bellVol: 0.7, voiceVol: 1, ambience: 0, seed: 7 };
const { L, R } = audio.renderChunkSamples(tl, a, b, "en", O);
ok(L.length === Math.ceil(30 * SR), "chunk length correct");
ok(L.some(v => v !== 0) && R.some(v => v !== 0), "non-silent");
let diff = false;
for (let i = 0; i < L.length; i += 997) if (Math.abs(L[i] - R[i]) > 1e-6) { diff = true; break; }
ok(diff, "left and right channels differ (binaural)");
const zc = x => { let z = 0; for (let i = 1; i < x.length; i++) if ((x[i - 1] < 0) !== (x[i] < 0)) z++; return z / 2 / (x.length / SR); };
// skip 10% at each edge (envelope + edge fades)
const i0 = Math.floor(L.length * 0.1), i1 = Math.floor(L.length * 0.9);
const fL = zc(L.subarray(i0, i1)), fR = zc(R.subarray(i0, i1));
ok(close(fL, seg.f1L, 1.5), `left carrier ≈ ${seg.f1L} Hz (measured ${fL.toFixed(1)})`);
ok(close(fR, seg.f1R, 1.5), `right carrier ≈ ${seg.f1R} Hz (measured ${fR.toFixed(1)})`);
ok(close(fR - fL, seg.f1R - seg.f1L, 0.6), `binaural beat ≈ ${(seg.f1R - seg.f1L).toFixed(1)} Hz (measured ${(fR - fL).toFixed(1)})`);

// ---------- chunk-boundary phase continuity ----------
const mid = a + 30;
const whole = audio.renderChunkSamples(tl, a, mid + 30, "en", O);
const c1 = audio.renderChunkSamples(tl, a, mid, "en", O);
const c2 = audio.renderChunkSamples(tl, mid, mid + 30, "en", O);
const joined = new Float32Array(c1.L.length + c2.L.length);
joined.set(c1.L, 0); joined.set(c2.L, c1.L.length);
const joinAt = c1.L.length;
let maxDiff = 0, maxDiffR = 0;
const skip = Math.floor(0.05 * SR); // ignore the 15 ms edge fades (outer edges AND the join)
const n = Math.min(joined.length, whole.L.length);
for (let i = skip; i < n - skip; i++) {
  if (Math.abs(i - joinAt) < skip) continue; // the join itself has edge fades in the chunked render
  maxDiff = Math.max(maxDiff, Math.abs(joined[i] - whole.L[i]));
  const r = i < joinAt ? c1.R[i] : c2.R[i - joinAt];
  maxDiffR = Math.max(maxDiffR, Math.abs(r - whole.R[i]));
}
ok(maxDiff < 1e-4, `chunk boundary is phase-continuous (max diff ${maxDiff.toExponential(1)} in L)`);
ok(maxDiffR < 1e-4, `chunk boundary is phase-continuous in R (max diff ${maxDiffR.toExponential(1)})`);

// ---------- WAV container ----------
const blob = audio.toWav(whole);
const buf = Buffer.from(await blob.arrayBuffer());
ok(buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WAVE", "WAV header RIFF/WAVE");
ok(buf.readUInt32LE(24) === SR && buf.readUInt16LE(22) === 2 && buf.readUInt16LE(34) === 16, "WAV is stereo 22050 Hz 16-bit");
ok(buf.readUInt32LE(40) === whole.L.length * 4, "WAV data size matches");

// ---------- routine (two sessions joined) ----------
const items = [B.waves.waves[0].items[0], B.waves.waves[0].items[1]].map(id => ({ id }));
const rt = buildRoutine(items, id => B.sessions[id], ex => paramsOf(ex), opts);
ok(rt.duration > tl.duration, "routine duration > single session");
ok(rt.bed[0].t0 === 0 && rt.bed.every((s, i) => i === 0 || s.t0 >= rt.bed[i - 1].t0), "routine bed segments ordered");
let rGap = false;
for (let i = 1; i < rt.bed.length; i++) if (rt.bed[i].t0 > rt.bed[i - 1].t0 + rt.bed[i - 1].len + 1e-6) rGap = true;
ok(!rGap, "routine bed has no gaps");

// ---------- Focus 11 (Human Plus Access Channel) ----------
const hp = B.sessions["hp-attention"];
const htl = buildTimeline(hp, paramsOf(hp), opts);
const seg11 = htl.bed.find(s => close(s.f1L, 175, 1e-9) && close(s.f1R, 181, 1e-9));
ok(!!seg11, "Human Plus segment uses the Focus 11 carrier (175/181 Hz)");
ok(seg11 && close(seg11.f1R - seg11.f1L, 6, 1e-9), "Focus 11 binaural beat is 6 Hz");
const e11 = htl.bed.find(s => close(s.f1L, 175, 1e-9) && s.f0L !== s.f1L);
ok(!!e11 && close(e11.f0L, 180, 1e-9), "entry to Focus 11 glides from the Focus 10 carrier (180 Hz)");
// Prospecting: the Null Point glides Focus 12 → 15 (4.5 → 2.8 Hz)
const ntl = buildTimeline(B.sessions["ffp-nullpoint"], paramsOf(B.sessions["ffp-nullpoint"]), opts);
const seg15 = ntl.bed.find(s => close(s.f1L, 160, 1e-9) && close(s.f1R, 162.8, 1e-9));
ok(!!seg15, "Null Point segment glides down to the Focus 15 carrier (160/162.8 Hz)");
ok(seg15 && close(seg15.f0L, 170, 1e-9), "Null Point glide starts from the Focus 12 carrier (170 Hz)");

// ---------- markdown renderer (guide) ----------
const { renderMd, chapters } = await import("../src/js/md.js");
const mdOut = renderMd("# T\n\nintro **b**\n\n| | A | B |\n|---|---|---|\n| State | Focus 12 | waking |\n\nafter\n- li\n\n## Chap");
ok(/<table><thead><tr><th><\/th><th>A<\/th><th>B<\/th><\/tr><\/thead><tbody><tr><td>State<\/td><td>Focus 12<\/td><td>waking<\/td><\/tr><\/tbody><\/table>/.test(mdOut), "md: pipe table renders with header + body (separator row dropped)");
ok(/<p>after<\/p>\n<ul><li>li<\/li><\/ul>/.test(mdOut) && /<p>intro <b>b<\/b><\/p>/.test(mdOut), "md: paragraphs, bold and lists still render around a table");
ok(chapters("## A\n## B c").length === 2, "md: chapters() lists ## headings");
ok(/<li>☐ a<\/li><li>☑ b<\/li>/.test(renderMd("- [ ] a\n- [x] b")), "md: task-list items render as checkboxes");
ok(renderMd("## H\n\n[[storyboard:rebal]]\n\ntext") === '<h2 id="ch-h">H</h2>\n<div class="sb-embed" data-sb-embed="rebal"></div>\n<p>text</p>', "md: [[storyboard:id]] directive becomes an embed box");
ok(renderMd("## D\n\n[[diagram:epistemic-bayes-filter]]\n\n> **🔍 GİZLİ ÖRÜNTÜ HP-1:** test") === '<h2 id="ch-d">D</h2>\n<div class="diag-embed" data-diag-embed="epistemic-bayes-filter"></div>\n<blockquote class="hp-callout"><b>🔍 GİZLİ ÖRÜNTÜ HP-1:</b> test</blockquote>', "md: [[diagram:id]] and hp-callout blockquote render");
const DG = await import("../src/js/diagrams.js");
ok(Object.keys(DG.DIAGRAMS).length === 95 && Object.keys(DG.DIAGRAMS).every(id => /<figure class="res-fig"/.test(DG.renderDiagram(id, "tr")) && /<svg viewBox=/.test(DG.renderDiagram(id, "en"))), `all ${Object.keys(DG.DIAGRAMS).length} research diagrams render valid figure+svg`);

ok(/Input X/.test(DG.renderDiagram("horizon-phi2", "en")) && /Girdi X/.test(DG.renderDiagram("horizon-phi2", "tr")), "Φ-2 diagram renders labels in the selected language");

// ---------- technique storyboards: every technique has one, every scene renders valid SVG ----------
const SB = await import("../src/js/storyboard.js");
// strict XML parsing when jsdom is around (SMOKE_DIR, same as smoke-test.mjs); otherwise a tag-balance check
let JSDOM = null;
try { ({ JSDOM } = await import(pathToFileURL(join(process.env.SMOKE_DIR || join(root, "node_modules", "..", "x"), "node_modules", "jsdom", "lib", "api.js")).href)); } catch {}
const wellFormed = svg => {
  if (JSDOM) { try { new JSDOM(svg, { contentType: "image/svg+xml" }); return true; } catch { return false; } }
  const open = tag => (svg.match(new RegExp(`<${tag}[\\s>]`, "g")) || []).length, close = tag => (svg.match(new RegExp(`</${tag}>`, "g")) || []).length;
  return ["svg", "g", "text"].every(tg => open(tg) === close(tg)) && !/&(?!amp;|lt;|gt;|quot;|#\d+;)/.test(svg);
};
ok(["tr", "en"].every(lang => wellFormed(DG.DIAGRAMS["horizon-phi2"].svg(lang))), "Φ-2 diagram is well-formed SVG in both languages");
const techIds = ["a", "b"].flatMap(k => JSON.parse(readFileSync(join(root, "content", `techniques-${k}.json`), "utf8")).techniques.map(x => x.id));
ok(techIds.length === 21 && techIds.every(id => SB.storyboards[id]), `storyboards cover all ${techIds.length} techniques`);
let scenes = 0, badScene = null;
for (const id of SB.storyboardIds) {
  const sb = SB.storyboards[id];
  if (sb.steps.length < 3) badScene = `${id}: only ${sb.steps.length} steps`;
  if (sb.thumb >= sb.steps.length) badScene = `${id}: thumb index out of range`;
  sb.steps.forEach((st, i) => {
    scenes++;
    for (const lang of ["tr", "en"]) {
      if (!st[lang] || st[lang].length < 12) badScene = `${id}#${i}: missing ${lang} caption`;
      const svg = SB.renderFrame(id, i, lang);
      if (!wellFormed(svg)) badScene = `${id}#${i} ${lang}: invalid svg`;
      if (!/^<svg viewBox="0 0 240 160" class="sb-svg" role="img" aria-label="/.test(svg)) badScene = `${id}#${i}: wrong svg wrapper`;
    }
  });
  if (!/^<span class="sb-static"><svg /.test(SB.renderThumb(id, "tr"))) badScene = `${id}: thumb wrapper`;
}
ok(!badScene && scenes >= 80, badScene || `all ${scenes} storyboard scenes render well-formed bilingual SVG`);
ok(/out at the crown/.test(SB.renderFrame("rebal", 2, "en")) && /tepeden çık/.test(SB.renderFrame("rebal", 2, "tr")), "in-scene labels follow the language");


// ---------- sleep sessions: no count-back, no end bell, long bed fade-out ----------
{
  const night = B.sessions["w1-sleep"];
  ok(night.night === true && !night.phases.some(p => p.id === "return"), "night session has no return phase in its content");
  const pn = paramsOf(night); pn.explore = 4;
  const ntl = buildTimeline(night, pn, { ...opts, sleepFade: 90 });
  const last = ntl.phases[ntl.phases.length - 1];
  ok(last.uid === "fade" && close(last.end - last.start, 90, 1e-9) && last.holdStart === last.start && last.holdEnd === last.end, `night timeline ends with a 90 s fade phase (${last.uid}, ${(last.end - last.start).toFixed(0)} s)`);
  ok(close(ntl.duration, last.end, 1e-9), "night session ends when the fade ends");
  ok(!ntl.events.some(e => e.type === "bell" && e.t > ntl.phases[1].start) && !ntl.events.some(e => e.type === "clip" && e.t >= last.start), "no end bell and no spoken line after the hold in a night session");
  ok(ntl.bed.length === ntl.phases.length, "night session: one bed segment per phase (fade included)");
  const fseg = ntl.bed[ntl.bed.length - 1];
  ok(fseg.fadeOut === fseg.len && fseg.len >= 90 && close(fseg.f0L, ntl.bed[ntl.bed.length - 2].f1L, 1e-9), "fade segment keeps the previous frequency and fades over its whole length");
  const rms = x => Math.sqrt(x.reduce((a, v) => a + v * v, 0) / x.length);
  const early = audio.renderChunkSamples(ntl, last.start + 2, last.start + 7, "en", O);
  const late = audio.renderChunkSamples(ntl, ntl.duration - 6, ntl.duration - 1, "en", O);
  ok(rms(early.L) > 0.02 && rms(late.L) < rms(early.L) * 0.15, `bed fades out towards the end (rms ${rms(early.L).toFixed(3)} → ${rms(late.L).toFixed(4)})`);
  const def = buildTimeline(night, pn, opts);
  const dl = def.phases[def.phases.length - 1];
  ok(close(dl.end - dl.start, 120, 1e-9), "default sleep fade is 2 minutes");
  // silence + wake bell used after the session while waiting for the alarm
  const sil = Buffer.from(await audio.silenceWav(3).arrayBuffer());
  ok(sil.toString("ascii", 0, 4) === "RIFF" && sil.readUInt32LE(24) === 8000 && sil.readUInt16LE(22) === 1 && sil.readUInt32LE(40) === 3 * 8000 * 2 && sil.length === 44 + 3 * 8000 * 2, "silence WAV is 8 kHz mono 16-bit with the exact length");
  ok(sil.subarray(44).every(b => b === 0), "silence WAV is all zeros");
  const alarm = audio.alarmSamples("en", "morning", { bellVol: 0.8 });
  ok(alarm.L.length === 60 * SR && alarm.L.some(v => v !== 0), "alarm renders one minute of sound");
  const q = Math.floor(alarm.L.length / 4);
  ok(rms(alarm.L.subarray(3 * q)) > rms(alarm.L.subarray(0, q)) * 1.5, `alarm rises in level (rms ${rms(alarm.L.subarray(0, q)).toFixed(3)} → ${rms(alarm.L.subarray(3 * q)).toFixed(3)})`);
  ok(/Good morning/.test(alarm.text) && /Wake up/.test(audio.alarmSamples("en", "wbtb").text) && /Günaydın/.test(audio.alarmSamples("tr", "morning").text), "alarm carries the wake line for the kind and language");
}

// ---------- breath guide: paced-breathing holds drive a screen ring and an audio cue from the same timeline ----------
{
  const { breathAt, breathPattern } = await import("../src/js/timeline.js");
  const rms = x => Math.sqrt(x.reduce((a, v) => a + v * v, 0) / x.length);
  // resonant tuning in every prep: 4 s in, 6 s out, hum on the exhale
  const prepPh = ex.phases.find(p => p.id === "prep");
  const bp = breathPattern(prepPh);
  ok(bp && bp.in === 4 && bp.out === 6 && bp.hold === 0 && bp.rest === 0 && bp.tone === "hum" && bp.period === 10, "prep template carries the resonant-tuning breath pattern (4 in / 6 out, hum)");
  const prepRec = tl.phases.find(p => p.uid === "prep");
  const seg = (tl.breath || []).find(b => b.phase === "prep");
  ok(seg && seg.t0 === prepRec.holdStart && seg.t1 === prepRec.holdEnd && close(seg.t1 - seg.t0, 45, 1e-6), "timeline has a breath segment covering the 45 s tuning hold");
  ok(breathAt(tl, seg.t0 - 1) == null && breathAt(tl, seg.t1 + 0.5) == null, "breathAt is null outside the hold");
  const s1 = breathAt(tl, seg.t0 + 2), s2 = breathAt(tl, seg.t0 + 7), s3 = breathAt(tl, seg.t0 + 13);
  ok(s1.stage === "in" && close(s1.k, 0.5, 1e-9) && close(s1.level, 0.5, 1e-9) && close(s1.left, 2, 1e-9) && s1.cycle === 0, "2 s into the cycle: inhaling, half full, 2 s left");
  ok(s2.stage === "out" && close(s2.k, 0.5, 1e-9) && close(s2.level, 0.5, 1e-9) && close(s2.left, 3, 1e-9), "7 s into the cycle: exhaling, half empty, 3 s left");
  ok(s3.stage === "in" && s3.cycle === 1 && close(s3.k, 0.75, 1e-9), "cycles repeat (13 s → second cycle, inhaling)");
  // audio cue: the hum is present only during exhales, and only when the cue is on
  const Oq = { ...O, ambience: 0 };
  const on = audio.renderChunkSamples(tl, seg.t0, seg.t0 + 10, "en", { ...Oq, breathCue: true });
  const off = audio.renderChunkSamples(tl, seg.t0, seg.t0 + 10, "en", { ...Oq, breathCue: false });
  const diff = new Float32Array(on.L.length); for (let i = 0; i < diff.length; i++) diff[i] = on.L[i] - off.L[i];
  const inhale = diff.subarray(Math.floor(0.3 * SR), Math.floor(3.7 * SR)), exhale = diff.subarray(Math.floor(5 * SR), Math.floor(9 * SR));
  ok(rms(inhale) < 1e-6, `no hum while inhaling (rms ${rms(inhale).toExponential(1)})`);
  ok(rms(exhale) > 0.01, `hum tone during the exhale (rms ${rms(exhale).toFixed(3)})`);
  ok(rms(off.L) > 0.02, "the bed itself is unaffected when the cue is off");
  // chunk boundary inside an exhale: the hum phase continues seamlessly
  const w1 = audio.renderChunkSamples(tl, seg.t0 + 4, seg.t0 + 7, "en", { ...Oq, breathCue: true }), w2 = audio.renderChunkSamples(tl, seg.t0 + 7, seg.t0 + 10, "en", { ...Oq, breathCue: true });
  const whole2 = audio.renderChunkSamples(tl, seg.t0 + 4, seg.t0 + 10, "en", { ...Oq, breathCue: true });
  let md = 0; const sk = Math.floor(0.05 * SR), j0 = w1.L.length;
  for (let i = sk; i < whole2.L.length - sk; i++) { if (Math.abs(i - j0) < sk) continue; md = Math.max(md, Math.abs((i < j0 ? w1.L[i] : w2.L[i - j0]) - whole2.L[i])); }
  ok(md < 1e-4, `hum is phase-continuous across a chunk boundary (max diff ${md.toExponential(1)})`);
  // box breathing: 4/4/4/4 with ticks at every stage change
  const box = B.sessions["ex-boxbreath"];
  const btl = buildTimeline(box, paramsOf(box), opts);
  const bseg = btl.breath.find(b => b.phase === "box");
  ok(bseg && bseg.in === 4 && bseg.hold === 4 && bseg.out === 4 && bseg.rest === 4 && bseg.tone === "tick" && close(bseg.t1 - bseg.t0, 300, 1e-6), "box breathing hold carries a 4-4-4-4 tick pattern over 5 minutes");
  const st = [1, 5, 9, 13].map(x => breathAt(btl, bseg.t0 + x).stage);
  ok(st.join() === "in,hold,out,rest", `box stages in order (${st.join(" → ")})`);
  const bon = audio.renderChunkSamples(btl, bseg.t0 + 16, bseg.t0 + 32, "en", { ...Oq, breathCue: true }), boff = audio.renderChunkSamples(btl, bseg.t0 + 16, bseg.t0 + 32, "en", { ...Oq, breathCue: false });
  const bd = new Float32Array(bon.L.length); for (let i = 0; i < bd.length; i++) bd[i] = bon.L[i] - boff.L[i];
  const tickAt = x => rms(bd.subarray(Math.floor(x * SR), Math.floor((x + 0.3) * SR)));
  ok(tickAt(0) > 1e-3 && tickAt(4) > 1e-3 && tickAt(8) > 1e-3 && tickAt(12) > 1e-3 && tickAt(2) < 1e-6 && tickAt(6) < 1e-6, "ticks sound at each stage change and nowhere else");
  // colour breathing: visual only
  const col = B.sessions["w2-color"];
  const ctl = buildTimeline(col, paramsOf(col), opts);
  const cseg = ctl.breath.find(b => b.phase === "breathe");
  ok(cseg && cseg.tone == null && cseg.in === 5 && cseg.out === 7, "colour breathing has a visual-only 5/7 pattern");
  const con = audio.renderChunkSamples(ctl, cseg.t0, cseg.t0 + 12, "en", { ...Oq, breathCue: true }), coff = audio.renderChunkSamples(ctl, cseg.t0, cseg.t0 + 12, "en", { ...Oq, breathCue: false });
  let cd = 0; for (let i = 0; i < con.L.length; i++) cd = Math.max(cd, Math.abs(con.L[i] - coff.L[i]));
  ok(cd === 0, "visual-only patterns add nothing to the audio");
  // routines carry breath segments with their offsets (two Wave I sessions, each with a tuning hold)
  const rt2 = buildRoutine([{ id: "w1-orientation" }, { id: "w1-intro-10" }], id => B.sessions[id], e => paramsOf(e), opts);
  ok(rt2.breath.length === 2 && rt2.breath[1].t0 > rt2.breath[0].t1 && rt2.breath.every(b => rt2.phases.some(p => p.holdStart === b.t0 && p.holdEnd === b.t1)), `routine keeps both breath segments aligned with their holds (${rt2.breath.length})`);
}

// ---------- bed level across segment crossfades: phase changes, glides and routine transitions ----------
{
  const Ob = { bedVol: 1, bellVol: 0, voiceVol: 0, ambience: 0, breathCue: false };
  // worst 0.25 s peak per ear from 4 s before to 4 s after each crossfade, in dB below the quieter of the two segments
  // (an in-phase crossfade moves monotonically between the two gains; partial cancellation dips below both)
  const worstDip = (t, max = 4) => {
    let worst = Infinity;
    for (const s of t.bed.slice(1, max + 1)) {
      const p = t.bed[t.bed.indexOf(s) - 1];
      if (p.fadeOut || s.fadeOut) continue;
      const { L, R } = audio.renderChunkSamples(t, Math.max(0, s.t0 - 4), Math.min(t.duration, s.t0 + BED_FADE + 4), "en", Ob);
      for (const ch of [L, R]) {
        const w = Math.floor(0.25 * SR); let lo = Infinity;
        for (let k = 0; k + w <= ch.length; k += w) { let m = 0; for (let j = k; j < k + w; j++) m = Math.max(m, Math.abs(ch[j])); lo = Math.min(lo, m); }
        worst = Math.min(worst, 20 * Math.log10(lo / Math.min(p.gain, s.gain)));
      }
    }
    return worst;
  };
  const d15 = worstDip(buildTimeline(B.sessions["w5x-intro15"], paramsOf(B.sessions["w5x-intro15"]), opts));
  ok(d15 > -1.5, `Focus 15 phase crossfades keep the bed level in both ears (worst ${d15.toFixed(1)} dB)`);
  const d21 = worstDip(buildTimeline(B.sessions["w6-intro21"], paramsOf(B.sessions["w6-intro21"]), opts));
  ok(d21 > -1.5, `Focus 21 phase crossfades keep the bed level in both ears (worst ${d21.toFixed(1)} dB)`);
  const d12 = worstDip(tl);
  ok(d12 > -1.5, `gliding crossfades (Focus 10 → 12) keep the bed level (worst ${d12.toFixed(1)} dB)`);
  const rt = buildRoutine([{ id: "job-intro" }, { id: "job-relax" }], id => B.sessions[id], e => paramsOf(e), opts);
  const firstOfSecond = rt.bed.find(s => s.t0 > 0 && rt.phases.find(p => p.start === s.t0)?.exId === "job-relax");
  const dr = worstDip({ ...rt, bed: rt.bed.slice(rt.bed.indexOf(firstOfSecond) - 1) }, 2);
  ok(firstOfSecond && dr > -1.5, `routine transition keeps the bed level (worst ${dr.toFixed(1)} dB)`);
}

// ---------- player: a seek into another chunk must not leak its offset into the following chunks ----------
{
  class FakeAudio {     // just enough of HTMLAudioElement: setting src fires loadedmetadata asynchronously
    constructor() { this.currentTime = 0; this.paused = true; this.onloadedmetadata = null; this.onended = null; this._src = ""; }
    get src() { return this._src; }
    set src(u) { this._src = u; this.currentTime = 0; setTimeout(() => this.onloadedmetadata?.(), 0); }
    setAttribute() {} removeAttribute() { this._src = ""; } load() {}
    play() { this.paused = false; return Promise.resolve(); }
    pause() { this.paused = true; }
  }
  globalThis.Audio = FakeAudio;
  globalThis.document ??= { body: { appendChild() {} } };
  if (typeof navigator === "undefined") globalThis.navigator = {};     // Node < 21 has no navigator global
  const ptl = { duration: 400, events: [], breath: [], phases: [], bed: [{ t0: 0, len: 400.5, glide: 0, fade: 2, gain: 0.14, f0L: 180, f1L: 180, f0R: 188, f1R: 188, phaseL: 0, phaseR: 0 }] };
  const pl = new audio.SessionPlayer(ptl, "en", { title: "t", artist: "a" });
  await pl.start();
  await pl.seek(200);                                     // second chunk (150–300 s), 50 s in
  ok(pl.i === 1 && close(pl.time(), 200, 1e-9), `seek lands in the second chunk at 200 s (${pl.time()})`);
  await pl.advance();                                     // that chunk ended → the third one starts
  await new Promise(r => setTimeout(r, 20));              // let any pending loadedmetadata handler run
  ok(pl.i === 2 && close(pl.time(), 300, 1e-9), `the next chunk plays from its start, not from the old seek offset (${pl.time()})`);
  pl.stop();
}

// ---------- write artifacts for manual listening (gitignored build/) ----------
mkdirSync(join(root, "build"), { recursive: true });
writeFileSync(join(root, "build", "test-bed-60s.wav"), Buffer.from(await audio.toWav(audio.renderChunkSamples(tl, a, a + 60, "en", O)).arrayBuffer()));
const short = B.sessions["w1-orientation"];
const p2 = paramsOf(short); p2.entry = 2; p2.explore = 5;
const tl2 = buildTimeline(short, p2, opts);
const full = audio.renderChunkSamples(tl2, 0, Math.min(60, tl2.duration), "en", { ...O, ambience: 0.02 });
writeFileSync(join(root, "build", "test-session-60s.wav"), Buffer.from(await audio.toWav(full).arrayBuffer()));
console.log(`\nwrote build/test-bed-60s.wav and build/test-session-60s.wav (${(tl2.duration / 60).toFixed(1)} min session, first 60 s rendered)`);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
