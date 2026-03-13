import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('admin_session');
  const { pathname } = request.nextUrl;

  // Jika mencoba akses folder admin tapi tidak ada session
  if (pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Jika sudah login tapi malah mau ke page login, arahkan balik ke admin
  if (pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

// Tentukan route mana saja yang diproteksi oleh middleware ini
export const config = {
  matcher: ['/admin/:path*', '/login'],
};