-- Elephant Corporate — admin panel schema
-- ---------------------------------------------------------------------
-- Run this once in your Supabase project's SQL editor (Project → SQL
-- Editor → New query → paste this whole file → Run). Safe to re-run —
-- every statement is idempotent (IF NOT EXISTS / ON CONFLICT).

-- Single-row table holding editable business details. The app always
-- reads the row with id = 1; the admin panel only ever updates it.
create table if not exists business_settings (
  id int primary key default 1,
  brand text,
  tagline text,
  short_tagline text,
  description text,
  owner_name text,
  phone text,
  whatsapp text,
  email text,
  office_address text,
  primary_city text,
  service_area text,
  map_url text,
  business_hours text,
  updated_at timestamptz not null default now(),
  constraint business_settings_single_row check (id = 1)
);

insert into business_settings (id)
values (1)
on conflict (id) do nothing;

-- Case studies ("Our Work").
create table if not exists case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  client_descriptor text not null default '',
  summary text not null default '',
  challenge text not null default '',
  solution text not null default '',
  execution text not null default '',
  outcomes text[] not null default '{}',
  testimonial_quote text,
  testimonial_attribution text,
  cover_image_url text,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Gallery photos, grouped by category.
create table if not exists gallery_images (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  image_url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists gallery_images_category_idx on gallery_images (category, sort_order);

-- Row Level Security: allow public read access (the site is public-facing),
-- but block all writes from the browser — every write goes through the
-- admin API routes, which use the service-role key and bypass RLS entirely.
alter table business_settings enable row level security;
alter table case_studies enable row level security;
alter table gallery_images enable row level security;

drop policy if exists "public read business_settings" on business_settings;
create policy "public read business_settings" on business_settings for select using (true);

drop policy if exists "public read published case_studies" on case_studies;
create policy "public read published case_studies" on case_studies for select using (published = true);

drop policy if exists "public read gallery_images" on gallery_images;
create policy "public read gallery_images" on gallery_images for select using (true);

-- Events (e.g. "Gurugram Corporate Sports Day") — each is its own public
-- landing page with an optional paid registration form.
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  city text not null default '',
  venue text not null default '',
  event_date date,
  event_time text not null default '',
  description text not null default '',
  cover_image_url text,
  price numeric not null default 0,
  currency text not null default 'INR',
  capacity int,
  registration_open boolean not null default true,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- One row per person who registers for an event. Payments are handled by
-- src/lib/paymentGateway.ts — until a gateway is wired in, paid events are
-- recorded as "pending" and the owner follows up to collect payment, which
-- they can then mark as paid from /admin/events/[id]/registrations.
create table if not exists event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events (id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text not null,
  company_name text not null default '',
  attendee_count int not null default 1,
  notes text not null default '',
  amount numeric not null default 0,
  currency text not null default 'INR',
  payment_status text not null default 'pending', -- pending | free | paid | failed
  payment_provider text,
  payment_reference text,
  created_at timestamptz not null default now()
);

create index if not exists event_registrations_event_idx on event_registrations (event_id, created_at desc);

alter table events enable row level security;
alter table event_registrations enable row level security;

drop policy if exists "public read published events" on events;
create policy "public read published events" on events for select using (published = true);

-- No public policy on event_registrations: it holds registrant PII, and all
-- reads/writes to it go through the admin API or the registration API route,
-- both of which use the service-role key and bypass RLS entirely.

-- ---------------------------------------------------------------------
-- After running this file, also create a public Storage bucket named
-- "media" (Project → Storage → New bucket → name it "media", toggle
-- "Public bucket" on) so uploaded case-study and gallery photos are
-- viewable on the live site.
