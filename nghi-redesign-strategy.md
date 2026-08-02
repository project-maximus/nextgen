# NextGen Health Institute — Website Redesign Strategy & AI Implementation Prompt

**Prepared by:** Senior Solution Architect / UI-UX Consultant / Technical Lead
**Client site audited:** https://nghi-omega.vercel.app/
**Inspiration sites audited:** schoolai.com · 2hourlearning.com · recraft.ai
**Date:** July 2026

---

# Phase 1 — Analysis of the Existing Website

## 1.1 What the site is

NextGen Health Institute (NGHI) is a healthcare career-training school in Dallas, TX, accredited by AMCA and an authorized Pearson VUE testing site. It offers eleven short-form certification programs (6–24 weeks): Medical Assistant, CNA, Phlebotomy, EKG Technician, Medical Billing & Coding, Medical Administrative Assistant, Mental Health Technician, MRI, Patient Care Technician, Physical Therapy Aide, and Orthopedic Casting. The site is built with **Next.js** (evidence: `/_next/image` optimizer URLs, hashed static assets) and deployed on Vercel.

## 1.2 Page inventory & sitemap (as discovered)

```
/                                   Homepage
/programs                           Program listing (11 programs)
/programs/[slug]                    Program detail ×11 (ekg-technician, medical-assistant,
                                    medical-administrative-assistant, medical-billing-coding,
                                    mental-health-technician, mri-technician, nursing-assistant,
                                    orthopedic-casting, patient-care-technician,
                                    phlebotomy-technician, physical-therapy-aide)
/admissions                         Admissions overview + multi-step "Get Started" wizard
/admissions/application             Application form (primary CTA target)
/admissions/financial-aid           Financial aid (linked, not audited in depth)
/admissions/requirements            Requirements (linked from About "Read More")
/about                              About Us
/contact                            Contact (⚠ renders EMPTY without client-side JS)
/student-life                       Linked in footer only — orphan/likely thin
/testimonials                       Linked in footer only — orphan/likely thin
/faq                                Linked in footer only — orphan/likely thin
/privacy, /terms                    Legal
```

**Navigation structure:** Topbar announcement ("Next Class Starts…" + Apply Now) → Header: Logo | Programs (dropdown) | Admissions (dropdown) | About Us | Contact | Apply Now button. Footer: brand blurb + accreditation badges, Quick Links, Contact Info, legal links.

## 1.3 Content hierarchy per page (current)

**Homepage:** Hero (H1 + subhead + 2 CTAs + 6-image collage) → "Find Your Program" (4 featured cards + View All) → "Why NextGen" (4 value props) → "Healthcare Career Training Programs" (checklist + single truncated testimonial "SJ / Sarah Johnson") → Accreditation & Testing Partners (AMCA + Pearson + Quality/Convenience/Recognition trio) → "Top Reasons to Work in Healthcare" (3 items) → "Ready to Learn More?" (3-step process + lead form with consent text) → Footer.

**Programs:** Page hero → 11 program cards (title, blurb, duration, format, Learn More + Request Info) → CTA band → Footer.

**Program detail (Medical Assistant sampled):** Hero with 95%+ employment stat + duration + CTAs + inline mini lead form → "Now Enrolling" intro + 3 emoji feature tiles → Curriculum ("core learning objectives" that are actually noun phrases, not objectives) + Program Information sidebar → Career Outlook (stats, salary range, environments, placement services) → Financial Aid (emoji tiles) → FAQ (4 accordion headings with no visible content in the rendered output) → Related programs (⚠ with durations that contradict the listing page: "9-month," "3-month," "8-month") → CTA → Footer.

**Admissions:** Hero + CTAs → benefits checklist → multi-step "Get Started" wizard (Location → Program → Next) → "Healthcare Career Focused" / "Financial Aid" panels → "Dedicated Student Support" + 2 quotes → cluttered "Connect with Admissions / Career Path" section with filler copy ("Plan Your Success!", "We Can Do This!") → Scholarships / Campus Tour tiles → CTA band → Footer.

**About:** Hero (since 1992, Fort Worth area) → 4 pillars → Accreditation (duplicated verbatim from homepage) → Mission + quote → What We Believe + 3 values → Core Values (5 bare headings, no copy) → **Campus Support Center listing an Orlando, FL headquarters address** → Careers / Student Resources / Partnerships tiles → CTA band → Footer.

**Contact:** ⚠ Only header + footer render in server HTML. The form is entirely client-rendered — invisible to crawlers, broken with JS disabled or failed.

## 1.4 Forms, CTAs, media, icons

- **Forms:** Homepage lead form (program select + consent), program-detail mini form, admissions multi-step wizard, application form, contact form (client-only). Program option lists are **inconsistent** between the homepage form (10 options incl. "MRI Technologist"), the wizard (5 options), and the actual 11-program catalog.
- **CTAs:** "Apply Now," "Request Information," "Learn More," "View Programs," "Get Started," "Schedule a Tour," "Connect with Admissions" — at least 7 verbal variants competing with each other, diluting the conversion path.
- **Images:** Real campus photography in the hero collage (good raw material) but requested at oversized widths (`w=3840` for card images); mixed file-extension casing (`4.JPG`, `6.JPG`) suggesting unprocessed uploads; **two different logo asset hashes** across pages (logo.d50888f2.png vs logo.e0b3be47.png).
- **Videos:** None.
- **Icons:** Raw emoji characters (📍 📞 ✉️ 🏥 🎓 💰 📚 💼 🏫) used as UI icons — inconsistent rendering across OSes, unprofessional, poor accessibility.
- **Header/Footer:** Functional but generic; footer contact info conflicts with topbar/homepage info.

## 1.5 Weak UX areas

1. **Broken conversion surface:** the Contact page — the destination of most CTAs via `/contact?type=…` query params — has no server-rendered content.
2. **Trust-killing inconsistencies:** three different addresses (2727 LBJ Ste 1057 Dallas / 9319 LBJ Fwy Suite 207 Dallas / 5402 Curry Ford Rd Orlando FL), two class-start dates ("July 15, 2026" vs "September 15"), contradictory program durations between listing and related-program cards, "Dallas" vs "greater Fort Worth area" copy. For a school asking students to hand over tuition, this is the single most damaging issue.
3. **Placeholder-grade content shipped to production:** truncated testimonial ("This program changed my life..."), raw slug shown as a role ("medical-assistant"), filler copy ("We Can Do This!"), empty FAQ accordions, bare Core Values headings.
4. **No pricing or transparent cost info** — the #1 question for career-school prospects; the FAQ heading exists but is empty.
5. **Orphan pages** (Student Life, Testimonials, FAQ) reachable only from the footer.
6. **Redundant sections** (accreditation block duplicated verbatim on Home and About) and no clear narrative order on Admissions.
7. **CTA overload without hierarchy** — everything shouts, nothing leads.

## 1.6 Weak UI areas

- No coherent design system: emoji icons, inconsistent card paddings, at least three heading treatments, mixed badge styles.
- Flat visual hierarchy; sections blend together with similar white backgrounds and equal-weight typography.
- Stock-photo-forward hero collage with no art direction or treatment.
- No motion language at all — the site feels static and dated next to competitors.
- Generic system-font look; no typographic personality.

