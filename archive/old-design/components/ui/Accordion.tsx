"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  createContext,
  useContext,
  useId,
  useState,
  type ReactNode,
} from "react";

interface AccordionContextValue {
  openIds: Set<string>;
  toggle: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export interface AccordionProps {
  type?: "single" | "multi";
  variant?: "bordered" | "plain";
  defaultOpenIds?: string[];
  className?: string;
  children: ReactNode;
}

export function Accordion({
  type = "single",
  variant = "bordered",
  defaultOpenIds = [],
  className,
  children,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpenIds));

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(type === "single" ? [] : prev);
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <AccordionContext.Provider value={{ openIds, toggle }}>
      <div
        className={cn(
          variant === "bordered" && "divide-y divide-neutral-200 rounded-lg border border-neutral-200",
          className,
        )}
        data-variant={variant}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps {
  id: string;
  question: string;
  children: ReactNode;
  className?: string;
}

export function AccordionItem({ id, question, children, className }: AccordionItemProps) {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem must be used within Accordion");
  const { openIds, toggle } = ctx;
  const isOpen = openIds.has(id);
  const reactId = useId();
  const buttonId = `accordion-trigger-${reactId}`;
  const panelId = `accordion-panel-${reactId}`;

  return (
    <div id={id} className={cn("scroll-mt-24", className)}>
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => toggle(id)}
          className="flex w-full items-center justify-between gap-4 py-5 text-left text-h4 font-display text-neutral-900 hover:text-primary-700"
        >
          <span>{question}</span>
          <ChevronDown
            className={cn(
              "size-5 shrink-0 text-neutral-500 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-[220ms] ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-5 text-body text-neutral-600">{children}</div>
        </div>
      </div>
    </div>
  );
}
