"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { motion, type Variants } from "framer-motion";
import {
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Monitor,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

interface FeatureCard {
  index: string;
  eyebrow: string;
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
  illustration: ReactNode;
}

const panel = "rounded-lg border border-white/15 bg-white/[0.06] p-5";
const pill = "rounded-full px-3 py-1 text-xs font-medium";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const illustrationViewport = { once: true, margin: "0px 0px -10% 0px" };

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const popIn: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: EASE_OUT_EXPO } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT_EXPO } },
};

function FacultyIllustration() {
  return (
    <motion.div className={panel} initial="hidden" whileInView="show" viewport={illustrationViewport} variants={staggerContainer}>
      <div className="flex items-center gap-3">
        <motion.span variants={popIn} className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white">
          <Stethoscope className="size-5" aria-hidden="true" />
        </motion.span>
        <motion.div variants={fadeUp} className="min-w-0 flex-1">
          <div className="h-2.5 w-3/4 rounded-full bg-white/20" />
          <div className="mt-2 h-2 w-1/2 rounded-full bg-white/10" />
        </motion.div>
      </div>
      <motion.div variants={fadeUp} className="mt-5 flex items-center justify-between rounded-md border border-white/10 px-4 py-3">
        <span className="text-sm text-white/60">Years practicing</span>
        <span className="text-xl font-semibold text-white">12+</span>
      </motion.div>
      <div className="mt-3 flex flex-wrap gap-2">
        <motion.span variants={popIn} className={`${pill} border border-white/15 text-white/80`}>
          RN Licensed
        </motion.span>
        <motion.span variants={popIn} className={`${pill} border border-white/15 text-white/80`}>
          BLS Certified
        </motion.span>
      </div>
    </motion.div>
  );
}

function ClassSizeIllustration() {
  return (
    <motion.div className={panel} initial="hidden" whileInView="show" viewport={illustrationViewport} variants={staggerContainer}>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.span key={i} variants={popIn} className="flex size-8 items-center justify-center rounded-full border border-white/15 text-white/50">
            <Users className="size-3.5" aria-hidden="true" />
          </motion.span>
        ))}
        <motion.span variants={popIn} className="flex size-9 items-center justify-center rounded-full bg-gold text-navy">
          <GraduationCap className="size-4" aria-hidden="true" />
        </motion.span>
      </div>
      <div className="mt-5 text-center">
        <motion.p variants={popIn} className="text-3xl font-semibold text-white">
          8:1
        </motion.p>
        <motion.p variants={fadeUp} className="mt-1 text-sm text-white/60">
          Student-to-instructor ratio
        </motion.p>
      </div>
    </motion.div>
  );
}

function SchedulingIllustration() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const highlighted = [1, 3, 5];
  return (
    <motion.div className={panel} initial="hidden" whileInView="show" viewport={illustrationViewport} variants={staggerContainer}>
      <div className="flex flex-wrap gap-2">
        <motion.span variants={popIn} className={`${pill} bg-gold text-navy`}>
          Evening
        </motion.span>
        <motion.span variants={popIn} className={`${pill} border border-white/15 text-white/80`}>
          Day
        </motion.span>
        <motion.span variants={popIn} className={`${pill} border border-white/15 text-white/80`}>
          Weekend
        </motion.span>
      </div>
      <div className="mt-5 grid grid-cols-7 gap-1.5">
        {days.map((d, i) => (
          <motion.div
            key={i}
            variants={popIn}
            className={`flex aspect-square items-center justify-center rounded-md text-[11px] font-medium ${
              highlighted.includes(i) ? "bg-gold text-navy" : "border border-white/10 text-white/40"
            }`}
          >
            {d}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function CareerSupportIllustration() {
  const reducedMotion = useIsReducedMotion();
  const bars = [45, 65, 55, 90];
  return (
    <div className={panel}>
      <div className="flex h-20 items-end gap-2">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className={`w-full flex-1 rounded-t ${i === bars.length - 1 ? "bg-gold" : "bg-white/15"}`}
            initial={{ height: reducedMotion ? `${h}%` : "0%" }}
            whileInView={{ height: `${h}%` }}
            viewport={illustrationViewport}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: i * 0.1, ease: EASE_OUT_EXPO }}
          />
        ))}
      </div>
      <motion.div
        className="mt-5 flex items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={illustrationViewport}
        transition={{ duration: 0.4, delay: 0.5, ease: EASE_OUT_EXPO }}
      >
        <Briefcase className="size-4 shrink-0 text-white/70" aria-hidden="true" />
        <p className="text-sm text-white/70">
          <span className="font-semibold text-white">94%</span> job placement rate
        </p>
      </motion.div>
    </div>
  );
}

