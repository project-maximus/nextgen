"use client";

import { Reveal } from "@/components/motion/Reveal";
import { ProgramCard } from "@/components/sections/ProgramCard";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { getRelatedPrograms } from "@/content/programs";
import { testimonials } from "@/content/testimonials";
import type { Program } from "@/types";

export function StoryAndRelated({ program }: { program: Program }) {
  const story = testimonials.find((t) => t.programSlug === program.slug);
  const related = getRelatedPrograms(program);

  return (
    <section className="bg-neutral-50 py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        {story && (
          <Reveal>
            <div className="mx-auto max-w-2xl">
              <TestimonialCard testimonial={story} variant="quote-only" />
            </div>
          </Reveal>
        )}

        <Reveal delay={0.1}>
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-navy">Keep exploring</p>
            <h2 className="mt-2 text-h2 font-medium tracking-tight text-neutral-900">Related programs</h2>
          </div>
          <div
            className={`mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-5 ${
              related.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
            }`}
          >
            {related.map((relatedProgram) => (
              <ProgramCard key={relatedProgram.slug} program={relatedProgram} variant="related" />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
