"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef, type ElementType, type ReactNode } from "react";

gsap.registerPlugin(SplitText);

export interface RevealLinesProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Fires on load instead of on scroll (hero headline). */
  onLoad?: boolean;
  delay?: number;
}

/**
 * Headline line-mask reveal (§6.1): SplitText by lines only (never chars/
 * words — that reads as template), each line rises 110% -> 0 with an 80ms
 * stagger. The split is reverted after animating so selection/AT read
 * normal text. The container stays CSS-hidden until each line's "from"
 * transform is already applied, so there's never a flash of static text.
 */
export function RevealLines({ children, as: Tag = "h2", className, onLoad = false, delay = 0 }: RevealLinesProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useIsReducedMotion();

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      if (reducedMotion) {
        gsap.set(el, { autoAlpha: 1 });
        return;
      }

      const run = () => {
        const split = SplitText.create(el, { type: "lines", mask: "lines" });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 0.9,
          ease: "quint.out",
          stagger: 0.08,
          delay,
          ...(onLoad
            ? {}
            : { scrollTrigger: { trigger: el, start: "top 85%", once: true } }),
          onComplete: () => split.revert(),
        });
        // Lines already carry their "from" transform — safe to reveal the container now.
        gsap.set(el, { autoAlpha: 1 });
      };

      if (onLoad) {
        document.fonts.ready.then(run);
      } else {
        run();
      }
    },
    { scope: containerRef, dependencies: [reducedMotion] },
  );

  const Component = Tag as ElementType;
  return (
    <Component ref={containerRef} className={className} style={{ visibility: "hidden" }}>
      {children}
    </Component>
  );
}
