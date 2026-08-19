import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3 py-16 text-center", className)}>
      <span className="flex size-12 items-center justify-center rounded-full bg-primary-50 text-primary-600">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <p className="text-h4 font-display text-neutral-900">{title}</p>
      {description && <p className="max-w-sm text-body-sm text-neutral-500">{description}</p>}
      {action}
    </div>
  );
}
