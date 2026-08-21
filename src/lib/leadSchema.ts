import { z } from "zod";

export const serviceOptions = [
  "Corporate Offsite Planning",
  "Rewards and Recognition Events",
  "Corporate Annual Day",
  "Corporate Sports Day",
  "Corporate Outings and Team Building",
  "Corporate Gifting",
  "Conferences and Corporate Meetings",
  "Live Music & DJ Booking",
  "Anchors & Emcees",
  "Speakers, Comedians & Specialty Acts",
  "Conference & Meeting Venues",
  "Offsite & Retreat Venues",
  "Banquet & Large-Format Venues",
  "Audio Visual & Production Equipment",
  "Event Decor, Tent & Branding",
  "Event Games & Engagement Activities",
  "Not sure / need advice",
] as const;

export const budgetOptions = [
  "Under ₹2,00,000",
  "₹2,00,000 – ₹5,00,000",
  "₹5,00,000 – ₹15,00,000",
  "₹15,00,000 – ₹50,00,000",
  "Above ₹50,00,000",
  "Prefer to discuss",
] as const;

export const leadFormSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(100),
  companyName: z.string().trim().min(2, "Enter your company name").max(120),
  workEmail: z.string().trim().email("Enter a valid work email").max(150),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[0-9\s-]{8,15}$/, "Enter a valid phone number"),
  service: z.enum(serviceOptions, { message: "Select a service" }),
  eventType: z.string().trim().max(150).optional().or(z.literal("")),
  preferredDate: z.string().trim().max(40).optional().or(z.literal("")),
  attendeeCount: z.string().trim().max(20).optional().or(z.literal("")),
  destinationOrCity: z.string().trim().max(120).optional().or(z.literal("")),
  budget: z.enum(budgetOptions).optional(),
  requirements: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.boolean().refine((v) => v === true, { message: "Please accept the consent checkbox" }),
  // honeypot — must stay empty
  website: z.string().max(0).optional().or(z.literal("")),
  // attribution
  utmSource: z.string().max(200).optional().or(z.literal("")),
  utmMedium: z.string().max(200).optional().or(z.literal("")),
  utmCampaign: z.string().max(200).optional().or(z.literal("")),
  landingPage: z.string().max(500).optional().or(z.literal("")),
  referrer: z.string().max(500).optional().or(z.literal("")),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const leadFormDefaults: LeadFormValues = {
  fullName: "",
  companyName: "",
  workEmail: "",
  phone: "",
  service: "Not sure / need advice",
  eventType: "",
  preferredDate: "",
  attendeeCount: "",
  destinationOrCity: "",
  budget: undefined,
  requirements: "",
  consent: false,
  website: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  landingPage: "",
  referrer: "",
};
