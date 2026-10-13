# Exercise content schema

Every exercise is one JSON file in `content/exercises/<id>.json`. All user-facing text is bilingual:
`{"tr": "...", "en": "..."}` — called a **T** below. Validate with `node tools/validate-content.mjs`.

## Writing rules (apply to every T)

- **Paraphrase.** Never copy sentences or long phrases from the book. Write the instruction in your own words.
- **Faithful.** Do not invent techniques, effects, durations or claims the book does not make. When the book
  gives a number (minutes, seconds, repetitions) use it. When the book says "a few seconds/minutes", choose a
  concrete value inside that meaning and say so in `notes`.
- **Spoken lines are read aloud by a text-to-speech voice** (Turkish: XTTS, English: Piper). So in every
  `lines[].text`, `reminders[].text`:
  - one or two short sentences, max **180 characters** per language;
  - write numbers as words ("beş dakika", "five minutes"), no digits;
  - no abbreviations (dk, sn, min, e.g.), no parentheses, no quotes, no slashes, no em-dashes, no semicolons, no
    colons, no ellipses — only `. , ? !` and normal letters;
  - Turkish: informal second person singular imperative ("Gözlerini kapat."), natural spoken Turkish, calm tone;
  - English: second person imperative, calm, plain words.
- Display-only text (`summary`, `setting`, `tips`, `warnings`, `notes`) may use digits and normal punctuation.
- Keep the Turkish and English versions equivalent in meaning.
- Use the glossary below for terms so all exercises use the same words.

## Exercise object

```jsonc
{
  "id": "ch3-meditation",            // kebab-case, must equal the file name
  "chapter": 3,
  "section": "3.7",                 // book section(s)
  "category": "seated",             // seated | night | partner | practical
  "title": T,
  "summary": T,                      // 1–3 sentences: what and why
  "setting": T,                      // posture, eyes, place, light, equipment
  "prereq": ["ch2-throat-friction"], // ids of exercises to learn first (may be [])
  "tips": [T],                       // every useful tip/trap from the book, paraphrased
  "warnings": [T],                   // cautions from the book (may be [])
  "visual": "meditation-phases",     // visual id for the detail screen (see list) or null
  "night": false,                    // true: dark screen, no end bell, quiet ending
  "partner": false,                  // true: offers "with a partner" / "with a mirror" choice
  "special": null,                   // optional app feature hook, e.g. "false-sentence" (7.11 game)
  "params": [Param],                 // user-adjustable numbers (may be [])
  "presets": [Preset],               // optional quick choices that set several params
  "phases": [Phase | Repeat],
  "notes": "for maintainers: choices you made where the book was vague, with section refs"
}
```

### Param

```jsonc
{ "key": "ph1", "label": T, "unit": "min" | "sec" | "count" | "bool", "min": 1, "max": 20, "step": 1, "def": 5 }
```
`bool` params have `"def": true|false` and no min/max/step.

### Preset

```jsonc
{ "id": "30", "label": T, "values": { "ph1": 5, "ph2": 5 } }
```
The first preset is the default; `def` values of params must match it.

### Phase

```jsonc
{
  "id": "p1",                        // unique within the exercise
  "name": T,                         // short phase title shown big on screen ("Gırtlak", "Larynx")
  "when": "vortex",                  // optional: bool param key; phase is skipped when that param is false
  "bell": "start" | "soft" | null,   // sound at the start of the phase ("start" = full bowl, "soft" = light chime)
  "visual": { "id": "meditation-phases", "state": "larynx" },   // optional, animates the session screen
  "lines": [Line],                   // spoken in order at the start of the phase
  "hold": Hold | null                // optional silent/timed part after the lines
}
```

### Line

```jsonc
{ "id": "l1", "text": T, "pause": 3, "when": "first" }
```
- `pause`: seconds of silence after the line (default 2). Use 1–3 between related sentences, 5–10 to let
  the person do something, 30+ for a "long pause" (night practice).
- `when` (optional, only inside a Repeat): `"first"`, `"notFirst"` or `"last"` iteration.
- `mode` (optional, only when the exercise has `"partner": true`): `"partner"` or `"mirror"` — the line is
  spoken only in that mode. Lines without `mode` are spoken in both.

