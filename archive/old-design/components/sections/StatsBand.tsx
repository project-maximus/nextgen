import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

export interface StatItem {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface StatsBandProps {
  stats: StatItem[];
  kicker?: string;
  footnote?: string;
}

/** A full-bleed dark "chapter" band with curved top/bottom edges — the 2HL-style giant numbers moment. */
export function StatsBand({ stats, kicker = "Numbers we're proud of.", footnote }: StatsBandProps) {
  return (
    <section className="relative bg-navy-deep py-20 md:py-28">
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-10 w-full -translate-y-[calc(100%-1px)] text-navy-deep md:h-16"
      >
        <path d="M0,80 C 360,0 1080,0 1440,80 L1440,80 L0,80 Z" fill="currentColor" />
      </svg>

      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <p className="mb-10 text-center text-eyebrow uppercase text-gold">{kicker}</p>
          <div className="grid grid-cols-2 gap-10 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-stat font-display text-gold">
                  <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-body-sm text-navy-soft">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
        {footnote && <p className="mt-10 text-center text-xs text-primary-300">{footnote}</p>}
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-10 w-full translate-y-[calc(100%-1px)] rotate-180 text-navy-deep md:h-16"
      >
        <path d="M0,80 C 360,0 1080,0 1440,80 L1440,80 L0,80 Z" fill="currentColor" />
      </svg>
    </section>
  );
}
