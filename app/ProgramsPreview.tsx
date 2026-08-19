"use client";

import { Reveal } from "@/components/motion-v4/Reveal";
import { programs } from "@/content/programs";
import type { Program, ProgramFormat } from "@/types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const formatLabel: Record<ProgramFormat, string> = {
  hybrid: "Hybrid Format",
  online: "Online Format",
  "in-person": "In-Person",
  flexible: "Flexible Format",
};

const preview = programs.slice(0, 4);
const rest = programs.slice(4);

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
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="v4-scope bg-white pb-16 pt-24">
      <Reveal>
        <div className="mx-auto max-w-[1600px] px-6 md:px-8 xl:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">
            Certification Programs
          </p>
          <h2 className="mt-3 max-w-[20ch] text-[clamp(1.75rem,1.2rem+1.9vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-[var(--color-v4-text)]">
            Eleven paths into a healthcare career.
          </h2>
        </div>
      </Reveal>

      <div className="mt-10 flex gap-5 overflow-x-auto scroll-smooth px-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:px-8 xl:px-10 [&::-webkit-scrollbar]:hidden">
        {preview.map((program) => (
          <div key={program.slug} className="w-[280px] shrink-0 sm:w-[320px]">
            <ProgramCard program={program} />
          </div>
        ))}
      </div>

      {showAll && (
        <div className="mx-auto mt-6 grid max-w-[1600px] grid-cols-2 gap-5 px-6 sm:grid-cols-3 md:px-8 lg:grid-cols-4 xl:px-10">
          {rest.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      )}

      <Reveal delay={0.15}>
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-v4-text)] hover:text-[var(--color-v4-text-2)]"
          >
            View all 11 programs
            <ArrowRight
              className={`size-4 transition-transform duration-300 ${showAll ? "-rotate-90" : ""}`}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </button>
        </div>
      </Reveal>
    </section>
  );
}
