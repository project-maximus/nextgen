import { Accordion, AccordionItem } from "@/components/ui/Accordion";

export interface FAQAccordionItem {
  id: string;
  q: string;
  a: string;
}

export interface FAQAccordionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: FAQAccordionItem[];
  className?: string;
}

/**
 * Shared FAQ section: eyebrow/heading/support-link on the left, an accordion
 * of curated questions on the right. Used identically on the program pages
 * and the homepage — pass a curated `items` subset per page.
 */
export function FAQAccordion({
  eyebrow = "Questions",
  title = "FAQs",
  description = "Everything you need to know before you enroll.",
  items,
  className,
}: FAQAccordionProps) {
  return (
    <section className={`bg-white py-20 md:py-28 ${className ?? ""}`}>
      <div className="mx-auto max-w-5xl px-5 md:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-5 md:gap-12">
          <div className="md:col-span-2">
            <p className="text-sm font-medium uppercase tracking-wide text-navy">{eyebrow}</p>
            <h2 className="mt-2 text-h2 font-medium tracking-tight text-neutral-900">{title}</h2>
            <p className="mt-4 text-balance text-lg leading-relaxed text-neutral-600">{description}</p>
          </div>

          <div className="md:col-span-3">
            <Accordion type="single" variant="plain">
              {items.map((item) => (
                <AccordionItem key={item.id} id={item.id} question={item.q} className="border-b border-neutral-200">
                  <p className="text-base leading-relaxed text-neutral-600">{item.a}</p>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
