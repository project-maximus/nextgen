import { Reveal } from "@/components/motion-v4/Reveal";
import type { Program } from "@/types";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const REQUIREMENTS = [
  "18 years or older on your program's start date",
  "High school diploma or GED",
  "Valid government-issued photo ID",
  "Brief admissions interview with an advisor",
  "Background check and health screening before your clinical externship",
];

export function ScheduleAdmissions({ program }: { program: Program }) {
  const [shorter, longer] = program.durationWeeks;
  const hasTwoTracks = shorter !== longer;

  const options = [
    { label: "Full-Time", value: `${shorter} weeks` },
    ...(hasTwoTracks ? [{ label: "Part-Time", value: `${longer} weeks` }] : []),
    { label: "Format", value: program.format === "hybrid" ? "Campus + Online" : program.format },
  ];

  return (
    <section className="v4-scope border-t border-[var(--color-v4-line)] bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1600px] px-6 md:px-8 xl:px-10">
        <div className="rounded-[24px] bg-[var(--color-v4-mist)] p-8 sm:p-12 lg:p-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">
              Get Started
            </p>
            <h2 className="mt-3 max-w-md text-[clamp(1.5rem,1.1rem+1.4vw,2rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[var(--color-v4-text)]">
              Schedule &amp; admissions.
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-10 border-t border-[var(--color-v4-line)] pt-10 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-[var(--color-v4-line)]">
            <Reveal delay={0.06} className="lg:pr-16">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">
                Schedule
              </p>
              <p className="mt-2 text-sm text-[var(--color-v4-text-2)]">Choose a schedule that fits.</p>

              <div className="mt-6 flex flex-col">
                {options.map((option) => (
                  <div
                    key={option.label}
                    className="flex items-baseline justify-between border-b border-[var(--color-v4-line)] py-3.5 first:pt-0"
                  >
                    <span className="text-sm text-[var(--color-v4-text-3)]">{option.label}</span>
                    <span className="text-lg font-medium capitalize text-[var(--color-v4-text)]">{option.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12} className="lg:pl-16">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">
                Admissions
              </p>
              <p className="mt-2 text-sm text-[var(--color-v4-text-2)]">What you&apos;ll need to enroll.</p>

              <ul className="mt-6 flex flex-col gap-3">
                {REQUIREMENTS.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-[var(--color-v4-text-3)]" strokeWidth={2} aria-hidden="true" />
                    <span className="text-sm leading-relaxed text-[var(--color-v4-text-2)]">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-v4-text)] hover:text-[var(--color-v4-text-2)]"
              >
                View Admissions Requirements
                <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
