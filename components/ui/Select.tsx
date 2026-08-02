import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { forwardRef, type SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { invalid = false, className, children, ...props },
  ref,
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          "h-12 w-full appearance-none rounded-md border bg-white px-4 pr-10 text-base text-neutral-900 transition-colors",
          "focus-visible:outline-none",
          invalid
            ? "border-error focus:border-error"
            : "border-neutral-300 focus:border-primary-400",
          "disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-neutral-500"
        aria-hidden="true"
      />
    </div>
  );
});