## 1.7 Performance issues

- Card thumbnails requested at `w=3840` (4K) for ~400px render slots.
- Two logo variants shipped (duplicate bytes, cache misses).
- Un-normalized image sources (`.JPG` originals).
- Client-only rendering on key pages (Contact) delays LCP and blocks indexing.

## 1.8 Accessibility issues

- Emoji as functional icons (screen readers announce "hospital emoji" etc.).
- Empty accordion buttons (FAQ) — interactive elements with no discernible content.
- Multi-step wizard with no visible progress semantics.
- Consent text and form labels visually small; label association unverified.
- No skip-to-content link (SchoolAI has one — worth copying).
- Color contrast unaudited but the pattern of light-gray-on-white body text is present.

## 1.9 SEO structure

- **Good:** descriptive titles/meta on Home, Programs, Admissions, Contact; OG/Twitter cards; localized keywords ("Dallas TX").
- **Bad:** duplicated title patterns ("… | NextGen Health Institute | NextGen Health Institute"); About and program-detail pages fall back to the generic default title/description; no visible structured data (Course, EducationalOrganization, FAQPage, LocalBusiness schemas are all obvious wins here); Contact content invisible to crawlers; no breadcrumbs; orphan pages dilute crawl equity; conflicting NAP (Name-Address-Phone) data actively harms local SEO.

## 1.10 Missing features

Tuition/pricing information · class-start calendar with real dates per program · program comparison tool · outcomes/graduate stories with photos and full quotes · staff/instructor profiles · campus photo/video tour · blog or career-resources hub (SEO engine) · Spanish-language support (large demographic for Dallas allied-health students) · sticky mobile apply bar · live chat or SMS option · Google Maps embed with the ONE correct address · sitemap.xml/robots verification.

## 1.11 Keep / Redesign / Remove / Add

| Decision | Items |
|---|---|
| **Keep** | Overall IA skeleton (Home → Programs → Program detail → Admissions → Apply); the 11-program catalog and its metadata (duration/format); real campus photography as raw material; AMCA + Pearson accreditation as central trust assets; the 3-step "Apply → Advisor → Start" narrative; topbar class-start announcement concept; lead-capture forms with TCPA consent language. |
| **Redesign** | Every visual surface (new design system); homepage narrative order; program detail template (make it the conversion workhorse); admissions page (currently the messiest page); all forms (unify into one multi-step lead flow); header (add resources), footer (single source of truth for contact data); Contact page (server-rendered). |
| **Remove** | Emoji icons; duplicated accreditation block (keep once on Home, summarize on About); filler copy ("We Can Do This!" etc.); Orlando HQ address (or clearly label it corporate vs campus); truncated placeholder testimonial; contradictory related-program duration copy. |
| **Add** | Tuition transparency section or "cost & aid" page; real testimonials with photos; instructor profiles; outcomes stats section (2HL-style); FAQ content (real answers + FAQPage schema); breadcrumbs; structured data across the board; sticky mobile CTA; Student Life / Testimonials / FAQ as first-class nav destinations or consolidate them; Spanish toggle (phase 2 optional); Google Maps embed; program comparison strip. |

---

# Phase 2 — Analysis of the Inspiration Websites

## 2.1 SchoolAI (schoolai.com) — the closest strategic match

**Design language:** Warm, editorial, human-first EdTech. Generous whitespace, soft rounded imagery, a distinctive **stippled/engraved illustration system** (frog, astronaut, Colosseum, art supplies) that makes the brand instantly recognizable, paired with real product screenshots.

**Notable patterns and why they work:**

- **Announcement banner above the header** (Summer Camp registration). Creates urgency without cluttering the hero. → *Adapt directly:* NGHI's "Next Class Starts July 15 — Apply Now" belongs here; the client already half-does this. Reuse, but make dates data-driven so they can never go stale/conflict again.
- **Audience-segmented hero CTAs** ("I'm a teacher" / "I'm a leader"). Routes two personas without a decision tax. → *Adapt:* NGHI has two personas too — "I want a healthcare career" (student) and "I'm exploring for someone else / employer partnerships." Minimum viable adaptation: "View Programs" + "Talk to Admissions."
- **Trust badges pinned directly under the hero CTA** (FERPA, COPPA, SOC 2, ESSA). Compliance-heavy audiences need proof before scrolling. → *Adapt directly:* AMCA + Pearson badges (plus any state licensure) belong in the hero, not buried in section five. This is the single highest-leverage pattern to borrow.
- **Testimonial marquee** — an auto-scrolling dual-row carousel mixing personas (teachers, students, principals) with photos. Feels alive and abundant. → *Adapt:* mix graduates + employers + instructors. Requires collecting 8–10 real quotes with photos first.
- **Logo wall marquee** (36 school districts). Social proof at scale. → *Adapt:* clinical externship partners and employers who hire NGHI grads. Even 8 logos beats zero.
- **Alternating feature sections** (label eyebrow → H2 → short paragraph → "Learn more" + large screenshot/video, alternating left/right). Predictable rhythm, easy scanning. → *Adapt:* use for "Why NGHI" pillars with real classroom/lab photos instead of screenshots.
- **Research/evidence cards with big stat callouts** (28% / 2x / 23K+). Numbers carry the section; prose supports. → *Adapt:* NGHI's 95%+ employment rate, weeks-to-career, graduate counts, years operating (since 1992).
- **"Built on trust" values grid** — four principle statements with one-line proofs. → *Adapt:* accreditation, small class sizes, job placement, flexible scheduling as principled commitments, not feature bullets.
- **Mega footer with grouped columns + a personality sign-off** ("There's a Space for that"). → *Adapt:* grouped footer + a warm sign-off line.
- **Skip-to-content link** — copy this, period.

**What NOT to copy:** SchoolAI's stippled-illustration identity is *theirs*. NGHI should get a parallel move — an ownable image treatment (see Phase 3) — not the same illustrations.

## 2.2 2 Hour Learning (2hourlearning.com) — narrative & stats storytelling

**Design language:** Bold, provocative, conviction-led. Full-bleed background video hero, oversized declarative headlines ("School is broken, and we're here to fix it"), huge stat blocks, a founder-as-face-of-brand section.

**Notable patterns:**

- **Provocative question-led hero** ("What if children could crush academics in 2 hours?"). Emotional hook before features. → *Adapt reinterpreted:* NGHI's existing headline "Start Your Healthcare Career in Months, Not Years" already has this DNA — sharpen it and give it 2HL-scale typographic confidence.
- **"Here's what a day looks like" split narrative** (Morning / Afternoon). Concretizes an abstract promise. → *Adapt:* "Your 12 weeks at NGHI" — Classroom → Lab → Clinical externship → Certification exam → Job placement. A horizontal timeline is more honest for NGHI than a day split.
- **Giant results stats** (2x faster / 6.5x growth / Top 1–2%) with one-line explanations and a source footnote. → *Adapt:* 95%+ employment, 30+ years, 11 programs, program-length stats — with animated count-up on scroll and honest footnotes.
- **Founder/mission quote section** with portrait. Puts a human face on an institution. → *Adapt:* director or lead-instructor quote; schools sell trust in people.
- **Background video in hero.** → *Adapt cautiously:* only if the client can shoot 10–15s of real lab footage; otherwise a Ken-Burns photo treatment. Never autoplay with sound; always poster + `prefers-reduced-motion` fallback.
- **What NOT to copy:** the cookie-banner clutter, duplicated nav blocks, and the wall-of-text density on mobile. Also avoid its aggressive "school is broken" negativity — NGHI's tone should be aspirational, not adversarial.

