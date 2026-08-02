"use client";

import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { Reveal } from "@/components/motion/Reveal";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { site } from "@/content/site";
import { motion } from "framer-motion";
import { Award, BadgeCheck, GraduationCap, ShieldCheck, Stethoscope } from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const seals = [
  { icon: ShieldCheck, label: "AMCA" },
  { icon: Award, label: "Pearson VUE" },
  { icon: Stethoscope, label: "Since 1992" },
  { icon: GraduationCap, label: "11 programs" },
];

export function TrustAccordion() {
  const reducedMotion = useIsReducedMotion();

  return (
    <section className="bg-canvas py-16 md:py-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <Reveal>
          <p className="text-eyebrow uppercase text-gold-deep">Trust &amp; accreditation</p>
          <h2 className="mt-2 max-w-md text-h2 font-display text-navy">Real credentials, not just promises.</h2>

          <Accordion type="single" defaultOpenIds={["amca"]} className="mt-8 border-t border-navy/10">
            <AccordionItem id="amca" question="AMCA-accredited curriculum">
              {site.accreditation[0]?.description}
            </AccordionItem>
            <AccordionItem id="pearson" question="Pearson VUE testing, right on campus">
              {site.accreditation[1]?.description}
            </AccordionItem>
            <AccordionItem id="instructors" question="Instructors who still work the job">
              Every lead instructor still practices in the field they teach — you learn from people doing the
              work today, not just theory from a textbook.
            </AccordionItem>
            <AccordionItem id="outcomes" question="Outcomes we actually publish">
              We track and share real placement and pass-rate data for every program — no vague promises, no
              cherry-picked numbers.
            </AccordionItem>
          </Accordion>
        </Reveal>

        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, rotate: -3 }}
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: reducedMotion ? 0.01 : 0.5, ease: EASE_OUT_EXPO }}
          className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center"
        >
          <div
            className="absolute inset-0 rounded-[40px]"
            style={{
              background: "linear-gradient(155deg, var(--color-navy) 0%, var(--color-navy-deep) 100%)",
              clipPath: "polygon(50% 0%, 100% 22%, 100% 78%, 50% 100%, 0% 78%, 0% 22%)",
            }}
          />
          <BadgeCheck
            className="absolute size-16 text-gold/25"
            aria-hidden="true"
            style={{ transform: "translateY(-4px)" }}
          />
          <div className="relative grid grid-cols-2 gap-4 p-10">
            {seals.map((seal, i) => (
              <motion.div
                key={seal.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reducedMotion ? 0.01 : 0.4, delay: reducedMotion ? 0 : 0.15 + i * 0.08, ease: EASE_OUT_EXPO }}
                className="flex flex-col items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-5 text-center backdrop-blur-sm"
              >
                <seal.icon className="size-6 text-gold" aria-hidden="true" />
                <span className="text-xs font-semibold text-canvas">{seal.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
