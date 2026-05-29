#!/usr/bin/env node
// Sync ~/brain/essays/ markdown into src/content/writing/.
// Resolves [[wikilinks]] against published essais + projects.
// Skips files with `draft: true` in frontmatter.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, rmSync, existsSync } from "node:fs";
import { join, dirname, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ESSAYS_DIR = join(homedir(), "brain", "essays");
const PROJECTS_DIR = join(ROOT, "src", "content", "projects");
const OUT_DIR = join(ROOT, "src", "content", "writing");

function slugify(name) {
  return name
    .replace(/\.(md|mdx|typ)$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full));
    } else if (/\.(md|mdx|typ)$/i.test(name)) {
      out.push(full);
    }
  }
  return out;
}

function indexProjects() {
  const map = new Map();
  if (!existsSync(PROJECTS_DIR)) return map;
  for (const file of readdirSync(PROJECTS_DIR)) {
    if (!/\.(md|mdx)$/i.test(file)) continue;
    const slug = slugify(file);
    const raw = readFileSync(join(PROJECTS_DIR, file), "utf8");
    const fm = matter(raw).data;
    map.set(slug, { slug, title: fm.title ?? slug });
    if (fm.title) map.set(slugify(fm.title), { slug, title: fm.title });
  }
  return map;
}

function indexEssays(files) {
  const map = new Map();
  for (const file of files) {
    const raw = readFileSync(file, "utf8");
    const fm = matter(raw).data;
    if (fm.draft) continue;
    const slug = slugify(basename(file));
    map.set(slug, { slug, title: fm.title ?? slug });
    if (fm.title) map.set(slugify(fm.title), { slug, title: fm.title });
  }
  return map;
}

function resolveWikilinks(body, essayIdx, projectIdx) {
  return body.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, label) => {
    const display = label ?? target;
    const slug = slugify(target);
    if (projectIdx.has(slug)) {
      const t = projectIdx.get(slug);
      return `[${display}](/projects/${t.slug})`;
    }
    if (essayIdx.has(slug)) {
      const t = essayIdx.get(slug);
      return `[${display}](/essais/${t.slug})`;
    }
    return display;
  });
}

function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  // Clear out previously synced files so deletions propagate.
  for (const f of readdirSync(OUT_DIR)) {
    if (/\.(md|mdx)$/i.test(f)) rmSync(join(OUT_DIR, f));
  }

  const files = walk(ESSAYS_DIR);
  const projectIdx = indexProjects();
  const essayIdx = indexEssays(files);

  let published = 0;
  let skipped = 0;

  for (const file of files) {
    const raw = readFileSync(file, "utf8");
    const ext = extname(file).toLowerCase();
    const { data: fm, content } = matter(raw);

    if (fm.draft) {
      skipped++;
      continue;
    }

    const slug = slugify(basename(file));
    const title = fm.title ?? basename(file).replace(/\.[^.]+$/, "");
    const date = fm.date ?? new Date().toISOString().slice(0, 10);
    const tags = fm.tags ?? [];
    const summary = fm.summary ?? "";

    let body = content;

    if (ext === ".typ") {
      // Typst handling deferred — drop in a placeholder block.
      body = `> Note: this essai is authored in Typst and will be compiled to SVG in a later build. Source: \`${basename(file)}\`.\n\n${content}`;
    }

    body = resolveWikilinks(body, essayIdx, projectIdx);

    const out = matter.stringify(body, { title, date, tags, summary, draft: false });
    writeFileSync(join(OUT_DIR, `${slug}.md`), out);
    published++;
  }

  console.log(`sync-essays: ${published} published, ${skipped} drafts skipped, source: ${ESSAYS_DIR}`);
}

main();
