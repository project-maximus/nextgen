import { Reveal } from "@/components/motion-v4/Reveal";
import { ScrollFillText } from "@/components/motion-v4/ScrollFillText";
import { ImageBand } from "@/components/sections/ImageBand";
import { PageHero } from "@/components/sections/PageHero";
import {
  admissionsQuotes,
  admissionsStatement,
  applicationIntro,
  applicationSteps,
  processingTimeline,
  requiredDocuments,
} from "@/content/admissions";
import { formatCohortDate, getNextClassStart, getUpcomingStartDates } from "@/content/dates";
import { programs } from "@/content/programs";
import { site } from "@/content/site";
import { breadcrumbListSchema, jsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ApplicationForm } from "./ApplicationForm";

export const metadata: Metadata = pageMetadata({
  title: "Apply Now — Admissions",
  description:
    "Apply to NextGen Health Institute online in about 10 minutes. New classes begin monthly — typical application timeline is 1–2 weeks.",
  path: "/how-it-works/apply",
});

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const eyebrow = "text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]";
const h2 =
  "text-[clamp(1.75rem,1.2rem+1.9vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-[var(--color-v4-text)]";

export default function ApplyPage() {
  const nextStart = formatCohortDate(getNextClassStart().startDate);
  const startDates = getUpcomingStartDates(3);

  const stats = [
    { value: "95%+", label: "of graduates find employment" },
    { value: processingTimeline.summary, label: "typical application timeline" },
    { value: String(programs.length), label: "healthcare certification programs" },
    { value: "Monthly", label: "new classes begin every month" },
  ];

  return (
    <div className="v4-scope bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(breadcrumbListSchema([{ label: "Home", href: "" }, { label: "Apply", href: "/how-it-works/apply" }])),
        }}
      />
      <PageHero
        eyebrow="Apply Now"
        title="Your healthcare career starts here."
        intro={applicationIntro}
        image="/images/pages/apply-hero-wide.jpg"
        imagePosition="50% 22%"
        mobileImagePosition="64% 20%"
        grayscale
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Apply", href: "/how-it-works/apply" },
        ]}
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href="#apply-form"
            className="inline-flex h-12 items-center rounded-full bg-white px-7 text-[15px] font-semibold text-[var(--color-v4-ink-900)] transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-[var(--color-v4-mist)]"
          >
            Start application
          </a>
          <p className="text-sm text-white/75">
            Next class starts <span className="font-semibold text-white">{nextStart}</span> · about 10 minutes
          </p>
        </div>
      </PageHero>

      {/* Manifesto statement + stats — the client's own admissions statement, filling in on scroll. */}
      <section className="pt-24 sm:pt-32">
        <div className="mx-auto max-w-[760px] px-6">
          <ScrollFillText
            text={admissionsStatement}
            className="text-center text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] leading-[1.25] tracking-[-0.015em] text-[var(--color-v4-text)]"
          />
          <Reveal>
            <p className="mt-8 text-center text-sm text-[var(--color-v4-text-3)]">— NextGen Health Institute Admissions</p>
          </Reveal>
        </div>
        <div className="mx-auto max-w-[1120px] px-6">
          <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-10">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06} className="flex flex-col border-t border-[var(--color-v4-line)] pt-6">
                <dt className="mt-3 text-sm leading-snug text-[var(--color-v4-text-2)]">{s.label}</dt>
                <dd className="tnum order-first text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-normal leading-none tracking-[-0.02em] text-[var(--color-v4-text)]">
                  {s.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
        <div className="mx-auto mt-20 h-24 w-px bg-[var(--color-v4-line)] sm:h-32" aria-hidden="true" />
      </section>

      {/* Application form + summary */}
      <section id="apply-form" className="scroll-mt-28 pb-24 sm:pb-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-8 xl:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className={eyebrow}>Online Application</p>
            <h2 className={`mt-3 ${h2}`}>Apply in four short steps.</h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-16 xl:gap-24">
            <Reveal>
              <div className="rounded-[28px] border border-[var(--color-v4-line)] p-6 sm:p-10 lg:p-12">
                <Suspense>
                  <ApplicationForm />
                </Suspense>
              </div>
            </Reveal>

            <aside className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
              <Reveal className="rounded-[24px] bg-[var(--color-v4-mist)] p-7">
                <p className={eyebrow}>Upcoming start dates</p>
                <ul className="mt-4 flex flex-col">
                  {startDates.map((d, i) => (
                    <li
                      key={d}
                      className="flex items-baseline justify-between gap-4 border-b border-[var(--color-v4-line)] py-3 last:border-b-0 last:pb-0"
                    >
                      <span className="tnum text-base font-medium text-[var(--color-v4-text)]">{formatCohortDate(d)}</span>
                      {i === 0 && (
                        <span className="rounded-full bg-[var(--color-v4-ink-900)] px-2.5 py-1 text-[11px] font-semibold text-white">
                          Next
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[13px] text-[var(--color-v4-text-3)]">Early enrollment recommended.</p>
              </Reveal>

              <Reveal delay={0.06} className="rounded-[24px] border border-[var(--color-v4-line)] p-7">
                <p className={eyebrow}>Documents you&apos;ll need</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {requiredDocuments.map((doc) => (
                    <li key={doc} className="flex items-start gap-2.5 text-sm text-[var(--color-v4-text)]">
                      <Check className="mt-0.5 size-4 shrink-0 text-[var(--color-v4-text-3)]" strokeWidth={2} aria-hidden="true" />
                      {doc}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[13px] text-[var(--color-v4-text-3)]">
                  You don&apos;t need these to apply — send them after you submit.
                </p>
              </Reveal>

              <Reveal delay={0.12} className="rounded-[24px] border border-[var(--color-v4-line)] p-7">
                <p className={eyebrow}>Need assistance?</p>
                <a href={site.phoneHref} className="mt-4 block text-lg font-medium text-[var(--color-v4-text)] hover:underline">
                  {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-1 block text-[13px] [overflow-wrap:anywhere] text-[var(--color-v4-text-2)] hover:text-[var(--color-v4-text)] sm:text-sm lg:text-[13px] xl:text-sm"
                >
                  {site.email}
                </a>
                <p className="mt-4 text-[13px] leading-relaxed text-[var(--color-v4-text-3)]">
                  Walk-in hours: {site.hours[0].days}, {site.hours[0].hours}
                </p>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {/* The five steps — manifesto numbered-principles layout. */}
      <section className="border-t border-[var(--color-v4-line)] py-24 sm:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-8 xl:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-24">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <p className={eyebrow}>Application Steps</p>
              <h2 className={`mt-3 max-w-sm ${h2}`}>Five steps from application to your first day.</h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-[var(--color-v4-text-2)]">
                Typical timeline: {processingTimeline.summary}. Here&apos;s exactly what happens after you hit submit.
              </p>
            </Reveal>

            <ol className="flex flex-col">
              {applicationSteps.map((s, i) => (
                <Reveal as="li" key={s.title} className="border-t border-[var(--color-v4-line)] py-10 first:border-t-0 first:pt-0">
                  <div className="grid grid-cols-[48px_1fr] gap-x-4 sm:grid-cols-[72px_1fr]">
                    <span className="tnum pt-1 text-lg text-[var(--color-v4-text-3)] sm:text-xl">{pad(i + 1)}</span>
                    <div>
                      <h3 className="text-[clamp(1.375rem,1.1rem+0.9vw,1.75rem)] font-normal leading-[1.2] tracking-[-0.01em] text-[var(--color-v4-text)]">
                        {s.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--color-v4-text-2)]">{s.body}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {s.points.map((p) => (
                          <li
                            key={p}
                            className="rounded-full border border-[var(--color-v4-line)] px-3.5 py-1.5 text-[13px] text-[var(--color-v4-text-2)]"
                          >
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Timeline + student voices */}
      <section className="bg-[var(--color-v4-mist)] py-24 sm:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-8 xl:px-10">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <p className={eyebrow}>Timeline</p>
              <h2 className={`mt-3 ${h2}`}>
                Most applicants hear back in {processingTimeline.summary}.
              </h2>
              <dl className="mt-10 flex flex-col border-t border-[var(--color-v4-line)]">
                {processingTimeline.points.map((p) => (
                  <div key={p.label} className="flex items-baseline justify-between gap-4 border-b border-[var(--color-v4-line)] py-5">
                    <dt className="text-base text-[var(--color-v4-text-2)]">{p.label}</dt>
                    <dd className="tnum text-lg font-medium text-[var(--color-v4-text)]">{p.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <div>
              <Reveal>
                <p className={eyebrow}>In their words</p>
              </Reveal>
              <ul className="mt-6 flex flex-col">
                {admissionsQuotes.map((q, i) => (
                  <Reveal as="li" key={q.quote} delay={i * 0.08} className="border-t border-[var(--color-v4-line)] py-8">
                    <blockquote className="text-[clamp(1.25rem,1.05rem+0.8vw,1.625rem)] leading-[1.35] tracking-[-0.01em] text-[var(--color-v4-text)]">
                      &ldquo;{q.quote}&rdquo;
                    </blockquote>
                    <p className="mt-4 text-sm text-[var(--color-v4-text-3)]">{q.who}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="pt-3 md:pt-5 xl:pt-6" />
      <ImageBand
        image="/images/pages/apply-band.jpg"
        imagePosition="50% 40%"
        left="Your first shift is closer than you think."
        right="Programs run from 2 to 24 weeks, with new classes starting every month."
      >
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#apply-form"
            className="inline-flex h-12 items-center rounded-full bg-white px-7 text-[15px] font-semibold text-[var(--color-v4-ink-900)] transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-[var(--color-v4-mist)]"
          >
            Start application
          </a>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center rounded-full bg-white/20 px-7 text-[15px] font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/30"
          >
            Talk to admissions
          </Link>
        </div>
      </ImageBand>
    </div>
  );
}
