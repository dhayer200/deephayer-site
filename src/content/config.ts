import { defineCollection, z } from "astro:content";

const baseSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published"]).default("published"),
  project: z.string().optional(),
  featured: z.boolean().default(false),
});

const essays = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    section: z.literal("essays").default("essays"),
  }),
});

const analysis = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    section: z.literal("analysis").default("analysis"),
    category: z.enum(["sports", "cre", "ma", "finance", "data"]),
  }),
});

const notes = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    section: z.literal("notes").default("notes"),
    kind: z.enum(["haiku", "fragment", "quote", "observation", "story"]).default("fragment"),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.string(),
    status: z.enum(["building", "shipped", "paused", "archived"]),
    stack: z.array(z.string()).default([]),
    links: z
      .object({
        live: z.string().url().optional(),
        github: z.string().url().optional(),
        paper: z.string().url().optional(),
      })
      .default({}),
    tags: z.array(z.string()).default([]),
    order: z.number().default(100),
  }),
});

export const collections = { essays, analysis, notes, projects };
