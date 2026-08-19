import { FinalCTA } from "@/app/FinalCTA";
import { getProgramBySlug } from "@/content/programs";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbListSchema, courseSchema, jsonLd } from "@/lib/schema";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CertificationSection } from "./CertificationSection";
import { CurriculumAccordion } from "./CurriculumAccordion";
import { HandsOnTraining } from "./HandsOnTraining";
import { NGHIPrepSection } from "./NGHIPrepSection";
import { ProgramFaqs } from "./ProgramFaqs";
import { ProgramHero } from "./ProgramHero";
import { ProgramOverview } from "./ProgramOverview";
import { QuickFacts } from "./QuickFacts";
import { ScheduleAdmissions } from "./ScheduleAdmissions";
import { StudentStory } from "./StudentStory";
import { WhyNextGen } from "./WhyNextGen";

const program = getProgramBySlug("medical-assistant");

export const metadata: Metadata = program
  ? pageMetadata({
      title: `${program.name} Program`,
      description: program.blurb,
      path: `/programs/${program.slug}`,
    })
  : {};

export default function MedicalAssistantProgramPage() {
  if (!program) notFound();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Programs", href: "/programs" },
    { label: program.name, href: `/programs/${program.slug}` },
  ];

  return (
    <div className="v4-scope bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(courseSchema(program)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbListSchema(breadcrumbItems)) }}
      />

      <ProgramHero program={program} />
      <QuickFacts program={program} />
      <ProgramOverview program={program} />
      <CurriculumAccordion />
      <HandsOnTraining program={program} />
      <CertificationSection program={program} />
      <NGHIPrepSection />
      <WhyNextGen />
      <ScheduleAdmissions program={program} />
      <StudentStory />
      <ProgramFaqs program={program} />
      <FinalCTA />
    </div>
  );
}
