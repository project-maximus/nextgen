import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

/** Shared form primitives — underline-free, soft-filled fields that match the v4 system. */

// Border colors use `!` because globals.css sets an unlayered `* { border-color }`
// that otherwise beats every Tailwind border-color utility.
const control =
  "w-full rounded-2xl border border-transparent! bg-[var(--color-v4-mist)] px-4 text-[15px] text-[var(--color-v4-text)] placeholder:text-[var(--color-v4-text-3)] transition-[border-color,background-color] duration-150 hover:bg-[#efefef] focus:border-[var(--color-v4-ink-900)]! focus:bg-white focus:outline-none aria-[invalid=true]:border-[var(--color-v4-error)]! aria-[invalid=true]:bg-white";

export function Field({
  label,
  htmlFor,
  error,
  hint,
  optional,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={htmlFor} className="mb-2 text-sm font-medium text-[var(--color-v4-text)]">
        {label}
        {optional && <span className="ml-1.5 font-normal text-[var(--color-v4-text-3)]">(optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-[13px] text-[var(--color-v4-error)]">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-[13px] text-[var(--color-v4-text-3)]">{hint}</p>
      ) : null}
    </div>
  );
}

export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }>(
  function TextInput({ className, invalid, ...props }, ref) {
    return (
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid && props.id ? `${props.id}-error` : undefined}
        className={cn(control, "h-12", className)}
        {...props}
      />
    );
  },
);

export const SelectInput = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }>(
  function SelectInput({ className, invalid, children, ...props }, ref) {
    return (
      <div className="relative">
        <select
          ref={ref}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid && props.id ? `${props.id}-error` : undefined}
          className={cn(control, "h-12 appearance-none pr-10", className)}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[var(--color-v4-text-3)]"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
    );
  },
);

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }>(
  function TextArea({ className, invalid, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid && props.id ? `${props.id}-error` : undefined}
        className={cn(control, "min-h-[132px] resize-y py-3.5 leading-relaxed", className)}
        {...props}
      />
    );
  },
);

/** Single-select pill group (radio semantics). */
export function ChoicePills<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
  error,
}: {
  name: string;
  legend: string;
  options: readonly { value: T; label: string }[];
  value: T | undefined;
  onChange: (value: T) => void;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-[var(--color-v4-text)]">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-150 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--color-v4-ink-900)]",
                checked
                  ? "border-[var(--color-v4-ink-900)]! bg-[var(--color-v4-ink-900)] text-white"
                  : "border-[var(--color-v4-line)] bg-white text-[var(--color-v4-text-2)] hover:border-[var(--color-v4-ink-700)]! hover:text-[var(--color-v4-text)]",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
      {error && (
        <p role="alert" className="mt-1.5 text-[13px] text-[var(--color-v4-error)]">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function ConsentCheckbox({
  id,
  invalid,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { id: string; invalid?: boolean; error?: string }) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-[var(--color-v4-text-2)]">
        <input
          id={id}
          type="checkbox"
          aria-invalid={invalid || undefined}
          className="mt-0.5 size-[18px] shrink-0 cursor-pointer rounded accent-[var(--color-v4-ink-900)]"
          {...props}
        />
        <span>
          By submitting this form, I consent to receive calls/texts from NextGen Health Institute. Consent is not a
          condition of enrollment.
        </span>
      </label>
      {error && (
        <p role="alert" className="mt-1.5 text-[13px] text-[var(--color-v4-error)]">
          {error}
        </p>
      )}
    </div>
  );
}

/** Off-screen honeypot — real users never see or fill it. */
export const Honeypot = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Honeypot(props, ref) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this field empty
        <input ref={ref} type="text" tabIndex={-1} autoComplete="off" {...props} />
      </label>
    </div>
  );
});
