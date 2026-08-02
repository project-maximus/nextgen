"use client";

import { Reveal } from "@/components/motion/Reveal";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChips } from "@/components/ui/FilterChips";
import { programCategories } from "@/content/programs";
import type { Program } from "@/types";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ProgramCard } from "./ProgramCard";

export interface ProgramFinderProps {
  programs: Program[];
}

export function ProgramFinder({ programs }: ProgramFinderProps) {
  const [category, setCategory] = useState<string>("all");

  const filtered = programs.filter((p) => category === "all" || p.category === category);

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <div className="mb-8">
            <h2 className="text-h2 font-display text-navy">Find Your Program</h2>
            <p className="mt-3 max-w-prose text-body-lg text-primary-700">
              Launch your career in healthcare with our comprehensive training programs. Choose from our most
              popular programs below.
            </p>
          </div>

          <FilterChips
            aria-label="Filter programs by category"
            options={programCategories.map((c) => ({ value: c.value, label: c.label }))}
            value={category}
            onChange={setCategory}
          />

          {filtered.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No programs match this filter"
              description="Try a different category."
              className="mt-8"
            />
          ) : (
            <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((program) => (
                <motion.div key={program.slug} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <ProgramCard program={program} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <p className="mt-10 text-center text-body-sm text-primary-700">
            Not sure which fits?{" "}
            <Link href="/programs" className="font-semibold text-navy underline underline-offset-2 hover:text-gold-deep">
              Take the 3-question quiz →
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
