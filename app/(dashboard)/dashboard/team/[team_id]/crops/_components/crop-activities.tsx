import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Droplets, Sprout, CloudRain, Tractor, CloudDrizzle, Crop, TreePalm, LeafyGreen, LucideLeaf } from "lucide-react"
import AddCropActivityDialog from "@/components/add-crop-activity-dialog"
import { ActivityType, CropActivity } from "@/lib/schema"
import { format } from "date-fns"
import { act } from "react"

interface CropActivitiesProps {
  activities: CropActivity[]
}

export function CropActivities({ activities }: CropActivitiesProps) {


  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case "irrigating":
        return CloudRain
      case "fertilizing":
        return Sprout
      case "planting":
        return Tractor
      default:
        return Droplets
    }
  }

  const getActivityBadge = (type: ActivityType) => {
    switch (type) {
      case "irrigating":
        return (
          <Badge variant="outline" className="bg-blue-50">
            Irrigation
          </Badge>
        )
      case "fertilizing":
        return (
          <Badge variant="outline" className="bg-green-50">
            Fertilization
          </Badge>
        )
      case "planting":
        return (
          <Badge variant="outline" className="bg-amber-50">
            Planting
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-2">
          <CardTitle>Crop Activities</CardTitle>
          <CardDescription>Record of all activities for this crop</CardDescription>
        </div>
        <AddCropActivityDialog />
      </CardHeader>
      <CardContent>
        <div className="relative space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex gap-4">
              <div className="relative flex h-6 w-6 flex-none items-center justify-center">
                <div className="absolute h-full w-px bg-border" />
                {activity.type === "irrigating" ? (
                  <CloudDrizzle className="absolute -left-2 h-4 w-4 text-blue-500" />
                ) :
                  activity.type === "fertilizing" ? (
                    <Crop className="absolute -left-2 h-4 w-4 text-green-500" />
                  ) :
                    activity.type === "planting" ? (
                      <Tractor className="absolute -left-2 h-4 w-4 text-amber-500" />) : 
                      activity.type === "harvesting" ? (
                        <LeafyGreen className="absolute -left-2 h-4 w-4 text-green-500" />) :
                        activity.type === "weeding" ? (
                          <LucideLeaf className="absolute -left-2 h-4 w-4 text-green-500" />) :
                          
                      (<Droplets className="absolute -left-2 h-4 w-4 text-muted-foreground" />)}

              </div>
              <div className="flex-1 rounded-md border p-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{activity.name}</div>
                  {getActivityBadge(activity.type!)}
                </div>
                <div className="text-sm text-muted-foreground">{activity.description}</div>
                <div className="mt-1 text-xs text-muted-foreground">{format(activity.scheduled_date, "PPP")}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

