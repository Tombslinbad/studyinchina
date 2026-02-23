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

  universities: defineTable({
    name: v.string(),
    city: v.string(),
    province: v.string(),
    ranking: v.optional(v.number()),
    isMoeCertified: v.boolean(),
    tuitionBachelor: v.optional(v.number()),
    tuitionMaster: v.optional(v.number()),
    tuitionPhd: v.optional(v.number()),
    tuitionLanguage: v.optional(v.number()),
    hasDorm: v.boolean(),
    techHubs: v.optional(v.array(v.string())),
    imageUrl: v.optional(v.string()),
    website: v.optional(v.string()),
    description: v.optional(v.string()),
    hskRequirement: v.optional(v.number()),
    ieltsRequirement: v.optional(v.number()),
    toeflRequirement: v.optional(v.number()),
    scholarships: v.optional(v.array(v.object({
      name: v.string(),
      amount: v.optional(v.number()),
      coverage: v.optional(v.string()),
    }))),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_city", ["city"])
    .index("by_province", ["province"])
    .index("by_ranking", ["ranking"]),

  applications: defineTable({
    userId: v.id("users"),
    universityId: v.optional(v.id("universities")),
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
    pipelineStage: v.optional(v.union(
      v.literal("inquiry"),
      v.literal("documents"),
      v.literal("submitted"),
      v.literal("review"),
      v.literal("jw202"),
      v.literal("embassy"),
      v.literal("approved")
    )),
    submittedAt: v.optional(v.number()),
    updatedAt: v.number(),
    assignedTo: v.optional(v.id("users")),
    notes: v.optional(v.string()),
  })
    .index("by_userId", ["userId"])
    .index("by_status", ["status"])
    .index("by_pipelineStage", ["pipelineStage"])
    .index("by_assignedTo", ["assignedTo"]),

  documents: defineTable({
    userId: v.id("users"),
    applicationId: v.optional(v.id("applications")),
    name: v.string(),
    type: v.union(
      v.literal("passport"),
      v.literal("transcript"),
      v.literal("recommendation"),
      v.literal("personal_statement"),
      v.literal("cv"),
      v.literal("language_test"),
      v.literal("jw202_form"),
      v.literal("dq_form"),
      v.literal("other")
    ),
    status: v.union(v.literal("pending"), v.literal("verified"), v.literal("rejected")),
    fileUrl: v.optional(v.string()),
    storageId: v.optional(v.string()),
    uploadedAt: v.number(),
    verifiedAt: v.optional(v.number()),
    verifiedBy: v.optional(v.id("users")),
  })
    .index("by_userId", ["userId"])
    .index("by_applicationId", ["applicationId"])
    .index("by_status", ["status"]),

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

  visaApplications: defineTable({
    userId: v.id("users"),
    applicationId: v.id("applications"),
    country: v.string(),
    currentStage: v.union(
      v.literal("inquiry"),
      v.literal("documents_collected"),
      v.literal("submitted"),
      v.literal("under_review"),
      v.literal("approved"),
      v.literal("jw202_issued"),
      v.literal("visa_stamped")
    ),
    progress: v.number(),
    jw202Number: v.optional(v.string()),
    dqNumber: v.optional(v.string()),
    embassyLocation: v.optional(v.string()),
    appointmentDate: v.optional(v.number()),
    timeline: v.optional(v.array(v.object({
      stage: v.string(),
      date: v.number(),
      notes: v.optional(v.string()),
    }))),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_applicationId", ["applicationId"])
    .index("by_currentStage", ["currentStage"]),
});
