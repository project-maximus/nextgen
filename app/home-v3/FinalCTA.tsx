"use client";

import { Doodle } from "@/components/decor/Doodle";
import { Reveal } from "@/components/motion/Reveal";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  const reducedMotion = useIsReducedMotion();

  return (
    <section className="relative overflow-hidden rounded-t-[48px] bg-navy py-16 sm:rounded-t-[64px] md:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 100% at 0% 100%, rgba(232,191,52,0.18) 0%, transparent 55%), radial-gradient(60% 90% at 100% 0%, rgba(232,191,52,0.14) 0%, transparent 55%)",
        }}
      />
      <Doodle
        name="star"
        variant={reducedMotion ? "static" : "float"}
        className="pointer-events-none absolute left-[6%] top-[10%] size-9 text-gold/60"
      />
      <Doodle
        name="star"
        variant={reducedMotion ? "static" : "float"}
        className="pointer-events-none absolute right-[4%] top-[8%] size-7 text-gold/50"
        style={{ animationDelay: "0.6s" }}
      />

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <h2 className="font-display-wonk max-w-md text-display-lg text-canvas">
              Get started with NextGen.
            </h2>
            <div className="flex flex-col items-start gap-5 lg:items-end lg:text-right">
              <p className="max-w-sm text-body-lg text-navy-soft">
                Let&apos;s get you certified and hired — with training that actually prepares you for the job.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="/how-it-works/apply" size="lg" iconRight={<ArrowRight className="size-4" />}>
                  Apply Now
                </Button>
                <Button
                  href="/programs"
                  variant="ghost"
                  size="lg"
                  className="border border-canvas/30 text-canvas hover:bg-white/10"
                >
                  Browse Programs
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
