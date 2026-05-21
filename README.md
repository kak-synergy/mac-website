# MAC Cosmetics Morocco — Website

React + TypeScript frontend for maccosmetics.ma — non-transactional showcase site.

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19 | UI framework |
| TypeScript | 6 | Type safety |
| Vite | 8 | Build tool & dev server |
| Tailwind CSS | 4 (Vite plugin) | Utility-first styling |
| React Router | 7 | Client-side routing |
| react-helmet-async | 3 | Per-page SEO meta tags |
| lucide-react | — | Icons |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (localhost only)
npm run dev

# 3. Start dev server accessible on your local network (mobile testing)
npm run dev -- --host
```

Dev server runs at:
- **Local:** http://localhost:5173
- **Network (mobile):** http://\<YOUR_IP\>:5173

---

## Build & Preview

```bash
# Production build
npm run build

# Preview production build locally
npm run preview
```

Output goes to `dist/`.

---

## Deploy to Vercel (recommended — free, 30 seconds)

```bash
# One-time: install Vercel CLI
npm i -g vercel

# Log in (browser opens)
vercel login

# Deploy from project root
vercel --prod
```

`vercel.json` is already in the project — Vite + SPA routing is pre-configured.

## Deploy to Netlify (drag & drop — no CLI needed)

1. Run `npm run build`
2. Open **https://app.netlify.com/drop** in your browser
3. Drag the `dist/` folder onto the page
4. Copy the generated `*.netlify.app` URL — done ✓

---

## Project Structure

```
mac-cosmetics-website/
├── public/
│   ├── images/          ← logo, banners, product photos, category tiles
│   ├── sitemap.xml      ← SEO sitemap (update when products change)
│   └── robots.txt
│
├── src/
│   ├── data/
│   │   ├── products.json     ← EDITABLE: product catalogue (13 products)
│   │   ├── stores.json       ← EDITABLE: 5 store locations
│   │   ├── content.json      ← EDITABLE: all French UI copy
│   │   └── navigation.ts     ← EDITABLE: nav categories & subcategories
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx        ← sticky nav, mega dropdown, mobile menu
│   │   │   ├── Footer.tsx
│   │   │   ├── TopBanner.tsx     ← dismissible AKSAL BLACK banner
│   │   │   └── NewsletterPopup.tsx
│   │   ├── ui/
│   │   │   ├── ProductCard.tsx
│   │   │   └── CategoryStrip.tsx
│   │   └── SEO.tsx              ← react-helmet-async wrapper
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── PLPPage.tsx          ← product listing, category+subcategory+price filters
│   │   ├── PDPPage.tsx          ← product detail, shade selector, find-in-store
│   │   ├── FindStorePage.tsx
│   │   ├── SearchPage.tsx
│   │   ├── ProRegisterPage.tsx  ← pro registration form (currently frontend-only)
│   │   └── ProAccountPage.tsx   ← 3-step pro login + dashboard (currently frontend-only)
│   │
│   ├── types/index.ts           ← shared TypeScript interfaces
│   ├── App.tsx                  ← routes + ScrollToTop
│   └── main.tsx
│
└── package.json
```

---

## Editable Data Files

All content lives in JSON/TS files — no code changes needed for copy or catalogue updates.

### `src/data/products.json`
Each product: `id`, `name`, `category`, `subcategory`, `price` (MAD), `image`, `images[]`, `description`, `shades[]`, `inStock`, `badge`

**Categories:** Lèvres · Yeux · Visage · Peau · Pinceaux & Outils

### `src/data/stores.json`
Fields: `id`, `name`, `city`, `address`, `phone`, `hours[]`, `googleMapsUrl`

### `src/data/content.json`
All French UI strings: top banner, home hero, campaign banners, Pro programme, footer copy.

### `src/data/navigation.ts`
Nav menu categories and subcategory columns — drives both the mega dropdown and the PLP subcategory pill strip.

### `public/images/`
Static images. Replace files here to update visuals without touching code.

---

## Pages & Routes

| Route | Page | Notes |
|-------|------|-------|
| `/` | Home | Hero, category strip, banners, best-sellers, pro section, Instagram |
| `/products` | PLP | Filter by category, subcategory, price, badge |
| `/products/:id` | PDP | Gallery, shade selector, find-in-store, accordions |
| `/stores` | Find a Store | 5 stores with Google Maps links |
| `/search?q=...` | Search | Client-side full-text search |
| `/pro-register` | Pro Registration | 5-step process + document upload form |
| `/pro-account` | Pro Account | 3-step login + dashboard (mock data) |

---

## What Needs Backend Development

| Feature | Current State | Needs |
|---------|--------------|-------|
| Pro registration form | Frontend only | REST API + secure file upload (S3) |
| Pro authentication | Mock 3-step flow | JWT auth, hashed passwords, session management |
| Pro ID validation | Any ID accepted | Database lookup (format: MAC-MA-XXXXX) |
| Newsletter signup | UI only | Email platform API (Klaviyo / Mailchimp) |
| Product catalogue | Static JSON (13 products) | PIM / ERP integration + pagination |
| Stock availability | Static boolean | Real-time stock per shade per store |
| Invoice download | UI button only | PDF generation + secure storage |
| Search | Client-side | Algolia or server-side search at scale |
| Sitemap | Static 13 products | Auto-generated from product database |
| Analytics | Not implemented | Google Analytics 4 + GTM |

---

## Environment Variables

No `.env` needed to run the frontend. Add `.env.local` when connecting a backend:

```env
VITE_API_URL=https://api.maccosmetics.ma
VITE_ALGOLIA_APP_ID=...
VITE_ALGOLIA_SEARCH_KEY=...
```

---

## SEO

- Per-page meta tags via `<SEO />` component (react-helmet-async)
- JSON-LD schemas: Organization, WebSite (SearchAction), Store ×5, Product (on PDP)
- `public/sitemap.xml` — update product entries when catalogue grows
- `public/robots.txt` — allows all crawlers, points to sitemap

---

## Coding Conventions

- **No CSS files** — Tailwind v4 utilities only (`@import "tailwindcss"` in `src/index.css`)
- **Type-only imports** — use `import type { X }` for type-only symbols (TypeScript `verbatimModuleSyntax`)
- **French UI everywhere** — all user-facing strings live in `src/data/content.json`
- **Images** — store in `public/images/`, reference as `/images/filename.ext`
- **No comments** — code is self-documenting via naming; comments only for non-obvious constraints
