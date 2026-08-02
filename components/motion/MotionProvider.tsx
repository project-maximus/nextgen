"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { createContext, useContext, type ReactNode } from "react";

const ReducedMotionContext = createContext(false);

/**
 * Single place `prefers-reduced-motion` is read and distributed from.
 * Reveal, CountUp, and Marquee all consume this instead of calling the
 * media-query hook themselves, so reduced-motion handling lives in one spot.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  return (
    <ReducedMotionContext.Provider value={reducedMotion}>{children}</ReducedMotionContext.Provider>
  );
}

export function useIsReducedMotion() {
  return useContext(ReducedMotionContext);
}
