import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(request: NextRequest) {

    // Parse the request body
    const body = await request.json();
    const rawBody = JSON.stringify(body);
    
    // Get the webhook secret
    const webhookSecret = process.env.USERS_WEBHOOK_SECRET;
    if (!webhookSecret) {
        console.error('USERS_WEBHOOK_SECRET not configured');
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

}