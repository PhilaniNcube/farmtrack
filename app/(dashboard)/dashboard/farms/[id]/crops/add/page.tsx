import { AddCropForm } from "@/components/add-crop-form"

export default async function AddCropPage({params}:{params:Promise<{id: string}>}) {
  const { id } = await params
  console.log("Farm ID: ", id)
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold tracking-tight mb-6">Add New Crop</h1>
          <AddCropForm />
        </div>
      </main>
    </div>
  )
}

