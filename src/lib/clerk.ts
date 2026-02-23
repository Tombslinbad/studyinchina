// Check if Clerk keys are configured
export const isClerkConfigured = () => {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  return publishableKey && !publishableKey.includes('YOUR_PUBLISHABLE_KEY_HERE')
}

// Get the publishable key or return empty string
export const getClerkKey = () => {
  return process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ''
}
