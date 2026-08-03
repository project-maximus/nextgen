"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

export interface CounterProps {
  value: number;
  decimals?: number;
  className?: string;
}

/**
 * GSAP tween of a numeric proxy (§6.1), 0.9s quint.out, fires once on
 * reveal. Rendered with toLocaleString + tabular numerals. Percent/plus
 * suffixes are static text passed alongside this, never tweened.
 */
export function Counter({ value, decimals = 0, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useIsReducedMotion();
  const [display, setDisplay] = useState(reducedMotion ? value : 0);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (reducedMotion) {
        setDisplay(value);
        return;
      }
      const proxy = { val: 0 };
      gsap.to(proxy, {
        val: value,
        duration: 0.9,
        ease: "quint.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        onUpdate: () => setDisplay(Number(proxy.val.toFixed(decimals))),
      });
    },
    { scope: ref, dependencies: [reducedMotion, value] },
  );

  return (
    <span ref={ref} className={`tnum ${className ?? ""}`}>
      {display.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
    </span>
  );
}
