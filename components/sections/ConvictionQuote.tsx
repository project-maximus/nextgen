import { StickerImage } from "@/components/decor/StickerImage";
import { Reveal } from "@/components/motion/Reveal";
import { Quote } from "lucide-react";

export interface ConvictionQuoteProps {
  quote: string;
  name: string;
  role: string;
  photo: string;
}

/** Founder/director conviction quote — a human face on the institution. */
export function ConvictionQuote({ quote, name, role, photo }: ConvictionQuoteProps) {
  return (
    <section className="bg-navy-soft py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <StickerImage src={photo} alt={name} sizes="120px" rotate={-2} className="size-28 shrink-0 sm:size-32" />
            <Quote className="size-10 text-gold" aria-hidden="true" />
            <blockquote className="text-h2 font-display text-navy">&ldquo;{quote}&rdquo;</blockquote>
            <figcaption className="text-body-sm font-semibold text-primary-700">
              {name}, {role}
            </figcaption>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
