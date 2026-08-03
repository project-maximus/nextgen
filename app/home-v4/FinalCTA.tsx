import { Reveal } from "@/components/motion-v4/Reveal";
import { formatCohortDate, getNextClassStart } from "@/content/dates";

export function FinalCTA() {
  const nextClassStart = getNextClassStart();

  return (
    <section className="v4-scope v4-on-navy bg-[var(--color-v4-ink-900)] py-24">
      <Reveal>
        <div className="mx-auto max-w-[1200px] px-6 text-center md:px-8 xl:px-10">
          <h2 className="mx-auto max-w-[24ch] text-[clamp(1.75rem,1.2rem+1.9vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-white">
            Start your application — {formatCohortDate(nextClassStart.startDate)} cohort.
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/how-it-works/apply"
              className="inline-flex h-12 items-center rounded-full bg-white px-7 text-[15px] font-semibold text-[var(--color-v4-ink-900)] transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-[var(--color-v4-mist)]"
            >
              Apply Now
            </a>
            <a
              href="/contact"
              className="inline-flex h-12 items-center rounded-full border border-white/25 px-7 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-white/10"
            >
              Talk to Admissions
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
