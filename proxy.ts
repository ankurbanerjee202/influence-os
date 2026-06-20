import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    if (!token) return NextResponse.next()

    // Admin-only routes
    if (pathname.startsWith('/admin') && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }

    // Redirect unonboarded users (except admin)
    if (pathname === '/' && !token.onboarded && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/onboarding', req.url))
    }

    // Redirect pending/sentiment users from main app to /pending
    // (they still get the full shell but with locked features — handled in App.tsx)

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const { pathname } = req.nextUrl
        // Public paths
        if (pathname.startsWith('/login') || pathname.startsWith('/api/auth')) return true
        // All other paths require auth
        return !!token
      },
    },
    pages: { signIn: '/login' },
  }
)

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
