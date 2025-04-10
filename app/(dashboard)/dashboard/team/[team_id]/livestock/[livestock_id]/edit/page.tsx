import { notFound } from "next/navigation"
import { getLivestockById } from "@/lib/queries/livestock"
import EditLivestockForm from "../../_components/edit-livestock-form"

interface EditLivestockPageProps {
  params: Promise<{
    livestock_id: number
    team_id: string
  }>
}

export default async function EditLivestockPage({ params }: EditLivestockPageProps) {

    const { livestock_id, team_id } = await params

  const livestock = await getLivestockById(livestock_id)

  if (!livestock) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Livestock</h1>
      <EditLivestockForm livestock={livestock} team_id={team_id} />
    </div>
  )
}