#!/usr/bin/env node
/**
 * Push Convex Schema using the Convex SDK
 */

const { spawn } = require('child_process');
const path = require('path');

process.env.CONVEX_DEPLOY_KEY = 'dev:impartial-spoonbill-973|eyJ2MiI6IjJlY2IyZWY1ZWVkMzQ0MzE4NTU4YjZmNWVmZThmMjMzIn0=';

const projectDir = path.join(__dirname, '..');

console.log('🚀 Pushing schema to Convex...');
console.log('Project: impartial-spoonbill-973');
console.log('');

// Try to use convex push
const convexPush = spawn('npx', ['convex', 'push'], {
  cwd: projectDir,
  env: process.env,
  stdio: 'inherit'
});

convexPush.on('close', (code) => {
  if (code === 0) {
    console.log('');
    console.log('✅ Schema pushed successfully!');
    process.exit(0);
  } else {
    console.log('');
    console.log('❌ Push failed with code:', code);
    console.log('');
    console.log('Alternative: Please deploy manually via https://dashboard.convex.dev');
    console.log('1. Go to Functions tab');
    console.log('2. Create schema.ts file');
    console.log('3. Paste content from convex/schema.ts');
    process.exit(1);
  }
});
