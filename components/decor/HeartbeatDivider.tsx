"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";

export interface HeartbeatDividerProps {
  /** Use "on-navy" inside a dark section so the trace stays gold-on-dark. */
  tone?: "on-canvas" | "on-navy";
  className?: string;
}

/** Full-width EKG trace pulled from the logo mark — draws in as it enters view. */
export function HeartbeatDivider({ tone = "on-canvas", className }: HeartbeatDividerProps) {
  const reducedMotion = useIsReducedMotion();

  return (
    <div className={cn("w-full", className)} aria-hidden="true">
      <motion.svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="h-8 w-full"
        initial={{ pathLength: reducedMotion ? 1 : 0, opacity: reducedMotion ? 1 : 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: reducedMotion ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.path
          d="M0 30 L340 30 L370 8 L400 52 L430 30 L460 16 L480 30 L1200 30"
          fill="none"
          stroke={tone === "on-navy" ? "var(--color-gold)" : "var(--color-gold-deep)"}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </div>
  );
}