function AccreditationIllustration() {
  return (
    <motion.div
      className={`${panel} flex flex-col items-center text-center`}
      initial="hidden"
      whileInView="show"
      viewport={illustrationViewport}
      variants={staggerContainer}
    >
      <motion.span
        variants={{
          hidden: { opacity: 0, scale: 0.7 },
          show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
        }}
        className="flex size-14 items-center justify-center rounded-full bg-gold text-navy"
      >
        <Award className="size-7" aria-hidden="true" />
      </motion.span>
      <motion.p variants={fadeUp} className="mt-4 text-base font-semibold text-white">
        AMCA Accredited
      </motion.p>
      <motion.span variants={popIn} className={`mt-2 ${pill} border border-white/15 text-white/80`}>
        Renewed 2025
      </motion.span>
    </motion.div>
  );
}

function TestingSiteIllustration() {
  return (
    <motion.div className={panel} initial="hidden" whileInView="show" viewport={illustrationViewport} variants={staggerContainer}>
      <div className="flex items-center gap-1.5">
        <motion.span variants={popIn} className="size-2 rounded-full bg-white/20" />
        <motion.span variants={popIn} className="size-2 rounded-full bg-white/20" />
        <motion.span variants={popIn} className="size-2 rounded-full bg-white/20" />
        <motion.span variants={fadeUp} className="ml-2 flex-1 truncate rounded-md border border-white/10 px-2 py-1 text-[11px] text-white/40">
          pearsonvue.com/schedule
        </motion.span>
      </div>
      <motion.div variants={fadeUp} className="mt-4 flex items-center justify-between rounded-md border border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <Monitor className="size-4 text-white/70" aria-hidden="true" />
          <span className="text-sm text-white/70">Exam Center</span>
        </div>
        <motion.span variants={popIn} className="rounded-full bg-gold px-2.5 py-1 text-xs font-semibold text-navy">
          On Campus
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

// Real copy pulled from nghi-omega.vercel.app — the "Why NextGen Health
// Institute" value props plus the AMCA / Pearson VUE accreditation section —
// so this stack represents everything the school actually provides.
const cards: FeatureCard[] = [
  {
    index: "01",
    eyebrow: "Faculty",
    icon: Stethoscope,
    title: "Experienced Faculty",
    description: "Learn from healthcare professionals with real-world experience in their fields.",
    points: [
      "Instructors who still work in the field they teach",
      "Small-group mentorship, not lecture halls",
      "Real clinical insight, not just textbooks",
    ],
    illustration: <FacultyIllustration />,
  },
  {
    index: "02",
    eyebrow: "Class size",
    icon: Users,
    title: "Small Class Sizes",
    description: "Get personalized attention and hands-on training with our low student-to-instructor ratios.",
    points: [
      "Low student-to-instructor ratios",
      "Hands-on lab time for every student",
      "Personal attention when you need it",
    ],
    illustration: <ClassSizeIllustration />,
  },
  {
    index: "03",
    eyebrow: "Scheduling",
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Choose from day, evening, and weekend classes to fit your lifestyle and schedule.",
    points: [
      "Day, evening, and weekend cohorts",
      "Built around people who already work",
      "Keep your job while you train",
    ],
    illustration: <SchedulingIllustration />,
  },
  {
    index: "04",
    eyebrow: "After graduation",
    icon: Briefcase,
    title: "Career Support",
    description: "Get job placement assistance and career guidance to help launch your healthcare career.",
    points: [
      "Job placement assistance",
      "One-on-one career guidance",
      "Employer and externship network",
    ],
    illustration: <CareerSupportIllustration />,
  },
  {
    index: "05",
    eyebrow: "Accreditation",
    icon: Award,
    title: "AMCA Accreditation",
    description:
      "We are proudly accredited by the American Medical Certification Association (AMCA), ensuring our programs meet the highest standards of healthcare education.",
    points: [
      "Meets national education standards",
      "Recognized by healthcare employers nationwide",
      "Audited and renewed regularly",
    ],
    illustration: <AccreditationIllustration />,
  },
  {
    index: "06",
    eyebrow: "Certification",
    icon: Monitor,
    title: "Pearson VUE Testing Site",
    description:
      "As an authorized Pearson testing site, we provide convenient access to industry-standard certification exams right here on our campus.",
    points: [
      "Test on campus — no travel required",
      "Industry-standard certification exams",
      "Scheduling coordinated with your cohort",
    ],
    illustration: <TestingSiteIllustration />,
  },
];

function CardContent({ card }: { card: FeatureCard }) {
  return (
    <div className="relative flex h-full w-full flex-col bg-navy p-8 sm:p-10">
      <div className="card-content relative flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-lg border border-white/15">
            <card.icon className="size-5 text-white" aria-hidden="true" />
          </span>
          <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/70">
            {card.eyebrow}
          </span>
        </div>
        <span className="text-xl font-semibold text-white/20">{card.index}</span>
      </div>

      <div className="relative mt-6 flex flex-1 flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
        <div className="card-content flex-1">
          <h3 className="text-2xl font-semibold text-white sm:text-3xl">{card.title}</h3>
          <p className="mt-3 max-w-lg text-lg leading-relaxed text-white/70">{card.description}</p>

          <ul className="mt-5 flex flex-col gap-2.5 border-t border-white/10 pt-5">
            {card.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-white/70">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-white/50" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="card-content w-full lg:w-[340px] lg:shrink-0">{card.illustration}</div>
      </div>
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="mx-auto mb-8 max-w-2xl text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-navy">Why NextGen</p>
      <h2 className="mt-3 text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
        What makes NextGen different
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-neutral-600">
        Six things our students actually notice — from the first day of class to the day they get hired.
      </p>
    </div>
  );
}

function StaticStack() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 md:px-8 lg:px-10">
        <SectionHeader />
        {cards.map((card) => (
          <div key={card.index} className="relative flex min-h-[380px] overflow-hidden rounded-2xl bg-navy sm:min-h-[420px]">
            <CardContent card={card} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function GsapCardStack() {
  const reducedMotion = useIsReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      const el = containerRef.current;
      if (!el) return;

      const context = gsap.context(() => {
        const cardEls = gsap.utils.toArray<HTMLElement>(".stack-card");

        cardEls.forEach((card, i) => {
          const isLast = i === cardEls.length - 1;
          const content = card.querySelectorAll<HTMLElement>(".card-content");

          if (!isLast) {
            ScrollTrigger.create({
              trigger: card,
              start: "top top+=80",
              end: () => `+=${cardEls[i + 1]?.offsetHeight ?? card.offsetHeight}`,
              pin: true,
              pinSpacing: false,
            });
          }

          // Content stagger-reveal, fired exactly when this card becomes active.
          gsap.set(content, { opacity: 0, y: 24 });
          ScrollTrigger.create({
            trigger: card,
            start: "top top+=200",
            onEnter: () => gsap.to(content, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" }),
            onEnterBack: () => gsap.to(content, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" }),
          });

          // Skip the shrink/rotate-away animation on the last card — nothing
          // stacks on top of it, so it has no "end" state to animate toward.
          // (Leaving it in caused an off-viewport rotated card to register as
          // horizontal page overflow on narrow screens.)
          if (!isLast) {
            gsap.fromTo(
              card,
              { scale: 1, rotate: 0, filter: "brightness(1)" },
              {
                scale: 0.92,
                rotate: i % 2 === 0 ? -2.5 : 2.5,
                filter: "brightness(0.65)",
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top top+=80",
                  end: () => `+=${cardEls[i + 1]?.offsetHeight ?? card.offsetHeight}`,
                  scrub: true,
                },
              },
            );
          }
        });
      }, el);

      cleanup = () => context.revert();
    })();

    return () => cleanup?.();
  }, [reducedMotion]);

  if (reducedMotion) {
    return <StaticStack />;
  }

  return (
    <section ref={containerRef} className="relative overflow-x-hidden bg-white">
      <div className="mx-auto max-w-6xl px-5 pt-14 md:px-8 md:pt-20 lg:px-10">
        <SectionHeader />
      </div>
      {cards.map((card, i) => (
        <div
          key={card.index}
          className={`stack-card relative flex items-center justify-center px-5 ${
            i === 0 ? "min-h-[70vh]" : "h-screen"
          }`}
          style={{ zIndex: i + 1 }}
        >
          <div className="relative flex min-h-[460px] w-full max-w-6xl overflow-hidden rounded-2xl bg-navy lg:min-h-[500px]">
            <CardContent card={card} />
          </div>
        </div>
      ))}
    </section>
  );
}
