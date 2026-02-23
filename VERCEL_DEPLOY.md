# Vercel Deployment Guide

## Fixing MIDDLEWARE_INVOCATION_FAILED Error

This error occurs when environment variables are not properly set in Vercel.

### Required Environment Variables

Go to your Vercel project **Settings > Environment Variables** and add these:

#### Clerk Authentication (Required)
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Get these from: https://dashboard.clerk.com

#### Clerk Routes (Optional - defaults work)
```
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

#### Convex Backend (Required for database)
```
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
```

Get this from: https://dashboard.convex.dev

### Setting Variables in Vercel

1. Go to https://vercel.com/dashboard
2. Select your project
3. Click **Settings** tab
4. Click **Environment Variables** in sidebar
5. Add each variable:
   - Name: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - Value: Your actual key
   - Environment: Production (and Preview if needed)

6. Click **Save**
7. **Redeploy** your project

### Troubleshooting

#### Still getting 500 errors?

1. **Check Clerk keys are valid:**
   ```bash
   # Test locally with production keys
   npm run build
   npm start
   ```

2. **Verify Convex URL:**
   - Must start with `https://`
   - Must end with `.convex.cloud`

3. **Check Vercel Function Logs:**
   - Go to Vercel Dashboard > Your Project > Functions
   - Look for error details

4. **Redeploy with clean cache:**
   - Vercel Dashboard > Deployments
   - Click the three dots on latest deployment
   - Select "Redeploy with clean cache"

### Local Testing with Production Keys

```bash
# Create production env file
cp .env.local .env.production.local

# Edit with production keys
nano .env.production.local

# Build and test
npm run build
npm start
```

### Alternative: Disable Middleware (Emergency)

If you need to deploy without auth temporarily, rename `middleware.ts` to `middleware.ts.disabled`:

```bash
git mv src/middleware.ts src/middleware.ts.disabled
git commit -m "Temporarily disable auth middleware"
git push
```

Then re-enable after fixing environment variables.

### Contact Support

If issues persist:
- Clerk Support: https://clerk.com/support
- Vercel Support: https://vercel.com/help
