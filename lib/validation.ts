import { z } from "zod";

/** Shared client+server validation for every lead-capture form. */
export const requestInfoSchema = z.object({
  formType: z.enum(["request-info", "contact", "application"]),
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number")
    .regex(/^[0-9()+\-.\s]+$/, "Enter a valid phone number"),
  programSlug: z.string().optional(),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal(true, { message: "You must consent to be contacted to continue" }),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

export type RequestInfoInput = z.infer<typeof requestInfoSchema>;
