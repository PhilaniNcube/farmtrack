import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MilkIcon as Cow, Tag, MapPin, Clipboard, AlertTriangle } from "lucide-react"
import { Livestock, LivestockHealthStatus } from "@/lib/schema"
import { format } from "date-fns"

interface LivestockDetailsProps {
  livestock: Livestock
}

export function LivestockDetails({ livestock }: LivestockDetailsProps) {
  const getHealthStatusBadge = (status: LivestockHealthStatus) => {
    switch (status) {
      case "healthy":
        return <Badge variant="default">Healthy</Badge>
      case "new born":
        return <Badge variant="secondary">New Born</Badge>
      case "sick":
        return <Badge variant="destructive">Sick</Badge>
      case "needs_attention":
        return (
          <Badge variant="outline" className="border-orange-500 text-orange-500">
            Needs Attention
          </Badge>
        )  
      case "quarantine":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            Quarantined
          </Badge>
        )
      case "recovering":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Recovering
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPurposeBadge = (purpose: string | null) => {
    if (!purpose) return null

    const purposeColors: Record<string, string> = {
      dairy: "bg-blue-50",
      meat: "bg-red-50",
      breeding: "bg-purple-50",
      eggs: "bg-yellow-50",
      wool: "bg-indigo-50",
      multipurpose: "bg-green-50",
    }

    return (
      <Badge variant="outline" className={purposeColors[purpose] || "bg-gray-50"}>
        {purpose.charAt(0).toUpperCase() + purpose.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Group Details</CardTitle>
          <CardDescription>Basic information about this livestock group</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <Cow className="mr-2 h-4 w-4 text-amber-500" />
              <span className="font-medium">Animal Type</span>
            </div>
            <p className="text-sm pl-6 capitalize">
              {livestock.type} ({livestock.breed})
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <Clipboard className="mr-2 h-4 w-4 text-blue-500" />
              <span className="font-medium">Count</span>
            </div>
            <p className="text-2xl font-bold pl-6">{livestock.count} animals</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <MapPin className="mr-2 h-4 w-4 text-purple-500" />
              <span className="font-medium">Location</span>
            </div>
            <p className="text-sm pl-6">{livestock.location}</p>
          </div>

          <Separator />

          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
              <span className="font-medium">Health Status</span>
            </div>
            <div className="pl-6">
              {/* {getHealthStatusBadge(livestock.health_status)} */}
              {livestock.health_status !== "healthy" && (
                <p className="text-sm text-muted-foreground mt-1">
                  {livestock.health_status === "needs_attention" && "Some animals in this group need attention."}
                  {livestock.health_status === "sick" && "Some animals in this group are sick and need treatment."}
                  {livestock.health_status === "quarantine" && "This group is currently quarantined."}
                  {livestock.health_status === "recovering" && "This group is recovering from illness."}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <Tag className="mr-2 h-4 w-4 text-green-500" />
              <span className="font-medium">Purpose</span>
            </div>
            <div className="pl-6">{getPurposeBadge(livestock.purpose)}</div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Acquisition Information</h3>
            <div className="grid gap-2 md:grid-cols-2">
              <div className="rounded-md border p-2">
                <div className="text-xs text-muted-foreground">Acquisition Date</div>
                <div className="font-medium">{new Date(livestock.acquisition_date).toLocaleDateString()}</div>
              </div>
              <div className="rounded-md border p-2">
                <div className="text-xs text-muted-foreground">Source</div>
                <div className="font-medium">{livestock.source || "Not specified"}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
            <CardDescription>Additional information and observations</CardDescription>
          </CardHeader>
          <CardContent>
            {livestock.notes ? (
              <p className="whitespace-pre-line">{livestock.notes}</p>
            ) : (
              <p className="text-muted-foreground">No notes available for this livestock group</p>
            )}
          </CardContent>
        </Card>

   

        <Card>
          <CardHeader>
            <CardTitle>Metadata</CardTitle>
            <CardDescription>System information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Acquired:</span>
                <span>{format(livestock.acquisition_date, "PPP")}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated:</span>
                <span>{format(livestock.updated_at, "PPP")}</span>
              </div>
              <div className="flex justify-between">
                <span>Group ID:</span>
                <span>{livestock.id}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
