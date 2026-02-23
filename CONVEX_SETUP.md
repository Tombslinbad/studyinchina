# Convex Backend Setup Guide

## Step 1: Create Convex Account
1. Go to https://convex.dev
2. Sign up with your email or GitHub
3. Create a new project

## Step 2: Get Your Convex URL
1. In the Convex dashboard, go to **Settings** (gear icon)
2. Copy the **Deployment URL**
3. It looks like: `https://happy-fox-123.convex.cloud`

## Step 3: Add to Environment Variables
Paste your Convex URL in `.env.local`:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-actual-url.convex.cloud
```

## Step 4: Deploy Schema
Run these commands in your terminal:

```bash
cd /home/user/study-abroad-program
npx convex dev
```

This will:
- Deploy your schema to Convex
- Start the Convex dev server
- Generate the API types

## Step 5: Test the Integration
1. Sign in to your app
2. Your user profile will be automatically synced to Convex
3. Check the Convex dashboard to see your data

## Database Schema

### Users
- Synced from Clerk authentication
- Stores profile info, country, program interest

### Applications
- University applications per user
- Tracks status: draft → submitted → under_review → accepted/rejected

### Documents
- User uploaded documents
- Types: passport, transcript, recommendation, etc.
- Status: pending → verified → rejected

### Tasks
- Deadlines and to-do items
- Categories: document, application, visa, payment, other

## API Functions Available

### Users
- `getCurrentUser()` - Get logged-in user's profile
- `syncUser()` - Sync Clerk user to Convex
- `updateProfile()` - Update user info

### Applications
- `getMyApplications()` - Get all your applications
- `createApplication()` - Create new application
- `updateApplicationStatus()` - Update status
- `deleteApplication()` - Delete application

### Documents
- `getMyDocuments()` - Get all your documents
- `addDocument()` - Add new document
- `updateDocumentStatus()` - Update verification status
- `deleteDocument()` - Delete document

### Tasks
- `getMyTasks()` - Get all tasks
- `getPendingTasks()` - Get incomplete tasks
- `createTask()` - Create new task
- `toggleTaskCompletion()` - Mark complete/incomplete
- `deleteTask()` - Delete task

## Real-time Features
Convex provides real-time updates automatically. When data changes, your UI updates instantly without needing to refresh!
