# SWAARA website

The landing page, documentation, waitlist and admin page for SWAARA (www.swaara.lk).

- **Framework:** Next.js 14 (App Router), React 18, TypeScript
- **Database:** Neon Postgres, through Prisma
- **Email:** optional and off by default. SMTP through nodemailer, switched on with `EMAIL_ENABLED=true`
- **Hosting:** Vercel (a sign-up that fails is logged as `[waitlist] failed: <code> <cause>`, with no email addresses or secrets, so Vercel's Logs show the reason)

> The project installs, typechecks and builds. It still needs a real Neon database and Vercel environment variables before the waitlist and admin page work in production. See "First run" below.

## What is in it

| Route | What it is |
|---|---|
| `/` | Short landing page: hero demo, how it works, three products, voice and languages, privacy line, waitlist form |
| `/about`, `/roadmap`, `/contact` | The problem, voice and language flows, phone app screens and team; the roadmap and latest updates; the contact form |
| `/docs`, `/docs/[slug]` | Documentation, written from the project details document. Content lives in `src/lib/docs.ts` |
| `/privacy`, `/accessibility` | Website privacy statement and accessibility statement (plain-language drafts) |
| `/unsubscribe/[token]` | Unsubscribe page linked from emails. Only exists when `EMAIL_ENABLED=true` (otherwise 404) |
| `/admin`, `/admin/login` | Team-only page: waitlist (with remove), messages, updates posted to /roadmap, CSV download |
| `POST /api/waitlist` | Saves a signup (email, role, interests, language, consent). Emails only if `EMAIL_ENABLED=true` |
| `POST /api/contact` | Saves a message. Emails only if `EMAIL_ENABLED=true` |

Everything that is not built yet is labelled "planned" or "in development" on the site. Competitor apps are not named anywhere.

## First run

1. Install: `npm install` (this also runs `prisma generate`).
2. Copy `.env.example` to `.env.local` and fill it in (see "Environment variables").
3. Create or update the tables in Neon: `npx prisma db push` (run it again after pulling a change to `prisma/schema.prisma`, for example the new `role` column)
4. Check types: `npm run typecheck` and fix anything it reports.
5. Run: `npm run dev`, then open http://localhost:3000
6. Try the waitlist form and check the row appears in the database (and in `/admin`).

## Neon database

1. Create a project at https://neon.tech (free tier is enough).
2. In the dashboard, open **Connect**. Copy two strings:
   - the **pooled** string (host contains `-pooler`) into `DATABASE_URL`, and add `&pgbouncer=true` to the end
   - the **direct** string into `DIRECT_URL`
3. Run `npx prisma db push` to create the three tables (`WaitlistSignup`, `ContactMessage`, `SiteUpdate`).
   - No `DIRECT_URL` on your computer? Paste `prisma/neon-setup.sql` into the Neon **SQL editor** instead. It creates the three tables and adds any missing columns (such as `role`), and is safe to run more than once.

## Email (optional, off by default)

Email is **not required** and is switched off. With `EMAIL_ENABLED` unset or not `"true"`, `sendMail` does nothing and makes no network call. Sign-ups and messages are still saved to Neon, and the visitor sees "You are on the list." or "Thanks, we have your message." The unsubscribe pages return 404 while email is off, because there are no emails to unsubscribe from. Nothing fails when the `SMTP_*` variables are missing.

All the email code and templates are kept. To switch it on later, set `EMAIL_ENABLED=true` and the `SMTP_*` variables (see `.env.example`). With the team Gmail account that means turning on 2-Step Verification and creating an App password; `MAIL_FROM` must use the same Gmail address.

## Admin page

Set `ADMIN_PASSWORD` and `ADMIN_SECRET` (generate with `openssl rand -hex 32`), then go to `/admin/login`. From there you can read messages, mark them answered, download the waitlist as CSV, remove a person from the waitlist, and post short updates that appear on `/roadmap` within a minute. The page is hidden from search engines and signed out after 12 hours.

## Deploy to Vercel

1. Push this project to the GitHub repository.
2. In Vercel, **Add New > Project**, import the repository. The framework is detected as Next.js.
3. Under **Environment Variables**, add these (Production, and Preview if you want it):
   - **Required:** `DATABASE_URL`, `DIRECT_URL`, `ADMIN_PASSWORD`, `ADMIN_SECRET`, `NEXT_PUBLIC_SITE_URL`
   - **Optional:** `EMAIL_ENABLED` and the `SMTP_*`, `MAIL_FROM`, `TEAM_EMAIL` values. Leave them out and email stays off.
   - Vercel only applies new or changed variables to **new deployments**, so redeploy after changing them.
4. Deploy. The build command (`prisma generate && next build`) is already in `package.json`.
5. Under **Settings > Domains**, add `www.swaara.lk` and `swaara.lk`. Vercel shows the exact DNS records to create at the registrar. Make one the redirect to the other.
6. Set `NEXT_PUBLIC_SITE_URL` to the final address (`https://www.swaara.lk`), then redeploy. It is used for email links, the sitemap and social previews.

## Things to fill in or decide

- **Team roles:** `TEAM` in `src/lib/site.ts` still says `[ROLE]` for each person.
- **GitHub link:** `SITE.githubUrl` in `src/lib/site.ts`.
- **Sinhala version:** the site is English only. All copy is in `src/app/page.tsx`, `src/app/about/page.tsx` and `src/lib/docs.ts`. A Sinhala version needs a translation reviewed by a native reader (a first draft of the Sinhala name on the page was wrong, so do not machine-translate and publish). The waitlist form already records a language preference for updates.
- **Statistic:** the line about "9 of 12 participants" (arXiv 2408.03303, now on `/about`) comes from the project details document and has not been checked against the paper.
- **Privacy and accessibility pages:** plain-language drafts. Have the team read them, and check the PDPA position before publishing.
- **Social preview image:** not added. Add `src/app/opengraph-image.png` (1200x630) when you have one.
- **Real photos:** every picture is drawn as SVG in `src/components/art.tsx`. Replace with photos of the prototype when they exist.
- **Docs claims:** the user guides describe planned behaviour. Update them as each part is built and tested.

## Notes on how it is built

- Colours: dark "night desk" by default, light "daylight" when the device asks for it, and a button in the header to switch. All colours are CSS variables in `src/app/globals.css`.
- The home page hero demo: "Listen to this label" uses the browser's built-in speech voice, and the highlight follows the spoken word. It starts paused for people who ask their device to reduce motion.
- Forms work with a screen reader: every field has a label, messages are announced, and there is a hidden spam trap field. The rate limiter is in memory and only slows casual abuse.
- Pages that read the database (`/`, `/admin`) still load if the database is not connected.
