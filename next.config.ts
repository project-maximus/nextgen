import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old-site URLs that are still linked from search results and emails.
  async redirects() {
    return [
      { source: "/admissions/application", destination: "/how-it-works/apply", permanent: true },
      { source: "/programs/mri-technologist", destination: "/programs/mri-technician", permanent: true },
    ];
  },
};

export default nextConfig;
