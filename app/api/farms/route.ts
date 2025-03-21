import { NextResponse } from "next/server";
import { getMyFarms } from "@/lib/queries/farms";
import { stackServerApp } from "@/stack";

export async function GET() {
  try {
    // Check authentication
    const currentUser = await stackServerApp.getUser();
    if (!currentUser?.id) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // Fetch farms for the authenticated user
    const farms = await getMyFarms();
    
    return NextResponse.json(farms);
  } catch (error) {
    console.error("Error fetching farms:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch farms" }), {
      status: 500,
    });
  }
}