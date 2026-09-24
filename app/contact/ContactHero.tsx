"use client";

import { useIsReducedMotion } from "@/components/motion/MotionProvider";
import { site } from "@/content/site";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = "Every healthcare career starts with a conversation.";
/** Solid colours (not opacity) so photos passing behind never show through unread words. */
const INK = "#0a0a0a";
const DIM = "#d4d4d4";
/** Words already inked on load, so the headline never reads as disabled. */
const PRE_FILLED = 2;

/**
 * Photos fly outward as you scroll. On desktop `dx`/`dy` is the direction (vw/vh
 * at the end of the flight); on smaller screens only the sign of `dx` is used and
 * the photo flies through whichever free band (above/below/beside the text) the
 * layout actually has. `w` is the desktop width in px, `at` the launch point
 * (0–1 of the scroll) — nothing is visible before the first scroll.
 */
const PHOTOS: { src: string; dx: number; dy: number; w: number; ratio: number; at: number }[] = [
  { src: "/images/contact-float/f3.jpg", dx: -48, dy: -16, w: 230, ratio: 3 / 4, at: 0 },
  { src: "/images/contact-float/f1.jpg", dx: 44, dy: 28, w: 200, ratio: 1, at: 0.05 },
  { src: "/images/contact-float/f7.jpg", dx: 42, dy: -36, w: 170, ratio: 4 / 5, at: 0.1 },
  { src: "/images/contact-float/f5.jpg", dx: -42, dy: 34, w: 210, ratio: 4 / 3, at: 0.15 },
  { src: "/images/contact-float/f4.jpg", dx: 22, dy: -48, w: 150, ratio: 1, at: 0.22 },
  { src: "/images/contact-float/f6.jpg", dx: -54, dy: 10, w: 190, ratio: 1, at: 0.29 },
  { src: "/images/contact-float/f9.jpg", dx: 54, dy: -8, w: 220, ratio: 3 / 4, at: 0.36 },
  { src: "/images/contact-float/f2.jpg", dx: -28, dy: 46, w: 170, ratio: 4 / 5, at: 0.43 },
  { src: "/images/contact-float/f8.jpg", dx: 34, dy: 44, w: 180, ratio: 4 / 3, at: 0.5 },
  { src: "/images/contact-float/f10.jpg", dx: -30, dy: -44, w: 200, ratio: 4 / 3, at: 0.57 },
];

type Mode = "desktop" | "bands" | "landscape";

/** Layout the flight paths are computed against, measured from the live DOM. */
interface Metrics {
  mode: Mode;
  vw: number;
  vh: number;
  /** Top/bottom of the text column, relative to the viewport centre. */
  colTop: number;
  colBottom: number;
  /** Height of the fixed header covering the top of the stage. */
  headerH: number;
}

function getMode(vw: number, vh: number): Mode {
  if (vh < 620 && vw > vh) return "landscape";
  if (vw >= 1024 && vh >= 620) return "desktop";
  return "bands";
}

/** Photo size multiplier per mode. */
function sizeFactor(mode: Mode, vw: number) {
  if (mode === "desktop") return 1;
  if (mode === "landscape") return 0.5;
  return Math.min(0.8, Math.max(0.5, vw / 700));
}

/** Position/scale/opacity for photo `i`, `t` (0–1) of the way through its flight. */
function flight(t: number, i: number, m: Metrics) {
  const p = PHOTOS[i];
  const opacity = t < 0.18 ? t / 0.18 : t > 0.82 ? Math.max(0, (1 - t) / 0.18) : 1;
  const scale = 0.35 + 1.1 * t;
  const side = Math.sign(p.dx) || 1;

  if (m.mode === "desktop") {
    // Launch from just outside the text column and fly diagonally out past the edges.
    const reach = 0.45 + 0.85 * t;
    return { x: (p.dx / 100) * m.vw * reach, y: (p.dy / 100) * m.vh * reach, scale, opacity };
  }

  if (m.mode === "landscape") {
    // Short screens: fly down the gutters beside the (narrowed) text column.
    return {
      x: side * m.vw * (0.36 + 0.22 * t),
      y: (p.dy / 100) * m.vh * (0.4 + 0.9 * t),
      scale: 0.4 + 0.9 * t,
      opacity,
    };
  }

  // Phones/tablets: alternate between the free band above and below the text,
  // falling back to whichever band is bigger if one is too cramped.
  const top = { from: -m.vh / 2 + m.headerH, to: m.colTop - 12 };
  const bottom = { from: m.colBottom + 12, to: m.vh / 2 };
  const size = (b: { from: number; to: number }) => b.to - b.from;
  let useTop = i % 2 === 1;
  if (useTop && size(top) < 90) useTop = false;
  if (!useTop && size(bottom) < 90 && size(top) > size(bottom)) useTop = true;
  const band = useTop ? top : bottom;
  const mid = (band.from + band.to) / 2;
  // Start mid-band, drift toward the outer edge while fanning out sideways.
  const edge = useTop ? band.from - 40 : band.to + 40;
  return { x: side * m.vw * (0.08 + 0.5 * t), y: mid + (edge - mid) * t, scale, opacity };
}

