import { cn } from "@/lib/utils";
import { forwardRef, type TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid = false, className, rows = 4, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(
        "w-full rounded-md border bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 transition-colors",
        "focus-visible:outline-none",
        invalid
          ? "border-error focus:border-error"
          : "border-neutral-300 focus:border-primary-400",
        "disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400",
        className,
      )}
      {...props}
    />
  );
});
