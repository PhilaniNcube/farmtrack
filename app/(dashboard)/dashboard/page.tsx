import { Suspense } from "react"
import { Leaf, DollarSign, BarChart3, MilkIcon as Cow, Calendar, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { FarmSummary } from "@/components/farm-summary"
import { RecentActivities } from "@/components/recent-activities"
import { WeatherWidget } from "@/components/weather-widget"
import { UpcomingTasks } from "@/components/upcoming-tasks"



import { getCropsByFarmId } from "@/lib/queries/crops"

export default async function Dashboard() {
  const crops = await getCropsByFarmId(1) // Replace with actual farm ID
  const { livestock = [] } =  {}

  const { activities = [] } = {}
  const { tasks = [] } =  {}

  const activeCrops = crops.filter((crop) => crop.status === "growing" || crop.status === "planted")

  return (
    <div className="flex flex-col min-h-screen w-full ">
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Today
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Record
            </Button>
          </div>
        </div>

      

      

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Weather Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
                <WeatherWidget />
              </Suspense>
            </CardContent>
          </Card>

          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
                <UpcomingTasks tasks={tasks} />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

