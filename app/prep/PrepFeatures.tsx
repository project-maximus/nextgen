"use client";

import { AudioLessonsVisual, VideoLessonsVisual } from "@/app/FeatureMarquee";
import { AiTutorVisual, FlashcardsVisual, MockExamVisual, StudyPlanVisual, toneStyles } from "@/app/PrepToolsGrid";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { Reveal } from "@/components/motion-v4/Reveal";
import { prepFeatures, type PrepFeatureKey } from "@/content/prep";
import { Check } from "lucide-react";
import type { ReactNode } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function PrepFeatures() {
  const reducedMotion = useIsReducedMotion();

  const visuals: Record<PrepFeatureKey, ReactNode> = {
    tutor: <AiTutorVisual reducedMotion={reducedMotion} />,
    exams: <MockExamVisual reducedMotion={reducedMotion} />,
    flashcards: <FlashcardsVisual reducedMotion={reducedMotion} />,
    plan: <StudyPlanVisual reducedMotion={reducedMotion} />,
    lessons: (
      <div className="flex flex-col gap-4">
        <VideoLessonsVisual />
        <AudioLessonsVisual reducedMotion={reducedMotion} />
      </div>
    ),
  };

  return (
    <section id="features" className="v4-scope scroll-mt-24 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-8 xl:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">What&apos;s inside</p>
          <h2 className="mt-3 text-[clamp(1.75rem,1.2rem+1.9vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-[var(--color-v4-text)]">
            Everything you need between class and exam day.
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-20 sm:mt-24 sm:gap-28">
          {prepFeatures.map((f, i) => {
            const tone = toneStyles[i % 2 === 0 ? "dark" : "light"];
            const flip = i % 2 === 1;
            return (
              <div
                key={f.key}
                className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20 xl:gap-28"
              >
                <Reveal className={flip ? "lg:order-2" : undefined}>
                  <div
                    className={`group relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-[28px] px-8 py-12 sm:min-h-[440px] sm:px-16 ${tone.bg}`}
                  >
                    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${tone.glow}`} />
                    <div className="relative w-full max-w-[340px] sm:scale-[1.15]">{visuals[f.key]}</div>
                  </div>
                </Reveal>

                {/* Text hugs the outer edge so every row shares the section's left/right lines. */}
                <Reveal delay={0.08} className={flip ? "lg:order-1" : "lg:justify-self-end"}>
                  <div className="max-w-lg">
                    <p className="flex items-baseline gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">
                      <span className="tnum">{pad(i + 1)}</span>
                      {f.eyebrow}
                    </p>
                    <h3 className="mt-4 text-[clamp(1.625rem,1.2rem+1.5vw,2.25rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[var(--color-v4-text)]">
                      {f.title}
                    </h3>
                    <p className="mt-5 text-base leading-relaxed text-[var(--color-v4-text-2)] sm:text-lg">{f.body}</p>
                    <ul className="mt-8 flex flex-col border-t border-[var(--color-v4-line)]">
                      {f.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-3 border-b border-[var(--color-v4-line)] py-4 text-[15px] text-[var(--color-v4-text)]"
                        >
                          <Check className="size-4 shrink-0 text-[var(--color-v4-text-3)]" strokeWidth={2} aria-hidden="true" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
