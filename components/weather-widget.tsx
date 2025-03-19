"use client"

import { useState } from "react"
import { Cloud, CloudRain, Sun, Wind } from "lucide-react"

export function WeatherWidget() {
  const [location, setLocation] = useState("Farm Location")

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">{location}</h3>
          <p className="text-sm text-muted-foreground">April 20, 2025</p>
        </div>
        <div className="flex items-center">
          <Sun className="h-10 w-10 text-yellow-500 mr-2" />
          <div>
            <p className="text-2xl font-bold">72°F</p>
            <p className="text-sm text-muted-foreground">Sunny</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 pt-4 border-t">
        <div className="text-center">
          <p className="text-sm font-medium">Tomorrow</p>
          <Cloud className="h-8 w-8 mx-auto my-2 text-blue-500" />
          <p className="text-sm">68°F</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">Wed</p>
          <CloudRain className="h-8 w-8 mx-auto my-2 text-blue-500" />
          <p className="text-sm">65°F</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">Thu</p>
          <Wind className="h-8 w-8 mx-auto my-2 text-blue-500" />
          <p className="text-sm">70°F</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">Fri</p>
          <Sun className="h-8 w-8 mx-auto my-2 text-yellow-500" />
          <p className="text-sm">75°F</p>
        </div>
      </div>
    </div>
  )
}

