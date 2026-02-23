#!/usr/bin/env node
/**
 * Deploy Convex Schema via Management API
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const DEPLOY_KEY = 'dev:impartial-spoonbill-973|eyJ2MiI6IjJlY2IyZWY1ZWVkMzQ0MzE4NTU4YjZmNWVmZThmMjMzIn0=';
const PROJECT = 'impartial-spoonbill-973';
const ADMIN_URL = `https://${PROJECT}.convex.cloud`;

// Read schema file
const schemaPath = path.join(__dirname, '..', 'convex', 'schema.ts');
const schemaContent = fs.readFileSync(schemaPath, 'utf8');

console.log('🚀 Deploying schema to Convex...');
console.log('Project:', PROJECT);
console.log('Schema size:', schemaContent.length, 'bytes');
console.log('');

// Deploy via Convex admin API
const postData = JSON.stringify({
  schema: schemaContent,
  format: 'ts'
});

const options = {
  hostname: `${PROJECT}.convex.cloud`,
  port: 443,
  path: '/api/admin/deploy',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${DEPLOY_KEY}`,
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let data = '';
  
  console.log('Status:', res.statusCode);
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Schema deployed successfully!');
      try {
        const result = JSON.parse(data);
        console.log('Result:', result);
      } catch (e) {
        console.log('Response:', data);
      }
    } else {
      console.error('❌ Deployment failed:', res.statusCode);
      console.error('Response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('Request failed:', e.message);
  console.log('');
  console.log('⚠️  Please deploy manually via https://dashboard.convex.dev');
});

req.write(postData);
req.end();
