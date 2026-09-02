"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { leadFormDefaults, leadFormSchema, serviceOptions, budgetOptions, LeadFormValues } from "@/lib/leadSchema";
import { captureAttribution } from "@/lib/utm";
import { trackEvent } from "@/lib/analytics";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";

type FieldErrors = Partial<Record<keyof LeadFormValues, string>>;

const errorClass = "mt-1 text-xs font-medium";
const errorStyle = { color: "#b3261e" };

export function QuoteForm({ defaultService, sourcePage }: { defaultService?: string; sourcePage: string }) {
  const router = useRouter();
  const { responsePromise } = useSiteConfig();
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
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[18px]" data-form="lead-quote">
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

      <div className="grid gap-[18px] sm:grid-cols-2">
        <div className="field">
          <label htmlFor="fullName">Full name *</label>
          <input
            id="fullName"
            className="input"
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
          {errors.fullName && (
            <p id="fullName-error" className={errorClass} style={errorStyle}>
              {errors.fullName}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="companyName">Company name *</label>
          <input
            id="companyName"
            className="input"
            value={values.companyName}
            onChange={(e) => update("companyName", e.target.value)}
            aria-invalid={!!errors.companyName}
            aria-describedby={errors.companyName ? "companyName-error" : undefined}
          />
          {errors.companyName && (
            <p id="companyName-error" className={errorClass} style={errorStyle}>
              {errors.companyName}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="workEmail">Work email *</label>
          <input
            id="workEmail"
            type="email"
            className="input"
            value={values.workEmail}
            onChange={(e) => update("workEmail", e.target.value)}
            aria-invalid={!!errors.workEmail}
            aria-describedby={errors.workEmail ? "workEmail-error" : undefined}
          />
          {errors.workEmail && (
            <p id="workEmail-error" className={errorClass} style={errorStyle}>
              {errors.workEmail}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="phone">Phone number *</label>
          <input
            id="phone"
            type="tel"
            className="input"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className={errorClass} style={errorStyle}>
              {errors.phone}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="service">Service required *</label>
          <select
            id="service"
            className="input"
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

        <div className="field">
          <label htmlFor="eventType">Event type</label>
          <input
            id="eventType"
            className="input"
            placeholder="e.g. Annual day, product launch, conference"
            value={values.eventType}
            onChange={(e) => update("eventType", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="preferredDate">Preferred date</label>
          <input
            id="preferredDate"
            type="date"
            className="input"
            value={values.preferredDate}
            onChange={(e) => update("preferredDate", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="attendeeCount">Number of attendees / guests</label>
          <input
            id="attendeeCount"
            className="input"
            placeholder="e.g. 50"
            value={values.attendeeCount}
            onChange={(e) => update("attendeeCount", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="destinationOrCity">Destination or event city</label>
          <input
            id="destinationOrCity"
            className="input"
            value={values.destinationOrCity}
            onChange={(e) => update("destinationOrCity", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="budget">Estimated budget</label>
          <select
            id="budget"
            className="input"
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

      <div className="field">
        <label htmlFor="requirements">Additional requirements</label>
        <textarea
          id="requirements"
          rows={4}
          className="input"
          value={values.requirements}
          onChange={(e) => update("requirements", e.target.value)}
        />
      </div>

      <div>
        <label className="flex items-start gap-2.5 text-[13px]" style={{ color: "var(--color-neutral-700)" }}>
          <input
            type="checkbox"
            className="mt-0.5"
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          I agree to be contacted by Elephant Corporate about my enquiry and consent to my information being processed
          as described in the{" "}
          <a href="/privacy-policy" className="underline">
            Privacy Policy
          </a>
          . *
        </label>
        {errors.consent && (
          <p id="consent-error" className={errorClass} style={errorStyle}>
            {errors.consent}
          </p>
        )}
      </div>

      {serverMessage && (
        <p
          role="alert"
          className="px-4 py-3 text-sm font-medium"
          style={{ background: "color-mix(in srgb, #b3261e 10%, transparent)", color: "#b3261e" }}
        >
          {serverMessage}
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} data-cta="quote-form-submit" className="btn btn-primary btn-block p-3.5 text-base">
        {status === "submitting" ? "Sending your enquiry…" : "Get My Custom Quote"}
      </button>
      <p className="m-0 text-center text-xs" style={{ color: "var(--color-neutral-600)" }}>
        Your details are used only to respond to this enquiry
        {responsePromise ? `, and we typically respond ${responsePromise}` : ""}.
      </p>
    </form>
  );
}