export function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const colRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useIsReducedMotion();
  const [mode, setMode] = useState<Mode>("bands");
  const [vw, setVw] = useState(390);
  const words = HEADLINE.split(" ");

  // Pick the layout mode from the real viewport; re-pick on resize/rotation.
  useEffect(() => {
    const update = () => {
      setMode(getMode(window.innerWidth, window.innerHeight));
      setVw(window.innerWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const col = colRef.current;
      if (!section || !col) return;
      const photos = gsap.utils.toArray<HTMLElement>("[data-photo]", section);
      const wordEls = gsap.utils.toArray<HTMLElement>("[data-word]", section);
      const line = section.querySelector<HTMLElement>("[data-line]");

      let metrics!: Metrics;
      const measure = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const r = col.getBoundingClientRect();
        const stage = col.parentElement!.getBoundingClientRect();
        metrics = {
          mode: getMode(w, h),
          vw: w,
          vh: h,
          colTop: r.top - stage.top - h / 2,
          colBottom: r.bottom - stage.top - h / 2,
          headerH: w < 640 ? 64 : 80,
        };
      };
      measure();

      const place = (el: HTMLElement, t: number) => gsap.set(el, flight(t, Number(el.dataset.photo), metrics));

      if (reducedMotion) {
        photos.forEach((el) => place(el, 0.55));
        gsap.set(wordEls, { color: INK });
        if (line) gsap.set(line, { scaleY: 1 });
        return;
      }

      // Start hidden at the centre; the first scroll launches them.
      photos.forEach((el) => place(el, 0));

      const states = photos.map(() => ({ t: 0 }));
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
          onRefresh: () => {
            measure();
            photos.forEach((el, i) => place(el, states[i].t));
          },
        },
      });

      // Headline inks in over the first half of the scroll.
      tl.to(wordEls.slice(PRE_FILLED), { color: INK, stagger: 0.06, duration: 0.1 }, 0);
      if (line) tl.fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0);

      photos.forEach((el, i) => {
        const p = PHOTOS[Number(el.dataset.photo)];
        // Each flight takes ~42% of the scroll, so several photos are airborne at once.
        tl.to(states[i], { t: 1, duration: 0.42, onUpdate: () => place(el, states[i].t) }, p.at);
      });

      tl.to({}, { duration: 0.02 }, 1);
    },
    { scope: sectionRef, dependencies: [reducedMotion, mode, vw], revertOnUpdate: true },
  );

  const factor = sizeFactor(mode, vw);

  return (
    <section ref={sectionRef} aria-labelledby="contact-hero-title" className="relative h-[240svh] bg-white lg:h-[300vh]">
      {/* Stage: padded to clear the fixed header (64px mobile bar / 132px desktop header + announcement bar). */}
      <div
        className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden pb-6 pt-16 sm:pt-[132px] [@media(max-height:619px)_and_(orientation:landscape)]:pb-3 [@media(max-height:619px)_and_(orientation:landscape)]:pt-[88px]"
      >
        {/* Flying photos */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {PHOTOS.map((p, i) => {
            const width = Math.round(p.w * factor);
            const height = Math.round(width / p.ratio);
            return (
              <div
                key={p.src}
                data-photo={i}
                className="absolute left-1/2 top-1/2 overflow-hidden rounded-[14px] opacity-0 shadow-[0_20px_40px_-24px_rgb(0_0_0/0.35)] will-change-transform"
                style={{ width, height, marginLeft: -width / 2, marginTop: -height / 2 }}
              >
                <Image src={p.src} alt="" fill sizes={`${Math.round(width * 1.6)}px`} className="object-cover" />
              </div>
            );
          })}
        </div>

        {/* Centre column */}
        <div
          ref={colRef}
          className="relative z-10 mx-auto flex max-w-[820px] flex-col items-center px-5 text-center sm:px-6 [@media(max-height:619px)_and_(orientation:landscape)]:max-w-[500px]"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)] sm:text-xs">
            Contact Us
          </p>
          <h1
            id="contact-hero-title"
            className="mt-3 text-[clamp(1.875rem,1rem+4.4vw,4.25rem)] font-normal leading-[1.05] tracking-[-0.03em] text-[var(--color-v4-text)] sm:mt-5 [@media(max-height:619px)_and_(orientation:landscape)]:mt-2 [@media(max-height:619px)_and_(orientation:landscape)]:text-[clamp(1.5rem,0.8rem+2.4vw,2.25rem)]"
          >
            {words.map((word, i) => (
              <span key={i} data-word style={i < PRE_FILLED ? undefined : { color: DIM }}>
                {word}
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
          <p
            className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--color-v4-text-2)] sm:mt-6 sm:text-lg [@media(max-height:619px)_and_(orientation:landscape)]:mt-2 [@media(max-height:619px)_and_(orientation:landscape)]:text-sm [@media(max-height:439px)_and_(orientation:landscape)]:hidden"
          >
            Ask us about programs, schedules, financial aid, or what your first week will actually feel like. We reply
            within 24 hours.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:mt-8 sm:gap-3 [@media(max-height:619px)_and_(orientation:landscape)]:mt-4">
            <a
              href="#contact-form"
              className="inline-flex h-11 items-center rounded-full bg-[var(--color-v4-ink-900)] px-5 text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-[var(--color-v4-ink-800)] sm:h-12 sm:px-7 sm:text-[15px]"
            >
              Send a message
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--color-v4-line)] bg-white/80 px-5 text-sm font-semibold text-[var(--color-v4-text)] backdrop-blur-sm transition-colors duration-150 hover:bg-[var(--color-v4-mist)] sm:h-12 sm:px-7 sm:text-[15px]"
            >
              <Phone className="size-4" strokeWidth={1.75} aria-hidden="true" />
              {site.phone}
            </a>
          </div>
        </div>

        {/* Centre hairline growing toward the form below. */}
        <div
          data-line
          aria-hidden="true"
          className="absolute bottom-0 left-[calc(50%-0.5px)] h-[12vh] w-px origin-top bg-[var(--color-v4-line)]"
          style={{ transform: "scaleY(0)" }}
        />
      </div>
    </section>
  );
}
