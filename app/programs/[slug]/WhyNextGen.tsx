"use client";

import { Award, Briefcase, GraduationCap, Stethoscope, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/motion-v4/Reveal";

// Shared across every program page — not program-specific copy.
const REASONS: { title: string; Icon: LucideIcon; points: string[] }[] = [
  {
    title: "Hands-On Training",
    Icon: Stethoscope,
    points: [
      "Real clinical equipment from week one",
      "Small class sizes, hands-on labs",
      "Supervised clinical externship",
    ],
  },
  {
    title: "Industry Instructors",
    Icon: GraduationCap,
    points: ["Lead instructors still work in the field they teach", "Small student-to-instructor ratios"],
  },
  {
    title: "Certification Preparation",
    Icon: Award,
    points: ["AMCA-accredited curriculum", "Coursework built around your exam blueprint", "Pearson VUE testing site"],
  },
  {
    title: "Career Support",
    Icon: Briefcase,
    points: ["Job search and placement assistance", "30+ years training Texans for healthcare careers"],
  },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function WhyNextGen() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="v4-scope border-t border-[var(--color-v4-line)] bg-[var(--color-v4-ink-900)] py-16 sm:py-24">
      <div className="mx-auto max-w-[1600px] px-6 md:px-8 xl:px-10">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">Why NextGen</p>
          <h2 className="mt-3 max-w-xl text-[clamp(1.75rem,1.2rem+1.9vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-white">
            Why train here.
          </h2>
        </Reveal>

        {/* Expanding panel row — hover/click a panel and it grows to reveal
         * detail while the rest compress to an icon + number spine. */}
        <Reveal delay={0.1}>
          <div className="mt-12 hidden h-[420px] gap-2 sm:flex">
            {REASONS.map((reason, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={reason.title}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 p-6 text-left transition-[flex-grow,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-8 ${
                    isActive ? "flex-[3] bg-white/[0.06]" : "flex-[0.6] bg-transparent hover:bg-white/[0.03]"
                  }`}
                  style={{ flexBasis: 0 }}
                >
                  <reason.Icon
                    className={`size-8 shrink-0 transition-colors duration-300 sm:size-9 ${isActive ? "text-white" : "text-white/50"}`}
                    strokeWidth={1.25}
                    aria-hidden="true"
                  />

                  <div>
                    <span className="tnum text-sm text-white/40">[{pad(i + 1)}]</span>
                    <h3
                      className={`mt-3 font-normal leading-[1.15] tracking-[-0.01em] text-white transition-[font-size] duration-500 ${
                        isActive ? "text-2xl sm:text-3xl" : "text-base"
                      }`}
                    >
                      {reason.title}
                    </h3>

                    <ul
                      className={`flex flex-col overflow-hidden transition-[max-height,opacity,margin] duration-500 ${
                        isActive ? "mt-6 max-h-64 gap-3 opacity-100" : "mt-0 max-h-0 gap-0 opacity-0"
                      }`}
                    >
                      {reason.points.map((point) => (
                        <li key={point} className="text-sm leading-snug text-white/70 sm:text-base">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Mobile fallback — plain stacked list, no hover-expand. */}
        <div className="mt-10 flex flex-col gap-8 sm:hidden">
          {REASONS.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 0.06}>
              <reason.Icon className="size-8 text-white/70" strokeWidth={1.25} aria-hidden="true" />
              <p className="tnum mt-4 text-sm text-white/40">[{pad(i + 1)}]</p>
              <h3 className="mt-2 text-2xl font-normal text-white">{reason.title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {reason.points.map((point) => (
                  <li key={point} className="text-lg leading-snug text-white/70">
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
