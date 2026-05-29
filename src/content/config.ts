import { defineCollection, z } from "astro:content";

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

const writing = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, writing };
