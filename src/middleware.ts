import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Istanzia il middleware di next-intl una sola volta
const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const hostname = url.hostname;

  // Serve robots.txt bloccante SOLO su dominio Netlify
  if (url.pathname === '/robots.txt' && hostname.endsWith('.netlify.app')) {
    return new NextResponse('User-agent: *\nDisallow: /', {
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }

  // Per tutto il resto, passa al middleware di next-intl
  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
