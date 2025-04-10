import { notFound } from "next/navigation"
import { getLivestockById } from "@/lib/queries/livestock"
import EditLivestockForm from "../../_components/edit-livestock-form"
import { getFieldLocations } from "@/lib/queries/field-locations"
import { LivestockDetails } from "../../_components/livestock-details"

interface EditLivestockPageProps {
  params: Promise<{
    livestock_id: number
    team_id: string
  }>
}

export default async function EditLivestockPage({ params }: EditLivestockPageProps) {

    const { livestock_id, team_id } = await params

    const livestockData =  getLivestockById(livestock_id)
    const fields =  getFieldLocations(team_id)
    const [livestock, fieldLocations] = await Promise.all([
      livestockData,
      fields,
    ])

  if (!livestock) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Livestock</h1>
      <div className="grid gap-6 md:grid-cols-2">
      <EditLivestockForm livestock={livestock} team_id={team_id} locations={fieldLocations} />
       <LivestockDetails livestock={livestock} />
       </div>
       </div>
  )
}