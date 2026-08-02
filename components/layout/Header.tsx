"use client";

import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { cn } from "@/lib/utils";
import type { NavItem, Program } from "@/types";
import { ArrowRight, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MegaMenu } from "./MegaMenu";
import { MobileDrawer } from "./MobileDrawer";

const navItems: NavItem[] = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Cost", href: "/cost" },
  { label: "Outcomes", href: "/outcomes" },
  { label: "About", href: "/about" },
];

export interface HeaderProps {
  programs: Program[];
}

export function Header({ programs }: HeaderProps) {
  const { pastThreshold } = useScrollPosition(60);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 bg-canvas/90 backdrop-blur-md transition-shadow duration-300",
          pastThreshold && "border-b border-navy/10 shadow-sm",
        )}
      >
        <div className="mx-auto grid h-20 max-w-[1280px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 md:px-8 lg:px-10">
          <Link href="/" className="flex items-center" aria-label={site.name}>
            <Image
              src="/logos/nghi-logo.webp"
              alt={site.name}
              width={175}
              height={60}
              priority
              className="h-11 w-auto sm:h-12"
            />
          </Link>

          <nav className="hidden items-center justify-center gap-1 lg:flex" aria-label="Primary">
            <MegaMenu programs={programs} />
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-body-sm font-medium text-navy transition-colors hover:bg-navy-soft"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <a href={site.phoneHref} className="hidden text-body-sm font-semibold text-navy xl:block">
              {site.phone}
            </a>
            <Button
              href="/how-it-works/apply"
              size="sm"
              iconRight={<ArrowRight className="size-4" />}
              className="hidden sm:inline-flex"
            >
              Apply Now
            </Button>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="rounded-full p-2 text-navy hover:bg-navy-soft lg:hidden"
            >
              <Menu className="size-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navItems={navItems}
        programs={programs}
      />
    </>
  );
}
