"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(SplitText);

const stats = [
  { label: "AMCA Accredited", detail: "11 certification programs" },
  { label: "Employment Rate", detail: "95%+ of graduates hired" },
  { label: "Established 1992", detail: "30+ years in Dallas–Fort Worth" },
];

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useIsReducedMotion();

  useGSAP(
    () => {
      const headline = headlineRef.current;
      const cta = ctaRef.current;
      const media = mediaRef.current;
      const statsEl = statsRef.current;
      if (!headline || !cta || !media || !statsEl) return;

      if (reducedMotion) {
        gsap.set([headline, cta, media, statsEl], { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      document.fonts.ready.then(() => {
        const split = SplitText.create(headline, { type: "lines", mask: "lines" });
        const tl = gsap.timeline({ defaults: { ease: "quint.out" } });

        tl.fromTo(media, { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 1, scale: 1, duration: 0.9 })
          .from(
            split.lines,
            {
              yPercent: 110,
              duration: 0.9,
              stagger: 0.1,
              onStart: () => gsap.set(headline, { autoAlpha: 1 }),
              onComplete: () => split.revert(),
            },
            "-=0.6",
          )
          .fromTo(cta, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.55")
          .fromTo(statsEl, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.3");
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section ref={sectionRef} className="v4-scope bg-white">
      <div className="mx-auto max-w-[1600px] px-3 md:px-5 xl:px-6">
        <div className="relative min-h-[680px] overflow-hidden rounded-[32px] md:min-h-[720px]">
          <div ref={mediaRef} className="absolute inset-0 opacity-0">
            <Image
              src="/images/hero-v4/hero.jpg"
              alt="An NGHI-trained clinician in scrubs with a stethoscope"
              fill
              priority
              sizes="(max-width: 1360px) 100vw, 1360px"
              className="object-cover object-[68%_center]"
              style={{ filter: "saturate(0.9) contrast(1.05)" }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-black/10"
              aria-hidden="true"
            />
          </div>

          <div className="relative z-10 flex h-full min-h-[680px] flex-col justify-between px-8 pb-8 pt-[172px] md:min-h-[720px] md:px-12 md:pb-12 md:pt-[196px]">
            <div className="max-w-md">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-inv-2)]">
                <Check className="size-3.5" strokeWidth={2} aria-hidden="true" />
                AMCA-Accredited · Dallas, TX
              </p>

              <h1
                ref={headlineRef}
                className="mt-4 text-[clamp(1.875rem,1rem+2.4vw,2.75rem)] font-light leading-[1.12] tracking-[-0.02em] text-white"
                style={{ visibility: "hidden" }}
              >
                Train for a career
                <br /> healthcare depends on.
              </h1>

              <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-3 opacity-0">
                <Link
                  href="/how-it-works/apply"
                  className="inline-flex h-12 items-center rounded-full bg-white px-7 text-[15px] font-semibold text-[var(--color-v4-ink-900)] transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-[var(--color-v4-mist)]"
                >
                  Apply Now
                </Link>
                <Link
                  href="/programs"
                  className="inline-flex h-12 items-center rounded-full bg-white/20 px-7 text-[15px] font-semibold text-white backdrop-blur-md transition-colors duration-150 hover:bg-white/30"
                >
                  View Programs
                </Link>
              </div>
            </div>

            <div ref={statsRef} className="flex flex-wrap items-start gap-x-12 gap-y-6 opacity-0 sm:gap-x-16">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`relative min-w-[9rem] ${
                    i > 0 ? "before:absolute before:-left-6 before:top-0.5 before:bottom-0.5 before:w-px before:bg-white/20 sm:before:-left-8" : ""
                  }`}
                >
                  <p className="text-sm font-semibold text-white">{stat.label}</p>
                  <p className="mt-1 text-sm text-[var(--color-v4-text-inv-2)]">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