## 2.3 Recraft (recraft.ai) — craft, motion, and confidence

**Design language:** Dark, high-craft, image-led. Lowercase display headlines ("tastefully crafted ai image models"), full-bleed image marquees, masonry showcase grids, smooth infinite carousels, minimal chrome that lets imagery breathe.

**Notable patterns:**

- **Full-bleed edge-to-edge image carousel as hero.** Product *is* the imagery. → *Adapt:* NGHI's hero collage of real students becomes a slow, elegant film-strip marquee (grayscale-to-color or duotone treatment) rather than a static grid.
- **Feature sections captioned like gallery cards** (image + one-line caption: "Art direction baked into every scene"). → *Adapt:* Student Life gallery: photo + one-line caption ("Hands-on phlebotomy lab," "Graduation day, Spring cohort").
- **Distinctive typographic voice** (lowercase, oversized display). → *Adapt the lesson, not the letterform:* NGHI needs one strongly characterful display face used with restraint — but title-case and warm, since the audience is career-changers, not designers.
- **Masonry mood grid** (the pink custom-styles wall) — variety inside a controlled palette. → *Adapt:* a duotone-treated campus photo wall on About/Student Life.
- **Testimonial marquee with role labels in small caps.** → merges with SchoolAI's pattern; use one implementation.
- **What NOT to copy:** the dark theme (wrong emotional register for healthcare education — needs light, clean, clinical-but-warm), the heavy DOM duplication for marquee loops (implement with CSS `animation` + a single duplicated track, `prefers-reduced-motion` aware), and the motion *quantity* — borrow the motion *quality* (easing, subtlety) only.

## 2.4 Synthesis — the reinterpretation rule

The new NGHI site = **SchoolAI's warmth + trust architecture** × **2HL's outcome-stat conviction** × **Recraft's craft and motion polish**, expressed through NGHI's own assets: real students, real labs, real credentials, real Dallas. Nothing is copied 1:1; every borrowed pattern is re-expressed in NGHI's palette, typography, photo treatment, and voice.

---

# Phase 3 — Website Redesign Strategy

## 3.1 Design philosophy

**"Proof over promises, people over stock."** Every section must either (a) prove something verifiable (accreditation, stats, real quotes, real dates, one real address) or (b) move the visitor one step toward applying. The prospective student — often a working adult on a phone, deciding whether to invest money and 8–24 weeks — is anxious about legitimacy and cost. The design's job is to convert anxiety into confidence.

## 3.2 Visual direction

- **Light, warm-clinical aesthetic:** off-white backgrounds, deep teal/navy primary (medical trust), a warm coral/amber accent (human energy), abundant whitespace.
- **Signature image treatment (the ownable move):** all photography passes through a consistent **duotone/warm-tint treatment with soft-radius masking**, so even mixed-quality campus photos read as one brand — NGHI's answer to SchoolAI's stipple illustrations.
- **Confident editorial typography:** one characterful display serif or humanist display for headlines, a clean grotesque for UI/body.
- **Motion:** quiet, physical, purposeful — scroll reveals, count-ups, marquees; never gratuitous.

## 3.3 Brand identity improvements

Single logo asset; codified palette and type; icon system (Lucide, stroke-consistent) replacing emoji; voice guide: *encouraging, plain-spoken, specific* ("Classes start March 3. Tuition from $X. 95% of grads employed.") — never vague hype; **one canonical NAP** (campus address, phone, email) stored in one config file and rendered everywhere from it.

## 3.4 UX improvements & user journey

Primary journey: **Land → Trust (badges, stats) → Find program (filterable catalog) → Evaluate (program detail with cost, dates, outcomes) → Act (Request Info or Apply) → Confirm (advisor follow-up expectations set).**
Key mechanics: one unified lead-capture flow (single source of truth for program lists); persistent-but-polite CTAs (sticky mobile bar with "Request Info"); program detail becomes the conversion workhorse (sticky sidebar form on desktop, sticky bottom bar on mobile); Admissions rebuilt as a linear "How to enroll in 3 steps + dates + cost + aid" page; FAQ populated with real answers and surfaced contextually on program pages.

## 3.5 Information architecture (proposed)

```
Home
Programs
 └─ [11 program detail pages]
Admissions
 ├─ How to Apply (steps, dates, requirements)
 ├─ Tuition & Financial Aid
 └─ Apply (application form)
About
 ├─ Our Story & Mission
 ├─ Instructors (new)
 └─ Accreditation
Student Life  (gallery + testimonials merged here as "Students & Outcomes")
FAQ
Contact  (server-rendered!)
Legal: Privacy · Terms
```

Nav: Programs (dropdown listing all 11, grouped Clinical / Administrative / Specialized) · Admissions · About · Students · Contact · **[Apply Now]**. Breadcrumbs on all inner pages.

## 3.6 Mobile-first strategy

Design at 375px first. Sticky bottom CTA bar (Call · Request Info) on program/admissions pages; accordion-first dense content; tap targets ≥44px; hero images art-directed for portrait crops; forms one-field-per-row with large inputs and native selects.

## 3.7 Accessibility improvements

WCAG 2.2 AA target: semantic landmarks, skip link, one H1 per page, visible focus rings, 4.5:1 contrast minimums, labeled form controls with error messaging via `aria-describedby`, accessible accordion/tabs/carousel patterns (WAI-ARIA APG), `prefers-reduced-motion` honored globally, alt text policy (descriptive for content images, empty for decorative), no information conveyed by color alone.

## 3.8 SEO improvements

Per-page unique titles/descriptions (fix the duplicated "| NGHI | NGHI" pattern); JSON-LD: `EducationalOrganization` + `LocalBusiness` (site-wide), `Course` (each program), `FAQPage` (FAQ + program FAQs), `BreadcrumbList`; consistent NAP everywhere; server-rendered content on ALL pages including Contact; `sitemap.xml` + `robots.txt`; canonical URLs; internal linking from FAQ/blog-style content to program pages; local landing copy ("Dallas–Fort Worth") used consistently.

## 3.9 Performance improvements

Correctly sized responsive images (`sizes` attribute discipline — no more `w=3840` thumbnails); AVIF/WebP; hero image `priority`; fonts via `next/font` (self-hosted, `display: swap`, 2 families max); static generation (SSG/ISR) for every marketing page; route-level code splitting; lazy-load below-fold media and marquees; zero third-party scripts beyond analytics; budget: LCP < 2.5s on 4G, CLS < 0.1, INP < 200ms, Lighthouse ≥ 95 across the board.

---

# Phase 4 — Page-by-Page Blueprint

Global rules for every page: server-rendered content, breadcrumbs on inner pages, one `<h1>`, sticky mobile CTA bar on conversion pages, footer NAP from a single config source, scroll-reveal animations capped at one per section.

