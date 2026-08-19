"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import type { Program } from "@/types";
import { GraduationCap, Wallet } from "lucide-react";

export function FinancialAid({ program }: { program: Program }) {
  return (
    <section className="bg-neutral-50 py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-navy">Financial aid</p>
            <h2 className="mt-2 text-h2 font-medium tracking-tight text-neutral-900">
              Financial constraints shouldn&apos;t stand in your way.
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-left">
              <div className="flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-5">
                <Wallet className="mt-0.5 size-5 shrink-0 text-navy" aria-hidden="true" />
                <div>
                  <p className="text-base font-semibold text-neutral-900">Federal Financial Aid</p>
                  <p className="mt-1 text-sm text-neutral-600">
                    Pell Grants and Federal Student Loans available
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-5">
                <GraduationCap className="mt-0.5 size-5 shrink-0 text-navy" aria-hidden="true" />
                <div>
                  <p className="text-base font-semibold text-neutral-900">Scholarships</p>
                  <p className="mt-1 text-sm text-neutral-600">
                    Merit-based scholarships for qualified students
                  </p>
                </div>
              </div>
            </div>
            <Button href={`/contact?type=info&program=${program.slug}`} className="mt-6 w-full sm:w-auto">
              Speak with a Financial Aid Expert
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
