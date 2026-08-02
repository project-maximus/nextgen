# Master Build Prompt for NextGen Health Institute — Premium Superpower-Inspired Medical Education Website

You are a senior frontend engineer and product designer building the complete marketing website for **NextGen Health Institute (NGHI)**, a healthcare education institute in Dallas, Texas, accredited by **AMCA**, offering **11 certification programs**, and launching **NGHI Prep** — an AI-powered study platform (AI Tutor, MCQs, Flashcards, Adaptive Study Plans, Mock Exams, Progress Tracking, Video Lessons, Audio Lessons, Certification Readiness Dashboard, Student Community).

Build the site exactly to this specification. Do not ask follow-up questions. Where an asset (photo/video) is missing, build with the placeholder system defined in §7.6 so real assets can be swapped in without layout changes. Every rule in this document is binding; the checklists in §14 are your acceptance criteria.

---

## 1. Overall Design Philosophy

**One sentence:** A medical institute that looks and moves like a world-class technology product — Apple-level simplicity, Linear-level precision, Stripe-level clarity, Superpower-level storytelling.

**Visual philosophy.** This is an editorial + product-marketing hybrid. Typography and whitespace carry the brand; imagery and product UI provide proof. Every screen is composed like a page in a beautifully typeset book that occasionally opens into a live product demo. Structure is expressed with hairline borders and surface changes, never with drop-shadow boxes stacked on gradients.

**Emotional goal.** In the first 5 seconds a visitor should feel: *"This is a serious, modern institution — and it's on my side."* Calm confidence, not excitement. The signals of that feeling are: one clear headline, enormous negative space, a single restrained motion moment, and zero clutter. Nothing blinks, nothing begs.

**Brand personality.** Precise · credible · ambitious · humane · quietly premium. NGHI speaks like a mentor who has done the work: plain language, concrete outcomes, no hype adjectives ("revolutionary," "world-class," "cutting-edge" are banned from copy).

**Trust × innovation.** Trust comes from the *institutional layer*: accreditation, real numbers, real faces, classical typographic order, generous space. Innovation comes from the *product layer*: NGHI Prep UI shown as living, animated interface, precise micro-interactions, motion choreography. Keep the layers distinct — institutional sections are still and editorial; product sections are where motion concentrates.

**Minimalism principles.**
1. Every section has exactly one job and one focal element.
2. Maximum three type levels visible in any section (eyebrow → headline → support).
3. If an element can be removed without losing meaning, remove it.
4. Decoration must encode information (a rule divides, a number counts, a badge certifies) — never exists "for visual interest."
5. Space is the primary luxury signal. When in doubt, add space, not elements.

**What to avoid (hard bans).** Glassmorphism panels, neon glows, mesh/aurora gradients, floating 3D blobs, emoji in UI, icon-grid "feature dump" sections, stock photos of actors in lab coats pointing at clipboards, carousels for critical content, more than one accent color, template hero patterns (badge-pill + gradient headline + two buttons + logo marquee, all centered — do not build this exact stack).

---

## 2. Color System

The palette is **deep navy + warm gold on quiet neutrals**. Navy is the brand's authority; gold is its single note of distinction. The site must read as "navy and white with a hint of gold," never "colorful."

### 2.1 Tokens (Tailwind v4 `@theme`)

```css
@theme {
  /* Navy — brand core */
  --color-navy-950: #060D1A;  /* deepest page background (footer, video overlays) */
  --color-navy-900: #0A1830;  /* PRIMARY navy — dark sections, primary buttons */
  --color-navy-800: #102341;  /* SECONDARY navy — raised surfaces on dark */
  --color-navy-700: #1B3457;  /* borders/hover on dark, chart strokes */
  --color-navy-100: #DCE4F0;  /* subtle navy tint for chips on light */

  /* Gold — single accent */
  --color-gold-600: #A9861D;  /* gold on white when used as text (AA large only) */
  --color-gold-500: #C9A227;  /* PRIMARY gold — rules, numerals, active marks */
  --color-gold-400: #E0BE55;  /* gold on navy (hover/active on dark) */

  /* Neutrals */
  --color-white:    #FFFFFF;  /* base background */
  --color-mist:     #F5F7FA;  /* alternate light section, card fill on white */
  --color-line:     #E4E9F0;  /* hairline borders on light */
  --color-line-dark: rgb(255 255 255 / 0.10); /* hairlines on navy */

  /* Text on light */
  --color-text:     #0B1526;  /* primary */
  --color-text-2:   #46536A;  /* secondary */
  --color-text-3:   #8A94A8;  /* captions, meta */

  /* Text on navy */
  --color-text-inv:   #FFFFFF;
  --color-text-inv-2: #B9C4D6;
  --color-text-inv-3: #7C8AA3;

  /* Semantic (product UI only — never marketing sections) */
  --color-success: #157F5B;
  --color-warning: #B25E09;
  --color-error:   #C03A2B;
}
```

### 2.2 Usage rules

