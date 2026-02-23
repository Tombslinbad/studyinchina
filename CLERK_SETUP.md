# Clerk Authentication Setup Guide

## Step 1: Create Clerk Account
1. Go to https://clerk.com
2. Sign up for a free account
3. Create a new application
4. Choose "Next.js" as your framework

## Step 2: Get Your API Keys
After creating your app, you'll see two keys:
- **Publishable Key** (starts with `pk_test_` or `pk_live_`)
- **Secret Key** (starts with `sk_test_` or `sk_live_`)

## Step 3: Add Keys to Environment Variables
Copy the keys to your `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_ACTUAL_KEY_HERE
```

## Step 4: Configure Clerk Dashboard
1. In Clerk Dashboard, go to **User & Authentication**
2. Enable the authentication methods you want:
   - Email/Password
   - Google
   - GitHub
   - etc.

3. Go to **Sessions** and set session duration

## Step 5: Configure Redirect URLs
In Clerk Dashboard > URLs:
- Sign-in URL: `/auth`
- Sign-up URL: `/auth`
- After sign-in: `/dashboard`
- After sign-up: `/dashboard`

## Features Enabled

### Authentication Methods
- ✅ Email + Password
- ✅ Google Sign-In
- ✅ GitHub Sign-In
- ✅ Facebook Sign-In
- ✅ Magic Links (optional)

### Protected Routes
- ✅ `/dashboard` - Requires authentication

### Public Routes
- ✅ `/` - Home page
- ✅ `/search` - Programs search
- ✅ `/auth` - Sign in / Sign up

### UI Components
- ✅ UserButton - Shows user avatar when logged in
- ✅ SignedIn - Shows content only to authenticated users
- ✅ SignedOut - Shows content only to unauthenticated users

## Testing

1. Start your dev server: `npm run dev`
2. Go to http://localhost:3000
3. Click "Sign In" or "Sign Up"
4. Create an account or sign in
5. You should be redirected to `/dashboard`

## Customization

To customize the look of Clerk components, edit the `appearance` prop in:
- `src/app/auth/page.tsx` - SignIn/SignUp forms
- `src/components/pages/HomePage.tsx` - UserButton
