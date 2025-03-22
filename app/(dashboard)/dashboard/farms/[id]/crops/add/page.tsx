import { AddCropForm } from "@/components/add-crop-form"
import AddFieldLocation from "../add-field-location"
import { getFieldLocations } from "@/lib/queries/field-locations"

export default async function AddCropPage({params}:{params:Promise<{id: string}>}) {
  const { id } = await params
  console.log("Farm ID: ", id)

  // Fetch field locations for the farm
  const fieldLocations = await getFieldLocations(Number(id))

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight mb-6">Add New Crop</h1>
          <AddFieldLocation farmId={Number(id)} />
          </div>
          
          <AddCropForm fields={fieldLocations} />
        </div>
      </main>
    </div>
  )
}

