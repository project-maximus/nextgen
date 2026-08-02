import { site } from "@/content/site";
import type { Program, ProgramFaq } from "@/types";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    description: site.description,
    foundingDate: String(site.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: site.address.country,
    },
    telephone: site.phone,
    email: site.email,
    sameAs: Object.values(site.socials),
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      description: h.hours,
    })),
  };
}

export function courseSchema(program: Program) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.name,
    description: program.blurb,
    provider: {
      "@type": "EducationalOrganization",
      name: site.name,
      sameAs: site.url,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: program.format,
      courseWorkload: program.duration,
    },
  };
}

export function faqPageSchema(faqs: ProgramFaq[] | { q: string; a: string }[]) {
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

/** Renders a JSON-LD payload as a serialized string for a <script type="application/ld+json"> tag. */
export function jsonLd(data: object): string {
  return JSON.stringify(data);
}
