import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import type { Testimonial } from "@/types";

export interface TestimonialMarqueeProps {
  testimonials: Testimonial[];
}

export function TestimonialMarquee({ testimonials }: TestimonialMarqueeProps) {
  const half = Math.ceil(testimonials.length / 2);
  const rowOne = testimonials.slice(0, half);
  const rowTwo = testimonials.slice(half);

  return (
    <section className="bg-canvas py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <div className="mb-8 max-w-2xl">
            <p className="text-eyebrow uppercase text-primary-600">Graduate stories</p>
            <h2 className="mt-2 text-h2 font-display text-navy">Don&rsquo;t take our word for it.</h2>
          </div>
        </Reveal>
      </div>
      <div className="flex flex-col gap-6">
        <Marquee ariaLabel="Graduate testimonials, row one" direction="left" durationSeconds={60}>
          {rowOne.map((t) => (
            <div key={t.id} className="w-80 shrink-0 sm:w-96">
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </Marquee>
        {rowTwo.length > 0 && (
          <Marquee ariaLabel="Graduate testimonials, row two" direction="right" durationSeconds={60}>
            {rowTwo.map((t) => (
              <div key={t.id} className="w-80 shrink-0 sm:w-96">
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </Marquee>
        )}
      </div>
    </section>
  );
}
