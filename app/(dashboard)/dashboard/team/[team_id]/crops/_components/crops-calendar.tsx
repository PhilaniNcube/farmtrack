"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Leaf, CalendarIcon } from "lucide-react"
import { Crop } from "@/lib/schema"

export function CropsCalendar({crops}:{crops:Crop[]}) {
  const [date, setDate] = useState<Date | undefined>(new Date())


  // Function to check if a date has planting or harvest events
  const hasPlantingEvent = (day: Date) => {
    return crops.some((event) => event.planting_date.toDateString() === day.toDateString())
  }

  const hasHarvestEvent = (day: Date) => {
    return crops.some((event) => event.expected_harvest_date.toDateString() === day.toDateString())
  }

  // Get events for the selected date
  const getEventsForDate = (selectedDate: Date) => {
    const plantingEvents = crops.filter(
      (event) => event.planting_date.toDateString() === selectedDate.toDateString(),
    )

    const harvestEvents = crops.filter((event) => event.expected_harvest_date.toDateString() === selectedDate.toDateString())

    return { plantingEvents, harvestEvents }
  }

  const { plantingEvents, harvestEvents } = date ? getEventsForDate(date) : { plantingEvents: [], harvestEvents: [] }

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_300px]">
      <Card>
        <CardHeader>
          <CardTitle>Crop Calendar</CardTitle>
          <CardDescription>View planting and harvest dates for all crops</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{
              planting: (date) => hasPlantingEvent(date),
              harvest: (date) => hasHarvestEvent(date),
            }}
            modifiersClassNames={{
              planting: "bg-green-100 text-green-900 font-bold",
              harvest: "bg-amber-100 text-amber-900 font-bold",
            }}
          />
          <div className="mt-4 flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className="mr-2 h-3 w-3 rounded-full bg-green-500" />
              <span className="text-sm">Planting Date</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-3 w-3 rounded-full bg-amber-500" />
              <span className="text-sm">Harvest Date</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {date
              ? date.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Select a date"}
          </CardTitle>
          <CardDescription>Crop events for the selected date</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            {plantingEvents.length > 0 && (
              <div className="mb-4">
                <h3 className="font-medium flex items-center">
                  <Leaf className="mr-2 h-4 w-4 text-green-500" />
                  Planting Events
                </h3>
                <ul className="mt-2 space-y-2">
                  {plantingEvents.map((event) => (
                    <li key={event.id} className="rounded-md border p-2">
                      <div className="font-medium">{event.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {event.variety} • {event.location}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {harvestEvents.length > 0 && (
              <div>
                <h3 className="font-medium flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4 text-amber-500" />
                  Harvest Events
                </h3>
                <ul className="mt-2 space-y-2">
                  {harvestEvents.map((event) => (
                    <li key={event.id} className="rounded-md border p-2">
                      <div className="font-medium">{event.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {event.variety} • {event.location}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {plantingEvents.length === 0 && harvestEvents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">No crop events scheduled for this date</div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