---

## 4.1 Homepage `/`

**Purpose.** Convert a cold visitor — usually a career-changer on a phone — from "is this school legitimate?" to "which program fits me?" in under 30 seconds of scroll.

**Sections, in order:**

1. **Announcement bar.** Data-driven next class-start date + "Apply Now". Dismissible (stores dismissal in React state for the session only). Never hard-coded — reads from `content/dates.ts`.
2. **Header.** Logo | Programs (mega dropdown) | Admissions | About | Students | Contact | [Apply Now]. Transparent over hero on desktop, solidifies with backdrop blur after 80px scroll.
3. **Hero.** Eyebrow ("Accredited healthcare training in Dallas–Fort Worth") → H1 ("Start your healthcare career in months, not years") → 2-line subhead → two CTAs ("View Programs" primary / "Talk to Admissions" secondary) → **trust badge row directly beneath the CTAs** (AMCA, Pearson VUE, "Since 1992") → right side / below on mobile: duotone-treated film-strip marquee of six real campus photos, slow horizontal drift.
4. **Outcome stats band.** Four count-up figures: `95%+ employment rate` · `6–24 weeks to certified` · `11 programs` · `30+ years training Texans`. Footnote line for data provenance.
5. **Program finder.** Filter chips (All / Clinical / Administrative / Specialized) + card grid of all 11 programs (title, duration, format, one-line blurb, "Learn more"). Client-side filtering, no page reload. "Compare programs" secondary link.
6. **Why NGHI — alternating feature rows** (3 rows, image left/right alternating): Experienced faculty · Small classes & hands-on labs · Flexible day/evening/weekend scheduling. Each: eyebrow, H3, 40-word paragraph, text link.
7. **Path to certification timeline.** Horizontal 5-step timeline (Apply → Meet an advisor → Classroom + lab → Clinical externship → Certification exam & job placement). Scroll-driven progress line on desktop; vertical stack on mobile.
8. **Accreditation.** AMCA + Pearson panels with logos and one-sentence explanations of what each means *for the student* ("You can sit your certification exam on campus").
9. **Testimonial marquee.** Two rows, opposite directions, real graduate photos + full quotes + program + year. Pauses on hover/focus.
10. **Employer / externship partner logo wall.** Marquee, grayscale → color on hover.
11. **Lead-capture CTA band.** Three-step reassurance ("Apply online · Meet an advisor · Start learning") beside the RequestInfo form (name, email, phone, program select, TCPA consent). Program list imported from the single program data source.
12. **Footer.**

**Components used:** AnnouncementBar, Header, MegaMenu, Hero, TrustBadgeRow, PhotoMarquee, StatCounter, FilterChips, ProgramCard, FeatureRow, Timeline, AccreditationPanel, TestimonialMarquee, LogoMarquee, RequestInfoForm, Footer.

**Interactions.** Hero: staggered fade-up (eyebrow → H1 → sub → CTAs → badges, 60ms stagger), marquee starts after paint. Stats: count-up triggered at 40% viewport, once only. Cards: 4px lift + shadow deepen + image scale 1.03 on hover, 200ms `ease-out`. Filter chips: layout animation on grid re-flow. Timeline: line draws on scroll (desktop only). Marquees: CSS keyframe translate, pause on hover, disabled under `prefers-reduced-motion` (becomes a static grid). Form: inline validation on blur, button spinner on submit, success state replaces form in place.

**Responsive.** Desktop ≥1280: hero split 55/45, program grid 3-up, feature rows side-by-side, timeline horizontal. Tablet 768–1279: hero stacks with marquee full-width below, grid 2-up, feature rows stack with image first, timeline horizontal-scroll. Mobile <768: single column everywhere, hero marquee becomes a 3-photo scroller, stats 2×2, timeline vertical with left rail, sticky bottom CTA bar appears after the hero leaves the viewport.

---

## 4.2 Programs listing `/programs`

**Purpose.** Let a visitor find the right program fast and hand off to the detail page.

**Sections.** Breadcrumb → page hero (H1 + one-paragraph intro) → sticky filter/sort bar (category chips, duration range, format: in-person/hybrid/online, sort by duration) → results count → program card grid (all 11) → "Not sure which program?" advisor-CTA band → FAQ teaser (3 most common questions, links to `/faq`) → footer.

**Components.** Breadcrumbs, PageHero, FilterBar, ProgramCard, EmptyState, CTABand, FAQAccordion (preview mode).

**Content per card.** Program name, category badge, duration, format, 20-word description, credential earned, "Learn more" + "Request info".

**Interactions.** Filter chips animate the grid with staggered fade (respecting reduced motion); sticky filter bar shadows on scroll; empty state when filters exclude everything, with a "Clear filters" button.

**Responsive.** 3-up → 2-up → 1-up. Filter bar becomes a horizontally scrollable chip row on mobile with a "Filters" sheet for duration/format.

---

## 4.3 Program detail `/programs/[slug]` — the conversion workhorse

**Purpose.** Answer every objection (What will I learn? How long? What will it cost? Will I get a job? Can I afford it?) and capture the lead.

**Sections.**
1. Breadcrumb.
2. **Hero:** category eyebrow, H1 (program name), one-sentence value line, key-fact chips (duration, format, credential, next start date), two CTAs. Background: duotone program photo.
3. **Sticky sidebar (desktop) / sticky bottom bar (mobile):** compact RequestInfo form pre-filled with this program + phone link.
4. **Overview:** two-paragraph plain-language description of the role and the day-to-day work.
5. **What you'll learn:** curriculum modules as an accordion or checklist grid — rewritten as real learning outcomes ("Perform venipuncture using vacuum-tube and butterfly techniques"), not noun fragments.
6. **How the program runs:** classroom hours, lab hours, externship hours, schedule options — a small definition table.
7. **Certification:** which exam, which body, that it can be taken on campus (Pearson VUE).
8. **Career outlook:** stat trio (employment rate, salary range, growth), employer-type chips, job-placement services list. Sources footnoted (BLS where applicable).
9. **Tuition & financial aid:** transparent cost or an honest "Request a cost sheet" module, plus aid options.
10. **Upcoming start dates:** table of cohort dates with an Apply link per row.
11. **Program FAQ:** 5–8 real Q&As (accordion) + `FAQPage` JSON-LD.
12. **Related programs:** 3 cards, durations pulled from the shared data source so they can never contradict the listing again.
13. Final CTA band → footer.

**Interactions.** Sticky sidebar with scroll-spy section nav on desktop; accordions with height transition and rotating chevron; stat count-ups; table rows highlight on hover; sticky mobile bar with Call + Request Info.

**Responsive.** Desktop: 2-column (content 8 / sidebar 4). Tablet: single column, form moved after the overview and repeated at the end. Mobile: single column, sticky bottom bar, all long content in accordions.

---

## 4.4 Admissions `/admissions`

**Purpose.** Remove procedural uncertainty and push to Apply.

