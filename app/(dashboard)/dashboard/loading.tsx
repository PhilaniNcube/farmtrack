import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function DashboardLoading() {
  return (
    <div className="flex h-screen w-full">
    

      {/* Main content skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Header skeleton */}
        <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Create Farm
            </Button>
        </div></div>

        {/* Content skeleton */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            {/* Page title */}
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-96" />
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array(3).fill(null).map((_, i) => (
                <div key={i} className="p-6 border rounded-lg">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-4 w-32 mt-4" />
                </div>
              ))}
            </div>

            {/* Content cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Array(4).fill(null).map((_, i) => (
                <div key={i} className="border rounded-lg p-6">
                  <Skeleton className="h-6 w-48 mb-4" />
                  <div className="space-y-3">
                    {Array(4).fill(null).map((_, j) => (
                      <div key={j} className="flex items-center space-x-4">
                        <Skeleton className="h-10 w-10 rounded-md" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-3 w-3/4" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}