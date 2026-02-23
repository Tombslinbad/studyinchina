#!/usr/bin/env node
/**
 * Deploy Convex Schema via Management API
 */

const https = require('https');

const DEPLOY_KEY = process.env.CONVEX_DEPLOY_KEY || 'dev:impartial-spoonbill-973|eyJ2MiI6IjJlY2IyZWY1ZWVkMzQ0MzE4NTU4YjZmNWVmZThmMjMzIn0=';
const PROJECT = 'impartial-spoonbill-973';

const schema = `
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
    .index("by_userId", ["userId"])
    .index("by_userId_type", ["userId", "type"]),

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
`;

console.log('📤 Deploying schema to Convex...');
console.log('Project:', PROJECT);
console.log('');

// For now, just output the schema that needs to be deployed
console.log('Schema to deploy:');
console.log(schema);
console.log('');
console.log('⚠️  Please deploy manually via https://dashboard.convex.dev');
console.log('   Project:', PROJECT);
