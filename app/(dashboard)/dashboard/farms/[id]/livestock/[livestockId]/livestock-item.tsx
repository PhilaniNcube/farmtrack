"use client"

import { MilkIcon as Cow, Calendar, MapPin, Target, FileText, Tag } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Livestock } from "@/lib/schema"
import UpdateTypeDialog from "./update-type-dialog"

// Utility function to format dates
function formatDate(date: Date | string): string {
  const d = date instanceof Date ? date : new Date(date)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d)
}



export function LivestockItem({ livestock }: {livestock:Livestock}) {
  // Format dates for display
  const formattedAcquisitionDate = formatDate(livestock.acquisition_date)

  // Map health status to color
  const healthStatusColor = () => {
    switch (livestock.health_status.toLowerCase()) {
      case "healthy":
        return "bg-green-500"
      case "sick":
        return "bg-red-500"
      case "recovering":
        return "bg-yellow-500"
      case "quarantined":
        return "bg-orange-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <Card className="w-full max-w-none">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Cow className="h-5 w-5" />
              {livestock.breed} {livestock.type}
              <UpdateTypeDialog livestockId={livestock.id} type={livestock.type} />
            </CardTitle>
            <CardDescription>ID: {livestock.id}</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1">
                  <span className={`h-3 w-3 rounded-full ${healthStatusColor()}`} />
                  <span className="text-sm font-medium">{livestock.health_status}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Health Status</p>
              </TooltipContent>
            </Tooltip>
            </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <Tag className="mr-1 h-4 w-4" />
              Count
            </div>
            <p className="font-medium">{livestock.count}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              Acquired
            </div>
            <p className="font-medium">{formattedAcquisitionDate}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              Location
            </div>
            <p className="font-medium">{livestock.location}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <Target className="mr-1 h-4 w-4" />
              Purpose
            </div>
            <p className="font-medium">{livestock.purpose || "N/A"}</p>
          </div>
        </div>

        {livestock.source && (
          <div className="space-y-1">
            <p className="text-sm font-medium">Source</p>
            <p className="text-sm text-muted-foreground">{livestock.source}</p>
          </div>
        )}

        {livestock.notes && (
          <div className="space-y-1">
            <div className="flex items-center text-sm font-medium">
              <FileText className="mr-1 h-4 w-4" />
              Notes
            </div>
            <p className="text-sm text-muted-foreground">{livestock.notes}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <div>Farm ID: {livestock.farm_id}</div>
        <div>Updated: {formatDate(livestock.updated_at)}</div>
      </CardFooter>
    </Card>
  );
}

