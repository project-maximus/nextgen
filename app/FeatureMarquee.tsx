"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { AiTutorVisual, FlashcardsVisual, MockExamVisual, StudyPlanVisual, toneStyles, type Tone } from "./PrepToolsGrid";
import { useEffect, useState, type ReactNode } from "react";

const VIDEO_CHAPTERS = [
  { label: "Intro & Learning Objectives", active: true },
  { label: "12-Lead Placement", active: false },
  { label: "Common Artifacts", active: false },
];

function VideoLessonsVisual() {
  return (
    <div className="w-full rounded-2xl text-left bg-white p-4 shadow-[var(--shadow-v4-float)] rotate-[2deg] transition-transform duration-500 ease-out group-hover:rotate-0">
      <div className="relative flex h-16 items-center justify-center overflow-hidden rounded-xl bg-[var(--color-v4-ink-900)]">
        <div className="flex size-8 items-center justify-center rounded-full bg-white">
          <span className="ml-0.5 text-[10px] text-[var(--color-v4-ink-900)]">▶</span>
        </div>
        <span className="absolute bottom-1.5 right-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[9px] text-white">12:34</span>
      </div>
      <p className="mt-3 text-[12px] font-semibold text-[var(--color-v4-text)]">EKG Lead Placement</p>
      <p className="text-[10px] text-[var(--color-v4-text-3)]">Module 3 · EKG Technician</p>
      <div className="mt-2.5 flex flex-col gap-1">
        {VIDEO_CHAPTERS.map((chapter, index) => (
          <div
            key={chapter.label}
            className={`flex items-center gap-2 rounded-md px-1.5 py-1 ${chapter.active ? "bg-[var(--color-v4-mist)]" : ""}`}
          >
            <span
              className={`text-[9px] font-bold ${chapter.active ? "text-[var(--color-v4-text)]" : "text-[var(--color-v4-text-3)]"}`}
            >
              {index + 1}
            </span>
            <span
              className={`text-[10px] ${chapter.active ? "font-semibold text-[var(--color-v4-text)]" : "text-[var(--color-v4-text-3)]"}`}
            >
              {chapter.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AudioLessonsVisual({ reducedMotion }: { reducedMotion: boolean }) {
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setProgress((value) => (value >= 92 ? 35 : value + 2)), 450);
    return () => clearInterval(id);
  }, [reducedMotion]);

  const elapsedSeconds = Math.round((progress / 100) * 14 * 60);
  const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
  const seconds = String(elapsedSeconds % 60).padStart(2, "0");

  return (
    <div className="w-full rounded-2xl text-left bg-white p-4 shadow-[var(--shadow-v4-float)] rotate-[-2deg] transition-transform duration-500 ease-out group-hover:rotate-0">
      <p className="text-[11px] font-semibold text-[var(--color-v4-text)]">Patient Communication Basics</p>
      <p className="mt-0.5 text-[10px] text-[var(--color-v4-text-3)]">14 min · Instructor-narrated</p>
      <div className="mt-3 flex items-center gap-2.5">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-v4-ink-900)]">
          <span className="text-[10px] text-white">▶</span>
        </div>
        <div className="flex-1">
          <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-v4-ink-100)]">
            <div
              className="h-full rounded-full bg-[var(--color-v4-ink-900)] transition-[width] duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between text-[9px] text-[var(--color-v4-text-3)]">
            <span>
              {minutes}:{seconds}
            </span>
            <span>14:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const PARTICIPANTS = ["Instructor", "Maria R.", "James K.", "You"];

function LiveSessionsVisual() {
  return (
    <div className="w-full rounded-2xl text-left bg-white p-4 shadow-[var(--shadow-v4-float)] rotate-[1deg] transition-transform duration-500 ease-out group-hover:rotate-0">
      <div className="mb-2.5 flex items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-v4-ink-900)] px-2 py-0.5 text-[9px] font-bold text-white">
          <span className="size-1.5 animate-pulse rounded-full bg-white" aria-hidden="true" />
          LIVE
        </span>
        <span className="text-[10px] text-[var(--color-v4-text-3)]">CNA Exam Bootcamp</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {PARTICIPANTS.map((name) => (
          <div key={name} className="flex h-11 items-center justify-center rounded-lg bg-[var(--color-v4-mist)]">
            <span className="text-[10px] font-medium text-[var(--color-v4-text-2)]">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GuidedQuizVisual() {
  return (
    <div className="w-full rounded-2xl text-left bg-white p-4 shadow-[var(--shadow-v4-float)] rotate-[-1.5deg] transition-transform duration-500 ease-out group-hover:rotate-0">
      <div className="mb-2 flex items-center gap-1.5">
        <div className="h-1 flex-1 rounded-full bg-[var(--color-v4-ink-900)]" />
        <div className="h-1 flex-1 rounded-full bg-[var(--color-v4-ink-100)]" />
        <div className="h-1 flex-1 rounded-full bg-[var(--color-v4-ink-100)]" />
      </div>
      <p className="mb-2 text-[10px] text-[var(--color-v4-text-3)]">Step 1 of 3</p>
      <p className="mb-3 text-[13px] font-semibold text-[var(--color-v4-text)]">Which program are you training for?</p>
      <div className="flex flex-col gap-1.5">
        <span className="rounded-lg border border-[var(--color-v4-ink-900)] bg-[var(--color-v4-mist)] px-2.5 py-2 text-left text-[11px] font-medium text-[var(--color-v4-text)]">
          Medical Assistant
        </span>
        <span className="rounded-lg border border-[var(--color-v4-line)] px-2.5 py-2 text-left text-[11px] font-medium text-[var(--color-v4-text-2)]">
          Nursing Assistant
        </span>
        <span className="rounded-lg border border-[var(--color-v4-line)] px-2.5 py-2 text-left text-[11px] font-medium text-[var(--color-v4-text-2)]">
          Not sure yet
        </span>
      </div>
    </div>
  );
}

const CHAT_MESSAGES = [
  { name: "Maria", time: "2m", body: "Just passed my CNA exam, thank you all!" },
  { name: "James", time: "15m", body: "Anyone have tips for the EKG practical?" },
  { name: "Priya", time: "1h", body: "Studying phlebotomy terms this week" },
];

function CommunityVisual({ reducedMotion }: { reducedMotion: boolean }) {
  const [shown, setShown] = useState(reducedMotion ? CHAT_MESSAGES.length : 0);

  useEffect(() => {
    if (reducedMotion) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    function runCycle() {
      setShown(0);
      CHAT_MESSAGES.forEach((_, index) => {
        timers.push(setTimeout(() => setShown(index + 1), 400 + index * 500));
      });
    }
    runCycle();
    const interval = setInterval(runCycle, 5000);
    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, [reducedMotion]);

  return (
    <div className="w-full rounded-2xl text-left bg-white p-4 shadow-[var(--shadow-v4-float)] rotate-[2deg] transition-transform duration-500 ease-out group-hover:rotate-0">
      <p className="mb-2 text-[10px] text-[var(--color-v4-text-3)]">NGHI Prep Community</p>
      <div className="flex flex-col gap-1.5">
        {CHAT_MESSAGES.map((message, index) => (
          <div
            key={message.name}
            className={`rounded-lg bg-[var(--color-v4-mist)] px-2.5 py-1.5 transition-opacity duration-300 ${
              index < shown ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-[var(--color-v4-text)]">{message.name}</span>
              <span className="text-[9px] text-[var(--color-v4-text-3)]">{message.time}</span>
            </div>
            <p className="text-[10px] leading-snug text-[var(--color-v4-text-2)]">{message.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureCard({
  eyebrow,
  title,
  tone,
  visual,
}: {
  eyebrow: string;
  title: string;
  tone: Tone;
  visual: ReactNode;
}) {
  const styles = toneStyles[tone];
  return (
    <div
      className={`group relative flex w-80 shrink-0 flex-col overflow-hidden rounded-[20px] p-6 shadow-[var(--shadow-v4-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-v4-float)] ${styles.bg}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${styles.glow}`}
      />
      <p className={`relative text-[11px] font-bold uppercase tracking-widest ${styles.subtitle}`}>{eyebrow}</p>
      <p className={`relative mt-2 text-xl font-medium leading-snug ${styles.title}`}>{title}</p>
      <div className="relative mt-5">{visual}</div>
    </div>
  );
}

export function FeatureMarquee() {
  const reducedMotion = useIsReducedMotion();

  const features: { eyebrow: string; title: string; tone: Tone; visual: ReactNode }[] = [
    {
      eyebrow: "AI Tutor",
      title: "Ask anything, get real answers",
      tone: "dark",
      visual: <AiTutorVisual reducedMotion={reducedMotion} />,
    },
    {
      eyebrow: "Adaptive Study Plan",
      title: "A schedule built around your weak spots",
      tone: "light",
      visual: <StudyPlanVisual reducedMotion={reducedMotion} />,
    },
    {
      eyebrow: "Mock Exams",
      title: "Practice under real exam conditions",
      tone: "dark",
      visual: <MockExamVisual reducedMotion={reducedMotion} />,
    },
    {
      eyebrow: "Flashcards",
      title: "Learn terms that actually stick",
      tone: "light",
      visual: <FlashcardsVisual reducedMotion={reducedMotion} />,
    },
    {
      eyebrow: "Video Lessons",
      title: "Watch every concept explained visually",
      tone: "dark",
      visual: <VideoLessonsVisual />,
    },
    {
      eyebrow: "Audio Lessons",
      title: "Study on the go, at your own pace",
      tone: "light",
      visual: <AudioLessonsVisual reducedMotion={reducedMotion} />,
    },
    {
      eyebrow: "Live Sessions",
      title: "Instructor-led live exam bootcamps",
      tone: "dark",
      visual: <LiveSessionsVisual />,
    },
    {
      eyebrow: "Guided Pathway Quiz",
      title: "Not sure where to start? We help you choose",
      tone: "light",
      visual: <GuidedQuizVisual />,
    },
    {
      eyebrow: "Community",
      title: "Peers who get the certification journey",
      tone: "dark",
      visual: <CommunityVisual reducedMotion={reducedMotion} />,
    },
  ];

  return (
    <section aria-labelledby="feature-marquee-heading" className="v4-scope bg-[var(--color-v4-mist)] py-24">
      <div className="mx-auto max-w-[1200px] px-6 text-center md:px-8 xl:px-10">
        <h2
          id="feature-marquee-heading"
          className="text-[clamp(1.75rem,1.2rem+1.9vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-[var(--color-v4-text)]"
        >
          Built for Results
        </h2>
        <p className="mt-3 text-lg font-medium text-[var(--color-v4-text-2)]">
          Explore the features powering your success.
        </p>
      </div>

      <div className="feature-marquee-strip mt-12 overflow-hidden">
        <div className="feature-marquee-track flex w-max gap-5">
          {features.map((feature) => (
            <FeatureCard key={`a-${feature.eyebrow}`} {...feature} />
          ))}
          {features.map((feature) => (
            <FeatureCard key={`b-${feature.eyebrow}`} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
