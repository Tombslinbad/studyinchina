import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all documents for current user
export const getMyDocuments = query({
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
      .query("documents")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();
  },
});

// Add a new document
export const addDocument = mutation({
  args: {
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
    fileUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    return await ctx.db.insert("documents", {
      userId: user._id,
      name: args.name,
      type: args.type,
      status: "pending",
      fileUrl: args.fileUrl,
      uploadedAt: Date.now(),
    });
  },
});

// Update document status (admin only or auto-update)
export const updateDocumentStatus = mutation({
  args: {
    documentId: v.id("documents"),
    status: v.union(v.literal("pending"), v.literal("verified"), v.literal("rejected")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const document = await ctx.db.get(args.documentId);
    if (!document) throw new Error("Document not found");

    // Verify ownership
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user || document.userId !== user._id) {
      throw new Error("Not authorized");
    }

    return await ctx.db.patch(args.documentId, {
      status: args.status,
    });
  },
});

// Delete document
export const deleteDocument = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const document = await ctx.db.get(args.documentId);
    if (!document) throw new Error("Document not found");

    // Verify ownership
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user || document.userId !== user._id) {
      throw new Error("Not authorized");
    }

    return await ctx.db.delete(args.documentId);
  },
});
