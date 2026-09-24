import { Reveal } from "@/components/motion-v4/Reveal";
import type { Program } from "@/types";
import { Check } from "lucide-react";

export function ProgramOverview({ program }: { program: Program }) {
  return (
    <section className="v4-scope bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1600px] px-6 md:px-8 xl:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)_minmax(0,320px)] lg:gap-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">Overview</p>
            <h2 className="mt-3 text-[clamp(1.75rem,1.2rem+1.9vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-[var(--color-v4-text)]">
              Your path into healthcare.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            {program.description.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-base leading-relaxed text-[var(--color-v4-text-2)] first:mt-0 sm:text-lg">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.14}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">
              What you&apos;ll learn
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {program.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-2.5">
                  <Check className="size-4 shrink-0 text-[var(--color-v4-text-3)]" strokeWidth={2} aria-hidden="true" />
                  <span className="text-sm text-[var(--color-v4-text)]">{skill}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
