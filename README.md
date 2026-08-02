# NextGen Health Institute — Website Rebuild

Marketing website for NextGen Health Institute (NGHI), built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion. See `nghi-redesign-strategy.md` and `nghi-coding-agent-prompt.md` for the full design/build brief this implementation follows.

## Getting started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Before this goes to production

Two things were intentionally stubbed out during the initial build and must be replaced before a real launch:

1. **Photography** (`public/images/**`) — every photo is currently a generic placeholder fetched from [picsum.photos](https://picsum.photos) (real, freely-licensed stock photography, but *not* subject-matched to healthcare training, and not the client's real campus/students). Replace these files 1:1 by filename with real campus/student photography — no component changes are required, since every image path is already wired through `content/programs.ts`, `content/team.ts`, and `content/testimonials.ts`.
2. **Lead delivery** (`lib/leads.ts`) — the `/api/lead` route validates and logs each submitted lead but does not yet email or push to a CRM. `sendLead()` in that file is the single integration point; wire it to a real provider (e.g. Resend, SendGrid, HubSpot) before relying on the site for real lead capture.

Also note: `content/partners.ts` and the `employer` field in `content/testimonials.ts` use clearly fictional institution names (e.g. "Dallas Metro Medical Center") as stand-ins for the client's real externship/employer partners — do not substitute real hospital or clinic names, or their logos, without confirmed written partnership authorization. The same applies to the AMCA/Pearson VUE accreditation badges in `content/site.ts`, which are rendered as icon+text lockups rather than real logo assets for the same reason.

## Content model

Everything editorial lives in `content/*.ts` — never hard-code contact info, program durations/formats, dates, or copy inside a component. In particular:

- `content/site.ts` is the single source of truth for the school's name, address, phone, email, and accreditation.
- `content/programs.ts` is the single source of truth for the 11-program catalog; every nav menu, filter, form `<select>`, and related-programs list derives from it.

## Architecture

- `components/ui/` — content-agnostic primitives (Button, Card, Accordion, …)
- `components/sections/` — composed, content-aware page sections
- `components/forms/` — stateful forms sharing one `FormField` wrapper
- `components/motion/` — all animation/reduced-motion logic lives here, in one place
- `/styleguide` — every `ui/` component in every documented variant and state
