import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { CalendarIcon, MapPinIcon } from 'lucide-react'
import React from 'react'

const DashboardFallback = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
  )
}

export default DashboardFallback