"use client";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import type { Program } from "@/types";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export interface SiteChromeProps {
  children: ReactNode;
  programs: Program[];
  announcementMessage: string;
}

/**
 * Home v4 ("Superpower-inspired" concept) ships its own Header/Footer/nav —
 * a completely different brand system per the build spec — so it opts out
 * of the site-wide chrome here instead of getting it doubled up. Every
 * other route is unaffected.
 */
export function SiteChrome({ children, programs, announcementMessage }: SiteChromeProps) {
  const pathname = usePathname();
  const isV4 = pathname?.startsWith("/home-v4");

  if (isV4) {
    return (
      <main id="main-content" className="flex-1">
        {children}
      </main>
    );
  }

  return (
    <>
      <AnnouncementBar message={announcementMessage} ctaLabel="Apply now" ctaHref="/how-it-works/apply" showOnPath="/" />
      <Header programs={programs} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
