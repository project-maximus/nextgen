"use client";

import { AiTutorVisual, FlashcardsVisual, MockExamVisual, StudyPlanVisual, toneStyles, type Tone } from "@/app/PrepToolsGrid";
import { VideoLessonsVisual } from "@/app/FeatureMarquee";
import { Reveal } from "@/components/motion-v4/Reveal";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export function NGHIPrepSection() {
  const reducedMotion = useIsReducedMotion();

  const tools: { title: string; tone: Tone; visual: ReactNode }[] = [
    { title: "AI Tutor", tone: "dark", visual: <AiTutorVisual reducedMotion={reducedMotion} /> },
    { title: "Mock Exams", tone: "light", visual: <MockExamVisual reducedMotion={reducedMotion} /> },
    { title: "Flashcards", tone: "dark", visual: <FlashcardsVisual reducedMotion={reducedMotion} /> },
    { title: "Video Lessons", tone: "light", visual: <VideoLessonsVisual /> },
    { title: "Readiness Score", tone: "dark", visual: <StudyPlanVisual reducedMotion={reducedMotion} /> },
  ];

  return (
    <section className="v4-scope border-t border-[var(--color-v4-line)] bg-[var(--color-v4-mist)] py-16 sm:py-24">
      <div className="mx-auto max-w-[1600px] px-6 md:px-8 xl:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">NGHI Prep</p>
              <h2 className="mt-3 max-w-lg text-[clamp(1.75rem,1.2rem+1.9vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-[var(--color-v4-text)]">
                Your training continues beyond the classroom.
              </h2>
            </div>
            <Link
              href="/prep"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-v4-text)] hover:text-[var(--color-v4-text-2)]"
            >
              See NGHI Prep
              <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {tools.map((tool, i) => {
            const tone = toneStyles[tool.tone];
            return (
              <Reveal key={tool.title} delay={i * 0.05}>
                <div
                  className={`group relative flex h-full min-h-[260px] w-full flex-col overflow-hidden rounded-[20px] shadow-[var(--shadow-v4-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-v4-float)] ${tone.bg}`}
                >
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${tone.glow}`}
                  />
                  <div className="px-5 pb-1 pt-6 text-left">
                    <h3 className={`text-base font-medium ${tone.title}`}>{tool.title}</h3>
                  </div>
                  <div className="relative mt-auto flex min-h-[140px] items-end px-4 pb-0">
                    <div className="w-full translate-y-[18%] transition-transform duration-500 ease-out group-hover:translate-y-[10%]">
                      {tool.visual}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
