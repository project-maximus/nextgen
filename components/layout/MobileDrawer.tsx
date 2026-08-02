"use client";

import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import type { NavItem, Program, ProgramCategory } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";

const categoryLabels: Record<ProgramCategory, string> = {
  clinical: "Clinical",
  administrative: "Administrative",
  specialized: "Specialized",
};

export interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  programs: Program[];
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileDrawer({ open, onClose, navItems, programs }: MobileDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useIsReducedMotion();

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const grouped = (["clinical", "administrative", "specialized"] as ProgramCategory[]).map(
    (category) => ({ category, items: programs.filter((p) => p.category === category) }),
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-canvas lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
            <span className="font-display text-h4 text-primary-800">{site.shortName}</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-full p-2 text-neutral-600 hover:bg-neutral-50"
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 px-5 py-4">
            <Accordion type="single" variant="plain">
              <AccordionItem id="mobile-programs" question="Programs">
                <div className="flex flex-col gap-5">
                  {grouped.map(({ category, items }) => (
                    <div key={category}>
                      <p className="mb-2 text-eyebrow uppercase text-primary-600">
                        {categoryLabels[category]}
                      </p>
                      <ul className="flex flex-col gap-2">
                        {items.map((program) => (
                          <li key={program.slug}>
                            <Link
                              href={`/programs/${program.slug}`}
                              onClick={onClose}
                              className="block py-1 text-body text-neutral-700"
                            >
                              {program.shortName}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </AccordionItem>
            </Accordion>

            <ul className="mt-2 flex flex-col divide-y divide-neutral-100 border-t border-neutral-100">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-4 text-h4 font-display text-neutral-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3 border-t border-neutral-100 px-5 py-5">
            <a
              href={site.phoneHref}
              className="flex items-center justify-center gap-2 text-body font-semibold text-primary-700"
            >
              <Phone className="size-4" aria-hidden="true" />
              {site.phone}
            </a>
            <Button href="/how-it-works/apply" onClick={onClose} className="w-full">
              Apply Now
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
