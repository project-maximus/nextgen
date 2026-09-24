import { Reveal } from "@/components/motion-v4/Reveal";
import type { Program } from "@/types";

// Quote is placeholder copy (content/programs.ts) — swap for a real graduate
// quote (name, employer) before this goes live.
export function StudentStory({ program }: { program: Program }) {
  return (
    <section className="v4-scope border-t border-[var(--color-v4-line)] bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-8 xl:px-10">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">
            Student Experience
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-8 text-[clamp(1.5rem,1.1rem+2vw,2.5rem)] font-normal leading-[1.25] tracking-[-0.015em] text-[var(--color-v4-text)]">
            &ldquo;{program.studentQuote}&rdquo;
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-8 text-sm font-semibold text-[var(--color-v4-text)]">{program.name} Graduate</p>
        </Reveal>
      </div>
    </section>
  );
}
