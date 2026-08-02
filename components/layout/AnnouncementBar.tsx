"use client";

import { Zap, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export interface AnnouncementBarProps {
  message: string;
  ctaLabel: string;
  ctaHref: string;
  dismissible?: boolean;
  /** Only renders when the current route matches this path. Omit to show on every route. */
  showOnPath?: string;
}

export function AnnouncementBar({
  message,
  ctaLabel,
  ctaHref,
  dismissible = true,
  showOnPath,
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();

  if (dismissed) return null;
  if (showOnPath && pathname !== showOnPath) return null;

  return (
    <div className="relative flex items-center justify-center gap-2 bg-navy-deep px-4 py-2.5 text-center text-body-sm font-medium text-canvas">
      <Zap className="hidden size-4 shrink-0 text-gold sm:block" aria-hidden="true" />
      <p className="truncate">
        <span className="hidden sm:inline">{message}</span>
        <span className="sm:hidden">{message.split("—")[0].trim()}</span>{" "}
        <Link href={ctaHref} className="font-semibold text-gold underline underline-offset-2 hover:no-underline">
          {ctaLabel} →
        </Link>
      </p>
      {dismissible && (
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
          className="absolute right-3 rounded-full p-1 hover:bg-white/10"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
