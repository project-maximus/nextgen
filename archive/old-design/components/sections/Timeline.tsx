"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { useRef } from "react";

export interface TimelineStep {
  title: string;
  description: string;
}

export interface TimelineProps {
  steps: TimelineStep[];
}

export function Timeline({ steps }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useFramerReducedMotion();

  return (
    <div ref={containerRef} className="relative">
      {/* Desktop: horizontal timeline */}
      <div className="hidden lg:block">
        <div className="relative mb-8 h-1 rounded-full bg-neutral-200">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-primary-600"
            initial={{ width: reducedMotion ? "100%" : "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reducedMotion ? 0.01 : 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <div className="grid grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <div key={step.title}>
              <div className="mb-3 flex size-8 items-center justify-center rounded-full bg-primary-600 text-body-sm font-semibold text-white">
                {i + 1}
              </div>
              <h3 className="text-h4 font-display text-neutral-900">{step.title}</h3>
              <p className="mt-1 text-body-sm text-neutral-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/tablet: vertical timeline */}
      <div className="flex flex-col gap-6 lg:hidden">
        {steps.map((step, i) => (
          <div key={step.title} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-body-sm font-semibold text-white">
                {i + 1}
              </div>
              {i < steps.length - 1 && <div className="mt-1 w-px flex-1 bg-neutral-200" />}
            </div>
            <div className={cn("pb-2", i === steps.length - 1 && "pb-0")}>
              <h3 className="text-h4 font-display text-neutral-900">{step.title}</h3>
              <p className="mt-1 text-body-sm text-neutral-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
