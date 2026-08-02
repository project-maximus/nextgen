import { CTABand } from "@/components/sections/CTABand";
import { FeatureRow } from "@/components/sections/FeatureRow";
import { Hero } from "@/components/sections/Hero";
import { JourneyStrip } from "@/components/sections/JourneyStrip";
import { ConvictionQuote } from "@/components/sections/ConvictionQuote";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { ProgramFinder } from "@/components/sections/ProgramFinder";
import { StatsBand } from "@/components/sections/StatsBand";
import { TestimonialMarquee } from "@/components/sections/TestimonialMarquee";
import { RequestInfoForm } from "@/components/forms/RequestInfoForm";
import { formatCohortDate, getNextClassStart } from "@/content/dates";
import { programs } from "@/content/programs";
import { partners } from "@/content/partners";
import { testimonials } from "@/content/testimonials";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Accredited Healthcare Career Training in Dallas–Fort Worth",
  description:
    "NextGen Health Institute offers 11 AMCA-accredited healthcare certification programs, 6–24 weeks, in Dallas, TX. Request info or apply today.",
  path: "/",
});

const journeySteps = [
  { number: 1, title: "Weeks 1–4 · Classroom", description: "Core knowledge, terminology, and foundations.", image: "/images/campus/classroom.jpg" },
  { number: 2, title: "Weeks 5–8 · Hands-on lab", description: "Real equipment, real technique, real supervision.", image: "/images/campus/lab.jpg" },
  { number: 3, title: "Weeks 9–11 · Clinical externship", description: "Supervised, real-world practice at a partner site.", image: "/images/campus/skills-lab.jpg" },
  { number: 4, title: "Week 12 · Certification exam", description: "Sit your exam right here, on campus.", image: "/images/campus/exterior.jpg" },
  { number: 5, title: "After · Job placement support", description: "Advisors help you land the first offer.", image: "/images/campus/graduation.jpg" },
];

export default function HomePage() {
  const nextClassStart = getNextClassStart();

  return (
    <>
      <Hero
        variant="home"
        title="Start Your Healthcare Career In Months, Not Years With NextGen Health Institute"
        subhead="Get the high-quality healthcare training you need to start a rewarding career. With experienced instructors, hands-on training, and flexible scheduling, we make it easy to transform your future."
        primaryCta={{ label: "Request Information", href: "/contact?type=info" }}
        secondaryCta={{ label: "View Programs", href: "/programs" }}
        trustBadges={[
          { name: "AMCA Accredited", description: "AMCA-accredited healthcare certification training." },
          { name: "Pearson VUE Testing Site", description: "Sit your certification exam right on campus." },
          { name: "30+ years", description: "Training Texans for healthcare careers since 1992." },
        ]}
        collageImages={["/images/campus/lab.jpg", "/images/campus/classroom.jpg", "/images/campus/graduation.jpg"]}
      />

      <StatsBand
        stats={[
          { value: 95, suffix: "%+", label: "Graduate employment rate" },
          { value: 24, prefix: "6–", suffix: " wks", label: "To certified, depending on program" },
          { value: 11, label: "Career programs" },
          { value: 30, suffix: "+ yrs", label: "In Texas" },
        ]}
        footnote="Employment rate: 2024–25 graduating cohorts, self-reported. See individual program pages for program-specific data and sources."
      />

      <ProgramFinder programs={programs} />

      <JourneyStrip steps={journeySteps} />

      <section className="bg-canvas py-16 md:py-24">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-16 px-5 md:px-8 lg:gap-20 lg:px-10">
          <FeatureRow
            eyebrow="Why NextGen Health Institute"
            title="Experienced Faculty"
            description="Learn from healthcare professionals with real-world experience in their fields."
            image="/images/campus/classroom.jpg"
            imageAlt="Instructor teaching a small group of students in a classroom"
            linkLabel="Meet our instructors"
            linkHref="/about"
            imageSide="left"
            imageShape="arch"
          />
          <FeatureRow
            eyebrow="Why NextGen Health Institute"
            title="Small Class Sizes"
            description="Get personalized attention and hands-on training with our low student-to-instructor ratios."
            image="/images/campus/lab.jpg"
            imageAlt="Students practicing clinical skills in a lab"
            linkLabel="See how programs run"
            linkHref="/programs"
            imageSide="right"
            imageShape="sticker"
          />
          <FeatureRow
            eyebrow="Why NextGen Health Institute"
            title="Flexible Scheduling"
            description="Choose from day, evening, and weekend classes to fit your lifestyle and schedule."
            image="/images/campus/students-studying.jpg"
            imageAlt="Students studying together"
            linkLabel="View program schedules"
            linkHref="/programs"
            imageSide="left"
            imageShape="sticker"
          />
          <FeatureRow
            eyebrow="Why NextGen Health Institute"
            title="Career Support"
            description="Get job placement assistance and career guidance to help launch your healthcare career."
            image="/images/campus/graduation.jpg"
            imageAlt="Graduate celebrating with an advisor"
            linkLabel="See student outcomes"
            linkHref="/students"
            imageSide="right"
            imageShape="arch"
          />
        </div>
      </section>

      <ConvictionQuote
        quote="Nobody should need four years and $80,000 of debt to start caring for people."
        name="Michael Osei"
        role="Director of Admissions, NGHI"
        photo="/images/team/advisor.jpg"
      />

      <TestimonialMarquee testimonials={testimonials} />

      <LogoMarquee partners={partners} />

      <CTABand
        eyebrow="Get started"
        title="Ready to Learn More About NextGen Health Institute?"
        description={`Take the first step toward your healthcare career. Our admissions team is here to help you find the right program and answer any questions you may have about our training programs, scheduling, and career opportunities. Next start date: ${formatCohortDate(nextClassStart.startDate)}.`}
        primaryCta={{ label: "Apply Now", href: "/how-it-works/apply" }}
        secondaryCta={{ label: "Request Information", href: "/contact?type=info" }}
      >
        <RequestInfoForm programs={programs} variant="full" title="Request Information" />
      </CTABand>
    </>
  );
}
