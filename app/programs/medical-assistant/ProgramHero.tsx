import { Reveal } from "@/components/motion-v4/Reveal";
import type { Program } from "@/types";
import Image from "next/image";
import Link from "next/link";

const formatLabel: Record<Program["format"], string> = {
  hybrid: "Hybrid",
  online: "Online",
  "in-person": "In-Person",
  flexible: "Flexible",
};

export function ProgramHero({ program }: { program: Program }) {
  return (
    <section className="v4-scope bg-white">
      <div className="mx-auto max-w-[1600px] px-3 md:px-5 xl:px-6">
        <div className="relative min-h-[560px] overflow-hidden rounded-[32px] md:min-h-[620px]">
          <Image
            src={program.cardImage}
            alt=""
            fill
            priority
            sizes="(max-width: 1360px) 100vw, 1360px"
            className="object-cover"
            style={{ filter: "saturate(0.9) contrast(1.05)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/10" aria-hidden="true" />

          <div className="relative z-10 flex h-full min-h-[560px] flex-col justify-end px-8 pb-10 pt-[132px] md:min-h-[620px] md:px-12 md:pb-14">
            <Reveal>
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/60">
                <Link href="/programs" className="hover:text-white">
                  Programs
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-white/85">{program.name}</span>
              </nav>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                {program.category} Program
              </p>
              <h1 className="mt-3 max-w-2xl text-[clamp(2rem,1.3rem+2.8vw,3.25rem)] font-normal leading-[1.08] tracking-[-0.02em] text-white">
                {program.name}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{program.blurb}</p>

              <p className="mt-5 text-sm font-medium text-white/70">
                {program.duration.split(" or ")[0].split(" full-time")[0]} · {formatLabel[program.format]} ·{" "}
                {program.credential}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/how-it-works/apply"
                  className="inline-flex h-12 items-center rounded-full bg-white px-7 text-[15px] font-semibold text-[var(--color-v4-ink-900)] transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-[var(--color-v4-mist)]"
                >
                  Apply Now
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center rounded-full bg-white/20 px-7 text-[15px] font-semibold text-white backdrop-blur-md transition-colors duration-150 hover:bg-white/30"
                >
                  Talk to Admissions
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
