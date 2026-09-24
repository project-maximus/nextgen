"use client";

import { ChoicePills, ConsentCheckbox, Field, Honeypot, SelectInput, TextArea, TextInput } from "@/components/forms/Field";
import { useToast } from "@/components/ui/Toast";
import { contactTopics, type ContactTopic } from "@/content/admissions";
import { programs } from "@/content/programs";
import { requestInfoSchema, type RequestInfoInput } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const topicValues = contactTopics.map((t) => t.value) as string[];

export function ContactForm() {
  const params = useSearchParams();
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState<string | null>(null);

  // Supports the old site's /contact?type=info|apply links plus our own topics.
  const typeParam = params.get("type");
  const initialTopic = (typeParam && topicValues.includes(typeParam) ? typeParam : "info") as ContactTopic;
  const programParam = params.get("program");
  const initialProgram = programs.some((p) => p.slug === programParam) ? programParam! : "";

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RequestInfoInput>({
    resolver: zodResolver(requestInfoSchema),
    defaultValues: {
      formType: "contact",
      topic: initialTopic,
      programSlug: initialProgram,
      name: "",
      email: "",
      phone: "",
      message: "",
      honeypot: "",
    },
  });

  // In-page links like "Schedule a tour" change ?type= without remounting the form.
  useEffect(() => {
    if (typeParam && topicValues.includes(typeParam)) setValue("topic", typeParam as ContactTopic);
  }, [typeParam, setValue]);

  const onSubmit = async (data: RequestInfoInput) => {
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Something went wrong. Please call us instead.");
      setSubmitted(data.name.split(" ")[0]);
      reset();
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Something went wrong. Please call us instead.");
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-[520px] flex-col items-start justify-center" role="status">
        <span className="flex size-12 items-center justify-center rounded-full bg-[var(--color-v4-ink-900)] text-white">
          <Check className="size-5" strokeWidth={2} aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-[clamp(1.5rem,1.1rem+1.4vw,2rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[var(--color-v4-text)]">
          Thanks, {submitted} — we&apos;ve got your message.
        </h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-[var(--color-v4-text-2)]">
          An admissions advisor will get back to you within 24 hours. Want to skip the wait? Start your application now.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/how-it-works/apply"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--color-v4-ink-900)] px-7 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--color-v4-ink-800)]"
          >
            Start application
            <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setSubmitted(null)}
            className="inline-flex h-12 items-center rounded-full border border-[var(--color-v4-line)] px-7 text-[15px] font-semibold text-[var(--color-v4-text)] transition-colors hover:bg-[var(--color-v4-mist)]"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative flex flex-col gap-6">
      <Honeypot {...register("honeypot")} />
      <input type="hidden" {...register("formType")} />

      <Controller
        control={control}
        name="topic"
        render={({ field }) => (
          <ChoicePills
            name="topic"
            legend="How can we help?"
            options={contactTopics}
            value={field.value as ContactTopic | undefined}
            onChange={field.onChange}
          />
        )}
      />

      <Field label="Full name" htmlFor="contact-name" error={errors.name?.message}>
        <TextInput id="contact-name" autoComplete="name" invalid={!!errors.name} {...register("name")} />
      </Field>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Email address" htmlFor="contact-email" error={errors.email?.message}>
          <TextInput
            id="contact-email"
            type="email"
            autoComplete="email"
            invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
        <Field label="Phone number" htmlFor="contact-phone" error={errors.phone?.message}>
          <TextInput
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            invalid={!!errors.phone}
            {...register("phone")}
          />
        </Field>
      </div>

      <Field label="Program of interest" htmlFor="contact-program" optional>
        <SelectInput id="contact-program" {...register("programSlug")}>
          <option value="">Not sure yet</option>
          {programs.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </SelectInput>
      </Field>

      <Field label="Message" htmlFor="contact-message" optional error={errors.message?.message}>
        <TextArea
          id="contact-message"
          placeholder="Tell us about your goals and any questions you have..."
          invalid={!!errors.message}
          {...register("message")}
        />
      </Field>

      <ConsentCheckbox
        id="contact-consent"
        invalid={!!errors.consent}
        error={errors.consent?.message}
        {...register("consent")}
      />

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--color-v4-ink-900)] px-8 text-[15px] font-semibold text-white transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-[var(--color-v4-ink-800)] disabled:translate-y-0 disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
            </>
          )}
        </button>
        <p className="text-[13px] text-[var(--color-v4-text-3)]">We reply within 24 hours.</p>
      </div>
    </form>
  );
}
