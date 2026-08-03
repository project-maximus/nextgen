"use client";

import { useScrollDirection } from "@/components/motion-v4/useScrollDirection";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Programs", href: "/programs" },
  { label: "NGHI Prep", href: "/home-v4/prep" },
  { label: "Outcomes", href: "/home-v4/outcomes" },
  { label: "About", href: "/home-v4/about" },
  { label: "How It Works", href: "/home-v4/how-it-works" },
];

const leftLinks = navLinks.slice(0, 2);

function DotGridIcon() {
  return (
    <div className="grid grid-cols-3 gap-[3px]" aria-hidden="true">
      {Array.from({ length: 9 }).map((_, i) => (
        <span key={i} className="size-[3px] rounded-full bg-white" />
      ))}
    </div>
  );
}

function HamburgerButton({ condensed, onClick }: { condensed: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open menu"
      className={`flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/15 transition-colors duration-200 hover:bg-white/25 ${
        condensed ? "size-10" : "size-11"
      }`}
    >
      <DotGridIcon />
    </button>
  );
}

export function Header() {
  const { pastThreshold: condensed } = useScrollDirection(80);
  const { pastThreshold: pastAnnouncementBar } = useScrollDirection(40);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div
        className={`v4-scope fixed inset-x-0 z-50 flex justify-center transition-[top] duration-300 ${
          pastAnnouncementBar ? "top-0" : "top-10"
        }`}
      >
        <div
          className={`flex w-full items-center transition-[max-width,height,margin-top,border-radius,padding,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            condensed
              ? "mt-3 h-16 max-w-[760px] rounded-full bg-[var(--color-v4-ink-900)]/95 px-4 shadow-[var(--shadow-v4-float)] backdrop-blur-md sm:px-5"
              : "mt-0 h-[92px] max-w-[1600px] rounded-none bg-transparent px-9 md:px-11 xl:px-12"
          }`}
        >
          <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4">
            {/* left zone: Programs / NGHI Prep — the rest live behind the hamburger */}
            <div className="flex items-center">
              <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
                {leftLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group relative py-2 text-[15px] font-normal text-white/85 transition-colors hover:text-white"
                  >
                    {link.label}
                    <span
                      className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-white transition-transform duration-200 group-hover:scale-x-100"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </nav>
            </div>

            {/* center zone: logo — pill mark when condensed, real lockup (original colors) on hero */}
            <div className="flex justify-center">
              <Link href="/home-v4" className="flex items-center" aria-label="NextGen Health Institute">
                <AnimatePresence mode="wait" initial={false}>
                  {condensed ? (
                    <motion.span
                      key="mark"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center"
                    >
                      <Image
                        src="/logos/nextgen-v4-mark-white.png"
                        alt="NextGen Health Institute"
                        width={96}
                        height={96}
                        priority
                        className="h-8 w-8"
                      />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="lockup"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center"
                    >
                      <Image
                        src="/logos/nextgen-icon-lockup-black.png"
                        alt="NextGen Health Institute"
                        width={1402}
                        height={479}
                        priority
                        className="h-9 w-auto"
                      />
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </div>

            {/* right zone: actions + persistent hamburger (opens the full nav) */}
            <div className="flex items-center justify-end gap-3">
              <AnimatePresence initial={false}>
                {!condensed && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="hidden sm:block"
                  >
                    <Link
                      href="/contact"
                      className="inline-flex h-11 items-center rounded-full border border-white/30 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      Contact
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
              <Link
                href="/how-it-works/apply"
                className={
                  condensed
                    ? "inline-flex h-10 shrink-0 items-center rounded-full bg-white px-5 text-sm font-semibold text-[var(--color-v4-ink-900)] transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-[var(--color-v4-mist)]"
                    : "inline-flex h-11 shrink-0 items-center rounded-full bg-white px-7 text-[15px] font-semibold text-[var(--color-v4-ink-900)] transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-[var(--color-v4-mist)]"
                }
              >
                Apply Now
              </Link>
              <HamburgerButton condensed={condensed} onClick={() => setDrawerOpen(true)} />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="v4-scope v4-on-navy fixed inset-0 z-[60] flex flex-col bg-[var(--color-v4-ink-950)]"
          >
            <div className="flex h-[72px] items-center justify-between px-6">
              <Image
                src="/logos/nextgen-icon-lockup-white.png"
                alt="NextGen Health Institute"
                width={1402}
                height={479}
                className="h-8 w-auto"
              />
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="flex size-10 items-center justify-center text-white"
              >
                <X className="size-6" aria-hidden="true" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-6" aria-label="Primary">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setDrawerOpen(false)}
                    className="block py-3 text-[34px] font-normal leading-tight tracking-tight text-white"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex flex-col gap-3 px-6 pb-10">
              <Link
                href="/how-it-works/apply"
                onClick={() => setDrawerOpen(false)}
                className="flex h-12 items-center justify-center rounded-full bg-white text-[15px] font-semibold text-[var(--color-v4-ink-900)]"
              >
                Apply Now
              </Link>
              <Link
                href="/contact"
                onClick={() => setDrawerOpen(false)}
                className="flex h-12 items-center justify-center rounded-full border border-white/30 text-[15px] font-semibold text-white"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
