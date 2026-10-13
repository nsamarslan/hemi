# Session content schema

Every session lives in a file under `content/sessions/` (e.g. `wave-1.json`, `human-plus-a.json`)
inside a `{"wave": "...", "sessions": [...]}` wrapper. Files may be split freely; the canonical
order is series → wave → `no` (not file name). Sessions are written **compact**: they reference
shared phase templates from `content/templates.json` and get expanded by `tools/expand.mjs` at
build/validate time. All user-facing text is bilingual: `{"tr": "...", "en": "..."}` — called a
**T** below. Validate with `node tools/validate-content.mjs`.

## Techniques catalog (Techniques tab)

`content/techniques-a.json` and `content/techniques-b.json` each hold a `{"techniques": [...]}`
array (merged and sorted by `no` at expand time). A technique:

```jsonc
{
  "id": "rebal",                       // kebab-case, unique
  "no": 5,                             // position in the catalog
  "category": "protection",            // prep | protection | tools | breathing | mental | communication | exploration | theory
  "title": T, "short": T,              // card title + one-line summary
  "state": "focus10",                  // visual state used for the preview (prep | focusN | explore | return)
  "sections": [
    { "h": T, "p": [T, ...] },         // heading + paragraphs
    { "h": T, "steps": [T, ...] }      // heading + numbered steps
  ],
  "tips": [T], "warnings": [T],
  "notes": "for maintainers: source of the technique"
}
```

## Guide topics (Guide tab)

`content/guide/tr/<topic>.md` and `content/guide/en/<topic>.md` — the same topic id in both
languages. Each file starts with a `# Title` heading followed by markdown (headings, lists,
paragraphs, bold/italic, code, blockquotes, hr, links — no tables). The build copies them to
`www/guide/<lang>/` and generates `www/guide/index.json` (title + summary per topic, per
language). The app shows the topic list in the current language and renders the selected topic
with `src/js/md.js`. Keep every topic self-contained and detailed; the validator checks title,
length and tr/en parity.

Pipe tables (`| a | b |` with a `|---|` row) and task lists (`- [ ]`, `- [x]`) also render. A line
containing only `[[storyboard:<technique-id>]]` embeds that technique's animated storyboard
(`src/js/storyboard.js`; ids = technique ids such as `rebal`, `ecb`, `ebt`). Put it right under the
chapter heading it illustrates, in both languages; unknown ids are dropped silently.

## Track hints (PC audio source)

`content/tracks.json` maps each session id to an array of official track-name aliases, e.g.
`{"w1-intro-10": ["Introduction to Focus 10", "Intro to Focus 10", "Discovery 2"]}`. In PC
audio-source mode the app matches these against the file list served by `tools/pc-server.py`
(matcher: `src/js/trackmatch.js`) to decide which recording to play. Keep at least one
distinctive exercise name per session; add aliases freely.

## Reference catalogue (titles without a session)

`content/reference.json` lists Hemi-Sync titles the app deliberately has **no session for** (Mind
Food, Metamusic, album series) so the user can browse them and, in PC audio-source mode, play the
copies they own. Shape: `categories` (`{id, title{tr,en}, intro{tr,en}}`), `tags` (id → `{tr,en}`),
`items` (`{id: "ref-…", cat, title, creator?, tags[], hints[], related?[], code?, desc{tr,en}}`),
`collections` (`{id, title{tr,en}, intro{tr,en}, items[ref ids], sessions[session ids]}` — curated
groups such as healing / sleep / children / focus, each with the closest in-app sessions) and
`relatedByTag` (tag id → session ids, the fallback "in the app" links for items without `related`;
at most 3 are shown). `code` is the publisher's catalogue number with the download suffix dropped
(e.g. `MA023`); it is searchable and shown in small print.
`hints` are folder/file-name aliases matched against the PC library (`findAlbum` in
`src/js/trackmatch.js`: a matching folder lists all of its files in order, otherwise single files
matching the title). `related` holds session ids shown as "in the app" links. The validator rejects
an item whose title equals a `tracks.json` hint — such a recording already belongs to a session.
`desc` is display-only text (digits and punctuation allowed) and must stay original wording.

