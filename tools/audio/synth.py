"""Generate the spoken audio clips for every line in build/lines.json.

Turkish: XTTS-v2 (speaker "Ana Florence"). English: Piper (en_US-lessac-high).
Every clip is transcribed back with Whisper and compared with the text; clips that do not
match (missing words, extra words at the end, wrong length) are regenerated, keeping the best try.
Output: audio/<lang>/<key>.mp3 and audio/report.json. Already existing mp3 files are skipped,
so the script can be stopped and resumed.

Usage (from the XTTS virtualenv):
  python -I tools/audio/synth.py --repo /home/user/Eye --tts-dir <dir with venv/, voices/> [--lang tr|en] [--limit N]
"""
import argparse, difflib, json, os, re, subprocess, sys, tempfile, time, unicodedata

import numpy as np

SR_OUT = 24000
ap = argparse.ArgumentParser()
ap.add_argument("--repo", required=True)
ap.add_argument("--tts-dir", required=True)
ap.add_argument("--lang", choices=["tr", "en"], default=None)
ap.add_argument("--limit", type=int, default=0)
ap.add_argument("--tries", type=int, default=6)
ap.add_argument("--shard", default="0/1", help="i/n: process every n-th clip starting at i")
ap.add_argument("--threads", type=int, default=4)
ap.add_argument("--recheck", action="store_true", help="re-verify existing mp3 files and delete those that fail")
args = ap.parse_args()
import torch
torch.set_num_threads(args.threads)

lines = json.load(open(os.path.join(args.repo, "build", "lines.json"), encoding="utf-8"))
if args.lang:
    lines = [l for l in lines if l["lang"] == args.lang]
# each shard writes its own report file (merged by tools/build.mjs) so parallel runs don't overwrite each other
report_path = os.path.join(args.repo, "audio", "report.json" if args.shard == "0/1" else f"report-{args.shard.replace('/', 'of')}.json")
report = json.load(open(report_path, encoding="utf-8")) if os.path.exists(report_path) else {}
si, sn = map(int, args.shard.split("/"))
lines = [l for i, l in enumerate(sorted(lines, key=lambda l: (l["lang"], l["key"]))) if i % sn == si]  # both languages split evenly
mp3 = lambda l: os.path.join(args.repo, "audio", l["lang"], l["key"] + ".mp3")
todo = [l for l in lines if not os.path.exists(mp3(l))]
if args.recheck:
    todo = [l for l in lines if os.path.exists(mp3(l))]
if args.limit:
    todo = todo[: args.limit]
print(f"{len(todo)} clips to generate", flush=True)
if not todo:
    sys.exit(0)

# ---------- models ----------
from faster_whisper import WhisperModel
whisper = WhisperModel("small", device="cpu", compute_type="int8", cpu_threads=args.threads)
xtts = None

def tts_tr(text):
    global xtts
    if xtts is None:
        os.environ["COQUI_TOS_AGREED"] = "1"
        from TTS.api import TTS
        xtts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to("cpu")
    wav = xtts.tts(text=text, speaker="Ana Florence", language="tr", split_sentences=False)
    return np.asarray(wav, dtype=np.float32), 24000

def tts_en(text):
    with tempfile.TemporaryDirectory() as d:
        out = os.path.join(d, "o.wav")
        subprocess.run([os.path.join(args.tts_dir, "venv", "bin", "piper"), "-m",
                        os.path.join(args.tts_dir, "voices", "en_US-lessac-high.onnx"),
                        "--length-scale", "1.15", "--sentence-silence", "0.6", "-f", out],
                       input=text.encode(), check=True, capture_output=True)
        return load_audio(out, None)

def load_audio(path, sr):
    cmd = ["ffmpeg", "-v", "error", "-i", path, "-f", "f32le", "-ac", "1"] + (["-ar", str(sr)] if sr else []) + ["-"]
    raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    if sr is None:
        info = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=sample_rate", "-of", "csv=p=0", path],
                              capture_output=True, text=True, check=True).stdout.strip()
        sr = int(info)
    return np.frombuffer(raw, np.float32).copy(), sr

def resample(x, sr, to):
    if sr == to:
        return x
    n = int(round(len(x) * to / sr))
    return np.interp(np.linspace(0, len(x) - 1, n), np.arange(len(x)), x).astype(np.float32)

def trim(x, sr):
    """Cut leading/trailing near-silence, keep ~80 ms margins."""
    win = int(sr * 0.02)
    if len(x) < win * 3:
        return x
    frames = np.sqrt(np.convolve(x ** 2, np.ones(win) / win, mode="same"))
    thr = max(frames.max() * 0.03, 1e-4)
    idx = np.where(frames > thr)[0]
    if not len(idx):
        return x
    a = max(0, idx[0] - int(sr * 0.08)); b = min(len(x), idx[-1] + int(sr * 0.12))
    y = x[a:b].copy()
    fade = min(int(sr * 0.02), len(y) // 4)
    y[:fade] *= np.linspace(0, 1, fade); y[-fade:] *= np.linspace(1, 0, fade)
    return y

def normalize(x):
    """RMS to -20 dBFS over voiced frames, peak limited to -1 dBFS."""
    voiced = x[np.abs(x) > np.abs(x).max() * 0.05] if np.abs(x).max() > 0 else x
    rms = np.sqrt(np.mean(voiced ** 2)) if len(voiced) else 1e-3
    y = x * (10 ** (-20 / 20) / max(rms, 1e-6))
    peak = np.abs(y).max()
    if peak > 10 ** (-1 / 20):
        y *= 10 ** (-1 / 20) / peak
    return y.astype(np.float32)

ONES = {"tr": "sıfır bir iki üç dört beş altı yedi sekiz dokuz".split(),
        "en": "zero one two three four five six seven eight nine".split()}
TENS = {"tr": ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"],
        "en": ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]}
