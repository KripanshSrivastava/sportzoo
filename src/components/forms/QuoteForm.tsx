"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { leadFormDefaults, leadFormSchema, serviceOptions, budgetOptions, LeadFormValues } from "@/lib/leadSchema";
import { captureAttribution } from "@/lib/utm";
import { trackEvent } from "@/lib/analytics";

type FieldErrors = Partial<Record<keyof LeadFormValues, string>>;

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[color:var(--color-electric)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-electric)]/30";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";
const errorClass = "mt-1 text-xs font-medium text-red-600";

export function QuoteForm({ defaultService, sourcePage }: { defaultService?: string; sourcePage: string }) {
  const router = useRouter();
  const [values, setValues] = useState<LeadFormValues>({
    ...leadFormDefaults,
    service: (defaultService as LeadFormValues["service"]) ?? leadFormDefaults.service,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  function update<K extends keyof LeadFormValues>(key: K, value: LeadFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerMessage(null);

    const attribution = captureAttribution();
    const payload: LeadFormValues = {
      ...values,
      utmSource: attribution.utmSource,
      utmMedium: attribution.utmMedium,
      utmCampaign: attribution.utmCampaign,
      landingPage: attribution.landingPage || sourcePage,
      referrer: attribution.referrer,
    };

    const parsed = leadFormSchema.safeParse(payload);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const next: FieldErrors = {};
      (Object.keys(flat) as (keyof LeadFormValues)[]).forEach((k) => {
        const msg = flat[k]?.[0];
        if (msg) next[k] = msg;
      });
      setErrors(next);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setServerMessage(data.message ?? "Something went wrong. Please try again or call us directly.");
        return;
      }

      trackEvent("form_submit", { service: values.service, source_page: sourcePage });
      router.push("/thank-you");
    } catch {
      setStatus("error");
      setServerMessage("We couldn't reach our server. Please check your connection and try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5" data-form="lead-quote">
      {/* Honeypot — hidden from real users, bots tend to fill every field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full name *
          </label>
          <input
            id="fullName"
            className={inputClass}
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
          {errors.fullName && <p id="fullName-error" className={errorClass}>{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="companyName" className={labelClass}>
            Company name *
          </label>
          <input
            id="companyName"
            className={inputClass}
            value={values.companyName}
            onChange={(e) => update("companyName", e.target.value)}
            aria-invalid={!!errors.companyName}
            aria-describedby={errors.companyName ? "companyName-error" : undefined}
          />
          {errors.companyName && <p id="companyName-error" className={errorClass}>{errors.companyName}</p>}
        </div>

        <div>
          <label htmlFor="workEmail" className={labelClass}>
            Work email *
          </label>
          <input
            id="workEmail"
            type="email"
            className={inputClass}
            value={values.workEmail}
            onChange={(e) => update("workEmail", e.target.value)}
            aria-invalid={!!errors.workEmail}
            aria-describedby={errors.workEmail ? "workEmail-error" : undefined}
          />
          {errors.workEmail && <p id="workEmail-error" className={errorClass}>{errors.workEmail}</p>}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone number *
          </label>
          <input
            id="phone"
            type="tel"
            className={inputClass}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && <p id="phone-error" className={errorClass}>{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="service" className={labelClass}>
            Service required *
          </label>
          <select
            id="service"
            className={inputClass}
            value={values.service}
            onChange={(e) => update("service", e.target.value as LeadFormValues["service"])}
          >
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="eventType" className={labelClass}>
            Event type
          </label>
          <input
            id="eventType"
            className={inputClass}
            placeholder="e.g. Annual day, product launch, conference"
            value={values.eventType}
            onChange={(e) => update("eventType", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="preferredDate" className={labelClass}>
            Preferred date
          </label>
          <input
            id="preferredDate"
            type="date"
            className={inputClass}
            value={values.preferredDate}
            onChange={(e) => update("preferredDate", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="attendeeCount" className={labelClass}>
            Number of attendees / guests
          </label>
          <input
            id="attendeeCount"
            className={inputClass}
            placeholder="e.g. 50"
            value={values.attendeeCount}
            onChange={(e) => update("attendeeCount", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="destinationOrCity" className={labelClass}>
            Destination or event city
          </label>
          <input
            id="destinationOrCity"
            className={inputClass}
            value={values.destinationOrCity}
            onChange={(e) => update("destinationOrCity", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="budget" className={labelClass}>
            Estimated budget
          </label>
          <select
            id="budget"
            className={inputClass}
            value={values.budget ?? ""}
            onChange={(e) => update("budget", e.target.value as LeadFormValues["budget"])}
          >
            <option value="">Select a range</option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="requirements" className={labelClass}>
          Additional requirements
        </label>
        <textarea
          id="requirements"
          rows={4}
          className={inputClass}
          value={values.requirements}
          onChange={(e) => update("requirements", e.target.value)}
        />
      </div>

      <div>
        <label className="flex items-start gap-2.5 text-sm text-slate-600">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[color:var(--color-electric)] focus:ring-[color:var(--color-electric)]"
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          I agree to be contacted by Sportzoo about my enquiry and consent to my information being processed
          as described in the{" "}
          <a href="/privacy-policy" className="underline hover:text-[color:var(--color-navy-900)]">
            Privacy Policy
          </a>
          . *
        </label>
        {errors.consent && <p id="consent-error" className={errorClass}>{errors.consent}</p>}
      </div>

      {serverMessage && (
        <p role="alert" className="rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {serverMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        data-cta="quote-form-submit"
        className="w-full rounded-md bg-[color:var(--color-accent)] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[color:var(--color-accent-dark)] disabled:opacity-60"
      >
        {status === "submitting" ? "Sending your enquiry…" : "Get My Custom Quote"}
      </button>
      <p className="text-center text-xs text-slate-500">
        We typically respond within 24 business hours. No spam, ever.
      </p>
    </form>
  );
}
