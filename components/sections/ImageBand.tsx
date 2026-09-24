import { ScrollFillText } from "@/components/motion-v4/ScrollFillText";
import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Full-bleed photo band with two short statements that fill in on scroll —
 * the "We take being a custodian of your health seriously." moment from the
 * Superpower manifesto, adapted as a closing band for interior pages.
 */
export function ImageBand({
  image,
  imagePosition = "50% 50%",
  left,
  right,
  children,
}: {
  image: string;
  imagePosition?: string;
  left: string;
  right: string;
  children?: ReactNode;
}) {
  return (
    <section className="v4-scope bg-white px-3 pb-3 md:px-5 md:pb-5 xl:px-6 xl:pb-6">
      <div className="relative mx-auto min-h-[560px] max-w-[1600px] overflow-hidden rounded-[32px] md:min-h-[640px]">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 1600px) 100vw, 1600px"
          className="object-cover"
          style={{ objectPosition: imagePosition }}
        />
        <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/60" aria-hidden="true" />
        <div className="relative z-10 flex min-h-[560px] flex-col justify-between gap-12 px-7 py-12 md:min-h-[640px] md:px-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
            <ScrollFillText
              text={left}
              className="max-w-sm text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] leading-[1.25] tracking-[-0.01em] text-white"
              dimClassName="opacity-30"
            />
            <ScrollFillText
              text={right}
              className="max-w-md text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] leading-[1.25] tracking-[-0.01em] text-white md:justify-self-end"
              dimClassName="opacity-30"
            />
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