**Sections.** Breadcrumb → hero ("Enrolling is simpler than you think") → **3-step process timeline** with expandable detail per step → requirements checklist (age, ID, education, health screening, background check) → upcoming start dates table → tuition & financial aid summary with link → payment options → advisor CTA (photo of a real advisor + phone + "Book a 15-minute call") → campus tour module → FAQ accordion → footer.

**Removed from current site:** the "Career Path instant access" block, filler exclamations, duplicated forms, and the location/program wizard (replaced by one consistent RequestInfo form).

**Interactions.** Step cards expand in place; checklist items animate a check-draw on scroll; dates table filterable by program.

**Responsive.** Timeline horizontal → vertical; tables become stacked definition cards on mobile.

---

## 4.5 Apply `/admissions/apply`

**Purpose.** Complete the application without abandonment.

**Sections.** Minimal header (logo + phone, no full nav — reduce exits) → progress indicator → multi-step form: (1) About you, (2) Program & start date, (3) Schedule preference, (4) Contact & consent → review step → success page with clear "what happens next in 48 hours" expectations.

**Interactions.** Step transitions slide horizontally (fade under reduced motion); per-step validation; progress bar fills; back/forward preserve state in React state; success animation (single, restrained checkmark draw).

**Responsive.** Single column always; large inputs; numeric/email/tel keyboards via `inputMode`; sticky "Continue" button on mobile.

---

## 4.6 Tuition & Financial Aid `/admissions/financial-aid`

**Purpose.** Answer the money question honestly — the biggest missing piece today.

**Sections.** Hero → "What it costs" (per-program cost table or cost-sheet request) → what's included (tuition, books, scrubs, exam fee) → aid options (federal aid if eligible, scholarships, payment plans, employer sponsorship, WIOA/workforce grants) → 4-step "How to apply for aid" → advisor CTA → FAQ → footer.

---

## 4.7 About `/about`

**Purpose.** Establish institutional legitimacy and human warmth.

**Sections.** Hero (mission statement, since-1992) → our story (short narrative, no lorem, no contradictions) → mission & values (5 values each with one real sentence — fix the current bare headings) → **Instructors grid (new)**: photo, name, credentials, one-line bio → accreditation summary (short, links to detail — no duplicate of the homepage block) → campus & facilities photo grid with captions → single canonical location block with map embed → careers CTA → footer.

**Interactions.** Team cards flip/reveal bio on hover (desktop) or tap (mobile); photo grid opens a lightbox.

---

## 4.8 Students & Outcomes `/students` (merges Student Life + Testimonials)

**Purpose.** Show proof of life and proof of results.

**Sections.** Hero → outcomes stats → graduate story cards (photo, full quote, program, current employer, year) with filter by program → campus life photo gallery (masonry, captioned, lightbox) → student support services → alumni employer logo wall → CTA → footer.

---

## 4.9 FAQ `/faq`

**Purpose.** Deflect admissions calls and win long-tail search.

**Sections.** Hero → search/filter input → grouped accordions (Admissions · Programs · Cost & Aid · Certification · Campus & Schedule) → "Still have questions?" contact CTA → `FAQPage` JSON-LD → footer.

**Interactions.** Client-side text filter; deep-linkable question anchors; one-open-at-a-time within a group.

---

## 4.10 Contact `/contact` — must be server-rendered

**Purpose.** Fix the current fatal gap.

**Sections.** Hero → two-column: contact form (with `?type=` and `?program=` query-param prefill preserved from the current site) | contact details card (single canonical address, phone with `tel:`, email, office hours) → Google Map embed → "Prefer to talk now?" call band → directions/parking notes → footer.

**Interactions.** Prefill from query params on mount; inline validation; success state in place; map lazy-loaded with a static placeholder until interaction.

---

## 4.11 Legal `/privacy`, `/terms`

Simple prose layout, max 70ch measure, table of contents on desktop, last-updated date.

---

# Phase 5 — Component Library

Each entry: **Purpose · Variants · Reusability · States · Responsive · Animation.**

| Component | Purpose | Variants | States | Responsive | Animation |
|---|---|---|---|---|---|
| **AnnouncementBar** | Urgency + next start date | info, urgent, dismissible | default, dismissed | Truncates to date + CTA on mobile | Slide-down on mount |
| **Header** | Global nav | transparent-over-hero, solid, sticky | default, scrolled, menu-open | Hamburger + full-screen drawer <1024 | Backdrop-blur fade at 80px |
| **MegaMenu** | Program discovery from nav | 3-column grouped, simple list | closed, open, item-hover | Becomes accordion inside mobile drawer | Fade + 8px rise, 180ms |
| **Hero** | Page thesis | home (marquee), page (compact), program (image bg) | default | Stacks; art-directed crops | Staggered fade-up |
| **TrustBadgeRow** | Immediate credibility | inline, stacked | default | Wraps to 2 rows | Fade-in after hero |
| **Button** | All actions | primary, secondary, ghost, link, danger; sm/md/lg; icon-left/right | default, hover, active, focus-visible, loading, disabled | Full-width on mobile in forms | Background + 1px lift, 150ms |
| **ProgramCard** | Program entry point | grid, compact, related, featured | default, hover, focus | 3→2→1 columns | Lift + image scale on hover |
| **FeatureRow** | Alternating value prop | image-left, image-right, video | default | Stacks, image first | Fade-up + parallax on image (subtle) |
| **StatCounter** | Outcome proof | large, inline, with-footnote | idle, counting, complete | 4→2×2→2×2 | Count-up on 40% intersection, once |
| **Timeline** | Process explanation | horizontal, vertical, expandable-steps | step-idle, step-active, step-expanded | Horizontal → vertical <768 | Progress line draws on scroll |
| **TestimonialCard** | Social proof | quote-only, with-photo, featured | default, hover-pause | Fixed width in marquee, full-width stacked | In-marquee drift |
| **TestimonialMarquee** | Abundance of proof | single-row, dual-row-opposed | running, paused | Slower/one row on mobile | CSS translate loop; static grid under reduced-motion |
| **LogoMarquee** | Partner proof | grayscale, color | running, paused | One row on mobile | Same as above; color on hover |
| **AccreditationPanel** | Credential explanation | side-by-side, stacked | default | Stacks <768 | Fade-up |
| **FilterChips** | Catalog filtering | single-select, multi-select | idle, selected, disabled | Horizontal scroll on mobile | Grid re-flow stagger |
| **Accordion / FAQ** | Dense content, SEO | single-open, multi-open, bordered, plain | collapsed, expanded, focus | Full-width | Height + chevron rotate, 220ms |
| **Tabs** | Curriculum/schedule views | underline, pill | idle, active, focus | Converts to accordion <640 | Indicator slide |
| **RequestInfoForm** | Lead capture | full, compact-sidebar, inline-band | idle, validating, error, submitting, success | Single column <768 | Field shake on error (reduced-motion: color only), success check-draw |
| **MultiStepForm** | Application | 4-step | per-step validation states | Sticky continue button | Horizontal slide (fade fallback) |
| **Input / Select / Checkbox / Textarea** | Form primitives | with-label, with-helper, with-error | default, focus, filled, error, disabled | 44px min height | Label float, focus ring |
| **Breadcrumbs** | Orientation + SEO | default | current, link | Truncates middle on mobile | None |
| **Badge / Tag** | Metadata (duration, format, category) | solid, soft, outline; success/warn/neutral | default | — | None |
| **Gallery / Lightbox** | Campus life | masonry, uniform grid | closed, open, loading | 3→2→1 columns | Zoom-in open, keyboard nav |
| **Table (DataList)** | Start dates, tuition | striped, bordered | row-hover | Converts to stacked cards <768 | Row highlight |
| **Modal / Sheet** | Filters, tour booking | centered modal, bottom sheet | closed, open | Sheet on mobile | Scale+fade / slide-up |
| **TeamCard** | Instructor profiles | photo-top, photo-side | default, hover-bio | 4→2→1 | Bio reveal |
| **CTABand** | Section-level conversion | dark, tinted, image-bg | default | Stacks buttons | Fade-up |
| **StickyMobileCTA** | Persistent conversion | call+form, apply-only | hidden, visible | Mobile only | Slide-up after hero exits |
| **Footer** | Global info + links | full | default | Columns → accordion <640 | None |
| **SkipLink** | A11y | — | focus-visible | — | Slides into view on focus |
| **EmptyState** | No filter results | — | default | — | Fade |
| **Toast** | Form feedback | success, error | entering, visible, leaving | Bottom on mobile | Slide + fade |

