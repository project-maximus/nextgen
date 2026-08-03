import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

interface BaseProps {
  /** Stable key for swapping in the final asset later without touching layout. */
  id: string;
  aspectRatio: string;
  caption: string;
  className?: string;
  tone?: "mist" | "ink";
}

interface ImageSlotProps extends BaseProps {
  kind: "image";
  src?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}

interface VideoSlotProps extends BaseProps {
  kind: "video";
  src?: string;
  poster?: string;
}

export type AssetSlotProps = ImageSlotProps | VideoSlotProps;

/**
 * Build-time placeholder system (§7.6): until a real photo/video exists,
 * render a fixed-aspect-ratio block with a monoline glyph + a caption
 * describing the intended shot, so the final asset drops in with zero
 * layout shift. Pass `src` once the real media is ready.
 */
export function AssetSlot(props: AssetSlotProps) {
  const { id, aspectRatio, caption, className, tone = "mist" } = props;

  if (props.kind === "image" && props.src) {
    return (
      <div className={cn("relative overflow-hidden", className)} style={{ aspectRatio }} data-asset-slot={id}>
        <Image
          src={props.src}
          alt={props.alt}
          fill
          sizes={props.sizes}
          priority={props.priority}
          className="object-cover"
          style={{ filter: "saturate(0.85) contrast(1.04)" }}
        />
      </div>
    );
  }

  if (props.kind === "video" && props.src) {
    return (
      <div className={cn("relative overflow-hidden", className)} style={{ aspectRatio }} data-asset-slot={id}>
        <video
          className="h-full w-full object-cover"
          style={{ filter: "saturate(0.85) contrast(1.04)" }}
          src={props.src}
          poster={props.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 overflow-hidden",
        tone === "ink" ? "bg-[var(--color-v4-ink-800)]" : "bg-[var(--color-v4-mist)]",
        className,
      )}
      style={{ aspectRatio }}
      data-asset-slot={id}
    >
      <ImageIcon
        className={cn("size-8", tone === "ink" ? "text-[var(--color-v4-text-inv-3)]" : "text-[var(--color-v4-text-3)]")}
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <p
        className={cn(
          "px-6 text-center text-[11px] font-medium uppercase tracking-[0.1em]",
          tone === "ink" ? "text-[var(--color-v4-text-inv-3)]" : "text-[var(--color-v4-text-3)]",
        )}
      >
        {caption}
      </p>
    </div>
  );
}
