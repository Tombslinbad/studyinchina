import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all universities
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("universities").order("desc").take(100);
  },
});

// Get university by ID
export const getById = query({
  args: { id: v.id("universities") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Search universities
export const search = query({
  args: { query: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("universities").collect();
    
    if (!args.query) return all;
    
    const q = args.query.toLowerCase();
    return all.filter(u => 
      u.name.toLowerCase().includes(q) ||
      u.city.toLowerCase().includes(q) ||
      u.province.toLowerCase().includes(q) ||
      u.techHubs?.some(hub => hub.toLowerCase().includes(q))
    );
  },
});

// Get universities by city
export const getByCity = query({
  args: { city: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("universities")
      .withIndex("by_city", (q) => q.eq("city", args.city))
      .collect();
  },
});

// Create university (admin only)
export const create = mutation({
  args: {
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

    return await ctx.db.insert("universities", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Update university (admin only)
export const update = mutation({
  args: {
    id: v.id("universities"),
    name: v.optional(v.string()),
    city: v.optional(v.string()),
    province: v.optional(v.string()),
    ranking: v.optional(v.number()),
    isMoeCertified: v.optional(v.boolean()),
    tuitionBachelor: v.optional(v.number()),
    tuitionMaster: v.optional(v.number()),
    tuitionPhd: v.optional(v.number()),
    tuitionLanguage: v.optional(v.number()),
    hasDorm: v.optional(v.boolean()),
    techHubs: v.optional(v.array(v.string())),
    imageUrl: v.optional(v.string()),
    website: v.optional(v.string()),
    description: v.optional(v.string()),
    hskRequirement: v.optional(v.number()),
    ieltsRequirement: v.optional(v.number()),
    toeflRequirement: v.optional(v.number()),
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

    const { id, ...updates } = args;
    
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Delete university (admin only)
export const remove = mutation({
  args: { id: v.id("universities") },
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

    return await ctx.db.delete(args.id);
  },
});
