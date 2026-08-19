"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { useEffect, useState, type ReactNode } from "react";

export type Tone = "dark" | "light";

export const toneStyles: Record<Tone, { bg: string; title: string; subtitle: string; glow: string }> = {
  dark: {
    bg: "bg-[var(--color-v4-ink-900)]",
    title: "text-white",
    subtitle: "text-white/65",
    glow: "bg-[radial-gradient(70%_55%_at_50%_0%,rgba(255,255,255,0.14)_0%,transparent_100%)]",
  },
  light: {
    bg: "border border-[var(--color-v4-line)] bg-[var(--color-v4-mist)]",
    title: "text-[var(--color-v4-text)]",
    subtitle: "text-[var(--color-v4-text-2)]",
    glow: "bg-[radial-gradient(70%_55%_at_50%_0%,rgba(10,10,10,0.06)_0%,transparent_100%)]",
  },
};

function useGrowOnMount(delay: number, reducedMotion: boolean) {
  const [grown, setGrown] = useState(reducedMotion);
  useEffect(() => {
    if (reducedMotion) return;
    const id = setTimeout(() => setGrown(true), delay);
    return () => clearTimeout(id);
  }, [delay, reducedMotion]);
  return grown;
}

const AI_ANSWER = "For pre-op vitals, start with the manual cuff — automated readings can miss irregular rhythms.";

