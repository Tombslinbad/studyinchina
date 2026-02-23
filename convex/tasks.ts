import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all tasks for current user
export const getMyTasks = query({
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
      .query("tasks")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();
  },
});

// Get pending (incomplete) tasks
export const getPendingTasks = query({
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
      .query("tasks")
      .withIndex("by_userId_completed", (q) => 
        q.eq("userId", user._id).eq("completed", false)
      )
      .collect();
  },
});

// Create a new task
export const createTask = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.number(),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    category: v.union(
      v.literal("document"),
      v.literal("application"),
      v.literal("visa"),
      v.literal("payment"),
      v.literal("other")
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    return await ctx.db.insert("tasks", {
      userId: user._id,
      title: args.title,
      description: args.description,
      dueDate: args.dueDate,
      priority: args.priority,
      category: args.category,
      completed: false,
    });
  },
});

// Toggle task completion
export const toggleTaskCompletion = mutation({
  args: {
    taskId: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const task = await ctx.db.get(args.taskId);
    if (!task) throw new Error("Task not found");

    // Verify ownership
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user || task.userId !== user._id) {
      throw new Error("Not authorized");
    }

    return await ctx.db.patch(args.taskId, {
      completed: !task.completed,
    });
  },
});

// Delete task
export const deleteTask = mutation({
  args: {
    taskId: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const task = await ctx.db.get(args.taskId);
    if (!task) throw new Error("Task not found");

    // Verify ownership
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user || task.userId !== user._id) {
      throw new Error("Not authorized");
    }

    return await ctx.db.delete(args.taskId);
  },
});
