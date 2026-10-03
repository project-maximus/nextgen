import { site } from "@/content/site";
import type { Program } from "@/types";

/** Stable ids so every page's structured data points at the same entities. */
const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.city,
  addressRegion: site.address.state,
  postalCode: site.address.zip,
  addressCountry: site.address.country,
};

/** "8:00 AM–6:00 PM" → ["08:00", "18:00"]; closed days return null. */
function parseHours(range: string): [string, string] | null {
  const parts = range.split("–").map((p) => p.trim());
  if (parts.length !== 2) return null;
  const to24 = (t: string) => {
    const m = t.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!m) return null;
    let h = Number(m[1]) % 12;
    if (m[3].toUpperCase() === "PM") h += 12;
    return `${String(h).padStart(2, "0")}:${m[2]}`;
  };
  const [opens, closes] = [to24(parts[0]), to24(parts[1])];
  return opens && closes ? [opens, closes] : null;
}

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/** "Monday–Friday" → the five weekday names. */
function expandDays(days: string): string[] {
  const [from, to] = days.split("–").map((d) => d.trim());
  const start = WEEKDAYS.indexOf(from);
  const end = to ? WEEKDAYS.indexOf(to) : start;
  return start < 0 || end < 0 ? [] : WEEKDAYS.slice(start, end + 1);
}

/**
 * The school as one entity: an educational organization that is also a local
 * business with a street address and opening hours. Social profiles are left
 * out on purpose until the client confirms real, live profile URLs.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": ORG_ID,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: `${site.url}/logos/nextgen-full-black.png`,
    image: `${site.url}/og/default.jpg`,
    description: site.description,
    foundingDate: String(site.founded),
    telephone: site.phoneHref.replace("tel:", ""),
    email: site.email,
    address: postalAddress,
    areaServed: ["Dallas", "Fort Worth", "Dallas–Fort Worth metroplex"],
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`,
    )}`,
    openingHoursSpecification: site.hours.flatMap((h) => {
      const hours = parseHours(h.hours);
      const dayOfWeek = expandDays(h.days).map((d) => `https://schema.org/${d}`);
      return hours && dayOfWeek.length
        ? [{ "@type": "OpeningHoursSpecification", dayOfWeek, opens: hours[0], closes: hours[1] }]
        : [];
    }),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "admissions",
      telephone: site.phoneHref.replace("tel:", ""),
      email: site.email,
      areaServed: "US",
      availableLanguage: "English",
    },
    knowsAbout: [
      "Healthcare career training",
      "Medical assistant certification",
      "Phlebotomy training",
      "EKG technician training",
      "Certified nursing assistant training",
      "Medical billing and coding",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    alternateName: site.shortName,
    description: site.description,
    inLanguage: "en-US",
    publisher: { "@id": ORG_ID },
  };
}

const courseMode: Record<Program["format"], string[]> = {
  "in-person": ["Onsite"],
  hybrid: ["Blended"],
  online: ["Online"],
  flexible: ["Online", "Blended", "Onsite"],
};

export function courseSchema(program: Program) {
  const [minWeeks, maxWeeks] = program.durationWeeks;
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${site.url}/programs/${program.slug}#course`,
    name: `${program.name} Program`,
    alternateName: program.officialName,
    description: program.description[0] ?? program.blurb,
    url: `${site.url}/programs/${program.slug}`,
    image: `${site.url}${program.cardImage}`,
    inLanguage: "en-US",
    provider: { "@type": "EducationalOrganization", "@id": ORG_ID, name: site.name, url: site.url },
    educationalCredentialAwarded: program.credential,
    teaches: program.objectives,
    timeRequired: `P${maxWeeks}W`,
    occupationalCategory: program.name,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: courseMode[program.format],
      // ISO 8601: the shortest track; the longest is in timeRequired above.
      courseWorkload: `P${minWeeks}W`,
      location: { "@type": "Place", name: `${site.name} — Main Campus`, address: postalAddress },
    },
  };
}

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function breadcrumbListSchema(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${site.url}${item.href}`,
    })),
  };
}

/** The full program catalog as an ordered list, for the /programs page. */
export function programListSchema(programs: Program[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Healthcare certification programs",
    numberOfItems: programs.length,
    itemListElement: programs.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${p.name} Program`,
      url: `${site.url}/programs/${p.slug}`,
    })),
  };
}

/**
 * Serializes a JSON-LD payload for a <script type="application/ld+json"> tag.
 * "<" is escaped so content can never close the script element early.
 */
export function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
