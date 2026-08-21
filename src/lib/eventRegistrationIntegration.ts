import type { EventRegistrationValues } from "./registrationSchema";
import type { EventRecord } from "./eventsData";

const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL || "allinonesolutions.rs@gmail.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string) {
  if (!value) return "";
  return `<tr><td style="padding:6px 12px;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(
    label
  )}</td><td style="padding:6px 12px;font-size:14px;color:#111827;">${escapeHtml(value)}</td></tr>`;
}

async function sendViaResend(subject: string, html: string, replyTo: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from = process.env.RESEND_FROM_EMAIL || "Elephant Corporate <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [NOTIFY_EMAIL], reply_to: replyTo, subject, html }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend responded with status ${res.status}: ${body}`);
  }
  return true;
}

export async function notifyEventRegistration(
  event: EventRecord,
  registration: EventRegistrationValues,
  paymentStatus: "free" | "pending"
): Promise<void> {
  const subject = `New registration — ${event.title} (${registration.fullName})`;
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="color:#0f1b2d;margin-bottom:4px;">New event registration</h2>
      <p style="color:#6b7280;font-size:13px;margin-top:0;">${escapeHtml(event.title)} · ${escapeHtml(
        event.city
      )}${event.eventDate ? ` · ${escapeHtml(event.eventDate)}` : ""}</p>
      <table style="border-collapse:collapse;width:100%;">
        ${row("Name", registration.fullName)}
        ${row("Email", registration.email)}
        ${row("Phone", registration.phone)}
        ${row("Company", registration.companyName ?? "")}
        ${row("Attendees", String(registration.attendeeCount))}
        ${row("Notes", registration.notes ?? "")}
        ${row(
          "Payment",
          paymentStatus === "free"
            ? "Free event"
            : `Pending — ${event.currency} ${event.price} due, follow up to collect payment`
        )}
      </table>
    </div>
  `;

  const emailSent = await sendViaResend(subject, html, registration.email).catch((err) => {
    console.error("[elephant-corporate] Event registration email failed:", err);
    return false;
  });

  if (!emailSent) {
    console.log(
      `[elephant-corporate] New event registration (no RESEND_API_KEY configured — would have emailed ${NOTIFY_EMAIL}):`,
      JSON.stringify({ event: event.title, registration }, null, 2)
    );
  }
}
