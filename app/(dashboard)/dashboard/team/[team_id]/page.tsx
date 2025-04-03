import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getCropsByTeamId, getNextCropsToBeHarvested } from '@/lib/queries/crops'
import { getTeam } from '@/lib/queries/teams'
import React from 'react'
import CropsCard from './_components/crops-card'

const TeamPage = async ({ params }: { params: Promise<{ team_id: string }> }) => {
  const { team_id } = await params

  const cropsData =  getNextCropsToBeHarvested(team_id)

  const [crops] = await Promise.all([
    cropsData,
  ])

  return (
    <div className='p-6'>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
         <CropsCard crops={crops} />
      </div> 
    </div>
  )
}

export default TeamPage