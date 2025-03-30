#!/usr/bin/env node

/**
 * This script helps test webhooks locally using SVIX CLI
 * 
 * Prerequisites:
 * 1. Install SVIX CLI: https://docs.svix.com/receiving/cli
 * 2. Run your Next.js app locally (e.g., npm run dev)
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Create a sample team created webhook payload
const sampleTeamPayload = {
  type: "team.created",
  data: {
    id: "team_local_test_123",
    display_name: "Local Test Team",
    created_at_millis: Date.now(),
    profile_image_url: "https://example.com/placeholder.png",
    server_metadata: {
      test: true,
      environment: "local"
    },
    client_metadata: {
      notes: "Created via local SVIX test"
    },
    client_read_only_metadata: {}
  }
};

// Check if .env file exists, create it if it doesn't
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('Creating .env.local file...');
  fs.writeFileSync(envPath, 'TEAMS_WEBHOOK_SECRET=whsec_test_your_secret_key_here\n');
  console.log('.env.local file created. Please update with your preferred secret key.');
}

// A function to run the SVIX listen command
function runSvixListen() {
  console.log('\n--- SVIX WEBHOOK TESTING TOOL ---');
  console.log('Starting SVIX CLI listener...');
  console.log('This will create a tunnel to forward webhooks to your local development server.\n');
  
  // Read the webhook secret from .env.local (or use a default for testing)
  let webhookSecret = 'whsec_test_your_secret_key_here';
  try {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const secretMatch = envContent.match(/TEAMS_WEBHOOK_SECRET=([^\n]+)/);
    if (secretMatch && secretMatch[1]) {
      webhookSecret = secretMatch[1];
    }
  } catch (err) {
    console.warn('Could not read .env.local file, using default webhook secret');
  }

  // Create a temporary payload file
  const payloadPath = path.join(process.cwd(), 'test-webhook-payload.json');
  fs.writeFileSync(payloadPath, JSON.stringify(sampleTeamPayload, null, 2));
  
  console.log('Sample webhook payload saved to:', payloadPath);
  console.log('\nTo test webhook, open a new terminal and run:');
  console.log(`svix webhook test http://localhost:3000/api/teams --secret "${webhookSecret}" -d @${payloadPath}\n`);
  
  console.log('Starting SVIX listener...');
  console.log('Press Ctrl+C to stop the listener\n');
  
  // Run the SVIX listen command
  const svixProcess = exec(`svix listen --http-path /api/teams --secret "${webhookSecret}"`);
  
  svixProcess.stdout.on('data', (data) => {
    console.log(data);
  });
  
  svixProcess.stderr.on('data', (data) => {
    console.error(data);
  });
  
  svixProcess.on('close', (code) => {
    console.log(`SVIX listener exited with code ${code}`);
    // Clean up the temporary payload file
    fs.unlinkSync(payloadPath);
  });
}

// Check if SVIX CLI is installed
exec('svix --version', (error) => {
  if (error) {
    console.error('SVIX CLI not found. Please install it first:');
    console.log('curl -Ls https://get.svix.com | sh');
    process.exit(1);
  } else {
    runSvixListen();
  }
});