"use client";

import { Reveal } from "@/components/motion-v4/Reveal";
import { programs } from "@/content/programs";
import type { Program, ProgramFormat } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const formatLabel: Record<ProgramFormat, string> = {
  hybrid: "Hybrid Format",
  online: "Online Format",
  "in-person": "In-Person",
  flexible: "Flexible Format",
};


function ProgramCard({ program }: { program: Program }) {
  return (
    <Link
      href={`/programs/${program.slug}`}
      className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl"
    >
      <Image
        src={program.cardImage}
        alt={program.name}
        fill
        sizes="(max-width: 640px) 280px, 320px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ filter: "saturate(0.9) contrast(1.05)" }}
      />
      {/* Even tint so bright photos sit together; it lifts on hover to spotlight the card. */}
      <div
        className="absolute inset-0 bg-black/25 transition-opacity duration-300 group-hover:opacity-0"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" aria-hidden="true" />

      <div className="absolute left-4 right-4 top-4 flex flex-col gap-1.5 opacity-0 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="rounded-lg bg-black/60 px-3 py-2 backdrop-blur-sm">
          <p className="text-sm font-bold text-white">{program.duration.split(" or ")[0].split(" full-time")[0]}</p>
          <p className="text-[11px] uppercase tracking-[0.06em] text-white/70">{formatLabel[program.format]}</p>
        </div>
        <div className="rounded-lg bg-black/60 px-3 py-2 backdrop-blur-sm">
          <p className="text-sm font-bold text-white">{program.credential}</p>
          <p className="text-[11px] uppercase tracking-[0.06em] text-white/70">Credential</p>
        </div>
      </div>

      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-2">
        <span className="rounded-lg bg-black/60 px-3 py-1.5 text-sm font-bold text-white backdrop-blur-sm">
          {program.shortName}
        </span>
        <span className="translate-y-2 rounded-lg bg-[var(--color-v4-ink-900)] px-3 py-1.5 text-[11px] font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          View Program
        </span>
      </div>
    </Link>
  );
}

export function ProgramsPreview() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  /** Scroll by roughly one viewport of cards. */
  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 300), behavior: "smooth" });
  };

  const arrowClass =
    "flex size-11 items-center justify-center rounded-full border border-[var(--color-v4-line)] text-[var(--color-v4-text)] transition-colors duration-150 hover:bg-[var(--color-v4-mist)] disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent";

  return (
    <section className="v4-scope bg-white pb-16 pt-24">
      <Reveal>
        <div className="mx-auto flex max-w-[1600px] items-end justify-between gap-6 px-6 md:px-8 xl:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">
              Certification Programs
            </p>
            <h2 className="mt-3 max-w-[20ch] text-[clamp(1.75rem,1.2rem+1.9vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-[var(--color-v4-text)]">
              Eleven paths into a healthcare career.
            </h2>
          </div>
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <button type="button" onClick={() => scrollByPage(-1)} disabled={!canPrev} aria-label="Previous programs" className={arrowClass}>
              <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => scrollByPage(1)} disabled={!canNext} aria-label="Next programs" className={arrowClass}>
              <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </Reveal>

      <div
        ref={trackRef}
        className="mt-10 flex snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto scroll-smooth px-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:scroll-px-8 md:px-8 xl:scroll-px-10 xl:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {programs.map((program) => (
          <div key={program.slug} className="w-[280px] shrink-0 snap-start sm:w-[320px]">
            <ProgramCard program={program} />
          </div>
        ))}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-10 text-center">
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-v4-text)] hover:text-[var(--color-v4-text-2)]"
          >
            View all {programs.length} programs
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
