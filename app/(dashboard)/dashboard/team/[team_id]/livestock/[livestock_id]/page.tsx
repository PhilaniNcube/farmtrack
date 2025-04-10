import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Tag, Users, AlertTriangle, FileText, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getLivestockById } from "@/lib/queries/livestock"
import { formatDate } from "@/lib/utils"

interface LivestockDetailPageProps {
  params: Promise<{
    livestock_id: number
    team_id: string
  }>
}

export default async function LivestockDetailPage({ params }: LivestockDetailPageProps) {

  const { livestock_id, team_id } = await params

  const livestock = await getLivestockById(livestock_id)

  if (!livestock) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-6">
        <Link href={`/dashboard/team/${team_id}/livestock`} passHref>
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Livestock
          </Button>
        </Link>
        <h1 className="text-3xl font-bold ml-4">
          Livestock Details
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Details about this livestock</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Type:</span>
              </div>
              <span className="font-semibold">{livestock.type}</span>
            </div>
            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Breed:</span>
              </div>
              <span className="font-semibold">{livestock.breed}</span>
            </div>
            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Count:</span>
              </div>
              <span className="font-semibold">{livestock.count}</span>
            </div>
            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Acquisition Date:</span>
              </div>
              <span className="font-semibold">{formatDate(livestock.acquisition_date)}</span>
            </div>
            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Location:</span>
              </div>
              <span className="font-semibold">{livestock.location}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
            <CardDescription>More information about this livestock</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Health Status:</span>
              </div>
              <Badge variant={livestock.health_status === "Healthy" ? "default" : "destructive"}>
                {livestock.health_status}
              </Badge>
            </div>
            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Purpose:</span>
              </div>
              <span className="font-semibold">{livestock.purpose || "Not specified"}</span>
            </div>
            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Source:</span>
              </div>
              <span className="font-semibold">{livestock.source || "Not specified"}</span>
            </div>
            <Separator />

            <div>
              <div className="flex items-center mb-2">
                <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Notes:</span>
              </div>
              <div className="bg-muted p-3 rounded-md">
                {livestock.notes || "No notes available"}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
          
            <Link href={`/dashboard/team/${team_id}/livestock/${livestock_id}/edit`} passHref>
              <Button>Edit Livestock</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}