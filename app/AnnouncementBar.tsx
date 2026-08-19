import { formatCohortDate, getNextClassStart } from "@/content/dates";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function AnnouncementBar() {
  const nextClassStart = getNextClassStart();

  return (
    <div className="v4-scope hidden h-10 items-center justify-center gap-2 bg-white px-4 text-center sm:flex">
      <p className="text-sm text-[var(--color-v4-text-2)]">
        Next cohort starts {formatCohortDate(nextClassStart.startDate)} — seats limited
      </p>
      <Link
        href="/how-it-works/apply"
        className="inline-flex items-center gap-0.5 text-sm font-semibold text-[var(--color-v4-text)] hover:text-[var(--color-v4-text-2)]"
      >
        Apply now
        <ChevronRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
      </Link>
    </div>
  );
}
