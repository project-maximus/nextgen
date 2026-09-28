/**
 * NGHI Prep — the study platform included with every program.
 *
 * Verified against the live prototype (pmci-demo-eleveno.vercel.app, Sept 2026):
 *   tagline + subline, the join-code enrollment flow ("Your institute emails this
 *   code with your batch invitation"), the program catalog grouping + codes +
 *   descriptions + availability, and the admin portal's scope ("manage courses,
 *   assessments, and students").
 * Sample copy pending the client: feature bullets, how-it-works detail, FAQs.
 */

export const prep = {
  name: "NGHI Prep",
  tagline: "Study like the exam is already yours.",
  subline: "AI tutoring, mock exams, and flashcards — grounded in your own course material.",
  /** The platform itself. Swap for the production domain when it moves off the demo host. */
  appUrl: "https://pmci-demo-eleveno.vercel.app",
  loginUrl: "https://pmci-demo-eleveno.vercel.app/login",
  registerUrl: "https://pmci-demo-eleveno.vercel.app/register",
  adminUrl: "https://pmci-demo-eleveno.vercel.app/admin-login",
  /** Shown in the app-window mock's address bar. */
  displayHost: "prep.nextgenhealthinstitute.com",
  sampleJoinCode: "MRI-FALL26",
} as const;

export type PrepAvailability = "live" | "soon";

/** Program catalog exactly as the NGHI Prep app groups and describes it. */
export const prepCatalog: {
  group: string;
  programs: { code: string; name: string; blurb: string; slug: string; status: PrepAvailability }[];
}[] = [
  {
    group: "Clinical Programs",
    programs: [
      { code: "MA", name: "Medical Assistant Program", blurb: "Clinical and administrative practice across the care team.", slug: "medical-assistant", status: "soon" },
      { code: "CNA", name: "Nursing Assistant (CNA)", blurb: "Direct patient care, vitals, mobility, and infection control.", slug: "nursing-assistant", status: "soon" },
      { code: "PCT", name: "Patient Care Technician", blurb: "Expanded bedside care across acute and long-term settings.", slug: "patient-care-technician", status: "soon" },
      { code: "PTA", name: "Physical Therapy Aide", blurb: "Supporting rehabilitation, mobility, and therapy sessions.", slug: "physical-therapy-aide", status: "soon" },
      { code: "MHT", name: "Mental Health Technician", blurb: "Behavioural health support and patient safety practice.", slug: "mental-health-technician", status: "soon" },
    ],
  },
  {
    group: "Diagnostic Programs",
    programs: [
      { code: "EKG", name: "EKG Technician Training", blurb: "Lead placement, rhythm recognition, and Holter monitoring.", slug: "ekg-technician", status: "soon" },
      {
        code: "MRI",
        name: "MRI Technologist Training",
        blurb: "Magnetic resonance physics, patient screening and safety zones, imaging protocols, and cross-sectional anatomy.",
        slug: "mri-technician",
        status: "live",
      },
      { code: "PHLEB", name: "Phlebotomy Training", blurb: "Venipuncture technique, order of draw, and specimen handling.", slug: "phlebotomy-technician", status: "soon" },
    ],
  },
  {
    group: "Administrative Programs",
    programs: [
      { code: "MAA", name: "Medical Administrative Assistant", blurb: "Front-office workflow, scheduling, and records management.", slug: "medical-administrative-assistant", status: "soon" },
      { code: "MBC", name: "Medical Billing and Coding", blurb: "Diagnostic and procedural coding, claims, and reimbursement.", slug: "medical-billing-coding", status: "soon" },
    ],
  },
  {
    group: "Specialized Programs",
    programs: [
      { code: "OCP", name: "Orthopedic Casting Program", blurb: "Casting, splinting, and orthopedic immobilisation technique.", slug: "orthopedic-casting", status: "soon" },
    ],
  },
];

export type PrepFeatureKey = "tutor" | "exams" | "flashcards" | "plan" | "lessons";

export const prepFeatures: { key: PrepFeatureKey; eyebrow: string; title: string; body: string; points: string[] }[] = [
  {
    key: "tutor",
    eyebrow: "AI Tutor",
    title: "Ask anything. Get answers from your own course.",
    body: "The tutor answers from the material your instructors actually teach — not the open internet — and shows you where each answer comes from.",
    points: ["Grounded in your program's course material", "Every answer cites its source", "Available at 2 a.m. before an exam"],
  },
  {
    key: "exams",
    eyebrow: "Mock Exams",
    title: "Practice under real exam conditions.",
    body: "Full-length, timed practice tests in the same format as your certification exam, scored by topic so you know exactly where points are slipping.",
    points: ["Timed, full-length format", "Score breakdown by topic", "Retake with fresh questions"],
  },
  {
    key: "flashcards",
    eyebrow: "Flashcards",
    title: "Learn terms that actually stick.",
    body: "Decks built from each module, resurfaced on a spaced-repetition schedule so the hard cards come back until they're easy.",
    points: ["Decks for every module", "Spaced repetition built in", "Five minutes between classes counts"],
  },
  {
    key: "plan",
    eyebrow: "Study Plan & Readiness Score",
    title: "Know when you're ready — not just hope.",
    body: "Your plan reorders itself around your weak spots, and a readiness score tracks how close you are to passing, week by week.",
    points: ["Adapts after every quiz and mock", "Weekly streaks keep you consistent", "Readiness score before you book the exam"],
  },
  {
    key: "lessons",
    eyebrow: "Video & Audio Lessons",
    title: "Every concept, explained your way.",
    body: "Short video walkthroughs for procedures you need to see, and audio lessons for the commute — all organised by module.",
    points: ["Short, module-by-module lessons", "Audio for studying on the go", "Pick up where you left off"],
  },
];

export const prepSteps = [
  {
    title: "Enroll in a program",
    body: "NGHI Prep is included with every program. When your batch is set up, your institute emails you a join code with your invitation.",
  },
  {
    title: "Enter your join code",
    body: "Sign in, enter the code, and your program opens automatically — modules, decks, and mock exams, ready to go.",
  },
  {
    title: "Study until you're ready",
    body: "Work through your plan with the tutor, flashcards, and mocks. When your readiness score says go, book your exam.",
  },
];

export const prepAdminFeatures = [
  { title: "Courses", body: "Publish modules, lessons, and course material the AI tutor answers from." },
  { title: "Assessments", body: "Build quizzes and mock exams, and see results by student and by topic." },
  { title: "Students", body: "Manage batches and join codes, and spot who needs help before exam day." },
];

export const prepFaqs = [
  {
    q: "Does NGHI Prep cost extra?",
    a: "No. NGHI Prep is included with every NextGen Health Institute program at no additional cost.",
  },
  {
    q: "Do I need to be enrolled to use it?",
    a: "Yes. Anyone can create an account, but a program opens once your institute assigns you to a batch or you enter the join code from your invitation email.",
  },
  {
    q: "Which programs are available?",
    a: "MRI Technologist Training is live now. The rest of our 11 programs are being added and will open to enrolled students as they launch.",
  },
  {
    q: "Where do the AI tutor's answers come from?",
    a: "From your own course material — the modules and lessons your instructors publish — so answers match what you're taught and tested on.",
  },
  {
    q: "Can I use it on my phone?",
    a: "Yes. NGHI Prep runs in the browser on phones, tablets, and laptops — no download needed.",
  },
];
