import { admissionsQuotes, applicationSteps, processingTimeline, requiredDocuments } from "@/content/admissions";
import { formatCohortDate, getNextClassStart } from "@/content/dates";
import { homeFaqs, programsPageFaqs } from "@/content/faqs";
import { prep, prepFaqs, prepFeatures } from "@/content/prep";
import { programs } from "@/content/programs";
import { site } from "@/content/site";

// Regenerated at build time from the same content files the pages use.
export const dynamic = "force-static";

const formatLabel = { hybrid: "Hybrid", online: "Online", "in-person": "In-person", flexible: "Online, hybrid or in-person" } as const;

/**
 * /llms.txt — a plain-language, link-rich summary of the school for AI
 * assistants and answer engines (https://llmstxt.org). Everything here is
 * generated from content/*.ts, so it can never drift from the site.
 */
export function GET() {
  const address = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;
  const faqs = [...new Map([...homeFaqs, ...programsPageFaqs, ...prepFaqs].map((f) => [f.q, f])).values()];

  const body = `# ${site.name}

> ${site.description} The campus is at ${address}. Admissions: ${site.phone}, ${site.email}.

${site.name} (${site.shortName}) is a healthcare career-training school in Dallas, Texas. It is accredited by the American Medical Certification Association (AMCA) and is an authorized Pearson VUE testing site, so students can sit certification exams on campus. Programs run from 2 to 24 weeks, most in a hybrid format, with day and evening schedules. New classes begin monthly; the next class starts ${formatCohortDate(getNextClassStart().startDate)}.

## Key facts

- Name: ${site.name} (${site.shortName})
- Type: Healthcare career-training school (certification programs, not degrees)
- Location: ${address}, United States
- Area served: Dallas–Fort Worth
- Phone: ${site.phone}
- Email: ${site.email}
- Office hours: ${site.hours.map((h) => `${h.days} ${h.hours}`).join("; ")}
- Accreditation: American Medical Certification Association (AMCA)
- Testing: Authorized Pearson VUE testing site
- Programs: ${programs.length} certification programs, 2 to 24 weeks
- Financial aid: Available for those who qualify (Pell Grants, federal student loans, merit-based scholarships)
- Study platform: ${prep.name}, included with every program at no extra cost

## Programs

${programs
  .map(
    (p) =>
      `- [${p.name} Program](${site.url}/programs/${p.slug}): ${p.duration}; ${formatLabel[p.format]}; ${p.credential}. ${p.blurb} Covers: ${p.objectives.join("; ")}. Graduates work in: ${p.outlook.environments.join(", ")}.`,
  )
  .join("\n")}

Full catalog: [All programs](${site.url}/programs)

## Admissions

Apply online at [${site.url}/how-it-works/apply](${site.url}/how-it-works/apply). Typical application timeline: ${processingTimeline.summary} (${processingTimeline.points.map((t) => `${t.label.toLowerCase()} ${t.value}`).join(", ")}).

${applicationSteps.map((s, i) => `${i + 1}. ${s.title}: ${s.body}`).join("\n")}

Documents needed: ${requiredDocuments.join("; ")}.

## ${prep.name}

${prep.name} is the school's online study platform: "${prep.tagline}" ${prep.subline} Details: [${site.url}/prep](${site.url}/prep)

${prepFeatures.map((f) => `- ${f.eyebrow}: ${f.body}`).join("\n")}

## Frequently asked questions

${faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## What students say

${admissionsQuotes.map((q) => `- "${q.quote}" — ${q.who}`).join("\n")}

## Pages

- [Home](${site.url})
- [Certification programs](${site.url}/programs)
- [Apply now](${site.url}/how-it-works/apply)
- [${prep.name}](${site.url}/prep)
- [Contact admissions](${site.url}/contact)
- [Sitemap](${site.url}/sitemap.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
