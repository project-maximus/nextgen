export type ProgramCategory = "clinical" | "administrative" | "specialized";
export type ProgramFormat = "in-person" | "hybrid" | "online" | "flexible";

export interface CurriculumModule {
  module: string;
  outcomes: string[];
}

export interface ProgramFaq {
  q: string;
  a: string;
}

export interface ProgramOutlook {
  employmentRate: string;
  salaryRange: string;
  growth: string;
  environments: string[];
  source?: string;
}

export interface ProgramTuition {
  amount?: number;
  note: string;
  includes: string[];
}

export interface ProgramHours {
  classroom: number;
  lab: number;
  externship: number;
}

export interface ProgramCertification {
  exam: string;
  body: string;
  onCampus: boolean;
}

export interface Program {
  slug: string;
  name: string;
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
  curriculum: CurriculumModule[];
  hours: ProgramHours;
  certification: ProgramCertification;
  outlook: ProgramOutlook;
  tuition?: ProgramTuition;
  faqs: ProgramFaq[];
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
