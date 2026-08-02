import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { formatCohortDate, getNextClassStart } from "@/content/dates";
import { programs } from "@/content/programs";
import { site } from "@/content/site";
import { jsonLd, localBusinessSchema, organizationSchema } from "@/lib/schema";
import type { Metadata } from "next";
import { Fraunces, Sora } from "next/font/google";
import "./globals.css";

// Variable weight + SOFT/WONK axes loaded so `.font-display` can dial in
// the warm, slightly quirky SOFT setting via font-variation-settings.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  axes: ["SOFT", "WONK"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const nextClassStart = getNextClassStart();

  return (
    <html lang="en" className={`${fraunces.variable} ${sora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(localBusinessSchema()) }}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <SkipLink />
        <MotionProvider>
          <ToastProvider>
            <AnnouncementBar
              message={`Next cohort starts ${formatCohortDate(nextClassStart.startDate)} — seats limited`}
              ctaLabel="Apply now"
              ctaHref="/how-it-works/apply"
              showOnPath="/"
            />
            <Header programs={programs} />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </ToastProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
