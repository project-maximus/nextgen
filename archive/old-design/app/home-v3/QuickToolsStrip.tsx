"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { motion, type Variants } from "framer-motion";
import {
  Bot,
  CalendarCheck,
  ClipboardCheck,
  Layers,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const checklist = [
  "Full-length mock certification exams",
  "Spaced-repetition flashcards for every module",
  "An AI tutor you can ask anything, any hour",
  "A readiness score before you ever sit test day",
];

const tools = [
  { label: "Mock Exam", icon: ClipboardCheck, tone: "navy" as const },
  { label: "Flashcards", icon: Layers, tone: "gold" as const },
  { label: "AI Tutor", icon: Bot, tone: "gold" as const },
  { label: "Study Plan", icon: CalendarCheck, tone: "navy" as const },
  { label: "Readiness", icon: TrendingUp, tone: "navy" as const },
  { label: "Progress", icon: Sparkles, tone: "gold" as const },
];

const toneClasses = {
  navy: "bg-navy text-canvas",
  gold: "bg-gold text-navy",
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const tileIn: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: EASE_OUT_EXPO } },
};

export function QuickToolsStrip() {
  const reducedMotion = useIsReducedMotion();

  return (
    <section className="bg-navy-deep py-16 md:py-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <Reveal>
          <p className="text-eyebrow uppercase text-gold">NGHI Prep, free with every program</p>
          <h2 className="mt-2 max-w-md text-h2 font-display text-canvas">
            Everything you need, minus the guesswork.
          </h2>
          <ul className="mt-8 flex flex-col gap-5">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-3 text-body-lg text-navy-soft">
                <Sparkles className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, rotate: -1 }}
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: reducedMotion ? 0.01 : 0.5, ease: EASE_OUT_EXPO }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="rounded-[28px] border border-white/10 bg-canvas p-5 shadow-2xl sm:p-6">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-gold">
                N
              </span>
              <p className="font-display text-base font-semibold text-navy">Hi, future CCMA 👋</p>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-2.5 text-body-sm text-primary-700/60">
              <Search className="size-4" aria-hidden="true" />
              Search NGHI Prep tools&hellip;
            </div>
            <motion.div
              className="mt-4 grid grid-cols-3 gap-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              variants={stagger}
            >
              {tools.map((tool) => (
                <motion.div
                  key={tool.label}
                  variants={tileIn}
                  animate={
                    reducedMotion
                      ? undefined
                      : { y: [0, -3, 0], transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" } }
                  }
                  className="flex flex-col items-center gap-2 rounded-2xl border border-navy/5 bg-white p-3 text-center shadow-sm"
                >
                  <span className={`flex size-9 items-center justify-center rounded-xl ${toneClasses[tool.tone]}`}>
                    <tool.icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold leading-tight text-navy">{tool.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0.01 : 0.4, delay: reducedMotion ? 0 : 0.4, ease: EASE_OUT_EXPO }}
            className="absolute -right-4 -top-4 flex items-center gap-1.5 rounded-full border-4 border-navy-deep bg-gold px-3 py-1.5 text-xs font-bold text-navy shadow-lg sm:-right-6"
          >
            <Sparkles className="size-3.5" aria-hidden="true" />
            Free with enrollment
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
