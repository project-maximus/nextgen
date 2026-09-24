import { Reveal } from "@/components/motion-v4/Reveal";
import { ImageBand } from "@/components/sections/ImageBand";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ContactForm } from "./ContactForm";
import { ContactHero } from "./ContactHero";

export const metadata: Metadata = pageMetadata({
  title: "Contact Admissions",
  description: `Talk to NextGen Health Institute admissions — call ${site.phone}, email ${site.email}, or visit our Dallas campus at ${site.address.street}.`,
  path: "/contact",
});

const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;
const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;

const channels = [
  {
    title: "Call admissions",
    detail: site.phone,
    note: "Monday–Friday, 8:00 AM–6:00 PM",
    href: site.phoneHref,
    action: "Call now",
    Icon: Phone,
  },
  {
    title: "Email us",
    detail: site.email,
    note: "We reply within 24 hours",
    href: `mailto:${site.email}`,
    action: "Send an email",
    Icon: Mail,
  },
  {
    title: "Visit campus",
    detail: `${site.address.street}, ${site.address.city}`,
    note: "Walk-ins welcome during office hours",
    href: directionsHref,
    action: "Get directions",
    Icon: MapPin,
    external: true,
  },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function ContactPage() {
  return (
    <div className="v4-scope bg-white">
      <ContactHero />
      <div className="h-[16vh] w-full" aria-hidden="true">
        <div className="mx-auto h-full w-px bg-[var(--color-v4-line)]" />
      </div>

      <section id="contact-form" className="scroll-mt-28 pt-10 pb-24 sm:pb-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-8 xl:px-10">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-20 xl:gap-28">
            <Reveal>
              <div className="rounded-[28px] border border-[var(--color-v4-line)] p-6 sm:p-10 lg:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">
                  Request Information
                </p>
                <h2 className="mt-3 text-[clamp(1.75rem,1.2rem+1.9vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-[var(--color-v4-text)]">
                  Send us a message.
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[var(--color-v4-text-2)]">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>
                <div className="mt-10">
                  <Suspense>
                    <ContactForm />
                  </Suspense>
                </div>
              </div>
            </Reveal>

            <div className="flex flex-col">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">
                  Other ways to reach us
                </p>
              </Reveal>
              <ol className="mt-6 flex flex-col">
                {channels.map((c, i) => (
                  <Reveal as="li" key={c.title} delay={i * 0.06} className="border-t border-[var(--color-v4-line)] py-7">
                    <div className="flex items-baseline gap-4">
                      <span className="tnum text-sm text-[var(--color-v4-text-3)]">{pad(i + 1)}</span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-medium text-[var(--color-v4-text)]">{c.title}</h3>
                        <p className="mt-2 text-[15px] [overflow-wrap:anywhere] text-[var(--color-v4-text)] sm:text-base">{c.detail}</p>
                        <p className="mt-1 text-sm text-[var(--color-v4-text-3)]">{c.note}</p>
                        <a
                          href={c.href}
                          {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-v4-text)] hover:text-[var(--color-v4-text-2)]"
                        >
                          {c.action}
                          {c.external ? (
                            <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
                          ) : (
                            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
                          )}
                        </a>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>

              <Reveal className="mt-4 rounded-[24px] bg-[var(--color-v4-mist)] p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">
                  Office hours
                </p>
                <dl className="mt-4 flex flex-col">
                  {site.hours.map((h) => (
                    <div
                      key={h.days}
                      className="flex items-baseline justify-between gap-4 border-b border-[var(--color-v4-line)] py-3 last:border-b-0 last:pb-0"
                    >
                      <dt className="text-sm text-[var(--color-v4-text-2)]">{h.days}</dt>
                      <dd className="tnum text-sm font-medium text-[var(--color-v4-text)]">{h.hours}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Campus location */}
      <section className="border-t border-[var(--color-v4-line)] py-24 sm:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-8 xl:px-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-stretch lg:gap-20">
            <Reveal className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">
                Campus Location
              </p>
              <h2 className="mt-3 text-[clamp(1.75rem,1.2rem+1.9vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-[var(--color-v4-text)]">
                Main Campus, Dallas.
              </h2>
              <address className="mt-6 text-lg not-italic leading-relaxed text-[var(--color-v4-text)]">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </address>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-[var(--color-v4-text-2)]">
                See our labs and learning environment for yourself — book a private campus tour with an admissions
                advisor.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-10">
                <Link
                  href="/contact?type=tour#contact-form"
                  className="inline-flex h-12 items-center rounded-full bg-[var(--color-v4-ink-900)] px-7 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--color-v4-ink-800)]"
                >
                  Schedule a tour
                </Link>
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-1.5 rounded-full border border-[var(--color-v4-line)] px-7 text-[15px] font-semibold text-[var(--color-v4-text)] transition-colors hover:bg-[var(--color-v4-mist)]"
                >
                  Directions
                  <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="relative h-[380px] overflow-hidden rounded-[28px] border border-[var(--color-v4-line)] bg-[var(--color-v4-mist)] sm:h-[460px] lg:h-full lg:min-h-[460px]">
                <iframe
                  title={`Map of ${site.name}, ${fullAddress}`}
                  src={site.mapEmbedSrc}
                  className="absolute inset-0 size-full grayscale-[0.4]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ImageBand
        image="/images/pages/contact-band.jpg"
        imagePosition="50% 35%"
        left="We take your future seriously."
        right="Nearly 30 years of listening to employers, and we're still here to help you take the first step."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/how-it-works/apply"
            className="inline-flex h-12 items-center rounded-full bg-white px-7 text-[15px] font-semibold text-[var(--color-v4-ink-900)] transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-[var(--color-v4-mist)]"
          >
            Apply Now
          </Link>
          <Link
            href="/programs"
            className="inline-flex h-12 items-center rounded-full bg-white/20 px-7 text-[15px] font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/30"
          >
            Explore programs
          </Link>
        </div>
      </ImageBand>
    </div>
  );
}
