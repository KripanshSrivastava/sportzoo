import { z } from "zod";

export const eventRegistrationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(150),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[0-9\s-]{8,15}$/, "Enter a valid phone number"),
  companyName: z.string().trim().max(120).optional().or(z.literal("")),
  attendeeCount: z.coerce.number().int().min(1).max(50).default(1),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  // honeypot — must stay empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export type EventRegistrationValues = z.infer<typeof eventRegistrationSchema>;
