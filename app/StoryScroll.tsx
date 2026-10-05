"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { useLenis } from "@/components/motion-v4/SmoothScrollProvider";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    index: "01",
    title: "AMCA-Accredited Training",
    description:
      "Every program is built around AMCA's certification standards, so what you learn on campus is exactly what your exam — and your employer — expect.",
    image: "/images/story/step-1.jpg",
  },
  {
    index: "02",
    title: "Instructors Who Work the Job",
    description:
      "Every lead instructor still works in the field they teach — small classes, real clinical equipment, and answers from people doing it today.",
    image: "/images/story/step-2.jpg",
  },
  {
    index: "03",
    title: "Hands-On From Day One",
    description:
      "Phlebotomy, casting, EKGs, patient care — you're practicing on real equipment in a real lab, not just reading about it.",
    image: "/images/story/step-3.jpg",
  },
  {
    index: "04",
    title: "Job-Ready in Weeks",
    description:
      "Certify in as little as 2 to 24 weeks, sit your exam on campus as an authorized Pearson VUE testing site, and start applying with a real credential.",
    image: "/images/story/step-4.jpg",
  },
];

/** `pinned` sizes the card to the viewport it is stuck in; stacked cards keep a fixed height. */
function Card({ activeIndex, pinned = false }: { activeIndex: number; pinned?: boolean }) {
  return (
    <div className={`relative w-full overflow-hidden rounded-[32px] ${pinned ? "h-[min(600px,calc(100svh-6rem))] sm:h-[min(680px,calc(100svh-3rem))]" : "h-[600px] sm:h-[680px]"}`}>
      {steps.map((step, i) => (
        <div
          key={step.title}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={step.image}
            alt=""
            fill
            sizes="(max-width: 1600px) 100vw, 1600px"
            priority={i === 0}
            className="object-cover"
            style={{ filter: "saturate(0.6) contrast(1.0) brightness(0.65)" }}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/45" aria-hidden="true" />

      <div className="relative z-10 flex h-full flex-col justify-between px-8 py-10 md:flex-row md:items-center md:justify-between md:px-12 md:py-14 [@media(max-height:640px)_and_(max-width:767px)]:px-6 [@media(max-height:640px)_and_(max-width:767px)]:py-6">
        <div className="w-full max-w-sm shrink-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">What NGHI Offers</p>
          <div className="relative mt-4 min-h-[12rem] sm:min-h-[11rem] [@media(max-height:640px)_and_(max-width:767px)]:mt-2.5 [@media(max-height:640px)_and_(max-width:767px)]:min-h-[8.75rem]">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={`absolute inset-0 transition-all duration-500 ${
                  i === activeIndex ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
              >
                <h2 className="text-2xl font-medium leading-tight tracking-[-0.01em] text-white sm:text-3xl [@media(max-height:640px)_and_(max-width:767px)]:text-xl">
                  {step.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/75 [@media(max-height:640px)_and_(max-width:767px)]:mt-2 [@media(max-height:640px)_and_(max-width:767px)]:text-[13.5px] [@media(max-height:640px)_and_(max-width:767px)]:leading-snug">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex shrink-0 flex-col items-start gap-5 md:mt-0 md:items-end [@media(max-height:640px)_and_(max-width:767px)]:mt-4 [@media(max-height:640px)_and_(max-width:767px)]:gap-2.5">
          {steps.map((step, i) => (
            <div key={step.title} className="flex items-center gap-3">
              <span
                className={`h-px w-6 shrink-0 transition-colors duration-300 max-[359px]:w-4 ${i === activeIndex ? "bg-white" : "bg-white/20"}`}
                aria-hidden="true"
              />
              <span
                className={`whitespace-nowrap text-sm transition-colors duration-300 max-[359px]:text-[13px] ${i === activeIndex ? "text-white" : "text-white/40"}`}
              >
                {step.title}
              </span>
              <span
                className={`tnum text-sm transition-colors duration-300 ${i === activeIndex ? "text-white" : "text-white/40"}`}
              >
                {step.index}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StoryScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useIsReducedMotion();
  const lenis = useLenis();

  useEffect(() => {
    if (reducedMotion) return;

    const evaluate = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      // Also true when the pinned wrapper is `display: none` on very short
      // screens (zero-size rect) — the stacked list renders there instead.
      if (scrollable <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const idx = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setActiveIndex(idx);
    };

    evaluate();
    // Native scroll covers touch devices, where Lenis leaves scrolling to the browser.
    window.addEventListener("scroll", evaluate, { passive: true });
    window.addEventListener("resize", evaluate);
    lenis?.on("scroll", evaluate);
    return () => {
      window.removeEventListener("scroll", evaluate);
      window.removeEventListener("resize", evaluate);
      lenis?.off("scroll", evaluate);
    };
  }, [lenis, reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="v4-scope bg-white py-16">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-3 md:px-5 xl:px-6">
          {steps.map((step, i) => (
            <Card key={step.title} activeIndex={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Pinned on every screen size: the card sticks while the section scrolls
       * past, and the active step follows scroll progress. Phones get a much
       * shorter section (about one swipe per step) and the card is pinned under
       * the fixed mobile header. Only very short viewports — a phone held
       * sideways — can't fit the card, so they fall back to the stacked list.
       * Both variants render unconditionally and are toggled with CSS (not
       * JS/viewport state) so there's no post-mount layout shift to desync
       * GSAP ScrollTrigger on the sections below this one. */}
      <section
        ref={sectionRef}
        className="v4-scope h-[340svh] bg-white lg:h-[640vh] [@media(max-height:559px)]:hidden"
      >
        <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-center sm:top-0 sm:h-[100svh]">
          <div className="mx-auto w-full max-w-[1600px] px-3 md:px-5 xl:px-6">
            <Card activeIndex={activeIndex} pinned />
          </div>
        </div>
      </section>
      <section className="v4-scope hidden bg-white py-16 [@media(max-height:559px)]:block">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-3 md:px-5 xl:px-6">
          {steps.map((step, i) => (
            <Card key={step.title} activeIndex={i} />
          ))}
        </div>
      </section>
    </>
  );
}
