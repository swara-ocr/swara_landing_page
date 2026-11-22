# SWAARA website

The landing page, documentation, waitlist and admin page for SWAARA (www.swaara.lk).

- **Framework:** Next.js 14 (App Router), React 18, TypeScript
- **Database:** Neon Postgres, through Prisma
- **Email:** SMTP through nodemailer (works with the team Gmail account, `teamswara.reads@gmail.com`)
- **Hosting:** Vercel

> This project was written without the ability to install packages or run the build, so it has **not been built or run yet**. The first job is to install, build, and fix anything the compiler reports. See "First run" below.

## What is in it

| Route | What it is |
|---|---|
| `/` | Landing page: hero demo, how it works, products, phone app screens, voice, languages, privacy, roadmap, docs, waitlist form, contact form, team |
| `/docs`, `/docs/[slug]` | Documentation, written from the project details document. Content lives in `src/lib/docs.ts` |
| `/privacy`, `/accessibility` | Website privacy statement and accessibility statement (plain-language drafts) |
| `/unsubscribe/[token]` | Unsubscribe page linked from every email |
| `/admin`, `/admin/login` | Team-only page: waitlist, messages, updates posted to the home page, CSV download |
| `POST /api/waitlist` | Saves a signup, emails a confirmation to the person and a notice to the team |
| `POST /api/contact` | Saves a message, emails the team (reply goes to the sender) and an acknowledgement to the sender |

Everything that is not built yet is labelled "planned" or "in development" on the site. Competitor apps are not named anywhere.

## First run

1. Install: `npm install` (this also runs `prisma generate`).
2. Copy `.env.example` to `.env.local` and fill it in (see "Environment variables").
3. Create the tables in Neon: `npx prisma db push`
4. Check types: `npm run typecheck` and fix anything it reports.
5. Run: `npm run dev`, then open http://localhost:3000
6. Try the waitlist form. Check the row appears in the database and that both emails arrive.

## Neon database

1. Create a project at https://neon.tech (free tier is enough).
2. In the dashboard, open **Connect**. Copy two strings:
   - the **pooled** string (host contains `-pooler`) into `DATABASE_URL`, and add `&pgbouncer=true` to the end
   - the **direct** string into `DIRECT_URL`
3. Run `npx prisma db push` to create the three tables (`WaitlistSignup`, `ContactMessage`, `SiteUpdate`).

## Email (waitlist confirmation and team notices)

The simplest zero-cost route is the team Gmail account:

1. Sign in to `teamswara.reads@gmail.com`, turn on 2-Step Verification.
2. Create an App password at https://myaccount.google.com/apppasswords.
3. Put it in `SMTP_PASS`. The other `SMTP_*` values in `.env.example` are already right for Gmail.

What gets sent:

- To the person who joins: a confirmation with an unsubscribe link.
- To `TEAM_EMAIL`: a notice with their email, interests, language and the running total.
- Contact form: a notice to the team (Reply goes to the sender) and an acknowledgement to the sender.

If the SMTP variables are not set, the forms still save to the database and the emails are skipped with a warning in the logs. Gmail limits sending to roughly 500 emails a day, which is plenty at this stage. Later you can switch to a service such as Resend or Brevo by changing only the `SMTP_*` and `MAIL_FROM` values.

## Admin page

Set `ADMIN_PASSWORD` and `ADMIN_SECRET` (generate with `openssl rand -hex 32`), then go to `/admin/login`. From there you can read messages, mark them answered, download the waitlist as CSV, and post short updates that appear on the home page within a minute. The page is hidden from search engines and signed out after 12 hours.

## Deploy to Vercel

1. Push this project to the GitHub repository.
2. In Vercel, **Add New > Project**, import the repository. The framework is detected as Next.js.
3. Under **Environment Variables**, add every variable from `.env.example` (Production, and Preview if you want it).
4. Deploy. The build command (`prisma generate && next build`) is already in `package.json`.
5. Under **Settings > Domains**, add `www.swaara.lk` and `swaara.lk`. Vercel shows the exact DNS records to create at the registrar. Make one the redirect to the other.
6. Set `NEXT_PUBLIC_SITE_URL` to the final address (`https://www.swaara.lk`), then redeploy. It is used for email links, the sitemap and social previews.

## Things to fill in or decide

- **Team roles:** `TEAM` in `src/lib/site.ts` still says `[ROLE]` for each person.
- **GitHub link:** `SITE.githubUrl` in `src/lib/site.ts`.
- **Sinhala version:** the site is English only. All copy is in `src/app/page.tsx` and `src/lib/docs.ts`. A Sinhala version needs a translation reviewed by a native reader (a first draft of the Sinhala name on the page was wrong, so do not machine-translate and publish). The waitlist form already records a language preference for updates.
- **Statistic:** the line about "9 of 12 participants" (arXiv 2408.03303) comes from the project details document and has not been checked against the paper.
- **Privacy and accessibility pages:** plain-language drafts. Have the team read them, and check the PDPA position before publishing.
- **Social preview image:** not added. Add `src/app/opengraph-image.png` (1200x630) when you have one.
- **Real photos:** every picture is drawn as SVG in `src/components/art.tsx`. Replace with photos of the prototype when they exist.
- **Docs claims:** the user guides describe planned behaviour. Update them as each part is built and tested.

## Notes on how it is built

- Colours: dark "night desk" by default, light "daylight" when the device asks for it, and a button in the header to switch. All colours are CSS variables in `src/app/globals.css`.
- The home page hero demo: "Listen to this label" uses the browser's built-in speech voice, and the highlight follows the spoken word. It starts paused for people who ask their device to reduce motion.
- Forms work with a screen reader: every field has a label, messages are announced, and there is a hidden spam trap field. The rate limiter is in memory and only slows casual abuse.
- Pages that read the database (`/`, `/admin`) still load if the database is not connected.
