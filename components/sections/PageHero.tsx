import { Reveal } from "@/components/motion-v4/Reveal";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export interface PageHeroProps {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  /** CSS object-position for the photo, e.g. "50% 30%". */
  imagePosition?: string;
  /** Object-position on phones, where the card is portrait (defaults to imagePosition). */
  mobileImagePosition?: string;
  /** Black-and-white photo treatment, matching the homepage hero. */
  grayscale?: boolean;
  breadcrumb?: { label: string; href: string }[];
  children?: ReactNode;
}

/**
 * Inset, rounded image hero shared by interior pages — same card treatment as
 * the homepage and program heroes, so the transparent desktop header always
 * sits on a dark photo.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imagePosition = "50% 50%",
  mobileImagePosition,
  grayscale = false,
  breadcrumb,
  children,
}: PageHeroProps) {
  return (
    <section className="v4-scope bg-white">
      <div className="mx-auto max-w-[1600px] px-3 md:px-5 xl:px-6">
        <div className="relative min-h-[540px] overflow-hidden rounded-[32px] md:min-h-[600px]">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="(max-width: 1600px) 100vw, 1600px"
            className="object-cover [object-position:var(--hero-pos-m)] md:[object-position:var(--hero-pos)]"
            style={{
              ["--hero-pos" as string]: imagePosition,
              ["--hero-pos-m" as string]: mobileImagePosition ?? imagePosition,
              filter: grayscale ? "grayscale(1) contrast(1.08) brightness(0.95)" : "saturate(0.9) contrast(1.05)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden="true" />
          {/* Phones: text spans the full width, so darken the whole photo a touch. */}
          <div className="absolute inset-0 bg-black/30 md:hidden" aria-hidden="true" />

          <div className="relative z-10 flex h-full min-h-[540px] flex-col justify-end px-7 pb-10 pt-[132px] md:min-h-[600px] md:px-12 md:pb-14">
            <Reveal>
              {breadcrumb && (
                <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-xs text-white/60">
                  {breadcrumb.map((crumb, i) => (
                    <span key={crumb.href} className="flex items-center gap-1.5">
                      {i > 0 && <span aria-hidden="true">/</span>}
                      {i < breadcrumb.length - 1 ? (
                        <Link href={crumb.href} className="hover:text-white">
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="text-white/85">{crumb.label}</span>
                      )}
                    </span>
                  ))}
                </nav>
              )}
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">{eyebrow}</p>
              <h1 className="mt-3 max-w-2xl text-[clamp(2.125rem,1.3rem+3vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-white">
                {title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{intro}</p>
            </Reveal>
            {children && <Reveal delay={0.1}>{children}</Reveal>}
          </div>
        </div>
      </div>
    </section>
  );
}
