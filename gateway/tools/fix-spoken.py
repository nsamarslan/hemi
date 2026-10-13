#!/usr/bin/env python3
"""Rewrites punctuation that is illegal in spoken (TTS) text: ; : — in lines[].text and
reminders[].text of content/templates.json and content/sessions/*.json.
Display-only fields (tips, warnings, summary...) are left untouched.
Usage: python3 tools/fix-spoken.py"""
import json
import os
import re
import sys

ROOT = os.path.join(os.path.dirname(__file__), "..")


def fix_text(s: str) -> str:
    s = s.replace(" — ", ", ").replace("—", ", ")
    # "; " -> ". " + capitalized next letter
    def semi(m):
        return ". " + m.group(1).upper()
    s = re.sub(r";\s+([a-zçğıöşü ÇĞIİÖŞÜa-z])", semi, s)
    s = s.replace(";", ".")
    # ": " -> ". " + capitalized next letter
    s = re.sub(r":\s+([a-zçğıöşü ÇĞIİÖŞÜa-z])", semi, s)
    s = s.replace(":", ",")
    return s


def fix_T(t):
    if isinstance(t, dict) and "tr" in t and "en" in t:
        t["tr"] = fix_text(t["tr"])
        t["en"] = fix_text(t["en"])
        return t
    return t


def fix_phase(ph):
    for l in ph.get("lines", []) or []:
        l["text"] = fix_T(l.get("text"))
    hold = ph.get("hold")
    if isinstance(hold, dict):
        for r in hold.get("reminders", []) or []:
            r["text"] = fix_T(r.get("text"))
    for key in ("linesByFocus",):
        if isinstance(ph.get(key), dict):
            for lines in ph[key].values():
                for l in lines or []:
                    l["text"] = fix_T(l.get("text"))
    for sub in ph.get("phases", []) or []:
        fix_phase(sub)


def process(path):
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    if isinstance(data, dict) and "sessions" in data:
        for s in data["sessions"]:
            for ph in s.get("phases", []) or []:
                fix_phase(ph)
    else:
        for ph in data.values():
            if isinstance(ph, dict):
                fix_phase(ph)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print("fixed", os.path.relpath(path, ROOT))


if __name__ == "__main__":
    process(os.path.join(ROOT, "content", "templates.json"))
    sdir = os.path.join(ROOT, "content", "sessions")
    for name in sorted(os.listdir(sdir)):
        if name.endswith(".json"):
            process(os.path.join(sdir, name))
