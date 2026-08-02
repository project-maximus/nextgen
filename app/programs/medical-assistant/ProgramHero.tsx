"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import type { Program } from "@/types";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CalendarClock,
  HandHeart,
  HeartPulse,
  ShieldCheck,
  TrendingUp,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const bottomFeatures = [
  {
    icon: ShieldCheck,
    title: "Accredited Program",
    description: "AMCA-accredited curriculum you can trust.",
  },
  {
    icon: UserRound,
    title: "Expert Instructors",
    description: "Learn from professionals working in the field.",
  },
  {
    icon: BookOpen,
    title: "Modern Curriculum",
    description: "Hands-on training aligned with today's clinics.",
  },
  {
    icon: Award,
    title: "Certification Prep",
    description: "Built-in CMA & RMA exam preparation.",
  },
];

export function ProgramHero({ program }: { program: Program }) {
  const reducedMotion = useIsReducedMotion();
  const quickFacts = [
    {
      icon: CalendarClock,
      value: `${program.durationWeeks[0]}–${program.durationWeeks[1]} Weeks`,
      label: "Program Length",
    },
    { icon: HandHeart, value: "Hybrid", label: "Format" },
    { icon: TrendingUp, value: "Beginner", label: "Friendly" },
    { icon: ShieldCheck, value: program.certification.body, label: "Accredited" },
  ];

  const floatingCards = [
    {
      icon: HeartPulse,
      title: "Hands-On Training",
      description: "Practice in real clinical simulations.",
      position: "left-0 top-4 -translate-x-4 sm:-translate-x-8",
    },
    {
      icon: Briefcase,
      title: "Career Support",
      description: "Resume help, interview prep, and more.",
      position: "right-0 bottom-24 translate-x-4 sm:translate-x-8",
    },
  ];

  return (
    <section className="bg-white pb-0 pt-8 md:pt-10">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <Link
          href="/programs"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 hover:text-navy"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All Programs
        </Link>

        <div className="mt-6 grid grid-cols-1 items-center gap-10 pb-16 lg:grid-cols-[1fr_1.15fr] lg:gap-14 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.4, ease: EASE_OUT_EXPO }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-1.5 text-sm font-medium text-navy">
              <HeartPulse className="size-4" aria-hidden="true" />
              Healthcare Program
            </span>
            <h1 className="mt-4 text-display-lg font-medium tracking-tight text-neutral-900">{program.name}</h1>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-neutral-600">{program.blurb}</p>

            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="flex items-start gap-2.5">
                  <fact.icon className="mt-0.5 size-4 shrink-0 text-navy" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium leading-tight text-neutral-900">{fact.value}</p>
                    <p className="text-xs text-neutral-500">{fact.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                href={`/how-it-works/apply?program=${program.slug}`}
                size="lg"
                iconRight={<ArrowRight className="size-4" />}
              >
                Apply Now
              </Button>
              <Button href={`/contact?type=info&program=${program.slug}`} size="lg" variant="secondary">
                Request Info
              </Button>
            </div>

            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-neutral-200 px-4 py-3">
              <div className="flex -space-x-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="flex size-9 items-center justify-center rounded-full border-2 border-white bg-navy text-white"
                  >
                    <UserRound className="size-4" aria-hidden="true" />
                  </span>
                ))}
              </div>
              <p className="text-sm text-neutral-700">
                <span className="font-semibold text-neutral-900">{program.outlook.employmentRate}</span> of
                graduates find employment.
              </p>
            </div>
          </motion.div>

          <div className="relative mx-auto w-full max-w-lg px-4 py-6 sm:px-8 lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reducedMotion ? 0.01 : 0.5, delay: reducedMotion ? 0 : 0.1, ease: EASE_OUT_EXPO }}
              className="relative aspect-[6/5] w-full overflow-hidden rounded-2xl shadow-xl"
            >
              <Image
                src="/images/programs/medical-assistant-portrait.jpg"
                alt="A confident healthcare professional in a clinical setting"
                fill
                sizes="(max-width: 1024px) 90vw, 640px"
                className="object-cover"
                priority
              />
            </motion.div>

            {floatingCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: reducedMotion ? 0.01 : 0.4,
                  delay: reducedMotion ? 0 : 0.65 + i * 0.15,
                  ease: EASE_OUT_EXPO,
                }}
                className={`absolute hidden w-40 rounded-xl border border-neutral-200 bg-white p-3 shadow-lg sm:block ${card.position}`}
              >
                <card.icon className="size-4 text-navy" aria-hidden="true" />
                <p className="mt-2 text-xs font-semibold text-neutral-900">{card.title}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-neutral-600">{card.description}</p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: reducedMotion ? 0.01 : 0.4, delay: reducedMotion ? 0 : 0.55, ease: EASE_OUT_EXPO }}
              className="absolute bottom-2 right-2 rounded-xl bg-navy px-4 py-2.5 shadow-lg sm:bottom-6 sm:right-2"
            >
              <p className="text-lg font-semibold text-white">{program.outlook.employmentRate}</p>
              <p className="text-[10px] font-medium text-white/70">Employment Rate</p>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-neutral-200 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {bottomFeatures.map((feature) => (
            <div key={feature.title} className="flex items-start gap-3">
              <feature.icon className="mt-0.5 size-5 shrink-0 text-navy" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-neutral-900">{feature.title}</p>
                <p className="mt-0.5 text-xs text-neutral-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