## Series and waves

`content/series.json` defines the catalog's series (thematic groups of waves), each with `id`,
`no`, `title` and `intro`. Every wave in `content/waves.json` carries a `series` field (a series
id) and its position `no` within that series. The expander sorts waves by (series `no`, wave `no`);
sessions follow their wave and `no`. This order is the app's catalog and learning path.

## Writing rules (apply to every T)

- **Original words.** This app is not affiliated with the Monroe Institute. Paraphrase the concepts
  (Focus levels, the preparatory process, the energy bar tool, REBAL, patterning, free flow) in your own
  words. Never copy narration or long phrases from Monroe materials.
- **Faithful.** Do not invent techniques, effects or claims. When a public source gives a number
  (session length, repetitions) use it; when it is vague, choose a concrete value and say so in `notes`.
- **Spoken lines are read aloud by a text-to-speech voice** (the phone's own voice). So in every
  `lines[].text`, `reminders[].text`:
  - one or two short sentences, max **180 characters** per language;
  - write numbers as words ("on iki", "twenty-one"), no digits;
  - no abbreviations (dk, sn, min, hz, e.g.), no parentheses, no quotes, no slashes, no em-dashes, no
    semicolons, no colons, no ellipses — only `. , ? !` and normal letters;
  - Turkish: informal second person singular imperative ("Gözlerini kapat."), natural spoken Turkish, calm tone;
  - English: second person imperative, calm, plain words.
- Display-only text (`summary`, `goal`, `setting`, `tips`, `warnings`, `notes`) may use digits and normal punctuation.
- Keep the Turkish and English versions equivalent in meaning.

## Session object

```jsonc
{
  "id": "w2-intro-12",              // kebab-case, unique, must start with the wave prefix
  "wave": "wave-2",                  // id of the wave in content/waves.json
  "no": 1,                           // position inside the wave (1-based)
  "focus": ["12"],                   // focus levels used (see content/focus.json)
  "title": T,
  "command": T,                      // optional: H-Plus function command cue (display only, may contain digits)
  "summary": T,                      // 1–3 sentences: what and why
  "goal": T,                         // what this session trains
  "setting": T,                      // posture, headphones, place, equipment
  "prereq": ["w1-freeflow"],         // ids of sessions to complete first (may be [])
  "tips": [T],                       // useful tips and traps (may be [])
  "warnings": [T],                   // cautions (may be [])
  "night": false,                    // true: dark screen, no end bell; do NOT add a "return" phase — the timeline appends a
                                     //   "fade" phase (bed fades out over the sleepFade setting) and an optional wake bell
  "phases": [Phase | {"use": template, ...overrides}],
  "notes": "for maintainers: which official exercise this paraphrases, and what was adapted"
}
```

If `params`/`presets` are omitted, the shared defaults from `content/defaults.json` are injected
(params `entry` and `explore` in minutes, presets standard/short/long).

## Phase

A phase is either written out or pulled from a template:

```jsonc
{ "use": "entry", "focus": 12 }     // deep-merged over templates.entry; lines picked by focus
```

```jsonc
{
  "id": "expand",                    // unique within the session
  "name": T,                         // short phase title shown on screen
  "bell": "start" | "soft" | null,   // sound at the start of the phase
  "focus": 12,                       // focus level of this phase (drives the binaural bed + UI)
  "bed": {                           // optional binaural bed override for this phase
    "beat": 4.5,                     // Hz — number, or "focus" to use the phase's focus level
    "carrier": 170,                  // Hz in the left ear (right ear = carrier + beat)
    "gain": 0.14,                    // bed loudness (scaled by the user's bed volume setting)
    "glide": 480,                    // seconds to glide from the previous beat, or "phase" = whole phase
    "fade": 8                        // crossfade seconds into the next segment
  },
  "visual": { "id": "gateway", "state": "focus12" },   // optional session-screen visual state
  "lines": [Line],                   // spoken in order at the start of the phase
  "hold": Hold | null                // optional silent/timed part after the lines
}
```

The bed is continuous across the session: one segment per phase, crossfaded, with the beat gliding
from the previous segment's frequency to this one (focus transitions are slow glides).

### Line

```jsonc
{ "id": "l1", "text": T, "pause": 3 }
```
- `pause`: seconds of silence after the line (default 2). 1–3 between related sentences, 5–10 to let
  the person do something, 30+ for a long pause.

### Hold

```jsonc
{
  "sec": 120,                        // fixed length, or
  "param": "explore",                // length from a param (unit min or sec)
  "reminders": [ { "id": "r1", "text": T } ],   // spoken now and then during the hold, in random order
  "lastMinute": true                 // optional: say "one minute left" when ≥ 3 min (default true; false for night holds)
},
"breath": {                          // optional, next to a hold: paced breathing during the hold (screen ring + audio cue,
  "in": 4, "hold": 0, "out": 6,      //   both derived from the same timeline). Seconds per stage; hold/rest default 0.
  "rest": 0,
  "tone": "hum"                      //   "hum" = soft tone during every exhale (resonant tuning), "tick" = soft beep at
                                     //   each stage change (box breathing), omitted = visual only
}
```

## Recorded voice (content/voice/)

Spoken texts are never stored with audio references: `tools/expand.mjs` attaches
`audio: { tr: key, en: key }` to every phase line / hold reminder (and `.audio` to `common.lines.*`)
at expand time, where `key = voiceKey(text) = sha1(NFC(text)).hex[:12]`. Editing a text changes its
key, so a recording can never play for a text it does not match.

- `content/voice/<lang>/<key>.mp3` — one clip per line (mono 22.05 kHz, 48 kbps, no Xing/ID3).
- `content/voice/<lang>/index.json` — `{ voice: "…", clips: { key: { dur, text, batch, check } } }`;
  `text` is the exact spoken text (the build drops clips whose text no longer matches), `check` is
  the verification result (`syl:n/t`, `asr:phones/words`, `dur`, `import`).
- `content/voice/raw/` — scratch for TTS batch audio, git-ignored.

`tools/build.mjs` concatenates the clips into `www/voice/<lang>/<pack>.mp3` (`common` = app-wide lines
and lines shared by ≥ 2 sessions; otherwise one pack per session id) and writes
`APP_CONTENT.audio[lang] = { voice, lines, recorded, packs: { pack: { file, clips: { key: [byteOffset, byteLength, seconds] } } } }`.
Lines without a clip are read by the device's text-to-speech. Tooling: `tools/voice-pack.py`
(plan / text / split / import / status), `tools/voice-edge-tts.py`, `tools/test-voice.mjs`.

## Templates (content/templates.json)

- `prep` — the preparatory process: settling, headphones, the energy conversion box, the affirmation, resonant tuning.
- `entry` — entering a focus level; carries `linesByFocus` per level ("10", "11", "12", "15", "21", "23", "25", "27").
  Use as `{ "use": "entry", "focus": 12 }` — the expander picks the lines for that level.
  If a session enters two levels in a row, give the second entry a unique `id` and `name` override.
- `encode` — Human Plus function encoding at the Access Channel (Focus 11): override `lines`
  (the function command) and `hold.reminders` per function.
  Use as `{ "use": "encode", "lines": [...], "hold": { "reminders": [...] } }`.
- `explore` — a generic free-flow hold with standard reminders. Use as `{ "use": "explore", "focus": 10 }`.
- `return` — the return sequence (back to ten, to waking, energy into the body).

Template overrides deep-merge: objects merge, arrays and scalars replace.

## Binaural beat values (content/common.json)

`focusBeats` maps each focus level to a binaural beat frequency (Hz) and `focusCarrier` to the left-ear
carrier. Focus 11 (the Access Channel, used by Human Plus) sits between 10 and 12 at 6 Hz. These are **approximations** based on public descriptions of the focus levels (alpha/theta border
for Focus 10, theta for 12, theta/delta for 15, deep delta for 21, sub-delta beyond) — the exact Hemi-Sync
frequency blends are proprietary. Keep `focus.json` and `common.json` consistent (the validator checks).
