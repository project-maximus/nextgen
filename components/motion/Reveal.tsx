"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useIsReducedMotion } from "./MotionProvider";

export interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds, for the rare case a section needs 2-3 grouped reveals. */
  delay?: number;
}

/**
 * whileInView fade-up, 400ms, once. Use one per section — never per element —
 * per the animation spec. Degrades to an instant opacity-only appearance
 * under prefers-reduced-motion.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reducedMotion = useIsReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: reducedMotion ? 0.01 : 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
