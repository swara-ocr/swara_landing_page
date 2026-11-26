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

Go to `/admin` (there is a small "Team" link in the footer). The password is set in `src/lib/auth.ts`; edit it there to change it. `ADMIN_SECRET` is optional and signs the login cookie (generate with `openssl rand -hex 32`). From there you can read messages, mark them answered, download the waitlist as CSV, remove a person from the waitlist, and post short updates that appear on `/roadmap` within a minute. The page is hidden from search engines and signed out after 12 hours.

## Deploy to Vercel

1. Push this project to the GitHub repository.
2. In Vercel, **Add New > Project**, import the repository. The framework is detected as Next.js.
3. Under **Environment Variables**, add these (Production, and Preview if you want it):
   - **Required:** `DATABASE_URL`, `DIRECT_URL`
   - **Optional:** `NEXT_PUBLIC_SITE_URL` (leave it out until a real domain is connected, see below), `ADMIN_SECRET`, `EMAIL_ENABLED` and the `SMTP_*`, `MAIL_FROM`, `TEAM_EMAIL` values. Leave them out and email stays off.
   - Vercel only applies new or changed variables to **new deployments**, so redeploy after changing them.
4. Deploy. The build command (`prisma generate && next build`) is already in `package.json`.
5. Turn on analytics (optional): in Vercel open the project, then the **Analytics** tab, and press **Enable** (Web Analytics). Nothing else is needed: the code already includes `@vercel/analytics`. It uses no third-party cookies and starts counting visits after the next deployment. `/privacy` describes what it records, taken from Vercel's own privacy documentation (vercel.com/docs/analytics/privacy-policy), so update it if that page changes. It does nothing outside Vercel.

No domain is written into the code. The site works on the Vercel address (`something.vercel.app`) straight away, and canonical links, the sitemap, `robots.txt` and the social preview image all follow whichever address is live.

## Connecting swaara.lk

Do this once the domain is registered and active with the LK Domain Registry.

1. **Add the domain in Vercel.** Project, **Settings > Domains**, add `www.swaara.lk` and also `swaara.lk`. Make `www.swaara.lk` the main one and set `swaara.lk` to **redirect** to it. Vercel then shows what to create at your DNS provider. Copy exactly what Vercel shows. The usual records are:

   | Name (host) | Type | Value |
   |---|---|---|
   | `swaara.lk` (also written `@`) | `A` | `76.76.21.21` |
   | `www` | `CNAME` | `cname.vercel-dns.com` (newer projects show a project-specific value such as `abc123.vercel-dns-017.com`. Use whichever Vercel shows.) |

   Remove any other `A`, `AAAA` or `CNAME` record on those two names first, because they conflict. Alternatively, in the registrar's panel set the domain's **nameservers** to `ns1.vercel-dns.com` and `ns2.vercel-dns.com` and let Vercel manage the DNS. The .lk registry or your registrar's control panel is where these are changed.
2. **Wait for DNS.** It takes from a few minutes to a day or two. Vercel shows **Valid Configuration** next to each domain when it is ready, and then issues the HTTPS certificate by itself. There is nothing to buy or install for HTTPS.
3. **Tell the site its new address.** In **Settings > Environment Variables** add `NEXT_PUBLIC_SITE_URL` = `https://www.swaara.lk` for **Production**, then **redeploy** (the value is read when the site is built, so a redeploy is required).
4. **Check.** Open `https://www.swaara.lk`, then `/sitemap.xml` and `/robots.txt` (both should show `www.swaara.lk` addresses), and view the page source: the `canonical` link and `og:image` should start with `https://www.swaara.lk`. Open `https://swaara.lk` and confirm it redirects to `www`.

Until step 3, leave `NEXT_PUBLIC_SITE_URL` unset so everything uses the Vercel address. If it is set to a domain that is not connected yet, the canonical links and the sharing preview will point at a site that is not there.

## Prototype images and team photos

- **Key features pictures** are listed in `PROTOTYPE_SCREENS` in `src/lib/site.ts` (file, alt text, caption, width and height) and live in `public/prototype/`. They are currently the drawn design mock-ups. To use the real Figma exports, drop PNG or WebP files into `public/prototype/` and edit the entries: set `width` and `height` to the file's pixel size and write alt text that describes the screen.
- **Team photos** go in `public/team/`. Add `photo: '/team/name.jpg'` to a member in `TEAM` (`src/lib/site.ts`). Square, face-centred pictures of about 400 pixels work best. A member without a photo shows a circle with their initial.
- **Team roles** are required in `TEAM`. A role that is still `[ROLE]` is never shown on the live site, and the build prints a warning naming who is missing one.
- **Social links** are in `SOCIALS` in `src/lib/site.ts`. An entry with an empty `url` is not shown.

## Things to fill in or decide

- **Logo:** the site uses `public/logo/swaara-logo.png`, a wide version of the team's logo with the name spelled SWAARA (the first artwork supplied read "SWARA"). It appears in the header, hero, footer and share preview image. The favicon and Apple icon (`src/app/icon.png`, `src/app/apple-icon.png`) use only the book-and-eye symbol, because the wording is unreadable at that size.

- **GitHub link:** `SITE.githubUrl` in `src/lib/site.ts`.
- **Sinhala version:** the site is English only. All copy is in `src/app/page.tsx`, `src/app/about/page.tsx` and `src/lib/docs.ts`. A Sinhala version needs a translation reviewed by a native reader (a first draft of the Sinhala name on the page was wrong, so do not machine-translate and publish). The waitlist form already records a language preference for updates.
- **Statistic:** the line about 9 of 12 participants (arXiv 2408.03303) was checked against the paper's full text on 22 November 2026: it reports that 9 of its 12 blind participants found image framing challenging. The site says "framing a photo" because the paper is about photos taken with camera apps, not specifically pages.
- **Privacy and accessibility pages:** plain-language drafts. Have the team read them, and check the PDPA position before publishing.
- **Social preview image:** not added. Add `src/app/opengraph-image.png` (1200x630) when you have one.
- **Real photos:** every picture is drawn as SVG in `src/components/art.tsx`. Replace with photos of the prototype when they exist.
- **Docs claims:** the user guides describe planned behaviour. Update them as each part is built and tested.

## Notes on how it is built

- Colours: dark "night desk" by default, light "daylight" when the device asks for it, and a button in the header to switch. All colours are CSS variables in `src/app/globals.css`.
- The home page hero demo: "Listen to this label" uses the browser's built-in speech voice, and the highlight follows the spoken word. It starts paused for people who ask their device to reduce motion.
- Forms work with a screen reader: every field has a label, messages are announced, and there is a hidden spam trap field. The rate limiter is in memory and only slows casual abuse.
- Pages that read the database (`/`, `/admin`) still load if the database is not connected.
