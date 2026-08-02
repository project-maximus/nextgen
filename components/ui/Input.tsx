import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid = false, className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "h-12 w-full rounded-md border bg-white px-4 text-base text-neutral-900 placeholder:text-neutral-400 transition-colors",
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
