# Youth Inspiration Summit 2027

Full-stack event website built with **Next.js 15 + Prisma + Neon + Resend + Cloudinary**, ready for **Vercel**.

## Stack (easiest to run)

| Layer              | Choice          | Why |
|--------------------|-----------------|-----|
| Framework          | Next.js 15 (App Router) | Server Actions, easy deploy |
| ORM                | **Prisma**      | Type-safe, excellent Neon support |
| Database           | **Neon** (Postgres) | Serverless, free tier, Vercel-friendly |
| Emails             | **Resend**      | Invitation / Reminder / Confirmation / Updates |
| Images             | **Cloudinary**  | Speaker photos & sponsor logos only (no AI gen) |
| Hosting            | **Vercel**      | Zero-config Next.js + env vars |

## Registration Model

- **RSVP** – free / general interest  
- **Ticket** – reserved seat  
  - Sub-types: **General Access**, **Research Workshop**, **Full Access + Mentor Lunch**

Confirmation emails are sent automatically via Resend using the confirmation templates.

## Quick Start

### 1. Clone & install

```bash
cd youth-inspiration-summit-app
npm install
```

### 2. Environment variables

Copy `.env.example` → `.env` and fill:

```env
DATABASE_URL="postgresql://...@...neon.tech/neondb?sslmode=require"   # from Neon console
RESEND_API_KEY="re_...."
RESEND_FROM_EMAIL="Youth Inspiration Summit <hello@yourdomain.com>"
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
ADMIN_SECRET="a-strong-random-secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"   # or your Vercel URL
```

### 3. Database

```bash
npx prisma db push
# optional seed is handled by Super Admin Setup page
```

### 4. Run locally

```bash
npm run dev
```

Open http://localhost:3000

### 5. Super Admin Setup (one-time)

1. Go to **/admin/setup**
2. Enter the `ADMIN_SECRET`
3. Click **Run Super Admin Setup**

This creates:
- The event (20–21 March 2027, Bengaluru)
- 4 speakers
- Full agenda including the **Research Workshop**
- 3 sponsors

### 6. Deploy to Vercel

1. Push to GitHub
2. Import project on Vercel
3. Add the same env vars in Vercel dashboard
4. Deploy

Vercel automatically runs `prisma generate` via the `build` script / `vercel.json`.

## Key Routes

| Path              | Purpose |
|-------------------|---------|
| `/`               | Public landing + agenda + speakers |
| `/register`       | RSVP / Ticket registration (Research Workshop option) |
| `/admin/setup`    | Super Admin one-click setup (protected by ADMIN_SECRET) |

## Communication Flow (Resend)

1. **Invitation** – bulk or manual  
2. **Reminder to Registration** – for invitees who haven’t registered  
3. **Confirmation** – auto-sent on successful registration  
4. **Event Updates** – pre-event practical info  

All templates live in `src/lib/resend.ts`.

## Image Storage

Speaker photos and sponsor logos → **Cloudinary** only.  
No AI image generation is used. Upload helpers are in `src/lib/cloudinary.ts`.

## Notes

- Prisma is chosen over raw SQL / other ORMs because it is the simplest and most reliable with Neon + Vercel.
- Registration is intentionally simple (no payment gateway yet). You can add Stripe later for Ticket category.
- The Research Workshop appears both as a session type and as a Ticket sub-category.
