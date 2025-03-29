
import { notFound } from "next/navigation"
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
import { stackServerApp } from "@/stack"
import { addMeAsFarmMember } from "@/app/actions/farm-members"
import AddMe from "./add-me"
import { getFarmMembers } from "@/lib/queries/farm-members"
import { getFarmById } from "@/lib/queries/farm-by-id"

export default async function FarmDetailsPage({
  params
}: {
  params: Promise<{ id: number }>
}) {

  const resolvedParams = await params  

  const farmId = resolvedParams.id
  const currentUser = await stackServerApp.getUser()
  
  if (await isNaN(farmId)) {
    return notFound()
  }

  const farmData =  getFarmById(farmId)
    const membersDta =  getFarmMembers(farmId)

    const [farm, members] = await Promise.all([
      farmData,
      membersDta
    ])

  if (!farm) {
    return await notFound()
  }

  return (
    <div className="container p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{farm.name}</h1>
        {farm.location && (
          <div className="flex items-center gap-1 text-muted-foreground mt-1">
            <MapPin className="h-4 w-4" />
            <span>{farm.location}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Farm Details</CardTitle>
              <CardDescription>
                Basic information about this farm
              </CardDescription>
            </CardHeader>
            <CardContent>
              {farm.description ? (
                <p>{farm.description}</p>
              ) : (
                <p className="text-muted-foreground italic">No description provided</p>
              )}
              
              <Separator className="my-4" />
              
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Created {formatDistanceToNow(new Date(farm.created_at), { addSuffix: true })}
                </span>
                {/* If I am the creator of the farm add a button to add me as a member */}
                <div>
                {farm.created_by === currentUser?.id && (
                 <AddMe farmId={farmId} addMeAsFarmMember={addMeAsFarmMember} />
                )}
                </div>
                
              </div>
            </CardContent>
          </Card>
          
          {/* Additional farm information cards can be added here */}
        </div>
        
        <div className="space-y-6 col-span-1 lg:col-span-2">
          <FarmMembers members={members} />
        </div>
      </div>
    </div>
  )
}