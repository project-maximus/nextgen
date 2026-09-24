import { contactTopics, educationLevels, referralSources, schedulePreferences } from "@/content/admissions";
import { z } from "zod";

const phone = z
  .string()
  .trim()
  .min(10, "Enter a valid phone number")
  .regex(/^[0-9()+\-.\s]+$/, "Enter a valid phone number");

/** Shared client+server validation for every lead-capture form. */
export const requestInfoSchema = z.object({
  formType: z.enum(["request-info", "contact", "application"]),
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone,
  programSlug: z.string().optional(),
  topic: z.enum(contactTopics.map((t) => t.value) as [string, ...string[]]).optional(),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal(true, { message: "You must consent to be contacted to continue" }),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

export type RequestInfoInput = z.infer<typeof requestInfoSchema>;

/** Online application — the fields the live site lists for step 1 of its application process. */
export const applicationSchema = z.object({
  formType: z.literal("application"),
  // Program selection
  programSlug: z.string().min(1, "Choose a program"),
  startDate: z.string().min(1, "Choose a start date"),
  schedule: z.enum(schedulePreferences, { message: "Choose a schedule" }),
  // Personal and contact information
  firstName: z.string().trim().min(1, "Enter your first name"),
  lastName: z.string().trim().min(1, "Enter your last name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone,
  dateOfBirth: z
    .string()
    .min(1, "Enter your date of birth")
    .refine((v) => {
      const dob = new Date(`${v}T12:00:00`);
      if (Number.isNaN(dob.getTime())) return false;
      const age = (Date.now() - dob.getTime()) / (365.25 * 24 * 3600 * 1000);
      return age >= 16 && age < 100;
    }, "Enter a valid date of birth"),
  street: z.string().trim().min(3, "Enter your street address"),
  city: z.string().trim().min(2, "Enter your city"),
  state: z.string().trim().length(2, "Use the 2-letter state code"),
  zip: z.string().trim().regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code"),
  // Educational history
  education: z.enum(educationLevels, { message: "Choose your highest education" }),
  schoolName: z.string().trim().min(2, "Enter your school name"),
  graduationYear: z
    .string()
    .trim()
    .regex(/^(19|20)\d{2}$/, "Enter a 4-digit year"),
  // Emergency contact details
  emergencyName: z.string().trim().min(2, "Enter a contact name"),
  emergencyRelationship: z.string().trim().min(2, "Enter their relationship to you"),
  emergencyPhone: phone,
  referralSource: z.enum(referralSources).optional(),
  notes: z.string().trim().max(2000).optional(),
  consent: z.literal(true, { message: "You must consent to be contacted to continue" }),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
