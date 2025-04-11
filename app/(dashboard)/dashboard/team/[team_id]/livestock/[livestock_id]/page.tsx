import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Tag, Users, AlertTriangle, FileText, DollarSign, ChevronLeft, Plus, Minus, Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getLivestockById } from "@/lib/queries/livestock"
import { formatDate } from "@/lib/utils"
import { LivestockDetails } from "../_components/livestock-details"
import { getFieldLocations } from "@/lib/queries/field-locations"
import { incrementLivestockCount } from "@/app/actions/livestock"

interface LivestockDetailPageProps {
  params: Promise<{
    livestock_id: number
    team_id: string
  }>
}

export default async function LivestockDetailPage({ params }: LivestockDetailPageProps) {

  const { livestock_id, team_id } = await params

  const livestockData = getLivestockById(livestock_id)
  const fields = getFieldLocations(team_id)
  const [livestock, fieldLocations] = await Promise.all([
    livestockData,
    fields,
  ])

  if (!livestock) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/dashboard/team/${team_id}/livestock`}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {livestock.breed} {livestock.type}
            </h1>
            <p className="text-muted-foreground">
              {livestock.count} animals • {livestock.location}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Animals
          </Button>
          <Button variant="outline" size="sm">
            <Minus className="mr-2 h-4 w-4" />
            Remove Animals
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/dashboard/team/${livestock.team_id}/livestock/${livestock.id}`}>
              <FileText className="mr-2 h-4 w-4" />
              Health Records
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/dashboard/team/${livestock.team_id}/livestock/${livestock.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button variant="destructive">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
      <div className="mt-6">
        <LivestockDetails livestock={livestock} />
      </div>
    </div>
  )
}