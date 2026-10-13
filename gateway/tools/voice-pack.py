#!/usr/bin/env python3
"""Recorded voice packs: plan the text batches for a TTS, split the returned audio into per-line clips,
verify the split, and store the clips the build turns into packs.

  voice-pack.py plan   --lang tr                       batches (deterministic: derived from the content only)
  voice-pack.py text   --lang tr --batch 3             the exact text to synthesize for one batch
  voice-pack.py split  --lang tr --batch 3 --audio f   segment + verify + write content/voice/<lang>/<key>.mp3
  voice-pack.py split  ... --partial                   keep the clean lines, leave flagged ones for a retry round
  voice-pack.py plan|text|split --missing ...          retry batches made of the lines still without a clip
  voice-pack.py import --lang tr --dir DIR             import per-line files named <key>.(wav|mp3|flac|ogg)
  voice-pack.py status [--lang tr]                     coverage, orphans, batches still missing

Layout: content/voice/<lang>/<key>.mp3 (mono 22.05 kHz, 48 kbps) + content/voice/<lang>/index.json
({ clips: { key: { dur, text, batch, check } } }). tools/build.mjs concatenates the clips into one file
per pack (common + one per session) and writes the manifest into APP_CONTENT.audio; src/js/audio.js
mixes the clips into the rendered session audio, so the voice plays with the screen locked too.

Splitting a batch: the TTS reads the lines separated by blank lines. It pauses (>= ~0.15 s) at every
punctuation mark, so the detected silences nearly enumerate the punctuation chunks of the text; a dynamic
programme assigns the chunks, in order, to the silences by comparing each span's duration with the chunk's
character count (speech rate calibrated per batch; stray breaths are skipped, missing comma pauses merge
two chunks). Line boundaries are the chunk boundaries where a line ends. Every line is then checked:
speech duration against the text, the pause at each line end, syllable nuclei in the audio against the
vowels of the text (Turkish), and recognised phones against the text (English, pocketsphinx). Flagged
lines and their neighbours are left out with --partial (or --force writes everything); `plan --missing`
then groups the leftovers into retry batches (`text --missing N` / `split --missing N`).

Requires: numpy, soundfile, imageio-ffmpeg (bundled ffmpeg); optional pocketsphinx for the English check.
"""
import argparse, json, math, os, re, subprocess, sys, tempfile, unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VOICE = ROOT / "content" / "voice"
MAX_CHARS, MAX_LINES = 1400, 24
LEAD, TAIL = 0.10, 0.22          # silence kept before / after each clip (s)
MIN_GAP = 0.12                   # silence run that counts as a pause candidate (s)
TARGET_RMS_DB = -20.0


def run_node_inventory():
    out = subprocess.run(["node", str(ROOT / "tools" / "voice-lines.mjs")], check=True, capture_output=True, text=True).stdout
    return json.loads(out)


def batches_for(lang, inv=None, max_chars=MAX_CHARS, max_lines=MAX_LINES, missing=False):
    """Deterministic batches of the inventory. missing=True → only the lines without a clip yet (retry round;
    numbering changes as clips arrive, so always pair `text --missing N` with `split --missing N` in one go)."""
    inv = inv or run_node_inventory()
    lines = inv[lang]["lines"]
    if missing:
        have = load_index(lang)["clips"]
        lines = [ln for ln in lines if ln["key"] not in have]
    out, cur, chars = [], [], 0
    for ln in lines:
        add = len(ln["text"]) + (2 if cur else 0)
        if cur and (chars + add > max_chars or len(cur) >= max_lines):
            out.append(cur); cur, chars = [], 0
            add = len(ln["text"])
        cur.append(ln); chars += add
    if cur: out.append(cur)
    return out


def batch_text(batch):
    return "\n\n".join(ln["text"] for ln in batch)


def load_index(lang):
    p = VOICE / lang / "index.json"
    if p.exists():
        return json.loads(p.read_text(encoding="utf-8"))
    return {"clips": {}}


