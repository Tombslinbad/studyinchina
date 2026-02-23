import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all applications (admin only)
export const getAllApplications = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    return await ctx.db.query("applications").order("desc").take(100);
  },
});

// Get all applications for current user
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

// Get applications by pipeline stage (for Kanban)
export const getByPipelineStage = query({
  args: { stage: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("applications")
      .withIndex("by_pipelineStage", (q) => q.eq("pipelineStage", args.stage as any))
      .collect();
  },
});

// Create a new application
export const createApplication = mutation({
  args: {
    universityId: v.optional(v.id("universities")),
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
      ...args,
      status: "draft",
      pipelineStage: "inquiry",
      updatedAt: Date.now(),
    });
  },
});

// Update application status
export const updateApplicationStatus = mutation({
  args: {
    applicationId: v.id("applications"),
    status: v.union(
      v.literal("draft"),
      v.literal("submitted"),
      v.literal("under_review"),
      v.literal("accepted"),
      v.literal("rejected")
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const application = await ctx.db.get(args.applicationId);
    if (!application) throw new Error("Application not found");

    // Verify ownership
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user || (application.userId !== user._id && user.role !== "admin")) {
      throw new Error("Not authorized");
    }

    const updates: any = {
      status: args.status,
      updatedAt: Date.now(),
    };

    if (args.status === "submitted" && !application.submittedAt) {
      updates.submittedAt = Date.now();
      updates.pipelineStage = "submitted";
    }

    return await ctx.db.patch(args.applicationId, updates);
  },
});

// Update pipeline stage (admin only)
export const updatePipelineStage = mutation({
  args: {
    applicationId: v.id("applications"),
    pipelineStage: v.union(
      v.literal("inquiry"),
      v.literal("documents"),
      v.literal("submitted"),
      v.literal("review"),
      v.literal("jw202"),
      v.literal("embassy"),
      v.literal("approved")
    ),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Check admin role
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user || user.role !== "admin") {
      throw new Error("Not authorized");
    }

    const updates: any = {
      pipelineStage: args.pipelineStage,
      updatedAt: Date.now(),
    };

    if (args.notes) {
      updates.notes = args.notes;
    }

    return await ctx.db.patch(args.applicationId, updates);
  },
});

// Assign application to admin
export const assignApplication = mutation({
  args: {
    applicationId: v.id("applications"),
    assignedTo: v.id("users"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Check admin role
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user || user.role !== "admin") {
      throw new Error("Not authorized");
    }

    return await ctx.db.patch(args.applicationId, {
      assignedTo: args.assignedTo,
      updatedAt: Date.now(),
    });
  },
});

// Delete application
export const deleteApplication = mutation({
  args: {
    applicationId: v.id("applications"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const application = await ctx.db.get(args.applicationId);
    if (!application) throw new Error("Application not found");

    // Verify ownership
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user || (application.userId !== user._id && user.role !== "admin")) {
      throw new Error("Not authorized");
    }

    return await ctx.db.delete(args.applicationId);
  },
});
