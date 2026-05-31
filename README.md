# LEEZOO — Wear Your Edge
> React + Vite + Supabase E-commerce Storefront

## Tech Stack
- **React 18** — UI framework
- **Vite** — build tool & dev server
- **Supabase** — database, auth, storage
- **No CSS framework** — pure inline styles matching the original LEEZOO design

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Supabase
1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-schema.sql`
3. Copy your credentials from **Settings → API**

### 3. Configure environment
```bash
cp .env.example .env.local
```
Edit `.env.local`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run the dev server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

> **Note:** Without Supabase configured, the app runs on demo data automatically.

---

## Project Structure
```
src/
├── components/
│   ├── Navbar.jsx        # Sticky nav, mobile menu, cart icon
│   ├── Hero.jsx          # Full-screen hero section
│   ├── Marquee.jsx       # Scrolling text banner
│   ├── ProductSlider.jsx # Auto-playing product carousel
│   ├── ProductCard.jsx   # Card with add-to-bag + WhatsApp buy
│   ├── CartDrawer.jsx    # Slide-in cart with WhatsApp checkout
│   ├── AuthModal.jsx     # Sign in / Sign up modal
│   └── Footer.jsx        # About, platforms, footer links
├── context/
│   ├── CartContext.jsx   # Cart state (add/remove/qty/drawer)
│   └── AuthContext.jsx   # Supabase auth state
├── hooks/
│   └── useProducts.js    # Fetches products, falls back to demo data
├── lib/
│   └── supabase.js       # Supabase client + helper functions
├── App.jsx
├── main.jsx
└── index.css             # CSS variables, animations, global styles
```

---

## Supabase Tables

| Table | Description |
|-------|-------------|
| `products` | Product catalog (name, price, color, image_url, category) |
| `orders` | Customer orders with status tracking |
| `order_items` | Line items per order |
| `wishlist` | User → product saves |

All tables have **Row Level Security** enabled.

---

## Customization

### Add product images
Update `image_url` in the `products` table. Use Supabase Storage:
1. Create a `product-images` bucket (public)
2. Upload images
3. Copy the public URL → paste into `products.image_url`

### Change WhatsApp number
Search for `919984090593` and replace with your number (no `+` prefix, no spaces).

### Update pricing currency
Replace `RS` with your currency in `ProductCard.jsx` and `CartDrawer.jsx`.

---

## Deployment

```bash
npm run build
```
Deploy the `dist/` folder to Vercel, Netlify, or any static host.

Add your environment variables in the hosting platform's dashboard.
