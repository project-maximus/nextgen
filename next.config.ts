import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old-site URLs that are still linked from search results and emails.
  async redirects() {
    return [
      { source: "/admissions/application", destination: "/how-it-works/apply", permanent: true },
      { source: "/admissions", destination: "/how-it-works/apply", permanent: true },
      { source: "/admissions/requirements", destination: "/how-it-works/apply", permanent: true },
      { source: "/admissions/financial-aid", destination: "/contact?type=financial-aid", permanent: true },
      { source: "/programs/mri-technologist", destination: "/programs/mri-technician", permanent: true },
      // Old-site pages with no equivalent yet. Temporary (307) on purpose: when these
      // pages are built, removing the redirect takes effect immediately, whereas a
      // permanent one would stay cached in browsers and search engines.
      { source: "/about", destination: "/", permanent: false },
      { source: "/faq", destination: "/programs", permanent: false },
      { source: "/student-life", destination: "/", permanent: false },
      { source: "/testimonials", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;

// Makes Cloudflare bindings available during `next dev`.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
