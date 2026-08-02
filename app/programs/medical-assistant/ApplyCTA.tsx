"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { formatCohortDate, getUpcomingDatesForProgram } from "@/content/dates";
import type { Program } from "@/types";
import { ArrowRight } from "lucide-react";

export function ApplyCTA({ program }: { program: Program }) {
  const nextClassStart = getUpcomingDatesForProgram(program.slug)[0];

  return (
    <section className="bg-navy py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <div className="flex flex-col items-center gap-5 text-center">
            <h2 className="max-w-xl text-h2 font-medium tracking-tight text-white">
              Ready to become a {program.shortName}?
            </h2>
            <p className="max-w-md text-lg text-white/70">
              Next cohort starts {formatCohortDate(nextClassStart.startDate)}. Seats are limited every term.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Button
                href={`/how-it-works/apply?program=${program.slug}`}
                size="lg"
                iconRight={<ArrowRight className="size-4" />}
              >
                Apply Now
              </Button>
              <Button
                href="/programs"
                variant="secondary"
                size="lg"
                className="border-white bg-transparent text-white hover:bg-white/10"
              >
                Browse All Programs
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
