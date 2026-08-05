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

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Train for the Career Healthcare Can't Run Without",
    description:
      "AMCA-accredited healthcare career training in Dallas–Fort Worth. Hands-on labs, instructors who still work the job, and NGHI Prep — a free AI-powered study platform included with every program.",
    path: "/home-v4",
  }),
  robots: { index: false, follow: false },
};

export default function HomeV4Page() {
  return (
    <>
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
