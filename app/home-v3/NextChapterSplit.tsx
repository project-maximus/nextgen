"use client";

import { StickerImage } from "@/components/decor/StickerImage";
import { Doodle } from "@/components/decor/Doodle";
import { Reveal } from "@/components/motion/Reveal";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { formatCohortDate, getNextClassStart } from "@/content/dates";
import { motion } from "framer-motion";
import { CalendarCheck, CircleCheck, FileCheck2 } from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const notifications = [
  { icon: FileCheck2, label: "Application received", sub: "Reviewed within 24 hours" },
  { icon: CalendarCheck, label: "Advisor call scheduled", sub: "Pick a time that works" },
  { icon: CircleCheck, label: "Seat reserved", sub: "You're in the next cohort" },
];

export function NextChapterSplit() {
  const reducedMotion = useIsReducedMotion();
  const nextClassStart = getNextClassStart();

  return (
    <section className="overflow-hidden bg-navy-soft/60 py-16 md:py-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-5 md:px-8 lg:grid-cols-2 lg:px-10">
        <div>
          <p className="text-eyebrow uppercase text-gold-deep">Your journey</p>
          <h2 className="mt-2 max-w-md text-h2 font-display text-navy">
            From application to your first shift.
          </h2>
          <p className="mt-3 max-w-sm text-body-lg text-primary-700">
            Apply today and the next cohort starts {formatCohortDate(nextClassStart.startDate)}. Seats are
            limited every term.
          </p>
          <Button href="/how-it-works/apply" size="lg" className="mt-7">
            Apply Now
          </Button>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <Doodle
            name="star"
            variant={reducedMotion ? "static" : "float"}
            className="pointer-events-none absolute -right-6 -top-8 size-10 text-gold"
          />
          <StickerImage
            src="/images/hero-v1/strip-4.jpg"
            alt="Prospective NGHI students reviewing program materials together"
            sizes="(max-width: 1024px) 90vw, 480px"
            rotate={-1}
            className="aspect-[4/3] w-full"
          />

          <div className="mt-6 flex flex-col gap-3">
            {notifications.map((n, i) => (
              <motion.div
                key={n.label}
                initial={{ opacity: 0, x: reducedMotion ? 0 : -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: reducedMotion ? 0.01 : 0.4, delay: reducedMotion ? 0 : i * 0.12, ease: EASE_OUT_EXPO }}
                className="flex items-center gap-3 rounded-2xl border border-navy/10 bg-white px-4 py-3 shadow-md"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-navy-soft text-navy">
                  <n.icon className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-body-sm font-semibold text-navy">{n.label}</p>
                  <p className="text-xs text-primary-700">{n.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
