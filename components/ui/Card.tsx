import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  padding?: "sm" | "md";
}

export function Card({ hoverable = false, padding = "md", className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-neutral-100 bg-white shadow-sm",
        padding === "md" ? "p-6 md:p-8" : "p-6",
        hoverable &&
          "transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
