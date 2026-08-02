import { cn } from "@/lib/utils";
import Image from "next/image";

export interface DuotoneImageProps {
  src: string;
  alt: string;
  sizes: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  /** Set false for faces (testimonials, team) where natural color reads better, per the brand imagery spec. */
  tinted?: boolean;
  /** Tint strength, 0–100. Defaults to a light 20% wash; bump higher for a calmer, more unified photo set. */
  tintOpacity?: number;
}

/**
 * The one shared implementation of NGHI's warm-duotone photo treatment
 * (primary-800 → accent-100 overlay, ~20% mix) so every photo across the
 * site reads as one consistent brand, regardless of source quality.
 */
export function DuotoneImage({
  src,
  alt,
  sizes,
  fill = true,
  width,
  height,
  priority = false,
  className,
  tinted = true,
  tintOpacity = 20,
}: DuotoneImageProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        {...(fill ? { fill: true } : { width, height })}
        priority={priority}
        className="object-cover"
      />
      {tinted && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-primary-800 to-accent-100 mix-blend-color"
          style={{ opacity: tintOpacity / 100 }}
        />
      )}
    </div>
  );
}
