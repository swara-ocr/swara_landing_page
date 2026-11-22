-- SWAARA: make the Neon database match prisma/schema.prisma.
-- Paste this whole file into the Neon SQL editor and run it. It is safe to run more than once:
-- it only creates what is missing and never deletes or changes existing rows.
-- (Same result as `npx prisma db push`, for when you do not have DIRECT_URL on your computer.)

CREATE TABLE IF NOT EXISTS "WaitlistSignup" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'other',
    "interests" TEXT[],
    "language" TEXT NOT NULL DEFAULT 'en',
    "consent" BOOLEAN NOT NULL DEFAULT true,
    "consentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unsubscribeToken" TEXT NOT NULL,
    "unsubscribedAt" TIMESTAMP(3),
    "confirmationSentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WaitlistSignup_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "organisation" TEXT,
    "kind" TEXT NOT NULL DEFAULT 'general',
    "message" TEXT NOT NULL,
    "consent" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "handledAt" TIMESTAMP(3),
    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "SiteUpdate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SiteUpdate_pkey" PRIMARY KEY ("id")
);

-- Columns that may be missing from tables created by an earlier version of the schema.
-- "role" is the one added most recently (the cause of the 500 on the live waitlist).
ALTER TABLE "WaitlistSignup" ADD COLUMN IF NOT EXISTS "role" TEXT NOT NULL DEFAULT 'other';
ALTER TABLE "WaitlistSignup" ADD COLUMN IF NOT EXISTS "interests" TEXT[];
ALTER TABLE "WaitlistSignup" ADD COLUMN IF NOT EXISTS "language" TEXT NOT NULL DEFAULT 'en';
ALTER TABLE "WaitlistSignup" ADD COLUMN IF NOT EXISTS "consent" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "WaitlistSignup" ADD COLUMN IF NOT EXISTS "consentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "WaitlistSignup" ADD COLUMN IF NOT EXISTS "unsubscribedAt" TIMESTAMP(3);
ALTER TABLE "WaitlistSignup" ADD COLUMN IF NOT EXISTS "confirmationSentAt" TIMESTAMP(3);
ALTER TABLE "WaitlistSignup" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "organisation" TEXT;
ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "kind" TEXT NOT NULL DEFAULT 'general';
ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "consent" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "handledAt" TIMESTAMP(3);
ALTER TABLE "SiteUpdate" ADD COLUMN IF NOT EXISTS "published" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "SiteUpdate" ADD COLUMN IF NOT EXISTS "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "SiteUpdate" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Indexes, including the two unique ones the sign-up code relies on.
CREATE UNIQUE INDEX IF NOT EXISTS "WaitlistSignup_email_key" ON "WaitlistSignup"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "WaitlistSignup_unsubscribeToken_key" ON "WaitlistSignup"("unsubscribeToken");
CREATE INDEX IF NOT EXISTS "WaitlistSignup_createdAt_idx" ON "WaitlistSignup"("createdAt");
CREATE INDEX IF NOT EXISTS "ContactMessage_createdAt_idx" ON "ContactMessage"("createdAt");
CREATE INDEX IF NOT EXISTS "SiteUpdate_publishedAt_idx" ON "SiteUpdate"("publishedAt");
