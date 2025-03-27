
import { getCropsByFarmId } from "@/lib/queries/crops"
import CreateFarmDialog from "../_components/create-farm-dialog"
import { getAllMyFarms } from "@/lib/queries/farms"
import { FarmsList } from "./profile/farm-list"
import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarIcon, MapPinIcon } from "lucide-react"


export default async function Dashboard() {


  return (
    <div className="flex flex-col min-h-screen w-full ">
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-2">
            <CreateFarmDialog />
          </div>
        </div>
        <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="overflow-hidden flex flex-col justify-between">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">
                <Skeleton className="w-1/2 h-6 rounded-full" />
              </CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPinIcon className="h-3.5 w-3.5" />
                <Skeleton className="w-1/2 h-4 rounded-full" />
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <Skeleton className="w-full h-4 rounded-full" />
              <Skeleton className="w-full h-4 rounded-full" />
              <Skeleton className="w-full h-4 rounded-full" />
            </CardContent>
            <CardFooter className="flex flex-col items-start  justify-end gap-2 border-t pt-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarIcon className="h-3.5 w-3.5" />
                Created
                <Skeleton className="w-1/2 h-4 rounded-full" />
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Skeleton className="w-1/2 h-4 rounded-full" />
              </div>
            </CardFooter>
          </Card>
          <Card className="overflow-hidden flex flex-col justify-between">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">
                <Skeleton className="w-1/2 h-6 rounded-full" />
              </CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPinIcon className="h-3.5 w-3.5" />
                <Skeleton className="w-1/2 h-4 rounded-full" />
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <Skeleton className="w-full h-4 rounded-full" />
              <Skeleton className="w-full h-4 rounded-full" />
              <Skeleton className="w-full h-4 rounded-full" />
            </CardContent>
            <CardFooter className="flex flex-col items-start  justify-end gap-2 border-t pt-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarIcon className="h-3.5 w-3.5" />
                Created
                <Skeleton className="w-1/2 h-4 rounded-full" />
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Skeleton className="w-1/2 h-4 rounded-full" />
              </div>
            </CardFooter>
          </Card>
          <Card className="overflow-hidden flex flex-col justify-between">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">
                <Skeleton className="w-1/2 h-6 rounded-full" />
              </CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPinIcon className="h-3.5 w-3.5" />
                <Skeleton className="w-1/2 h-4 rounded-full" />
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <Skeleton className="w-full h-4 rounded-full" />
              <Skeleton className="w-full h-4 rounded-full" />
              <Skeleton className="w-full h-4 rounded-full" />
            </CardContent>
            <CardFooter className="flex flex-col items-start  justify-end gap-2 border-t pt-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarIcon className="h-3.5 w-3.5" />
                Created
                <Skeleton className="w-1/2 h-4 rounded-full" />
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Skeleton className="w-1/2 h-4 rounded-full" />
              </div>
            </CardFooter>
          </Card>
        </div>}>
          <FarmsList />
        </Suspense>





      </main>
    </div>
  )
}

