"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ElementType } from "react";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollFillTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Tailwind text-color class for the unread words. */
  dimClassName?: string;
}

/**
 * Manifesto-style statement: every word starts dim and fills to full ink,
 * scrubbed to scroll position as the paragraph crosses the viewport. Words are
 * plain spans rendered on the server, so the text is always selectable and
 * readable by assistive tech — only their opacity is animated.
 */
export function ScrollFillText({
  text,
  as: Tag = "p",
  className,
  dimClassName = "opacity-20",
}: ScrollFillTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useIsReducedMotion();
  const words = text.split(" ");

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const spans = el.querySelectorAll<HTMLSpanElement>("[data-word]");
      if (reducedMotion) {
        gsap.set(spans, { opacity: 1 });
        return;
      }
      gsap.to(spans, {
        opacity: 1,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
      });
    },
    { scope: ref, dependencies: [reducedMotion] },
  );

  const Component = Tag as ElementType;
  return (
    <Component ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} data-word className={dimClassName}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Component>
  );
}
