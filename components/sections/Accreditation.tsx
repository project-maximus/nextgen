import { AccreditationPanel } from "@/components/ui/AccreditationPanel";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export function Accreditation() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <div className="mb-8 max-w-2xl">
            <p className="text-eyebrow uppercase text-primary-600">Accreditation</p>
            <h2 className="mt-2 text-h2 font-display text-neutral-900">Real credentials, not just a certificate</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {site.accreditation.map((item) => (
              <AccreditationPanel
                key={item.name}
                name={item.name}
                fullName={item.fullName}
                description={item.description}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
