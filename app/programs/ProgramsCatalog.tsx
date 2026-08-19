"use client";

import { Reveal } from "@/components/motion-v4/Reveal";
import { useLenis } from "@/components/motion-v4/SmoothScrollProvider";
import { programCategories, programs } from "@/content/programs";
import type { Program, ProgramCategory, ProgramFormat } from "@/types";
import { ArrowRight, Search, Stethoscope } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const formatLabel: Record<ProgramFormat, string> = {
  hybrid: "Hybrid",
  online: "Online",
  "in-person": "In-Person",
  flexible: "Flexible",
};

// Most of the stock photography under public/images/programs/ turned out to
// be mismatched (unrelated travel/nature shots) when audited — these four
// card images are the only ones confirmed to actually depict the program.
// Everything else falls back to a plain icon tile rather than show the
// wrong photo. Remove an entry here once its real photo is in place.
const VERIFIED_CARD_IMAGE_SLUGS = new Set(["medical-assistant", "nursing-assistant", "phlebotomy-technician", "ekg-technician"]);

const categories = programCategories.filter(
  (c): c is { value: ProgramCategory; label: string } => c.value !== "all",
);

function matchesQuery(program: Program, query: string) {
  if (!query) return true;
  const haystack = `${program.name} ${program.shortName} ${program.blurb} ${program.credential}`.toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function ProgramRow({ program }: { program: Program }) {
  return (
    <Link
      href={`/programs/${program.slug}`}
      className="group flex items-center gap-4 border-b border-[var(--color-v4-line)] py-5 transition-colors hover:bg-[var(--color-v4-mist)]"
    >
      <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[var(--color-v4-mist)]">
        {VERIFIED_CARD_IMAGE_SLUGS.has(program.slug) ? (
          <Image
            src={program.cardImage}
            alt=""
            fill
            sizes="56px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <Stethoscope className="size-5 text-[var(--color-v4-text-3)]" strokeWidth={1.5} aria-hidden="true" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-medium text-[var(--color-v4-text)]">{program.name}</span>
          <span className="hidden h-px flex-1 self-center border-t border-dotted border-[var(--color-v4-line)] sm:block" aria-hidden="true" />
          <span className="shrink-0 text-sm text-[var(--color-v4-text-3)]">
            {program.duration.split(" or ")[0].split(" full-time")[0]} · {formatLabel[program.format]}
          </span>
        </div>
        <p className="mt-1 line-clamp-1 text-sm text-[var(--color-v4-text-2)]">{program.blurb}</p>
      </div>

      <ArrowRight
        className="size-4 shrink-0 -translate-x-1 text-[var(--color-v4-text-3)] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </Link>
  );
}

export function ProgramsCatalog() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ProgramCategory>(categories[0].value);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const lenis = useLenis();

  const grouped = useMemo(() => {
    const q = query.trim();
    return categories
      .map((cat) => ({
        ...cat,
        items: programs.filter((p) => p.category === cat.value && matchesQuery(p, q)),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [query]);

  const totalMatches = grouped.reduce((sum, cat) => sum + cat.items.length, 0);

  useEffect(() => {
    const sections = Object.values(sectionRefs.current).filter((el): el is HTMLDivElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const category = visible[0].target.getAttribute("data-category") as ProgramCategory | null;
          if (category) setActiveCategory(category);
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [grouped]);

  const scrollToCategory = (category: ProgramCategory) => {
    const el = sectionRefs.current[category];
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -100, duration: 1 });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="v4-scope bg-white">
      {/* Intro band — same rounded, inset hero-card treatment as the
       * homepage Hero (mx-auto max-w container + rounded-[32px] card),
       * instead of a flush full-bleed banner. */}
      <section className="v4-scope bg-white">
        <div className="mx-auto max-w-[1600px] px-3 md:px-5 xl:px-6">
          <div className="relative flex min-h-[420px] items-end overflow-hidden rounded-[32px] px-6 pb-10 pt-32 sm:min-h-[480px] sm:px-8 sm:pb-12 md:px-11 xl:px-12">
            <Image
              src="/images/programs/medical-assistant-card.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ filter: "saturate(0.85) contrast(1.05) brightness(0.55)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" aria-hidden="true" />
            <div className="relative w-full max-w-[1600px]">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">Certification Programs</p>
                <h1 className="mt-3 max-w-2xl text-[clamp(1.875rem,1.2rem+2.6vw,3rem)] font-normal leading-[1.1] tracking-[-0.02em] text-white">
                  Find your path into healthcare.
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                  11 AMCA-accredited programs — 2 to 24 weeks, hybrid and in-person, right here in Dallas–Fort Worth.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile category nav — sticky under the fixed mobile header. */}
      <div className="sticky top-16 z-30 flex gap-2 overflow-x-auto border-b border-[var(--color-v4-line)] bg-white/95 px-6 py-3 backdrop-blur-sm [-ms-overflow-style:none] [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => scrollToCategory(cat.value)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat.value
                ? "border-[var(--color-v4-ink-900)] bg-[var(--color-v4-ink-900)] text-white"
                : "border-[var(--color-v4-line)] text-[var(--color-v4-text-2)]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-[1600px] px-6 py-12 sm:px-8 sm:py-16 md:px-11 xl:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
          {/* Sidebar — sticky on desktop/tablet, scrolls away with the page on mobile (handled by the pill nav above instead). */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <label className="relative block">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--color-v4-text-3)]"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search programs"
                  className="w-full rounded-full border border-[var(--color-v4-line)] bg-white py-2.5 pl-10 pr-4 text-sm text-[var(--color-v4-text)] placeholder:text-[var(--color-v4-text-3)] focus:border-[var(--color-v4-ink-700)] focus:outline-none"
                />
              </label>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">Categories</p>
              <nav className="mt-4 flex flex-col gap-1" aria-label="Program categories">
                {categories.map((cat) => {
                  const count = programs.filter((p) => p.category === cat.value && matchesQuery(p, query)).length;
                  const isActive = activeCategory === cat.value;
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => scrollToCategory(cat.value)}
                      disabled={count === 0}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors disabled:opacity-30 ${
                        isActive
                          ? "bg-[var(--color-v4-mist)] font-semibold text-[var(--color-v4-text)]"
                          : "text-[var(--color-v4-text-2)] hover:bg-[var(--color-v4-mist)] hover:text-[var(--color-v4-text)]"
                      }`}
                    >
                      {cat.label}
                      <span className="tnum text-xs text-[var(--color-v4-text-3)]">{count}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Mobile search (sidebar's search input is desktop-only). */}
          <label className="relative block lg:hidden">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--color-v4-text-3)]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search programs"
              className="w-full rounded-full border border-[var(--color-v4-line)] bg-white py-2.5 pl-10 pr-4 text-sm text-[var(--color-v4-text)] placeholder:text-[var(--color-v4-text-3)] focus:border-[var(--color-v4-ink-700)] focus:outline-none"
            />
          </label>

          {/* List */}
          <div className="min-w-0">
            {totalMatches === 0 ? (
              <p className="py-16 text-center text-sm text-[var(--color-v4-text-3)]">
                No programs match “{query}”. Try a different search.
              </p>
            ) : (
              grouped.map((cat) => (
                <div
                  key={cat.value}
                  ref={(el) => {
                    sectionRefs.current[cat.value] = el;
                  }}
                  data-category={cat.value}
                  className="scroll-mt-28 pt-12 first:pt-0 lg:pt-16"
                >
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-lg font-semibold text-[var(--color-v4-text)]">{cat.label}</h2>
                    <span className="tnum text-sm text-[var(--color-v4-text-3)]">{cat.items.length}</span>
                  </div>
                  <div className="mt-2">
                    {cat.items.map((program) => (
                      <ProgramRow key={program.slug} program={program} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
