import { Reveal } from "@/components/motion-v4/Reveal";
import { ArrowRight, Bot, CalendarCheck, ClipboardCheck } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Bot,
    title: "AI Tutor",
    description: "Ask questions while you study and get clear, sourced answers instantly.",
  },
  {
    icon: CalendarCheck,
    title: "Adaptive Study Plans",
    description: "A schedule that reorders itself around your program and your weak spots.",
  },
  {
    icon: ClipboardCheck,
    title: "Mock Exams",
    description: "Full-length practice tests that match your certification's real format.",
  },
];

export function PrepTeaser() {
  return (
    <section className="v4-scope border-t border-[var(--color-v4-line)] bg-white pb-24 pt-16">
      <div className="mx-auto max-w-[1200px] px-6 text-center md:px-8 xl:px-10">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">
            Introducing NGHI Prep
          </p>
          <h2 className="mx-auto mt-4 max-w-[24ch] text-[clamp(2.375rem,1.2rem+3.6vw,4rem)] font-light leading-[1.02] tracking-[-0.025em] text-[var(--color-v4-text)]">
            Study like the exam is already yours.
          </h2>
          <p className="mx-auto mt-6 max-w-[38rem] text-lg leading-relaxed text-[var(--color-v4-text-2)]">
            A free study platform included with every program — AI tutoring, mock exams, flashcards, and a
            readiness score that tells you exactly when you&apos;re ready.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[var(--color-v4-line)] sm:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center gap-3 bg-white p-8 text-center">
                <feature.icon className="size-6 text-[var(--color-v4-text)]" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="text-base font-medium text-[var(--color-v4-text)]">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-v4-text-2)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <Link
            href="/home-v4/prep"
            className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-v4-text)] hover:text-[var(--color-v4-text-2)]"
          >
            See NGHI Prep
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
