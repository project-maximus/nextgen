import { Reveal } from "@/components/motion-v4/Reveal";
import { ScrollFillText } from "@/components/motion-v4/ScrollFillText";
import { prep, prepAdminFeatures, prepCatalog, prepSteps } from "@/content/prep";
import { programs } from "@/content/programs";
import { pageMetadata } from "@/lib/seo";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PrepFaq } from "./PrepFaq";
import { PrepFeatures } from "./PrepFeatures";
import { PrepHero } from "./PrepHero";

export const metadata: Metadata = pageMetadata({
  title: "NGHI Prep — AI Study Platform",
  description:
    "NGHI Prep is the study platform included with every NextGen Health Institute program: AI tutoring, mock exams, flashcards, and a readiness score — grounded in your own course material.",
  path: "/prep",
});

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const eyebrow = "text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]";
const h2 =
  "text-[clamp(1.75rem,1.2rem+1.9vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-[var(--color-v4-text)]";

const claims = [
  { value: "$0", label: "extra — included with every program" },
  { value: String(programs.length), label: "programs being built into Prep" },
  { value: "24/7", label: "AI tutor, grounded in your course" },
  { value: "Any device", label: "phone, tablet, or laptop" },
];

export default function PrepPage() {
  return (
    <div className="v4-scope bg-white">
      <PrepHero />

      {/* Claims strip */}
      <section className="pt-16 sm:pt-20">
        <div className="mx-auto max-w-[1600px] px-6 md:px-8 xl:px-10">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-10">
            {claims.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.06} className="flex flex-col border-t border-[var(--color-v4-line)] pt-6">
                <dt className="mt-3 text-sm leading-snug text-[var(--color-v4-text-2)]">{c.label}</dt>
                <dd className="tnum order-first text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-normal leading-none tracking-[-0.02em] text-[var(--color-v4-text)]">
                  {c.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Manifesto statement */}
      <section className="pt-24 sm:pt-32">
        <div className="mx-auto max-w-[800px] px-6">
          <ScrollFillText
            text="Most students don't fail because they didn't study. They fail because they studied the wrong things. NGHI Prep shows you what to study next — and tells you when you're ready."
            className="text-center text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] leading-[1.25] tracking-[-0.015em] text-[var(--color-v4-text)]"
          />
        </div>
        <div className="mx-auto mt-16 h-20 w-px bg-[var(--color-v4-line)] sm:h-28" aria-hidden="true" />
      </section>

      <PrepFeatures />

      {/* How you get in — the real join-code flow */}
      <section className="border-t border-[var(--color-v4-line)] bg-[var(--color-v4-mist)] py-24 sm:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-8 xl:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-24">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <p className={eyebrow}>How it works</p>
              <h2 className={`mt-3 max-w-sm ${h2}`}>From enrollment to exam-ready in three steps.</h2>
              <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-[var(--color-v4-line)] bg-white p-3 pl-4">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">Join code</span>
                <span className="rounded-lg border border-[var(--color-v4-line)] px-3 py-1.5 font-mono text-sm text-[var(--color-v4-text)]">
                  {prep.sampleJoinCode}
                </span>
              </div>
            </Reveal>

            <ol className="flex flex-col">
              {prepSteps.map((s, i) => (
                <Reveal as="li" key={s.title} className="border-t border-[var(--color-v4-line)] py-10 first:border-t-0 first:pt-0">
                  <div className="grid grid-cols-[48px_1fr] gap-x-4 sm:grid-cols-[72px_1fr]">
                    <span className="tnum pt-1 text-lg text-[var(--color-v4-text-3)] sm:text-xl">{pad(i + 1)}</span>
                    <div>
                      <h3 className="text-[clamp(1.375rem,1.1rem+0.9vw,1.75rem)] font-normal leading-[1.2] tracking-[-0.01em] text-[var(--color-v4-text)]">
                        {s.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--color-v4-text-2)]">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Programs in Prep — real availability from the platform */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-8 xl:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className={eyebrow}>Programs</p>
              <h2 className={`mt-3 max-w-xl ${h2}`}>One platform for every program we teach.</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="flex items-center gap-4 text-sm text-[var(--color-v4-text-2)]">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[var(--color-v4-ink-900)]" aria-hidden="true" /> Live now
                </span>
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full border border-[var(--color-v4-text-3)]" aria-hidden="true" /> Coming soon
                </span>
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
            {prepCatalog.map((group, gi) => (
              <Reveal key={group.group} delay={gi * 0.06}>
                <p className="border-b border-[var(--color-v4-line)] pb-3 text-sm font-medium text-[var(--color-v4-text)]">
                  {group.group}
                </p>
                <ul className="flex flex-col">
                  {group.programs.map((p) => (
                    <li key={p.code}>
                      <Link
                        href={`/programs/${p.slug}`}
                        className="group flex items-start gap-3 border-b border-[var(--color-v4-line)] py-4"
                      >
                        <span className="w-12 shrink-0 pt-0.5 text-[11px] font-semibold tracking-[0.1em] text-[var(--color-v4-text-3)]">
                          {p.code}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[15px] font-medium text-[var(--color-v4-text)] group-hover:underline group-hover:underline-offset-4">
                            {p.name}
                          </span>
                          <span className="mt-1 block text-[13px] leading-snug text-[var(--color-v4-text-2)]">{p.blurb}</span>
                        </span>
                        <span
                          className={`mt-1.5 size-2 shrink-0 rounded-full ${
                            p.status === "live" ? "bg-[var(--color-v4-ink-900)]" : "border border-[var(--color-v4-text-3)]"
                          }`}
                          aria-label={p.status === "live" ? "Live now" : "Coming soon"}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* For instructors — the admin portal */}
      <section className="px-3 md:px-5 xl:px-6">
        <div className="v4-on-navy mx-auto max-w-[1600px] rounded-[32px] bg-[var(--color-v4-ink-900)] px-7 py-16 sm:px-12 sm:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">For instructors</p>
              <h2 className="mt-3 max-w-md text-[clamp(1.75rem,1.2rem+1.9vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-white">
                Built for the classroom, too.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
                A separate admin portal lets our instructors manage courses, assessments, and students — so what you
                study in Prep is exactly what&apos;s taught on campus.
              </p>
              <a
                href={prep.adminUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-white/75"
              >
                Admin sign in
                <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </a>
            </Reveal>

            <ol className="flex flex-col">
              {prepAdminFeatures.map((f, i) => (
                <Reveal as="li" key={f.title} delay={i * 0.06} className="border-t border-white/10 py-7">
                  <div className="flex items-baseline gap-5">
                    <span className="tnum text-sm text-white/40">{pad(i + 1)}</span>
                    <div>
                      <h3 className="text-xl font-normal text-white">{f.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-white/65">{f.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <PrepFaq />

      {/* Final CTA */}
      <section className="border-t border-[var(--color-v4-line)] py-24 sm:py-32">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-light leading-[1.05] tracking-[-0.025em] text-[var(--color-v4-text)]">
            {prep.tagline}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-[var(--color-v4-text-2)] sm:text-lg">
            Enroll in any NGHI program and NGHI Prep comes with it — free, from your first week to exam day.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/how-it-works/apply"
              className="inline-flex h-12 items-center gap-1.5 rounded-full bg-[var(--color-v4-ink-900)] px-7 text-[15px] font-semibold text-white transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-[var(--color-v4-ink-800)]"
            >
              Apply Now
              <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
            </Link>
            <a
              href={prep.loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-1.5 rounded-full border border-[var(--color-v4-line)] px-7 text-[15px] font-semibold text-[var(--color-v4-text)] transition-colors hover:bg-[var(--color-v4-mist)]"
            >
              Student sign in
              <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
