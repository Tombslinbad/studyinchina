# Deploy Schema to Convex - Simplified

## Copy This Exact Schema

Go to https://dashboard.convex.dev/d/impartial-spoonbill-973

Click **Functions** → **New File** → Name: `schema.ts`

Paste this:

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    fullName: v.optional(v.string()),
    country: v.optional(v.string()),
    interestedProgram: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    role: v.union(v.literal("student"), v.literal("admin")),
    createdAt: v.number(),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"]),

  applications: defineTable({
    userId: v.id("users"),
    universityName: v.string(),
    programName: v.string(),
    degreeType: v.union(v.literal("bachelor"), v.literal("master"), v.literal("phd")),
    status: v.union(
      v.literal("draft"),
      v.literal("submitted"),
      v.literal("under_review"),
      v.literal("accepted"),
      v.literal("rejected")
    ),
    submittedAt: v.optional(v.number()),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_status", ["status"]),

  documents: defineTable({
    userId: v.id("users"),
    name: v.string(),
    type: v.union(
      v.literal("passport"),
      v.literal("transcript"),
      v.literal("recommendation"),
      v.literal("personal_statement"),
      v.literal("cv"),
      v.literal("language_test"),
      v.literal("other")
    ),
    status: v.union(v.literal("pending"), v.literal("verified"), v.literal("rejected")),
    fileUrl: v.optional(v.string()),
    uploadedAt: v.number(),
  })
    .index("by_userId", ["userId"]),

  tasks: defineTable({
    userId: v.id("users"),
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.number(),
    completed: v.boolean(),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    category: v.union(
      v.literal("document"),
      v.literal("application"),
      v.literal("visa"),
      v.literal("payment"),
      v.literal("other")
    ),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_completed", ["userId", "completed"]),
});
```

Click **Deploy**

## Tables Created

- `users` - Student profiles
- `applications` - University applications  
- `documents` - Uploaded files
- `tasks` - Deadlines

## Next: Add API Functions

After schema deploys, create these files in Convex dashboard:

### `users.ts`
```typescript
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    return await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();
  },
});

export const syncUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    fullName: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();
    if (existing) {
      return await ctx.db.patch(existing._id, {
        email: args.email,
        fullName: args.fullName,
        avatarUrl: args.avatarUrl,
      });
    } else {
      return await ctx.db.insert("users", {
        clerkId: args.clerkId,
        email: args.email,
        fullName: args.fullName,
        avatarUrl: args.avatarUrl,
        role: "student",
        createdAt: Date.now(),
      });
    }
  },
});
```

### `applications.ts`
```typescript
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getMyApplications = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!user) return [];
    return await ctx.db
      .query("applications")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();
  },
});

export const createApplication = mutation({
  args: {
    universityName: v.string(),
    programName: v.string(),
    degreeType: v.union(v.literal("bachelor"), v.literal("master"), v.literal("phd")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!user) throw new Error("User not found");
    return await ctx.db.insert("applications", {
      userId: user._id,
      universityName: args.universityName,
      programName: args.programName,
      degreeType: args.degreeType,
      status: "draft",
      updatedAt: Date.now(),
    });
  },
});
```

Deploy each file after creating.
