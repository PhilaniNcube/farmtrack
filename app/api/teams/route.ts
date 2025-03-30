// this route is used to receive a webook from stack auth when a team is created in stack auth

import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';
import { TeamWebhookSchema } from '@/lib/schema/teams';
import { createTeam } from '@/lib/queries/teams';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const rawBody = JSON.stringify(body);
    

    
    // Get the webhook secret
    const webhookSecret = process.env.TEAMS_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('TEAMS_WEBHOOK_SECRET not configured');
      return NextResponse.json(
        { success: false, message: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

   const headerPayload = await headers()

   const svix_id = headerPayload.get('svix-id')!;
   const svix_timestamp = headerPayload.get('svix-timestamp')!;
   const svix_signature = headerPayload.get('svix-signature')!;

   const whHeaders = {
    "svix-id": svix_id,
    "svix-timestamp": svix_timestamp,
    "svix-signature": svix_signature,
  };

    console.log({whHeaders});
    


    if(!svix_id || !svix_timestamp || !svix_signature) {
      console.error('Missing required headers for webhook verification');
      return NextResponse.json(
        { success: false, message: 'Missing required headers for webhook verification' },
        { status: 400 }
      );
    }

    const wh = new Webhook(webhookSecret);
    // Verify the webhook signature
    const isValid = wh.verify(
      body, whHeaders
    );

    console.log(`Webhook signature valid: ${isValid}`);

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