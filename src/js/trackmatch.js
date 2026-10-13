// Fuzzy matching between a session's official track names (content/tracks.json) and the file
// paths served by the PC audio server (tools/pc-server.py). Pure functions — unit-tested in
// Node by tools/test-trackmatch.mjs.
//
// Matching is token-based over the file's BASENAME (folder names are ignored, so series folders
// like "Human Plus/" don't skew the score). Exact basename matches dominate; loose matches need
// high recall and are penalised for extra tokens, so "Sleep" picks "Sleep.flac" over
// "Sleep Easy.flac" but still matches "H-PLUS Sleep.flac" via prefix stripping.

const STOP = new Set(["the", "an", "to", "of", "in", "and", "or", "for", "with", "on", "at", "from", "by", "is", "it", "as"]);
// NOTE: "a" and roman numerals ("i", "ii") are deliberately NOT stopwords — "Condition A" must
// stay distinct from "Condition B" and "NVC I" from "NVC II".
const PREFIXES = [
  "hemi sync", "hemi-sync", "hemi", "h plus", "h-plus", "human plus", "the human plus",
  "monroe institute", "the monroe institute", "monroe", "gateway experience",
  "the gateway experience", "gateway", "tmi", "wave",
];
const EXACT_BONUS = 500;
const ACCEPT = 69; // best score must exceed this

/** Normalise to comparable tokens: lowercase, strip diacritics, punctuation → space,
 *  drop stopwords, strip leading zeros on numbers ("02" → "2"). */
export function tokens(s) {
  const n = String(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  if (!n) return [];
  return n.split(/\s+/)
    .map(t => (/^\d+$/.test(t) ? String(parseInt(t, 10)) : t))
    .filter(t => !STOP.has(t));
}

/** Strip known series prefixes ("H-PLUS ", "Wave ", "Hemi-Sync ") from a token list. */
function stripPrefixes(toks) {
  let i = 0;
  while (i < toks.length) {
    const rest = toks.slice(i).join(" ");
    const hit = PREFIXES.find(p => rest === p || rest.startsWith(p + " "));
    if (!hit) break;
    i += hit.split(" ").length;
  }
  return toks.slice(i);
}

/** Score one hint against one file's basename tokens. -1 = no match. */
export function scoreHint(hint, fileTokens) {
  const h = tokens(hint);
  if (!h.length) return -1;
  const f = stripPrefixes(fileTokens);
  if (!f.length) return -1;
  const fs = new Set(f);
  const matched = h.filter(t => fs.has(t));
  const recall = matched.length / h.length;
  if (recall < 0.6) return -1;
  const extra = f.length - matched.length;
  return recall * 100 - extra * 5;
}

/** Best score of any hint against a full path ("Series/01 Name.flac"). -1 = no match. */
const tokenMemo = new Map();   // basename → tokens (the library view scores every file against every session)
export function scoreFile(hints, path) {
  const base = String(path).split("/").pop().replace(/\.[a-z0-9]+$/i, "");
  let fileTokens = tokenMemo.get(base);
  if (!fileTokens) { if (tokenMemo.size > 20000) tokenMemo.clear(); fileTokens = tokens(base); tokenMemo.set(base, fileTokens); }
  const fileKey = fileTokens.join(" ");
  let best = -1;
  for (const hint of hints) {
    let s = scoreHint(hint, fileTokens);
    if (s >= 0 && tokens(hint).join(" ") === fileKey) s += EXACT_BONUS;
    if (s > best) best = s;
  }
  return best;
}

/** Pick the best-matching file path for a session's hints, or null. */
export function findTrack(hints, files) {
  if (!Array.isArray(hints) || !hints.length || !Array.isArray(files)) return null;
  let best = null, bestScore = ACCEPT;
  for (const path of files) {
    const s = scoreFile(hints, path);
    if (s > bestScore) { bestScore = s; best = path; }
  }
  return best;
}

/** Natural sort for paths ("02 …" before "10 …"). */
const natural = (a, b) => String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });

/**
 * All files that belong to a title (an album, a series or a single exercise), for the reference
 * catalogue: first look for a FOLDER whose name matches the hints (every file under it is returned,
 * in natural order — "Going Home/Subject/01 …" and "Going Home/Support/01 …" both count); otherwise
 * fall back to the files whose basename matches (best first). [] when nothing matches.
 */
export function findAlbum(hints, files, limit = 60) {
  if (!Array.isArray(hints) || !hints.length || !Array.isArray(files)) return [];
  // 1) folder match
  const folders = new Map(); // folder path → best score
  for (const path of files) {
    const segs = String(path).split("/");
    for (let i = 0; i < segs.length - 1; i++) {
      const folder = segs.slice(0, i + 1).join("/");
      if (folders.has(folder)) continue;
      const ft = tokens(segs[i]);
      let best = -1;
      for (const hint of hints) {
        let sc = scoreHint(hint, ft);
        if (sc >= 0 && tokens(hint).join(" ") === stripPrefixes(ft).join(" ")) sc += EXACT_BONUS;
        if (sc > best) best = sc;
      }
      folders.set(folder, best);
    }
  }
  let bestFolder = null, bestScore = ACCEPT;
  for (const [folder, sc] of folders) if (sc > bestScore || (sc === bestScore && bestFolder && folder.length < bestFolder.length)) { bestScore = sc; bestFolder = folder; }
  if (bestFolder) {
    return files.filter(p => String(p).startsWith(bestFolder + "/")).sort(natural).slice(0, limit);
  }
  // 2) basename matches
  return files
    .map(path => ({ path, s: scoreFile(hints, path) }))
    .filter(x => x.s > ACCEPT)
    .sort((a, b) => b.s - a.s || natural(a.path, b.path))
    .slice(0, limit)
    .map(x => x.path);
}
