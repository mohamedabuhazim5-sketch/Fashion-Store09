-- Fashion Store - Supabase SQL كامل
-- انسخ الملف كامل في Supabase > SQL Editor ثم اضغط Run

create extension if not exists "pgcrypto";

create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'كاجوال',
  price numeric(12,2) not null default 0,
  old_price numeric(12,2) not null default 0,
  tag text not null default 'جديد',
  rating numeric(3,2) not null default 4.8,
  stock integer not null default 0,
  image text not null,
  colors text[] not null default array['وردي','أسود'],
  sizes text[] not null default array['S','M','L'],
  description text not null default '',
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  customer_name text,
  customer_phone text,
  customer_city text,
  customer_address text,
  customer_notes text,
  subtotal numeric(12,2) not null default 0,
  discount numeric(12,2) not null default 0,
  shipping_fee numeric(12,2) not null default 0,
  coupon_code text,
  total numeric(12,2) not null default 0,
  status text not null default 'جديد',
  source text not null default 'website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid null,
  product_name text not null,
  product_image text,
  size text,
  color text,
  qty integer not null default 1,
  price numeric(12,2) not null default 0,
  line_total numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at before update on public.orders
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

alter table public.admins enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "admins_select_own" on public.admins;
create policy "admins_select_own" on public.admins
for select to authenticated
using (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));

drop policy if exists "products_public_read" on public.products;
create policy "products_public_read" on public.products
for select to anon, authenticated
using (is_active = true or public.is_admin());

drop policy if exists "products_admin_insert" on public.products;
create policy "products_admin_insert" on public.products
for insert to authenticated with check (public.is_admin());

drop policy if exists "products_admin_update" on public.products;
create policy "products_admin_update" on public.products
for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "products_admin_delete" on public.products;
create policy "products_admin_delete" on public.products
for delete to authenticated using (public.is_admin());

drop policy if exists "orders_public_insert" on public.orders;
create policy "orders_public_insert" on public.orders
for insert to anon, authenticated with check (true);

drop policy if exists "orders_admin_read" on public.orders;
create policy "orders_admin_read" on public.orders
for select to authenticated using (public.is_admin());

drop policy if exists "orders_admin_update" on public.orders;
create policy "orders_admin_update" on public.orders
for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "orders_admin_delete" on public.orders;
create policy "orders_admin_delete" on public.orders
for delete to authenticated using (public.is_admin());

drop policy if exists "order_items_public_insert" on public.order_items;
create policy "order_items_public_insert" on public.order_items
for insert to anon, authenticated with check (true);

drop policy if exists "order_items_admin_read" on public.order_items;
create policy "order_items_admin_read" on public.order_items
for select to authenticated using (public.is_admin());

drop policy if exists "order_items_admin_delete" on public.order_items;
create policy "order_items_admin_delete" on public.order_items
for delete to authenticated using (public.is_admin());

insert into public.products
(name, category, price, old_price, tag, rating, stock, image, colors, sizes, description, sort_order)
values
('فستان روز أنيق', 'فساتين', 780, 950, 'الأكثر طلبًا', 4.9, 12, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80', array['وردي','أوف وايت','أسود'], array['S','M','L','XL'], 'فستان بناتي ناعم مناسب للخروج والمناسبات البسيطة.', 1),
('طقم موف شيك', 'أطقم', 690, 820, 'عرض خاص', 4.8, 9, 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80', array['موف','بيج','زيتي'], array['S','M','L'], 'طقم مريح وشيك مناسب للخروج اليومي.', 2),
('بلوزة ساتان ناعمة', 'بلوزات', 420, 520, 'جديد', 4.7, 18, 'https://images.unsplash.com/photo-1520975682031-a23e018254f4?auto=format&fit=crop&w=900&q=80', array['روز','أبيض','لبني'], array['M','L','XL'], 'بلوزة خفيفة بلمعة ساتان أنيقة.', 3),
('دريس كاجوال يومي', 'كاجوال', 560, 650, 'مريح', 4.8, 15, 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80', array['أسود','كافيه','بينك'], array['S','M','L','XL'], 'دريس عملي ومريح للجامعة أو الخروجات.', 4)
on conflict do nothing;

-- بعد إنشاء مستخدم أدمن من Authentication > Users شغل السطر ده بإيميلك:
-- insert into public.admins (email) values ('your-admin-email@gmail.com');


-- V5: coupon/order summary columns for projects created before V5
alter table public.orders add column if not exists subtotal numeric(12,2) not null default 0;
alter table public.orders add column if not exists discount numeric(12,2) not null default 0;
alter table public.orders add column if not exists shipping_fee numeric(12,2) not null default 0;
alter table public.orders add column if not exists coupon_code text;

-- V5: secure public order tracking function
create or replace function public.track_order(
  p_order_number text,
  p_phone text
)
returns table (
  order_number text,
  status text,
  total numeric,
  created_at timestamptz,
  customer_city text,
  item_count integer
)
language sql
stable
security definer
set search_path = public
as $$
  select
    o.order_number,
    o.status,
    o.total,
    o.created_at,
    coalesce(o.customer_city, '') as customer_city,
    coalesce(sum(oi.qty), 0)::integer as item_count
  from public.orders o
  left join public.order_items oi on oi.order_id = o.id
  where lower(o.order_number) = lower(trim(p_order_number))
    and regexp_replace(coalesce(o.customer_phone, ''), '\D', '', 'g')
        = regexp_replace(coalesce(p_phone, ''), '\D', '', 'g')
  group by o.id;
$$;

grant execute on function public.track_order(text, text) to anon, authenticated;
