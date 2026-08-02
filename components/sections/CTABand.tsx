import { Button } from "@/components/ui/Button";
import { Doodle } from "@/components/decor/Doodle";
import { Reveal } from "@/components/motion/Reveal";
import type { ReactNode } from "react";

export interface CTABandProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Optional form (or other content) rendered beside the copy, e.g. a compact RequestInfoForm. */
  children?: ReactNode;
}

/** The final, dark "chapter" CTA — curved edges, floating gold doodles, two paths forward. */
export function CTABand({ eyebrow, title, description, primaryCta, secondaryCta, children }: CTABandProps) {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-20 md:py-28 focus-on-navy">
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-10 w-full -translate-y-[calc(100%-1px)] text-navy-deep md:h-16"
      >
        <path d="M0,80 C 360,0 1080,0 1440,80 L1440,80 L0,80 Z" fill="currentColor" />
      </svg>

      <Doodle
        name="star"
        variant="float"
        className="pointer-events-none absolute left-[6%] top-[15%] hidden w-10 text-gold md:block"
      />
      <Doodle
        name="circle"
        variant="float"
        className="pointer-events-none absolute bottom-[10%] right-[8%] hidden w-12 text-gold/60 lg:block"
      />

      <div className="relative mx-auto grid max-w-[1280px] gap-12 px-5 md:px-8 lg:grid-cols-2 lg:items-center lg:px-10">
        <Reveal>
          <div className="flex flex-col items-start gap-4 text-left">
            {eyebrow && <p className="text-eyebrow uppercase text-gold">{eyebrow}</p>}
            <h2 className="text-h2 font-display text-canvas">{title}</h2>
            {description && <p className="text-body-lg text-navy-soft">{description}</p>}
            <div className="mt-2 flex flex-wrap gap-3">
              <Button href={primaryCta.href} size="lg">
                {primaryCta.label}
              </Button>
              {secondaryCta && (
                <Button
                  href={secondaryCta.href}
                  variant="ghost"
                  size="lg"
                  className="border border-canvas/40 text-canvas hover:bg-white/10"
                >
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          </div>
        </Reveal>
        {children && <Reveal>{children}</Reveal>}
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-10 w-full translate-y-[calc(100%-1px)] rotate-180 text-navy-deep md:h-16"
      >
        <path d="M0,80 C 360,0 1080,0 1440,80 L1440,80 L0,80 Z" fill="currentColor" />
      </svg>
    </section>
  );
}
