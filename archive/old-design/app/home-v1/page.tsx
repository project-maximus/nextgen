import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { TestimonialMarquee } from "@/components/sections/TestimonialMarquee";
import { allFaqItems } from "@/content/faqs";
import { formatCohortDate, getNextClassStart } from "@/content/dates";
import { partners } from "@/content/partners";
import { testimonials } from "@/content/testimonials";
import { pageMetadata } from "@/lib/seo";
import { ArrowRight, BookOpen, Database, GraduationCap, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { AboutPitch } from "./AboutPitch";
import { FAQSection } from "./FAQSection";
import { GsapCardStack } from "./GsapCardStack";
import { MovingPrograms } from "./MovingPrograms";
import { PlatformPitch } from "./PlatformPitch";
import { SchoolAIHero } from "./SchoolAIHero";

// Broad, homepage-appropriate subset of the sitewide FAQ set (content/faqs.ts).
const homeFaqIds = ["programs-choose", "cost-aid-options", "cert-where", "admissions-how-long", "campus-tour"];
const homeFaqItems = allFaqItems.filter((item) => homeFaqIds.includes(item.id));

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Healthcare Training That Connects You With Real Careers",
    description:
      "See exactly what you'll learn, how long it takes, and what it costs. AMCA-accredited healthcare career training in Dallas–Fort Worth — 11 programs, hands-on labs, real job placement support.",
    path: "/home-v1",
  }),
  robots: { index: false, follow: false },
};

const evidenceStats = [
  { value: 95, suffix: "%+", label: "Graduate employment rate", source: "2024–25 graduating cohorts, self-reported" },
  { value: 11, label: "Accredited programs", source: "AMCA-accredited catalog" },
  { value: 30, suffix: "+ yrs", label: "Training Texans", source: "Since 1992" },
];

const trustGrid = [
  { icon: ShieldCheck, title: "Accreditation is non-negotiable", description: "Every program meets AMCA standards, audited regularly." },
  { icon: Database, title: "Grounded in outcomes", description: "We track and share real placement and pass-rate data." },
  { icon: GraduationCap, title: "Instructors who've done the job", description: "Every lead instructor still works in the field they teach." },
  { icon: BookOpen, title: "Your information stays private", description: "We never sell student data. Full stop." },
];

export default function HomeV1Page() {
  const nextClassStart = getNextClassStart();

  return (
    <>
      <SchoolAIHero />

      <LogoMarquee partners={partners} title="Where our graduates get hired" />

      <AboutPitch />

      <GsapCardStack />

      <MovingPrograms />

      <PlatformPitch />

      {/* Outcomes, backed by evidence */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
          <Reveal>
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-wide text-navy">Backed by evidence</p>
              <h2 className="mx-auto mt-3 max-w-xl text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
                Outcomes, not just promises.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 grid max-w-4xl items-stretch gap-5 sm:grid-cols-3">
              {evidenceStats.map((stat, i) => (
                <div key={stat.label} className="flex h-full flex-col rounded-2xl bg-navy p-7">
                  <span className="text-sm font-medium text-white/40">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-4 text-5xl font-semibold text-white">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-3 text-base font-medium text-white">{stat.label}</p>
                  <p className="mt-auto pt-4 text-xs text-white/50">{stat.source}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <TestimonialMarquee testimonials={testimonials} />

      {/* Built on trust */}
      <section className="bg-neutral-50 py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
          <Reveal>
            <div className="rounded-2xl bg-navy p-8 md:p-12">
              <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">Built on trust.</h2>
              <p className="mt-2 max-w-lg text-base text-white/70">
                Students trust us with their future. Everything we build starts from that responsibility.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {trustGrid.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <item.icon className="size-5 shrink-0 text-white/70" aria-hidden="true" />
                    <div>
                      <h3 className="font-medium text-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-white/60">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FAQSection items={homeFaqItems} />

      {/* Final CTA */}
      <section className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
          <Reveal>
            <div className="flex flex-col items-center gap-5 text-center">
              <h2 className="max-w-xl text-3xl font-medium tracking-tight text-white sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="max-w-md text-lg text-white/70">
                Next cohort starts {formatCohortDate(nextClassStart.startDate)}. Talk to an advisor, or jump
                straight to the program that fits your schedule.
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-3">
                <Button href="/how-it-works/apply" size="lg" iconRight={<ArrowRight className="size-4" />}>
                  Apply Now
                </Button>
                <Button
                  href="/programs"
                  variant="secondary"
                  size="lg"
                  className="border-white bg-transparent text-white hover:bg-white/10"
                >
                  Browse Programs
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