- **Backgrounds:** white → mist → navy-900, alternating by section (rhythm defined in §9). navy-950 is reserved for the footer and full-bleed media overlays.
- **Gold is allowed only for:** (a) the AMCA accreditation mark/line, (b) hero stat numerals and key data points, (c) active/selected states (tab underline, current step, active nav item on dark), (d) a single 2px "credential rule" under section eyebrows on navy sections, (e) hover state of text links on navy.
- **Gold must NOT be used for:** body text, backgrounds of any area larger than a badge, buttons on light backgrounds, more than **one gold element per viewport**, icons in bulk, borders of ordinary cards, gradients of any kind. If two gold elements would appear in one viewport, demote one to neutral.
- **Contrast rules:** all body text ≥ 4.5:1; large display text ≥ 3:1. Verified pairs: `text/white` 17.9:1 ✓, `text-2/white` 7.6:1 ✓, `white/navy-900` 16.9:1 ✓, `text-inv-2/navy-900` 9.8:1 ✓, `gold-500/navy-900` 7.4:1 ✓, `gold-600/white` 4.6:1 ✓ (still: gold text only at ≥18px semibold). **Never set gold-500 text on white** (3.2:1 — fails).
- Semantic colors appear only inside NGHI Prep UI mockups and form validation — never as marketing section accents.

---

## 3. Typography System

**Sora only** (Google Fonts, variable). Load weights 300–700 via `next/font` with `display: swap`. No second typeface anywhere, including mockups. Numerals in stats and dashboards use `font-feature-settings: "tnum"` (tabular).

### 3.1 Scale (desktop → mobile)

| Token | Size / Line-height | Weight | Tracking | Use |
|---|---|---|---|---|
| `display-xl` | 88px/0.98 → 44px/1.05 | 300 | -0.03em | Home hero only |
| `display` | 64px/1.02 → 38px/1.08 | 300 | -0.025em | Page heroes |
| `h1` | 52px/1.06 → 34px/1.12 | 400 | -0.02em | Section headlines |
| `h2` | 40px/1.12 → 28px/1.18 | 400 | -0.015em | Sub-sections |
| `h3` | 28px/1.25 → 22px/1.3 | 500 | -0.01em | Card titles, feature heads |
| `h4` | 22px/1.35 → 19px/1.4 | 500 | -0.005em | Minor heads |
| `h5` | 18px/1.45 | 600 | 0 | List heads, form legends |
| `h6` / eyebrow | 12px/1.4 | 600 | +0.14em, uppercase | Section eyebrows, labels |
| `body-lg` | 19px/1.65 → 17px/1.65 | 400 | 0 | Hero support, intros |
| `body` | 16px/1.65 | 400 | 0 | Default |
| `small` | 14px/1.55 | 400 | +0.005em | Card meta, table cells |
| `caption` | 12px/1.5 | 500 | +0.02em | Image captions, legal |
| `button` | 15px/1 | 600 | +0.01em | All buttons |

- Max line length: headlines ≤ 16 words / support paragraphs ≤ `max-w-[42rem]` (~68ch); never let body text span a full container.
- Responsive scaling: use `clamp()` per row above (e.g., `clamp(2.75rem, 1.2rem + 5.2vw, 5.5rem)` for display-xl); type steps down fluidly, never at a single breakpoint jump.
- Weight logic: the bigger the type, the lighter the weight (display = 300; captions = 500–600). This inversion is the core of the premium feel.

### 3.2 The Superpower rhythm — and how to recreate it

Superpower's typographic feel comes from **extreme contrast used with a strict cadence**, not from fancy fonts:

1. **Contrast:** giant light-weight display (80px+, weight 300) sits directly against tiny bold uppercase labels (12px, +0.14em). Nothing in between competes. Recreate by keeping h2–h4 out of hero sections entirely.
2. **Cadence:** every section repeats the same three-beat pattern — `eyebrow (12px caps)` → `headline (h1/h2, ≤2 lines)` → `support (body-lg, ≤2 sentences, text-2 color)`. The repetition itself reads as design confidence. Never improvise a fourth beat.
3. **Air:** headline blocks get more space above (96px) than below (24–32px to support, 56–64px to content), so each section "announces" itself.
4. **Line discipline:** display lines break at meaningful phrase boundaries — set manual `<br className="hidden md:block">` breaks; never let a hero headline wrap to 3+ lines on desktop.

---

## 4. Spacing & Layout System

Strict **4px base grid**. Only these values exist: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128, 160, 192. Any other number is a bug.

### 4.1 Containers

- Page container: `max-width: 1200px`, padding-inline `24px` (mobile) / `32px` (≥768) / `40px` (≥1280).
- Wide container (media, dashboards, marquees): `max-width: 1360px`.
- Text column: `max-width: 680px` for any running prose.
- Grid: 12 columns, `gap: 24px` (desktop) / `16px` (mobile).

### 4.2 Exact vertical rules

- **Section spacing:** `padding-block: 128px` desktop / `80px` tablet / `64px` mobile. Adjacent same-background sections share a single 1px `line` divider instead of doubled padding (use 96px in that case).
- **Hero (Home):** `padding-top: 176px` (nav height 72px + 104px), `padding-bottom: 96px`. Inner page heroes: 144px top / 64px bottom.
- **Eyebrow → headline:** 16px. **Headline → support:** 24px. **Support → CTA row:** 40px. **Header block → section content:** 64px.
- **Card gutters:** 24px desktop / 16px mobile. **Card internal padding:** 32px (feature/program), 24px (stat/testimonial-compact), 40px (large showcase cards).
- **Button rows:** 12px gap between buttons; 16px between a button and adjacent text.
- **Footer:** 96px top padding, 48px between column grid and legal bar.
- Mobile: multiply all section-level values ×0.6 (rounded to grid); component-internal spacing stays fixed.

