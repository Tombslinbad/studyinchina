'use client'

import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'

export function useSyncUser() {
  const { user, isLoaded } = useUser()
  const syncUser = useMutation(api.users.syncUser)

  useEffect(() => {
    if (isLoaded && user) {
      // Sync Clerk user with Convex
      syncUser({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress || '',
        fullName: user.fullName || undefined,
        avatarUrl: user.imageUrl || undefined,
      }).catch((err) => {
        console.error('Failed to sync user:', err)
      })
    }
  }, [isLoaded, user, syncUser])
}
