import type { FaqGroup } from "@/types";

/** Grouped FAQ content for /faq. Every question is deep-linkable by its id. */
export const faqGroups: FaqGroup[] = [
  {
    group: "Admissions",
    items: [
      {
        id: "admissions-requirements",
        q: "What do I need to enroll?",
        a: "Most programs require a high school diploma or GED, a valid photo ID, and a brief admissions interview. Clinical programs also require a background check and a health screening (including immunization records) before your externship begins.",
      },
      {
        id: "admissions-age",
        q: "Is there a minimum age to enroll?",
        a: "Yes — you must be 18 years or older on your program's start date.",
      },
      {
        id: "admissions-how-long",
        q: "How long does the admissions process take?",
        a: "Most applicants complete their advisor call, application, and enrollment agreement within a week of first contacting us — sooner if a class start date is approaching.",
      },
      {
        id: "admissions-english",
        q: "Do I need to be fluent in English?",
        a: "Coursework and certification exams are conducted in English, so conversational fluency is required. Ask your advisor about available support resources.",
      },
    ],
  },
  {
    group: "Programs",
    items: [
      {
        id: "programs-choose",
        q: "How do I know which program is right for me?",
        a: "Start with how much time you have and whether you want hands-on clinical work or office-based administrative work. Our advisors also walk through your goals on a free 15-minute call.",
      },
      {
        id: "programs-schedule",
        q: "Are classes offered evenings and weekends?",
        a: "Most programs offer day, evening, and hybrid schedule options so you can keep working while you train. Exact offerings vary by program and cohort — check the program page for current options.",
      },
      {
        id: "programs-switch",
        q: "Can I switch programs after I've started?",
        a: "In most cases, yes, if it's early in the term and seats are available in the new program's next cohort. Talk to your advisor as soon as possible if you're considering a switch.",
      },
    ],
  },
  {
    group: "Cost & Aid",
    items: [
      {
        id: "cost-tuition",
        q: "What does tuition cost?",
        a: "Tuition varies by program length and format. Request a personalized cost sheet from admissions, or see the tuition summary on each program's page.",
      },
      {
        id: "cost-aid-options",
        q: "What financial aid options are available?",
        a: "Depending on the program and your eligibility, options may include payment plans, employer sponsorship, and workforce grant programs. Visit our Financial Aid page for the full breakdown.",
      },
      {
        id: "cost-included",
        q: "What's included in tuition?",
        a: "Most programs include lab supplies, scrubs, and one certification exam attempt. Specific inclusions are listed on each program's page.",
      },
    ],
  },
  {
    group: "Certification",
    items: [
      {
        id: "cert-where",
        q: "Where do I take my certification exam?",
        a: "As an authorized Pearson VUE testing site, most students test right here on our Dallas campus. A few certifications use a different national testing network — this is noted on the specific program's page.",
      },
      {
        id: "cert-retake",
        q: "What happens if I don't pass on my first attempt?",
        a: "Your advisor will help you schedule a retake and connect you with additional exam-prep review in the meantime.",
      },
    ],
  },
  {
    group: "Campus & Schedule",
    items: [
      {
        id: "campus-location",
        q: "Where is the campus located?",
        a: "9319 Lyndon B Johnson Fwy, Suite 207, Dallas, TX 75243 — see our Contact page for a map and directions.",
      },
      {
        id: "campus-parking",
        q: "Is parking available?",
        a: "Yes, free on-site parking is available for students during class hours.",
      },
      {
        id: "campus-tour",
        q: "Can I tour the campus before enrolling?",
        a: "Yes — campus tours can be booked through admissions, in person or as a live virtual walkthrough.",
      },
    ],
  },
];

/** Flat list of every FAQ item, for sections that pull a curated subset by id (e.g. FAQAccordion). */
export const allFaqItems = faqGroups.flatMap((group) => group.items);
