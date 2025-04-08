import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, MapPin, Ruler, Leaf } from "lucide-react"
import { Crop } from "@/lib/schema"
import { differenceInCalendarDays, format, formatDistance } from "date-fns"

interface CropDetailsProps {
  crop: Crop
}

export function CropDetails({ crop }: CropDetailsProps) {


  const getStatusBadge = (status: string) => {
    switch (status) {
      case "growing":
        return <Badge variant="secondary">Growing</Badge>
      case "ready":
        return <Badge variant="default">Ready for Harvest</Badge>
      case "harvested":
        return <Badge variant="outline">Harvested</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }


//   calculate datys remaining from harvest using date-fns
const daysRemaining = formatDistance(new Date(crop.expected_harvest_date), new Date(), { addSuffix: false })


  const totalDays = differenceInCalendarDays(crop.planting_date, crop.expected_harvest_date) 
  const daysPassed = differenceInCalendarDays(new Date(), crop.planting_date)

    // Function to calculate progress percentage based on todays date, planting date and harvest date
    const calculateProgress = () => {
        const totalDays = differenceInCalendarDays(crop.expected_harvest_date, crop.planting_date)
        const daysPassed = differenceInCalendarDays(new Date(), crop.planting_date)
        return Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100)
      }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crop Details</CardTitle>
        <CardDescription>Detailed information about this crop</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Growth Progress</h3>
          <Progress value={calculateProgress()} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Planted {daysPassed} days ago</span>
            <span>{daysRemaining} until harvest</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <Leaf className="mr-2 h-4 w-4 text-green-500" />
              <span className="font-medium">Crop Type</span>
            </div>
            <p className="text-sm pl-6">
              {`${crop.name} (${crop.variety})`}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <MapPin className="mr-2 h-4 w-4 text-blue-500" />
              <span className="font-medium">Location</span>
            </div>
            <p className="text-sm pl-6">{crop.location}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <Ruler className="mr-2 h-4 w-4 text-amber-500" />
              <span className="font-medium">Area</span>
            </div>
            <p className="text-sm pl-6">
              {`${crop.area} ${crop.area_unit}`} 
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <CalendarDays className="mr-2 h-4 w-4 text-purple-500" />
              <span className="font-medium">Status</span>
            </div>
            <div className="text-sm pl-6">
              <Badge variant="outline" className="text-xs">
                {crop.status}
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Key Dates</h3>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="rounded-md border p-2">
              <div className="text-xs text-muted-foreground">Planting Date</div>
              <div className="font-medium">{format(crop.planting_date, "PPP")}</div>
            </div>
            <div className="rounded-md border p-2">
              <div className="text-xs text-muted-foreground">Expected Harvest</div>
              <div className="font-medium">{format(crop.expected_harvest_date, "PPP")}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

