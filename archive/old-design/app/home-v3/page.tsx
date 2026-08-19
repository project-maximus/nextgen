import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { FinalCTA } from "./FinalCTA";
import { MagicHero } from "./MagicHero";
import { NextChapterSplit } from "./NextChapterSplit";
import { NextSteps } from "./NextSteps";
import { PartnerIntegrations } from "./PartnerIntegrations";
import { ProgramColorGrid } from "./ProgramColorGrid";
import { QuickToolsStrip } from "./QuickToolsStrip";
import { SplitFeaturePanels } from "./SplitFeaturePanels";
import { TrustAccordion } from "./TrustAccordion";
import { VoicesWall } from "./VoicesWall";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Find Your Next Chapter in Healthcare",
    description:
      "Hands-on training, real instructors, and a free NGHI Prep study platform. Explore 11 AMCA-accredited healthcare programs in Dallas–Fort Worth.",
    path: "/home-v3",
  }),
  robots: { index: false, follow: false },
};

export default function HomeV3Page() {
  return (
    <>
      <MagicHero />
      <QuickToolsStrip />
      <ProgramColorGrid />
      <SplitFeaturePanels />
      <VoicesWall />
      <TrustAccordion />
      <NextSteps />
      <PartnerIntegrations />
      <NextChapterSplit />
      <FinalCTA />
    </>
  );
}
