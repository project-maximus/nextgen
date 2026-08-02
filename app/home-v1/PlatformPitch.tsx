"use client";

import { Button } from "@/components/ui/Button";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Flame,
  GraduationCap,
  Headphones,
  Layers,
  Lock,
  Play,
  ShieldCheck,
  User,
} from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const viewport = { once: true, margin: "0px 0px -10% 0px" };

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const popIn: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE_OUT_EXPO } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT_EXPO } },
};

function MockExamIllustration() {
  const reducedMotion = useIsReducedMotion();
  return (
    <motion.div
      className="relative mt-8 flex h-40 items-end justify-center"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={stagger}
    >
      <svg
        viewBox="0 0 200 90"
        className="absolute inset-x-0 top-0 h-full w-full text-neutral-200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {["M40 12 L100 78", "M100 12 L100 78", "M160 12 L100 78"].map((d) => (
          <motion.path
            key={d}
            d={d}
            stroke="currentColor"
            strokeWidth="1.5"
            initial={{ pathLength: reducedMotion ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={viewport}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.2, ease: EASE_OUT_EXPO }}
          />
        ))}
      </svg>
      <div className="absolute inset-x-0 top-0 flex justify-center gap-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            variants={popIn}
            className="flex size-14 items-center justify-center rounded-full border-4 border-white bg-navy text-white shadow-sm"
          >
            <User className="size-6" aria-hidden="true" />
          </motion.div>
        ))}
      </div>
      <motion.div
        variants={popIn}
        className="relative z-10 flex items-center gap-2 rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white"
      >
        <CheckCircle2 className="size-4" aria-hidden="true" />
        Mock Exam Passed
      </motion.div>
    </motion.div>
  );
}

