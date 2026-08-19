import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { allFaqItems } from "@/content/faqs";
import { getProgramBySlug } from "@/content/programs";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbListSchema, courseSchema, faqPageSchema, jsonLd } from "@/lib/schema";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApplyCTA } from "./ApplyCTA";
import { CertificationOutlook } from "./CertificationOutlook";
import { CoreObjectives } from "./CoreObjectives";
import { FinancialAid } from "./FinancialAid";
import { ProgramDetails } from "./ProgramDetails";
import { ProgramHero } from "./ProgramHero";
import { StoryAndRelated } from "./StoryAndRelated";

const program = getProgramBySlug("medical-assistant");

// Curated subset of the sitewide FAQ set (content/faqs.ts) most relevant to
// someone considering this specific program.
const programFaqIds = ["admissions-requirements", "programs-schedule", "cost-tuition", "cert-where", "cert-retake"];
const programFaqItems = allFaqItems.filter((item) => programFaqIds.includes(item.id));

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(courseSchema(program)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbListSchema(breadcrumbItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqPageSchema(programFaqItems)) }}
      />

      <ProgramHero program={program} />
      <CoreObjectives program={program} />
      <CertificationOutlook program={program} />
      <ProgramDetails program={program} />
      <FinancialAid program={program} />
      <StoryAndRelated program={program} />
      <FAQAccordion
        title="Frequently asked questions"
        description={`Everything you need to know about the ${program.name} program.`}
        items={programFaqItems}
      />
      <ApplyCTA program={program} />
    </>
  );
}
