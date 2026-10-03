import { site } from "@/content/site";
import type { MetadataRoute } from "next";

/**
 * Search engines and AI assistants are both welcome: being quoted by ChatGPT,
 * Claude, Perplexity and Google's AI answers is a goal, not a risk, for a
 * school that wants to be found. AI crawlers are named explicitly so the
 * intent is unambiguous even if a default ever changes.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: "/api/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
