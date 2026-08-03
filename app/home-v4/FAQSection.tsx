"use client";

import { Reveal } from "@/components/motion-v4/Reveal";
import { allFaqItems } from "@/content/faqs";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

// Same homepage-appropriate subset used on home-v1 (content/faqs.ts is the
// single source of truth — never fork the copy).
const homeFaqIds = ["programs-choose", "cost-aid-options", "cert-where", "admissions-how-long", "campus-tour"];
const items = allFaqItems.filter((item) => homeFaqIds.includes(item.id));

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section className="v4-scope border-t border-[var(--color-v4-line)] bg-white py-24">
      <div className="mx-auto max-w-3xl px-6 md:px-8 xl:px-10">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">
              Questions
            </p>
            <h2 className="mt-3 text-[clamp(1.75rem,1.2rem+1.9vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-[var(--color-v4-text)]">
              Frequently asked questions
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 divide-y divide-[var(--color-v4-line)] border-t border-[var(--color-v4-line)]">
            {items.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id}>
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-[var(--color-v4-text)]"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`size-4 shrink-0 text-[var(--color-v4-text-3)] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={`grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 text-sm leading-relaxed text-[var(--color-v4-text-2)]">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
