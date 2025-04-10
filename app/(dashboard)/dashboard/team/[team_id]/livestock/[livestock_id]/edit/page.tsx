import { notFound } from "next/navigation"
import { getLivestockById } from "@/lib/queries/livestock"
import EditLivestockForm from "../../_components/edit-livestock-form"

interface EditLivestockPageProps {
  params: {
    id: string
    team_id: string
  }
}

export default async function EditLivestockPage({ params }: EditLivestockPageProps) {
  const livestock = await getLivestockById(parseInt(params.id, 10))

  if (!livestock) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Livestock</h1>
      <EditLivestockForm livestock={livestock} team_id={params.team_id} />
    </div>
  )
}