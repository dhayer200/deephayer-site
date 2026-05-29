#!/usr/bin/env node
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const [, , section, ...titleParts] = process.argv;
const title = titleParts.join(" ").trim();

const VALID = ["essay", "analysis", "note"];
if (!section || !title) {
  console.error("usage: npm run new <essay|analysis|note> \"<title>\"");
  process.exit(1);
}
if (!VALID.includes(section)) {
  console.error(`section must be one of: ${VALID.join(", ")}`);
  process.exit(1);
}

const folder = section === "essay" ? "essays" : section === "analysis" ? "analysis" : "notes";
const slug = title
  .toLowerCase()
  .replace(/[^\w\s-]/g, "")
  .replace(/\s+/g, "-")
  .replace(/-+/g, "-")
  .replace(/^-|-$/g, "");

const date = new Date().toISOString().slice(0, 10);
const dir = join(root, "src", "content", folder);
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

const path = join(dir, `${slug}.md`);
if (existsSync(path)) {
  console.error(`already exists: ${path}`);
  process.exit(1);
}

let frontmatter = `---
title: "${title}"
date: ${date}
description: ""
tags: []
status: draft
`;

if (section === "analysis") {
  frontmatter += `category: sports
`;
}
if (section === "note") {
  frontmatter += `kind: fragment
`;
}

frontmatter += `---

`;

writeFileSync(path, frontmatter);
console.log(path);