TEENS_EN = "ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split()

def num_words(n, lang):
    if n < 10:
        return ONES[lang][n]
    if n < 100:
        t, o = divmod(n, 10)
        if lang == "en" and t == 1:
            return TEENS_EN[o]
        return TENS[lang][t] + ("" if o == 0 else (" " if lang == "tr" else "-") + ONES[lang][o])
    return str(n)

def norm_text(s, lang):
    s = re.sub(r"\d+", lambda m: " " + num_words(int(m.group()), lang) + " ", s)
    if lang == "tr":
        s = s.replace("I", "ı").replace("İ", "i")
    s = unicodedata.normalize("NFKC", s).lower()
    s = re.sub(r"[^\w\s]", " ", s)
    return re.sub(r"\s+", " ", s).strip()

def score(text, heard, lang, dur):
    a, b = norm_text(text, lang), norm_text(heard, lang)
    ratio = difflib.SequenceMatcher(None, a, b).ratio()
    ta, tb = a.split(), b.split()
    problems = []
    for op, i1, i2, j1, j2 in difflib.SequenceMatcher(None, ta, tb).get_opcodes():
        if op == "replace":
            for wa, wb in zip(ta[i1:i2], tb[j1:j2]):
                k = max(3, len(wa) - 1)
                if len(wb) >= len(wa) + 2 and wb[:k] == wa[:k]:
                    problems.append(f"'{wa}' heard as '{wb}'")
                elif difflib.SequenceMatcher(None, wa, wb).ratio() < 0.5:
                    problems.append(f"'{wa}' heard as '{wb}'")
    if len(tb) > len(ta):
        problems.append(f"{len(tb) - len(ta)} extra word(s)")
    if ta and tb and difflib.SequenceMatcher(None, ta[-1], tb[-1]).ratio() < 0.75:
        problems.append(f"ends with '{tb[-1]}' not '{ta[-1]}'")
    cps = len(a) / max(dur, 0.1)
    if cps < 6:
        problems.append(f"too slow/long ({cps:.1f} chars/s)")
    if cps > 24:
        problems.append(f"too fast/short ({cps:.1f} chars/s)")
    s = ratio - 0.08 * len(problems)
    ok = ratio >= 0.9 and not problems
    return s, ok, problems, ratio

def transcribe(x, sr, lang):
    y = resample(x, sr, 16000)
    segs, _ = whisper.transcribe(y, language=lang, beam_size=5, condition_on_previous_text=False)
    return " ".join(s.text.strip() for s in segs)

def save_mp3(x, sr, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    pcm = (np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes()
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "s16le", "-ar", str(sr), "-ac", "1", "-i", "-",
                    "-ar", str(SR_OUT), "-ac", "1", "-b:a", "48k", path], input=pcm, check=True)

t0 = time.time()
if args.recheck:
    removed = 0
    for item in todo:
        x, sr = load_audio(mp3(item), 24000)
        heard = transcribe(x, sr, item["lang"])
        s_, ok, problems, ratio = score(item["text"], heard, item["lang"], len(x) / sr)
        if not ok:
            os.remove(mp3(item)); removed += 1
            print(f"recheck FAIL {item['lang']} {item['text']} => {heard} {problems}", flush=True)
    print(f"recheck: removed {removed} of {len(todo)}", flush=True)
    sys.exit(0)
for n, item in enumerate(todo, 1):
    lang, key, text = item["lang"], item["key"], item["text"]
    best = None
    tries = args.tries if lang == "tr" else 2
    for attempt in range(1, tries + 1):
        x, sr = tts_tr(text) if lang == "tr" else tts_en(text)
        x = normalize(trim(x, sr))
        dur = len(x) / sr
        heard = transcribe(x, sr, lang)
        s, ok, problems, ratio = score(text, heard, lang, dur)
        if best is None or s > best[0]:
            best = (s, ok, problems, ratio, x, sr, heard, attempt, dur)
        if ok:
            break
    s, ok, problems, ratio, x, sr, heard, attempt, dur = best
    save_mp3(x, sr, os.path.join(args.repo, "audio", lang, key + ".mp3"))
    report[key] = {"lang": lang, "text": text, "heard": heard, "ratio": round(ratio, 3), "ok": ok,
                   "problems": problems, "tries": attempt, "dur": round(dur, 2)}
    if n % 10 == 0 or not ok:
        json.dump(report, open(report_path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    el = time.time() - t0
    print(f"[{n}/{len(todo)}] {lang} {key} ok={ok} r={ratio:.2f} try={attempt} {dur:.1f}s "
          f"eta={el / n * (len(todo) - n) / 60:.0f}min {'' if ok else problems} | {text[:60]}", flush=True)
json.dump(report, open(report_path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
bad = [k for k, v in report.items() if not v["ok"]]
print(f"done in {(time.time() - t0) / 60:.1f} min; {len(bad)} clip(s) need review", flush=True)
