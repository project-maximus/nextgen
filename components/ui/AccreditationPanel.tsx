import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccreditationPanelProps {
  name: string;
  fullName: string;
  description: string;
  layout?: "side-by-side" | "stacked";
  className?: string;
}

export function AccreditationPanel({ name, fullName, description, layout = "side-by-side", className }: AccreditationPanelProps) {
  return (
    <div
      className={cn(
        "flex gap-4 rounded-lg border border-neutral-100 bg-white p-6",
        layout === "stacked" ? "flex-col items-start" : "items-start",
        className,
      )}
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700">
        <Award className="size-6" aria-hidden="true" />
      </span>
      <div>
        <p className="text-h4 font-display text-neutral-900">{name}</p>
        <p className="text-body-sm font-medium text-neutral-500">{fullName}</p>
        <p className="mt-2 text-body-sm text-neutral-600">{description}</p>
      </div>
    </div>
  );
}
