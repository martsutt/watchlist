-- Watchlist database schema (Supabase / PostgreSQL)

create table if not exists public.item (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  genre text not null,
  watched boolean not null default false,
  year integer
);

-- Row-level security is disabled: the app has no login and one demo user.
alter table public.item disable row level security;

-- The API connects with the publishable (anon) key.
grant usage on schema public to anon;
grant select, insert, update, delete on public.item to anon;
