"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useIsReducedMotion } from "@/components/motion/MotionProvider";

export type DoodleName =
  | "stethoscope"
  | "heartbeat"
  | "clipboard"
  | "bandage"
  | "arrow"
  | "star"
  | "circle";

const paths: Record<DoodleName, string> = {
  stethoscope:
    "M20 6 C20 12 24 12 24 6 M32 6 C32 12 36 12 36 6 M24 8 L24 22 C24 32 32 32 32 22 L32 8 M32 26 C32 34 40 34 40 26 C40 21 36 20 36 24 C36 27 40 27 40 24",
  heartbeat: "M4 24 L16 24 L21 10 L27 38 L32 24 L38 24 L42 16 L46 24 L56 24",
  clipboard:
    "M16 10 L44 10 L44 50 L16 50 Z M24 6 L36 6 L36 12 L24 12 Z M22 22 L38 22 M22 30 L38 30 M22 38 L32 38",
  bandage:
    "M12 30 C12 20 20 12 30 12 C40 12 48 20 48 30 C48 40 40 48 30 48 C20 48 12 40 12 30 Z M22 22 L26 26 M34 34 L38 38 M22 38 L26 34 M34 26 L38 22",
  arrow: "M6 42 C 20 10, 40 6, 56 20 M46 14 L 56 20 L 50 30",
  star: "M30 4 L36 22 L55 22 L40 34 L46 52 L30 41 L14 52 L20 34 L5 22 L24 22 Z",
  circle: "M30 4 C 46 4 56 16 56 30 C 56 44 46 56 30 56 C 14 56 4 44 4 30 C 4 18 12 8 22 5",
};

export interface DoodleProps {
  name: DoodleName;
  variant?: "static" | "float" | "draw";
  className?: string;
  style?: React.CSSProperties;
}

/**
 * NGHI's ownable illustration system: single-weight ink line-art doodles.
 * `float` gently oscillates via CSS; `draw` animates the stroke on scroll.
 * Always decorative — aria-hidden.
 */
export function Doodle({ name, variant = "static", className, style }: DoodleProps) {
  const reducedMotion = useIsReducedMotion();
  const d = paths[name];

  const svg =
    variant === "draw" ? (
      <motion.path
        d={d}
        initial={{ pathLength: reducedMotion ? 1 : 0, opacity: reducedMotion ? 1 : 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reducedMotion ? 0 : 1, ease: [0.16, 1, 0.3, 1] }}
      />
    ) : (
      <path d={d} />
    );

  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
      className={cn(
        "text-primary-800",
        variant === "float" && !reducedMotion && "motion-safe:animate-[doodle-float_6s_ease-in-out_infinite]",
        className,
      )}
    >
      {svg}
    </svg>
  );
}
