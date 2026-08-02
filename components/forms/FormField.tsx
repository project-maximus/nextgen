import { AlertCircle } from "lucide-react";
import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

export interface FormFieldProps {
  id: string;
  label: string;
  helper?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

/**
 * The one shared wrapper every form input goes through — label, helper text,
 * and error message with aria-describedby wiring happen here once, so no
 * individual form has to reimplement accessible labeling.
 */
export function FormField({ id, label, helper, error, required, children }: FormFieldProps) {
  const helperId = helper ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

  const child =
    isValidElement(children) && (helperId || errorId)
      ? cloneElement(children as ReactElement<Record<string, unknown>>, {
          id,
          invalid: Boolean(error),
          "aria-describedby": describedBy,
        })
      : children;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-body-sm font-semibold text-neutral-800">
        {label}
        {required && (
          <span aria-hidden="true" className="text-error">
            {" "}
            *
          </span>
        )}
      </label>
      {child}
      {helper && !error && (
        <p id={helperId} className="text-xs text-neutral-500">
          {helper}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="flex items-center gap-1.5 text-xs text-error">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
