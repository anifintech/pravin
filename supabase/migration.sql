-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Leads table
create table if not exists leads (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text not null,
  email text,
  service_type text not null check (service_type in ('washing-machine', 'refrigerator', 'dishwasher', 'other')),
  appliance_brand text,
  issue_description text not null,
  address text not null,
  area text not null,
  preferred_date date,
  preferred_time text,
  status text not null default 'new' check (status in ('new', 'contacted', 'scheduled', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger leads_updated_at
  before update on leads
  for each row execute function update_updated_at();

-- Admin users table (for simple admin auth)
create table if not exists admin_users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  created_at timestamptz default now()
);

-- Row Level Security
alter table leads enable row level security;

-- Allow anonymous inserts (for booking form)
create policy "Anyone can submit a lead" on leads
  for insert to anon with check (true);

-- Only service_role can read/update leads (admin panel uses service role)
create policy "Service role full access" on leads
  for all to service_role using (true) with check (true);

-- Indexes for performance
create index if not exists leads_status_idx on leads (status);
create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_area_idx on leads (area);