---

# Phase 6 — Design System

## 6.1 Typography

**Families**
- **Display:** `Fraunces` (variable serif, optical size + soft axis) — warm, humanist, credible; used for H1/H2 only.
- **Body/UI:** `Inter Tight` (or `Inter`) — clean grotesque, excellent at small sizes and in forms.
- **Utility/Data:** `Inter` tabular-nums for stats, dates, and tables.
- Loaded via `next/font/google`, `display: swap`, subset `latin`, max 2 families + 1 weight range each.

**Scale (fluid, `clamp()`)**

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

Max prose measure: 68ch.

## 6.2 Colors

```
Primary   (deep clinical teal)   50 #EFF7F7 · 100 #D6ECEC · 200 #A9D8D9 · 300 #74BEC0
                                 400 #429FA3 · 500 #1E7F86 · 600 #14646C · 700 #0F4E56
                                 800 #0B3B42 · 900 #072A30
Accent    (warm coral)           50 #FFF3EF · 100 #FFE1D6 · 300 #FFAE92 · 500 #F97A54
                                 600 #E05F39 · 700 #B84829
Neutral   (warm gray)            0 #FFFFFF · 25 #FBFAF8 · 50 #F5F4F1 · 100 #ECEAE6
                                 200 #DCD9D3 · 300 #BFBBB3 · 400 #97928A · 500 #6E6963
                                 600 #524E49 · 700 #3A3733 · 800 #262421 · 900 #17150F
Background  #FBFAF8   Surface #FFFFFF   Surface-alt #F5F4F1   Surface-dark #0B3B42
Success  #1E8A5F / bg #E8F5EE      Warning #B7791F / bg #FEF6E7
Error    #C0392B / bg #FDECEA      Info    #1E7F86 / bg #EFF7F7
Focus ring #429FA3 (2px, 2px offset)
```
All text/background pairings must pass 4.5:1 (3:1 for ≥24px text). Never use accent-500 for body text on white.

## 6.3 Spacing, grid, containers

4px base. Tokens: `1=4 · 2=8 · 3=12 · 4=16 · 5=20 · 6=24 · 8=32 · 10=40 · 12=48 · 16=64 · 20=80 · 24=96 · 32=128`.
Section padding: mobile `py-16`, tablet `py-20`, desktop `py-24`–`py-32`.
Containers: `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1440`; content container max **1280px** with `px-5 / px-8 / px-10`; narrow prose container **760px**.
Grid: 12 columns, 24px gutter desktop / 16px mobile.

## 6.4 Radius, shadows, borders

Radius: `sm 6 · md 10 · lg 16 · xl 24 · 2xl 32 · full 9999`. Cards `lg`, buttons `full` (pill) or `md` — pick pill for primary CTAs, `md` everywhere else, and stay consistent.
Shadows (soft, warm-tinted, never pure black):
`xs 0 1px 2px rgba(23,21,15,.05)` · `sm 0 2px 8px rgba(23,21,15,.06)` · `md 0 8px 24px rgba(23,21,15,.08)` · `lg 0 16px 48px rgba(23,21,15,.10)` · `focus 0 0 0 3px rgba(66,159,163,.35)`.
Borders: 1px `neutral-200`; dividers `neutral-100`.

## 6.5 Icons, illustration, imagery

- **Icons:** `lucide-react`, 1.5px stroke, 20/24px, always paired with text or `aria-label`. **Zero emoji in UI.**
- **Illustration:** minimal — abstract line/shape accents in primary-100 as section backgrounds only; no cartoon mascots.
- **Photography:** real students, instructors, labs, Dallas campus. Treatment: warm duotone (primary-800 → accent-100) at 15–25% mix for atmospheric/background use; natural color for faces in testimonials and team cards. Radius `lg`–`xl`. No generic stock handshakes.

## 6.6 Component tokens

**Buttons.** Primary: accent-600 bg / white text / `hover:accent-700` / focus ring. Secondary: white bg, primary-700 text, 1px primary-200 border. Ghost: transparent, primary-700 text. Sizes: sm `h-9 px-4 text-sm` · md `h-11 px-6` · lg `h-13 px-8 text-lg`. Loading: spinner replaces label, width preserved, `aria-busy`.
**Inputs.** `h-12`, radius md, 1px neutral-300 border, white bg, 16px font (prevents iOS zoom), focus: 2px primary-400 ring; error: error border + message with `aria-describedby` + icon.
**Cards.** White surface, radius lg, shadow-sm → shadow-md on hover, 1px neutral-100 border, `p-6`/`p-8`.
**Tables.** Header row `neutral-50` + eyebrow type, 1px row dividers, `py-4` cells, hover `neutral-25`; stacked card layout below 768px.
**Badges.** Soft variant: `primary-50` bg + `primary-700` text; radius full; `px-3 py-1 text-xs font-semibold`.

---

# Phase 7 — Animation Plan

**Principles.** Motion clarifies, never decorates. Durations 150–400ms (page-level sequences up to 700ms). Easing: `cubic-bezier(0.16,1,0.3,1)` for entrances, `ease-out` for hovers. Every animation must be wrapped by a `prefers-reduced-motion` guard that degrades to instant/opacity-only. Animate only `transform` and `opacity`. Library: **Framer Motion** for orchestration + plain CSS for marquees and hovers.

