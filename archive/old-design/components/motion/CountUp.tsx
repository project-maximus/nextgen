"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useIsReducedMotion } from "./MotionProvider";

export interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Counts up from 0 to `value` once the element is 40% visible. The final
 * value is always the text actually present in the DOM (never a canvas),
 * so screen readers get the real number even if they don't see the animation.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
  decimals = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.4, once: true });
  const reducedMotion = useIsReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (reducedMotion) {
      setDisplay(value);
      return;
    }

    let raf: number;
    const start = performance.now();
    const durationMs = duration * 1000;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      setDisplay(value * easeOutExpo(progress));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, reducedMotion, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
