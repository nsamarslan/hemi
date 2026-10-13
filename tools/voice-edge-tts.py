#!/usr/bin/env python3
"""Generate per-line voice clips on your own PC with Microsoft Edge's free neural voices (edge-tts),
then import them with tools/voice-pack.py.

    pip install edge-tts
    python tools/voice-edge-tts.py --lang tr --voice tr-TR-EmelNeural --out /tmp/voice-tr
    python tools/voice-pack.py import --lang tr --dir /tmp/voice-tr --voice "tr-TR-EmelNeural (edge-tts)"
    node tools/build.mjs

Voices: `edge-tts --list-voices | grep -i "tr-TR\\|en-GB\\|en-US"` (e.g. tr-TR-EmelNeural, tr-TR-AhmetNeural,
en-GB-SoniaNeural, en-US-JennyNeural). --rate "-10%" slows the delivery a little, which suits guided sessions.
Only missing lines are generated unless --all is given. One request per line; a few hundred lines take some minutes.
This script needs internet access to Microsoft's endpoint; it was written for use outside the sandboxed build
environment and is not exercised by the test suite.
"""
import argparse, asyncio, json, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def inventory():
    out = subprocess.check_output(["node", str(ROOT / "tools" / "voice-lines.mjs")], cwd=ROOT)
    return json.loads(out)


def have(lang):
    p = ROOT / "content" / "voice" / lang / "index.json"
    return set(json.loads(p.read_text(encoding="utf-8"))["clips"]) if p.exists() else set()


async def synth(lines, voice, rate, out, parallel):
    import edge_tts
    sem = asyncio.Semaphore(parallel)
    done = 0

    async def one(ln):
        nonlocal done
        async with sem:
            target = out / f"{ln['key']}.mp3"
            if target.exists(): return
            for attempt in range(3):
                try:
                    await edge_tts.Communicate(ln["text"], voice, rate=rate).save(str(target))
                    break
                except Exception as e:  # transient network errors: retry
                    if attempt == 2: print(f"failed {ln['key']}: {e}", file=sys.stderr)
                    await asyncio.sleep(2 * (attempt + 1))
            done += 1
            if done % 25 == 0: print(f"{done}/{len(lines)}")

    await asyncio.gather(*(one(ln) for ln in lines))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--lang", required=True, choices=["tr", "en"])
    ap.add_argument("--voice", required=True, help="edge-tts voice name, e.g. tr-TR-EmelNeural")
    ap.add_argument("--out", required=True, help="output directory for <key>.mp3 files")
    ap.add_argument("--rate", default="-8%", help="speaking rate adjustment (default -8%%)")
    ap.add_argument("--parallel", type=int, default=3)
    ap.add_argument("--all", action="store_true", help="also regenerate lines that already have a clip")
    a = ap.parse_args()
    try:
        import edge_tts  # noqa: F401
    except ImportError:
        raise SystemExit("pip install edge-tts")
    lines = inventory()[a.lang]["lines"]
    if not a.all:
        got = have(a.lang)
        lines = [ln for ln in lines if ln["key"] not in got]
    out = Path(a.out); out.mkdir(parents=True, exist_ok=True)
    print(f"{len(lines)} lines → {out}")
    asyncio.run(synth(lines, a.voice, a.rate, out, a.parallel))
    print("done; now: python tools/voice-pack.py import --lang", a.lang, "--dir", a.out)


if __name__ == "__main__":
    main()