def save_index(lang, idx):
    p = VOICE / lang / "index.json"
    p.parent.mkdir(parents=True, exist_ok=True)
    idx["clips"] = dict(sorted(idx["clips"].items()))
    p.write_text(json.dumps(idx, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")


# ---------- audio helpers ----------
def ffmpeg_exe():
    import imageio_ffmpeg
    return imageio_ffmpeg.get_ffmpeg_exe()


def load_mono(path):
    import soundfile as sf
    data, sr = sf.read(str(path), dtype="float32", always_2d=True)
    return data.mean(axis=1), sr


def frame_rms_db(x, sr, hop=0.01):
    import numpy as np
    n = int(sr * hop)
    m = len(x) // n
    fr = x[: m * n].reshape(m, n)
    rms = np.sqrt((fr ** 2).mean(axis=1)) + 1e-9
    return 20 * np.log10(rms), hop


def silence_runs(db, hop, thr, min_len):
    """[(start_s, end_s)] of runs below thr lasting >= min_len seconds."""
    runs, i, n = [], 0, len(db)
    while i < n:
        if db[i] < thr:
            j = i
            while j < n and db[j] < thr: j += 1
            if (j - i) * hop >= min_len: runs.append((i * hop, j * hop))
            i = j
        else:
            i += 1
    return runs


def analyse(x, sr):
    import numpy as np
    db, hop = frame_rms_db(x, sr)
    speech = float(np.percentile(db, 85))
    thr = min(max(speech - 32, -58), -36)
    runs = silence_runs(db, hop, thr, MIN_GAP)
    voiced = np.where(db >= thr)[0]
    onset = voiced[0] * hop if len(voiced) else 0.0
    offset = (voiced[-1] + 1) * hop if len(voiced) else len(x) / sr
    return {"thr": thr, "speech_db": speech, "runs": runs, "onset": onset, "offset": offset, "hop": hop}


def chunks_of(batch):
    """Punctuation-delimited chunks of a batch: [{line, chars, last}] — the TTS pauses at every , . ? !"""
    out = []
    for li, ln in enumerate(batch):
        parts = [c.strip() for c in re.split(r"[.,!?]+", ln["text"]) if c.strip()]
        for ci, c in enumerate(parts):
            out.append({"line": li, "chars": len(re.sub(r"\s+", "", c)), "last": ci == len(parts) - 1})
    return out


VOWELS = set("aeıioöuüâîû")


def syllables_text(text):
    """Turkish is syllable-per-vowel; good enough as an expected nucleus count."""
    return sum(1 for c in text.lower() if c in VOWELS)


def syllable_nuclei(x, sr, a, e):
    """Count syllable nuclei in x[a:e] (s): peaks of the smoothed 300–2500 Hz energy envelope."""
    import numpy as np
    seg = x[int(a * sr): int(e * sr)]
    hop, win = int(0.01 * sr), int(0.032 * sr)
    n = (len(seg) - win) // hop
    if n < 3: return 0
    frames = np.lib.stride_tricks.as_strided(seg, (n, win), (seg.strides[0] * hop, seg.strides[0]))
    spec = np.abs(np.fft.rfft(frames * np.hanning(win), axis=1)) ** 2
    f = np.fft.rfftfreq(win, 1 / sr)
    env = spec[:, (f >= 300) & (f <= 2500)].sum(1)
    env = np.convolve(env, np.ones(5) / 5, "same")
    env = env / (env.max() + 1e-12)
    peaks, last = 0, -10
    for i in range(1, len(env) - 1):
        if env[i] >= env[i - 1] and env[i] > env[i + 1] and env[i] > 0.06 and i - last >= 7:
            l, r = env[max(0, i - 15): i].min(), env[i + 1: i + 16].min()
            if min(l, r) < 0.55 * env[i]: peaks += 1; last = i
    return peaks


def align(batch, info, total_end):
    """Line boundaries from the silence candidates.

    The TTS pauses (>= ~0.15 s) at every punctuation mark, so the candidates nearly enumerate the
    punctuation chunks. A dynamic programme assigns the chunks (in order) to the silence candidates,
    scoring each span by its duration against the chunk's character count (speech rate calibrated on
    the batch). Extra candidates (breaths) are skipped; a missing short pause merges two chunks
    (penalised). Line boundaries are the chunk boundaries where a line ends.
    Returns (spans, gaps, ratios, stats) with spans = speech [start, end] per line.
    """
    N = len(batch)
    ch = chunks_of(batch)
    M = len(ch)
    inner = [(s, e) for (s, e) in info["runs"] if s > info["onset"] + 0.05 and e < info["offset"] - 0.05]
    K = len(inner)
    if N == 1:
        return [(info["onset"], info["offset"])], [], [1.0], {"extra": 0, "merged": 0, "K": K, "M": M}
    speech_total = (info["offset"] - info["onset"]) - sum(e - s for s, e in inner) * min(1.0, (M - 1) / max(K, 1))
    base = 0.10
    rate = sum(c["chars"] for c in ch) / max(1e-6, speech_total - base * M)
    est = [c["chars"] / rate + base for c in ch]
    starts = [info["onset"]] + [e for (_, e) in inner]          # span start if previous boundary is candidate k-1
    ends = [s for (s, _) in inner] + [info["offset"]]           # span end at candidate k (k == K → file end)
    INF = float("inf")
    MERGE_PEN, MAXG = 1.2, 3                                     # merged chunks cost; at most 3 chunks per span
    lcost = lambda dur, e: (math.log(max(dur, 0.04) / e)) ** 2
    # D[i][k]: chunks 0..i placed, chunk i ends at candidate k (k in 0..K-1); last chunk ends at K (file end)
    D = [[INF] * (K + 1) for _ in range(M)]
    P = [[None] * (K + 1) for _ in range(M)]
    for i in range(min(MAXG, M)):                               # first group: chunks 0..i from onset
        for k in range(K + 1):
            if (i == M - 1) != (k == K): continue
            c = lcost(ends[k] - info["onset"], sum(est[: i + 1])) + MERGE_PEN * i
            if c < D[i][k]: D[i][k], P[i][k] = c, (-1, -1)
    for i in range(M):
        for k in range(K):
            if D[i][k] == INF: continue
            for g in range(1, MAXG + 1):                       # next group: chunks i+1 .. i+g
                j = i + g
                if j >= M: break
                e_sum = sum(est[i + 1: j + 1])
                for k2 in range(k + 1, K + 1):
                    if (j == M - 1) != (k2 == K): continue
                    c = D[i][k] + lcost(ends[k2] - starts[k + 1], e_sum) + MERGE_PEN * (g - 1)
                    if c < D[j][k2]: D[j][k2], P[j][k2] = c, (i, k)
    if D[M - 1][K] == INF:
        raise SystemExit(f"alignment impossible: {K} silence candidates for {M} chunks")
    # back-track: chunk group ends
    groups = []                                                 # (first_chunk, last_chunk, cand_end)
    i, k = M - 1, K
    while i >= 0:
        pi, pk = P[i][k]
        groups.append((pi + 1, i, k))
        i, k = pi, pk
    groups.reverse()
    merged = sum(b - a for a, b, _ in groups)
    extra = K - (len(groups) - 1)
    # chunk → (start, end) speech times
    cstart, cend = [None] * M, [None] * M
    prev_k = -1
    for a, b, k in groups:
        s0 = info["onset"] if prev_k < 0 else inner[prev_k][1]
        e0 = info["offset"] if k == K else inner[k][0]
        for c in range(a, b + 1): cstart[c], cend[c] = s0, e0
        prev_k = k
    spans, gaps, ratios = [], [], []
    for li in range(N):
        idx = [c for c in range(M) if ch[c]["line"] == li]
        a, b = cstart[idx[0]], cend[idx[-1]]
        spans.append((a, b))
        e_line = sum(est[c] for c in idx)
        pauses = sum(min(e, b) - max(s0, a) for s0, e in inner if e > a and s0 < b)   # silences inside the line
        ratios.append(((b - a) - pauses) / e_line)
        if li < N - 1:
            nxt = cstart[[c for c in range(M) if ch[c]["line"] == li + 1][0]]
            gaps.append(nxt - b)
    return spans, gaps, ratios, {"extra": extra, "merged": merged, "K": K, "M": M}


# ---------- English check with pocketsphinx (optional) ----------
_ps = None


def asr_words(x, sr):
    global _ps
    try:
        from pocketsphinx import Decoder
        import numpy as np
    except Exception:
        return None
    if _ps is None:
        _ps = Decoder(samprate=16000, loglevel="ERROR")
    # resample to 16 kHz (linear) and int16
    n = int(len(x) * 16000 / sr)
    idx = np.linspace(0, len(x) - 1, n)
    y = np.interp(idx, np.arange(len(x)), x)
    pcm = (np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes()
    _ps.start_utt(); _ps.process_raw(pcm, False, True); _ps.end_utt()
    h = _ps.hyp()
    return (h.hypstr if h else "").split()


def norm_words(s):
    s = unicodedata.normalize("NFKC", s).lower()
    s = re.sub(r"[^a-z0-9' ]+", " ", s)
    return s.split()


_dict = None


def phones(words):
    """Phone sequence of a word list via the bundled CMU dictionary (stress stripped; unknown words → letters)."""
    global _dict
    if _dict is None:
        _dict = {}
        try:
            import pocketsphinx
            path = os.path.join(pocketsphinx.get_model_path(), "en-us", "cmudict-en-us.dict")
            with open(path, encoding="utf-8") as f:
                for ln in f:
                    w, *ph = ln.split()
                    if "(" in w: continue
                    _dict[w] = [re.sub(r"\d", "", p) for p in ph]
        except Exception:
            pass
    out = []
    for w in words:
        out += _dict.get(w, list(w))
    return out


def seq_sim(a, b):
    """1 - Levenshtein(a, b) / max(len) on sequences."""
    if not a and not b: return 1.0
    prev = list(range(len(b) + 1))
    for i, x in enumerate(a, 1):
        cur = [i]
        for j, y in enumerate(b, 1):
            cur.append(min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (x != y)))
        prev = cur
    return 1 - prev[-1] / max(len(a), len(b), 1)


def word_recall(ref, hyp):
    """(phone-level similarity, word recall) between the expected text and the recogniser's words.
    pocketsphinx's language model often picks homophones ("closure rise" for "close your eyes"), so the
    phone similarity is the decisive number; word recall is informative only."""
    from collections import Counter
    rw, hw = norm_words(ref), list(hyp)
    r, h = Counter(rw), Counter(hw)
    if not r: return 1.0, 1.0
    hit = sum(min(c, h[w]) for w, c in r.items())
    return seq_sim(phones(rw), phones(hw)), hit / sum(r.values())


# ---------- clip writing ----------
def encode_clip(x, sr, out_path):
    import soundfile as sf
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        sf.write(tmp.name, x, sr, subtype="PCM_16")
        tmpname = tmp.name
    try:
        subprocess.run([ffmpeg_exe(), "-v", "error", "-y", "-i", tmpname, "-ar", "22050", "-ac", "1", "-c:a", "libmp3lame",
                        "-b:a", "48k", "-write_xing", "0", "-id3v2_version", "0", "-f", "mp3", str(out_path)], check=True)
    finally:
        os.unlink(tmpname)


def level_gain(x, sr, thr):
    import numpy as np
    db, hop = frame_rms_db(x, sr)
    voiced = db[db >= thr]
    if not len(voiced): return 1.0
    cur = float(np.median(voiced))
    g = 10 ** ((TARGET_RMS_DB - cur) / 20)
    peak = float(np.abs(x).max()) * g
    if peak > 0.95: g *= 0.95 / peak
    return g


def cmd_split(args):
    import numpy as np
    inv = run_node_inventory()
    batches = batches_for(args.lang, inv, missing=args.missing)
    b = batches[args.batch]
    x, sr = load_mono(args.audio)
    info = analyse(x, sr)
    spans, gaps, ratios, st = align(b, info, len(x) / sr)
    g = level_gain(x, sr, info["thr"])
    x = np.clip(x * g, -1, 1)
    flags = [[] for _ in b]                                   # per-line reasons not to trust the cut
    batch_problems = []
    for i, r in enumerate(ratios):
        if not (0.68 <= r <= 1.45): flags[i].append(f"duration ratio {r:.2f}")
    for i, gp in enumerate(gaps):
        if gp < 0.15:
            flags[i].append(f"gap after {gp:.2f}s"); flags[i + 1].append(f"gap before {gp:.2f}s")
    spread = float(np.std([math.log(r) for r in ratios])) if len(ratios) > 1 else 0.0
    if spread > 0.22: batch_problems.append(f"ratio spread {spread:.2f}")
    if st["extra"] > 6: batch_problems.append(f"{st['extra']} unexplained pauses")
    if st["merged"] > 6: batch_problems.append(f"{st['merged']} punctuation pauses missing")
    checks = []
    if args.lang == "en" and not args.no_asr:
        sims = []
        for i, (ln, (a, e)) in enumerate(zip(b, spans)):
            seg = x[int(max(0, a - LEAD) * sr): int(min(len(x) / sr, e + TAIL) * sr)]
            hyp = asr_words(seg, sr)
            if hyp is None: checks.append("asr:n/a"); sims.append(1.0); continue
            sim, rec = word_recall(ln["text"], hyp)
            checks.append(f"asr:{sim:.2f}/{rec:.2f}"); sims.append(sim)
        for i, (ln, sim) in enumerate(zip(b, sims)):
            if len(norm_words(ln["text"])) < 3 or sim >= 0.55: continue
            # the recogniser stumbles on rare words; both neighbours recognised well + a sane duration = the cut is right
            nb = [sims[j] for j in (i - 1, i + 1) if 0 <= j < len(b)]
            if all(v >= 0.8 for v in nb) and 0.8 <= ratios[i] <= 1.25 and not flags[i]: continue
            flags[i].append(f"asr phones {sim:.2f}")
    else:
        # Turkish: syllable nuclei in the audio vs vowels in the text (independent of the duration prior)
        for i, (ln, (a, e)) in enumerate(zip(b, spans)):
            n, t = syllable_nuclei(x, sr, a, e), syllables_text(ln["text"])
            checks.append(f"syl:{n}/{t}")
            q = n / max(t, 1)
            # the detector under-counts fast syllable runs: flag only extreme counts, or a moderate miss that the duration also doubts
            if t >= 6 and (not (0.55 <= q <= 1.5) or (not (0.68 <= q <= 1.35) and abs(math.log(ratios[i])) > 0.18)): flags[i].append(f"syllables {n}/{t}")
    print(f"batch {args.batch}{' (missing)' if args.missing else ''} ({args.lang}): {len(b)} lines, {st['M']} chunks, audio {len(x)/sr:.1f}s, thr {info['thr']:.0f} dB, pauses {st['K']} (extra {st['extra']}, merged {st['merged']}), gain {20*math.log10(g):+.1f} dB, ratio spread {spread:.2f}")
    for i, (ln, (a, e), r, gp) in enumerate(zip(b, spans, ratios, gaps + [0.0])):
        print(f"  {i:2d} {a:7.2f}-{e:7.2f} r={r:.2f} gap={gp:.2f} {checks[i]:>14} {ln['key']} {ln['text'][:60]}" + (f"   ← {'; '.join(flags[i])}" if flags[i] else ""))
    # a flagged line casts doubt on its neighbours' boundaries too
    bad = {i for i, f in enumerate(flags) if f}
    skip = set(bad) | {i - 1 for i in bad} | {i + 1 for i in bad}
    skip = {i for i in skip if 0 <= i < len(b)}
    if batch_problems and not args.force:
        print("NOT WRITTEN — batch problems: " + "; ".join(batch_problems))
        return 2
    if bad and not (args.force or args.partial):
        print(f"NOT WRITTEN — {len(bad)} flagged line(s); use --partial to keep the {len(b) - len(skip)} clean ones (flagged lines and their neighbours stay missing) or --force")
        return 2
    idx = load_index(args.lang)
    outdir = VOICE / args.lang
    outdir.mkdir(parents=True, exist_ok=True)
    written = 0
    for i, (ln, (a, e)) in enumerate(zip(b, spans)):
        if i in skip and not args.force: continue
        a0, e0 = max(0.0, a - LEAD), min(len(x) / sr, e + TAIL)
        seg = x[int(a0 * sr): int(e0 * sr)]
        f = max(1, int(0.01 * sr))                             # 10 ms edge fades
        seg = seg.copy(); seg[:f] *= np.linspace(0, 1, f); seg[-f:] *= np.linspace(1, 0, f)
        encode_clip(seg, sr, outdir / f"{ln['key']}.mp3")
        idx["clips"][ln["key"]] = {"dur": round(len(seg) / sr, 3), "text": ln["text"], "batch": args.batch, "check": checks[i]}
        written += 1
    if args.voice: idx["voice"] = args.voice
    save_index(args.lang, idx)
    print(f"wrote {written}/{len(b)} clips → {outdir}" + (f"; left for a retry round: {sorted(skip)}" if skip and not args.force else "") + (" (forced despite flags)" if bad and args.force else ""))
    return 0


def cmd_import(args):
    import numpy as np
    inv = run_node_inventory()
    want = {ln["key"]: ln for ln in inv[args.lang]["lines"]}
    idx = load_index(args.lang)
    outdir = VOICE / args.lang
    outdir.mkdir(parents=True, exist_ok=True)
    n = 0
    for f in sorted(Path(args.dir).iterdir()):
        key = f.stem
        if key not in want or f.suffix.lower() not in (".wav", ".mp3", ".flac", ".ogg", ".m4a"): continue
        x, sr = load_mono(f)
        info = analyse(x, sr)
        x = np.clip(x * level_gain(x, sr, info["thr"]), -1, 1)
        a0, e0 = max(0.0, info["onset"] - LEAD), min(len(x) / sr, info["offset"] + TAIL)
        seg = x[int(a0 * sr): int(e0 * sr)]
        encode_clip(seg, sr, outdir / f"{key}.mp3")
        idx["clips"][key] = {"dur": round(len(seg) / sr, 3), "text": want[key]["text"], "batch": -1, "check": "import"}
        n += 1
    if args.voice: idx["voice"] = args.voice
    save_index(args.lang, idx)
    print(f"imported {n} clips → {outdir}")


def cmd_plan(args):
    inv = run_node_inventory()
    for lang in ([args.lang] if args.lang else ["tr", "en"]):
        bs = batches_for(lang, inv, missing=args.missing)
        idx = load_index(lang)
        print(f"{lang}: {len(inv[lang]['lines'])} lines, {inv[lang]['chars']} chars → {len(bs)} {'retry ' if args.missing else ''}batches (≤{MAX_CHARS} chars, ≤{MAX_LINES} lines)")
        for i, b in enumerate(bs):
            done = sum(1 for ln in b if ln["key"] in idx["clips"])
            print(f"  {i:2d}: {len(b):2d} lines {len(batch_text(b)):5d} chars  {'done' if done == len(b) else f'{done}/{len(b)}'}")


def cmd_text(args):
    bs = batches_for(args.lang, missing=args.missing)
    if args.batch >= len(bs): raise SystemExit(f"no batch {args.batch}: {len(bs)} batch(es)")
    sys.stdout.write(batch_text(bs[args.batch]) + "\n")


def cmd_status(args):
    inv = run_node_inventory()
    for lang in ([args.lang] if args.lang else ["tr", "en"]):
        lines = inv[lang]["lines"]; idx = load_index(lang)
        have = [ln for ln in lines if ln["key"] in idx["clips"]]
        chars = sum(len(ln["text"]) for ln in have)
        orphans = [k for k in idx["clips"] if k not in {ln["key"] for ln in lines}]
        missing_files = [k for k in idx["clips"] if not (VOICE / lang / f"{k}.mp3").exists()]
        bs = batches_for(lang, inv)
        todo = [i for i, b in enumerate(bs) if any(ln["key"] not in idx["clips"] for ln in b)]
        dur = sum(idx["clips"][ln["key"]]["dur"] for ln in have)
        print(f"{lang}: {len(have)}/{len(lines)} lines recorded ({chars}/{inv[lang]['chars']} chars, {dur/60:.1f} min audio); batches left: {todo if todo else 'none'}"
              + (f"; orphan clips: {len(orphans)}" if orphans else "") + (f"; MISSING FILES: {missing_files}" if missing_files else ""))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("plan"); p.add_argument("--lang"); p.add_argument("--missing", action="store_true"); p.set_defaults(fn=cmd_plan)
    p = sub.add_parser("text"); p.add_argument("--lang", required=True); p.add_argument("--batch", type=int, required=True); p.add_argument("--missing", action="store_true"); p.set_defaults(fn=cmd_text)
    p = sub.add_parser("split"); p.add_argument("--lang", required=True); p.add_argument("--batch", type=int, required=True); p.add_argument("--audio", required=True)
    p.add_argument("--missing", action="store_true", help="batch numbering of `plan --missing` (retry round)")
    p.add_argument("--partial", action="store_true", help="write the clean lines even when some are flagged")
    p.add_argument("--force", action="store_true"); p.add_argument("--no-asr", action="store_true"); p.add_argument("--voice"); p.set_defaults(fn=cmd_split)
    p = sub.add_parser("import"); p.add_argument("--lang", required=True); p.add_argument("--dir", required=True); p.add_argument("--voice"); p.set_defaults(fn=cmd_import)
    p = sub.add_parser("status"); p.add_argument("--lang"); p.set_defaults(fn=cmd_status)
    args = ap.parse_args()
    rc = args.fn(args)
    sys.exit(rc or 0)


if __name__ == "__main__":
    main()
