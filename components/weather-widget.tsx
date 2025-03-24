

import { Weather } from "@/lib/schema/weather"
import { format } from "date-fns"
import { Cloud, CloudFog, CloudMoonRain, CloudRain, Sun, Wind } from "lucide-react"

export async function WeatherWidget({location}: { location: string }) {

  const weatherData = await fetch(`http://localhost:3000/api/weather?query=${location}`)
  const weather : Weather = await weatherData.json()

  console.log( weather)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">{weather.weatherData.location.name}</h3>
          <p className="text-sm text-muted-foreground">{format(weather.weatherData.location.localtime, "PP")}</p>
        </div>
        <div className="flex items-center">
          <Sun className="h-10 w-10 text-yellow-500 mr-2" />
          <div>
            <p className="text-2xl font-bold">{weather.weatherData.current.temp_c} &#8451;</p>
            <p className="text-sm text-muted-foreground">Sunny</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 pt-4 border-t">
        <div className="text-center">
          <p className="text-sm font-medium">Dew Point</p>
          <CloudFog className="h-8 w-8 mx-auto my-2 text-blue-500" />
          <p className="text-sm">{weather.weatherData.current.dewpoint_c} &#8451;</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">Humidity</p>
          <CloudRain className="h-8 w-8 mx-auto my-2 text-blue-500" />
          <p className="text-sm">{weather.weatherData.current.humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">Gusts</p>
          <Wind className="h-8 w-8 mx-auto my-2 text-blue-500" />
          <p className="text-sm">{weather.weatherData.current.gust_kph}km/h</p>
        </div>
        
      </div>
    </div>
  )
}

