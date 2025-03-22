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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Crops</CardTitle>
              <Leaf className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{crops.length}</div>
              <p className="text-xs text-muted-foreground">{activeCrops.length} currently growing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Livestock</CardTitle>
              <Cow className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{livestock.length}</div>
              <p className="text-xs text-muted-foreground">
                {livestock.length > 0 ? "+2 since last month" : "No livestock recorded"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${ "0.00"}</div>
              <p className="text-xs text-muted-foreground">
                {"-12% from last month"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projected Yield</CardTitle>
              <BarChart3 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4 tons</div>
              <p className="text-xs text-muted-foreground">+18% from last season</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Farm Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
                <FarmSummary />
              </Suspense>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
                <RecentActivities activities={activities} />
              </Suspense>
            </CardContent>
          </Card>
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

