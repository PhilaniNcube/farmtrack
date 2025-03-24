import { NextRequest } from "next/server";
import { geolocation } from '@vercel/functions'

export async function GET(req:Request) {

    const country = req.headers.get('x-vercel-ip-country');

    // Get the the geolocation from the request headers
    const city = geolocation(req)

    console.log({ city, country });

  return new Response(JSON.stringify({ city, country }), {
    status: 200,    
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
    });



}