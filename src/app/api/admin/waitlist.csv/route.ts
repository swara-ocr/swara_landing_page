import { NextResponse, type NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ADMIN_COOKIE, verifyToken } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function cell(value: string): string {
  // Quote every field and neutralise spreadsheet formulas.
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET(req: NextRequest) {
  if (!verifyToken(req.cookies.get(ADMIN_COOKIE)?.value)) {
    return new NextResponse('Not signed in', { status: 401 });
  }

  const rows = await db.waitlistSignup.findMany({ orderBy: { createdAt: 'asc' } });
  const lines = [
    ['email', 'interests', 'language', 'consent_at', 'joined_at', 'unsubscribed_at'].map(cell).join(','),
    ...rows.map((r) =>
      [
        r.email,
        r.interests.join(' '),
        r.language,
        r.consentAt.toISOString(),
        r.createdAt.toISOString(),
        r.unsubscribedAt ? r.unsubscribedAt.toISOString() : '',
      ]
        .map(cell)
        .join(','),
    ),
  ];

  return new NextResponse(lines.join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="swaara-waitlist.csv"',
      'Cache-Control': 'no-store',
    },
  });
}
