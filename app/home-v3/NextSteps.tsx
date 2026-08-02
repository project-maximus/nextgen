"use client";

import { Reveal } from "@/components/motion/Reveal";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, MapPin, ScrollText, Users } from "lucide-react";
import Link from "next/link";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    icon: ScrollText,
    title: "Explore all 11 programs",
    href: "/programs",
  },
  {
    icon: Users,
    title: "Meet your future instructors",
    href: "/about",
  },
  {
    icon: MapPin,
    title: "Tour our Dallas–Fort Worth campus",
    href: "/contact",
  },
];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cardIn: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT_EXPO } },
};

export function NextSteps() {
  return (
    <section className="bg-navy-soft py-14 md:py-16">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            variants={stagger}
          >
            {steps.map((step) => (
              <motion.div key={step.title} variants={cardIn}>
                <Link
                  href={step.href}
                  className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy-soft text-navy">
                      <step.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-body-sm font-semibold text-navy">{step.title}</span>
                  </span>
                  <ArrowRight
                    className="size-4 shrink-0 text-gold-deep transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
