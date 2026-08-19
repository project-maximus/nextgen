import { Marquee } from "@/components/motion/Marquee";
import { programs } from "@/content/programs";
import type { Program } from "@/types";
import { ArrowRight, ClipboardList, HeartPulse, Stethoscope, type LucideIcon } from "lucide-react";
import Link from "next/link";

const categoryIcon: Record<Program["category"], LucideIcon> = {
  clinical: Stethoscope,
  administrative: ClipboardList,
  specialized: HeartPulse,
};

const categoryLabel: Record<Program["category"], string> = {
  clinical: "Clinical",
  administrative: "Administrative",
  specialized: "Specialized",
};

function MovingProgramCard({ program }: { program: Program }) {
  const Icon = categoryIcon[program.category];
  return (
    <Link
      href={`/programs/${program.slug}`}
      className="group flex h-[400px] w-80 shrink-0 flex-col rounded-2xl border border-white/10 bg-navy-deep p-6 transition-colors duration-200 hover:border-white/30"
    >
      <div className="flex items-start justify-between">
        <Icon className="size-6 text-white/70" aria-hidden="true" />
        <span className="rounded-full border border-white/15 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-white/60">
          {categoryLabel[program.category]}
        </span>
      </div>

      <h3 className="mt-4 text-xl font-semibold text-white">{program.name}</h3>

      <p className="mt-3 text-lg font-medium text-white/80">{program.duration}</p>
      <span className="mt-3 inline-flex w-fit rounded-full border border-white/15 px-3 py-1 text-xs font-medium capitalize text-white/60">
        {program.format}
      </span>

      <p className="mt-3 line-clamp-3 text-sm text-white/60">{program.blurb}</p>

      <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-medium text-white group-hover:text-white/80">
        Learn more
        <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

export function MovingPrograms() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-navy">11 accredited programs</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
            Find your program
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-neutral-600">
            Launch your career in healthcare with our comprehensive training programs — all accredited, most
            under 6 months.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <Marquee ariaLabel="All 11 NextGen Health Institute programs" durationSeconds={70} edgeFade={false}>
          {programs.map((program) => (
            <MovingProgramCard key={program.slug} program={program} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