| Animation | Where | Spec |
|---|---|---|
| Hero entrance | All heroes | Staggered fade-up (y: 16px → 0), 60ms stagger, 500ms each, on mount |
| Photo marquee | Home hero, gallery | CSS `translateX` loop, 40–60s, pause on hover/focus; static grid under reduced motion |
| Scroll reveal | Every section | `whileInView` fade-up 20px, 400ms, `once: true`, 15% margin — one per section, never per element |
| Count-up | Stats bands | 1.6s ease-out from 0, triggered once at 40% visibility, `aria-live="polite"` off (final value in DOM for SR) |
| Card hover | Program/team/testimonial | `translateY(-4px)` + shadow-sm→md + image `scale(1.03)`, 200ms |
| Button hover | Global | bg shift + `translateY(-1px)`, 150ms |
| Filter re-flow | Programs grid | Framer `layout` + 30ms stagger fade |
| Accordion | FAQ, curriculum | Height auto-transition 220ms + chevron 180° rotate |
| Timeline draw | Process sections | `scaleX`/`scaleY` on progress line tied to scroll progress, desktop only |
| Tab indicator | Tabs | Shared-layout slide, 250ms |
| Sticky header | Global | Background/blur/shadow fade-in at 80px scroll |
| Sticky mobile CTA | Program/admissions | Slide-up 250ms when hero exits viewport |
| Form feedback | All forms | Error: border/color change + 200ms subtle shake (opacity-only under reduced motion); Success: 500ms check-path draw |
| Page transitions | Route changes | 200ms opacity fade only — no slide, keeps LCP honest |
| Skeletons | Async content | Shimmer at 1.4s, `neutral-100` → `neutral-50` |
| Lightbox | Galleries | Scale 0.96→1 + backdrop fade, 250ms, focus trapped |

---

# Phase 8 — Technical Architecture

**Stack.** Next.js 15 (App Router) · TypeScript strict · Tailwind CSS v4 with design tokens as CSS variables · Framer Motion · `lucide-react` · `react-hook-form` + `zod` · `next/font` · `next/image` · Vercel.

## 8.1 Folder structure

```
/
├─ app/
│  ├─ layout.tsx                  Root layout: fonts, header, footer, skip link, JSON-LD
│  ├─ page.tsx                    Home
│  ├─ globals.css                 Tailwind + token layer
│  ├─ sitemap.ts  robots.ts  not-found.tsx  error.tsx
│  ├─ programs/
│  │  ├─ page.tsx
│  │  └─ [slug]/page.tsx          generateStaticParams + generateMetadata
│  ├─ admissions/
│  │  ├─ page.tsx
│  │  ├─ apply/page.tsx
│  │  └─ financial-aid/page.tsx
│  ├─ about/page.tsx
│  ├─ students/page.tsx
│  ├─ faq/page.tsx
│  ├─ contact/page.tsx
│  ├─ privacy/page.tsx  terms/page.tsx
│  └─ api/lead/route.ts           Server-side lead handler (validation + email/CRM)
├─ components/
│  ├─ ui/            Button, Input, Select, Badge, Card, Accordion, Tabs, Modal, Table, Toast…
│  ├─ layout/        Header, MegaMenu, MobileDrawer, Footer, AnnouncementBar, Breadcrumbs, SkipLink, StickyMobileCTA
│  ├─ sections/      Hero, StatsBand, ProgramFinder, FeatureRow, Timeline, Accreditation,
│  │                 TestimonialMarquee, LogoMarquee, CTABand, FAQSection, Gallery
│  ├─ forms/         RequestInfoForm, MultiStepApplication, ContactForm, FormField
│  └─ motion/        Reveal, CountUp, Marquee, MotionConfigProvider
├─ content/
│  ├─ programs.ts    Single source of truth: 11 programs (slug, name, category, duration,
│  │                 format, credential, blurb, curriculum[], outlook{}, faqs[], startDates[])
│  ├─ site.ts        NAP, phone, email, hours, socials, accreditation  ← ONE canonical source
│  ├─ dates.ts       Cohort start dates
│  ├─ testimonials.ts  faqs.ts  team.ts  partners.ts
├─ lib/              utils.ts, seo.ts (metadata builders), schema.ts (JSON-LD), validation.ts
├─ hooks/            useScrollPosition, useMediaQuery, useReducedMotion, useCountUp
├─ types/            index.ts
└─ public/
   ├─ images/{hero,programs,campus,team,partners}/
   ├─ logos/  icons/  og/
   └─ favicon.ico  site.webmanifest
```

## 8.2 Rules

- **Data discipline:** every program list, duration, date, address, and phone number renders from `content/*`. Hard-coding any of these in a component is a build-review failure — this is what caused the current site's contradictions.
- **Component organization:** `ui/` = presentational primitives with no business logic; `sections/` = composed, content-aware blocks; `forms/` = stateful; `motion/` = wrappers so reduced-motion logic lives in exactly one place.
- **Images:** `next/image` everywhere, AVIF+WebP, explicit `sizes` per breakpoint, `priority` on the hero image only, `placeholder="blur"` for photography, lowercase normalized filenames, no request wider than 2× the render slot.
- **Rendering:** SSG for all marketing pages (`export const dynamic = 'force-static'` where safe), ISR if content moves to a CMS later. Server Components by default; `'use client'` only for forms, filters, marquees, drawer, and motion wrappers.
- **Code splitting:** `next/dynamic` for the lightbox, map embed, and multi-step application. Lazy-load below-fold marquees.
- **SEO:** `generateMetadata` per route; canonical URLs; unique titles (fix the doubled-suffix bug); JSON-LD via `lib/schema.ts` — `EducationalOrganization`, `LocalBusiness`, `Course` per program, `FAQPage`, `BreadcrumbList`; `sitemap.ts` generated from `content/programs.ts`.
- **Accessibility:** semantic HTML first; skip link; focus-visible ring on every interactive element; WAI-ARIA APG patterns for accordion/tabs/modal/carousel; forms fully labelled with `aria-describedby` errors; `MotionConfigProvider` reads `prefers-reduced-motion`; automated axe checks in CI plus manual keyboard and VoiceOver/NVDA passes.
- **Performance budgets:** LCP < 2.5s, CLS < 0.1, INP < 200ms, JS < 180KB gzip on the homepage, Lighthouse ≥ 95 in all four categories.
- **Quality:** TypeScript strict, ESLint + Prettier, conventional commits, Vercel preview per PR, no `any`.

---

# Phase 9 — Development Roadmap

| # | Milestone | Tasks | Dependencies | Deliverables |
|---|---|---|---|---|
| 1 | **Planning & content audit** | Resolve NAP conflict with client; collect real testimonials, tuition figures, cohort dates, instructor bios, FAQ answers; photo shot-list; finalize IA & redirect map from old URLs | Client input | Signed-off sitemap, content inventory, redirect map, one canonical NAP |
| 2 | **Design system** | Tokens (color/type/space/radius/shadow) as CSS variables + Tailwind config; `ui/` primitives; Storybook or a `/styleguide` route; a11y contrast audit | M1 | Token file, primitive library, style guide page |
| 3 | **Core layout** | Header + mega menu + mobile drawer, footer, announcement bar, breadcrumbs, skip link, motion provider, SEO/schema helpers, `content/` data files | M2 | Working shell on every route |
| 4 | **Homepage** | All 12 sections, hero marquee, stats, program finder, testimonial + logo marquees, lead form | M3 | Homepage complete, responsive, Lighthouse-checked |
| 5 | **Programs system** | Listing page + filters; `[slug]` template; 11 program datasets; related-programs logic; sticky sidebar form | M3, M4 | 12 program pages generated from data |
| 6 | **Inner pages** | Admissions, Apply (multi-step), Financial Aid, About, Students, FAQ, Contact (server-rendered), legal | M3 | All routes live |
| 7 | **Forms & integrations** | `api/lead` route, zod validation, spam protection (honeypot + rate limit), email/CRM delivery, success states, analytics events | M4–M6 | End-to-end lead capture with confirmations |
| 8 | **Animation pass** | Reveals, count-ups, marquees, timeline draw, page transitions, reduced-motion audit | M4–M6 | Motion complete, no jank at 60fps |
| 9 | **Responsive & QA** | 375/768/1024/1440 sweep; iOS Safari, Android Chrome, Safari, Firefox, Edge; sticky CTA behavior; form keyboards | M8 | Cross-device sign-off |
| 10 | **SEO & accessibility** | Metadata, JSON-LD, sitemap, robots, redirects from old paths, axe + keyboard + screen-reader passes, alt-text sweep | M6 | WCAG 2.2 AA report, Rich Results validation |
| 11 | **Performance** | Image sizing audit, bundle analysis, font optimization, lazy-loading, Lighthouse ≥95 | M9 | Perf report vs budgets |
| 12 | **Testing & launch** | Content proofread against the audit's contradiction list, link check, form submission tests, analytics verification, deploy, post-launch monitoring | All | Production site + handover doc |

