"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import type { EventRecord } from "@/lib/eventsData";

type FieldErrors = Partial<Record<"fullName" | "email" | "phone" | "companyName" | "attendeeCount" | "notes", string>>;

const errorClass = "mt-1 text-xs font-medium";
const errorStyle = { color: "#b3261e" };

export function EventRegistrationForm({ event }: { event: EventRecord }) {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    attendeeCount: "1",
    notes: "",
    website: "", // honeypot
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"free" | "pending" | null>(null);

  function update(key: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerMessage(null);

    const nextErrors: FieldErrors = {};
    if (values.fullName.trim().length < 2) nextErrors.fullName = "Enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) nextErrors.email = "Enter a valid email";
    if (!/^[+]?[0-9\s-]{8,15}$/.test(values.phone.trim())) nextErrors.phone = "Enter a valid phone number";
    const attendeeCount = Number(values.attendeeCount) || 1;
    if (attendeeCount < 1 || attendeeCount > 50) nextErrors.attendeeCount = "Enter a number between 1 and 50";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch(`/api/events/${event.slug}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, attendeeCount }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setServerMessage(data.message ?? "Something went wrong. Please try again or call us directly.");
        return;
      }

      trackEvent("form_submit", { service: "event_registration", source_page: `/events/${event.slug}` });
      setPaymentStatus(data.paymentStatus);
      setStatus("success");
    } catch {
      setStatus("error");
      setServerMessage("We couldn't reach our server. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="card p-6 text-sm">
        <p className="m-0 font-semibold text-[color:var(--color-navy-900)]">You&apos;re registered!</p>
        <p className="text-muted mt-2">
          {paymentStatus === "free"
            ? "This is a free event — we'll send you the details closer to the date."
            : `We've reserved your spot for ${event.currency} ${event.price * attendeeCountFromValues(values)}. Our team will contact you shortly to complete payment.`}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[18px]" data-form="event-registration">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
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
          <input id="fullName" className="input" value={values.fullName} onChange={(e) => update("fullName", e.target.value)} />
          {errors.fullName && (
            <p className={errorClass} style={errorStyle}>
              {errors.fullName}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="phone">Phone *</label>
          <input id="phone" className="input" value={values.phone} onChange={(e) => update("phone", e.target.value)} />
          {errors.phone && (
            <p className={errorClass} style={errorStyle}>
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-[18px] sm:grid-cols-2">
        <div className="field">
          <label htmlFor="email">Email *</label>
          <input id="email" type="email" className="input" value={values.email} onChange={(e) => update("email", e.target.value)} />
          {errors.email && (
            <p className={errorClass} style={errorStyle}>
              {errors.email}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="companyName">Company (optional)</label>
          <input id="companyName" className="input" value={values.companyName} onChange={(e) => update("companyName", e.target.value)} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="attendeeCount">Number of attendees</label>
        <input
          id="attendeeCount"
          type="number"
          min={1}
          max={50}
          className="input"
          value={values.attendeeCount}
          onChange={(e) => update("attendeeCount", e.target.value)}
        />
        {errors.attendeeCount && (
          <p className={errorClass} style={errorStyle}>
            {errors.attendeeCount}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="notes">Anything we should know? (optional)</label>
        <textarea id="notes" className="input" rows={3} value={values.notes} onChange={(e) => update("notes", e.target.value)} />
      </div>

      {serverMessage && (
        <p className="text-sm font-medium" style={errorStyle}>
          {serverMessage}
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
        {status === "submitting"
          ? "Registering…"
          : event.price > 0
            ? `Register — ${event.currency} ${event.price} per attendee`
            : "Register for free"}
      </button>
    </form>
  );
}

function attendeeCountFromValues(values: { attendeeCount: string }) {
  return Number(values.attendeeCount) || 1;
}
