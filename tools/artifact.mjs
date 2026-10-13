// Prepares www/ for publishing as a claude.ai artifact: the page body without the document skeleton,
// plus the list of supporting files (published path → source path).
// Usage: node tools/artifact.mjs  → build/artifact/page.html and build/artifact/files.json
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const www = join(root, "www");
const out = join(root, "build/artifact");
mkdirSync(out, { recursive: true });

let html = readFileSync(join(www, "index.html"), "utf8");
html = html
  .replace(/<!doctype html>\s*/i, "")
  .replace(/<\/?html[^>]*>\s*/gi, "")
  .replace(/<\/?head>\s*/gi, "")
  .replace(/<\/?body>\s*/gi, "")
  .replace(/<meta (charset|name="viewport"|name="theme-color"|name="apple-[^"]*")[^>]*>\s*/gi, "")
  .replace(/<link rel="(manifest|icon|apple-touch-icon)"[^>]*>\s*/gi, "");
writeFileSync(join(out, "page.html"), html);

const files = {};
const walk = d => readdirSync(d).forEach(f => {
  const p = join(d, f);
  if (statSync(p).isDirectory()) return walk(p);
  const rel = relative(www, p);
  if (rel === "index.html" || rel === "sw.js" || rel === "manifest.webmanifest") return;
  files[rel] = p;
});
walk(www);
writeFileSync(join(out, "files.json"), JSON.stringify(files, null, 1));
const size = Object.values(files).reduce((a, p) => a + statSync(p).size, 0);
console.log(`${Object.keys(files).length} files, ${(size / 1e6).toFixed(1)} MB → build/artifact/`);
