"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { site } from "@/content/site";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Layers,
  MessageCircle,
  ShieldCheck,
  Stethoscope,
  Syringe,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

type TabId = "programs" | "faculty" | "platform";

const tabs: { id: TabId; label: string }[] = [
  { id: "programs", label: "Programs" },
  { id: "faculty", label: "Faculty" },
  { id: "platform", label: "NGHI Prep" },
];

type Tone = "light" | "navy";

interface CardData {
  tone: Tone;
  icon: LucideIcon;
  title: string;
  description: string;
  preview: React.ReactNode;
}

const toneClasses: Record<Tone, string> = {
  light: "bg-white border border-neutral-200",
  navy: "bg-navy",
};

const toneTextClasses: Record<Tone, string> = {
  light: "text-neutral-900",
  navy: "text-white",
};

const toneBodyClasses: Record<Tone, string> = {
  light: "text-neutral-600",
  navy: "text-white/70",
};

const toneIconClasses: Record<Tone, string> = {
  light: "text-navy",
  navy: "text-white",
};

function FillBar({ label, value, percent }: { label: string; value: string; percent: number }) {
  const reduced = useIsReducedMotion();
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-neutral-900">{label}</span>
        <span className="text-neutral-500">{value}</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
        <motion.div
          className="h-1.5 rounded-full bg-navy"
          initial={{ width: "0%" }}
          animate={reduced ? { width: `${percent}%` } : { width: ["0%", `${percent}%`, `${percent}%`, "0%"] }}
          transition={
            reduced
              ? { duration: 0.01 }
              : { duration: 3.2, times: [0, 0.3, 0.85, 1], repeat: Infinity, repeatDelay: 0.6, ease: EASE_OUT_EXPO }
          }
        />
      </div>
    </div>
  );
}

function StatPreview({ value, label }: { value: string; label: string }) {
  const reduced = useIsReducedMotion();
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-3 text-center">
      <motion.p
        className="text-3xl font-semibold text-neutral-900"
        animate={reduced ? undefined : { scale: [1, 1.06, 1] }}
        transition={reduced ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {value}
      </motion.p>
      <p className="mt-1 text-xs text-neutral-500">{label}</p>
    </div>
  );
}

function PillsPreview({ pills }: { pills: string[] }) {
  const reduced = useIsReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setActiveIndex((i) => (i + 1) % pills.length), 1200);
    return () => window.clearInterval(id);
  }, [reduced, pills.length]);

  return (
    <div className="flex flex-wrap justify-center gap-2 rounded-lg border border-neutral-200 bg-white p-3">
      {pills.map((pill, i) => (
        <motion.span
          key={pill}
          className="rounded-full px-3 py-1 text-xs font-medium"
          animate={{
            backgroundColor: i === activeIndex ? "var(--color-navy)" : "var(--color-neutral-100)",
            color: i === activeIndex ? "#ffffff" : "var(--color-neutral-600)",
          }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
        >
          {pill}
        </motion.span>
      ))}
    </div>
  );
}

