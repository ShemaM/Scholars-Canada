import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Mock authentication check - for demo purposes, allow all access
  // In production, you would implement proper session management
  
  // Define Protected Routes
  const isProtected = req.nextUrl.pathname.startsWith('/admin');

  // For mock mode, we'll check for a simple cookie to simulate authentication
  // This is for demonstration only - do not use in production
  const mockAuthCookie = req.cookies.get('mock-auth');

  // If accessing protected route without mock auth cookie, allow anyway for demo
  // In a real app, you would redirect to login
  if (isProtected && !mockAuthCookie) {
    // For demo purposes, allow access without authentication
    // Uncomment the following to enable auth redirect:
    // const redirectUrl = new URL('/login', req.url);
    // return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};