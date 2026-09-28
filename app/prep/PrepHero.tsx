"use client";

import { AiTutorVisual, MockExamVisual } from "@/app/PrepToolsGrid";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { prep } from "@/content/prep";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { AppWindowMock } from "./AppWindowMock";

gsap.registerPlugin(ScrollTrigger);

export function PrepHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useIsReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const intro = section.querySelectorAll("[data-intro]");
      const stage = section.querySelector<HTMLElement>("[data-stage]");
      const floats = section.querySelectorAll<HTMLElement>("[data-float]");
      if (!stage) return;

      if (reducedMotion) {
        gsap.set([intro, stage, floats], { autoAlpha: 1, y: 0, rotateX: 0, scale: 1 });
        return;
      }

      // Load-in: copy rises, the app window arrives tilted back.
      const tl = gsap.timeline({ defaults: { ease: "quint.out" } });
      tl.fromTo(intro, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 })
        .fromTo(stage, { autoAlpha: 0, y: 80 }, { autoAlpha: 1, y: 0, duration: 1.1 }, "-=0.5")
        .fromTo(floats, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12 }, "-=0.6");

      // Scroll: the tilted window lays flat and lifts toward you.
      gsap.fromTo(
        stage,
        { rotateX: 16, scale: 0.92 },
        {
          rotateX: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "+=520", scrub: 0.6 },
        },
      );
      floats.forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 ? -70 : -110,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.6 },
        });
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section ref={sectionRef} className="v4-scope bg-white">
      <div className="mx-auto max-w-[1600px] px-3 md:px-5 xl:px-6">
        <div className="relative overflow-hidden rounded-[32px] bg-[var(--color-v4-ink-900)]">
          {/* Soft top glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.12)_0%,transparent_100%)]"
          />

          <div className="relative px-5 pt-[112px] text-center sm:px-8 sm:pt-[156px]">
            <p
              data-intro
              className="invisible inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75 sm:text-xs"
            >
              {prep.name} · Included with every program
            </p>
            <h1
              data-intro
              className="invisible mx-auto mt-6 max-w-[16ch] text-[clamp(2.375rem,1.2rem+4.6vw,5rem)] font-light leading-[1.02] tracking-[-0.03em] text-white"
            >
              {prep.tagline}
            </h1>
            <p data-intro className="invisible mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {prep.subline}
            </p>
            <div data-intro className="invisible mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={prep.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-1.5 rounded-full bg-white px-7 text-[15px] font-semibold text-[var(--color-v4-ink-900)] transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-[var(--color-v4-mist)]"
              >
                Open {prep.name}
                <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a
                href="#features"
                className="inline-flex h-12 items-center gap-1.5 rounded-full bg-white/15 px-7 text-[15px] font-semibold text-white backdrop-blur-md transition-colors duration-150 hover:bg-white/25"
              >
                See what&apos;s inside
                <ArrowDown className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Product stage — cropped by the card's bottom edge. */}
          <div
            className="relative mx-auto mt-12 h-[clamp(220px,52vw,620px)] max-w-[1180px] px-4 sm:mt-16 sm:px-10"
            style={{ perspective: "1600px" }}
          >
            <div data-stage className="invisible origin-top will-change-transform">
              <AppWindowMock />
            </div>

            {/* Floating feature cards (desktop only) */}
            <div data-float className="invisible absolute left-0 top-[46%] hidden w-[280px] -translate-x-[8%] lg:block">
              <AiTutorVisual reducedMotion={reducedMotion} />
            </div>
            <div data-float className="invisible absolute right-0 top-[30%] hidden w-[250px] translate-x-[6%] lg:block">
              <MockExamVisual reducedMotion={reducedMotion} />
            </div>
          </div>
          {/* The stage has a fixed height, so the card's bottom edge crops the window; fade it out. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-v4-ink-900)] to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
