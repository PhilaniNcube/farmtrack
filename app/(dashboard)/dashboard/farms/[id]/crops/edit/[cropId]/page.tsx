import { UpdateCropForm } from "@/components/update-crop-form"
import { getFieldLocations } from "@/lib/queries/field-locations"
import { getCropById } from "@/lib/queries/crops"
import { notFound } from "next/navigation"

export default async function EditCropPage({ params }: { params: Promise<{ id: string, cropId: string }> }) {

    const { id, cropId } = await params

    const farmId = Number(id)


    // Fetch the crop data
    const crop = await getCropById(Number(cropId))

    // Fetch field locations for the farm
    const fieldLocations = await getFieldLocations(farmId)

    if (!crop) {
        notFound()
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 p-4 md:p-6">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-2xl font-bold tracking-tight mb-6">Edit Crop</h1>
                    <UpdateCropForm crop={crop} fields={fieldLocations} />
                </div>
            </main>
        </div>
    )
}