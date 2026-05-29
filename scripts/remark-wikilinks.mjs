import { readdirSync } from "node:fs";
import { join } from "node:path";
import { visit } from "unist-util-visit";

const CONTENT_ROOT = new URL("../src/content/", import.meta.url).pathname;
const SECTIONS = [
  ["essays", "essays"],
  ["analysis", "analysis"],
  ["notes", "notes"],
  ["projects", "projects"],
];

function buildSlugMap() {
  const map = new Map();
  for (const [folder, urlPrefix] of SECTIONS) {
    const dir = join(CONTENT_ROOT, folder);
    let entries;
    try {
      entries = readdirSync(dir);
    } catch {
      continue;
    }
    for (const f of entries) {
      if (!f.endsWith(".md") && !f.endsWith(".mdx")) continue;
      const slug = f.replace(/\.(md|mdx)$/, "");
      if (!map.has(slug)) {
        map.set(slug, `/${urlPrefix}/${slug}`);
      }
    }
  }
  return map;
}

const WIKILINK = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

export default function remarkWikilinks() {
  const slugMap = buildSlugMap();

  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      if (!parent || index === undefined) return;
      const value = node.value;
      if (!value.includes("[[")) return;

      const children = [];
      let last = 0;
      let m;
      WIKILINK.lastIndex = 0;
      while ((m = WIKILINK.exec(value)) !== null) {
        if (m.index > last) {
          children.push({ type: "text", value: value.slice(last, m.index) });
        }
        const target = m[1].trim();
        const alias = (m[2] || target).trim();
        const url = slugMap.get(target);
        if (url) {
          children.push({
            type: "link",
            url,
            children: [{ type: "text", value: alias }],
          });
        } else {
          children.push({
            type: "html",
            value: `<span class="wikilink-broken" title="missing: ${target}">${alias}</span>`,
          });
        }
        last = m.index + m[0].length;
      }
      if (last < value.length) {
        children.push({ type: "text", value: value.slice(last) });
      }
      parent.children.splice(index, 1, ...children);
      return index + children.length;
    });
  };
}
