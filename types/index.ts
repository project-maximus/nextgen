export type ProgramCategory = "clinical" | "administrative" | "specialized";
export type ProgramFormat = "in-person" | "hybrid" | "online" | "flexible";

export interface CurriculumModule {
  title: string;
  detail: string;
}

export interface ProgramOutlook {
  employmentRate: string;
  salaryRange: string;
  growth: string;
  /** "Career Opportunities" list, verbatim from the live program page. */
  environments: string[];
}

export interface ProgramCertification {
  exam: string;
  body: string;
  onCampus: boolean;
}

export interface Program {
  slug: string;
  name: string;
  /** Full program title exactly as the live site lists it. */
  officialName: string;
  shortName: string;
  category: ProgramCategory;
  duration: string;
  durationWeeks: [number, number];
  format: ProgramFormat;
  credential: string;
  blurb: string;
  description: string[];
  heroImage: string;
  cardImage: string;
  /** "Core Learning Objectives", verbatim from the live program page. */
  objectives: string[];
  /** Accordion modules on the program page. */
  modules: CurriculumModule[];
  /** Short "What you'll learn" tags in the overview sidebar. */
  skills: string[];
  /** Pills in the hands-on training section. */
  handsOn: string[];
  /** Overrides the default hands-on paragraph (for non-clinical programs). */
  handsOnIntro?: string;
  /** Placeholder graduate quote — swap for a real one before launch. */
  studentQuote: string;
  certification: ProgramCertification;
  outlook: ProgramOutlook;
  relatedSlugs: string[];
}

export interface CohortDate {
  programSlug: string;
  startDate: string;
  applyBy: string;
  seatsLimited?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  photo: string;
  quote: string;
  programSlug: string;
  employer?: string;
  year: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  photo: string;
}

export interface Partner {
  id: string;
  name: string;
  /** Optional — omit to render a styled text wordmark instead of an image. */
  logo?: string;
}

export interface FaqGroup {
  group: "Admissions" | "Programs" | "Cost & Aid" | "Certification" | "Campus & Schedule";
  items: { id: string; q: string; a: string }[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface RequestInfoPayload {
  formType: "request-info" | "contact" | "application";
  name: string;
  email: string;
  phone: string;
  programSlug?: string;
  message?: string;
  consent: boolean;
  honeypot?: string;
}
