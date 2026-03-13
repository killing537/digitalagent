import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'; // Perbaikan dari next/request ke next/server

export function middleware(request: NextRequest) {
  // Mengambil cookie session admin
  const session = request.cookies.get('admin_session');
  const { pathname } = request.nextUrl;

  // 1. Proteksi folder /admin
  // Jika mencoba akses /admin tapi tidak ada session, lempar ke /login
  if (pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 2. Cegah user yang sudah login masuk ke halaman login lagi
  if (pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

// Konfigurasi matcher untuk menentukan rute mana yang diawasi middleware
export const config = {
  matcher: [
    '/admin/:path*', 
    '/login'
  ],
};