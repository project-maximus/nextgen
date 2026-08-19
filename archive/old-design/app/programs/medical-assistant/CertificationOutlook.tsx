"use client";

import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import type { Program } from "@/types";
import {
  BadgeCheck,
  Building2,
  ClipboardList,
  HeartPulse,
  Monitor,
  ShieldCheck,
  ShieldPlus,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

const certifications = [
  {
    code: "CMA",
    name: "Certified Medical Assistant",
    description: "Comprehensive preparation to help you pass your CMA certification exam with confidence.",
  },
  {
    code: "RMA",
    name: "Registered Medical Assistant",
    description: "Training and guidance to help you earn your RMA certification and advance your career.",
  },
];

const environmentIcons: Record<string, LucideIcon> = {
  "Physician Offices": Stethoscope,
  Hospitals: Building2,
  "Outpatient Clinics": ClipboardList,
  "Urgent Care Centers": ShieldPlus,
  "Specialty Practices": HeartPulse,
};

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-neutral-200" />
      <p className="shrink-0 text-xs font-medium uppercase tracking-wide text-neutral-500">{label}</p>
      <div className="h-px flex-1 bg-neutral-200" />
    </div>
  );
}

export function CertificationOutlook({ program }: { program: Program }) {
  return (
    <section className="bg-neutral-50 py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Certification */}
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-7 sm:p-9">
              <span className="inline-flex w-fit items-center gap-2 text-sm font-medium uppercase tracking-wide text-navy">
                <ShieldCheck className="size-4" aria-hidden="true" />
                Certification
              </span>
              <h2 className="mt-3 text-h2 font-medium tracking-tight text-neutral-900">
                Test on campus, get <span className="text-navy">certified</span> fast.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                Your program builds directly toward the {program.certification.exam}, administered by{" "}
                {program.certification.body} right here on our campus.
              </p>

              <div className="mt-8">
                <SectionDivider label="Certification Prep" />
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {certifications.map((cert) => (
                    <div key={cert.code} className="rounded-xl border border-neutral-200 p-5">
                      <BadgeCheck className="size-6 text-navy" aria-hidden="true" />
                      <p className="mt-3 text-lg font-semibold text-neutral-900">{cert.code}</p>
                      <p className="text-xs font-medium text-neutral-500">{cert.name}</p>
                      <p className="mt-2 text-xs leading-relaxed text-neutral-600">{cert.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <SectionDivider label="Testing & Accreditation" />
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-neutral-200 p-5">
                    <ShieldCheck className="size-6 text-navy" aria-hidden="true" />
                    <p className="mt-3 text-sm font-semibold text-neutral-900">{site.accreditation[0]?.name} Accredited</p>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-600">{site.accreditation[0]?.description}</p>
                  </div>
                  <div className="rounded-xl border border-neutral-200 p-5">
                    <Monitor className="size-6 text-navy" aria-hidden="true" />
                    <p className="mt-3 text-sm font-semibold text-neutral-900">{site.accreditation[1]?.name} Testing Site</p>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-600">{site.accreditation[1]?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Career opportunities */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-7 sm:p-9">
              <span className="inline-flex w-fit items-center gap-2 text-sm font-medium uppercase tracking-wide text-navy">
                <Building2 className="size-4" aria-hidden="true" />
                Career Opportunities
              </span>
              <h2 className="mt-3 text-h2 font-medium tracking-tight text-neutral-900">Where our graduates work.</h2>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                Our graduates are prepared for in-demand roles in a variety of healthcare settings.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {program.outlook.environments.map((env) => {
                  const Icon = environmentIcons[env] ?? Stethoscope;
                  return (
                    <span
                      key={env}
                      className="flex items-center gap-2 rounded-full border border-neutral-200 px-3.5 py-2 text-xs font-medium text-neutral-900"
                    >
                      <Icon className="size-3.5 shrink-0 text-navy" aria-hidden="true" />
                      {env}
                    </span>
                  );
                })}
              </div>

              <div className="relative mt-6 flex min-h-[220px] flex-1 overflow-hidden rounded-xl">
                <div className="flex w-[46%] shrink-0 flex-col justify-center bg-navy p-5 sm:p-6">
                  <p className="text-h4 font-medium leading-snug text-white">
                    Healthcare careers that make a <span className="text-gold">difference.</span>
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-white/70">
                    {program.outlook.employmentRate} of graduates find employment in the field.
                  </p>
                </div>
                <div className="relative flex-1">
                  <Image
                    src="/images/programs/medical-assistant-graduate.png"
                    alt="An NGHI graduate working as a medical assistant"
                    fill
                    sizes="(max-width: 1024px) 60vw, 320px"
                    className="object-cover object-[70%_center]"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
