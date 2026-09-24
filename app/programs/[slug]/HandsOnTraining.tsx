import { Reveal } from "@/components/motion-v4/Reveal";
import type { Program } from "@/types";
import Image from "next/image";

export function HandsOnTraining({ program }: { program: Program }) {
  return (
    <section className="v4-scope border-t border-[var(--color-v4-line)] bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1600px] px-6 md:px-8 xl:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,480px)_1fr] lg:items-stretch lg:gap-24">
          <Reveal className="lg:h-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] lg:aspect-auto lg:h-full lg:min-h-[320px]">
              <Image src={program.cardImage} alt="" fill sizes="(max-width: 1024px) 100vw, 480px" className="object-cover" />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">
              Hands-On Training
            </p>
            <h2 className="mt-3 text-[clamp(1.75rem,1.2rem+1.9vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-[var(--color-v4-text)]">
              Learn by doing.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-v4-text-2)] sm:text-lg">
              {program.handsOnIntro ??
                "Every skill in this program is practiced on real clinical equipment in our lab — not just read about in a textbook. By the time you sit your certification exam, the procedures already feel familiar."}
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {program.handsOn.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-[var(--color-v4-line)] px-4 py-2 text-sm font-medium text-[var(--color-v4-text)]"
                >
                  {label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
