"use client";

import { Doodle } from "@/components/decor/Doodle";
import { Reveal } from "@/components/motion/Reveal";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { testimonials } from "@/content/testimonials";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const featured = testimonials.slice(0, 4);

const sparkles = [
  { top: "10%", left: "4%", size: 24 },
  { top: "72%", left: "8%", size: 18 },
  { top: "14%", left: "94%", size: 20 },
  { top: "80%", left: "92%", size: 26 },
] as const;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const cardIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT_EXPO } },
};

export function VoicesWall() {
  const reducedMotion = useIsReducedMotion();

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, rgba(232,191,52,0.16) 0%, transparent 60%), linear-gradient(180deg, var(--color-navy-deep) 0%, var(--color-navy) 100%)",
        }}
      />
      {sparkles.map((s, i) => (
        <Doodle
          key={i}
          name="star"
          variant={reducedMotion ? "static" : "float"}
          className="pointer-events-none absolute text-gold/60"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
        />
      ))}

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <p className="text-eyebrow uppercase text-gold">Real stories</p>
            <h2 className="mt-2 text-h2 font-display text-canvas">Why students choose NGHI</h2>
            <p className="mt-3 text-body-lg text-navy-soft">
              Hear from the graduates who trusted us with their next chapter.
            </p>
          </div>
        </Reveal>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          variants={stagger}
        >
          {featured.map((testimonial, i) => (
            <motion.div key={testimonial.id} variants={cardIn} className={i % 2 === 1 ? "sm:mt-6" : undefined}>
              <TestimonialCard testimonial={testimonial} variant="quote-only" className="h-full" />
            </motion.div>
          ))}
        </motion.div>

        <Reveal>
          <p className="mt-10 text-center">
            <Link
              href="/programs"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-5 py-2.5 text-body-sm font-semibold text-canvas hover:bg-white/10"
            >
              Read more student stories
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
