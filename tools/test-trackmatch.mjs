// Unit tests for the PC-track matcher (src/js/trackmatch.js).
// Usage: node tools/test-trackmatch.mjs
import { readFileSync } from "node:fs";
import { tokens, scoreHint, scoreFile, findTrack, findAlbum } from "../src/js/trackmatch.js";

let pass = 0, fail = 0;
const ok = (cond, name) => { cond ? pass++ : fail++; console.log(`${cond ? "PASS" : "FAIL"} ${name}`); };
const eq = (a, b, name) => ok(JSON.stringify(a) === JSON.stringify(b), `${name} (got ${JSON.stringify(a)})`);

// ---------- tokenisation ----------
eq(tokens("Möbius West"), ["mobius", "west"], "diacritics stripped");
eq(tokens("02 Introduction to Focus 10"), ["2", "introduction", "focus", "10"], "leading zeros stripped, stopwords dropped");
eq(tokens("Condition A"), ["condition", "a"], "single letter kept (Condition A ≠ Condition B)");
eq(tokens("De-Tox: Body"), ["de", "tox", "body"], "punctuation becomes spaces");
eq(tokens("The Absolute"), ["absolute"], "stopword dropped");

// ---------- matching ----------
const wave1 = [
  "Wave I Discovery/01 Orientation.flac",
  "Wave I Discovery/02 Introduction to Focus 10.flac",
  "Wave I Discovery/06 Focus 10 Free Flow.flac",
];
eq(findTrack(["Orientation", "Discovery 1"], wave1), "Wave I Discovery/01 Orientation.flac", "Orientation matches its own file");
eq(findTrack(["Introduction to Focus 10", "Intro to Focus 10", "Discovery 2"], wave1), "Wave I Discovery/02 Introduction to Focus 10.flac", "Intro to Focus 10 matches");
eq(findTrack(["Free Flow 10", "Focus 10 Free Flow"], wave1), "Wave I Discovery/06 Focus 10 Free Flow.flac", "word-order-insensitive match");

// exact basename beats loose matches (Sleep vs Sleep Easy / Restorative Sleep)
eq(findTrack(["Sleep"], ["Human Plus/Sleep Easy.flac", "Human Plus/Sleep.flac", "Human Plus/Restorative Sleep.flac"]),
  "Human Plus/Sleep.flac", "exact basename wins over longer names");
eq(findTrack(["Sleep Easy"], ["Human Plus/Sleep.flac", "Human Plus/Sleep Easy.flac"]),
  "Human Plus/Sleep Easy.flac", "Sleep Easy matches its own file");

// roman numerals and letters stay distinct
eq(findTrack(["Condition A"], ["JOB/Condition A.flac", "JOB/Condition B.flac"]), "JOB/Condition A.flac", "Condition A ≠ Condition B");
eq(findTrack(["NVC I"], ["Adventure/NVC I.flac", "Adventure/NVC II.flac"]), "Adventure/NVC I.flac", "NVC I ≠ NVC II");
eq(findTrack(["Mission 10"], ["Exploring/01 Mission 10.flac", "Exploring/02 Mission 12.flac"]),
  "Exploring/01 Mission 10.flac", "Mission 10 ≠ Mission 12");

// prefixes and punctuation
eq(findTrack(["Moebius West", "Möbius West"], ["Human Plus/Möbius West.flac"]), "Human Plus/Möbius West.flac", "diacritic file name matches");
eq(findTrack(["Eat-No Eat", "Eat/No Eat"], ["H-PLUS Eat-No Eat.flac"]), "H-PLUS Eat-No Eat.flac", "H-PLUS prefix stripped, punctuation normalised");
eq(findTrack(["Attention"], ["Human Plus/881003 Attention.flac"]), "Human Plus/881003 Attention.flac", "catalog-number prefix tolerated");

// number mismatches must not match
eq(findTrack(["Mission 10"], ["Exploring/02 Mission 12.flac"]), null, "Mission 10 does not match Mission 12 alone");
eq(findTrack(["Free Flow 27"], ["Odyssey/06 Free Flow Journey in Focus 21.flac"]), null, "Focus 21 track does not match Focus 27 hint");
eq(findTrack(["Intro to Focus 23"], ["Voyager/02 Intro to Focus 23.flac", "Voyager/04 Intro to Focus 27.flac"]),
  "Voyager/02 Intro to Focus 23.flac", "Focus 23 ≠ Focus 27");

