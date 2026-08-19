import { cn } from "@/lib/utils";

export interface FilterChipOption {
  value: string;
  label: string;
}

export interface FilterChipsProps {
  options: FilterChipOption[];
  value: string | string[];
  onChange: (value: string) => void;
  multiSelect?: boolean;
  "aria-label": string;
}

export function FilterChips({ options, value, onChange, multiSelect = false, ...props }: FilterChipsProps) {
  const isSelected = (optionValue: string) =>
    multiSelect ? (value as string[]).includes(optionValue) : value === optionValue;

  return (
    <div
      role="group"
      aria-label={props["aria-label"]}
      className="flex flex-wrap gap-2 overflow-x-auto pb-1 sm:overflow-visible"
    >
      {options.map((option) => {
        const selected = isSelected(option.value);
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-body-sm font-semibold transition-colors",
              selected
                ? "border-primary-600 bg-primary-600 text-white"
                : "border-neutral-200 bg-white text-neutral-700 hover:border-primary-300 hover:text-primary-700",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
