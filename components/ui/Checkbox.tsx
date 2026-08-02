import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  invalid?: boolean;
  label: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { invalid = false, label, className, id, ...props },
  ref,
) {
  return (
    <label
      htmlFor={id}
      className={cn("flex cursor-pointer items-start gap-3 text-body-sm text-neutral-700", className)}
    >
      <span className="relative mt-0.5 inline-flex size-5 shrink-0 items-center justify-center">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          aria-invalid={invalid || undefined}
          className="peer absolute inset-0 size-5 cursor-pointer appearance-none rounded-sm border border-neutral-300 bg-white checked:border-primary-600 checked:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-error"
          {...props}
        />
        <Check
          className="pointer-events-none relative size-3.5 text-white opacity-0 peer-checked:opacity-100"
          aria-hidden="true"
        />
      </span>
      <span>{label}</span>
    </label>
  );
});
