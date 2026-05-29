import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const collections = ["essays", "analysis", "notes"];
  const all = [];
  for (const name of collections) {
    const entries = await getCollection(name, ({ data }) => data.status !== "draft");
    for (const e of entries) {
      all.push({
        title: e.data.title,
        pubDate: e.data.date,
        description: e.data.description || "",
        link: `/${name}/${e.slug}/`,
      });
    }
  }
  all.sort((a, b) => b.pubDate - a.pubDate);

  return rss({
    title: "Deep Hayer",
    description: "Essays, analysis, and notes by Deep Hayer.",
    site: context.site,
    items: all,
  });
}
