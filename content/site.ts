/**
 * THE single source of truth for contact info (NAP), hours, socials, and
 * accreditation. Never hard-code any of these values inside a component —
 * import from here. This directly fixes the old site's contradictory
 * address/phone/date problem.
 *
 * NAP (address/phone/email) and mission statement below are pulled verbatim
 * from the live nghi-omega.vercel.app homepage — the old site had three
 * conflicting addresses across different pages; this one (its own homepage
 * footer) is the canonical choice going forward.
 */
export const site = {
  name: "NextGen Health Institute",
  shortName: "NGHI",
  tagline: "Accredited healthcare career training in Dallas–Fort Worth",
  missionStatement:
    "Empowering the next generation of healthcare professionals with comprehensive training programs designed for real-world success.",
  description:
    "NextGen Health Institute is an AMCA-accredited healthcare career-training school in Dallas, Texas, offering 11 certification programs from 2 to 24 weeks.",
  url: "https://www.nextgenhealthinstitute.com",
  address: {
    street: "2727 LBJ Fwy, Suite 1057",
    city: "Dallas",
    state: "TX",
    zip: "75234",
    country: "US",
  },
  phone: "(214) 601-3361",
  phoneHref: "tel:+12146013361",
  email: "admissions@nextgenhealthinstitute.com",
  hours: [
    { days: "Monday–Thursday", hours: "8:00 AM–7:00 PM" },
    { days: "Friday", hours: "8:00 AM–5:00 PM" },
    { days: "Saturday", hours: "9:00 AM–1:00 PM (by appointment)" },
    { days: "Sunday", hours: "Closed" },
  ],
  socials: {
    facebook: "https://facebook.com/nextgenhealthinstitute",
    instagram: "https://instagram.com/nextgenhealthinstitute",
    linkedin: "https://linkedin.com/company/nextgenhealthinstitute",
    youtube: "https://youtube.com/@nextgenhealthinstitute",
  },
  accreditation: [
    {
      name: "AMCA",
      fullName: "American Medical Certification Association",
      logo: "/logos/amca.svg",
      description:
        "We are proudly accredited by the American Medical Certification Association (AMCA), ensuring our programs meet the highest standards of healthcare education.",
    },
    {
      name: "Pearson VUE",
      fullName: "Pearson VUE Authorized Testing Site",
      logo: "/logos/pearson.svg",
      description:
        "As an authorized Pearson testing site, we provide convenient access to industry-standard certification exams right here on our campus.",
    },
  ],
  founded: 1992,
  mapEmbedSrc:
    "https://www.google.com/maps?q=2727+LBJ+Fwy+Suite+1057+Dallas+TX+75234&output=embed",
} as const;
