import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import type { Partner } from "@/types";

export interface LogoMarqueeProps {
  partners: Partner[];
  title?: string;
}

export function LogoMarquee({ partners, title = "Our grads work at:" }: LogoMarqueeProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <p className="mb-8 text-center text-eyebrow uppercase text-neutral-500">{title}</p>
        </Reveal>
      </div>
      <Marquee ariaLabel="Employer and externship partners" durationSeconds={45} edgeFade={false}>
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="flex h-16 w-48 shrink-0 items-center justify-center overflow-hidden rounded-md border border-neutral-100 bg-white px-4 text-center grayscale transition-all duration-200 hover:text-primary-700 hover:grayscale-0"
          >
            <span className="line-clamp-2 text-body-sm font-semibold leading-tight text-neutral-400">
              {partner.name}
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
