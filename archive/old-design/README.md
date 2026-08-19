# Old design (pre-v4)

Snapshot of the original navy/gold design system and homepage variants
(home-v1, home-v3, the old root homepage, the old medical-assistant program
page, styleguide, and the shared components/content they depended on) —
kept here for reference in case any component or copy is worth pulling
into a future page.

Not part of the app: excluded from the Next.js route tree (nothing lives
under `app/`'s routing paths), and excluded from TypeScript/ESLint in
`tsconfig.json` / `eslint.config.mjs`. Import paths inside these files
still point at their original locations (e.g. `@/components/sections/Hero`),
which no longer exist there — fix imports before reusing anything here.
