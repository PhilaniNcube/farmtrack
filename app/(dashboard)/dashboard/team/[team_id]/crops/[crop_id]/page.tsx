import { Button } from '@/components/ui/button'
import { getCropById } from '@/lib/queries/crops'
import { format } from 'date-fns'
import { ChevronLeft, Edit, Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { CropDetails } from '../_components/crop-details'
import { CropActivities } from '../_components/crop-activities'
import { getCropActivities } from '@/lib/queries/crop_activities'
import { CropNotes } from '../_components/crop-notes'
import { getCropNotesByCropId } from '@/lib/queries/crop_notes'

const CropPage = async ({params}:{params:Promise<{crop_id:number}>}) => {

    const { crop_id } = await params

    const cropData = getCropById(crop_id)
    const activitiesData = getCropActivities(crop_id)
    const notesData = getCropNotesByCropId(crop_id)

    const [crop, activities, notes] = await Promise.all([
        cropData,
        activitiesData,
        notesData,
    ])

    if (!crop) {
        return <div>Crop not found</div>
    }

  return (
    <div className="p-6">
          <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/dashboard/team/${crop.team_id}/crops`} className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
                {crop.name} ({crop.status})
            </h1>
            <p className="text-muted-foreground">{crop.location} • {crop.area} {crop.area_unit} • Planted on {format(crop.planting_date, "PPP")}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/team/${crop.team_id}/crops/${crop.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Crop
            </Link>
          </Button>
          <Button variant="destructive">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-7">
        <div className="md:col-span-4 space-y-6">
          <CropDetails crop={crop} />
          <CropNotes notes={notes} />
        </div>
        <div className="md:col-span-3 space-y-6">
          <CropActivities activities={activities}  />
        </div>
      </div>
    </div>
  )
}

export default CropPage