---

## 5. Component Design Rules

Global component laws: border-radius scale is **8px (inputs/chips) · 12px (cards) · 16px (large showcase cards/media) · 999px (buttons, badges)**. Shadows are nearly abolished — the only permitted shadow is `0 1px 2px rgb(10 24 48 / 0.06)` on light interactive cards and `0 24px 48px -24px rgb(6 13 26 / 0.35)` on floating product UI previews. Everything else is flat + 1px border. Focus state for **every** interactive element: `outline: 2px solid var(--color-navy-700); outline-offset: 3px` (gold-400 outline on navy backgrounds). All transitions 200ms unless stated.

**Buttons** — height 48px (44px mobile), padding-inline 28px, radius 999px, weight 600, 15px.
- *Primary:* navy-900 fill, white text. Hover: navy-800 + translateY(-1px). Active: navy-950, translateY(0). On navy sections: white fill, navy-900 text; hover mist.
- *Secondary:* transparent fill, 1px `line` border (`line-dark` on navy), text color. Hover: border navy-700 + bg mist (or white/5% on navy).
- *Ghost/text:* no border, text + 16px arrow glyph; hover: arrow translates 4px right, underline slides in. Use for tertiary actions only.
- Never more than 2 buttons in a row; never two primaries visible together; no gold buttons.

**Navigation** — fixed, 72px, white/92% with `backdrop-blur(12px)` and bottom hairline after 24px scroll (transparent at top of page over hero). Logo left (monoline mark + wordmark; **use a white/inverted logo variant over navy/video heroes** — the supplied logo is pure black). Center links: Programs, NGHI Prep, Outcomes, About, How It Works — 15px/500, text-2, hover → text + 2px gold underline animating width 0→100% (200ms). Right: "Contact" ghost + "Apply Now" primary. Hide-on-scroll-down, reveal-on-scroll-up (translateY, 300ms). Mobile: full-screen navy-950 overlay, links at h2 size, staggered 60ms fade-up, close via X or Esc; body scroll locked.

**Mega menu (Programs only)** — full-width panel under nav, white, top+bottom hairline, 32px padding, opens 250ms fade + 8px slide-down. Two zones: left 3-col list of the 11 programs (name 16px/500 + duration meta 13px text-3, hover row bg mist), right a 320px "Featured" card (image + Next-start-date + ghost link). Closes on Esc/outside click; fully keyboard navigable (arrow keys traverse, focus trapped while open). No other nav item gets a mega menu.

**Cards (base)** — white bg (on mist/white) or navy-800 (on navy), 1px border `line`/`line-dark`, radius 12px, padding 32px, no shadow at rest. Hover (linked cards only): border-color navy-700/30%, translateY(-2px), 200ms. Never nest cards.

- **Program cards:** vertical; top row = program eyebrow ("CERTIFICATION 04") + duration chip; h3 title; 2-line small description (text-2, clamp); bottom row = "AMCA-aligned" caption + ghost arrow link. 3-up grid desktop, 1-up mobile. Entire card is the link.
- **Feature cards (Prep features):** 24×24 stroked line icon (1.5px stroke, navy-900 — icon style must echo the monoline logo; no filled/duotone icons), 16px below → h4 → small text. 3-up. No borders between them on navy sections — separated by `line-dark` hairline grid (1px gaps) instead of floating cards.
- **Testimonial cards:** quote in h4 weight-400 with a 24px gold-500 opening-quote glyph, 24px, then 40px avatar + name (small/600) + role & program (caption text-3). One featured testimonial per page max at large size; others in a 2-up grid. Never a carousel.
- **Stat cards:** numeral in h1 size weight-300 tabular (gold-500 on navy sections, navy-900 on light) + caption label below, left-aligned, separated by vertical hairlines in a 3–4-up row, no boxes. Numbers count up on reveal (§6).

**FAQ accordion** — full-width rows divided by hairlines (no boxes). Row: 20px padding-block, question h5 left, plus-icon right rotating 45° to × (250ms). Panel opens with height-auto animation (Motion/framer-motion, 300ms `easeOutQuart`), answer in body text-2, max 680px. One open at a time. Chevron never used — plus/× only.

**Tabs** — text tabs 15px/500 text-2 in a row, gap 32px, active = text color + 2px gold-500 underline that slides between tabs (layoutId shared element, 250ms). Panel cross-fades 200ms. Use for Prep feature groups and Program curriculum terms. Not for primary navigation.

**Badges** — radius 999px, 12px/600 caps tracking +0.08em, 6px×12px padding. Variants: `neutral` (mist bg, text-2), `navy` (navy-100 bg, navy-900 text), `accent` (transparent, 1px gold-500 border, gold-600 text — reserved for "AMCA Accredited" and "New" on Prep only). Chips (filter pills) same geometry at 14px/500 with selected = navy-900 fill/white text.

**Inputs & forms** — height 52px, radius 8px, white bg, 1px `line` border, 16px text, 16px padding-inline. Label above (small/600), helper/error caption below. Focus: border navy-700 + focus ring. Error: border error + caption error, field never turns red-filled. Forms single-column, 20px field gap, max 560px wide; group headings h5 with 40px above. Submit = primary button full-width on mobile only. Success state = inline confirmation panel (mist, navy-100 left rule), never a modal.

