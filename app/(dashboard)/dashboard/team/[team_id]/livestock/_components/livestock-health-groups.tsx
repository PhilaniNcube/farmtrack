"use client"

import { Livestock } from "@/lib/schema"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Eye, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Health status configuration with display settings
const healthStatusConfig = {
  "healthy": { color: "bg-green-100 text-green-800", icon: null, priority: 4 },
  "sick": { color: "bg-red-100 text-red-800", icon: <AlertTriangle className="h-4 w-4 mr-1" />, priority: 1 },
  "injured": { color: "bg-orange-100 text-orange-800", icon: <AlertTriangle className="h-4 w-4 mr-1" />, priority: 2 },
  "recovering": { color: "bg-yellow-100 text-yellow-800", icon: null, priority: 3 },
  "pregnant": { color: "bg-blue-100 text-blue-800", icon: null, priority: 3 },
  "quarantined": { color: "bg-purple-100 text-purple-800", icon: <AlertTriangle className="h-4 w-4 mr-1" />, priority: 2 }
}

// Default color for unknown health statuses
const defaultStatusColor = "bg-gray-100 text-gray-800"

export function LivestockHealthGroups({ livestock }: { livestock: Livestock[] }) {
  const params = useParams()
  const team_id = params.team_id as string

  // Group livestock by health status
  const groupedLivestock = livestock.reduce((groups, animal) => {
    const status = animal.health_status?.toLowerCase() || "unknown"
    if (!groups[status]) {
      groups[status] = []
    }
    groups[status].push(animal)
    return groups
  }, {} as Record<string, Livestock[]>)

  // Sort the health statuses by priority (concerns first)
  const sortedStatuses = Object.keys(groupedLivestock).sort((a, b) => {
    const priorityA = healthStatusConfig[a as keyof typeof healthStatusConfig]?.priority || 5
    const priorityB = healthStatusConfig[b as keyof typeof healthStatusConfig]?.priority || 5
    return priorityA - priorityB
  })

  // Filter out healthy animals if you only want to show concerns
  const concernStatuses = sortedStatuses.filter(status => status !== "healthy")

  // If no health concerns are found
  if (concernStatuses.length === 0 || (concernStatuses.length === 1 && concernStatuses[0] === "healthy")) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>No Health Concerns</CardTitle>
          <CardDescription>All livestock are currently healthy.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {sortedStatuses.map(status => {
        const animals = groupedLivestock[status]
        const config = healthStatusConfig[status as keyof typeof healthStatusConfig] || { color: defaultStatusColor, icon: null }
        
        if (status === "healthy") return null // Skip healthy animals in the concerns view
        
        return (
          <Card key={status} className="overflow-hidden">
            <CardHeader className={`${status === "sick" || status === "injured" || status === "quarantined" ? "bg-red-50" : ""}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CardTitle className="capitalize">{status} Livestock</CardTitle>
                  <Badge className={`ml-2 ${config.color}`}>
                    {animals.length} {animals.length === 1 ? "animal" : "animals"}
                  </Badge>
                </div>
              </div>
              <CardDescription>
                {status === "sick" || status === "injured" ? 
                  "These animals need immediate attention" : 
                  status === "recovering" ? 
                  "These animals are recovering but still need monitoring" :
                  status === "quarantined" ?
                  "These animals are separated from the herd for health reasons" :
                  status === "pregnant" ?
                  "These animals require special care during pregnancy" :
                  "Animals grouped by health status"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {animals.map(animal => (
                  <div key={animal.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                    <div>
                      <div className="font-medium">
                        {animal.count} {animal.breed} {animal.type}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        <span>Location: {animal.location}</span>
                        <span className="mx-2">•</span>
                        <span>Since: {formatDate(animal.acquisition_date)}</span>
                      </div>
                      {animal.notes && (
                        <div className="text-sm text-gray-500 mt-1 italic">
                          "{animal.notes.length > 100 ? `${animal.notes.substring(0, 100)}...` : animal.notes}"
                        </div>
                      )}
                    </div>
                    <Link href={`/dashboard/team/${team_id}/livestock/${animal.id}`}>
                      <Button variant="outline" size="sm" className="ml-2">
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
