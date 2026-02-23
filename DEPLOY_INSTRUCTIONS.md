# Deploy Schema to Convex - Step by Step

Since Convex CLI has Node.js 20 compatibility issues, here's the manual deployment process:

## Quick Deploy (Copy-Paste Method)

### Step 1: Open Convex Dashboard
🔗 **Click this link:**
```
https://dashboard.convex.dev/d/impartial-spoonbill-973
```

### Step 2: Create Schema File
1. In the left sidebar, click **"Functions"**
2. Click the **"+"** button or **"New File"**
3. Name it: `schema.ts`
4. Copy the schema below

### Step 3: Copy This Schema

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
    role: v.union(v.literal("student"), v.literal("admin"), v.literal("consultant")),
    phone: v.optional(v.string()),
    dateOfBirth: v.optional(v.number()),
    targetYear: v.optional(v.number()),
    preferredCities: v.optional(v.array(v.string())),
    hskLevel: v.optional(v.number()),
    ieltsScore: v.optional(v.number()),
    toeflScore: v.optional(v.number()),
    gpa: v.optional(v.number()),
    isProfileComplete: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  applications: defineTable({
    userId: v.id("users"),
    universityId: v.optional(v.id("universities")),
    universityName: v.string(),
    programName: v.string(),
    degreeType: v.union(v.literal("bachelor"), v.literal("master"), v.literal("phd"), v.literal("language")),
    intakeYear: v.number(),
    intakeSemester: v.union(v.literal("spring"), v.literal("fall")),
    status: v.union(
      v.literal("draft"),
      v.literal("submitted"),
      v.literal("under_review"),
      v.literal("interview_scheduled"),
      v.literal("accepted"),
      v.literal("rejected"),
      v.literal("withdrawn")
    ),
    applicationFee: v.optional(v.number()),
    tuitionFee: v.optional(v.number()),
    scholarshipApplied: v.boolean(),
    scholarshipType: v.optional(v.string()),
    notes: v.optional(v.string()),
    submittedAt: v.optional(v.number()),
    decisionDate: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_status", ["userId", "status"])
    .index("by_status", ["status"]),

  documents: defineTable({
    userId: v.id("users"),
    name: v.string(),
    type: v.union(
      v.literal("passport"),
      v.literal("passport_photo"),
      v.literal("transcript"),
      v.literal("diploma"),
      v.literal("recommendation_1"),
      v.literal("recommendation_2"),
      v.literal("personal_statement"),
      v.literal("study_plan"),
      v.literal("cv"),
      v.literal("language_test"),
      v.literal("police_clearance"),
      v.literal("medical_exam"),
      v.literal("bank_statement"),
      v.literal("scholarship_letter"),
      v.literal("other")
    ),
    status: v.union(v.literal("pending_upload"), v.literal("uploaded"), v.literal("pending_verification"), v.literal("verified"), v.literal("rejected")),
    fileUrl: v.optional(v.string()),
    fileSize: v.optional(v.number()),
    mimeType: v.optional(v.string()),
    rejectionReason: v.optional(v.string()),
    uploadedAt: v.optional(v.number()),
    verifiedAt: v.optional(v.number()),
    verifiedBy: v.optional(v.id("users")),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_type", ["userId", "type"])
    .index("by_userId_status", ["userId", "status"])
    .index("by_status", ["status"]),

  tasks: defineTable({
    userId: v.id("users"),
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.number(),
    completed: v.boolean(),
    completedAt: v.optional(v.number()),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("urgent")),
    category: v.union(
      v.literal("document"),
      v.literal("application"),
      v.literal("visa"),
      v.literal("payment"),
      v.literal("medical"),
      v.literal("travel"),
      v.literal("other")
    ),
    relatedApplicationId: v.optional(v.id("applications")),
    relatedDocumentId: v.optional(v.id("documents")),
    reminderSent: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_completed", ["userId", "completed"])
    .index("by_dueDate", ["dueDate"]),

  universities: defineTable({
    name: v.string(),
    chineseName: v.optional(v.string()),
    city: v.string(),
    province: v.string(),
    ranking: v.number(),
    qsRanking: v.optional(v.number()),
    timesRanking: v.optional(v.number()),
    is985: v.boolean(),
    is211: v.boolean(),
    isDoubleFirstClass: v.boolean(),
    isMoeCertified: v.boolean(),
    hasEnglishPrograms: v.boolean(),
    tuitionBachelor: v.optional(v.number()),
    tuitionMaster: v.optional(v.number()),
    tuitionPhd: v.optional(v.number()),
    tuitionLanguage: v.optional(v.number()),
    hasDorm: v.boolean(),
    dormCost: v.optional(v.number()),
    techHubs: v.array(v.string()),
    programs: v.array(v.object({
      name: v.string(),
      degree: v.string(),
      duration: v.number(),
      language: v.string(),
      scholarships: v.boolean(),
    })),
    imageUrl: v.optional(v.string()),
    description: v.optional(v.string()),
    website: v.optional(v.string()),
    admissionEmail: v.optional(v.string()),
    lastUpdated: v.number(),
  })
    .index("by_ranking", ["ranking"])
    .index("by_city", ["city"]),

  notifications: defineTable({
    userId: v.id("users"),
    type: v.union(
      v.literal("application_update"),
      v.literal("document_verified"),
      v.literal("deadline_reminder"),
      v.literal("task_assigned"),
      v.literal("message"),
      v.literal("system")
    ),
    title: v.string(),
    message: v.string(),
    read: v.boolean(),
    readAt: v.optional(v.number()),
    relatedApplicationId: v.optional(v.id("applications")),
    relatedDocumentId: v.optional(v.id("documents")),
    actionUrl: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_read", ["userId", "read"]),

  activities: defineTable({
    userId: v.id("users"),
    actorId: v.optional(v.id("users")),
    action: v.union(
      v.literal("user_created"),
      v.literal("profile_updated"),
      v.literal("application_created"),
      v.literal("application_submitted"),
      v.literal("application_status_changed"),
      v.literal("document_uploaded"),
      v.literal("document_verified"),
      v.literal("task_completed"),
      v.literal("login"),
      v.literal("logout")
    ),
    details: v.optional(v.string()),
    metadata: v.optional(v.record(v.string(), v.any())),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_action", ["userId", "action"])
    .index("by_createdAt", ["createdAt"]),
});
```

### Step 4: Deploy
1. Paste the schema above
2. Click **"Save"** or **"Deploy"** button
3. Wait for deployment to complete (usually 5-10 seconds)

### Step 5: Verify
1. Go to **"Data"** tab in Convex dashboard
2. You should see all 7 tables listed:
   - users
   - applications
   - documents
   - tasks
   - universities
   - notifications
   - activities

✅ **Done!** Your schema is now deployed.

---

## Next Steps

After deploying, the MCP server will automatically show:
- Schema visualization
- Table relationships
- Real-time data metrics

Visit: http://localhost:3001 (MCP Dashboard)
