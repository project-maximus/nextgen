import { programs } from "@/content/programs";
import { site } from "@/content/site";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/ui/SocialIcons";
import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Programs",
    links: programs.slice(0, 6).map((p) => ({ label: p.shortName, href: `/programs/${p.slug}` })),
    extra: { label: "View all programs", href: "/programs" },
  },
  {
    title: "Get Started",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Apply Now", href: "/how-it-works/apply" },
      { label: "Cost & Financial Aid", href: "/cost" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "School",
    links: [
      { label: "About", href: "/about" },
      { label: "Students & Outcomes", href: "/students" },
      { label: "Outcomes & Proof", href: "/outcomes" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy-deep text-canvas">
      <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(3,1fr)] lg:gap-8">
          <div>
            <Image
              src="/logos/nghi-logo-reverse.webp"
              alt={site.name}
              width={175}
              height={60}
              className="h-11 w-auto"
            />
            <p className="mt-3 max-w-xs text-body-sm text-navy-soft">{site.missionStatement}</p>
            <div className="mt-5 flex flex-col gap-2 text-body-sm text-navy-soft">
              <span className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
              </span>
              <a href={site.phoneHref} className="flex items-center gap-2 hover:text-gold">
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-gold">
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                {site.email}
              </a>
            </div>
            <div className="mt-5 flex gap-3 text-navy-soft">
              <a href={site.socials.facebook} aria-label="Facebook" className="hover:text-gold">
                <FacebookIcon className="size-5" />
              </a>
              <a href={site.socials.instagram} aria-label="Instagram" className="hover:text-gold">
                <InstagramIcon className="size-5" />
              </a>
              <a href={site.socials.linkedin} aria-label="LinkedIn" className="hover:text-gold">
                <LinkedInIcon className="size-5" />
              </a>
              <a href={site.socials.youtube} aria-label="YouTube" className="hover:text-gold">
                <YouTubeIcon className="size-5" />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-body font-semibold text-canvas">{col.title}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-body-sm text-navy-soft hover:text-gold">
                      {link.label}
                    </Link>
                  </li>
                ))}
                {col.extra && (
                  <li>
                    <Link href={col.extra.href} className="text-body-sm font-semibold text-gold hover:text-white">
                      {col.extra.label}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-6 text-body-sm text-white/40 md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-gold">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy" className="hover:text-gold">
              Privacy Policy
            </Link>
          </div>
          <p>
            Powered by{" "}
            <a
              href="https://maxxlab.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold underline underline-offset-2 hover:text-gold-deep"
            >
              Maxxlab
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
