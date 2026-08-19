import { AnnouncementBar } from "@/app/AnnouncementBar";
import { Footer } from "@/app/Footer";
import { Header } from "@/app/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SmoothScrollProvider } from "@/components/motion-v4/SmoothScrollProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { site } from "@/content/site";
import { jsonLd, localBusinessSchema, organizationSchema } from "@/lib/schema";
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

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
  return (
    <html lang="en" className={sora.variable}>
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
            <SmoothScrollProvider>
              <div className="v4-scope flex min-h-screen flex-1 flex-col">
                <AnnouncementBar />
                <Header />
                <main id="main-content" className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </SmoothScrollProvider>
          </ToastProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
