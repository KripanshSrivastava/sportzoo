import { cache } from "react";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export interface EventRecord {
  id: string;
  slug: string;
  title: string;
  city: string;
  venue: string;
  eventDate: string | null;
  eventTime: string;
  description: string;
  coverImageUrl: string | null;
  price: number;
  currency: string;
  capacity: number | null;
  registrationOpen: boolean;
  published: boolean;
  sortOrder: number;
}

export interface EventRegistrationRecord {
  id: string;
  eventId: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  attendeeCount: number;
  notes: string;
  amount: number;
  currency: string;
  paymentStatus: "pending" | "free" | "paid" | "failed";
  paymentProvider: string | null;
  paymentReference: string | null;
  createdAt: string;
}

function fromEventRow(row: Record<string, unknown>): EventRecord {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    city: (row.city as string) ?? "",
    venue: (row.venue as string) ?? "",
    eventDate: (row.event_date as string) ?? null,
    eventTime: (row.event_time as string) ?? "",
    description: (row.description as string) ?? "",
    coverImageUrl: (row.cover_image_url as string) ?? null,
    price: Number(row.price ?? 0),
    currency: (row.currency as string) ?? "INR",
    capacity: row.capacity == null ? null : Number(row.capacity),
    registrationOpen: Boolean(row.registration_open),
    published: Boolean(row.published),
    sortOrder: (row.sort_order as number) ?? 0,
  };
}

function fromRegistrationRow(row: Record<string, unknown>): EventRegistrationRecord {
  return {
    id: row.id as string,
    eventId: row.event_id as string,
    fullName: row.full_name as string,
    email: row.email as string,
    phone: row.phone as string,
    companyName: (row.company_name as string) ?? "",
    attendeeCount: Number(row.attendee_count ?? 1),
    notes: (row.notes as string) ?? "",
    amount: Number(row.amount ?? 0),
    currency: (row.currency as string) ?? "INR",
    paymentStatus: (row.payment_status as EventRegistrationRecord["paymentStatus"]) ?? "pending",
    paymentProvider: (row.payment_provider as string) ?? null,
    paymentReference: (row.payment_reference as string) ?? null,
    createdAt: row.created_at as string,
  };
}

/** Public-facing list — published events only, soonest first. */
export const getPublishedEvents = cache(async (): Promise<EventRecord[]> => {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("published", true)
    .order("event_date", { ascending: true });
  if (error || !data) return [];
  return data.map(fromEventRow);
});

export async function getPublishedEventBySlug(slug: string): Promise<EventRecord | undefined> {
  const all = await getPublishedEvents();
  return all.find((e) => e.slug === slug);
}

/** Admin list — every row regardless of published state. */
export async function getAllEventsForAdmin(): Promise<EventRecord[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data, error } = await supabase.from("events").select("*").order("sort_order", { ascending: true });
  if (error || !data) return [];
  return data.map(fromEventRow);
}

export async function getRegistrationsForEvent(eventId: string): Promise<EventRegistrationRecord[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("event_registrations")
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map(fromRegistrationRow);
}
