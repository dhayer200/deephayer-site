import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkWikilinks from "./scripts/remark-wikilinks.mjs";

export default defineConfig({
  site: "https://deephayer.com",
  integrations: [mdx(), sitemap()],
  markdown: {
    smartypants: true,
    shikiConfig: { theme: "github-light" },
    remarkPlugins: [remarkWikilinks],
  },
});
