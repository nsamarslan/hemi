// Renders every visual (src/js/visuals/*.js) in each state and theme to PNGs + a contact sheet.
// Usage: node tools/visual-preview.mjs [visualId ...]   → build/visual-preview/
import { createServer } from "node:http";
import { readFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require("playwright")); } catch { ({ chromium } = require("/opt/node22/lib/node_modules/playwright")); }

const only = process.argv.slice(2);
const ids = readdirSync(join(root, "src/js/visuals")).filter(f => f.endsWith(".js") && f !== "index.js" && !f.startsWith("_"))
  .map(f => f.replace(/\.js$/, "")).filter(id => !only.length || only.includes(id));
const out = join(root, "build/visual-preview");
mkdirSync(out, { recursive: true });

const types = { ".js": "text/javascript", ".css": "text/css", ".html": "text/html" };
const server = createServer((req, res) => {
  const p = join(root, decodeURIComponent(req.url.split("?")[0]));
  if (!p.startsWith(root) || !existsSync(p)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": types[extname(p)] || "application/octet-stream" });
  res.end(readFileSync(p));
}).listen(0);
const port = server.address().port;

const page = `<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="/src/css/tokens.css">
<style>body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--font-body)}
.cell{width:360px;padding:12px;box-sizing:border-box}.cap{font:12px monospace;color:var(--muted);margin-bottom:6px}</style>
<body><div id="c" class="cell"></div><script type="module">
window.show = async (id, state, lang) => {
  const m = (await import('/src/js/visuals/' + id + '.js?' + Date.now())).default;
  document.getElementById('c').innerHTML = '<div class="cap">' + id + ' · ' + (state || '—') + ' · ' + lang + '</div>' + m.render(state, lang);
  return m.states;
};
</script>`;

const browser = await chromium.launch();
const shots = [];
const problems = [];
for (const theme of ["light", "dark", "night"]) {
  const ctx = await browser.newContext({ viewport: { width: 360, height: 320 }, colorScheme: theme === "light" ? "light" : "dark" });
  const pg = await ctx.newPage();
  pg.on("pageerror", e => problems.push(`${theme}: ${e.message}`));
  await pg.setContent(page);
  await pg.goto(`http://127.0.0.1:${port}/__blank`).catch(() => {});
  await pg.route("**/__page", r => r.fulfill({ contentType: "text/html", body: page }));
  await pg.goto(`http://127.0.0.1:${port}/__page`);
  if (theme === "night") await pg.evaluate(() => document.body.classList.add("night"));
  for (const id of ids) {
    let states;
    try { states = await pg.evaluate(([id]) => window.show(id, "", "tr"), [id]); }
    catch (e) { problems.push(`${id}: ${e.message}`); continue; }
    for (const state of states.length ? states : [""]) {
      for (const lang of theme === "light" ? ["tr", "en"] : ["tr"]) {
        await pg.evaluate(([id, s, l]) => window.show(id, s, l), [id, state, lang]);
        await pg.waitForTimeout(150);
        const box = await pg.locator("#c").boundingBox();
        const file = join(out, `${id}${state ? "-" + state : ""}-${theme}-${lang}.png`);
        await pg.locator("#c").screenshot({ path: file });
        shots.push({ file, h: box.height });
        const svg = await pg.evaluate(() => {
          const s = document.querySelector("#c svg");
          if (!s) return "no <svg> rendered";
          const vb = s.viewBox.baseVal, bad = [];
          for (const el of s.querySelectorAll("text")) {
            const b = el.getBBox();
            if (b.x < vb.x - 1 || b.y < vb.y - 1 || b.x + b.width > vb.x + vb.width + 1 || b.y + b.height > vb.y + vb.height + 1)
              bad.push(`label "${el.textContent}" outside viewBox`);
          }
          if (/#[0-9a-f]{3,8}\b|rgb\(/i.test(s.outerHTML)) bad.push("literal colour used (use CSS variables)");
          return bad.join("; ");
        });
        if (svg) problems.push(`${id} ${state} ${theme} ${lang}: ${svg}`);
      }
    }
  }
  await ctx.close();
}
// contact sheet
const sheet = await (await browser.newContext({ viewport: { width: 1480, height: 800 } })).newPage();
const imgs = shots.map(s => `<img src="data:image/png;base64,${readFileSync(s.file).toString("base64")}" style="width:360px;margin:4px;vertical-align:top">`).join("");
await sheet.setContent(`<body style="margin:0;background:#888">${imgs}</body>`);
await sheet.screenshot({ path: join(out, "sheet.png"), fullPage: true });
await browser.close();
server.close();
console.log(`${shots.length} images → ${out}`);
console.log(problems.length ? "PROBLEMS:\n" + [...new Set(problems)].join("\n") : "no automatic problems found");
