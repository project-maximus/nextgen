"use client";

import { Reveal } from "@/components/motion/Reveal";
import type { Program } from "@/types";
import { Briefcase, CalendarClock, CheckCircle2, MessageSquare, Search, Users } from "lucide-react";

const support = [
  { icon: Search, text: "Resume and interview preparation" },
  { icon: Briefcase, text: "Job search assistance" },
  { icon: Users, text: "Employer networking opportunities" },
  { icon: MessageSquare, text: "Career counseling and guidance" },
];

export function ProgramDetails({ program }: { program: Program }) {
  const rows = [
    { label: "Duration:", value: program.duration, tone: "gold" as const },
    { label: "Format:", value: program.format, tone: "pill" as const },
    { label: "Start Dates:", value: "Multiple dates available", tone: "plain" as const },
    { label: "Employment Rate:", value: program.outlook.employmentRate, tone: "success" as const },
    { label: "Financial Aid:", value: "Available for those who qualify", tone: "plain" as const },
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-neutral-200">
              <div className="flex items-center gap-4 bg-navy px-6 py-6">
                <CalendarClock className="size-6 shrink-0 text-white" aria-hidden="true" />
                <h2 className="text-h4 font-medium text-white">Program Information</h2>
              </div>
              <dl className="divide-y divide-neutral-200">
                {rows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 px-6 py-5">
                    <dt className="text-base text-neutral-600">{row.label}</dt>
                    <dd>
                      {row.tone === "gold" && (
                        <span className="block max-w-[200px] text-right text-sm font-semibold leading-snug text-navy">
                          {row.value}
                        </span>
                      )}
                      {row.tone === "pill" && (
                        <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium capitalize text-neutral-900">
                          {row.value}
                        </span>
                      )}
                      {row.tone === "plain" && <span className="text-base font-medium text-neutral-900">{row.value}</span>}
                      {row.tone === "success" && (
                        <span className="inline-flex items-center gap-1.5 text-base font-semibold text-success">
                          <CheckCircle2 className="size-4" aria-hidden="true" />
                          {row.value}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-2xl bg-neutral-50 p-8 md:p-9">
              <p className="text-sm font-medium uppercase tracking-wide text-navy">Job placement assistance</p>
              <h2 className="mt-2 text-h2 font-medium tracking-tight text-neutral-900">
                Our career services team provides:
              </h2>
              <div className="mt-8 grid flex-1 grid-cols-1 gap-4 content-start sm:grid-cols-2">
                {support.map((item) => (
                  <div key={item.text} className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3.5">
                    <item.icon className="size-5 shrink-0 text-navy" aria-hidden="true" />
                    <span className="text-sm font-medium text-neutral-900">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
