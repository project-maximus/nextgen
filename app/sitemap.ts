import { programs } from "@/content/programs";
import { site } from "@/content/site";
import type { MetadataRoute } from "next";

/** Every indexable page, on the real domain (the old site's sitemap pointed at its vercel.app host). */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  });

  return [
    page("", 1),
    page("/programs", 0.9),
    ...programs.map((p) => page(`/programs/${p.slug}`, 0.8)),
    page("/how-it-works/apply", 0.8),
    page("/prep", 0.7),
    page("/contact", 0.7),
  ];
}
