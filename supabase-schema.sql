-- ─────────────────────────────────────────────────────────────────
-- LEEZOO — Supabase Database Schema
-- Run these in your Supabase SQL editor
-- ─────────────────────────────────────────────────────────────────

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── PRODUCTS ──────────────────────────────────────────────────────
create table if not exists products (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  price         numeric(10,2) not null,
  color         text,
  color_hex     text,
  product_id    text unique not null,  -- e.g. LZO-001
  badge         text,                  -- 'New', 'Limited', etc.
  category      text not null check (category in ('men','women','unisex')),
  image_url     text,
  image_filter  text,                  -- CSS filter string
  stock         integer default 100,
  created_at    timestamptz default now()
);

-- ── ORDERS ────────────────────────────────────────────────────────
create table if not exists orders (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references auth.users(id) on delete set null,
  status        text default 'pending' check (status in ('pending','confirmed','shipped','delivered','cancelled')),
  total_amount  numeric(10,2) not null,
  customer_name text,
  customer_phone text,
  customer_email text,
  shipping_address text,
  notes         text,
  created_at    timestamptz default now()
);

alter table orders add column if not exists display_id text;

-- ── ORDER ITEMS ───────────────────────────────────────────────────
create table if not exists order_items (
  id          uuid primary key default uuid_generate_v4(),
  order_id    uuid references orders(id) on delete cascade,
  product_id  uuid references products(id) on delete set null,
  size        text not null,
  qty         integer not null default 1,
  unit_price  numeric(10,2) not null
);

-- ── WISHLIST ──────────────────────────────────────────────────────
create table if not exists wishlist (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references auth.users(id) on delete cascade,
  product_id  uuid references products(id) on delete cascade,
  created_at  timestamptz default now(),
  unique(user_id, product_id)
);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────────
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table wishlist enable row level security;

-- Products: public read
create policy "Products are publicly readable"
  on products for select using (true);

-- Orders: users see own orders
create policy "Users see own orders"
  on orders for select using (auth.uid() = user_id);

create policy "Users create own orders"
  on orders for insert with check (auth.uid() = user_id);

-- Wishlist: users manage own wishlist
create policy "Users see own wishlist"
  on wishlist for select using (auth.uid() = user_id);

create policy "Users add to wishlist"
  on wishlist for insert with check (auth.uid() = user_id);

create policy "Users remove from wishlist"
  on wishlist for delete using (auth.uid() = user_id);

-- ── SEED DATA ─────────────────────────────────────────────────────
insert into products (name, price, color, color_hex, product_id, badge, category, image_url) values
  ('Edge Oversized Tee',  189, 'Obsidian Black',  '#111111', 'LZO-001', 'New',     'men',   null),
  ('Sand Classic Tee',    149, 'Sahara Beige',    '#c4a882', 'LZO-002', null,      'men',   null),
  ('Slate Edition Tee',   169, 'Steel Grey',      '#4a5568', 'LZO-003', null,      'men',   null),
  ('Signature Dark Tee',  199, 'Midnight',        '#0a0a0a', 'LZO-004', 'Limited', 'men',   null),
  ('Earth Tee',           155, 'Caramel Brown',   '#7A5C3F', 'LZO-005', null,      'men',   null),
  ('Edge Oversized Tee',  189, 'Obsidian Black',  '#111111', 'LZW-001', 'New',     'women', null),
  ('Sand Classic Tee',    149, 'Sahara Beige',    '#c4a882', 'LZW-002', null,      'women', null),
  ('Slate Edition Tee',   169, 'Steel Grey',      '#4a5568', 'LZW-003', null,      'women', null),
  ('Signature Dark Tee',  199, 'Midnight',        '#0a0a0a', 'LZW-004', 'Limited', 'women', null),
  ('Earth Tee',           155, 'Caramel Brown',   '#7A5C3F', 'LZW-005', null,      'women', null)
on conflict (product_id) do nothing;

-- Cart items (persisted per user)
create table if not exists cart_items (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references auth.users(id) on delete cascade not null,
  product_id  uuid references products(id) on delete cascade not null,
  size        text not null,
  qty         integer not null default 1,
  created_at  timestamptz default now(),
  unique(user_id, product_id, size)
);

alter table cart_items enable row level security;

create policy "Users manage own cart"
  on cart_items for all using (auth.uid() = user_id)
  with check (auth.uid() = user_id);