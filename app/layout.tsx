import { AnnouncementBar } from "@/app/AnnouncementBar";
import { Footer } from "@/app/Footer";
import { Header } from "@/app/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SmoothScrollProvider } from "@/components/motion-v4/SmoothScrollProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { site } from "@/content/site";
import { jsonLd, organizationSchema, websiteSchema } from "@/lib/schema";
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
    default: `${site.name} | Healthcare Career Training in Dallas, TX`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  category: "education",
  formatDetection: { telephone: true, address: true, email: true },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
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
          dangerouslySetInnerHTML={{ __html: jsonLd(websiteSchema()) }}
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
