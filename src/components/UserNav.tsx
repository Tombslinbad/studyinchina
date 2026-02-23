'use client'

import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function UserNav() {
  return (
    <>
      <SignedIn>
        <Link href="/dashboard" className="hidden md:flex items-center gap-2 text-slate-600 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">dashboard</span>
          Dashboard
        </Link>
        <UserButton 
          appearance={{
            elements: {
              userButtonAvatarBox: 'w-10 h-10',
            }
          }}
        />
      </SignedIn>
      <SignedOut>
        <Link href="/auth" className="btn-primary inline-flex items-center gap-2">
          <span className="material-symbols-outlined">login</span>
          Sign In
        </Link>
      </SignedOut>
    </>
  )
}
