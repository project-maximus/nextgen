"use client";

import type { Program, ProgramCategory } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";

const categoryLabels: Record<ProgramCategory, string> = {
  clinical: "Clinical",
  administrative: "Administrative",
  specialized: "Specialized",
};

export interface MegaMenuProps {
  programs: Program[];
}

export function MegaMenu({ programs }: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerId = useId();
  const panelId = useId();
  const reducedMotion = useIsReducedMotion();

  const grouped = (["clinical", "administrative", "specialized"] as ProgramCategory[]).map(
    (category) => ({
      category,
      items: programs.filter((p) => p.category === category),
    }),
  );

  useEffect(() => {
    if (!open) return;

    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        id={triggerId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 rounded-full px-4 py-2 text-body-sm font-medium text-navy transition-colors hover:bg-navy-soft"
      >
        Programs
        <ChevronDown
          className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="menu"
            aria-labelledby={triggerId}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: reducedMotion ? 0 : 0.18 }}
            className="absolute left-1/2 top-full z-40 mt-2 w-[min(90vw,780px)] -translate-x-1/2 rounded-xl border border-neutral-100 bg-white p-6 shadow-lg"
          >
            <div className="grid grid-cols-3 gap-6">
              {grouped.map(({ category, items }) => (
                <div key={category}>
                  <p className="mb-3 text-eyebrow uppercase text-primary-600">
                    {categoryLabels[category]}
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {items.map((program) => (
                      <li key={program.slug}>
                        <Link
                          href={`/programs/${program.slug}`}
                          role="menuitem"
                          onClick={() => setOpen(false)}
                          className="block text-body-sm text-neutral-700 hover:text-primary-700"
                        >
                          {program.shortName}
                          <span className="block text-xs text-neutral-400">{program.duration}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-neutral-100 pt-4">
              <Link
                href="/programs"
                onClick={() => setOpen(false)}
                className="text-body-sm font-semibold text-accent-800 hover:text-primary-700"
              >
                View all programs →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
