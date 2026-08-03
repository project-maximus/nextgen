"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { useLenis } from "@/components/motion-v4/SmoothScrollProvider";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const VH_PER_STEP = 160;

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

function Card({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-[32px] sm:h-[680px]">
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
            style={{ filter: "saturate(0.9) contrast(1.05)" }}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-black/10" aria-hidden="true" />

      <div className="relative z-10 flex h-full flex-col justify-between px-8 py-10 md:flex-row md:items-center md:justify-between md:px-12 md:py-14">
        <div className="w-full max-w-sm shrink-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">What NGHI Offers</p>
          <div className="relative mt-4 min-h-[12rem] sm:min-h-[11rem]">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={`absolute inset-0 transition-all duration-500 ${
                  i === activeIndex ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
              >
                <h2 className="text-2xl font-medium leading-tight tracking-[-0.01em] text-white sm:text-3xl">
                  {step.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/75">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex shrink-0 flex-col items-start gap-5 md:mt-0 md:items-end">
          {steps.map((step, i) => (
            <div key={step.title} className="flex items-center gap-3">
              <span
                className={`h-px w-6 transition-colors duration-300 ${i === activeIndex ? "bg-white" : "bg-white/20"}`}
                aria-hidden="true"
              />
              <span
                className={`text-sm transition-colors duration-300 ${i === activeIndex ? "text-white" : "text-white/40"}`}
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
      if (scrollable <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const idx = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setActiveIndex(idx);
    };

    evaluate();
    if (lenis) {
      lenis.on("scroll", evaluate);
      return () => lenis.off("scroll", evaluate);
    }
    window.addEventListener("scroll", evaluate, { passive: true });
    return () => window.removeEventListener("scroll", evaluate);
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
    <section ref={sectionRef} className="v4-scope bg-white" style={{ height: `${steps.length * VH_PER_STEP}vh` }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto w-full max-w-[1600px] px-3 md:px-5 xl:px-6">
          <Card activeIndex={activeIndex} />
        </div>
      </div>
    </section>
  );
}
