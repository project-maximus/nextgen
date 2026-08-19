import type { Testimonial } from "@/types";

/**
 * Realistic sample graduate testimonials pending real quotes/photos from the
 * client. Never truncate a quote — every entry here is a complete sentence.
 * Employer names are fictional placeholders (matching content/partners.ts) —
 * do not substitute real hospital/clinic names without their authorization.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Johnson",
    photo: "/images/testimonials/grad-1.jpg",
    quote:
      "I went from working retail to a full clinical role in three months. The instructors treated us like future coworkers, not just students.",
    programSlug: "medical-assistant",
    employer: "Dallas Metro Medical Center",
    year: 2026,
  },
  {
    id: "t2",
    name: "Marcus Reed",
    photo: "/images/testimonials/grad-3.jpg",
    quote:
      "The hands-on lab time made the difference. By the time I started my externship, I'd already drawn blood dozens of times under supervision.",
    programSlug: "phlebotomy-technician",
    employer: "Southwest Diagnostics Laboratories",
    year: 2025,
  },
  {
    id: "t3",
    name: "Priya Patel",
    photo: "/images/testimonials/grad-2.jpg",
    quote:
      "My advisor helped me pick a schedule that worked around my two kids. I never felt like just a number here.",
    programSlug: "nursing-assistant",
    employer: "Cedar Grove Health System",
    year: 2026,
  },
  {
    id: "t4",
    name: "David Chen",
    photo: "/images/testimonials/grad-4.jpg",
    quote:
      "I was 34 and scared to start over. Twelve weeks later I had a certification and a job offer before I even graduated.",
    programSlug: "ekg-technician",
    employer: "Trinity Valley Regional Hospital",
    year: 2025,
  },
  {
    id: "t5",
    name: "Angela Torres",
    photo: "/images/testimonials/grad-5.jpg",
    quote:
      "The billing and coding program let me study around my night shifts. I do the coursework from my kitchen table.",
    programSlug: "medical-billing-coding",
    employer: "Remote — Ridgeview Health Partners",
    year: 2026,
  },
  {
    id: "t6",
    name: "James Okafor",
    photo: "/images/testimonials/grad-7.jpg",
    quote:
      "The MRI program was intense, but the simulator hours meant my first real scan on externship didn't feel like my first scan.",
    programSlug: "mri-technician",
    employer: "North Dallas Community Clinic",
    year: 2025,
  },
  {
    id: "t7",
    name: "Kimberly Alvarez",
    photo: "/images/testimonials/grad-6.jpg",
    quote:
      "I chose the Patient Care Technician program because I wanted more than one skill. Now I do vitals, draws, and EKGs on the same shift.",
    programSlug: "patient-care-technician",
    employer: "Dallas Metro Medical Center",
    year: 2026,
  },
  {
    id: "t8",
    name: "Robert Nguyen",
    photo: "/images/testimonials/grad-8.jpg",
    quote:
      "The front-office training was more practical than I expected — real scheduling software, real insurance scenarios, not just theory.",
    programSlug: "medical-administrative-assistant",
    employer: "Prestonwood Family Medicine",
    year: 2025,
  },
];
