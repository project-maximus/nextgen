"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";

export interface HighlightSwipeProps {
  children: ReactNode;
}

/**
 * A hand-drawn gold marker swipe behind a word/phrase, scaleX 0→1 draw-in
 * when in view. The signature typographic move of the v2 design system.
 */
export function HighlightSwipe({ children }: HighlightSwipeProps) {
  const reducedMotion = useIsReducedMotion();

  return (
    <span className="relative inline-block whitespace-nowrap px-1">
      <motion.svg
        viewBox="0 0 220 60"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        style={{ transformOrigin: "left center" }}
        initial={{ scaleX: reducedMotion ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <path
          d="M4 30 C 2 12, 20 6, 40 7 C 90 4, 160 4, 210 9 C 218 10, 218 16, 216 22 C 218 34, 218 46, 210 50 C 160 56, 90 57, 38 54 C 18 53, 3 48, 4 34 Z"
          fill="var(--color-gold)"
        />
      </motion.svg>
      <span className="relative">{children}</span>
    </span>
  );
}
