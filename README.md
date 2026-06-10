# Hideki & Jimmi Engagement Tour '26

Static Astro site for the engagement party tour.

## Run locally

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

The project is configured for Vercel as a static Astro site.

## RSVP Storage

RSVPs post to the Vercel serverless function at `/api/rsvp` and are stored in Neon Postgres.

1. Create a Neon database.
2. Run `sql/schema.sql` in the Neon SQL editor.
3. Add `DATABASE_URL` to the Vercel project environment variables:

```sh
vercel env add DATABASE_URL
```

4. Deploy with the Vercel CLI:

```sh
vercel deploy
```

The form stores event slug, event city, event date, name, phone, guest count, attendance, the Monterrey overnight travel answer, note, and submit time.

## Assets

Add future artwork to `public/assets/`, such as:

- papel picado SVG flags
- black-transparent couple photo
- venue or stop-specific images
