import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type BadgeVariant = "solid" | "soft" | "outline";
export type BadgeTone = "success" | "warning" | "neutral" | "primary" | "accent";

const toneClasses: Record<BadgeTone, Record<BadgeVariant, string>> = {
  success: {
    solid: "bg-success text-white",
    soft: "bg-success-bg text-success",
    outline: "border border-success text-success",
  },
  warning: {
    solid: "bg-warning text-white",
    soft: "bg-warning-bg text-warning",
    outline: "border border-warning text-warning",
  },
  neutral: {
    solid: "bg-neutral-700 text-white",
    soft: "bg-neutral-100 text-neutral-700",
    outline: "border border-neutral-300 text-neutral-700",
  },
  primary: {
    solid: "bg-primary-600 text-white",
    soft: "bg-primary-50 text-primary-700",
    outline: "border border-primary-200 text-primary-700",
  },
  // Gold fails contrast with white text and with accent-700 text on light
  // backgrounds — dark navy / accent-800 pass instead.
  accent: {
    solid: "bg-accent-600 text-primary-900",
    soft: "bg-accent-50 text-accent-800",
    outline: "border border-accent-600 text-accent-800",
  },
};

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  tone?: BadgeTone;
  className?: string;
}

export function Badge({ children, variant = "soft", tone = "primary", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-body-sm font-semibold",
        toneClasses[tone][variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
