/**
 * Admissions + application content. Everything here is verbatim (or lightly
 * trimmed) from the live site's /admissions and /admissions/application
 * pages unless marked as sample copy.
 */

export const applicationIntro =
  "Ready to start your healthcare career? Follow our simple application process to begin your journey at NextGen Health Institute.";

/** The admissions statement from the live /admissions page. */
export const admissionsStatement =
  "At NextGen Health Institute, we believe that education is the bridge between aspiration and achievement. Our admissions process is designed to help you transition smoothly into your studies and prepare you for a fulfilling healthcare career.";

export const applicationSteps: { title: string; body: string; points: string[] }[] = [
  {
    title: "Complete Online Application",
    body: "Fill out our comprehensive online application form with your personal information, educational background, and program preferences.",
    points: ["Personal and contact information", "Educational history", "Program selection", "Emergency contact details"],
  },
  {
    title: "Submit Required Documents",
    body: "Upload or mail the required documentation to complete your application.",
    points: [
      "Official high school transcripts",
      "Government-issued photo ID",
      "Social Security card copy",
      "Additional program-specific documents",
    ],
  },
  {
    title: "Schedule Admissions Interview",
    body: "Meet with our admissions team to discuss your goals and program details.",
    points: ["One-on-one consultation", "Program overview", "Career guidance", "Q&A session"],
  },
  {
    title: "Complete Assessment",
    body: "Take our entrance assessment to evaluate your readiness for your chosen program.",
    points: ["Basic skills evaluation", "Program-specific assessment", "No preparation required", "Immediate results"],
  },
  {
    title: "Finalize Enrollment",
    body: "Complete your enrollment and prepare to start your healthcare career training.",
    points: [
      "Review and sign enrollment agreement",
      "Complete financial aid process",
      "Receive orientation materials",
      "Set your start date",
    ],
  },
];

export const processingTimeline = {
  summary: "1–2 weeks",
  points: [
    { label: "Application review", value: "3–5 business days" },
    { label: "Interview scheduling", value: "1–3 days" },
    { label: "Assessment completion", value: "Same day" },
  ],
};

export const requiredDocuments = applicationSteps[1].points;

/** Real student quotes from the live /admissions page. */
export const admissionsQuotes = [
  { quote: "They really care about you passing and succeeding in their classes.", who: "Student at NextGen Health Institute" },
  {
    quote: "NextGen Health Institute and its team taught me everything I needed to be prepared for my career.",
    who: "Medical Assistant Graduate",
  },
];

export const educationLevels = [
  "High school diploma",
  "GED",
  "Some college",
  "Associate degree",
  "Bachelor's degree or higher",
  "Currently in high school",
] as const;

export const schedulePreferences = ["Day", "Evening", "No preference"] as const;

export const referralSources = [
  "Google search",
  "Social media",
  "Friend or family",
  "Employer",
  "Community event",
  "Other",
] as const;

/** Contact-form topics. `type` query values match the live site's /contact?type= links. */
export const contactTopics = [
  { value: "info", label: "Program information" },
  { value: "tour", label: "Schedule a campus tour" },
  { value: "financial-aid", label: "Financial aid" },
  { value: "apply", label: "Help with my application" },
  { value: "other", label: "Something else" },
] as const;

export type ContactTopic = (typeof contactTopics)[number]["value"];
