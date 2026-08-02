# Implementation Prompt — NextGen Health Institute Website Rebuild

*Standalone brief for an AI coding agent. Self-contained: no other document is required to execute this.*

---

## PROJECT BRIEF: NextGen Health Institute — Full Website Rebuild

### 1. Objective

Build a complete, production-ready marketing website for **NextGen Health Institute (NGHI)**, an AMCA-accredited healthcare career-training school in Dallas, Texas, and an authorized Pearson VUE testing site. It offers 11 certification programs lasting 6–24 weeks. The current site (https://nghi-omega.vercel.app/) is being replaced because it contains contradictory contact information, placeholder content, a server-empty Contact page, emoji-based icons, and no design system.

The new site's single business goal is **qualified lead generation**: requests for information and completed applications from prospective students in Dallas–Fort Worth.

### 2. Goals (in priority order)

1. Convert visitors into "Request Info" leads and applications.
2. Establish legitimacy immediately (accreditation, outcomes, real people, one consistent address).
3. Make program discovery and evaluation effortless on mobile.
4. Rank for local allied-health training searches.
5. Load fast and be fully accessible.

### 3. Brand requirements

- **Voice:** encouraging, plain-spoken, specific. Always prefer a concrete fact to a superlative. "Classes start March 3. 95% of graduates find employment." Never "We Can Do This!" or unfinished quotes.
- **Audience:** adult career-changers, 20–45, often working, often on a phone, budget-conscious, anxious about legitimacy and cost.
- **Non-negotiable:** one canonical address, phone, and email across the entire site, sourced from `content/site.ts`. Never hard-code contact details or program durations in components.
- **Zero placeholder content.** If real content is unavailable, use clearly-marked realistic sample data in the content files — never in JSX.

### 4. Visual style & design language

Light, warm-clinical, editorial. Off-white backgrounds, deep teal primary, warm coral accent, generous whitespace, real photography with a consistent warm-duotone treatment, confident serif display headlines against a clean grotesque body face. Quiet, purposeful motion. No emoji anywhere in the UI.

**Design tokens (implement exactly, as CSS variables consumed by Tailwind):**

```css
--color-primary-50:#EFF7F7;  --color-primary-100:#D6ECEC; --color-primary-200:#A9D8D9;
--color-primary-300:#74BEC0; --color-primary-400:#429FA3; --color-primary-500:#1E7F86;
--color-primary-600:#14646C; --color-primary-700:#0F4E56; --color-primary-800:#0B3B42;
--color-primary-900:#072A30;
--color-accent-50:#FFF3EF;   --color-accent-100:#FFE1D6;  --color-accent-300:#FFAE92;
--color-accent-500:#F97A54;  --color-accent-600:#E05F39;  --color-accent-700:#B84829;
--color-neutral-0:#FFFFFF;   --color-neutral-25:#FBFAF8;  --color-neutral-50:#F5F4F1;
--color-neutral-100:#ECEAE6; --color-neutral-200:#DCD9D3; --color-neutral-300:#BFBBB3;
--color-neutral-400:#97928A; --color-neutral-500:#6E6963; --color-neutral-600:#524E49;
--color-neutral-700:#3A3733; --color-neutral-800:#262421; --color-neutral-900:#17150F;
--color-bg:#FBFAF8; --color-surface:#FFFFFF; --color-surface-alt:#F5F4F1; --color-surface-dark:#0B3B42;
--color-success:#1E8A5F; --color-warning:#B7791F; --color-error:#C0392B; --color-info:#1E7F86;
--radius-sm:6px; --radius-md:10px; --radius-lg:16px; --radius-xl:24px; --radius-2xl:32px;
--shadow-sm:0 2px 8px rgba(23,21,15,.06);
--shadow-md:0 8px 24px rgba(23,21,15,.08);
--shadow-lg:0 16px 48px rgba(23,21,15,.10);
--ease-out-expo:cubic-bezier(0.16,1,0.3,1);
```

**Typography:** Display = Fraunces (600); Body/UI = Inter Tight (400/500/600); numerals tabular for stats. Load with `next/font/google`, `display:swap`. Max prose measure 68ch. Fluid scale:

| Token | Size | Weight | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `display-xl` | clamp(2.75rem, 6vw, 4.5rem) | 600 | 1.05 | -0.02em | Homepage H1 |
| `display-lg` | clamp(2.25rem, 4.5vw, 3.25rem) | 600 | 1.1 | -0.02em | Page H1 |
| `h2` | clamp(1.75rem, 3vw, 2.5rem) | 600 | 1.15 | -0.01em | Section titles |
| `h3` | clamp(1.25rem, 2vw, 1.5rem) | 600 | 1.25 | -0.01em | Card/feature titles |
| `h4` | 1.125rem | 600 | 1.3 | 0 | Sub-headings |
| `body-lg` | 1.125rem | 400 | 1.65 | 0 | Lead paragraphs |
| `body` | 1rem | 400 | 1.65 | 0 | Default |
| `body-sm` | 0.875rem | 400 | 1.55 | 0 | Meta, captions |
| `eyebrow` | 0.8125rem | 600 | 1.2 | 0.08em, uppercase | Section labels |
| `stat` | clamp(2.5rem, 5vw, 4rem) | 700 | 1 | -0.03em | Count-ups |

**Spacing:** 4px base scale; sections `py-16` mobile / `py-24` tablet / `py-32` desktop; container max-width 1280px with `px-5 md:px-8 lg:px-10`; prose container 760px.

### 5. Technical stack (required)

Next.js 15 App Router · TypeScript strict · Tailwind CSS v4 · Framer Motion · lucide-react · react-hook-form + zod · next/font · next/image. No other UI libraries. No CSS-in-JS.

### 6. Folder structure (build exactly this)

```
app/{layout,page,globals.css,sitemap.ts,robots.ts,not-found.tsx,error.tsx}
app/programs/{page.tsx,[slug]/page.tsx}
app/admissions/{page.tsx,apply/page.tsx,financial-aid/page.tsx}
app/{about,students,faq,contact,privacy,terms}/page.tsx
app/api/lead/route.ts
components/ui/          Button Input Select Textarea Checkbox Badge Card Accordion Tabs
                        Modal Sheet Table Toast Skeleton EmptyState Breadcrumbs
components/layout/      Header MegaMenu MobileDrawer Footer AnnouncementBar SkipLink StickyMobileCTA
components/sections/    Hero StatsBand ProgramFinder FeatureRow Timeline Accreditation
                        TestimonialMarquee LogoMarquee CTABand FAQSection Gallery TeamGrid
components/forms/       RequestInfoForm MultiStepApplication ContactForm FormField
components/motion/      Reveal CountUp Marquee MotionProvider
content/                programs.ts site.ts dates.ts testimonials.ts faqs.ts team.ts partners.ts
lib/                    utils.ts seo.ts schema.ts validation.ts
hooks/                  useMediaQuery.ts useScrollPosition.ts useReducedMotion.ts
types/index.ts
public/images/{hero,programs,campus,team,partners}/  public/logos/  public/og/
```

### 7. Content data model (build first, before any page)

```ts
// content/site.ts — THE single source of truth for contact info
export const site = {
  name: 'NextGen Health Institute',
  shortName: 'NGHI',
  tagline: 'Accredited healthcare career training in Dallas–Fort Worth',
  address: { street: '9319 Lyndon B Johnson Fwy, Suite 207', city: 'Dallas',
             state: 'TX', zip: '75243', country: 'US' },
  phone: '(214) 601-3361', phoneHref: 'tel:+12146013361',
  email: 'admissions@nextgenhealthinstitute.com',
  hours: [...], socials: {...},
  accreditation: [{ name: 'AMCA', logo: '/logos/amca.png', description: '...' },
                  { name: 'Pearson VUE', logo: '/logos/pearson.png', description: '...' }],
  founded: 1992,
} as const;

// content/programs.ts
export type Program = {
  slug: string; name: string; shortName: string;
  category: 'clinical' | 'administrative' | 'specialized';
  duration: string; durationWeeks: [number, number];
  format: 'in-person' | 'hybrid' | 'online' | 'flexible';
  credential: string; blurb: string; description: string[];
  heroImage: string; cardImage: string;
  curriculum: { module: string; outcomes: string[] }[];
  hours: { classroom: number; lab: number; externship: number };
  certification: { exam: string; body: string; onCampus: boolean };
  outlook: { employmentRate: string; salaryRange: string; growth: string;
             environments: string[]; source?: string };
  tuition?: { amount?: number; note: string; includes: string[] };
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
};
```

Populate all 11 programs: `ekg-technician`, `medical-administrative-assistant`, `medical-assistant`, `medical-billing-coding`, `mental-health-technician`, `mri-technician`, `nursing-assistant`, `orthopedic-casting`, `patient-care-technician`, `phlebotomy-technician`, `physical-therapy-aide`. Durations and formats must match the existing catalog exactly (EKG 8–12wk hybrid; MAAC 8–16wk hybrid; MA 12wk FT / 24wk PT hybrid; Billing & Coding 12–20wk online/hybrid/in-person; PTTC 8–12wk hybrid; MHTC 8–16wk hybrid; MRI 16–24wk hybrid; NAC 8–12wk hybrid; Orthopedic Casting 2wk in-person; PCTC 12–16wk hybrid; Phlebotomy 6–10wk hybrid). **Every program dropdown, related-program card, and form select must derive from this file** — no separate hard-coded lists.

### 8. Page-by-page implementation order

1. `content/*` + tokens + `ui/` primitives + `/styleguide` route
2. Layout shell (Header, MegaMenu, MobileDrawer, Footer, AnnouncementBar, SkipLink)
3. Homepage (all 12 sections, in the order given in §9 below)
4. `/programs` listing with client-side filtering
5. `/programs/[slug]` template (SSG via `generateStaticParams`)
6. `/admissions`, `/admissions/financial-aid`
7. `/admissions/apply` (4-step form)
8. `/about`, `/students`, `/faq`
9. `/contact` (**must be server-rendered**; supports `?type=info|apply` and `?program=slug` prefill)
10. `/privacy`, `/terms`, `not-found`, `error`
11. `api/lead` route, SEO/schema, sitemap, robots
12. Animation pass, then performance and a11y audits

### 9. Section specifications

Build every page with exactly these sections, in this order.

**Homepage `/`**
1. Announcement bar — next class-start date from `content/dates.ts` + "Apply Now", dismissible.
2. Header — Logo | Programs (mega dropdown, 11 programs grouped Clinical/Administrative/Specialized) | Admissions | About | Students | Contact | [Apply Now]. Transparent over hero, solid + backdrop-blur after 80px scroll.
3. Hero — eyebrow, H1 "Start your healthcare career in months, not years", two-line subhead, CTAs ("View Programs" primary / "Talk to Admissions" secondary), **trust badge row directly beneath the CTAs** (AMCA, Pearson VUE, "Since 1992"), and a duotone film-strip marquee of six campus photos.
4. Stats band — four count-ups: `95%+ employment rate`, `6–24 weeks to certified`, `11 programs`, `30+ years`. Footnote line for data provenance.
5. Program finder — filter chips (All / Clinical / Administrative / Specialized) + card grid of all 11 programs (name, duration, format, blurb, "Learn more"). Client-side filtering, no reload.
6. Three alternating feature rows (image left/right): Experienced faculty · Small classes & hands-on labs · Flexible day/evening/weekend scheduling. Each: eyebrow, H3, ~40-word paragraph, text link.
7. Certification timeline — 5 steps: Apply → Meet an advisor → Classroom + lab → Clinical externship → Certification exam & job placement. Horizontal desktop, vertical mobile.
8. Accreditation — AMCA + Pearson panels, each explaining what it means *for the student*.
9. Testimonial marquee — two rows, opposite directions, photo + full quote + program + year.
10. Partner logo marquee — externship/employer logos, grayscale → color on hover.
11. Lead-capture band — three-step reassurance beside `RequestInfoForm`.
12. Footer.

**Programs `/programs`** — breadcrumb → page hero → sticky filter bar (category chips, duration range, format, sort) → results count → 11 program cards → advisor CTA band → FAQ teaser (3 questions) → footer.

**Program detail `/programs/[slug]`** — breadcrumb → hero (category eyebrow, H1, value line, fact chips for duration/format/credential/next start, two CTAs, duotone photo background) → **sticky sidebar `RequestInfoForm` pre-filled with this program (desktop) / sticky bottom bar (mobile)** → overview (two paragraphs) → curriculum written as real learning outcomes, not noun fragments ("Perform venipuncture using vacuum-tube and butterfly techniques") → how the program runs (classroom/lab/externship hours table) → certification (exam, body, on-campus Pearson VUE) → career outlook (count-up stats, employer-type chips, placement services, sourced footnotes) → tuition & financial aid → start dates table with per-row Apply link → program FAQ accordion + `FAQPage` JSON-LD → related programs from `relatedSlugs` → CTA band → footer.

**Admissions `/admissions`** — breadcrumb → hero → 3-step process timeline with expandable steps → requirements checklist (age, ID, education, health screening, background check) → start dates table → tuition & aid summary → payment options → advisor CTA with real photo + phone + "Book a 15-minute call" → campus tour module → FAQ accordion → footer.

**Apply `/admissions/apply`** — minimal header (logo + phone only, no full nav) → progress indicator → 4 steps: (1) About you, (2) Program & start date, (3) Schedule preference, (4) Contact & consent → review → success page stating what happens within 48 hours.

**Financial aid `/admissions/financial-aid`** — hero → what it costs (per-program table or cost-sheet request) → what's included (tuition, books, scrubs, exam fee) → aid options (federal aid, scholarships, payment plans, employer sponsorship, WIOA/workforce grants) → 4-step "how to apply for aid" → advisor CTA → FAQ → footer.

**About `/about`** — hero (mission, since 1992) → our story → mission & values (5 values, each with a real sentence) → **instructors grid** (photo, name, credentials, one-line bio) → accreditation summary (short — do not duplicate the homepage block) → campus photo grid with captions → single canonical location block with map embed → careers CTA → footer.

**Students `/students`** (merges the old Student Life + Testimonials pages) — hero → outcomes stats → graduate story cards (photo, full quote, program, employer, year) filterable by program → campus life masonry gallery with lightbox → student support services → alumni employer logo wall → CTA → footer.

**FAQ `/faq`** — hero → client-side search/filter input → grouped accordions (Admissions · Programs · Cost & Aid · Certification · Campus & Schedule) → "Still have questions?" CTA → `FAQPage` JSON-LD → footer. Questions must be deep-linkable by anchor.

**Contact `/contact`** — **must be server-rendered.** Hero → two columns: `ContactForm` | contact card (canonical address, `tel:` phone, email, office hours) → lazy-loaded Google Map with static placeholder → "Prefer to talk now?" call band → directions/parking → footer. Supports `?type=info|apply` and `?program=slug` prefill.

**Legal `/privacy`, `/terms`** — prose layout, 70ch measure, desktop table of contents, last-updated date.

### 10. Coding standards

TypeScript strict, no `any`. Server Components by default; `'use client'` only where interactivity demands it. Named exports for components, one component per file, PascalCase files. Props typed with explicit interfaces. Tailwind utility classes with a `cn()` merge helper; no inline style objects except for dynamic transforms. No magic numbers — use tokens. ESLint + Prettier clean. Conventional commits. Every component that renders content must accept it via props or import from `content/` — never inline copy inside `components/ui/`.

### 11. Responsiveness requirements

Mobile-first. Breakpoints: 375 (design baseline), 640, 768, 1024, 1280, 1440. Every section must be verified at 375px, 768px, 1024px, and 1440px. Tap targets ≥44×44px. Inputs ≥16px font. Sticky mobile CTA bar on program, admissions, and apply pages, appearing after the hero exits the viewport. Multi-column layouts collapse to single column below 768px; tables convert to stacked cards; horizontal timelines become vertical; footer columns become accordions below 640px. No horizontal overflow at any width.

### 12. Accessibility requirements (WCAG 2.2 AA — non-negotiable)

Semantic landmarks (`header`, `nav`, `main`, `footer`); skip-to-content link as the first focusable element; exactly one `h1` per page with no skipped heading levels; visible focus ring (`3px rgba(66,159,163,.35)`) on every interactive element; all contrast ≥4.5:1 (≥3:1 for text ≥24px); every input has a `<label>`, errors linked via `aria-describedby` and announced; accordions, tabs, modals, and carousels follow WAI-ARIA APG (proper `aria-expanded`, `aria-controls`, focus trapping, Escape to close); marquees pause on hover and focus and are keyboard-reachable; descriptive `alt` on content images, `alt=""` on decorative; **all motion wrapped by a `prefers-reduced-motion` check** via `components/motion/MotionProvider`; no information conveyed by color alone; `lang="en"` set. Site must pass axe with zero violations and be fully operable by keyboard alone.

### 13. Performance requirements

LCP < 2.5s on simulated 4G · CLS < 0.1 · INP < 200ms · homepage JS < 180KB gzip · Lighthouse ≥ 95 in Performance, Accessibility, Best Practices, SEO. All images via `next/image` with explicit `sizes`, AVIF/WebP, `priority` on the hero image only, blur placeholders on photography — **never request an image more than 2× its rendered slot width** (the old site requested 3840px for card thumbnails; do not repeat this). Fonts self-hosted via `next/font` with `display:swap`, maximum two families. All marketing pages statically generated. `next/dynamic` for the lightbox, map embed, and multi-step application. Lazy-load below-fold marquees and galleries. Animate only `transform` and `opacity`.

### 14. Animation requirements

Principles: motion clarifies, never decorates. Durations 150–400ms (page-load sequences up to 700ms). Easing `cubic-bezier(0.16,1,0.3,1)` for entrances, `ease-out` for hovers. Animate only `transform` and `opacity`. Framer Motion for orchestration, plain CSS for marquees and hovers.

| Animation | Where | Spec |
|---|---|---|
| Hero entrance | All heroes | Staggered fade-up (y 16px → 0), 60ms stagger, 500ms each, on mount |
| Photo marquee | Home hero, gallery | CSS `translateX` loop 40–60s, pause on hover/focus |
| Scroll reveal | Every section | `whileInView` fade-up 20px, 400ms, `once: true`, 15% margin — one per section, never per element |
| Count-up | Stats bands | 1.6s ease-out from 0, once at 40% visibility, final value present in DOM for screen readers |
| Card hover | Program/team/testimonial | `translateY(-4px)` + shadow-sm→md + image `scale(1.03)`, 200ms |
| Button hover | Global | Background shift + `translateY(-1px)`, 150ms |
| Filter re-flow | Programs grid | Framer `layout` + 30ms stagger fade |
| Accordion | FAQ, curriculum | Height transition 220ms + chevron 180° rotate |
| Timeline draw | Process sections | Progress line `scaleX`/`scaleY` tied to scroll, desktop only |
| Tab indicator | Tabs | Shared-layout slide, 250ms |
| Sticky header | Global | Background/blur/shadow fade-in at 80px scroll |
| Sticky mobile CTA | Program/admissions/apply | Slide-up 250ms when hero exits viewport |
| Form error | All forms | Border/color change + 200ms subtle shake |
| Form success | All forms | 500ms check-path draw |
| Page transition | Route changes | 200ms opacity fade only — no slide |
| Skeleton | Async content | Shimmer 1.4s, neutral-100 → neutral-50 |
| Lightbox | Galleries | Scale 0.96→1 + backdrop fade, 250ms, focus trapped |

Under `prefers-reduced-motion: reduce`, every entry above degrades to instant or opacity-only, and all marquees become static grids.

### 15. SEO requirements

Unique `generateMetadata` per route — no duplicated title suffixes. Canonical URLs. OG + Twitter cards with per-page images. JSON-LD from `lib/schema.ts`: `EducationalOrganization` + `LocalBusiness` in the root layout (using `content/site.ts`), `Course` on each program page, `FAQPage` on `/faq` and on program pages with FAQs, `BreadcrumbList` on all inner pages. `app/sitemap.ts` generated from `content/programs.ts`. `app/robots.ts`. 301 redirects from old paths (`/student-life` → `/students`, `/testimonials` → `/students`). Consistent NAP everywhere from `content/site.ts`. Descriptive internal linking from FAQ answers to program pages. All content server-rendered.

### 16. Reusable component requirements

Build this full inventory. Each component needs the listed variants plus default/hover/focus-visible/disabled states where applicable, and must handle loading, error, and empty states where relevant.

| Component | Variants |
|---|---|
| AnnouncementBar | info, urgent, dismissible |
| Header | transparent-over-hero, solid, sticky |
| MegaMenu | 3-column grouped, simple list; accordion inside mobile drawer |
| MobileDrawer | full-screen |
| Hero | home (with marquee), page (compact), program (image background) |
| TrustBadgeRow | inline, stacked |
| Button | primary, secondary, ghost, link, danger × sm/md/lg × icon-left/right; loading state |
| ProgramCard | grid, compact, related, featured |
| FeatureRow | image-left, image-right, video |
| StatCounter | large, inline, with-footnote |
| Timeline | horizontal, vertical, expandable-steps |
| TestimonialCard | quote-only, with-photo, featured |
| TestimonialMarquee | single-row, dual-row-opposed; pauses on hover/focus |
| LogoMarquee | grayscale, color-on-hover |
| AccreditationPanel | side-by-side, stacked |
| FilterChips | single-select, multi-select |
| Accordion | single-open, multi-open, bordered, plain |
| Tabs | underline, pill; converts to accordion below 640px |
| RequestInfoForm | full, compact-sidebar, inline-band |
| MultiStepApplication | 4-step with per-step validation |
| FormField (Input/Select/Textarea/Checkbox) | with-label, with-helper, with-error |
| Breadcrumbs | default, truncated-on-mobile |
| Badge / Tag | solid, soft, outline × success/warning/neutral |
| Gallery + Lightbox | masonry, uniform grid |
| Table (DataList) | striped, bordered; stacked cards below 768px |
| Modal / Sheet | centered modal (desktop), bottom sheet (mobile) |
| TeamCard | photo-top, photo-side, hover-bio-reveal |
| CTABand | dark, tinted, image-background |
| StickyMobileCTA | call+form, apply-only |
| Footer | full; columns → accordion below 640px |
| SkipLink, EmptyState, Toast, Skeleton | single variant each |

Architecture rules: `components/ui/` primitives are content-agnostic and typed with explicit variant props; `components/sections/` compose primitives and receive content via props; forms share one `FormField` wrapper; **all motion behavior lives in `components/motion/` so reduced-motion handling exists in exactly one place**. Ship a `/styleguide` route rendering every component in every variant and state.

### 17. Best practices

Data-driven everything (see §7). No emoji in UI — use `lucide-react`. No lorem ipsum, no truncated quotes, no unfinished sections. Forms: honeypot + server-side rate limiting + zod validation on both client and server; TCPA consent checkbox required with its exact legal text; success state replaces the form in place and states what happens next. Handle API failures with a visible, actionable error message. Test the full keyboard path through every form and menu before considering a page complete.

### 18. Acceptance criteria

The build is complete when **all** of the following are true:

- [ ] All 20+ routes render with server-side content, including `/contact`.
- [ ] Contact details, program names, durations, formats, and start dates appear identically everywhere and originate from `content/site.ts` and `content/programs.ts`. Zero contradictions anywhere on the site.
- [ ] All 11 program pages are statically generated from `content/programs.ts` with unique metadata and `Course` JSON-LD.
- [ ] Every form validates client- and server-side, submits to `/api/lead`, shows a success state, and includes the TCPA consent checkbox.
- [ ] Program selects everywhere list exactly the 11 catalog programs, derived from the shared data file.
- [ ] Lighthouse ≥ 95 in all four categories on `/`, `/programs`, and a program detail page (mobile emulation).
- [ ] LCP < 2.5s, CLS < 0.1, INP < 200ms on the homepage.
- [ ] axe reports zero violations on every page; full keyboard operability verified; screen-reader pass on the homepage and one form.
- [ ] No horizontal scroll at 375, 768, 1024, 1280, or 1440px.
- [ ] `prefers-reduced-motion: reduce` disables or neutralizes every animation, and marquees become static.
- [ ] Zero emoji, zero placeholder text, zero empty accordions, zero `any` types, zero ESLint errors.
- [ ] `sitemap.xml` and `robots.txt` are generated; Rich Results Test validates the Organization, Course, and FAQ schemas.
- [ ] `/styleguide` renders every component in every documented variant and state.
- [ ] Sticky mobile CTA appears on program, admissions, and apply pages after the hero exits the viewport.
- [ ] 301 redirects exist for all changed URLs.
