"use client";

import { Reveal } from "@/components/motion-v4/Reveal";
import { formatCohortDate, getNextClassStart } from "@/content/dates";
import type { Program } from "@/types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const formatLabel: Record<Program["format"], string> = {
  hybrid: "hybrid — a mix of on-campus labs and online coursework",
  online: "fully online",
  "in-person": "in-person, on campus",
  flexible: "flexible — online, hybrid, or in-person",
};

export function ProgramFaqs({ program }: { program: Program }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const nextClass = getNextClassStart();

  const items = [
    { q: "How long is the program?", a: `${program.duration}, depending on the track you choose.` },
    { q: "Is it online or in person?", a: `This program is ${formatLabel[program.format]}.` },
    {
      q: "Do I need healthcare experience?",
      a: "No prior healthcare experience is required — this program is built for career-changers starting from scratch.",
    },
    { q: "What certification will I prepare for?", a: `You'll prepare for the ${program.credential}, administered by ${program.certification.body}.` },
    {
      q: "Is job placement guaranteed?",
      a: "We don't guarantee job placement, but advisors provide job search and placement support after graduation, and graduate employment rates run around " +
        program.outlook.employmentRate + ".",
    },
    {
      q: "Are payment plans available?",
      a: "Yes — payment plans are available for students who qualify, alongside Pell Grants and federal loans.",
    },
    { q: "When is the next class?", a: `The next cohort starts ${formatCohortDate(nextClass.startDate)}.` },
  ];

  return (
    <section className="v4-scope border-t border-[var(--color-v4-line)] bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 md:px-8 xl:px-10">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">Questions</p>
            <h2 className="mt-3 text-[clamp(1.75rem,1.2rem+1.9vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-[var(--color-v4-text)]">
              Frequently asked questions
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 divide-y divide-[var(--color-v4-line)] border-t border-[var(--color-v4-line)]">
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-[var(--color-v4-text)]"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`size-4 shrink-0 text-[var(--color-v4-text-3)] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={`grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 text-sm leading-relaxed text-[var(--color-v4-text-2)]">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
