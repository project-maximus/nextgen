"use client";

import { DuotoneImage } from "@/components/ui/DuotoneImage";
import { cn } from "@/lib/utils";
import { useIsReducedMotion } from "./MotionProvider";

export interface VerticalMarqueeProps {
  images: string[];
  direction?: "up" | "down";
  durationSeconds?: number;
  className?: string;
  imageClassName?: string;
  ariaLabel?: string;
  /** Passed through to DuotoneImage — bump for a calmer, more unified photo set. */
  tintOpacity?: number;
}

/**
 * A single column of images looping vertically (two duplicated stacks
 * translating by -50%, the same seamless-loop technique as the horizontal
 * Marquee). Falls back to a static stack under prefers-reduced-motion.
 */
export function VerticalMarquee({
  images,
  direction = "up",
  durationSeconds = 24,
  className,
  imageClassName,
  ariaLabel = "Photo strip",
  tintOpacity,
}: VerticalMarqueeProps) {
  const reducedMotion = useIsReducedMotion();

  if (reducedMotion) {
    return (
      <div className={cn("flex flex-col gap-5", className)}>
        {images.map((src, i) => (
          <DuotoneImage
            key={i}
            src={src}
            alt=""
            sizes="240px"
            tintOpacity={tintOpacity}
            className={cn("aspect-[3/4] w-full rounded-lg", imageClassName)}
          />
        ))}
      </div>
    );
  }

  return (
    <div role="list" aria-label={ariaLabel} tabIndex={0} className={cn("group overflow-hidden", className)}>
      <div
        className="flex flex-col gap-5 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
        style={{
          animationName: "marquee-scroll-vertical",
          animationDuration: `${durationSeconds}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: direction === "down" ? "reverse" : "normal",
        }}
      >
        {[0, 1].map((trackIndex) => (
          <div key={trackIndex} aria-hidden={trackIndex === 1 || undefined} className="flex flex-col gap-5">
            {images.map((src, i) => (
              <DuotoneImage
                key={i}
                src={src}
                alt=""
                sizes="240px"
                tintOpacity={tintOpacity}
                className={cn("aspect-[3/4] w-full rounded-lg", imageClassName)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
