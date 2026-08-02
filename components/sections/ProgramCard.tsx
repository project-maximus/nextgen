import { Badge } from "@/components/ui/Badge";
import { Doodle, type DoodleName } from "@/components/decor/Doodle";
import { cn } from "@/lib/utils";
import type { Program } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const categoryTone: Record<Program["category"], "primary" | "accent" | "neutral"> = {
  clinical: "primary",
  administrative: "accent",
  specialized: "neutral",
};

const categoryDoodle: Record<Program["category"], DoodleName> = {
  clinical: "stethoscope",
  administrative: "clipboard",
  specialized: "bandage",
};

export interface ProgramCardProps {
  program: Program;
  variant?: "grid" | "compact" | "related" | "featured";
}

export function ProgramCard({ program, variant = "grid" }: ProgramCardProps) {
  const isCompact = variant === "compact" || variant === "related";

  return (
    <div
      className={cn(
        "group flex h-full flex-col rounded-[var(--radius-card)] border-2 border-navy bg-canvas p-6 transition-all duration-200 ease-out",
        "hover:-translate-y-1.5 hover:border-gold-deep hover:shadow-flat",
        variant === "featured" && "border-gold-deep",
      )}
    >
      <Doodle name={categoryDoodle[program.category]} className="mb-3 size-9 text-primary-700" />
      <Badge tone={categoryTone[program.category]} variant="soft" className="mb-3 self-start capitalize">
        {program.category}
      </Badge>
      <h3 className="text-h4 font-display text-navy">{program.name}</h3>

      <p className="mt-3 font-display text-2xl font-semibold leading-snug text-navy underline decoration-gold decoration-[5px] underline-offset-[6px]">
        {program.duration}
      </p>
      <span className="mt-3 inline-flex w-fit rounded-full bg-navy-soft px-3 py-1 text-xs font-semibold capitalize text-primary-800">
        {program.format}
      </span>

      {!isCompact && <p className="mt-3 text-body-sm text-primary-700">{program.blurb}</p>}
      <Link
        href={`/programs/${program.slug}`}
        className="mt-4 flex items-center gap-1.5 text-body-sm font-semibold text-navy hover:text-gold-deep"
      >
        Learn more
        <ArrowRight
          className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}
