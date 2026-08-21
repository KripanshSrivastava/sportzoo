import type { LeadFormValues } from "./leadSchema";

/**
 * Integration layer for storing/forwarding a validated lead.
 * Swap the body of `deliverLead` for a real email send (e.g. Resend), CRM
 * push (e.g. HubSpot/Zoho), or database write — nothing outside this file
 * needs to change. Throw on failure so the API route can return a real error
 * instead of a false success message.
 */

export interface LeadRecord extends LeadFormValues {
  submittedAt: string;
  ip: string;
}

export async function deliverLead(lead: LeadRecord): Promise<void> {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (webhookUrl) {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) {
      throw new Error(`Lead webhook responded with status ${res.status}`);
    }
    return;
  }

  // No integration configured yet — log server-side so nothing is silently lost
  // during local development or before LEAD_WEBHOOK_URL is set.
  console.log("[sportzoo] New lead (no LEAD_WEBHOOK_URL configured):", JSON.stringify(lead, null, 2));
}
