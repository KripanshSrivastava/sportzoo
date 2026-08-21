import type { LeadFormValues } from "./leadSchema";

/**
 * Integration layer for storing/forwarding a validated lead.
 * Nothing outside this file needs to change if the delivery method changes
 * later (CRM push, database write, etc). Throw on failure so the API route
 * returns a real error instead of a false success message.
 */

export interface LeadRecord extends LeadFormValues {
  submittedAt: string;
  ip: string;
}

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

function buildEmailHtml(lead: LeadRecord): string {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="color:#0f1b2d;margin-bottom:4px;">New enquiry — ${escapeHtml(lead.service)}</h2>
      <p style="color:#6b7280;font-size:13px;margin-top:0;">Submitted ${new Date(lead.submittedAt).toLocaleString(
        "en-IN",
        { dateStyle: "medium", timeStyle: "short" }
      )}</p>
      <table style="border-collapse:collapse;width:100%;">
        ${row("Full name", lead.fullName)}
        ${row("Company", lead.companyName)}
        ${row("Work email", lead.workEmail)}
        ${row("Phone", lead.phone)}
        ${row("Service", lead.service)}
        ${row("Event type", lead.eventType ?? "")}
        ${row("Preferred date", lead.preferredDate ?? "")}
        ${row("Attendees / guests", lead.attendeeCount ?? "")}
        ${row("Destination / city", lead.destinationOrCity ?? "")}
        ${row("Budget", lead.budget ?? "")}
        ${row("Requirements", lead.requirements ?? "")}
        ${row("Landing page", lead.landingPage ?? "")}
        ${row("UTM source", lead.utmSource ?? "")}
        ${row("UTM medium", lead.utmMedium ?? "")}
        ${row("UTM campaign", lead.utmCampaign ?? "")}
        ${row("Referrer", lead.referrer ?? "")}
        ${row("IP", lead.ip)}
      </table>
    </div>
  `;
}

async function sendViaResend(lead: LeadRecord): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from = process.env.RESEND_FROM_EMAIL || "Elephant Corporate Leads <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [NOTIFY_EMAIL],
      reply_to: lead.workEmail,
      subject: `New Elephant Corporate enquiry — ${lead.companyName} (${lead.service})`,
      html: buildEmailHtml(lead),
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend responded with status ${res.status}: ${body}`);
  }
  return true;
}

async function sendViaWebhook(lead: LeadRecord): Promise<boolean> {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) return false;

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  if (!res.ok) {
    throw new Error(`Lead webhook responded with status ${res.status}`);
  }
  return true;
}

export async function deliverLead(lead: LeadRecord): Promise<void> {
  const emailSent = await sendViaResend(lead);
  const webhookSent = await sendViaWebhook(lead);

  if (!emailSent && !webhookSent) {
    // No integration configured yet — log server-side so nothing is silently
    // lost during local development or before RESEND_API_KEY is set.
    console.log(
      `[elephant-corporate] New lead (no RESEND_API_KEY or LEAD_WEBHOOK_URL configured — would have emailed ${NOTIFY_EMAIL}):`,
      JSON.stringify(lead, null, 2)
    );
  }
}
