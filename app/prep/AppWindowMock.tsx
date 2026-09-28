"use client";

import { prep, prepCatalog } from "@/content/prep";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Width the mock is laid out at; it's scaled as a whole to fit its container. */
const DESIGN_WIDTH = 1100;

/**
 * Renders children at a fixed desktop width and scales them uniformly to the
 * container, so the product mock looks identical (just smaller) on phones.
 */
function ScaledFrame({ children }: { children: ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const update = () => {
      const s = Math.min(1, outer.clientWidth / DESIGN_WIDTH);
      setScale(s);
      setHeight(inner.offsetHeight * s);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={outerRef} className="w-full" style={{ height }}>
      <div ref={innerRef} style={{ width: DESIGN_WIDTH, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}

/**
 * A faithful, code-built replica of the NGHI Prep "Every program we teach."
 * screen (the student home in the live prototype), inside a browser window.
 */
export function AppWindowMock() {
  const groups = prepCatalog.filter((g) => g.group === "Clinical Programs" || g.group === "Diagnostic Programs");

  return (
    <ScaledFrame>
      <div className="overflow-hidden rounded-[18px] border border-black/10 bg-white shadow-[0_40px_80px_-30px_rgb(0_0_0/0.55)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-4 border-b border-[var(--color-v4-line)] bg-[#f6f6f6] px-5 py-3.5">
          <div className="flex gap-2" aria-hidden="true">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-auto flex w-[420px] items-center justify-center rounded-lg bg-white px-4 py-1.5 text-[13px] text-[var(--color-v4-text-3)]">
            {prep.displayHost}/courses
          </div>
          <span className="w-[52px]" aria-hidden="true" />
        </div>

        {/* App content */}
        <div className="px-14 pb-14 pt-10 text-left">
          <Image src="/logos/nextgen-full-black.png" alt="" width={1402} height={478} className="h-8 w-auto" />

          <div className="mt-10 grid grid-cols-[1fr_380px] items-end gap-10">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-2)]">Our Programs</p>
              <p className="mt-3 text-[46px] font-normal leading-[1.05] tracking-[-0.02em] text-[var(--color-v4-text)]">
                Every program we teach.
              </p>
              <p className="mt-4 max-w-[520px] text-[15px] leading-relaxed text-[var(--color-v4-text-2)]">
                Your enrolled programs open here automatically once an administrator assigns you to a batch.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--color-v4-line)] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text)]">Have a join code?</p>
              <p className="mt-2 text-[13px] leading-snug text-[var(--color-v4-text-2)]">
                Your institute emails this code with your batch invitation.
              </p>
              <div className="mt-4 flex gap-2">
                <span className="flex h-10 flex-1 items-center rounded-lg border border-[var(--color-v4-line)] px-3 font-mono text-[14px] text-[var(--color-v4-text-3)]">
                  {prep.sampleJoinCode}
                </span>
                <span className="flex h-10 items-center rounded-lg bg-[var(--color-v4-ink-900)] px-5 text-[14px] font-semibold text-white">
                  Join
                </span>
              </div>
            </div>
          </div>

          {groups.map((group) => (
            <div key={group.group} className="mt-10">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-2)]">{group.group}</p>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {group.programs.slice(0, 3).map((p) => (
                  <div key={p.code} className="flex flex-col rounded-2xl border border-[var(--color-v4-line)] bg-[#fafafa] p-5">
                    <p className="text-[12px] font-semibold tracking-[0.1em] text-[var(--color-v4-text-2)]">{p.code}</p>
                    <p className="mt-2 text-[19px] leading-snug text-[var(--color-v4-text)]">{p.name}</p>
                    <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[var(--color-v4-text-2)]">{p.blurb}</p>
                    <span
                      className={`mt-4 self-start rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${
                        p.status === "live"
                          ? "bg-[var(--color-v4-ink-900)] text-white"
                          : "border border-[var(--color-v4-line)] text-[var(--color-v4-text-2)]"
                      }`}
                    >
                      {p.status === "live" ? "Open now" : "Coming soon"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScaledFrame>
  );
}
