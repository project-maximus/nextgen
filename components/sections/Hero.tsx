"use client";

import { Button } from "@/components/ui/Button";
import { DuotoneImage } from "@/components/ui/DuotoneImage";
import { TrustBadgeRow, type TrustBadgeItem } from "@/components/ui/TrustBadgeRow";
import { Doodle } from "@/components/decor/Doodle";
import { StickerImage } from "@/components/decor/StickerImage";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";

export interface HeroCta {
  label: string;
  href: string;
}

interface HeroBaseProps {
  eyebrow?: string;
  title: ReactNode;
  subhead?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
}

interface HeroHomeProps extends HeroBaseProps {
  variant: "home";
  trustBadges: TrustBadgeItem[];
  /** Exactly 3 photos: lab, classroom, graduation. */
  collageImages: [string, string, string];
}

interface HeroPageProps extends HeroBaseProps {
  variant: "page";
}

interface HeroProgramProps extends HeroBaseProps {
  variant: "program";
  backgroundImage: string;
  factChips: { label: string; value: string }[];
}

export type HeroProps = HeroHomeProps | HeroPageProps | HeroProgramProps;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

function useHeroItem() {
  const reducedMotion = useIsReducedMotion();
  return {
    hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0.01 : 0.5, ease: EASE_OUT_EXPO },
    },
  };
}

function HeroCtas({
  primaryCta,
  secondaryCta,
  pointerDoodle = false,
}: Pick<HeroBaseProps, "primaryCta" | "secondaryCta"> & { pointerDoodle?: boolean }) {
  const item = useHeroItem();
  if (!primaryCta && !secondaryCta) return null;
  return (
    <motion.div variants={item} className="relative flex flex-wrap items-center gap-4">
      {primaryCta && (
        <span className="relative inline-flex">
          <Button href={primaryCta.href} size="lg" iconRight={<ArrowRight className="size-4" />}>
            {primaryCta.label}
          </Button>
          {pointerDoodle && (
            <Doodle
              name="arrow"
              variant="draw"
              className="pointer-events-none absolute -left-14 top-full hidden w-14 -rotate-[20deg] text-primary-700 sm:block"
            />
          )}
        </span>
      )}
      {secondaryCta && (
        <Button href={secondaryCta.href} variant="ghost" size="lg">
          {secondaryCta.label}
        </Button>
      )}
    </motion.div>
  );
}

export function Hero(props: HeroProps) {
  const { eyebrow, title, subhead, primaryCta, secondaryCta } = props;
  const item = useHeroItem();

  if (props.variant === "home") {
    return (
      <section className="relative overflow-hidden bg-canvas py-14 md:py-20">
        <Doodle
          name="star"
          variant="float"
          className="pointer-events-none absolute left-[3%] top-[12%] hidden w-8 text-gold-deep md:block"
        />
        <Doodle
          name="circle"
          variant="float"
          className="pointer-events-none absolute bottom-[8%] left-[8%] hidden w-10 text-primary-300 lg:block"
        />

        <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 md:px-8 lg:grid-cols-[55%_45%] lg:gap-10 lg:px-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start gap-5 text-left"
          >
            {eyebrow && (
              <motion.p
                variants={item}
                className="rounded-full bg-gold-soft px-4 py-1.5 text-eyebrow uppercase text-navy"
              >
                {eyebrow}
              </motion.p>
            )}
            <motion.h1 variants={item} className="text-display-xl font-display text-navy">
              {title}
            </motion.h1>
            {subhead && (
              <motion.p variants={item} className="max-w-prose text-body-lg text-primary-700">
                {subhead}
              </motion.p>
            )}
            <HeroCtas primaryCta={primaryCta} secondaryCta={secondaryCta} pointerDoodle />
            <motion.div variants={item} className="pt-2">
              <TrustBadgeRow badges={props.trustBadges} tone="muted" />
            </motion.div>
          </motion.div>

          {/* Staggered sticker collage with a heartbeat doodle threading behind */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative mx-auto h-[360px] w-full max-w-md sm:h-[440px] lg:h-[480px]"
          >
            <Doodle
              name="heartbeat"
              variant="draw"
              className="pointer-events-none absolute inset-x-0 top-1/2 z-0 w-full -translate-y-1/2 text-gold-deep"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5, ease: EASE_OUT_EXPO }}
              className="absolute left-0 top-0 h-[62%] w-[58%]"
            >
              <StickerImage src={props.collageImages[0]} alt="Students in a hands-on lab" sizes="320px" rotate={-4} priority className="h-full w-full" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.28, duration: 0.5, ease: EASE_OUT_EXPO }}
              className="absolute right-0 top-[8%] h-[46%] w-[46%]"
            >
              <StickerImage src={props.collageImages[1]} alt="Instructor teaching a classroom" sizes="240px" rotate={5} className="h-full w-full" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.41, duration: 0.5, ease: EASE_OUT_EXPO }}
              className="absolute bottom-0 right-[6%] h-[42%] w-[52%]"
            >
              <StickerImage src={props.collageImages[2]} alt="Graduation day" sizes="280px" rotate={-3} className="h-full w-full" />
            </motion.div>
          </motion.div>
        </div>
        <div id="hero-sentinel" />
      </section>
    );
  }

  if (props.variant === "program") {
    return (
      <section className="relative overflow-hidden bg-navy-deep py-16 md:py-24">
        <DuotoneImage
          src={props.backgroundImage}
          alt=""
          sizes="100vw"
          className="absolute inset-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/80 to-navy-deep/40" />
        <div className="relative mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex max-w-2xl flex-col items-start gap-5"
          >
            {eyebrow && (
              <motion.p variants={item} className="text-eyebrow uppercase text-gold">
                {eyebrow}
              </motion.p>
            )}
            <motion.h1 variants={item} className="text-display-lg font-display text-canvas">
              {title}
            </motion.h1>
            {subhead && (
              <motion.p variants={item} className="max-w-prose text-body-lg text-navy-soft">
                {subhead}
              </motion.p>
            )}
            <motion.div variants={item} className="flex flex-wrap gap-4">
              {props.factChips.map((chip) => (
                <div
                  key={chip.label}
                  className="rounded-md border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
                >
                  <p className="text-xs uppercase tracking-wide text-navy-soft">{chip.label}</p>
                  <p className="text-body-sm font-semibold text-canvas">{chip.value}</p>
                </div>
              ))}
            </motion.div>
            <HeroCtas primaryCta={primaryCta} secondaryCta={secondaryCta} />
          </motion.div>
        </div>
        <div id="hero-sentinel" />
      </section>
    );
  }

  return (
    <section className="bg-navy-soft py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-2xl flex-col items-start gap-4 text-left"
        >
          {eyebrow && (
            <motion.p variants={item} className="text-eyebrow uppercase text-primary-700">
              {eyebrow}
            </motion.p>
          )}
          <motion.h1 variants={item} className="text-display-lg font-display text-navy">
            {title}
          </motion.h1>
          {subhead && (
            <motion.p variants={item} className="max-w-prose text-body-lg text-primary-700">
              {subhead}
            </motion.p>
          )}
          <HeroCtas primaryCta={primaryCta} secondaryCta={secondaryCta} />
        </motion.div>
      </div>
      <div id="hero-sentinel" />
    </section>
  );
}
