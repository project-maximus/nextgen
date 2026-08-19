"use client";

import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";

export interface StickyMobileCTAProps {
  variant?: "call+form" | "apply-only";
  applyHref?: string;
  requestInfoHref?: string;
}

/**
 * Watches the `#hero-sentinel` element (placed at the end of each page's Hero)
 * via IntersectionObserver and appears once it scrolls out of view — avoids
 * scroll-event polling per the performance/animation spec.
 */
export function StickyMobileCTA({
  variant = "call+form",
  applyHref = "/how-it-works/apply",
  requestInfoHref = "/contact?type=info",
}: StickyMobileCTAProps) {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useIsReducedMotion();

  useEffect(() => {
    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: reducedMotion ? 0 : 80, opacity: reducedMotion ? 0 : 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reducedMotion ? 0 : 80, opacity: reducedMotion ? 0 : 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-navy/10 bg-canvas/95 p-3 shadow-lg backdrop-blur-sm lg:hidden"
        >
          {variant === "call+form" ? (
            <div className="flex gap-2">
              <Button href={site.phoneHref} variant="secondary" className="flex-1">
                <Phone className="size-4" aria-hidden="true" />
                Call
              </Button>
              <Button href={requestInfoHref} className="flex-1">
                Request Info
              </Button>
            </div>
          ) : (
            <Button href={applyHref} className="w-full">
              Apply Now
            </Button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
