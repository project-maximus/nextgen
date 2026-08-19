import { Reveal } from "@/components/motion-v4/Reveal";
import type { Program } from "@/types";
import { Check } from "lucide-react";
import Image from "next/image";

export function CertificationSection({ program }: { program: Program }) {
  const { certification } = program;

  return (
    <section className="v4-scope v4-on-navy bg-[var(--color-v4-ink-900)] py-16 sm:py-24">
      <div className="mx-auto max-w-[1600px] px-6 md:px-8 xl:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_minmax(0,340px)] lg:gap-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">Certification</p>
            <h2 className="mt-3 max-w-lg text-[clamp(1.75rem,1.2rem+1.9vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-white">
              Graduate ready to certify.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
              Coursework is built directly around the {certification.exam} exam blueprint, administered by{" "}
              {certification.body}. Structured review sessions run throughout the program, not just at the end.
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {[certification.exam, "AMCA-accredited curriculum", certification.onCampus ? "Exam offered on campus" : "Exam scheduling support"].map(
                (item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-white/60" strokeWidth={2} aria-hidden="true" />
                    <span className="text-sm text-white/80">{item}</span>
                  </li>
                ),
              )}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between rounded-[24px] border border-white/10 bg-white/[0.04] p-8">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-white p-3">
                <Image src="/logos/amca.png" alt="AMCA" width={399} height={126} className="h-auto w-full" />
              </div>
              <div className="mt-8">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/50">Pearson VUE</p>
                <p className="mt-2 text-base text-white">Authorized on-campus testing site.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
