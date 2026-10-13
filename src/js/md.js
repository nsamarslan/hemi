// Minimal markdown renderer for KNOWLEDGE.md (bundled into www/ by the build).
// Supports: headings (#…####), paragraphs, lists (-, *, 1.), bold, italic, inline code,
// code blocks, blockquotes, hr, links, simple pipe tables (| a | b | with a |---| separator row).
// Directive: a line `[[storyboard:<id>]]` becomes an empty `.sb-embed[data-sb-embed]` box that the app
// hydrates with the technique storyboard player (see storyboard.js).
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export function slug(text) {
  return String(text).trim().toLowerCase()
    .replace(/[^a-z0-9ğüşöçıİĞÜŞÖÇ\s-]/g, "")
    .replace(/\s+/g, "-");
}

function inline(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`)
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, txt, url) => `<a href="${url}" target="_blank" rel="noopener">${txt}</a>`);
}

export function renderMd(src) {
  const lines = String(src).replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let list = null, para = [], inCode = false, code = [], table = null;
  const splitRow = ln => ln.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map(c => c.trim());
  const flushTable = () => {
    if (!table) return;
    const [head, ...rows] = table;
    const th = head.map(c => `<th>${inline(c)}</th>`).join("");
    const body = rows.map(r => `<tr>${r.map(c => `<td>${inline(c)}</td>`).join("")}</tr>`).join("");
    out.push(`<div class="md-table"><table><thead><tr>${th}</tr></thead><tbody>${body}</tbody></table></div>`);
    table = null;
  };
  const flushPara = () => { if (para.length) { out.push(`<p>${para.map(inline).join(" ")}</p>`); para = []; } };
  const flushList = () => { if (list) { out.push(`<${list.tag}>${list.items.map(i => `<li>${inline(i)}</li>`).join("")}</${list.tag}>`); list = null; } };
  for (const ln of lines) {
    if (!inCode && /^\s*\|.*\|\s*$/.test(ln)) {
      flushPara(); flushList();
      if (/^\s*\|?\s*:?-{2,}/.test(ln) && table && table.length === 1) continue; // header separator row
      (table ||= []).push(splitRow(ln));
      continue;
    }
    flushTable();
    if (ln.trim().startsWith("```")) {
      if (inCode) { out.push(`<pre><code>${esc(code.join("\n"))}</code></pre>`); code = []; inCode = false; }
      else { flushPara(); flushList(); inCode = true; }
      continue;
    }
    if (inCode) { code.push(ln); continue; }
    const h = /^(#{1,4})\s+(.*)$/.exec(ln);
    if (h) { flushPara(); flushList(); out.push(`<h${h[1].length} id="ch-${slug(h[2])}">${inline(h[2].trim())}</h${h[1].length}>`); continue; }
    if (/^\s*---\s*$/.test(ln)) { flushPara(); flushList(); out.push("<hr>"); continue; }
    const sb = /^\s*\[\[storyboard:([a-z0-9-]+)\]\]\s*$/.exec(ln);
    if (sb) { flushPara(); flushList(); out.push(`<div class="sb-embed" data-sb-embed="${sb[1]}"></div>`); continue; }
    const dg = /^\s*\[\[diagram:([a-z0-9-]+)\]\]\s*$/.exec(ln);
    if (dg) { flushPara(); flushList(); out.push(`<div class="diag-embed" data-diag-embed="${dg[1]}"></div>`); continue; }
    const li = /^\s*[-*]\s+(.*)$/.exec(ln) || /^\s*(\d+)\.\s+(.*)$/.exec(ln);
    if (li) {
      flushPara();
      const ordered = /^\s*\d+\./.test(ln);
      const tag = ordered ? "ol" : "ul";
      if (!list || list.tag !== tag) { flushList(); list = { tag, items: [] }; }
      list.items.push((ordered ? li[2] : li[1]).trim().replace(/^\[ \]\s*/, "☐ ").replace(/^\[x\]\s*/i, "☑ "));
      continue;
    }
    if (/^\s*>/.test(ln)) {
      flushPara(); flushList();
      const qtxt = ln.replace(/^\s*>\s?/, "");
      const isHp = /GİZLİ ÖRÜNTÜ|HIDDEN PATTERN|HP-\d/.test(qtxt);
      out.push(`<blockquote${isHp ? ' class="hp-callout"' : ""}>${inline(qtxt)}</blockquote>`);
      continue;
    }
    if (!ln.trim()) { flushPara(); flushList(); continue; }
    para.push(ln.trim());
  }
  flushPara(); flushList(); flushTable();
  if (inCode) out.push(`<pre><code>${esc(code.join("\n"))}</code></pre>`);
  return out.join("\n");
}

/** Chapter list (## headings) for the guide's table of contents. */
export function chapters(src) {
  return [...String(src).matchAll(/^##\s+(.+)$/gm)].map(m => ({ title: m[1].trim(), id: "ch-" + slug(m[1]) }));
}
