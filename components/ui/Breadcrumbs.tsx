import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("w-full", className)}>
      <ol className="flex items-center gap-1.5 text-body-sm text-neutral-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={`${item.label}-${index}`}
              className={cn(
                "flex items-center gap-1.5",
                // Truncate all but the last two crumbs on mobile
                !isLast && index !== 0 && "hidden sm:flex",
              )}
            >
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-primary-700">
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(isLast && "text-neutral-900 font-medium")}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
