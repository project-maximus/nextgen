import { ArchImage } from "@/components/decor/ArchImage";
import { StickerImage } from "@/components/decor/StickerImage";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface FeatureRowProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  linkLabel?: string;
  linkHref?: string;
  imageSide?: "left" | "right";
  imageShape?: "arch" | "sticker";
}

export function FeatureRow({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  linkLabel,
  linkHref,
  imageSide = "left",
  imageShape = "sticker",
}: FeatureRowProps) {
  return (
    <Reveal>
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
        <div className={cn("h-64 md:h-80", imageSide === "right" && "md:order-2")}>
          {imageShape === "arch" ? (
            <ArchImage src={image} alt={imageAlt} sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full" />
          ) : (
            <StickerImage
              src={image}
              alt={imageAlt}
              sizes="(min-width: 768px) 50vw, 100vw"
              rotate={-2}
              className="h-full w-full"
            />
          )}
        </div>
        <div className={cn(imageSide === "right" && "md:order-1")}>
          <p className="inline-flex rounded-full bg-gold-soft px-3 py-1 text-eyebrow uppercase text-navy">
            {eyebrow}
          </p>
          <h3 className="mt-3 text-h3 font-display text-navy">{title}</h3>
          <p className="mt-3 max-w-prose text-body text-primary-700">{description}</p>
          {linkLabel && linkHref && (
            <Link
              href={linkHref}
              className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-deep"
            >
              {linkLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </Reveal>
  );
}
