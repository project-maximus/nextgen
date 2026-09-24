"use client";

import { ChoicePills, ConsentCheckbox, Field, Honeypot, SelectInput, TextArea, TextInput } from "@/components/forms/Field";
import { useToast } from "@/components/ui/Toast";
import { educationLevels, referralSources, requiredDocuments, schedulePreferences } from "@/content/admissions";
import { formatCohortDate, getUpcomingDatesForProgram, getUpcomingStartDates } from "@/content/dates";
import { programs } from "@/content/programs";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { applicationSchema, type ApplicationInput } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm, useWatch, type FieldPath } from "react-hook-form";

const STEPS: { title: string; fields: FieldPath<ApplicationInput>[] }[] = [
  { title: "Program", fields: ["programSlug", "startDate", "schedule"] },
  {
    title: "About you",
    fields: ["firstName", "lastName", "email", "phone", "dateOfBirth", "street", "city", "state", "zip"],
  },
  { title: "Education", fields: ["education", "schoolName", "graduationYear"] },
  {
    title: "Emergency contact",
    fields: ["emergencyName", "emergencyRelationship", "emergencyPhone", "referralSource", "notes", "consent"],
  },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function ApplicationForm() {
  const params = useSearchParams();
  const { showToast } = useToast();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState<{ name: string; program: string; start: string } | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const programParam = params.get("program");
  const initialProgram = programs.some((p) => p.slug === programParam) ? programParam! : "";

  const {
    register,
    control,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    mode: "onTouched",
    defaultValues: {
      formType: "application",
      programSlug: initialProgram,
      startDate: "",
      state: "TX",
      honeypot: "",
    },
  });

  const programSlug = useWatch({ control, name: "programSlug" });
  const startOptions = useMemo(() => {
    const dates = programSlug ? getUpcomingDatesForProgram(programSlug).map((d) => d.startDate) : [];
    return dates.length ? dates : getUpcomingStartDates(3);
  }, [programSlug]);

  // Keep the chosen start date valid when the program changes.
  useEffect(() => {
    const current = getValues("startDate");
    if (current && !startOptions.includes(current)) setValue("startDate", "");
  }, [startOptions, getValues, setValue]);

  const scrollToTop = () => {
    const el = topRef.current;
    if (el && el.getBoundingClientRect().top < 0) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
    }
  };

  const next = async () => {
    const valid = await trigger(STEPS[step].fields, { shouldFocus: true });
    if (valid) {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
      scrollToTop();
    }
  };

  const back = () => {
    setStep((s) => Math.max(s - 1, 0));
    scrollToTop();
  };

  const onSubmit = async (data: ApplicationInput) => {
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "We couldn't submit your application. Please call us instead.");
      setSubmitted({
        name: data.firstName,
        program: programs.find((p) => p.slug === data.programSlug)?.name ?? "your program",
        start: formatCohortDate(data.startDate),
      });
      scrollToTop();
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "We couldn't submit your application. Please call us instead.");
    }
  };

  // If validation fails on submit (e.g. a field on an earlier step), jump to that step.
  const onInvalid = (errs: Partial<Record<FieldPath<ApplicationInput>, unknown>>) => {
    const firstBad = STEPS.findIndex((s) => s.fields.some((f) => f in errs));
    if (firstBad >= 0 && firstBad !== step) setStep(firstBad);
  };

  if (submitted) {
    return (
      <div ref={topRef} role="status" className="py-4">
        <span className="flex size-12 items-center justify-center rounded-full bg-[var(--color-v4-ink-900)] text-white">
          <Check className="size-5" strokeWidth={2} aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-[clamp(1.5rem,1.1rem+1.4vw,2rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[var(--color-v4-text)]">
          Application received, {submitted.name}.
        </h3>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-[var(--color-v4-text-2)]">
          You&apos;ve applied to {submitted.program}, starting {submitted.start}. An admissions advisor will review it
          within 3–5 business days and reach out to schedule your interview.
        </p>
        <div className="mt-8 rounded-[20px] bg-[var(--color-v4-mist)] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-v4-text-3)]">
            Next: gather your documents
          </p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {requiredDocuments.map((doc) => (
              <li key={doc} className="flex items-start gap-2.5 text-sm text-[var(--color-v4-text)]">
                <Check className="mt-0.5 size-4 shrink-0 text-[var(--color-v4-text-3)]" strokeWidth={2} aria-hidden="true" />
                {doc}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-sm text-[var(--color-v4-text-2)]">
          Questions in the meantime? Call{" "}
          <a href={site.phoneHref} className="font-semibold text-[var(--color-v4-text)] underline-offset-4 hover:underline">
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div ref={topRef}>
      {/* Stepper */}
      <ol className="grid grid-cols-4 gap-2" aria-label="Application progress">
        {STEPS.map((s, i) => {
          const state = i < step ? "done" : i === step ? "current" : "todo";
          return (
            <li key={s.title} aria-current={state === "current" ? "step" : undefined}>
              <button
                type="button"
                disabled={i > step}
                onClick={() => i < step && setStep(i)}
                className="group flex w-full flex-col items-start text-left disabled:cursor-default"
              >
                <span
                  className={cn(
                    "h-1 w-full rounded-full transition-colors duration-300",
                    state === "todo" ? "bg-[var(--color-v4-line)]" : "bg-[var(--color-v4-ink-900)]",
                  )}
                />
                <span className="mt-3 flex items-baseline gap-2">
                  <span className="tnum text-xs text-[var(--color-v4-text-3)]">{pad(i + 1)}</span>
                  <span
                    className={cn(
                      "hidden text-sm font-medium sm:inline",
                      state === "todo" ? "text-[var(--color-v4-text-3)]" : "text-[var(--color-v4-text)]",
                      state === "done" && "group-hover:underline group-hover:underline-offset-4",
                    )}
                  >
                    {s.title}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-sm font-medium text-[var(--color-v4-text)] sm:hidden">
        Step {step + 1} of {STEPS.length} · {STEPS[step].title}
      </p>

      <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate className="relative mt-10">
        <Honeypot {...register("honeypot")} />
        <input type="hidden" {...register("formType")} />

        {step === 0 && (
          <div className="flex flex-col gap-6">
            <StepHeading title="Which program are you applying to?" body="You can change programs later with your advisor." />
            <Field label="Program" htmlFor="app-program" error={errors.programSlug?.message}>
              <SelectInput id="app-program" invalid={!!errors.programSlug} {...register("programSlug")}>
                <option value="">Select a program…</option>
                {programs.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name} · {p.duration}
                  </option>
                ))}
              </SelectInput>
            </Field>
            <Field
              label="Preferred start date"
              htmlFor="app-start"
              error={errors.startDate?.message}
              hint="New classes begin monthly."
            >
              <SelectInput id="app-start" invalid={!!errors.startDate} {...register("startDate")}>
                <option value="">Select a start date…</option>
                {startOptions.map((d) => (
                  <option key={d} value={d}>
                    {formatCohortDate(d)}
                  </option>
                ))}
              </SelectInput>
            </Field>
            <Controller
              control={control}
              name="schedule"
              render={({ field }) => (
                <ChoicePills
                  name="schedule"
                  legend="Class schedule"
                  options={schedulePreferences.map((v) => ({ value: v, label: v }))}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.schedule?.message}
                />
              )}
            />
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-6">
            <StepHeading title="Tell us about you." body="We use this to set up your student file." />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field label="First name" htmlFor="app-first" error={errors.firstName?.message}>
                <TextInput id="app-first" autoComplete="given-name" invalid={!!errors.firstName} {...register("firstName")} />
              </Field>
              <Field label="Last name" htmlFor="app-last" error={errors.lastName?.message}>
                <TextInput id="app-last" autoComplete="family-name" invalid={!!errors.lastName} {...register("lastName")} />
              </Field>
              <Field label="Email address" htmlFor="app-email" error={errors.email?.message}>
                <TextInput id="app-email" type="email" autoComplete="email" invalid={!!errors.email} {...register("email")} />
              </Field>
              <Field label="Phone number" htmlFor="app-phone" error={errors.phone?.message}>
                <TextInput id="app-phone" type="tel" autoComplete="tel" invalid={!!errors.phone} {...register("phone")} />
              </Field>
              <Field label="Date of birth" htmlFor="app-dob" error={errors.dateOfBirth?.message}>
                <TextInput id="app-dob" type="date" autoComplete="bday" invalid={!!errors.dateOfBirth} {...register("dateOfBirth")} />
              </Field>
            </div>
            <Field label="Street address" htmlFor="app-street" error={errors.street?.message}>
              <TextInput id="app-street" autoComplete="street-address" invalid={!!errors.street} {...register("street")} />
            </Field>
            <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-[1fr_88px_120px] sm:gap-6">
              <Field label="City" htmlFor="app-city" error={errors.city?.message} className="col-span-2 sm:col-span-1">
                <TextInput id="app-city" autoComplete="address-level2" invalid={!!errors.city} {...register("city")} />
              </Field>
              <Field label="State" htmlFor="app-state" error={errors.state?.message}>
                <TextInput
                  id="app-state"
                  autoComplete="address-level1"
                  maxLength={2}
                  className="uppercase"
                  invalid={!!errors.state}
                  {...register("state", { setValueAs: (v: string) => v.toUpperCase() })}
                />
              </Field>
              <Field label="ZIP" htmlFor="app-zip" error={errors.zip?.message}>
                <TextInput id="app-zip" inputMode="numeric" autoComplete="postal-code" invalid={!!errors.zip} {...register("zip")} />
              </Field>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-6">
            <StepHeading
              title="Your education."
              body="A high school diploma or GED is required. You'll send official transcripts after applying."
            />
            <Field label="Highest education completed" htmlFor="app-edu" error={errors.education?.message}>
              <SelectInput id="app-edu" invalid={!!errors.education} defaultValue="" {...register("education")}>
                <option value="" disabled>
                  Select…
                </option>
                {educationLevels.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </SelectInput>
            </Field>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1fr_160px]">
              <Field label="School name" htmlFor="app-school" error={errors.schoolName?.message}>
                <TextInput id="app-school" invalid={!!errors.schoolName} {...register("schoolName")} />
              </Field>
              <Field label="Year completed" htmlFor="app-year" error={errors.graduationYear?.message}>
                <TextInput
                  id="app-year"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="YYYY"
                  invalid={!!errors.graduationYear}
                  {...register("graduationYear")}
                />
              </Field>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-6">
            <StepHeading title="Emergency contact." body="Someone we can reach if we can't reach you." />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field label="Full name" htmlFor="app-em-name" error={errors.emergencyName?.message}>
                <TextInput id="app-em-name" invalid={!!errors.emergencyName} {...register("emergencyName")} />
              </Field>
              <Field label="Relationship" htmlFor="app-em-rel" error={errors.emergencyRelationship?.message}>
                <TextInput
                  id="app-em-rel"
                  placeholder="e.g. Parent, spouse"
                  invalid={!!errors.emergencyRelationship}
                  {...register("emergencyRelationship")}
                />
              </Field>
              <Field label="Phone number" htmlFor="app-em-phone" error={errors.emergencyPhone?.message}>
                <TextInput id="app-em-phone" type="tel" invalid={!!errors.emergencyPhone} {...register("emergencyPhone")} />
              </Field>
              <Field label="How did you hear about us?" htmlFor="app-ref" optional>
                <SelectInput
                  id="app-ref"
                  defaultValue=""
                  {...register("referralSource", { setValueAs: (v: string) => (v === "" ? undefined : v) })}
                >
                  <option value="">Select…</option>
                  {referralSources.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </SelectInput>
              </Field>
            </div>
            <Field label="Anything else we should know?" htmlFor="app-notes" optional>
              <TextArea id="app-notes" placeholder="Questions, scheduling needs, financial aid interest…" {...register("notes")} />
            </Field>
            <ConsentCheckbox id="app-consent" invalid={!!errors.consent} error={errors.consent?.message} {...register("consent")} />
          </div>
        )}

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-[var(--color-v4-line)] pt-8">
          {step > 0 ? (
            <button
              type="button"
              onClick={back}
              className="inline-flex h-12 items-center gap-2 rounded-full px-2 text-[15px] font-semibold text-[var(--color-v4-text-2)] transition-colors hover:text-[var(--color-v4-text)]"
            >
              <ArrowLeft className="size-4" strokeWidth={1.75} aria-hidden="true" />
              Back
            </button>
          ) : (
            <span className="text-[13px] text-[var(--color-v4-text-3)]">Takes about 10 minutes</span>
          )}

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--color-v4-ink-900)] px-8 text-[15px] font-semibold text-white transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-[var(--color-v4-ink-800)]"
            >
              Continue
              <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--color-v4-ink-900)] px-8 text-[15px] font-semibold text-white transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-[var(--color-v4-ink-800)] disabled:translate-y-0 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Submitting…
                </>
              ) : (
                <>
                  Submit application
                  <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function StepHeading({ title, body }: { title: string; body: string }) {
  return (
    <div className="mb-2">
      <h3 className="text-[clamp(1.375rem,1.1rem+0.9vw,1.75rem)] font-normal leading-[1.2] tracking-[-0.01em] text-[var(--color-v4-text)]">
        {title}
      </h3>
      <p className="mt-2 text-sm text-[var(--color-v4-text-2)]">{body}</p>
    </div>
  );
}
