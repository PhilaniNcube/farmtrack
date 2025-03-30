import { Webhook } from 'svix';
import { NextRequest } from 'next/server';

interface WebhookVerifyOptions {
  /**
   * The raw request body as a string
   */
  payload: string;
  
  /**
   * The headers from the request
   */
  headers: {
    [key: string]: string | null;
  };
  
  /**
   * The signing secret
   */
  secret: string;
}

/**
 * Verify a webhook signature using SVIX
 */
export async function verifyWebhookSignature(options: WebhookVerifyOptions) {
  const { payload, headers, secret } = options;
  
  // Get the signature header
  const svixId = headers['svix-id'] || null;
  const svixTimestamp = headers['svix-timestamp'] || null;
  const svixSignature = headers['svix-signature'] || null;
  
  // For Stack Auth compatibility (used in production)
  const stackSignature = headers['x-stack-signature'] || null;
  
  // Check if we're in development mode and using SVIX CLI
  const isLocalTestingWithSvix = svixId && svixTimestamp && svixSignature;
  
  // Check if we're in production with Stack Auth
  const isStackAuth = stackSignature && !isLocalTestingWithSvix;
  
  // If we're using Stack Auth and not SVIX, use original verification method
  if (isStackAuth) {
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', secret);
    const computedSignature = hmac.update(payload).digest('hex');
    
    // Use constant-time comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(stackSignature),
      Buffer.from(computedSignature)
    );
  }
  
  // If we're using SVIX (local development)
  if (isLocalTestingWithSvix) {
    try {
      const wh = new Webhook(secret);
      wh.verify(
        payload,
        {
          'svix-id': svixId || '',
          'svix-timestamp': svixTimestamp || '',
          'svix-signature': svixSignature || ''
        }
      );
      return true;
    } catch (err) {
      console.error('SVIX Verification failed:', err);
      return false;
    }
  }
  
  // If no valid signature method was found
  return false;
}

/**
 * Helper to extract headers from a Next.js request
 */
export function getHeadersFromRequest(req: NextRequest) {
  const headers: { [key: string]: string | null } = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });
  return headers;
}