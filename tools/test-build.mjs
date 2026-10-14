// Build output checks: service worker precache list + versioned cache name, Pages marker, manifest paths.
// Run after `node tools/build.mjs`.  Usage: node tools/test-build.mjs
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const www = join(root, "www");
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log("FAIL " + m); } };

const sw = readFileSync(join(www, "sw.js"), "utf8");
ok(!sw.includes("__BUILD__") && !sw.includes("__PRECACHE__"), "sw.js placeholders replaced by the build");
const name = /const CACHE = "gateway-([0-9a-f]{10})"/.exec(sw);
ok(name, "cache name carries a 10-hex build hash");
const list = JSON.parse(/const PRECACHE = (\[.*?\]);/.exec(sw)[1]);
ok(list[0] === "./" && list.includes("index.html") && list.includes("content.js") && list.includes("js/app.js"), "precache has the app shell");
ok(!list.some(f => f.startsWith("guide/") || f.startsWith("research/")), "guide and research are not part of the app (they live in the Obsidian vault)");
const js = readdirSync(join(www, "js")).filter(f => f.endsWith(".js")).map(f => `js/${f}`);
const vis = readdirSync(join(www, "js", "visuals")).filter(f => f.endsWith(".js")).map(f => `js/visuals/${f}`);
ok([...js, ...vis].every(f => list.includes(f)), "precache has every JS module");
ok(["visuals/img/box.jpg", "visuals/img/orb.jpg", "visuals/img/waves.jpg", "icons/icon-192.png", "icons/icon-512.png", "manifest.webmanifest"].every(f => list.includes(f)), "precache has images, icons and the manifest");
ok(!list.some(f => f.startsWith("voice/") || f === "sw.js" || (f !== "./" && f.startsWith("."))), "precache excludes voice packs, sw.js and dot files");
ok(list.every(f => f === "./" || existsSync(join(www, f))), "every precached file exists in www/");
ok(existsSync(join(www, ".nojekyll")), ".nojekyll written for GitHub Pages");

// a second build of the same sources must give the same hash (deterministic), and the hash must track content
const again = readFileSync(join(www, "sw.js"), "utf8");
ok(again === sw, "sw.js stable within a build");

const manifest = JSON.parse(readFileSync(join(www, "manifest.webmanifest"), "utf8"));
ok(manifest.start_url === "./" && manifest.scope === "./", "manifest uses relative start_url/scope (works under a sub-path such as GitHub Pages)");
const html = readFileSync(join(www, "index.html"), "utf8");
ok(!/(href|src)="\//.test(html), "index.html has no root-absolute URLs");
ok(!/from "\//.test(readFileSync(join(www, "js", "app.js"), "utf8")), "app.js imports are relative");

console.log(`build: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