function StudyPlanIllustration() {
  const reducedMotion = useIsReducedMotion();
  return (
    <motion.div className="relative mt-6 h-48" initial="hidden" whileInView="show" viewport={viewport} variants={stagger}>
      <motion.div
        variants={fadeUp}
        className="absolute right-0 top-0 w-64 max-w-full rounded-lg border border-neutral-200 bg-white p-4 shadow-sm"
      >
        <div className="flex items-center gap-2 text-sm font-medium text-neutral-900">
          <GraduationCap className="size-4 text-navy" aria-hidden="true" />
          Study Plan
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-neutral-100">
          <motion.div
            className="h-2 rounded-full bg-navy"
            initial={{ width: reducedMotion ? "75%" : "0%" }}
            whileInView={{ width: "75%" }}
            viewport={viewport}
            transition={{ duration: reducedMotion ? 0 : 0.8, delay: 0.3, ease: EASE_OUT_EXPO }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-neutral-500">Readiness</span>
          <span className="font-medium text-neutral-900">92%</span>
        </div>
      </motion.div>
      <motion.div
        variants={popIn}
        className="absolute bottom-0 left-2 flex size-14 items-center justify-center rounded-lg bg-navy shadow-sm"
      >
        <Flame className="size-6 text-white" aria-hidden="true" />
      </motion.div>
    </motion.div>
  );
}

function FlashcardsIllustration() {
  const reducedMotion = useIsReducedMotion();
  const satellites = [
    { x: 20, y: 20 },
    { x: 100, y: 8 },
    { x: 180, y: 20 },
    { x: 20, y: 90 },
    { x: 100, y: 102 },
    { x: 180, y: 90 },
  ];
  return (
    <div className="relative mt-5 h-28">
      <svg viewBox="0 0 200 110" className="absolute inset-0 size-full" aria-hidden="true">
        {satellites.map((s, i) => (
          <motion.line
            key={i}
            x1="100"
            y1="55"
            x2={s.x}
            y2={s.y}
            stroke="var(--color-neutral-300)"
            strokeWidth="1.5"
            initial={{ pathLength: reducedMotion ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={viewport}
            transition={{ duration: reducedMotion ? 0 : 0.5, delay: 0.1 + i * 0.05, ease: EASE_OUT_EXPO }}
          />
        ))}
        {satellites.map((s, i) => (
          <motion.circle
            key={i}
            cx={s.x}
            cy={s.y}
            r="6"
            fill="var(--color-neutral-200)"
            initial={{ opacity: reducedMotion ? 1 : 0, scale: reducedMotion ? 1 : 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration: reducedMotion ? 0 : 0.3, delay: 0.3 + i * 0.05, ease: EASE_OUT_EXPO }}
            style={{ transformOrigin: `${s.x}px ${s.y}px` }}
          />
        ))}
      </svg>
      <motion.div
        initial={{ opacity: reducedMotion ? 1 : 0, scale: reducedMotion ? 1 : 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewport}
        transition={{ duration: reducedMotion ? 0 : 0.4, ease: EASE_OUT_EXPO }}
        className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-navy shadow-sm"
      >
        <Layers className="size-5 text-white" aria-hidden="true" />
      </motion.div>
    </div>
  );
}

function LessonsIllustration() {
  const reducedMotion = useIsReducedMotion();
  return (
    <motion.div className="relative mt-5 pb-4" initial="hidden" whileInView="show" viewport={viewport} variants={stagger}>
      <motion.div variants={fadeUp} className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2.5">
        <Play className="size-4 shrink-0 text-neutral-400" aria-hidden="true" />
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
          <motion.div
            className="h-2 rounded-full bg-neutral-400"
            initial={{ width: reducedMotion ? "40%" : "0%" }}
            whileInView={{ width: "40%" }}
            viewport={viewport}
            transition={{ duration: reducedMotion ? 0 : 0.7, delay: 0.3, ease: EASE_OUT_EXPO }}
          />
        </div>
        <span className="shrink-0 text-sm font-medium text-neutral-400">12:04</span>
      </motion.div>
      <motion.div variants={popIn} className="absolute -bottom-1 left-3 flex size-9 items-center justify-center rounded-md bg-navy shadow-sm">
        <Headphones className="size-4 text-white" aria-hidden="true" />
      </motion.div>
    </motion.div>
  );
}

function ReadinessIllustration() {
  return (
    <motion.div className="relative mt-5 pb-4" initial="hidden" whileInView="show" viewport={viewport} variants={stagger}>
      <motion.div variants={fadeUp} className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-4">
        <ShieldCheck className="size-7 text-navy" aria-hidden="true" />
        <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-neutral-700">
          <motion.span
            className="size-1.5 rounded-full bg-neutral-900"
            animate={{ opacity: [1, 0.3, 1], transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
          />
          On Track
        </span>
      </motion.div>
      <motion.div variants={popIn} className="absolute -bottom-1 right-3 flex size-9 items-center justify-center rounded-full bg-navy shadow-sm">
        <Lock className="size-4 text-white" aria-hidden="true" />
      </motion.div>
    </motion.div>
  );
}

function CommunityIllustration() {
  return (
    <motion.div className="mt-5 flex items-center gap-3" initial="hidden" whileInView="show" viewport={viewport} variants={stagger}>
      <div className="flex -space-x-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            variants={popIn}
            className="flex size-9 items-center justify-center rounded-full border-2 border-white bg-neutral-100 text-neutral-500 shadow-sm"
          >
            <User className="size-4" aria-hidden="true" />
          </motion.div>
        ))}
      </div>
      <motion.span variants={popIn} className="rounded-full border border-neutral-200 px-2.5 py-1 text-sm font-medium text-neutral-700">
        +2,400 students
      </motion.span>
    </motion.div>
  );
}

const standardFeatures = [
  {
    title: "Digital flashcards",
    description: "Spaced-repetition flashcards for the terms and techniques you'll actually be tested on.",
    illustration: <FlashcardsIllustration />,
    border: "border-r border-b border-neutral-200 lg:border-b-0",
  },
  {
    title: "Video & audio lessons",
    description: "Instructor-recorded lessons you can study between shifts, during a commute, anywhere.",
    illustration: <LessonsIllustration />,
    border: "border-b border-neutral-200 lg:border-b-0 lg:border-r",
  },
  {
    title: "Readiness tracking",
    description: "See your exam readiness score before you ever sit the real thing.",
    illustration: <ReadinessIllustration />,
    border: "border-r border-neutral-200",
  },
  {
    title: "Student community",
    description: "Connect with classmates and recent graduates who've already passed your exam.",
    illustration: <CommunityIllustration />,
    border: "",
  },
];

export function PlatformPitch() {
  return (
    <section className="bg-neutral-50 py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-navy">Introducing NGHI Prep</p>
          <h2 className="text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
            Your certification exam, mastered before test day.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-600">
            Free with every program — mock exams, flashcards, and video lessons from your instructors.
          </p>
          <Link href="/how-it-works/apply" className="inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-navy-deep">
            See what&apos;s included
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="grid grid-cols-1 border-b border-neutral-200 lg:grid-cols-2">
            <div className="border-neutral-200 p-8 max-lg:border-b lg:border-r lg:p-10">
              <h3 className="text-xl font-semibold text-neutral-900">Mock certification exams</h3>
              <p className="mt-2 max-w-sm text-sm text-neutral-600">
                Full-length practice tests that match your program&apos;s real exam format — CCMA, CPT, CET, and
                more.
              </p>
              <MockExamIllustration />
            </div>
            <div className="p-8 lg:p-10">
              <h3 className="text-xl font-semibold text-neutral-900">Adaptive study plan</h3>
              <p className="mt-2 max-w-sm text-sm text-neutral-600">
                A study schedule that adjusts to your program, your start date, and your weak spots.
              </p>
              <StudyPlanIllustration />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4">
            {standardFeatures.map((feature) => (
              <div key={feature.title} className={`p-6 ${feature.border}`}>
                <h3 className="text-base font-semibold text-neutral-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{feature.description}</p>
                {feature.illustration}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-4 rounded-2xl border border-navy bg-navy px-8 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-lg font-semibold text-white">Included free with every program.</p>
            <p className="mt-1 text-sm text-white/70">No extra cost — it&apos;s part of your enrollment.</p>
          </div>
          <Button
            href="/how-it-works/apply"
            size="lg"
            variant="secondary"
            className="shrink-0 border-white bg-transparent text-white hover:bg-white/10"
            iconRight={<ArrowRight className="size-4" />}
          >
            See how it works
          </Button>
        </div>
      </div>
    </section>
  );
}
