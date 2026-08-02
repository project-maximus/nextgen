import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-md bg-[linear-gradient(90deg,var(--color-neutral-100)_25%,var(--color-neutral-50)_50%,var(--color-neutral-100)_75%)] bg-[length:200%_100%]",
        "motion-safe:animate-[shimmer_1.4s_ease-in-out_infinite]",
        className,
      )}
      {...props}
    />
  );
}
