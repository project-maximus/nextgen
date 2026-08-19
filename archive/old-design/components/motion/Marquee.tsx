"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { useIsReducedMotion } from "./MotionProvider";

export interface MarqueeProps {
  children: ReactNode[];
  direction?: "left" | "right";
  durationSeconds?: number;
  className?: string;
  trackClassName?: string;
  ariaLabel: string;
  /** Fades content to transparent at the edges. Turn off for content (e.g. dark cards) that looks worse fading against a contrasting section background. */
  edgeFade?: boolean;
}

/**
 * CSS translateX loop (two duplicated tracks for a seamless cycle), pauses on
 * hover/focus, keyboard-reachable. Falls back to a static wrapping grid under
 * prefers-reduced-motion, per the animation spec.
 */
export function Marquee({
  children,
  direction = "left",
  durationSeconds = 50,
  className,
  trackClassName,
  ariaLabel,
  edgeFade = true,
}: MarqueeProps) {
  const reducedMotion = useIsReducedMotion();

  if (reducedMotion) {
    return (
      <div
        role="list"
        aria-label={ariaLabel}
        className={cn("flex flex-wrap items-center justify-center gap-6", className)}
      >
        {children.map((child, i) => (
          <div role="listitem" key={i} className={trackClassName}>
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      role="list"
      aria-label={ariaLabel}
      tabIndex={0}
      className={cn(
        "group relative flex overflow-hidden",
        edgeFade && "[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]",
        className,
      )}
    >
      {[0, 1].map((trackIndex) => (
        <div
          key={trackIndex}
          aria-hidden={trackIndex === 1 || undefined}
          className="flex shrink-0 items-center gap-6 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
          style={{
            animationName: "marquee-scroll",
            animationDuration: `${durationSeconds}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDirection: direction === "right" ? "reverse" : "normal",
          }}
        >
          {children.map((child, i) => (
            <div role="listitem" key={i} className={trackClassName}>
              {child}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