**Callout boxes** — mist bg, radius 12px, 32px padding, 3px navy-900 left rule (gold-500 left rule only for accreditation/financial-aid deadline callouts). Icon optional (line style). Use for deadlines, prerequisites, aid notes; max one per section.

**Section headers** — the three-beat block from §3.2, left-aligned by default; centered only on Home hero, NGHI Prep hero, and final CTA bands. Eyebrow color: text-3 on light, gold-500 on navy (this is gold use (d)).

**Footer** — navy-950. Top: 4-col grid (Programs ×11 in two columns, Institute, NGHI Prep, Contact) links small text-inv-2 hover white. Middle: hairline, then large monoline mark (white, 48px) + AMCA accreditation line + Dallas address + phone. Bottom bar: legal caption text-inv-3, social icons 20px line-style. A slim final-CTA band ("Start your application — Fall 2026 cohort") sits *above* the footer as its own navy-900 section, not inside it.

**Floating UI previews (Prep mockups)** — rendered as real coded components, not screenshots: white (light mode UI), radius 16px, 1px line border, the large soft shadow, browser-chrome-free. May overlap section boundaries by max 64px. Inner UI follows this same design system at 0.85 scale density. Never tilt in 3D beyond 4° and never use perspective glass mockups.

---

## 6. Motion & Animation System

**Philosophy:** motion confirms and reveals; it never performs. If a user notices "an animation" rather than the content, it's too much. Institutional sections stay nearly still; motion budget concentrates on the NGHI Prep product story.

### 6.0 Animation stack (mandatory — this is how Superpower-class sites are actually built)

| Concern | Library | Version | Rules |
|---|---|---|---|
| Smooth scrolling | **Lenis** | `lenis` ^1.x | The scroll feel of the whole site. One instance, mounted in a root client provider. |
| Scroll-driven animation | **GSAP + ScrollTrigger** | `gsap` ^3.13 (all plugins are free) | ALL scroll-linked work: reveals, pins, scrubs, parallax, counters, chart draw-ins. |
| Text splitting | **GSAP SplitText** | bundled with gsap ^3.13 | Hero/headline line-mask reveals. Split by `lines` only — never chars/words (char-stagger reads as template). |
| React integration | **@gsap/react** (`useGSAP`) | ^2.x | Every GSAP call lives inside `useGSAP(() => {...}, { scope: containerRef })` for automatic cleanup — no manual `ScrollTrigger.kill()` bookkeeping, no strict-mode double-fires. |
| UI micro-interactions | **Motion (framer-motion)** | ^12.x | ONLY for component-state animation: accordion height, tab underline `layoutId`, mega-menu open, flashcard flip, hover states. Never for anything scroll-linked. |

