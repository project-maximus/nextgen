import { DuotoneImage } from "@/components/ui/DuotoneImage";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";
import { getProgramBySlug } from "@/content/programs";
import { Quote } from "lucide-react";

export interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: "quote-only" | "with-photo" | "featured";
  className?: string;
}

export function TestimonialCard({ testimonial, variant = "with-photo", className }: TestimonialCardProps) {
  const program = getProgramBySlug(testimonial.programSlug);

  return (
    <figure
      className={cn(
        "flex flex-col gap-4 rounded-lg border border-neutral-100 bg-white p-6 shadow-sm",
        variant === "featured" && "border-primary-200",
        className,
      )}
    >
      <Quote className="size-6 text-primary-200" aria-hidden="true" />
      <blockquote className="text-body text-neutral-700">&ldquo;{testimonial.quote}&rdquo;</blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        {variant !== "quote-only" && (
          <div className="size-11 shrink-0 overflow-hidden rounded-full">
            <DuotoneImage
              src={testimonial.photo}
              alt=""
              sizes="44px"
              tinted={false}
              className="h-full w-full"
            />
          </div>
        )}
        <div>
          <p className="text-body-sm font-semibold text-neutral-900">{testimonial.name}</p>
          <p className="text-xs text-neutral-500">
            {program?.shortName} · {testimonial.year}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
