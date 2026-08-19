import { cn } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";

export interface TrustBadgeItem {
  name: string;
  description: string;
}

export interface TrustBadgeRowProps {
  badges: TrustBadgeItem[];
  layout?: "inline" | "stacked";
  tone?: "light" | "dark" | "muted";
  className?: string;
}

const iconTone = {
  light: "text-primary-600",
  dark: "text-gold",
  muted: "text-neutral-400",
};

const textTone = {
  light: "text-neutral-800",
  dark: "text-canvas",
  muted: "text-neutral-500",
};

export function TrustBadgeRow({ badges, layout = "inline", tone = "light", className }: TrustBadgeRowProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-x-6 gap-y-3",
        layout === "stacked" && "flex-col gap-3",
        className,
      )}
    >
      {badges.map((badge) => (
        <div key={badge.name} className="flex items-center gap-2" title={badge.description}>
          <ShieldCheck className={cn("size-4 shrink-0", iconTone[tone])} aria-hidden="true" />
          <span className={cn("text-body-sm font-medium", textTone[tone])}>{badge.name}</span>
        </div>
      ))}
    </div>
  );
}