**Division of labor is absolute:** if it responds to scroll position → GSAP/ScrollTrigger. If it responds to user interaction or component state → Motion. Never both on one element; never Motion `whileInView` (its viewport triggers fight Lenis and ScrollTrigger's refresh cycle).

**Lenis configuration (exact):**
```ts
const lenis = new Lenis({
  duration: 1.1,                 // gentle glide; >1.4 feels syrupy — banned
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
  smoothWheel: true,
  touchMultiplier: 1.2,
  syncTouch: false,              // native touch scrolling on mobile — do not smooth touch
});
```

**Lenis ↔ ScrollTrigger sync (exact — the canonical pattern, do not improvise):**
```ts
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```
Register once: `gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)`. Call `ScrollTrigger.refresh()` after fonts load (`document.fonts.ready`) and after any accordion/tab height change. On route change (App Router), kill and recreate triggers via `useGSAP` scoping. Anchor links and the skip-link scroll via `lenis.scrollTo(target, { offset: -72 })` (nav height).

### 6.1 Core values

- **Duration scale:** 120ms (micro: hovers, toggles) · 200ms (standard UI) · 350ms (panel/accordion) · 600ms (scroll reveals) · 900ms (hero entrance, choreographed sequences). Nothing exceeds 900ms.
- **Easing:** UI `cubic-bezier(0.4, 0, 0.2, 1)`; reveals & hero `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutQuint-like); exits `cubic-bezier(0.4, 0, 1, 1)`. No bounce, no spring stiffness under 200, no overshoot except the tab underline (allowed 1.02).
- **Scroll reveals (standard `<Reveal>`):** GSAP `gsap.from(el, { autoAlpha: 0, y: 24, duration: 0.6, ease: 'quint.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } })`. Set initial hidden state via a `.gsap-hidden { visibility: hidden }` class in CSS (autoAlpha clears it) so content never flashes and non-JS users still see everything. Never re-animate on scroll-up; never use `toggleActions` replay.
- **Headline reveals (`<RevealLines>`):** SplitText `type: 'lines', mask: 'lines'`, then `gsap.from(split.lines, { yPercent: 110, duration: 0.9, ease: 'quint.out', stagger: 0.08, scrollTrigger: { start: 'top 85%', once: true } })`. Revert the split (`split.revert()`) after completion so selection/AT read normal text. Lines only — chars/words splitting is banned.
- **Stagger:** children 80ms apart (`stagger: 0.08`), max 5 staggered children (beyond 5, animate as one group).
- **Parallax:** max ±6% — `gsap.to(media, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true } })`. Large media only; wrapped in `ScrollTrigger.matchMedia`/`gsap.matchMedia('(min-width: 1024px)')` so it never exists below 1024px. Never parallax text. `scrub: true` (direct), not numeric smoothing — Lenis already smooths.
- **Marquee:** one allowed on the whole site (employer/partner logos on Outcomes): 40s linear loop, pause on hover, duplicated track, grayscale logos at 60% opacity → 100% on hover, masked fade edges 96px.
- **Card hover:** translateY(-2px) + border-color shift, 200ms. No scale on cards.
- **Image zoom:** images inside linked cards scale 1.0→1.04 over 500ms on hover, container overflow-hidden. Nothing else scales.
- **Text reveal:** hero display animates once on load — per-line mask rise, 900ms total, 100ms line stagger, starting 150ms after LCP image begins painting.
- **Counters (`<Counter>`):** GSAP tween of a numeric proxy `{ val: 0 } → target` over 0.9s `quint.out`, rendered with `Math.round` + `toLocaleString`, triggered `start: 'top 85%', once: true`. Percent/plus suffixes are static text, not tweened.
- **Chart draw-ins (Prep analytics):** SVG paths animated via `strokeDashoffset` (measure with `getTotalLength()`), 800ms `quint.out`, bars via `scaleY` from 0 with `transformOrigin: 'bottom'`, both `once: true`.

### 6.2 Choreographed moments (the only three)

1. **Home hero entrance (GSAP timeline, load-triggered, not scroll):** one `gsap.timeline({ defaults: { ease: 'quint.out' } })` — SplitText line-rise (0.9s) → support `autoAlpha` at `-=0.65` → CTA row at `-=0.5` → hero media `autoAlpha 0→1, scale 1.02→1` (0.5s) at `-=0.4`. Starts after `document.fonts.ready` to avoid split reflow.
2. **NGHI Prep pinned scroll (§10) — the single pinned section on the site:**
```ts
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top top',
    end: '+=300%',              // 300vh of scroll distance
    pin: true,
    scrub: true,
    anticipatePin: 1,
    snap: { snapTo: 'labels', duration: 0.35, ease: 'power2.out' },
  },
});
tl.addLabel('tutor')/* state 1 in */ .addLabel('plan')/* cross-fade 0.35 */ .addLabel('ready');
```
   Dashboard stays pinned and centered; left-rail captions cycle and the mockup's inner state swaps (AI Tutor → Study Plan → Readiness) with 0.35 cross-fades on the timeline; right-edge progress dots bind to the same labels. Inside `gsap.matchMedia('(min-width: 1024px)')` only — below 1024px the section renders as three static stacked blocks with standard `<Reveal>`s; no pinning on mobile, ever.
3. **Stacking program values (How It Works):** CSS `position: sticky; top: 96px` does the stacking; one scrubbed ScrollTrigger per card adds `scale: 0.98` + `autoAlpha: 0.6` to the covered card as the next arrives (`scrub: true`). Max 3 cards; plain list on mobile.

**Pin discipline:** exactly one `pin: true` on the entire site (§10). Additional pins are a build failure. All pinned/scrubbed code sits inside `gsap.matchMedia()` blocks with a reduced-motion branch (§11).

**Section transitions:** none — background changes are hard cuts at hairlines. No curtain wipes, no SVG wave dividers, no `scrub`-driven background color morphs.

---

## 7. Image Direction

**Why no generic healthcare stock:** stock actors signal "template clinic," which destroys both premium positioning and trust — visitors pattern-match it instantly to insurance ads. Every image must look like it was shot *at NGHI, of NGHI people*: real labs, real practice mannequins, real students in scrubs mid-task, imperfect and specific.

### 7.1 Subjects
- **Hero imagery:** environmental — training lab hardware, hands performing a clinical skill (drawing a sample, applying a cuff), a student at the Prep dashboard. Never faces smiling at camera in a hero.
- **Clinical/lab:** instruments, close crops, shallow depth; equipment beats architecture.
- **Students:** candid, mid-action, natural expressions; diversity reflecting Dallas; scrubs in muted tones (navy/graphite — avoid teal/ceil stock scrubs where possible).
- **Instructor portraits:** consistent set — 4:5, plain mist or deep-navy seamless background, soft key light 45°, subject at ⅔ frame, no props, no crossed-arms cliché.

### 7.2 Grade & treatment
- **Color grading:** cool shadow tint toward navy (shadows lifted to ~#0A1830 hue), desaturated mids (-15 to -25 sat), highlights kept clean/neutral. Apply a uniform LUT-like CSS fallback: `filter: saturate(0.85) contrast(1.04)` on any un-graded source.
- **Overlay (text-on-image only):** `linear-gradient(180deg, rgb(6 13 26 / 0.15), rgb(6 13 26 / 0.65))` — navy-950 based, never pure black, never colored gradients. Full-bleed media without text gets no overlay.
- **Navy tint usage:** duotone-to-navy treatment permitted for background/atmosphere imagery (footer, section backdrops) at low contrast; never on people's faces.
- **Gold in imagery:** none. Gold exists only in UI, never as a photo filter or colored prop styling.
- **Lighting:** soft, directional, window-like; no on-camera flash look, no HDR crunch.
- **Composition & DoF:** generous negative space on one side (for type), f/2–f/2.8 equivalent shallow depth for detail shots, eye-level or slightly low angles; no dutch tilts, no fisheye.
- **Aspect ratios:** hero media 16:9 (mobile 4:5 art-directed crop via `<picture>`), cards 3:2, portraits 4:5, full-bleed bands 21:9. Fixed per slot — never free-crop.

### 7.3 Consistency requirements
All photography on one page must share the same grade. Mixing warm-graded and cool-graded images on one page is a build failure. Portraits across the faculty grid must share background, crop, and light direction.

### 7.6 Placeholder system (build-time)
Until real assets exist: use solid `navy-100`/`mist` blocks containing a centered 1.5px monoline glyph (from the icon set) + caption of the intended shot (e.g., "PHLEBOTOMY LAB — DETAIL, 3:2"), wrapped in an `<AssetSlot id="home-hero-video">` component keyed by ID so final media drops in without layout shift (all slots have fixed aspect ratios and `sizes` defined).

---

## 8. Video Direction

- **Hero video style:** a single 12–18s seamless loop, ambient not narrative: slow push-in (2–4% scale over the loop) or slow lateral dolly across a training lab / instrument details / hands performing a skill. One scene per loop — no cuts, or at most one hidden match-cut. Graded identically to §7.2.
- **Camera movement:** gimbal-slow only (movement should be barely perceptible); no whip pans, no drone swoops, no speed ramps.
- **Clinical scenes:** same subject rules as photography — equipment and hands over faces.
- **Platform demo clips:** NGHI Prep interactions captured as 6–10s screen recordings at 2× retina, cursor smoothed, trimmed to a single completed action (e.g., AI Tutor answers one question), exported without chrome. Prefer rebuilding these as coded/Framer-Motion sequences over video where feasible (sharper, lighter, themeable).
- **Playback behavior:** `autoplay muted loop playsinline preload="metadata"`, `poster` = first frame (also the LCP fallback image). Pause when off-screen via IntersectionObserver. No sound anywhere on the site — ever. No visible player controls on ambient loops; a subtle pause toggle (bottom-right, 40px, appears on hover/focus) for accessibility.
- **Delivery:** H.265/HEVC + WebM VP9 sources, ≤ 2.5 MB hero loop target at 1080p, `media` attribute to skip video entirely below 768px (serve the poster image instead).
- **Accessibility:** honoring `prefers-reduced-motion` replaces all autoplaying video with its poster; ambient loops carry `aria-hidden="true"` (decorative) with meaningful alt text on the poster slot; demo clips get text descriptions adjacent, not captions burned in.

---

## 9. Page-by-Page Visual Treatment

Background rhythm notation: W = white, M = mist, N = navy-900, N950 = navy-950.

### 9.1 Home — rhythm: W → M → N → W → M → N → W → N(CTA) → N950(footer)
1. **Hero (W):** typography dominates. Centered three-beat block, display-xl headline (e.g., "Train for the career healthcare can't run without."), body-lg support naming Dallas + AMCA, primary "Apply Now" + secondary "Explore Programs". Below, the wide-container hero media: the ambient lab loop, radius 16px. Motion moment №1 (§6.2).
2. **Credibility strip (W, above the fold's edge):** one hairline row — "AMCA Accredited · 11 Certification Programs · Dallas, TX · Job-ready in months" as caption text with gold-500 dot separators. This replaces a logo marquee.
3. **Programs preview (M):** typography + cards. Left-aligned header, 6 of 11 program cards in 3×2, ghost link "All 11 programs →".
4. **NGHI Prep teaser (N):** product UI dominates. Eyebrow gold, white display headline, floating dashboard preview overlapping downward into the next section. Feature-card hairline grid (Tutor/Adaptive Plans/Mock Exams). Deep-link CTA to /prep.
5. **Outcomes band (W):** stat row (placement rate, exam pass rate, weeks-to-certify, cohort size) with counters; one featured student testimonial.
6. **How it works snapshot (M):** 3 sticky stacking cards (Enroll → Train → Certify) — motion moment №3.
7. **Faculty/campus editorial (W):** 21:9 full-bleed graded photo band + short editorial paragraph in text column; imagery dominates.
8. **Final CTA (N) + Footer (N950).**

### 9.2 Programs listing — W → M → W
Inner-page hero (display, left-aligned) + filter chips (duration, modality, field). Then all 11 program cards in a hairline-separated grid on M. Closing callout (aid deadlines) + CTA band. Typography dominates; zero photos except optional 3:2 field imagery inside cards' top slot.

### 9.3 Program detail — W → M → N → W
Hero: two-column — left text (eyebrow "CERTIFICATION PROGRAM", h-display title, meta row of chips: duration · schedule · AMCA · next start), right 4:5 graded photo. Sticky in-page sub-nav (Overview / Curriculum / Outcomes / Tuition / Apply) under main nav. Curriculum as tabbed terms with hairline lesson lists. Prep-inclusion band on N ("Every program includes NGHI Prep") with mini product preview. Outcomes stats, one testimonial from this program, tuition callout, FAQ accordion, CTA. Typography dominates; imagery is one hero shot + one mid-page band.

### 9.4 NGHI Prep — see §10. Rhythm: N950 → N → W → M → N → W(pricing/access) → N(CTA).
The one dark-first page; feels like a SaaS launch page.

### 9.5 About — W → M → W → N
Editorial page: mission statement set huge (h1, weight 300, text column), founding story in two-column prose with pull stat, faculty portrait grid (4:5, uniform), Dallas campus photo band 21:9, AMCA accreditation explainer callout (gold left-rule — its one appearance), leadership list rows with hairlines. Imagery and typography alternate dominance; no product UI.

### 9.6 Outcomes — W → M → N → W
Hero states the thesis in numbers: 4-stat row directly under headline. Employer logo marquee (the site's single marquee). Placement methodology in plain prose (trust through transparency). Graduate stories: 2-up testimonial grid + one video-poster story card. Salary/role table in hairline style. CTA.

### 9.7 Cost & Financial Aid — W → M → W
Calm, no dark sections (money pages must feel plain and honest). Tuition table per program (hairline rows, tabular numerals), "what's included" list, aid options as FAQ-style accordion, payment-plan callout, deadline callout (gold rule), contact-an-advisor form block. Typography only; zero decorative imagery.

### 9.8 How It Works — M → W → N → W
Numbered journey 01–05 (Apply → Enroll → Train → Prep → Certify) as alternating two-column rows, sticky number rail on desktop; the numbers are the only oversized display elements. Prep step gets a small floating UI preview. Ends with requirements checklist + CTA.

### 9.9 Contact / Apply — W → M
Split layout: left column — h1 + campus address, phone, hours, map embed styled with navy monochrome tiles; right column — the application/contact form per §5 forms. Confirmation inline. Footer immediately after; no CTA band (the page *is* the CTA).

---

## 10. NGHI Prep Product Showcase (SaaS-launch treatment)

This page carries the site's motion budget and must feel closest to Superpower's product storytelling: dark, cinematic, product-first, but restrained.

**Build the product UI as real coded components** (design system at 0.85 density, light-mode UI on dark page) — never image screenshots:

1. **Hero (N950):** centered eyebrow "NGHI PREP" (gold), display headline ("Study like the exam is already yours."), support line, single primary CTA. Beneath, the **Certification Readiness Dashboard** mockup rising 24px into view: sidebar (program, modules), main panel with readiness score ring (gold-500 stroke on navy track), streak, next-task list, mini progress chart (line, navy-700 grid, gold data line).
2. **Pinned scroll sequence (N, 300vh)** — motion moment №2: dashboard stays centered; left rail cycles three captions with the mockup swapping inner state: **AI Tutor** (chat preview: student bubble mist/right, tutor bubble white/left with cited source chip, typing indicator 3-dot 120ms pulse) → **Adaptive Study Plan** (week calendar UI, tasks re-ordering with layout animation as "adaptation" demo) → **Readiness** (score counting 61→84, ring animating).
3. **Feature grid (W):** the remaining features — MCQs, Flashcards, Mock Exams, Video Lessons, Audio Lessons, Progress Tracking, Community — as the hairline feature-card grid, line icons, three per row. The **Flashcard UI** appears as a small inline interactive: one card that flips on click (rotateY 350ms, only 3D allowed on the site).
4. **Mock exam band (M):** timed-exam UI strip (question, options as radio cards, timer chip) + copy on exam realism; a single stat ("2,400+ practice questions").
5. **Analytics section (N):** two analytics cards — mastery-by-topic bar chart, pass-probability trend — charts drawn with animated stroke draw-in (800ms) on reveal, gold used for the single key series only.
6. **Device context (W):** one composed frame — laptop + phone flat front-facing renders (CSS device frames, no perspective) showing dashboard + audio-lesson player, proving cross-device without a "mockup collage."
7. **Community + access (W → N CTA):** community described in one editorial block (no fake chat screenshots), then access model ("Included with every NGHI program") and CTA.

**Scroll choreography rule:** each Prep section completes its animation within the first 40% of its viewport intersection so users never wait for content. Every animated demo has a static final state that is fully informative.

---

## 11. Accessibility & Performance Rules

- **WCAG 2.2 AA** across the site. Contrast per §2.2; focus visible per §5; all interactions keyboard-operable (mega menu, tabs, accordion, flashcard flip via Enter/Space).
- Semantic landmarks (`header/nav/main/section/footer`), one `h1` per page, logical heading order, skip-to-content link.
- **Reduced motion:** `prefers-reduced-motion: reduce` ⇒ all reveals render in final state, counters show final numbers, videos show posters, pinned sections become static stacks, marquee stops. Implement globally: GSAP work branches inside `gsap.matchMedia()` with a `(prefers-reduced-motion: reduce)` condition (elements render in final state, triggers not created); Lenis is not instantiated at all under reduced motion (native scroll); Motion components gate via `useReducedMotion`. All handled inside the shared motion primitives, not per-component ad-hoc.
- Touch targets ≥ 44×44px; form fields labeled and described via `aria-describedby`; error announcements `aria-live="polite"`.
- **Performance budgets (mobile, mid-tier device, Lighthouse):** LCP ≤ 2.5s, CLS < 0.05, INP < 200ms, JS shipped to client ≤ 180KB gz on marketing pages. Score targets ≥ 95 performance / 100 accessibility.
- Images: `next/image`, AVIF/WebP, explicit `sizes`, priority only on hero LCP element; below-fold media lazy. Fonts: `next/font` self-host, swap, subset latin.
- Animate only `transform`/`opacity` (`autoAlpha`); `will-change` managed by GSAP defaults, not set manually in CSS; all scroll work runs through the single Lenis→ScrollTrigger rAF pipeline (§6.0) — zero raw `scroll`/`wheel` listeners anywhere; SplitText reverted after animation; `ScrollTrigger.refresh()` debounced on resize (built-in) and fired once after `document.fonts.ready`; no layout-thrashing measurements in render.
- Video per §8 delivery rules; posters count as the LCP candidate on /prep.

---

## 12. Implementation Constraints

- **Stack:** Next.js 16 (App Router, RSC where possible; motion components as client leaves), TypeScript `strict: true` (no `any`), Tailwind CSS v4 (tokens via `@theme` exactly as §2.1; spacing/typography as custom utilities), and the animation stack from §6.0: `lenis`, `gsap` ^3.13 + ScrollTrigger + SplitText, `@gsap/react` (`useGSAP`), `motion` (framer-motion) for UI state only.
- **Architecture:** `/components/ui` (Button, Badge, Chip, Input, Card, Accordion, Tabs, SectionHeader, AssetSlot, Container), `/components/blocks` (Hero, StatRow, ProgramGrid, PrepShowcase, TestimonialBlock, CTABand, Footer, Nav, MegaMenu), `/components/prep-ui` (DashboardMock, TutorChat, StudyPlan, Flashcard, ExamStrip, Charts). Blocks compose ui; pages compose blocks. Every component typed props, no prop drilling past two levels (context for nav state).
- Content (programs, stats, testimonials, FAQs) lives in typed data modules (`/content/*.ts`) — zero copy hard-coded inside components.
- **No inline styles** (GSAP/Motion may set transforms imperatively at runtime — that is not an inline-style violation; authored `style={{...}}` props for static styling are). No arbitrary Tailwind values where a token exists. **No gradients** except the two sanctioned overlays (§7.2 image overlay; a subtle navy-950→navy-900 section blend on /prep hero is permitted once). **No glassmorphism**, no neon, no `backdrop-blur` outside the nav bar.
- Motion primitives: build `<SmoothScrollProvider>` (Lenis + ScrollTrigger sync from §6.0), `<Reveal>`, `<RevealLines>`, `<Counter>`, `<Parallax>`, and the `usePinnedTimeline` hook once in `/components/motion`, all on `useGSAP` with scoped cleanup; feature components must use these — raw `gsap.*` calls outside `/components/motion` and `/components/prep-ui` charts are forbidden, so timing stays uniform site-wide.
- Anti-template rule: before finishing any section, compare it against the banned hero/section patterns in §1; if the structure matches a generic template silhouette, restructure using this system's editorial patterns (hairline grids, three-beat headers, index lists).

---

## 13. Copy Voice (quick reference for placeholder copy)

Plain, concrete, second person. Sentences under 20 words. Numbers over adjectives ("Certify in 12 weeks" not "Fast-track your future"). Banned words: revolutionary, cutting-edge, world-class, unleash, empower, journey (as noun), seamless. Every CTA names the action: "Apply Now," "Explore Programs," "See NGHI Prep," "Talk to Admissions."

---

## 14. Definition of Done (acceptance checklist)

**Design fidelity**
- [ ] Only spacing values from §4 appear anywhere.
- [ ] Max one gold element per viewport, in a §2.2-sanctioned role; zero gold on white body text.
- [ ] Every section uses the three-beat header; no section has 4+ type levels.
- [ ] All radii from the 8/12/16/999 scale; shadows only the two permitted values.
- [ ] Backgrounds follow each page's stated rhythm; hard cuts, no dividers.
- [ ] Icons are 1.5px monoline throughout; no filled or duotone icons.
- [ ] Nav, mega menu, accordion, tabs, forms match §5 states exactly, including focus rings.

**Motion**
- [ ] Only three choreographed moments exist (Home hero, Prep pinned, sticky stack); everything else is standard reveals.
- [ ] Exactly one Lenis instance and exactly one `pin: true` on the entire site; Lenis↔ScrollTrigger synced via the §6.0 pattern; zero raw scroll/wheel listeners.
- [ ] All scroll-linked animation is GSAP/ScrollTrigger; Motion appears only in state-driven UI (no `whileInView` anywhere in the codebase).
- [ ] SplitText splits by lines only and reverts after completion; `ScrollTrigger.refresh()` fires after fonts load and accordion/tab toggles.
- [ ] All durations/easings from §6.1; reveals fire once; reduced-motion path verified (no Lenis, triggers not created, final states rendered).
- [ ] Pinned section degrades to static stacks < 1024px; touch scrolling stays native (`syncTouch: false`).

**Trust & content**
- [ ] AMCA accreditation appears in hero support, credibility strip, About callout, and footer.
- [ ] All 11 programs present in listing, mega menu, and footer.
- [ ] No stock-photo look: every AssetSlot has a §7-compliant description; no smiling-at-camera heroes.

**Quality gates**
- [ ] Lighthouse ≥ 95 perf / 100 a11y mobile; CLS < 0.05; keyboard walkthrough of every page completed.
- [ ] TypeScript strict passes; zero inline styles; tokens only.
- [ ] Site reviewed at 360px, 768px, 1024px, 1440px, 1920px.

Build the complete site to this specification.
