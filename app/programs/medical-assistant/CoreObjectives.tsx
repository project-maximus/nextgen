"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import type { Program } from "@/types";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  ClipboardCheck,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Syringe,
  type LucideIcon,
} from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const viewport = { once: true, margin: "0px 0px -10% 0px" };

const cardIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT_EXPO } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

interface ObjectiveCard {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tag: string;
  tagIcon: LucideIcon;
  gridArea: string;
}

export function CoreObjectives({ program }: { program: Program }) {
  const reducedMotion = useIsReducedMotion();
  const outcomes = program.curriculum[0]?.outcomes ?? [];

  const cards: ObjectiveCard[] = [
    {
      number: "01",
      title: "Medical Foundations",
      description: outcomes[0] ?? "Medical terminology, anatomy, and patient care.",
      icon: Stethoscope,
      tag: "Knowledge for real-world care",
      tagIcon: BookOpen,
      gridArea: "md:col-start-1 md:row-start-1 md:row-span-2",
    },
    {
      number: "02",
      title: "Clinical & Administrative Skills",
      description: outcomes[1] ?? "Clinical and administrative skills.",
      icon: ClipboardCheck,
      tag: "Organize. Communicate. Care.",
      tagIcon: ClipboardCheck,
      gridArea: "md:col-start-2 md:row-start-1",
    },
    {
      number: "03",
      title: "Hands-On Clinical Skills",
      description: "Practice vital signs, injections, and EKGs with confidence in real-world simulations and labs.",
      icon: Syringe,
      tag: "Practice. Perform. Prepare.",
      tagIcon: Syringe,
      gridArea: "md:col-start-3 md:row-start-1",
    },
    {
      number: "04",
      title: "Diagnostics & Procedures",
      description: outcomes[2] ?? "Phlebotomy, orthopedic casting, and diagnostic testing.",
      icon: FlaskConical,
      tag: "Accurate. Safe. Effective.",
      tagIcon: FlaskConical,
      gridArea: "md:col-start-2 md:row-start-2",
    },
    {
      number: "05",
      title: "Patient Safety & Infection Control",
      description: "Apply best practices for sterilization and infection control on every shift.",
      icon: ShieldCheck,
      tag: "Safety. Hygiene. Trust.",
      tagIcon: ShieldCheck,
      gridArea: "md:col-start-3 md:row-start-2",
    },
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-navy">Curriculum</p>
            <h2 className="text-h2 font-medium tracking-tight text-neutral-900">Core Learning Objectives</h2>
            <p className="text-lg leading-relaxed text-neutral-600">
              Upon completion of this program, students will be able to{" "}
              <span className="font-semibold text-neutral-900">
                apply essential clinical skills and knowledge with confidence.
              </span>
            </p>
          </div>
        </Reveal>

        <motion.div
          initial={reducedMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={viewport}
          variants={stagger}
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2"
        >
          {cards.map((card) => (
            <motion.div
              key={card.number}
              variants={cardIn}
              className={`relative flex min-h-[220px] flex-col rounded-2xl border border-neutral-200 p-6 transition-colors duration-200 hover:border-neutral-300 ${card.gridArea}`}
            >
              <div className="flex items-start justify-between">
                <card.icon className="size-6 text-navy" aria-hidden="true" />
                <span className="text-sm font-semibold text-neutral-400">{card.number}</span>
              </div>

              <h3 className="mt-5 text-h4 font-semibold text-neutral-900">{card.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{card.description}</p>

              <span className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-700">
                <card.tagIcon className="size-3.5 text-navy" aria-hidden="true" />
                {card.tag}
              </span>
            </motion.div>
          ))}

          <motion.div
            variants={cardIn}
            className="relative flex min-h-[220px] flex-col rounded-2xl bg-navy p-6 md:col-start-4 md:row-start-1 md:row-span-2"
          >
            <Award className="size-6 text-white" aria-hidden="true" />
            <h3 className="mt-5 text-h4 font-semibold text-white">Career-Ready Certifications</h3>
            <p className="mt-2 text-sm text-white/70">
              Prepare for industry-recognized certifications and boost your employability.
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <div className="flex items-center gap-3 rounded-xl border border-white/15 p-3">
                <ShieldCheck className="size-5 shrink-0 text-white" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-white">CMA (Certified Medical Assistant)</p>
                  <p className="text-[11px] text-white/60">Certification Prep</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/15 p-3">
                <Award className="size-5 shrink-0 text-white" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-white">RMA (Registered Medical Assistant)</p>
                  <p className="text-[11px] text-white/60">Certification Prep</p>
                </div>
              </div>
            </div>

            <Button
              href={`/how-it-works/apply?program=${program.slug}`}
              variant="secondary"
              className="mt-6 w-full justify-center border-white bg-transparent text-white hover:bg-white/10"
              iconRight={<ArrowRight className="size-4" />}
            >
              Advance Your Career
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
