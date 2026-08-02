import { site } from "@/content/site";
import type { Metadata } from "next";

interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
}

/** Shared metadata builder — guarantees a unique title/description per route and one canonical URL. */
export function pageMetadata({ title, description, path, image }: PageSeoOptions): Metadata {
  const url = `${site.url}${path}`;
  const ogImage = image ?? `${site.url}/og/default.jpg`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