function ChecklistPreview({ items }: { items: string[] }) {
  const reduced = useIsReducedMotion();
  const [checkedCount, setCheckedCount] = useState(reduced ? items.length : 0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setCheckedCount((c) => (c >= items.length ? 0 : c + 1));
    }, 900);
    return () => window.clearInterval(id);
  }, [reduced, items.length]);

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-white p-3">
      {items.map((label, i) => {
        const checked = i < checkedCount;
        return (
          <div key={label} className="flex items-center justify-between gap-2">
            <span className="text-xs text-neutral-600">{label}</span>
            <motion.span
              className="flex size-4 shrink-0 items-center justify-center rounded-full border border-neutral-300"
              animate={{
                backgroundColor: checked ? "var(--color-navy)" : "rgba(255,255,255,0)",
                borderColor: checked ? "var(--color-navy)" : "var(--color-neutral-300)",
              }}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            >
              {checked && <CheckCircle2 className="size-3 text-white" aria-hidden="true" />}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}

function FlashcardFlip({
  question,
  answer,
  progress,
}: {
  question: string;
  answer: string;
  progress: string;
}) {
  const reduced = useIsReducedMotion();
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setFlipped((f) => !f), 2200);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div className="[perspective:900px]">
      <motion.div
        className="relative h-[84px] w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      >
        <div className="absolute inset-0 flex flex-col justify-between rounded-lg border border-white/15 bg-white/10 p-3 [backface-visibility:hidden]">
          <p className="text-sm font-medium text-white">{question}</p>
          <p className="text-right text-[11px] text-white/50">{progress}</p>
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center rounded-lg border border-white/15 bg-white/10 p-3 text-center [backface-visibility:hidden]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="text-sm font-medium text-white">{answer}</p>
        </div>
      </motion.div>
    </div>
  );
}

const mcqOptions = ["120/80 mmHg", "140/90 mmHg", "160/100 mmHg"];

function McqPreview({ question }: { question: string }) {
  const reduced = useIsReducedMotion();
  const [selected, setSelected] = useState(true);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setSelected((s) => !s), 1800);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div className="rounded-lg border border-white/15 bg-white/10 p-3">
      <p className="text-sm font-medium text-white">{question}</p>
      <div className="mt-2 flex flex-col gap-1.5">
        {mcqOptions.map((option, i) => {
          const highlight = i === 0 && selected;
          return (
            <motion.div
              key={option}
              className="flex items-center justify-between rounded-md border px-2.5 py-1.5 text-xs text-white"
              animate={{
                borderColor: highlight ? "#ffffff" : "rgba(255,255,255,0.15)",
                backgroundColor: highlight ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0)",
              }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            >
              {option}
              <AnimatePresence>
                {highlight && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                  >
                    <CheckCircle2 className="size-3.5 text-white" aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

const chatPairs = [
  { q: "Why is my mock score stuck at 82%?", a: "You missed two questions on vitals — let's review those." },
  { q: "What's the format of the CCMA exam?", a: "120 multiple-choice questions, about 2.5 hours." },
];

function TypingDots() {
  return (
    <motion.span
      key="typing"
      className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-white/15 bg-white/10 px-3 py-2.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-white/50"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </motion.span>
  );
}

function ChatPreview() {
  const reduced = useIsReducedMotion();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "answered">(reduced ? "answered" : "typing");

  useEffect(() => {
    if (reduced) return;
    setPhase("typing");
    const answerTimer = window.setTimeout(() => setPhase("answered"), 1100);
    const nextTimer = window.setTimeout(() => setIndex((i) => (i + 1) % chatPairs.length), 4200);
    return () => {
      window.clearTimeout(answerTimer);
      window.clearTimeout(nextTimer);
    };
  }, [reduced, index]);

  const pair = chatPairs[index];

  return (
    <div className="flex min-h-[92px] flex-col justify-end">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="flex flex-col gap-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
        >
          <div className="ml-auto max-w-[90%] rounded-2xl rounded-br-sm border border-white/15 bg-white/10 px-3 py-2 text-xs text-white">
            {pair.q}
          </div>
          <div className="flex items-start gap-1.5">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-white/20 text-white">
              <MessageCircle className="size-3" aria-hidden="true" />
            </span>
            <AnimatePresence mode="wait">
              {phase === "typing" ? (
                <TypingDots />
              ) : (
                <motion.span
                  key="answer"
                  className="max-w-[90%] rounded-2xl rounded-bl-sm border border-white/15 bg-white/10 px-3 py-2 text-xs text-white"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                >
                  {pair.a}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function EkgPreview() {
  const reduced = useIsReducedMotion();
  return (
    <div className="flex h-[52px] items-center rounded-lg border border-neutral-200 bg-white p-3">
      <svg viewBox="0 0 120 24" className="h-5 w-full text-navy" aria-hidden="true">
        <motion.path
          d="M0 12 L28 12 L34 3 L42 21 L48 12 L120 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={
            reduced
              ? { duration: 0.01 }
              : { duration: 1.1, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.7 }
          }
        />
      </svg>
    </div>
  );
}

const programCards: CardData[] = [
  {
    tone: "light",
    icon: Stethoscope,
    title: "Medical Assistant",
    description: "Clinical & administrative skills for exam rooms and front offices.",
    preview: <FillBar label="12–24 weeks" value="Hybrid" percent={75} />,
  },
  {
    tone: "light",
    icon: Users,
    title: "CNA",
    description: "Direct patient care — the fastest path into a hospital role.",
    preview: <FillBar label="4–8 weeks" value="Hybrid" percent={25} />,
  },
  {
    tone: "light",
    icon: Syringe,
    title: "Phlebotomy",
    description: "Venipuncture and specimen collection, one of our shortest paths.",
    preview: <FillBar label="6–10 weeks" value="Hybrid" percent={40} />,
  },
  {
    tone: "light",
    icon: Activity,
    title: "EKG Technician",
    description: "Perform and read electrocardiograms in a fast, in-demand specialty.",
    preview: <EkgPreview />,
  },
];

const facultyCards: CardData[] = [
  {
    tone: "light",
    icon: Stethoscope,
    title: "Real Practitioners",
    description: "Every lead instructor still works in the field they teach.",
    preview: <StatPreview value="5+" label="years minimum in the field" />,
  },
  {
    tone: "light",
    icon: Users,
    title: "Small Classes",
    description: "Low student-to-instructor ratios, so nobody's an afterthought.",
    preview: <StatPreview value="8:1" label="student-to-instructor ratio" />,
  },
  {
    tone: "light",
    icon: ShieldCheck,
    title: "Licensed & Certified",
    description: "Faculty hold active clinical licenses, not just teaching credentials.",
    preview: <PillsPreview pills={["RN Licensed", "Teaching Cert."]} />,
  },
  {
    tone: "light",
    icon: GraduationCap,
    title: "Hands-On Mentorship",
    description: "Real clinical insight and small-group time, not lecture halls.",
    preview: <ChecklistPreview items={["Small-group mentorship", "Weekly skills lab"]} />,
  },
];

const platformCards: CardData[] = [
  {
    tone: "navy",
    icon: ClipboardCheck,
    title: "Mock Exams",
    description: "Real exam feel — full-length practice tests in your program's format.",
    preview: <McqPreview question="Normal blood pressure is:" />,
  },
  {
    tone: "navy",
    icon: Layers,
    title: "Flashcards",
    description: "Spaced-repetition review for terms that actually stick.",
    preview: (
      <FlashcardFlip question="What's a normal resting heart rate?" answer="60–100 beats per minute" progress="Card 14 / 20" />
    ),
  },
  {
    tone: "navy",
    icon: TrendingUp,
    title: "Adaptive Study Plan",
    description: "Your pace, your priorities — updated after every session.",
    preview: <ChecklistPreview items={["Complete module 3", "Review flashcards", "Take mock exam"]} />,
  },
  {
    tone: "navy",
    icon: MessageCircle,
    title: "AI Tutor Support",
    description: "Ask questions while studying and get clear answers, instantly.",
    preview: <ChatPreview />,
  },
];

const cardsByTab: Record<TabId, CardData[]> = {
  programs: programCards,
  faculty: facultyCards,
  platform: platformCards,
};

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT_EXPO } },
};

function FeatureCard({ card }: { card: CardData }) {
  return (
    <motion.div
      variants={cardVariants}
      className={`flex h-[330px] flex-col rounded-xl p-6 sm:h-[360px] sm:p-7 ${toneClasses[card.tone]}`}
    >
      <card.icon className={`size-6 ${toneIconClasses[card.tone]}`} aria-hidden="true" />
      <h3 className={`mt-4 text-base font-semibold ${toneTextClasses[card.tone]}`}>{card.title}</h3>
      <p className={`mt-2 text-sm ${toneBodyClasses[card.tone]}`}>{card.description}</p>
      <div className="mt-auto flex justify-center pt-4">
        <div className="w-full max-w-[280px]">{card.preview}</div>
      </div>
    </motion.div>
  );
}

export function AboutPitch() {
  const [active, setActive] = useState<TabId>("programs");

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-navy">About {site.shortName}</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
            Start your healthcare career in months, not years.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-neutral-600">
            AMCA-accredited since {site.founded} — real instructors, real programs, and a free study platform
            built to get you exam-ready.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-neutral-200 bg-white p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  active === tab.id ? "bg-navy text-white" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={active}
          className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2"
          initial="hidden"
          animate="show"
          variants={gridVariants}
        >
          {cardsByTab[active].map((card) => (
            <FeatureCard key={card.title} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
