"use client";

import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { requestInfoSchema, type RequestInfoInput } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { Program } from "@/types";
import { cn } from "@/lib/utils";

export interface RequestInfoFormProps {
  programs: Program[];
  variant?: "full" | "compact-sidebar" | "inline-band";
  defaultProgramSlug?: string;
  formType?: "request-info" | "contact" | "application";
  title?: string;
  className?: string;
}

const CONSENT_TEXT =
  "By submitting this form, I consent to receive calls/texts from NextGen Health Institute. I understand these calls may be generated using automated technology.";

export function RequestInfoForm({
  programs,
  variant = "full",
  defaultProgramSlug,
  formType = "request-info",
  title = "Request info",
  className,
}: RequestInfoFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RequestInfoInput>({
    resolver: zodResolver(requestInfoSchema),
    defaultValues: {
      formType,
      name: "",
      email: "",
      phone: "",
      programSlug: defaultProgramSlug ?? "",
      message: "",
      consent: undefined,
      honeypot: "",
    },
  });

  const onSubmit = async (data: RequestInfoInput) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }
      setSucceeded(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (succeeded) {
    return (
      <div className={cn("flex flex-col items-center gap-3 rounded-lg bg-success-bg p-8 text-center", className)}>
        <CheckCircle2 className="size-10 text-success" aria-hidden="true" />
        <p className="text-h4 font-display text-neutral-900">Thanks — we&rsquo;ve got your request.</p>
        <p className="max-w-sm text-body-sm text-neutral-600">
          An admissions advisor will reach out within one business day to answer your questions and help you
          take the next step.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn("flex flex-col gap-4 rounded-lg bg-white p-6 shadow-sm md:p-8", className)}
    >
      <h3 className="text-h4 font-display text-neutral-900">{title}</h3>

      {/* Honeypot — hidden from real users, bots often fill every field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="rif-website">Leave this field blank</label>
        <input id="rif-website" type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
      </div>

      <FormField id="rif-name" label="Full name" required error={errors.name?.message}>
        <Input placeholder="Jane Doe" autoComplete="name" {...register("name")} />
      </FormField>

      <FormField id="rif-email" label="Email" required error={errors.email?.message}>
        <Input type="email" placeholder="jane@example.com" autoComplete="email" {...register("email")} />
      </FormField>

      <FormField id="rif-phone" label="Phone" required error={errors.phone?.message}>
        <Input type="tel" placeholder="(214) 555-0100" autoComplete="tel" {...register("phone")} />
      </FormField>

      <FormField id="rif-program" label="Program of interest" error={errors.programSlug?.message}>
        <Select {...register("programSlug")} defaultValue={defaultProgramSlug ?? ""}>
          <option value="">Select a program</option>
          {programs.map((program) => (
            <option key={program.slug} value={program.slug}>
              {program.name}
            </option>
          ))}
        </Select>
      </FormField>

      {variant === "full" && (
        <FormField id="rif-message" label="Message (optional)" error={errors.message?.message}>
          <textarea
            id="rif-message"
            rows={3}
            className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus:border-primary-400"
            placeholder="Anything you'd like your advisor to know?"
            {...register("message")}
          />
        </FormField>
      )}

      <Checkbox
        id="rif-consent"
        label={CONSENT_TEXT}
        invalid={Boolean(errors.consent)}
        aria-describedby={errors.consent ? "rif-consent-error" : undefined}
        {...register("consent")}
      />
      {errors.consent && (
        <p id="rif-consent-error" role="alert" className="-mt-2 text-xs text-error">
          {errors.consent.message}
        </p>
      )}

      {submitError && (
        <p role="alert" className="text-body-sm text-error">
          {submitError}
        </p>
      )}

      <Button type="submit" loading={isSubmitting} className="mt-2">
        Request info
      </Button>
    </form>
  );
}
