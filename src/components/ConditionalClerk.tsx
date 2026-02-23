'use client'

import { ClerkProvider, SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from '@clerk/nextjs'
import { isClerkConfigured } from '@/lib/clerk'

interface ConditionalClerkProps {
  children: React.ReactNode
}

export function ConditionalClerkProvider({ children }: ConditionalClerkProps) {
  // If Clerk is not configured, just render children without Clerk
  if (!isClerkConfigured()) {
    return <>{children}</>
  }

  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  )
}

// Conditional SignedIn component
export function ConditionalSignedIn({ children }: { children: React.ReactNode }) {
  if (!isClerkConfigured()) {
    return null
  }
  return <SignedIn>{children}</SignedIn>
}

// Conditional SignedOut component
export function ConditionalSignedOut({ children }: { children: React.ReactNode }) {
  if (!isClerkConfigured()) {
    return <>{children}</>
  }
  return <SignedOut>{children}</SignedOut>
}

// Conditional UserButton component
export function ConditionalUserButton() {
  if (!isClerkConfigured()) {
    return null
  }
  return (
    <UserButton 
      appearance={{
        elements: {
          userButtonAvatarBox: 'w-10 h-10',
        }
      }}
    />
  )
}
