import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth/jwt';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes
  const publicRoutes = ['/login', '/register'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // If no token and trying to access protected route
  if (!token && !isPublicRoute && pathname !== '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If has token, verify it
  if (token) {
    const payload = verifyToken(token);
    
    // Invalid token
    if (!payload) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth-token');
      return response;
    }

    // Role-based access control
    if (pathname.startsWith('/student') && payload.role !== 'student') {
      return NextResponse.redirect(new URL('/teacher/behavior', request.url));
    }
    
    if (pathname.startsWith('/teacher') && payload.role !== 'teacher') {
      return NextResponse.redirect(new URL('/student/course', request.url));
    }

    // If authenticated and trying to access public routes, redirect to dashboard
    if (isPublicRoute) {
      if (payload.role === 'student') {
        return NextResponse.redirect(new URL('/student/course', request.url));
      } else {
        return NextResponse.redirect(new URL('/teacher/behavior', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
