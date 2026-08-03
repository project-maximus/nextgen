"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, type ElementType, type ReactNode } from "react";

export interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Stagger delay in seconds for grouped reveals. */
  delay?: number;
}

/**
 * Standard scroll reveal (§6.1): autoAlpha + 24px rise, 600ms quint.out,
 * fires once. Initial hidden state is a CSS class (not inline style) so
 * content is present in the DOM and never flashes for non-JS/AT users.
 */
export function Reveal({ children, className, as: Tag = "div", delay = 0 }: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useIsReducedMotion();

  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (reducedMotion) {
        // Final state immediately — also clears the pre-hydration .gsap-hidden CSS class.
        gsap.set(containerRef.current, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.from(containerRef.current, {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        delay,
        ease: "quint.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%", once: true },
      });
    },
    { scope: containerRef, dependencies: [reducedMotion] },
  );

  const Component = Tag as ElementType;
  return (
    <Component ref={containerRef} className={className ? `${className} gsap-hidden` : "gsap-hidden"}>
      {children}
    </Component>
  );
}
