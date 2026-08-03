"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "./SmoothScrollProvider";

/**
 * Nav hide-on-scroll-down / reveal-on-scroll-up + "past N px" state. Reads
 * scroll through the shared Lenis instance (no raw scroll/wheel listeners
 * per §11) — falls back to a native listener only when Lenis isn't running
 * (reduced-motion users, where SmoothScrollProvider never instantiates it).
 */
export function useScrollDirection(threshold = 24) {
  const lenis = useLenis();
  const [hidden, setHidden] = useState(false);
  const [pastThreshold, setPastThreshold] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const evaluate = (y: number) => {
      setPastThreshold(y > threshold);
      const goingDown = y > lastY.current;
      setHidden(goingDown && y > threshold * 3);
      lastY.current = y;
    };

    if (lenis) {
      const onScroll = () => evaluate(window.scrollY);
      lenis.on("scroll", onScroll);
      return () => {
        lenis.off("scroll", onScroll);
      };
    }

    const onNativeScroll = () => evaluate(window.scrollY);
    onNativeScroll();
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    return () => window.removeEventListener("scroll", onNativeScroll);
  }, [lenis, threshold]);

  return { hidden, pastThreshold };
}
