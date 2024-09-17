import { headers } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from './app/api/auth/utils';

export const config = {
  matcher: ['/((?!login|api|_next/static|_next/image|favicon.ico).*)'],
};

export async function middleware(req: NextRequest) {
  // validate the user is authenticated
  const verifiedToken = await verifyAuth(req).catch(() => {
    return null;
  });

  if (!verifiedToken) {
    // if this an API request, respond with JSON
    if (req.nextUrl.pathname.startsWith('/api/')) {
      return new NextResponse(
        JSON.stringify({ error: { message: 'authentication required' } }),
        { status: 401 },
      );
    }
    // otherwise, redirect to the set token page
    else {
      const h = headers();
      const host = h.get('x-forwarded-host') as string;
      const proto = h.get('x-forwarded-proto') as string;
      return NextResponse.redirect(`${proto}://${host}/login`);
    }
  }

  return undefined;
}
