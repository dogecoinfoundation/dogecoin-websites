import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { type NextRequest, NextResponse } from 'next/server';
import { allLanguages, targetLanguages, defaultLanguage } from './languages';

const getLocale = (request: NextRequest) => {
  const headers = Object.fromEntries(request.headers.entries());
  const languages = new Negotiator({ headers }).languages();

  return match(languages, targetLanguages, defaultLanguage);
};

export const internationalizationMiddleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  
  // Skip static assets and API routes
  if (
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.includes('.') // Skip files with extensions (favicon.ico, etc.)
  ) {
    return;
  }
  
  const pathnameHasLocale = allLanguages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return;
  }

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
};

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
