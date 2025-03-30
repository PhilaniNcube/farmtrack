# Webhook Testing with SVIX

This guide explains how to test webhooks locally in the FarmTrack application using the SVIX tool.

## Prerequisites

1. Install the SVIX CLI:
   ```sh
   curl -Ls https://get.svix.com | sh
   ```
   Or on Windows with PowerShell:
   ```powershell
   iwr -useb https://get.svix.com/windows | iex
   ```

2. Make sure your application is running locally:
   ```sh
   pnpm run dev
   ```

## Testing Webhooks Locally

We've set up a simple command to help test webhooks:

```sh
pnpm run webhook:test
```

This will:
1. Start a SVIX listener that creates a tunnel to your local server
2. Generate a sample webhook payload for testing
3. Provide instructions for sending test webhook events

## How it Works

The webhook testing setup consists of:

1. **SVIX Integration**: We've integrated the SVIX library to verify webhook signatures in our API endpoints.
2. **Dual Signature Verification**: Our code supports both Stack Auth signatures (for production) and SVIX signatures (for local development).
3. **Testing Script**: The `test-webhooks.js` script helps you run the SVIX listener and generate test events.

## Environment Configuration

The script will create a `.env.local` file if one doesn't exist, with a default webhook secret:

```
TEAMS_WEBHOOK_SECRET=whsec_test_your_secret_key_here
```

You can customize this secret as needed.

## Testing Custom Webhook Payloads

To test with a custom payload:

1. Create a JSON file with your test payload
2. Use the SVIX CLI to send it:
   ```sh
   svix webhook test http://localhost:3000/api/teams --secret "your_secret" -d @path/to/payload.json
   ```

## Viewing Results

When you send a test webhook, you'll see:
- SVIX CLI output showing the request details
- Your application logs showing the webhook processing

This helps you debug and validate your webhook handlers without needing to deploy to production.