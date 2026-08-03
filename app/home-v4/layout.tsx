import { SmoothScrollProvider } from "@/components/motion-v4/SmoothScrollProvider";
import type { ReactNode } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { Footer } from "./Footer";
import { Header } from "./Header";

/**
 * Home v4 ("Superpower-inspired" concept) — completely independent brand
 * system. The site-wide Header/Footer/AnnouncementBar are skipped for this
 * route by SiteChrome (components/layout/SiteChrome.tsx); this layout
 * supplies v4's own nav, footer, and the Lenis/ScrollTrigger scroll
 * provider instead. See nghi-master-build-prompt.md for the full spec.
 */
export default function HomeV4Layout({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <div className="v4-scope">
        <AnnouncementBar />
        <Header />
        {children}
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
