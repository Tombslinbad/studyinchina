# Deploy Convex Schema

Since the Convex CLI has Node.js 20 compatibility issues, deploy the schema manually:

## Option 1: Convex Dashboard (Recommended)

1. Go to https://dashboard.convex.dev
2. Select project: **impartial-spoonbill-973**
3. Click on **"Functions"** in the left sidebar
4. Click **"New File"**
5. Name it: `schema.ts`
6. Paste the contents from `convex/schema.ts` (already created)
7. Click **"Save"** or **"Deploy"**

## Option 2: Using Convex CLI (Alternative)

If you have Node.js 18 available:

```bash
# Using nvm to switch to Node 18
nvm install 18
nvm use 18

# Deploy schema
npx convex dev

# Or push directly
npx convex push
```

## Option 3: Curl/HTTP API

```bash
# Set your deploy key
export CONVEX_DEPLOY_KEY="dev:impartial-spoonbill-973|eyJ2MiI6IjJlY2IyZWY1ZWVkMzQ0MzE4NTU4YjZmNWVmZThmMjMzIn0="

# Deploy via HTTP (advanced)
curl -X POST "https://impartial-spoonbill-973.convex.cloud/api/deploy" \
  -H "Authorization: Bearer $CONVEX_DEPLOY_KEY" \
  -H "Content-Type: application/typescript" \
  --data-binary @convex/schema.ts
```

## After Deployment

Once deployed, the MCP server will show:
- ✅ Schema structure
- ✅ Table indexes
- ✅ Data types

Access via:
- MCP Dashboard: http://localhost:3001
- Admin Panel: https://3000-study-abroad-program-87632621.firebaseapp.com/admin

## Schema Overview

### Tables Created:

| Table | Purpose | Records |
|-------|---------|---------|
| `users` | Student profiles from Clerk | ~1 per student |
| `applications` | University applications | ~3-5 per student |
| `documents` | Uploaded files | ~8-12 per student |
| `tasks` | Deadlines & todos | ~10-20 per student |
| `universities` | University cache | ~100 records |
| `notifications` | User alerts | Dynamic |
| `activities` | Audit log | Continuous |

### Indexes Created:
- Fast lookups by user, status, date
- Efficient queries for dashboard
- Optimized for real-time updates
