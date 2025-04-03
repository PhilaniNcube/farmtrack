import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getCropsByTeamId, getNextCropsToBeHarvested } from '@/lib/queries/crops'
import { getTeam } from '@/lib/queries/teams'
import React from 'react'
import CropsCard from './_components/crops-card'
import { getFinances } from '@/lib/queries/finances'
import FinancesSummaryCard from './_components/finances-summary-card'

const TeamPage = async ({ params }: { params: Promise<{ team_id: string }> }) => {
  const { team_id } = await params

  const cropsData =  getNextCropsToBeHarvested(team_id)
  const financesData = getFinances(team_id)

  const [crops, finances] = await Promise.all([
    cropsData,
    financesData,
  ])

  return (
    <div className='p-6'>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
         <CropsCard crops={crops} />
         <FinancesSummaryCard finances={finances} />
      </div> 
    </div>
  )
}

export default TeamPage