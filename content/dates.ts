import type { CohortDate } from "@/types";

/**
 * Cohort start dates. The announcement bar and homepage always read
 * `getNextClassStart()`, which is derived — never hard-coded — from this file.
 *
 * The live site states "New classes begin monthly" and "Next Class Starts:
 * October 15, 2026"; per-program dates beyond that are sample data. Past
 * dates are ignored automatically, so roll this file forward as needed.
 */
export const cohortDates: CohortDate[] = [
  { programSlug: "medical-assistant", startDate: "2026-10-15", applyBy: "2026-10-08" },
  { programSlug: "medical-assistant", startDate: "2026-11-16", applyBy: "2026-11-09" },
  { programSlug: "nursing-assistant", startDate: "2026-10-15", applyBy: "2026-10-08", seatsLimited: true },
  { programSlug: "nursing-assistant", startDate: "2026-11-16", applyBy: "2026-11-09" },
  { programSlug: "phlebotomy-technician", startDate: "2026-10-15", applyBy: "2026-10-08" },
  { programSlug: "phlebotomy-technician", startDate: "2026-11-16", applyBy: "2026-11-09" },
  { programSlug: "ekg-technician", startDate: "2026-10-15", applyBy: "2026-10-08" },
  { programSlug: "ekg-technician", startDate: "2026-11-16", applyBy: "2026-11-09" },
  { programSlug: "patient-care-technician", startDate: "2026-10-15", applyBy: "2026-10-08" },
  { programSlug: "patient-care-technician", startDate: "2026-12-14", applyBy: "2026-12-07" },
  { programSlug: "mri-technician", startDate: "2026-11-16", applyBy: "2026-11-02", seatsLimited: true },
  { programSlug: "medical-administrative-assistant", startDate: "2026-10-15", applyBy: "2026-10-08" },
  { programSlug: "medical-administrative-assistant", startDate: "2026-11-16", applyBy: "2026-11-09" },
  { programSlug: "medical-billing-coding", startDate: "2026-10-15", applyBy: "2026-10-08" },
  { programSlug: "medical-billing-coding", startDate: "2026-12-14", applyBy: "2026-12-07" },
  { programSlug: "mental-health-technician", startDate: "2026-11-16", applyBy: "2026-11-09" },
  { programSlug: "orthopedic-casting", startDate: "2026-10-15", applyBy: "2026-10-08", seatsLimited: true },
  { programSlug: "orthopedic-casting", startDate: "2026-11-16", applyBy: "2026-11-09" },
  { programSlug: "physical-therapy-aide", startDate: "2026-11-16", applyBy: "2026-11-09" },
];

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function upcoming(dates: CohortDate[]): CohortDate[] {
  const today = todayIso();
  const sorted = [...dates].sort((a, b) => a.startDate.localeCompare(b.startDate));
  const future = sorted.filter((d) => d.startDate >= today);
  // If the file hasn't been rolled forward, fall back to the latest date rather than crash.
  return future.length ? future : sorted.slice(-1);
}

export function getUpcomingDatesForProgram(slug: string): CohortDate[] {
  return upcoming(cohortDates.filter((d) => d.programSlug === slug));
}

/** Distinct upcoming start dates across all programs (for "Start dates" lists). */
export function getUpcomingStartDates(limit = 3): string[] {
  return [...new Set(upcoming(cohortDates).map((d) => d.startDate))].slice(0, limit);
}

export function getNextClassStart(): CohortDate {
  return upcoming(cohortDates)[0];
}

export function formatCohortDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
