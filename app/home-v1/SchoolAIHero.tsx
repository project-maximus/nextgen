"use client";

import { Button } from "@/components/ui/Button";
import { VerticalMarquee } from "@/components/motion/VerticalMarquee";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const stripColumns = [
  {
    images: ["/images/hero-v1/strip-1.jpg", "/images/hero-v1/strip-2.jpg"],
    direction: "up" as const,
    duration: 32,
  },
  {
    images: ["/images/hero-v1/strip-6.jpg", "/images/hero-v1/strip-5.jpg"],
    direction: "down" as const,
    duration: 26,
  },
  {
    images: ["/images/hero-v1/strip-9.jpg", "/images/hero-v1/strip-4.jpg"],
    direction: "up" as const,
    duration: 36,
  },
];

export function SchoolAIHero() {
  const reducedMotion = useIsReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="mx-auto grid max-w-[1280px] items-start gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-10 lg:px-10">
        {/* Left: copy */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.4, ease: EASE_OUT_EXPO }}
            className="max-w-xl text-5xl font-medium leading-[1.1] tracking-tight text-neutral-900 sm:text-6xl"
          >
            Healthcare training that connects you with <span className="text-navy">real careers</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.4, delay: reducedMotion ? 0 : 0.05, ease: EASE_OUT_EXPO }}
            className="mt-6 max-w-md text-lg leading-relaxed text-neutral-600"
          >
            See exactly what you&apos;ll learn, how long it takes, and what it costs — then talk to an advisor
            who actually answers the phone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.4, delay: reducedMotion ? 0 : 0.15, ease: EASE_OUT_EXPO }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button href="/contact?type=info" size="lg" iconRight={<ArrowRight className="size-4" />}>
              Request Information
            </Button>
            <Button href="/programs" size="lg" variant="secondary">
              View Programs
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.4, delay: reducedMotion ? 0 : 0.25 }}
            className="mt-12 flex items-center gap-6 border-t border-neutral-200 pt-6 text-sm text-neutral-500"
          >
            <span>AMCA-accredited</span>
            <span className="h-1 w-1 rounded-full bg-neutral-300" aria-hidden="true" />
            <span>11 programs</span>
            <span className="h-1 w-1 rounded-full bg-neutral-300" aria-hidden="true" />
            <span>Dallas–Fort Worth</span>
          </motion.div>
        </div>

        {/* Right: continuously scrolling healthcare photo strip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.6, delay: reducedMotion ? 0 : 0.1, ease: EASE_OUT_EXPO }}
          className="relative grid h-[420px] grid-cols-3 gap-4 sm:h-[480px] lg:h-[560px]"
        >
          {stripColumns.map((col, i) => (
            <VerticalMarquee
              key={i}
              images={col.images}
              direction={col.direction}
              durationSeconds={col.duration}
              ariaLabel={`Healthcare training photos, column ${i + 1}`}
              imageClassName="rounded-lg"
              tintOpacity={80}
            />
          ))}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
        </motion.div>
      </div>
      <div id="hero-sentinel" />
    </section>
  );
}
