import { FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from "@/components/ui/SocialIcons";
import { programs } from "@/content/programs";
import { site } from "@/content/site";
import { ChevronRight } from "lucide-react";
import { Anton } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";

// Ultra-condensed poster weight — the wordmark is the one place on the site
// that intentionally breaks from the body font (Sora), stretched edge to
// edge via SVG textLength rather than relying on font-size to fill the row.
const anton = Anton({ weight: "400", subsets: ["latin"] });

const institute = [
  { label: "About", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Outcomes", href: "/outcomes" },
  { label: "Cost & Financial Aid", href: "/cost" },
  { label: "Contact", href: "/contact" },
];

const prep = [
  { label: "NGHI Prep Overview", href: "/prep" },
  { label: "AI Tutor", href: "/prep" },
  { label: "Mock Exams", href: "/prep" },
  { label: "Study Plans", href: "/prep" },
];

const socials = [
  { label: "Facebook", href: site.socials.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: site.socials.instagram, Icon: InstagramIcon },
  { label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedInIcon },
  { label: "YouTube", href: site.socials.youtube, Icon: YouTubeIcon },
];

const featuredPrograms = programs.slice(0, 6);

function FooterColumnHeading({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">{children}</p>;
}

function FooterLink({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  const className =
    "group flex items-center gap-1 text-sm text-[var(--color-v4-text-2)] transition-colors hover:text-[var(--color-v4-text)]";
  const chevron = (
    <ChevronRight className="size-3 shrink-0 text-[var(--color-v4-text-3)] transition-colors group-hover:text-[var(--color-v4-text)]" strokeWidth={2} aria-hidden="true" />
  );

  if (external) {
    return (
      <a href={href} className={className}>
        {chevron}
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {chevron}
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="v4-scope bg-white pt-16 md:pt-20">
      <div className="mx-auto max-w-[1600px] px-6 md:px-8 xl:px-10">
        <Link href="/" aria-label="NextGen Health Institute" className="block">
          <svg viewBox="0 0 1000 190" className="w-full" role="img" aria-hidden="true">
            <defs>
              {/* Procedural noise, stretched into horizontal flow streaks and
                  pushed to high contrast, then clipped to the glyph shapes —
                  an organic, watery blend instead of a mechanical striped
                  gradient. */}
              <filter id="footerWordmarkNoise" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency="0.003 0.022" numOctaves={3} seed={11} result="noise" />
                <feColorMatrix
                  in="noise"
                  type="matrix"
                  values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 0 1"
                  result="gray"
                />
                <feComponentTransfer in="gray" result="contrast">
                  <feFuncR type="linear" slope={3.2} intercept={-1.1} />
                  <feFuncG type="linear" slope={3.2} intercept={-1.1} />
                  <feFuncB type="linear" slope={3.2} intercept={-1.1} />
                </feComponentTransfer>
                <feComposite in="contrast" in2="SourceAlpha" operator="in" />
              </filter>
            </defs>
            <text
              x="0"
              y="152"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              className={anton.className}
              fontSize="190"
              fill="#0a0a0a"
              filter="url(#footerWordmarkNoise)"
            >
              NEXTGEN
            </text>
          </svg>
        </Link>

        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:mt-16 lg:grid-cols-5">
          <div>
            <FooterColumnHeading>Get in Touch</FooterColumnHeading>
            <p className="mt-5 max-w-[22ch] text-sm leading-relaxed text-[var(--color-v4-text-2)]">
              Not sure which program is right for you? Talk to an advisor about your goals and schedule.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-2.5">
              <FooterLink href="/contact">Talk to an Advisor</FooterLink>
              <FooterLink href={site.phoneHref} external>
                {site.phone}
              </FooterLink>
            </div>
          </div>

          <div>
            <FooterColumnHeading>Institute</FooterColumnHeading>
            <div className="mt-5 grid grid-cols-1 gap-2.5">
              {institute.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </div>
          </div>

          <div>
            <FooterColumnHeading>Programs</FooterColumnHeading>
            <div className="mt-5 grid grid-cols-1 gap-2.5">
              {featuredPrograms.map((p) => (
                <FooterLink key={p.slug} href={`/programs/${p.slug}`}>
                  {p.shortName}
                </FooterLink>
              ))}
              <Link
                href="/programs"
                className="mt-1 text-sm font-semibold text-[var(--color-v4-text)] hover:text-[var(--color-v4-text-2)]"
              >
                All 11 programs →
              </Link>
            </div>
          </div>

          <div>
            <FooterColumnHeading>NGHI Prep</FooterColumnHeading>
            <div className="mt-5 grid grid-cols-1 gap-2.5">
              {prep.map((item) => (
                <FooterLink key={item.label} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </div>
          </div>

          <div>
            <FooterColumnHeading>Connect</FooterColumnHeading>
            <div className="mt-5 grid grid-cols-1 gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-2 text-sm text-[var(--color-v4-text-2)] hover:text-[var(--color-v4-text)]"
                >
                  <Icon className="size-4" strokeWidth={1.5} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 border-t border-[var(--color-v4-line)] py-8 text-xs text-[var(--color-v4-text-3)] sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/terms" className="hover:text-[var(--color-v4-text)]">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy" className="hover:text-[var(--color-v4-text)]">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
