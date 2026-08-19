import { Reveal } from "@/components/motion-v4/Reveal";
import type { Program } from "@/types";

const formatLabel: Record<Program["format"], string> = {
  hybrid: "Hybrid",
  online: "Online",
  "in-person": "In-Person",
  flexible: "Flexible",
};

export function QuickFacts({ program }: { program: Program }) {
  const facts = [
    { label: "Duration", value: program.duration },
    { label: "Schedule", value: "Day & Evening" },
    { label: "Learning Format", value: formatLabel[program.format] },
    { label: "Certification", value: program.credential },
  ];

  return (
    <section className="v4-scope border-b border-[var(--color-v4-line)] bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-[1600px] px-6 md:px-8 xl:px-10">
        <Reveal>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-8">
            {facts.map((fact, i) => (
              <div
                key={fact.label}
                className={`relative ${
                  i > 0
                    ? "before:absolute before:-left-3 before:top-0.5 before:bottom-0.5 before:hidden before:w-px before:bg-[var(--color-v4-line)] sm:before:block sm:before:-left-4"
                    : ""
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">
                  {fact.label}
                </p>
                <p className="mt-2 text-base font-medium text-[var(--color-v4-text)]">{fact.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
