import { Reveal } from "@/components/motion-v4/Reveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PrepToolsGrid } from "./PrepToolsGrid";

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
          <PrepToolsGrid />
        </Reveal>

        <Reveal delay={0.15}>
          <Link
            href="/prep"
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
