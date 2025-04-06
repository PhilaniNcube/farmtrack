import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crop } from "@/lib/schema"
import { Leaf, Calendar, TrendingUp, MapPin } from "lucide-react"

export function CropsSummary({crops}:{crops:Crop[]}) {

// get the total number of crops
  const totalCrops = crops.length  

// get the total number of locations
  const totalLocations = crops.reduce((acc, crop) => {
    if (!acc.includes(crop.location)) {
      acc.push(crop.location)
    }
    return acc
  }
  , [] as string[])

  console.log("Total Locations: ", totalLocations)

// get the number of harvests in the next 2 months
    const upcomingHarvests = crops.filter(crop => {
        const harvestDate = new Date(crop.expected_harvest_date)
        const currentDate = new Date()
        const twoMonthsFromNow = new Date(currentDate.setMonth(currentDate.getMonth() + 2))
        return harvestDate <= twoMonthsFromNow
    }).length  


// get the total area of crops in acres
const totalArea = crops.reduce((acc, crop) => {
    const areaValue = parseFloat(crop.area); // Convert string to number
    
    if (crop.area_unit === "acres") {
        return acc + areaValue;
    } else if (crop.area_unit === "hectares") {
        return acc + areaValue * 2.47105; // convert hectares to acres
    } else if (crop.area_unit === "square_meters") {
        return acc + areaValue * 0.000247105; // convert square meters to acres
    }
    return acc;
}, 0);

  // In a real app, these would be fetched from your database
  const metrics = [
  
    {
      title: "Upcoming Harvests",
      value: upcomingHarvests,
      description: "Within 2 months",
      icon: Calendar,
      color: "text-amber-500",
    },
    {
      title: "Total Area",
      value: `${totalArea.toFixed(2)} acres`,
      description: "Under cultivation",
      icon: MapPin,
      color: "text-blue-500",
    },
    // {
    //   title: "Yield Forecast",
    //   value: "+12%",
    //   description: "Compared to last season",
    //   icon: TrendingUp,
    //   color: "text-emerald-500",
    // },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Crops</CardTitle>
            <Leaf className={`h-4 w-4 text-green-500`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
                {totalCrops}
            </div>
            <p className="text-xs text-muted-foreground">Across {totalLocations.length} locations</p>
          </CardContent>
        </Card>
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">{metric.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

