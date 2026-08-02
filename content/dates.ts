import type { CohortDate } from "@/types";

/**
 * Cohort start dates. The announcement bar and homepage always read
 * `nextClassStart`, which is derived — never hard-coded — from this file.
 * Sample near-term dates; update this file only to roll the schedule forward.
 */
export const cohortDates: CohortDate[] = [
  { programSlug: "medical-assistant", startDate: "2026-08-15", applyBy: "2026-08-08" },
  { programSlug: "medical-assistant", startDate: "2026-09-14", applyBy: "2026-09-07" },
  { programSlug: "nursing-assistant", startDate: "2026-08-03", applyBy: "2026-07-27", seatsLimited: true },
  { programSlug: "nursing-assistant", startDate: "2026-08-24", applyBy: "2026-08-17" },
  { programSlug: "phlebotomy-technician", startDate: "2026-08-10", applyBy: "2026-08-03" },
  { programSlug: "phlebotomy-technician", startDate: "2026-09-21", applyBy: "2026-09-14" },
  { programSlug: "ekg-technician", startDate: "2026-08-17", applyBy: "2026-08-10" },
  { programSlug: "ekg-technician", startDate: "2026-10-05", applyBy: "2026-09-28" },
  { programSlug: "patient-care-technician", startDate: "2026-08-03", applyBy: "2026-07-27" },
  { programSlug: "patient-care-technician", startDate: "2026-09-28", applyBy: "2026-09-21" },
  { programSlug: "mri-technician", startDate: "2026-09-14", applyBy: "2026-08-31", seatsLimited: true },
  { programSlug: "medical-administrative-assistant", startDate: "2026-08-10", applyBy: "2026-08-03" },
  { programSlug: "medical-administrative-assistant", startDate: "2026-09-21", applyBy: "2026-09-14" },
  { programSlug: "medical-billing-coding", startDate: "2026-08-17", applyBy: "2026-08-10" },
  { programSlug: "medical-billing-coding", startDate: "2026-10-12", applyBy: "2026-10-05" },
  { programSlug: "mental-health-technician", startDate: "2026-08-24", applyBy: "2026-08-17" },
  { programSlug: "orthopedic-casting", startDate: "2026-08-17", applyBy: "2026-08-10", seatsLimited: true },
  { programSlug: "orthopedic-casting", startDate: "2026-09-28", applyBy: "2026-09-21" },
  { programSlug: "physical-therapy-aide", startDate: "2026-08-31", applyBy: "2026-08-24" },
];

export function getUpcomingDatesForProgram(slug: string): CohortDate[] {
  return cohortDates
    .filter((d) => d.programSlug === slug)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

export function getNextClassStart(): CohortDate {
  return [...cohortDates].sort((a, b) => a.startDate.localeCompare(b.startDate))[0];
}

export function formatCohortDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