### Hold

```jsonc
{
  "sec": 120,                        // fixed length, or
  "param": "ph1",                    // length from a param (unit min or sec)
  "reminders": [ { "id": "r1", "text": T } ],   // spoken now and then during the hold, in random order
  "every": 90,                       // optional: fixed reminder spacing in seconds (otherwise user setting)
  "essential": false,                // true: reminders play even when the user turned reminders off
  "lastMinute": true                 // optional: say "one minute left" when ≥ 3 min (default true; false for night/quiet holds)
}
```

### Repeat

```jsonc
{ "repeat": { "param": "cycles" } | { "times": 3 }, "phases": [Phase] }
```
Phase ids inside a repeat are suffixed automatically with the iteration number.

## Visual ids

| id | used for | states |
|---|---|---|
| `larynx` | throat friction areas L / M / F / N (2.1) | — |
| `tunnel` | third eye tunnel from between the eyebrows to the back of the head (3.6) | — |
| `first-opening` | lying on the back, palm 3–5 cm above the eyebrows (3.2) | `throat`, `eyebrows`, `palm`, `still` |
| `meditation-phases` | phase indicator for the third eye meditation | `larynx`, `eyebrows`, `light`, `space`, `vortex`, `above`, `return` |
| `hands-triangle` | palms up, eye and palms linked (4.2, 4.3) | `shake`, `rub`, `still`, `connect` |
| `arm-meridians` | inner arm lines (4.5–4.8) | `heart-constrictor`, `heart`, `lung` (+ suffix `-rub` to animate rubbing) |
| `leg-meridians` | leg lines (6.2, 6.6, 6.12) | `gallbladder`, `bladder`, `stomach` (+ `-rub`) |
| `palming` | palms over closed eyes (5.5) | — |
| `eye-contact` | two people (or person + mirror) about 90 cm apart (5.2) | `partner`, `mirror` |
| `will-centre` | point 1 inch below the navel, hands as reflectors (18.6) | `massage`, `hands`, `eye-belly` |
| `aura` | aura open / sealed (18.3, 20.10, 20.11) | `open`, `seal` |
| `stambhasana` | posture of the pillar (20.15) | — |
| `night-body` | lying body map for night practice (14) | `rest`, `exhale`, `parts`, `organs`, `breath-belly`, `breath-chest`, `breath-nose`, `breath-perineum`, `senses`, `day`, `images`, `limbs`, `return` |

## Glossary (use these terms)

| English | Türkçe |
|---|---|
| third eye | üçüncü göz |
| (the area) between the eyebrows | kaşların arası |
| throat friction | gırtlak sürtünmesi |
| larynx | gırtlak |
| vibration | titreşim |
| tingling | karıncalanma |
| light, colours | ışık, renkler |
| purple space | mor boşluk |
| vortex | girdap |
| non-technique (just aware above the head) | teknik bırakma |
| humming / buzzing | mırıltı / vızıltı |
| connected shaking / rubbing | bağlantılı silkeleme / bağlantılı ovma |
| channel release | kanal açma |
| meridian | meridyen |
| Heart Constrictor (pericardium) meridian | Kalp Zarı meridyeni |
| Heart / Lung meridian | Kalp / Akciğer meridyeni |
| Gallbladder / Urinary Bladder / Stomach meridian | Safra Kesesi / Mesane / Mide meridyeni |
| bridge of the palm | avuç köprüsü |
| etheric (body) | eterik (beden) |
| running water | akan su |
| eye contact | göz teması |
| seeingness | görme hali |
| palming | avuçlama |
| reconnection | yeniden bağlanma |
| aura, open / seal the aura | aura, aurayı açmak / aurayı mühürlemek |
| will centre | irade merkezi |
| gate of stone (1 inch below the navel) | taş kapı |
| eye-belly awareness | göz ve karın farkındalığı |
| exhaling mode | nefes verme modu |
| posture of the pillar (stambhasana) | sütun duruşu |
| night practice | gece pratiği |
| super-nap | kısa toparlanma (süper şekerleme) |
| astral body | astral beden |
| clicking the fingers | parmak şıklatmak |
