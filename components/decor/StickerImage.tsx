import { cn } from "@/lib/utils";
import Image from "next/image";

export interface StickerImageProps {
  src: string;
  alt: string;
  sizes: string;
  /** Degrees, e.g. -2 or 2. Keep small — this is a subtle tilt, not a spin. */
  rotate?: number;
  priority?: boolean;
  className?: string;
}

/**
 * A photo presented as a "sticker": rounded, thick canvas border, flat
 * raised shadow, slight rotation. Natural color — no duotone tint, per the
 * v2 spec (the illustration system is the ownable move now, not photo tint).
 */
export function StickerImage({ src, alt, sizes, rotate = 0, priority, className }: StickerImageProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-[var(--radius-img)] border-[6px] border-canvas shadow-flat", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <Image src={src} alt={alt} sizes={sizes} fill priority={priority} className="object-cover" />
    </div>
  );
}
