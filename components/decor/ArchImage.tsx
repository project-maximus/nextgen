import { cn } from "@/lib/utils";
import Image from "next/image";

export interface ArchImageProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/** A photo with an arch-top mask (SchoolAI-style), natural color, no tint. */
export function ArchImage({ src, alt, sizes, priority, className }: ArchImageProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-t-full rounded-b-[var(--radius-img)]", className)}>
      <Image src={src} alt={alt} sizes={sizes} fill priority={priority} className="object-cover" />
    </div>
  );
}
