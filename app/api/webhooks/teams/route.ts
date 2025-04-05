// this route is used to receive a webook from stack auth when a team is created in stack auth

import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';
import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { createTeam, deleteTeam } from '@/app/actions/teams';
import { getTeam } from '@/lib/queries/teams';

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

    console.log({ whHeaders, body });



    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error('Missing required headers for webhook verification');
      return NextResponse.json(
       
        { status: 400 }
      );
    }

    const wh = new Webhook(webhookSecret);
    // Verify the webhook signature
    const isValid = wh.verify(
      rawBody, whHeaders
    );

   if (!isValid) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { status: 401 }
      );
    }




    // Extract team data
    const {
      id,
      display_name,
      profile_image_url,
      server_metadata,
      client_metadata,
      client_read_only_metadata
    } = body.data;

    if (body.type === "team.created") {

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
      return NextResponse.json({ success: true}, { status: 200 });

    }

    if (body.type === "team.updated") {
      // Handle team updated event if needed
      console.log(`Team updated: ${display_name} (${id})`);

      // check if the team exists in the database
      const teamExists = await getTeam(id);

      console.log("teamExists", teamExists)
      // If the team does not exist, create it

      if (teamExists === null) {
        
     const created =  await createTeam(
          id,
          display_name,
          profile_image_url,
          server_metadata,
          client_metadata,
          client_read_only_metadata
        );

        console.log("created", JSON.stringify(created, null, 2))

        return NextResponse.json(
          { success: false, message: 'Team updated' },
          { status: 200 }
        );
      }

      // Return 200 status to confirm receipt
      return NextResponse.json({ success: true}, { status: 200 });

    }

    if (body.type === "team.deleted") {
      // Handle team updated event if needed
      console.log(`Team updated: ${display_name} (${id})`);

      await deleteTeam(id);

      // Return 200 status to confirm receipt
      return NextResponse.json({ success: true}, { status: 200 });

    }

    // If the event type is not recognized, return 400
    console.error(`Unhandled event type: ${body.type}`);
    return NextResponse.json(
      { success: false, message: 'Unhandled event type' },
      { status: 200 }
    );




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

        { status: 401 }
      );
    }

    return NextResponse.json(

      { status: 500 }
    );
  }
}