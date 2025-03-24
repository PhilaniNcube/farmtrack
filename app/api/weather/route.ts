import { NextRequest } from "next/server";
import { geolocation } from '@vercel/functions'

export async function GET(request:NextRequest) {

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')

    console.log("query", query)
  


  const location =  query || "Port Elizabeth";

  const BASE_URL = "http://api.weatherapi.com/v1"

  const API_KEY = process.env.WEATHER_API_KEY || "";

  

  const weatherRes = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${location}`);
  const weatherData = await weatherRes.json();

    if (weatherData.error) {
        return new Response(JSON.stringify({ error: weatherData.error.message }), {
        status: 400,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
        },
        });
    }


  

  return new Response(JSON.stringify({ weatherData }), {
    status: 200,    
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
    });



}