---

# Phase 10 — Final Implementation Prompt for the Coding Agent

> Copy everything below this line into the coding agent as a single brief.

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

**Typography:** Display = Fraunces (600); Body/UI = Inter Tight (400/500/600); numerals tabular for stats. Load with `next/font/google`, `display:swap`. Fluid scale per the table in §6.1 of the strategy doc: display-xl `clamp(2.75rem,6vw,4.5rem)`, h2 `clamp(1.75rem,3vw,2.5rem)`, body `1rem/1.65`, eyebrow `0.8125rem uppercase 0.08em`. Max prose measure 68ch.

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
3. Homepage (12 sections in the order specified in §4.1 of the strategy doc)
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

Build every page's sections exactly as enumerated in Phase 4 of the strategy document, including:
- **Homepage:** announcement bar → hero (with trust badges directly under the CTAs) → stats band (95%+ / 6–24 weeks / 11 programs / 30+ years) → program finder with category filters → 3 alternating feature rows → 5-step certification timeline → accreditation panels → testimonial marquee → partner logo marquee → lead-capture band → footer.
- **Program detail:** hero with fact chips → sticky sidebar RequestInfoForm (desktop) / sticky bottom bar (mobile) → overview → curriculum with real learning outcomes → how the program runs → certification → career outlook with count-up stats → tuition & aid → start dates table → program FAQ accordion → related programs (from `relatedSlugs`) → CTA band.
- **Contact:** form + canonical contact card + lazy-loaded map, all server-rendered.

### 10. Coding standards

TypeScript strict, no `any`. Server Components by default; `'use client'` only where interactivity demands it. Named exports for components, one component per file, PascalCase files. Props typed with explicit interfaces. Tailwind utility classes with a `cn()` merge helper; no inline style objects except for dynamic transforms. No magic numbers — use tokens. ESLint + Prettier clean. Conventional commits. Every component that renders content must accept it via props or import from `content/` — never inline copy inside `components/ui/`.

### 11. Responsiveness requirements

Mobile-first. Breakpoints: 375 (design baseline), 640, 768, 1024, 1280, 1440. Every section must be verified at 375px, 768px, 1024px, and 1440px. Tap targets ≥44×44px. Inputs ≥16px font. Sticky mobile CTA bar on program, admissions, and apply pages, appearing after the hero exits the viewport. Multi-column layouts collapse to single column below 768px; tables convert to stacked cards; horizontal timelines become vertical; footer columns become accordions below 640px. No horizontal overflow at any width.

### 12. Accessibility requirements (WCAG 2.2 AA — non-negotiable)

Semantic landmarks (`header`, `nav`, `main`, `footer`); skip-to-content link as the first focusable element; exactly one `h1` per page with no skipped heading levels; visible focus ring (`3px rgba(66,159,163,.35)`) on every interactive element; all contrast ≥4.5:1 (≥3:1 for text ≥24px); every input has a `<label>`, errors linked via `aria-describedby` and announced; accordions, tabs, modals, and carousels follow WAI-ARIA APG (proper `aria-expanded`, `aria-controls`, focus trapping, Escape to close); marquees pause on hover and focus and are keyboard-reachable; descriptive `alt` on content images, `alt=""` on decorative; **all motion wrapped by a `prefers-reduced-motion` check** via `components/motion/MotionProvider`; no information conveyed by color alone; `lang="en"` set. Site must pass axe with zero violations and be fully operable by keyboard alone.

### 13. Performance requirements

LCP < 2.5s on simulated 4G · CLS < 0.1 · INP < 200ms · homepage JS < 180KB gzip · Lighthouse ≥ 95 in Performance, Accessibility, Best Practices, SEO. All images via `next/image` with explicit `sizes`, AVIF/WebP, `priority` on the hero image only, blur placeholders on photography — **never request an image more than 2× its rendered slot width** (the old site requested 3840px for card thumbnails; do not repeat this). Fonts self-hosted via `next/font` with `display:swap`, maximum two families. All marketing pages statically generated. `next/dynamic` for the lightbox, map embed, and multi-step application. Lazy-load below-fold marquees and galleries. Animate only `transform` and `opacity`.

### 14. Animation requirements

Implement exactly the Phase 7 table: hero staggered fade-up; photo and testimonial marquees (CSS translate loops, pause on hover/focus); one scroll-reveal per section (`whileInView`, `once: true`); stat count-ups (1.6s, once, final value present in the DOM for screen readers); card hover lift + image scale; accordion height + chevron rotate; timeline progress draw on desktop; sticky header blur at 80px; sticky mobile CTA slide-up; 200ms opacity-only page transitions. Durations 150–400ms, easing `cubic-bezier(0.16,1,0.3,1)`. Under `prefers-reduced-motion: reduce`, all of the above degrade to instant or opacity-only, and marquees become static grids.

### 15. SEO requirements

Unique `generateMetadata` per route — no duplicated title suffixes. Canonical URLs. OG + Twitter cards with per-page images. JSON-LD from `lib/schema.ts`: `EducationalOrganization` + `LocalBusiness` in the root layout (using `content/site.ts`), `Course` on each program page, `FAQPage` on `/faq` and on program pages with FAQs, `BreadcrumbList` on all inner pages. `app/sitemap.ts` generated from `content/programs.ts`. `app/robots.ts`. 301 redirects from old paths (`/student-life` → `/students`, `/testimonials` → `/students`). Consistent NAP everywhere from `content/site.ts`. Descriptive internal linking from FAQ answers to program pages. All content server-rendered.

### 16. Reusable component requirements

Build the full inventory in Phase 5 with the specified variants and states. Rules: `components/ui/` primitives must be content-agnostic and fully typed with variant props; `components/sections/` compose primitives and accept content via props; forms live in `components/forms/` and share one `FormField` wrapper; all motion behavior lives in `components/motion/` so reduced-motion handling exists in exactly one place. Every component must handle its loading, error, empty, and focus states where applicable. Ship a `/styleguide` route rendering every component in every variant and state for review.

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

