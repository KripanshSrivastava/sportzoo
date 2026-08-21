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

-- ---------------------------------------------------------------------
-- After running this file, also create a public Storage bucket named
-- "media" (Project → Storage → New bucket → name it "media", toggle
-- "Public bucket" on) so uploaded case-study and gallery photos are
-- viewable on the live site.
