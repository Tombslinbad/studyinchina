import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/search',
  '/auth',
  '/api/clerk/webhook',
  '/api/upload',
])

// Admin-only routes
const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
  '/universities(.*)',
  '/students',
  '/pipeline',
])

// Dashboard routes (require authentication)
const isDashboardRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/applications',
  '/documents',
  '/visa-tracker',
])

export default clerkMiddleware(async (auth, req) => {
  try {
    const { userId, sessionClaims } = await auth()
    
    // Allow public routes
    if (isPublicRoute(req)) {
      return NextResponse.next()
    }

    // Check if user is authenticated for protected routes
    if (!userId && (isDashboardRoute(req) || isAdminRoute(req))) {
      const signInUrl = new URL('/auth', req.url)
      signInUrl.searchParams.set('redirect_url', req.url)
      return NextResponse.redirect(signInUrl)
    }

    // Check admin role for admin routes
    if (isAdminRoute(req) && userId) {
      const metadata = (sessionClaims as any)?.metadata
      const role = metadata?.role as string
      if (role !== 'admin') {
        // Redirect non-admin users to dashboard
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
    }

    return NextResponse.next()
  } catch (error) {
    // Log error for debugging
    console.error('Middleware error:', error)
    
    // If it's an auth error, redirect to auth page
    if (isDashboardRoute(req) || isAdminRoute(req)) {
      const signInUrl = new URL('/auth', req.url)
      return NextResponse.redirect(signInUrl)
    }
    
    // For other routes, allow the request to continue
    return NextResponse.next()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
