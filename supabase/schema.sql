create table public.item (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  genre text not null,
  watched boolean not null default false,
  year integer
);