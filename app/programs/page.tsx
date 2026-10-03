import { programsPageFaqs } from "@/content/faqs";
import { programs } from "@/content/programs";
import { breadcrumbListSchema, faqPageSchema, jsonLd, programListSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { ProgramsCatalog } from "./ProgramsCatalog";

export const metadata: Metadata = pageMetadata({
  title: "Healthcare Certification Programs in Dallas",
  description:
    "Compare 11 AMCA-accredited healthcare certification programs in Dallas–Fort Worth — clinical, administrative and specialized training from 2 to 24 weeks.",
  path: "/programs",
});

const breadcrumb = [
  { label: "Home", href: "" },
  { label: "Programs", href: "/programs" },
];

export default function ProgramsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(programListSchema(programs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqPageSchema(programsPageFaqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbListSchema(breadcrumb)) }} />
      <ProgramsCatalog />
    </>
  );
}
