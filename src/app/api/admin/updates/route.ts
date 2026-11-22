import { NextResponse, type NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ADMIN_COOKIE, verifyToken } from '@/lib/auth';
import { cleanText } from '@/lib/validate';

export const runtime = 'nodejs';

// One endpoint for the three actions on the admin page: create, toggle (publish or hide) and delete.
export async function POST(req: NextRequest) {
  if (!verifyToken(req.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.redirect(new URL('/admin/login', req.url), 303);
  }

  const form = await req.formData();
  const intent = String(form.get('intent') ?? '');
  const id = cleanText(form.get('id'), 60);

  try {
    if (intent === 'create') {
      const title = cleanText(form.get('title'), 140);
      const body = cleanText(form.get('body'), 4000);
      if (title && body) await db.siteUpdate.create({ data: { title, body } });
    } else if (intent === 'toggle' && id) {
      const current = await db.siteUpdate.findUnique({ where: { id } });
      if (current) await db.siteUpdate.update({ where: { id }, data: { published: !current.published } });
    } else if (intent === 'delete' && id) {
      await db.siteUpdate.deleteMany({ where: { id } });
    } else if (intent === 'remove-signup' && id) {
      // Removes the person from the waitlist entirely (for example when they ask to be removed).
      await db.waitlistSignup.deleteMany({ where: { id } });
    } else if (intent === 'handled' && id) {
      await db.contactMessage.updateMany({ where: { id, handledAt: null }, data: { handledAt: new Date() } });
    }
  } catch (error) {
    console.error('[admin] action failed:', error);
  }

  return NextResponse.redirect(new URL('/admin', req.url), 303);
}
