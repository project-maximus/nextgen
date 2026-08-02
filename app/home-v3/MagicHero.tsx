"use client";

import { Doodle } from "@/components/decor/Doodle";
import { StickerImage } from "@/components/decor/StickerImage";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Sparkles } from "lucide-react";
import type { CSSProperties } from "react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const sparkles = [
  { top: "8%", left: "6%", size: 34, delay: 0 },
  { top: "18%", left: "88%", size: 26, delay: 0.4 },
  { top: "62%", left: "3%", size: 22, delay: 0.8 },
  { top: "78%", left: "92%", size: 30, delay: 0.2 },
  { top: "42%", left: "94%", size: 18, delay: 1.1 },
] as const;

export function MagicHero() {
  const reducedMotion = useIsReducedMotion();

  return (
    <section className="relative overflow-hidden rounded-b-[48px] bg-navy-deep pb-20 pt-14 sm:rounded-b-[64px] md:pb-28 md:pt-20">
      {/* Gradient wash + warm glow, kept inside brand navy/gold rather than the inspo's literal purple/orange */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 15% 0%, rgba(232,191,52,0.22) 0%, transparent 55%), radial-gradient(90% 70% at 100% 100%, rgba(232,191,52,0.14) 0%, transparent 60%), linear-gradient(180deg, var(--color-navy-deep) 0%, var(--color-navy) 60%, var(--color-navy-deep) 100%)",
        }}
      />

      {sparkles.map((s, i) => (
        <Doodle
          key={i}
          name="star"
          variant={reducedMotion ? "static" : "float"}
          className="pointer-events-none absolute text-gold/70"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: `${s.delay}s` } as CSSProperties}
        />
      ))}

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.4, ease: EASE_OUT_EXPO }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-eyebrow uppercase text-canvas backdrop-blur-sm">
            <Sparkles className="size-3.5 text-gold" aria-hidden="true" />
            AMCA-accredited since {site.founded}
          </span>

          <h1 className="font-display-wonk mt-6 text-display-xl text-canvas">
            Find your <span className="text-gold">&ldquo;next chapter&rdquo;</span>
            <br />
            in healthcare.
          </h1>

          <p className="mt-5 max-w-xl text-body-lg text-navy-soft">
            Hands-on training, instructors who still work the job, and a free study platform built to get you
            certified — in weeks, not years.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              href="/how-it-works/apply"
              size="lg"
              className="gap-3 bg-gold pl-6 pr-2 text-navy hover:bg-gold-deep"
              iconRight={
                <span className="flex size-8 items-center justify-center rounded-full bg-navy/15">
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              }
            >
              Apply Now
            </Button>
            <Button
              href="/programs"
              size="lg"
              variant="ghost"
              className="gap-3 border border-white/25 pl-6 pr-2 text-canvas hover:bg-white/10"
              iconRight={
                <span className="flex size-8 items-center justify-center rounded-full bg-white/15">
                  <GraduationCap className="size-4" aria-hidden="true" />
                </span>
              }
            >
              Explore Programs
            </Button>
          </div>
        </motion.div>

        {/* Sticker collage: hero photo + two floating stat badges, magicschool-style */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.55, delay: reducedMotion ? 0 : 0.15, ease: EASE_OUT_EXPO }}
          className="relative mx-auto mt-14 max-w-2xl"
        >
          <StickerImage
            src="/images/hero-v1/strip-6.jpg"
            alt="A NextGen Health Institute instructor training a student with a stethoscope"
            sizes="(max-width: 768px) 90vw, 640px"
            rotate={-1.5}
            className="aspect-[16/10] w-full"
            priority
          />

          <motion.div
            initial={{ opacity: 0, y: 12, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -4 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.5, delay: reducedMotion ? 0 : 0.5, ease: EASE_OUT_EXPO }}
            className="absolute -bottom-6 -left-4 rounded-2xl border-4 border-canvas bg-gold px-5 py-3 shadow-lg sm:-left-8"
          >
            <p className="font-display text-2xl font-bold text-navy">95%+</p>
            <p className="text-xs font-semibold text-navy/70">graduate employment rate</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -12, rotate: 6 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.5, delay: reducedMotion ? 0 : 0.65, ease: EASE_OUT_EXPO }}
            className="absolute -right-3 -top-6 rounded-2xl border-4 border-canvas bg-navy px-5 py-3 shadow-lg sm:-right-8"
          >
            <p className="font-display text-2xl font-bold text-gold">11</p>
            <p className="text-xs font-semibold text-navy-soft">accredited programs</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
