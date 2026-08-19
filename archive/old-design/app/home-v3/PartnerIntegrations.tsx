"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { partners } from "@/content/partners";
import { motion, type Variants } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
const chipIn: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT_EXPO } },
};

export function PartnerIntegrations() {
  return (
    <section className="bg-gold-soft pb-16 pt-2 md:pb-24">
      <div
        aria-hidden="true"
        className="bg-scallop-top mx-auto h-2.5 max-w-[1280px]"
        style={{ ["--scallop-color" as string]: "var(--color-canvas)" }}
      />
      <div className="mx-auto max-w-[1280px] bg-canvas px-5 pb-10 pt-8 md:px-8 lg:px-10">
        <Reveal>
          <div className="overflow-hidden rounded-[32px] border border-navy/10 bg-white p-8 shadow-sm md:p-12">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
              <div>
                <p className="text-eyebrow uppercase text-gold-deep">Externship network</p>
                <h2 className="mt-2 text-h2 font-display text-navy">
                  Real employers, ready to hire our graduates.
                </h2>
                <p className="mt-3 max-w-sm text-body text-primary-700">
                  Every program includes a supervised externship with a partner clinic, lab, or hospital across
                  Dallas–Fort Worth.
                </p>
                <Button href="/programs" variant="secondary" className="mt-6 border-navy/15 text-navy">
                  See where grads work
                </Button>
              </div>

              <motion.div
                className="grid grid-cols-2 gap-3 sm:grid-cols-4"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                variants={stagger}
              >
                {partners.map((partner) => (
                  <motion.div
                    key={partner.id}
                    variants={chipIn}
                    className="flex h-20 items-center justify-center rounded-2xl border border-navy/10 bg-canvas px-3 text-center transition-colors duration-200 hover:border-gold-deep/40 hover:bg-gold-soft"
                  >
                    <span className="line-clamp-3 text-xs font-semibold leading-tight text-navy/70">
                      {partner.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
      <div
        aria-hidden="true"
        className="bg-scallop-top mx-auto h-2.5 max-w-[1280px] rotate-180"
        style={{ ["--scallop-color" as string]: "var(--color-canvas)" }}
      />
    </section>
  );
}
