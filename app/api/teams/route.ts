// this route is used to receive a webook from stack auth when a team is created in stack auth

import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';
import { TeamWebhookSchema } from '@/lib/schema/teams';
import { createTeam } from '@/lib/queries/teams';
import { verifyWebhookSignature, getHeadersFromRequest } from '@/lib/svix';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const rawBody = JSON.stringify(body);
    
    // Get headers from the request
    const headers = getHeadersFromRequest(request);
    
    // Get the webhook secret
    const webhookSecret = process.env.TEAMS_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('TEAMS_WEBHOOK_SECRET not configured');
      return NextResponse.json(
        { success: false, message: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    // Verify the webhook signature (works with both Stack Auth and SVIX)
    const isValidSignature = await verifyWebhookSignature({
      payload: rawBody,
      headers,
      secret: webhookSecret
    });
    
    if (!isValidSignature) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { success: false, message: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    // Signature is valid, proceed with validating the payload
    const validatedData = TeamWebhookSchema.parse(body);
    
    // Check if the webhook type is "team.created"
    if (validatedData.type !== "team.created") {
      console.log(`Ignoring webhook of type: ${validatedData.type}`);
      return NextResponse.json({ success: true, message: 'Webhook received but ignored' });
    }
    
    // Extract team data
    const { 
      id, 
      display_name, 
      profile_image_url, 
      server_metadata,
      client_metadata,
      client_read_only_metadata
    } = validatedData.data;
    
    // Create team in database
    await createTeam(
      id,
      display_name,
      profile_image_url,
      server_metadata,
      client_metadata,
      client_read_only_metadata
    );
    
    console.log(`Successfully created team: ${display_name} (${id})`);
    
    // Return 200 status to confirm receipt
    return NextResponse.json({ success: true, message: 'Team created successfully' });
  } catch (error) {
    console.error('Error processing team webhook:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid webhook payload', errors: error.issues },
        { status: 400 }
      );
    }
    
    if (error instanceof TypeError && error.message.includes('timingSafeEqual')) {
      return NextResponse.json(
        { success: false, message: 'Error validating webhook signature' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}