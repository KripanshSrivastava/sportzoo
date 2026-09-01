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
  logo_url text,
  updated_at timestamptz not null default now(),
  constraint business_settings_single_row check (id = 1)
);

-- Adds logo_url for installs whose business_settings table already existed
-- before this column was introduced. No-op on a fresh install.
alter table business_settings add column if not exists logo_url text;

-- Social links, Google Business Profile URL and review counts. Added after
-- the footer social icons / Google Reviews section were introduced.
alter table business_settings add column if not exists linkedin_url text;
alter table business_settings add column if not exists instagram_url text;
alter table business_settings add column if not exists facebook_url text;
alter table business_settings add column if not exists youtube_url text;
alter table business_settings add column if not exists google_business_url text;
alter table business_settings add column if not exists google_rating text;
alter table business_settings add column if not exists google_review_count text;

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

-- Service pages (the ~25 pages under /corporate-events/[slug],
-- /artist-booking/[slug], /venue-booking/[slug], /event-rentals/[slug]).
-- Seeded from src/config/services.ts on first read; once a row exists here
-- for a slug it takes over from the static fallback for that page.
create table if not exists service_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null, -- corporate-events | artist-booking | venue-booking | event-rentals
  name text not null,
  h1 text not null default '',
  meta_title text not null default '',
  meta_description text not null default '',
  intro text[] not null default '{}',
  problems text[] not null default '{}',
  inclusions jsonb not null default '[]', -- [{ title, desc }]
  process jsonb not null default '[]',    -- [{ title, desc }]
  benefits text[] not null default '{}',
  use_cases text[] not null default '{}',
  faqs jsonb not null default '[]',       -- [{ q, a }]
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Cities for /corporate-event-management/[city]. Seeded from
-- src/config/site.ts's targetCities on first read.
create table if not exists cities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table service_pages enable row level security;
alter table cities enable row level security;

drop policy if exists "public read published service_pages" on service_pages;
create policy "public read published service_pages" on service_pages for select using (published = true);

drop policy if exists "public read published cities" on cities;
create policy "public read published cities" on cities for select using (published = true);

-- Drag-and-drop page builder for the pages that don't share a common shape
-- (Home, About, Contact, and the 4 service-category overview pages). One row
-- per page, keyed by a fixed page_key; blocks is an ordered JSON array of
-- { id, type, props } — added, removed, reordered, and edited from the
-- admin's visual page editor. Falls back to src/lib/blocks/defaults.ts
-- (the site's original layout) until a page is saved for the first time.
create table if not exists page_blocks (
  page_key text primary key,
  blocks jsonb not null default '[]',
  updated_at timestamptz not null default now()
);

alter table page_blocks enable row level security;

drop policy if exists "public read page_blocks" on page_blocks;
create policy "public read page_blocks" on page_blocks for select using (true);

-- Drop the earlier flat-form page-content table if it exists from a
-- previous version of this schema — superseded entirely by page_blocks.
drop table if exists page_content;

-- Client / partner company logos shown in the "Companies that trust our work"
-- banner. Managed in one place at /admin/logos; the homepage "Client logos"
-- section just picks where the banner appears and its heading.
create table if not exists client_logos (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  logo_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists client_logos_sort_idx on client_logos (sort_order);

alter table client_logos enable row level security;

drop policy if exists "public read client_logos" on client_logos;
create policy "public read client_logos" on client_logos for select using (true);

-- Seed the companies the business has worked with (names only — upload the
-- actual logo images from /admin/logos). Skipped if any rows already exist.
insert into client_logos (name, sort_order)
select v.name, v.ord
from (values
  ('Khelomore', 0), ('Genpact', 1), ('Bain & Company', 2), ('SMS Group', 3),
  ('Samsung', 4), ('Siemens', 5), ('PayU', 6), ('Fidelity', 7),
  ('FIS', 8), ('HDFC', 9), ('Cognizant', 10)
) as v(name, ord)
where not exists (select 1 from client_logos);

-- ---------------------------------------------------------------------
-- After running this file, also create a public Storage bucket named
-- "media" (Project → Storage → New bucket → name it "media", toggle
-- "Public bucket" on) so uploaded case-study and gallery photos are
-- viewable on the live site.
