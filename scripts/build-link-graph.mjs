#!/usr/bin/env node
// Build link graph + backlinks JSON from projects/ and writing/ collections.
// Output: src/data/link-graph.json

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PROJECTS_DIR = join(ROOT, "src", "content", "projects");
const WRITING_DIR = join(ROOT, "src", "content", "writing");
const OUT = join(ROOT, "src", "data", "link-graph.json");

function slugify(name) {
  return name
    .replace(/\.(md|mdx)$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function collect(dir, kind) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const f of readdirSync(dir)) {
    if (!/\.(md|mdx)$/i.test(f)) continue;
    const raw = readFileSync(join(dir, f), "utf8");
    const { data, content } = matter(raw);
    const slug = slugify(f);
    out.push({
      id: `${kind}/${slug}`,
      slug,
      kind,
      title: data.title ?? slug,
      href: kind === "project" ? `/projects/${slug}` : `/essais/${slug}`,
      body: content,
    });
  }
  return out;
}

function extractLinks(body) {
  const links = new Set();
  for (const m of body.matchAll(/\[[^\]]+\]\((\/(?:projects|essais)\/[a-z0-9-]+)\)/g)) {
    links.add(m[1]);
  }
  return Array.from(links);
}

function main() {
  const projects = collect(PROJECTS_DIR, "project");
  const essays = collect(WRITING_DIR, "essai");
  const all = [...projects, ...essays];

  const byHref = new Map(all.map((n) => [n.href, n]));

  const nodes = all.map((n) => ({
    id: n.id,
    title: n.title,
    kind: n.kind,
    href: n.href,
  }));

  const links = [];
  const backlinks = {};

  for (const n of all) {
    const targets = extractLinks(n.body);
    for (const href of targets) {
      const tgt = byHref.get(href);
      if (!tgt) continue;
      links.push({ source: n.id, target: tgt.id });
      const key = tgt.id;
      if (!backlinks[key]) backlinks[key] = [];
      backlinks[key].push({ title: n.title, href: n.href, kind: n.kind === "project" ? "project" : "essai" });
    }
  }

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify({ nodes, links, backlinks }, null, 2));

  // Also write a copy to public/ so client-side fetch in /graph works.
  const pub = join(ROOT, "public", "link-graph.json");
  writeFileSync(pub, JSON.stringify({ nodes, links }));

  console.log(`build-link-graph: ${nodes.length} nodes, ${links.length} edges`);
}

main();
