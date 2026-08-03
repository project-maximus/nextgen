import { FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from "@/components/ui/SocialIcons";
import { programs } from "@/content/programs";
import { site } from "@/content/site";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const institute = [
  { label: "About", href: "/home-v4/about" },
  { label: "How It Works", href: "/home-v4/how-it-works" },
  { label: "Outcomes", href: "/home-v4/outcomes" },
  { label: "Cost & Financial Aid", href: "/cost" },
  { label: "Contact", href: "/contact" },
];

const prep = [
  { label: "NGHI Prep Overview", href: "/home-v4/prep" },
  { label: "AI Tutor", href: "/home-v4/prep" },
  { label: "Mock Exams", href: "/home-v4/prep" },
  { label: "Study Plans", href: "/home-v4/prep" },
];

const socials = [
  { label: "Facebook", href: site.socials.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: site.socials.instagram, Icon: InstagramIcon },
  { label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedInIcon },
  { label: "YouTube", href: site.socials.youtube, Icon: YouTubeIcon },
];

const half = Math.ceil(programs.length / 2);
const programColumns = [programs.slice(0, half), programs.slice(half)];

function FooterColumnHeading({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">{children}</p>;
}

export function Footer() {
  return (
    <footer className="v4-scope bg-white pt-20">
      <div className="mx-auto max-w-[1360px] px-6 md:px-8 xl:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,360px)_1fr]">
          <div>
            <Image
              src="/logos/nextgen-full-black.png"
              alt="NextGen Health Institute"
              width={1402}
              height={478}
              className="h-12 w-auto"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-[var(--color-v4-text-2)]">
              Not sure which program is right for you? Talk to an advisor about your goals, schedule, and
              financial aid options.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center rounded-full bg-[var(--color-v4-ink-900)] px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[var(--color-v4-ink-800)]"
              >
                Talk to an Advisor
              </Link>
              <a
                href={site.phoneHref}
                className="text-sm font-semibold text-[var(--color-v4-text)] hover:text-[var(--color-v4-text-2)]"
              >
                {site.phone}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
            <div>
              <FooterColumnHeading>Programs</FooterColumnHeading>
              <div className="mt-5 grid grid-cols-1 gap-2.5">
                {programColumns[0].map((p) => (
                  <Link
                    key={p.slug}
                    href={`/programs/${p.slug}`}
                    className="text-sm text-[var(--color-v4-text-2)] hover:text-[var(--color-v4-text)]"
                  >
                    {p.shortName}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <FooterColumnHeading>
                <span className="text-transparent sm:text-[var(--color-v4-text-3)]" aria-hidden="true">
                  Programs
                </span>
              </FooterColumnHeading>
              <div className="mt-0 grid grid-cols-1 gap-2.5 sm:mt-5">
                {programColumns[1].map((p) => (
                  <Link
                    key={p.slug}
                    href={`/programs/${p.slug}`}
                    className="text-sm text-[var(--color-v4-text-2)] hover:text-[var(--color-v4-text)]"
                  >
                    {p.shortName}
                  </Link>
                ))}
                <Link
                  href="/programs"
                  className="text-sm font-semibold text-[var(--color-v4-text)] hover:text-[var(--color-v4-text-2)]"
                >
                  All 11 programs →
                </Link>
              </div>
            </div>
            <div>
              <FooterColumnHeading>Institute</FooterColumnHeading>
              <div className="mt-5 grid grid-cols-1 gap-2.5">
                {institute.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-[var(--color-v4-text-2)] hover:text-[var(--color-v4-text)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <FooterColumnHeading>NGHI Prep</FooterColumnHeading>
              <div className="mt-5 grid grid-cols-1 gap-2.5">
                {prep.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm text-[var(--color-v4-text-2)] hover:text-[var(--color-v4-text)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-8">
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
