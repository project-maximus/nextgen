"use client";

import { Reveal } from "@/components/motion/Reveal";
import { StickerImage } from "@/components/decor/StickerImage";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { CheckCircle2, Flame, GraduationCap, Sparkles } from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const trainingPoints = [
  "On-campus skills lab with real clinical equipment",
  "Small class sizes — instructors know your name",
  "A supervised externship before you graduate",
];

const prepPoints = [
  "A study plan that adapts to your program and start date",
  "Full-length mock exams that match your real certification test",
  "Free for every student — no extra cost, no catch",
];

function StudyPlanMockup() {
  const reducedMotion = useIsReducedMotion();
  return (
    <div className="relative mx-auto w-full max-w-sm rounded-[24px] border border-navy/10 bg-white p-6 shadow-lg">
      <div className="flex items-center gap-2 text-body-sm font-semibold text-navy">
        <GraduationCap className="size-4 text-gold-deep" aria-hidden="true" />
        Your study plan — Week 8 of 12
      </div>
      <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-navy-soft">
        <motion.div
          className="h-2.5 rounded-full bg-gold"
          initial={{ width: reducedMotion ? "68%" : "0%" }}
          whileInView={{ width: "68%" }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.8, delay: 0.2, ease: EASE_OUT_EXPO }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-body-sm">
        <span className="text-primary-700">Exam readiness</span>
        <span className="font-semibold text-navy">92%</span>
      </div>
      <div className="mt-5 flex items-center gap-2 rounded-xl bg-navy-soft px-3 py-2.5 text-body-sm font-medium text-navy">
        <CheckCircle2 className="size-4 shrink-0 text-navy" aria-hidden="true" />
        Mock exam #3 passed
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
        viewport={{ once: true }}
        transition={{ duration: reducedMotion ? 0.01 : 0.4, delay: reducedMotion ? 0 : 0.4, ease: EASE_OUT_EXPO }}
        animate={
          reducedMotion
            ? undefined
            : { rotate: [-6, -2, -6], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
        }
        className="absolute -right-4 -top-4 flex size-14 items-center justify-center rounded-2xl border-4 border-canvas bg-navy shadow-lg"
      >
        <Flame className="size-6 text-gold" aria-hidden="true" />
      </motion.div>
    </div>
  );
}

export function SplitFeaturePanels() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[40px] border border-navy/10 shadow-lg shadow-navy/5">
          {/* Panel 1 — hands-on training, photo left */}
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-10 bg-navy-soft/50 p-8 lg:grid-cols-2 lg:gap-14 lg:p-14">
              <div className="relative mx-auto w-full max-w-md">
                <StickerImage
                  src="/images/hero-v1/strip-5.jpg"
                  alt="An instructor guiding a student's hands with a stethoscope in NGHI's skills lab"
                  sizes="(max-width: 1024px) 90vw, 480px"
                  rotate={1.5}
                  className="aspect-[4/3] w-full"
                />
                <div className="absolute -bottom-5 -right-3 rounded-2xl border-4 border-canvas bg-navy px-4 py-2.5 shadow-lg sm:-right-6">
                  <p className="font-display text-xl font-bold text-gold">220+</p>
                  <p className="text-[11px] font-semibold text-navy-soft">hours of hands-on lab time</p>
                </div>
              </div>
              <div>
                <p className="text-eyebrow uppercase text-gold-deep">Hands-on training</p>
                <h3 className="mt-2 text-h2 font-display text-navy">
                  Train in a real clinical lab, not just a classroom.
                </h3>
                <ul className="mt-6 flex flex-col gap-4">
                  {trainingPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-body text-primary-700">
                      <Sparkles className="mt-1 size-4 shrink-0 text-gold-deep" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <Button href="/programs" variant="secondary" className="mt-7 border-navy/15 text-navy">
                  See how training works
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Panel 2 — NGHI Prep platform, mockup right */}
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-10 bg-navy p-8 lg:grid-cols-2 lg:gap-14 lg:p-14">
              <div className="order-2 lg:order-1">
                <p className="text-eyebrow uppercase text-gold">NGHI Prep platform</p>
                <h3 className="mt-2 text-h2 font-display text-canvas">
                  Study smarter with a plan built around you.
                </h3>
                <ul className="mt-6 flex flex-col gap-4">
                  {prepPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-body text-navy-soft">
                      <Sparkles className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <Button
                  href="/how-it-works/apply"
                  className="mt-7 bg-gold text-navy hover:bg-gold-deep"
                >
                  See what&apos;s included
                </Button>
              </div>
              <div className="order-1 lg:order-2">
                <StudyPlanMockup />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
