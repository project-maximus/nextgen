"use client";

import { Reveal } from "@/components/motion-v4/Reveal";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

// Grouped from the program's real, verified learning objectives
// (content/programs.ts) into six teaching modules for a scannable accordion.
const MODULES = [
  {
    title: "Foundations of Healthcare",
    detail: "Medical terminology, anatomy, and workplace safety — the shared vocabulary every clinical task builds on.",
  },
  {
    title: "Clinical Skills",
    detail: "Vitals, patient preparation, and infection-control protocols you'll use in every patient interaction.",
  },
  {
    title: "Phlebotomy & Lab Procedures",
    detail: "Venipuncture technique, specimen collection and handling, and lab safety standards.",
  },
  {
    title: "EKG & Diagnostic Procedures",
    detail: "Electrocardiogram administration, basic rhythm recognition, and supporting diagnostic testing.",
  },
  {
    title: "Administrative Skills",
    detail: "Patient records, scheduling, insurance basics, and HIPAA-compliant documentation.",
  },
  {
    title: "Certification Preparation",
    detail: "Structured review and practice testing for the CMA and RMA exams, through exam day.",
  },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function CurriculumAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="v4-scope border-t border-[var(--color-v4-line)] bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1600px] px-6 md:px-8 xl:px-10">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">Curriculum</p>
          <h2 className="mt-3 max-w-xl text-[clamp(1.75rem,1.2rem+1.9vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-[var(--color-v4-text)]">
            How the program is structured.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-[var(--color-v4-line)] border-t border-[var(--color-v4-line)]">
            {MODULES.map((module, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={module.title}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="tnum text-sm font-semibold text-[var(--color-v4-text-3)]">{pad(index + 1)}</span>
                      <span className="text-base font-medium text-[var(--color-v4-text)] sm:text-lg">{module.title}</span>
                    </span>
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
                      <p className="pb-5 pl-9 text-sm leading-relaxed text-[var(--color-v4-text-2)]">{module.detail}</p>
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