export function AiTutorVisual({ reducedMotion }: { reducedMotion: boolean }) {
  const [showAnswer, setShowAnswer] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    let typingTimer: ReturnType<typeof setTimeout>;
    const cycle = setInterval(() => {
      setShowAnswer(false);
      typingTimer = setTimeout(() => setShowAnswer(true), 1200);
    }, 4200);
    typingTimer = setTimeout(() => setShowAnswer(true), 1200);
    return () => {
      clearInterval(cycle);
      clearTimeout(typingTimer);
    };
  }, [reducedMotion]);

  return (
    <div className="w-full rounded-2xl text-left bg-white p-4 shadow-[var(--shadow-v4-float)] rotate-[-2deg] transition-transform duration-500 ease-out group-hover:rotate-0">
      <div className="flex items-start gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-v4-ink-900)]">
          <span className="text-[10px] font-bold text-white">AI</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold text-[var(--color-v4-text)]">NGHI Prep AI</p>
          {showAnswer ? (
            <p className="mt-1 text-[11px] leading-snug text-[var(--color-v4-text-2)]">{AI_ANSWER}</p>
          ) : (
            <div className="mt-2 flex items-center gap-1" aria-hidden="true">
              <span className="size-1.5 animate-pulse rounded-full bg-[var(--color-v4-text-3)]" />
              <span className="size-1.5 animate-pulse rounded-full bg-[var(--color-v4-text-3)] [animation-delay:200ms]" />
              <span className="size-1.5 animate-pulse rounded-full bg-[var(--color-v4-text-3)] [animation-delay:400ms]" />
            </div>
          )}
        </div>
      </div>
      <div
        className={`mt-3 inline-flex items-center gap-1 rounded-full bg-[var(--color-v4-ink-100)] px-2 py-0.5 transition-opacity duration-300 ${
          showAnswer ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg className="size-3 text-[var(--color-v4-text)]" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[10px] font-semibold text-[var(--color-v4-text)]">AMCA-sourced</span>
      </div>
    </div>
  );
}

const EXAM_TOPICS = [
  { label: "Anatomy & Physiology", value: 82 },
  { label: "Clinical Procedures", value: 75 },
];

export function MockExamVisual({ reducedMotion }: { reducedMotion: boolean }) {
  const grown = useGrowOnMount(250, reducedMotion);

  return (
    <div className="w-full rounded-2xl text-left bg-white p-4 shadow-[var(--shadow-v4-float)] rotate-[1.5deg] transition-transform duration-500 ease-out group-hover:rotate-0">
      <p className="text-[11px] font-semibold text-[var(--color-v4-text-3)]">Your mock score</p>
      <p className="tnum mt-0.5 text-2xl font-semibold text-[var(--color-v4-text)]">43 / 50</p>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--color-v4-ink-100)]">
        <div
          className="h-full rounded-full bg-[var(--color-v4-ink-900)] transition-[width] duration-1000 ease-out"
          style={{ width: grown ? "86%" : "0%" }}
        />
      </div>
      <div className="mt-3 flex flex-col gap-1.5">
        {EXAM_TOPICS.map((topic) => (
          <div key={topic.label} className="flex items-center justify-between text-[11px]">
            <span className="text-[var(--color-v4-text-2)]">{topic.label}</span>
            <span className="tnum font-semibold text-[var(--color-v4-text)]">{topic.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FlashcardsVisual({ reducedMotion }: { reducedMotion: boolean }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setFlipped((value) => !value), 2600);
    return () => clearInterval(id);
  }, [reducedMotion]);

  return (
    <div
      className="w-full rounded-2xl text-left border border-[var(--color-v4-line)] bg-white p-5 shadow-[var(--shadow-v4-float)] rotate-[-1.5deg] transition-transform duration-500 ease-out group-hover:rotate-0"
      style={{ perspective: "800px" }}
    >
      <div
        className="relative h-[72px] transition-transform duration-500 ease-out"
        style={{ transform: `rotateY(${flipped ? 180 : 0}deg)`, transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 flex flex-col justify-center transition-opacity duration-300"
          style={{ opacity: flipped ? 0 : 1, backfaceVisibility: "hidden" }}
        >
          <p className="text-sm font-bold text-[var(--color-v4-text)]">Phlebotomy</p>
          <p className="mt-1 text-[12px] leading-snug text-[var(--color-v4-text-2)]">
            The practice of drawing blood for testing, transfusions, or donation.
          </p>
        </div>
        <div
          className="absolute inset-0 flex items-center transition-opacity duration-300"
          style={{ transform: "rotateY(180deg)", opacity: flipped ? 1 : 0, backfaceVisibility: "hidden" }}
        >
          <p className="text-center text-[13px] font-semibold text-[var(--color-v4-text)]">
            What field draws blood for lab testing?
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1">
        <div className="h-1.5 flex-1 rounded-full bg-[var(--color-v4-ink-100)]">
          <div className="h-full w-2/3 rounded-full bg-[var(--color-v4-ink-900)]" />
        </div>
        <span className="text-[10px] font-semibold text-[var(--color-v4-text)]">Card 14 / 20</span>
      </div>
    </div>
  );
}

const WEEK = [
  { day: "M", done: true },
  { day: "T", done: true },
  { day: "W", done: true },
  { day: "T", done: false },
  { day: "F", done: false },
  { day: "S", done: false },
  { day: "S", done: false },
];
const DONE_COUNT = WEEK.filter((item) => item.done).length;

export function StudyPlanVisual({ reducedMotion }: { reducedMotion: boolean }) {
  const [shown, setShown] = useState(reducedMotion ? DONE_COUNT : 0);
  const grown = useGrowOnMount(250, reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    function runCycle() {
      setShown(0);
      for (let index = 0; index < DONE_COUNT; index += 1) {
        timers.push(setTimeout(() => setShown(index + 1), 300 + index * 350));
      }
    }
    runCycle();
    const interval = setInterval(runCycle, 5000);
    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, [reducedMotion]);

  return (
    <div className="w-full rounded-2xl text-left bg-white p-4 shadow-[var(--shadow-v4-float)] rotate-[-1deg] transition-transform duration-500 ease-out group-hover:rotate-0">
      <p className="text-[11px] font-bold text-[var(--color-v4-text)]">This week</p>
      <div className="mt-2 flex gap-1">
        {WEEK.map((item, index) => {
          const isDoneVisible = item.done && index < shown;
          return (
            <div key={`${item.day}-${index}`} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-[9px] font-semibold text-[var(--color-v4-text-3)]">{item.day}</span>
              <div
                className={`flex size-6 items-center justify-center rounded-full text-[9px] font-bold transition-colors duration-300 ${
                  isDoneVisible ? "bg-[var(--color-v4-ink-900)] text-white" : "bg-[var(--color-v4-mist)] text-[var(--color-v4-text-3)]"
                }`}
              >
                {isDoneVisible && "✓"}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[11px] text-[var(--color-v4-text-2)]">Readiness score</span>
        <span className="tnum text-sm font-semibold text-[var(--color-v4-text)]">{grown ? "74%" : "0%"}</span>
      </div>
    </div>
  );
}

export function PrepToolsGrid() {
  const reducedMotion = useIsReducedMotion();

  const tools: { title: string; subtitle: string; tone: Tone; visual: ReactNode }[] = [
    {
      title: "AI Tutor",
      subtitle: "Ask anything. Get clear, sourced answers.",
      tone: "dark",
      visual: <AiTutorVisual reducedMotion={reducedMotion} />,
    },
    {
      title: "Mock Exams",
      subtitle: "Full-length practice tests, real format.",
      tone: "light",
      visual: <MockExamVisual reducedMotion={reducedMotion} />,
    },
    {
      title: "Flashcards",
      subtitle: "Learn terms that actually stick.",
      tone: "dark",
      visual: <FlashcardsVisual reducedMotion={reducedMotion} />,
    },
    {
      title: "Adaptive Study Plan",
      subtitle: "Reorders itself around your weak spots.",
      tone: "light",
      visual: <StudyPlanVisual reducedMotion={reducedMotion} />,
    },
  ];

  return (
    <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {tools.map((tool) => {
        const tone = toneStyles[tool.tone];
        return (
          <div
            key={tool.title}
            className={`group relative flex h-full min-h-[280px] w-full flex-col overflow-hidden rounded-[20px] shadow-[var(--shadow-v4-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-v4-float)] ${tone.bg}`}
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${tone.glow}`}
            />
            <div className="px-6 pb-1 pt-6 text-left">
              <h3 className={`text-lg font-medium ${tone.title}`}>{tool.title}</h3>
              <p className={`mt-1 text-[13px] font-medium leading-snug ${tone.subtitle}`}>{tool.subtitle}</p>
            </div>
            <div className="relative mt-auto flex min-h-[150px] items-end px-5 pb-0">
              <div className="w-full translate-y-[18%] transition-transform duration-500 ease-out group-hover:translate-y-[10%]">
                {tool.visual}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
