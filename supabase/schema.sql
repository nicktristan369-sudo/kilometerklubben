-- ============================================
-- Kilometerklubben Database Schema
-- ============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- PROFILES
-- ============================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  avatar_url text,
  is_admin boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- Everyone can read profiles
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Users can insert their own profile
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', ''),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'picture', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================
-- EVENTS
-- ============================================
create table public.events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  date timestamptz not null,
  location text not null,
  address text,
  latitude double precision,
  longitude double precision,
  distance text,
  difficulty text check (difficulty in ('beginner', 'intermediate', 'advanced', 'ultra')),
  price integer not null default 0, -- price in DKK øre (149 kr = 14900)
  max_spots integer not null default 100,
  image_url text,
  tag text,
  route_coordinates jsonb, -- Google Maps polyline coordinates
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.events enable row level security;

-- Everyone can see published events
create policy "Published events are viewable by everyone"
  on public.events for select
  using (is_published = true);

-- Admins can do everything
create policy "Admins can manage events"
  on public.events for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

-- ============================================
-- REGISTRATIONS
-- ============================================
create table public.registrations (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  status text default 'confirmed' check (status in ('confirmed', 'cancelled', 'waitlist')),
  notes text,
  created_at timestamptz default now(),
  unique(event_id, user_id) -- prevent double registration
);

alter table public.registrations enable row level security;

-- Users can see their own registrations
create policy "Users can view own registrations"
  on public.registrations for select
  using (auth.uid() = user_id);

-- Users can create registrations
create policy "Users can register for events"
  on public.registrations for insert
  with check (auth.uid() = user_id);

-- Users can cancel their own registration
create policy "Users can cancel own registration"
  on public.registrations for update
  using (auth.uid() = user_id);

-- Admins can see all registrations
create policy "Admins can view all registrations"
  on public.registrations for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

-- Admins can manage all registrations
create policy "Admins can manage registrations"
  on public.registrations for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

-- ============================================
-- VIEW: Event with registration count
-- ============================================
create or replace view public.events_with_spots as
select
  e.*,
  e.max_spots - coalesce(
    (select count(*) from public.registrations r
     where r.event_id = e.id and r.status = 'confirmed'),
    0
  ) as spots_left,
  coalesce(
    (select count(*) from public.registrations r
     where r.event_id = e.id and r.status = 'confirmed'),
    0
  ) as registered_count
from public.events e;

-- ============================================
-- SEED DATA
-- ============================================
insert into public.events (title, description, date, location, address, latitude, longitude, distance, difficulty, price, max_spots, tag, is_published) values
(
  'Copenhagen Night Run',
  'Oplev København i et helt nyt lys! Løb 10 km gennem byens mest ikoniske gader og stræder, oplyst af tusindvis af lys. En magisk aften for alle niveauer.',
  '2025-06-15 20:00:00+02',
  'København',
  'Rådhuspladsen, København',
  55.6761, 12.5683,
  '10 km',
  'intermediate',
  14900,
  200,
  'Populær',
  true
),
(
  'Mols Bjerge Trail',
  'Udfordr dig selv på de smukke stier i Mols Bjerge. 21 km trail run med fantastisk udsigt over Ebeltoft Vig. Kuperet terræn der tester din udholdenhed.',
  '2025-06-28 09:00:00+02',
  'Ebeltoft',
  'Mols Bjerge Nationalpark, Ebeltoft',
  56.2172, 10.6717,
  '21 km',
  'advanced',
  19900,
  100,
  'Trail',
  true
),
(
  'Aarhus Havneløb',
  'Et familievenligt 5 km løb langs Aarhus nye havnekvarter. Flad rute perfekt til nybegyndere og dem der vil sætte personlig rekord.',
  '2025-07-12 10:00:00+02',
  'Aarhus',
  'Dokk1, Aarhus',
  56.1527, 10.2134,
  '5 km',
  'beginner',
  9900,
  300,
  'Nybegynder',
  true
),
(
  'Thy Ultra Challenge',
  'Danmarks hårdeste ultra trail run! 50 km gennem Nationalpark Thy med klitter, strand og skov. Kun for de mest dedikerede løbere.',
  '2025-08-09 06:00:00+02',
  'Nationalpark Thy',
  'Stenbjerg Landingsplads, Thy',
  56.9587, 8.3917,
  '50 km',
  'ultra',
  34900,
  50,
  'Ultra',
  true
);
