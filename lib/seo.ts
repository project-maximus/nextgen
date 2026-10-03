import { site } from "@/content/site";
import type { Metadata } from "next";

interface PageSeoOptions {
  /** Page title. The root layout appends " | NextGen Health Institute" unless `absoluteTitle` is set. */
  title: string;
  description: string;
  path: string;
  /** Site-relative or absolute image for link previews (1200×630 works best). */
  image?: string;
  imageAlt?: string;
  /** Use the title exactly as given, without the site-name suffix. */
  absoluteTitle?: boolean;
}

const DEFAULT_OG_IMAGE = "/og/default.jpg";

/** Shared metadata builder — guarantees a unique title/description per route and one canonical URL. */
export function pageMetadata({ title, description, path, image, imageAlt, absoluteTitle }: PageSeoOptions): Metadata {
  const url = `${site.url}${path}`;
  const img = image ?? DEFAULT_OG_IMAGE;
  const ogImage = img.startsWith("http") ? img : `${site.url}${img}`;
  // Social cards show the title on its own line, so they carry the brand explicitly.
  const socialTitle = absoluteTitle || title.includes(site.name) ? title : `${title} | ${site.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: site.name,
      images: [{ url: ogImage, alt: imageAlt ?? socialTitle, ...(image ? {} : { width: 1200, height: 630 }) }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [ogImage],
    },
  };
}
