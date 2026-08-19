import { Accordion, AccordionItem } from "@/components/ui/Accordion";

export interface FAQSectionItem {
  id: string;
  q: string;
  a: string;
}

export function FAQSection({ items }: { items: FAQSectionItem[] }) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8 lg:px-10">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-navy">Questions</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <Accordion type="single" variant="plain" className="mt-10">
          {items.map((item) => (
            <AccordionItem key={item.id} id={item.id} question={item.q} className="border-b border-neutral-200">
              <p className="text-base leading-relaxed text-neutral-600">{item.a}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
