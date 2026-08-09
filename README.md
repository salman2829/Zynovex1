# Zynovex Technologies

Marketing and client portal site for **Zynovex Technologies** — an AI consulting agency. Built with Next.js, React Three Fiber (3D hero), Framer Motion, and Supabase (auth + database).

Design and messaging are inspired by enterprise AI service experiences such as [Kyndryl Artificial Intelligence](https://www.kyndryl.com/in/en/artificial-intelligence), adapted for a smaller agency brand.

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS 4
- **Three.js / React Three Fiber / Drei** — lazy-loaded 3D hero
- **Framer Motion** — section and UI motion
- **Supabase** — email auth, profiles, contact inquiries, waitlist

## Setup

### 1. Install & env

```bash
npm install
cp .env.local.example .env.local
```

Fill in `.env.local` from Supabase → **Project Settings → API**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_SECRET
```

- `NEXT_PUBLIC_*` — safe for the browser (anon key + RLS)
- `SUPABASE_SERVICE_ROLE_KEY` — **secret**, server-only; never commit or prefix with `NEXT_PUBLIC_`

### 2. Supabase schema

In the Supabase SQL Editor, run [`supabase/schema.sql`](./supabase/schema.sql).

That creates:

| Table | Purpose |
| --- | --- |
| `profiles` | User profile (auto-created on signup) |
| `contact_inquiries` | Contact form leads |
| `waitlist` | AI assessment / newsletter emails |

Auth redirect URL (Authentication → URL configuration):

- `http://localhost:3000/auth/callback`
- Production: `https://YOUR_DOMAIN/auth/callback`

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Path | Description |
| --- | --- |
| `/` | 3D hero + services, case study, team, FAQ, assessment CTA |
| `/services` | Full services overview |
| `/about` | Agency story |
| `/contact` | Lead form → `contact_inquiries` |
| `/auth/login` · `/auth/signup` | Supabase auth |
| `/dashboard` | Protected client portal (own inquiries) |

## Performance notes

- 3D canvas is **dynamically imported** (`ssr: false`) and skipped when `prefers-reduced-motion` or Save-Data is on
- Canvas DPR capped at `1.5`
- Heavy scene only lives in the hero viewport

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
