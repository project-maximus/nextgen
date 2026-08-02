"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useId, useState, type ReactNode } from "react";
import { Accordion, AccordionItem } from "./Accordion";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  variant?: "underline" | "pill";
  className?: string;
  /** Label announced to screen readers for the tablist */
  "aria-label": string;
}

export function Tabs({ items, variant = "underline", className, ...props }: TabsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const layoutId = useId();
  const active = items.find((item) => item.id === activeId) ?? items[0];

  if (!active) return null;

  return (
    <div className={className}>
      {/* Tabs on sm+ screens */}
      <div className="hidden sm:block">
        <div
          role="tablist"
          aria-label={props["aria-label"]}
          className={cn(
            "flex gap-2 border-b border-neutral-200",
            variant === "pill" && "border-b-0 rounded-full bg-neutral-100 p-1",
          )}
        >
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={isActive}
                aria-controls={`tabpanel-${item.id}`}
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "relative px-4 py-3 text-body-sm font-semibold transition-colors",
                  variant === "underline"
                    ? isActive
                      ? "text-primary-700"
                      : "text-neutral-500 hover:text-neutral-700"
                    : cn(
                        "rounded-full px-4 py-2",
                        isActive ? "text-white" : "text-neutral-600 hover:text-neutral-900",
                      ),
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId={`tab-indicator-${layoutId}`}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "absolute inset-x-0",
                      variant === "underline"
                        ? "bottom-0 h-0.5 bg-primary-600"
                        : "inset-0 -z-10 rounded-full bg-primary-600",
                    )}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </div>
        {items.map((item) => (
          <div
            key={item.id}
            role="tabpanel"
            id={`tabpanel-${item.id}`}
            aria-labelledby={`tab-${item.id}`}
            hidden={item.id !== activeId}
            className="pt-6"
          >
            {item.content}
          </div>
        ))}
      </div>

      {/* Accordion on mobile (<640px) */}
      <div className="sm:hidden">
        <Accordion type="single" variant="bordered">
          {items.map((item) => (
            <AccordionItem key={item.id} id={item.id} question={item.label}>
              {item.content}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
