import { homeFaqs } from "@/content/faqs";
import { site } from "@/content/site";
import { faqPageSchema, jsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { CredibilityStrip } from "./CredibilityStrip";
import { FAQSection } from "./FAQSection";
import { FeatureMarquee } from "./FeatureMarquee";
import { FinalCTA } from "./FinalCTA";
import { Hero } from "./Hero";
import { PartnerMarquee } from "./PartnerMarquee";
import { PrepTeaser } from "./PrepTeaser";
import { ProgramsPreview } from "./ProgramsPreview";
import { StoryScroll } from "./StoryScroll";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} | Healthcare Career Training in Dallas, TX`,
  absoluteTitle: true,
  description:
    "AMCA-accredited healthcare career training in Dallas–Fort Worth: 11 certification programs from 2 to 24 weeks, hands-on labs, and an on-campus Pearson VUE testing site.",
  path: "",
});

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqPageSchema(homeFaqs)) }} />
      <Hero />
      <CredibilityStrip />
      <PartnerMarquee />
      <ProgramsPreview />
      <PrepTeaser />
      <StoryScroll />
      <FAQSection />
      <FinalCTA />
      <FeatureMarquee />
    </>
  );
}
