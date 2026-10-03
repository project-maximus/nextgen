import { FinalCTA } from "@/app/FinalCTA";
import { getProgramBySlug, programs } from "@/content/programs";
import { pageMetadata } from "@/lib/seo";
import { getProgramFaqs } from "@/lib/program-faqs";
import { breadcrumbListSchema, courseSchema, faqPageSchema, jsonLd } from "@/lib/schema";
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

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const program = getProgramBySlug((await params).slug);
  if (!program) return {};
  const format = { hybrid: "hybrid", online: "online", "in-person": "in-person", flexible: "online, hybrid or in-person" }[
    program.format
  ];
  return pageMetadata({
    title: `${program.name} Program in Dallas, TX`,
    description: `${program.name} training in Dallas, TX — ${program.duration}, ${format}. Prepare for ${program.credential} at NextGen Health Institute, an AMCA-accredited school.`,
    path: `/programs/${program.slug}`,
    image: program.cardImage,
    imageAlt: `${program.name} training at NextGen Health Institute`,
  });
}

export default async function ProgramPage({ params }: Props) {
  const program = getProgramBySlug((await params).slug);
  if (!program) notFound();

  const breadcrumbItems = [
    { label: "Home", href: "" },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqPageSchema(getProgramFaqs(program))) }}
      />

      <ProgramHero program={program} />
      <QuickFacts program={program} />
      <ProgramOverview program={program} />
      <CurriculumAccordion program={program} />
      <HandsOnTraining program={program} />
      <CertificationSection program={program} />
      <NGHIPrepSection />
      <WhyNextGen />
      <ScheduleAdmissions program={program} />
      <StudentStory program={program} />
      <ProgramFaqs program={program} />
      <FinalCTA />
    </div>
  );
}
