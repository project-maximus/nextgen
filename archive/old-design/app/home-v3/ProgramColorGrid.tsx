"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { programs } from "@/content/programs";
import { motion, type Variants } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Bone,
  Brain,
  Calculator,
  ClipboardList,
  Dumbbell,
  HandHeart,
  HeartPulse,
  Scan,
  Stethoscope,
  Syringe,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const iconBySlug: Record<string, LucideIcon> = {
  "medical-assistant": Stethoscope,
  "nursing-assistant": HeartPulse,
  "phlebotomy-technician": Syringe,
  "ekg-technician": Activity,
  "patient-care-technician": HandHeart,
  "mri-technician": Scan,
  "medical-administrative-assistant": ClipboardList,
  "medical-billing-coding": Calculator,
  "mental-health-technician": Brain,
  "orthopedic-casting": Bone,
  "physical-therapy-aide": Dumbbell,
};

type Tone = "light" | "navy" | "gold";
const toneSequence: Tone[] = ["light", "navy", "gold"];

const toneClasses: Record<Tone, string> = {
  light: "bg-white text-navy border border-navy/10",
  navy: "bg-navy text-canvas border border-navy",
  gold: "bg-gold text-navy border border-gold-deep",
};
const toneChip: Record<Tone, string> = {
  light: "bg-navy-soft text-navy",
  navy: "bg-white/10 text-gold",
  gold: "bg-navy text-gold",
};
const toneBody: Record<Tone, string> = {
  light: "text-primary-700",
  navy: "text-navy-soft",
  gold: "text-navy/70",
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const cardIn: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE_OUT_EXPO } },
};

export function ProgramColorGrid() {
  const reducedMotion = useIsReducedMotion();

  return (
    <section className="bg-gold-soft py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
            <p className="text-eyebrow uppercase text-gold-deep">11 accredited programs</p>
            <h2 className="text-h2 font-display text-navy">A career path for every kind of healer</h2>
            <p className="text-body-lg text-primary-700">
              From clinical hands-on work to admin and billing — find the program that fits the career you want.
            </p>
          </div>
        </Reveal>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          variants={stagger}
        >
          {programs.map((program, i) => {
            const Icon = iconBySlug[program.slug] ?? Stethoscope;
            const tone = toneSequence[i % toneSequence.length];
            return (
              <motion.div key={program.slug} variants={cardIn}>
                <Link
                  href={`/programs/${program.slug}`}
                  className={`group flex h-full flex-col gap-3 rounded-[24px] p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md ${toneClasses[tone]}`}
                >
                  <div className="flex items-start justify-between">
                    <span className={`flex size-11 items-center justify-center rounded-2xl ${toneChip[tone]}`}>
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <ArrowRight
                      className={`size-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 ${
                        tone === "gold" ? "text-navy" : tone === "navy" ? "text-gold" : "text-gold-deep"
                      } ${reducedMotion ? "opacity-100 translate-x-0" : ""}`}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-body font-semibold">{program.name}</h3>
                    <p className={`mt-1 text-body-sm ${toneBody[tone]}`}>{program.credential}</p>
                  </div>
                  <p className={`mt-auto pt-2 text-xs font-semibold uppercase tracking-wide ${toneBody[tone]}`}>
                    {program.duration.split(" or ")[0]}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <Reveal>
          <p className="mt-10 text-center">
            <Link
              href="/programs"
              className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-navy hover:text-gold-deep"
            >
              See all 11 programs
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
