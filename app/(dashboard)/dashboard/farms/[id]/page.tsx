import { db } from "@/lib/db"
import { farms } from "@/lib/schema"
import { notFound } from "next/navigation"
import { eq } from "drizzle-orm"
import { FarmMembers } from "@/components/farm-members"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { MapPin, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Separator } from "@/components/ui/separator"

export default async function FarmDetailsPage({
  params
}: {
  params: { id: string }
}) {
  const farmId = parseInt(params.id)
  
  if (isNaN(farmId)) {
    return notFound()
  }

  const farmData = await db.query.farms.findFirst({
    where: eq(farms.id, farmId)
  })

  if (!farmData) {
    return notFound()
  }

  return (
    <div className="container py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{farmData.name}</h1>
        {farmData.location && (
          <div className="flex items-center gap-1 text-muted-foreground mt-1">
            <MapPin className="h-4 w-4" />
            <span>{farmData.location}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Farm Details</CardTitle>
              <CardDescription>
                Basic information about this farm
              </CardDescription>
            </CardHeader>
            <CardContent>
              {farmData.description ? (
                <p>{farmData.description}</p>
              ) : (
                <p className="text-muted-foreground italic">No description provided</p>
              )}
              
              <Separator className="my-4" />
              
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Created {formatDistanceToNow(new Date(farmData.created_at), { addSuffix: true })}
                </span>
              </div>
            </CardContent>
          </Card>
          
          {/* Additional farm information cards can be added here */}
        </div>
        
        <div className="space-y-6">
          <FarmMembers farmId={farmId} />
        </div>
      </div>
    </div>
  )
}