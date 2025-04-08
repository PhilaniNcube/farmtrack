import { Button } from '@/components/ui/button'
import { getCropActivities } from '@/lib/queries/crop_activities'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ActivitiesHeader } from './_components/activities-header'
import { ActivitiesList } from './_components/activities-list'

const ActivitiesPage = async ({ params }: { params: Promise<{ crop_id: number, team_id: string }> }) => {

  const { crop_id, team_id } = await params

  const activitiesData = getCropActivities(crop_id)

  const [activities] = await Promise.all([
    activitiesData,
  ])

  return (
    <div className="p-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/team/${team_id}/crops`} className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back to crop details</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crop Activities</h1>
          <p className="text-muted-foreground">Manage all activities for this crop</p>
        </div>
      </div>
      <ActivitiesHeader activities={activities} />
      <div className="mt-4">
        <ActivitiesList activities={activities} />
      </div>
    </div>
  )
}

export default ActivitiesPage