// scoring internals
ok(scoreFile(["Attention"], "Human Plus/Attention.flac") >= 500, "exact basename gets the exact bonus");
ok(scoreHint("Sensing Locale 1", tokens("Sensing Locale One")) < 69, "digit/word mismatch stays below the accept threshold");
eq(findTrack(["Sensing Locale 1", "Sensing Locale One"], ["Odyssey/01 Sensing Locale One.flac"]), "Odyssey/01 Sensing Locale One.flac", "word-hint file matched (track number satisfies the digit token)");
eq(findTrack(["Sensing Locale 1"], ["Odyssey/02 Expansion in Locale One.flac"]), null, "unrelated track does not match (locale only)");
eq(findTrack(["Sensing Locale 1", "Sensing Locale One"], ["Odyssey/01 Sensing Locale 1.flac", "Odyssey/02 Expansion in Locale 1.flac"]),
  "Odyssey/01 Sensing Locale 1.flac", "Sensing Locale 1 matches");
eq(findTrack(["The Absolute", "Absolute"], ["Union/08 The Absolute.flac"]), "Union/08 The Absolute.flac", "The Absolute matches");
eq(findTrack(["Advanced Focus 12"], ["Exploring/01 Advanced Focus 12.flac", "Exploring/01 Mission 10.flac"]),
  "Exploring/01 Advanced Focus 12.flac", "old/new Exploring disambiguated by exercise name");

// ---------- reference catalogue: album / folder matching ----------
const lib = [
  "Metamusic/Higher (J.S. Epperson)/02 Higher Part 2.flac",
  "Metamusic/Higher (J.S. Epperson)/01 Higher Part 1.flac",
  "Metamusic/Higher (J.S. Epperson)/10 Higher Part 10.flac",
  "Mind Food/Super Sleep.flac",
  "Mind Food/Catnapper Deluxe Edition.flac",
  "Going Home/Subject/01 Introduction.flac",
  "Going Home/Support/01 Introduction.flac",
  "Wave I Discovery/02 Introduction to Focus 10.flac",
  "Hemi-Sync Surf.flac",
];
eq(findAlbum(["Higher"], lib), [
  "Metamusic/Higher (J.S. Epperson)/01 Higher Part 1.flac",
  "Metamusic/Higher (J.S. Epperson)/02 Higher Part 2.flac",
  "Metamusic/Higher (J.S. Epperson)/10 Higher Part 10.flac",
], "album folder matched by name, files in natural order (2 before 10)");
eq(findAlbum(["Going Home"], lib), ["Going Home/Subject/01 Introduction.flac", "Going Home/Support/01 Introduction.flac"], "series folder returns files from all sub-folders");
eq(findAlbum(["Super Sleep"], lib), ["Mind Food/Super Sleep.flac"], "single exercise falls back to basename match");
eq(findAlbum(["Catnapper", "Cat Napper"], lib), ["Mind Food/Catnapper Deluxe Edition.flac"], "loose basename match tolerates extra words");
eq(findAlbum(["Surf"], lib), ["Hemi-Sync Surf.flac"], "Hemi-Sync prefix stripped on basename match");
eq(findAlbum(["Moment of Revelation"], lib), [], "no match → empty list");
eq(findAlbum(["Focus"], []), [], "empty library → empty list");

// a session whose own recording is missing must not pick another exercise's file (real tracks.json hints)
{
  const T = JSON.parse(readFileSync(new URL("../content/tracks.json", import.meta.url), "utf8"));
  const H = id => T.tracks?.[id] || T[id];
  eq(findTrack(H("w8-freeflow27"), ["Odyssey/06 Free Flow Journey in Focus 21.flac"]), null, "Free Flow 27 does not take the Focus 21 file");
  eq(findTrack(H("w5x-intro15"), ["5th Dimension/04 Exploring Our Future.flac"]), null, "a track number does not stand in for a number in the title");
  eq(findTrack(H("hp-sleep"), ["Wave I Discovery/05 Exploration Sleep.flac"]), null, "one-word Human Plus title does not match a longer title");
  eq(findTrack(H("hp-sleep"), ["Human Plus/05 Exploration Sleep.flac", "Human Plus/H-PLUS Sleep.flac"]), "Human Plus/H-PLUS Sleep.flac", "one-word title still matches its own file");
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
