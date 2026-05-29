# deephayer.com

Personal site. Essays, analysis, project logs, and notes.

## Run locally

```
npm install
npm run dev
```

Site at http://localhost:4321.

## Add a post

Create a Markdown file in the right collection folder:

```
src/content/
  essays/      # Montaigne-style writing
  analysis/    # Sports, CRE, M&A, finance, data
  projects/    # Project pages
  notes/       # Fragments, haiku, observations
```

Each file needs frontmatter. Example for an essay:

```markdown
---
title: My new essay
date: 2026-06-01
description: One sentence summary that shows on the index.
tags: [philosophy, math]
status: published
project: chalkiq    # optional, ties the post to a project page
featured: false
---

Body in Markdown.
```

For analysis posts, also set `category` to one of `sports`, `cre`, `ma`, `finance`, `data`:

```markdown
---
title: Weekly Austin M&A
date: 2026-06-01
category: ma
status: published
tags: [ma, austin]
---
```

For notes, set `kind` to one of `haiku`, `fragment`, `quote`, `observation`, `story`.

Drafts: set `status: draft` and the post will not appear on the public site.

## Build

```
npm run build
```

Output goes to `dist/`. Deploy that to any static host.

## Deploy to Vercel

The repo is already linked to Vercel. Pushes to `master` deploy automatically.

To deploy manually:

```
vercel deploy --prod
```

## Edit navigation

Top nav is in `src/components/Header.astro`. Footer in `src/components/Footer.astro`. Both are plain HTML; edit the anchor list.

## Add a new analysis category

1. Add the slug to the `category` enum in `src/content/config.ts`.
2. Add it to the `getStaticPaths` list and `LABELS` map in `src/pages/analysis/[category]/index.astro`.
3. Add a link to it on `src/pages/analysis/index.astro`.

## URL structure

| Path                         | Purpose                       |
| ---------------------------- | ----------------------------- |
| `/`                          | home                          |
| `/about`                     | about                         |
| `/essays`                    | essay index                   |
| `/essays/[slug]`             | single essay                  |
| `/analysis`                  | all analysis posts            |
| `/analysis/[category]`       | per-category index            |
| `/analysis/[slug]`           | single analysis post          |
| `/projects`                  | project index                 |
| `/projects/[slug]`           | single project                |
| `/notes`                     | notes feed                    |
| `/notes/[slug]`              | single note                   |
| `/archive`                   | chronological list of all     |
| `/tags/[tag]`                | per-tag index                 |
