import { formatCohortDate, getNextClassStart } from "@/content/dates";
import type { Program } from "@/types";

const formatLabel: Record<Program["format"], string> = {
  hybrid: "hybrid — a mix of on-campus labs and online coursework",
  online: "fully online",
  "in-person": "in-person, on campus",
  flexible: "flexible — online, hybrid, or in-person",
};

/**
 * The questions shown on a program page. Shared by the accordion and the
 * FAQPage structured data so what search engines read is exactly what
 * visitors see.
 */
export function getProgramFaqs(program: Program): { q: string; a: string }[] {
  const nextClass = getNextClassStart();
  return [
    { q: "How long is the program?", a: `${program.duration}, depending on the track you choose.` },
    { q: "Is it online or in person?", a: `This program is ${formatLabel[program.format]}.` },
    {
      q: "Do I need healthcare experience?",
      a: "No prior healthcare experience is required — this program is built for career-changers starting from scratch.",
    },
    {
      q: "What certification will I prepare for?",
      a: `You'll prepare for the ${program.credential}, administered by ${program.certification.body}.`,
    },
    {
      q: "Is job placement guaranteed?",
      a: `We don't guarantee job placement, but advisors provide job search and placement support after graduation, and graduate employment rates run around ${program.outlook.employmentRate}.`,
    },
    {
      q: "Are payment plans available?",
      a: "Yes — payment plans are available for students who qualify, alongside Pell Grants and federal loans.",
    },
    { q: "When is the next class?", a: `The next cohort starts ${formatCohortDate(nextClass.startDate)}.` },
  ];
}
