import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getCropsByTeamId, getNextCropsToBeHarvested } from '@/lib/queries/crops'
import { getTeam } from '@/lib/queries/teams'
import React from 'react'
import CropsCard from './_components/crops-card'
import { getFinances, getQuarterlyFinances } from '@/lib/queries/finances'
import FinancesSummaryCard from './_components/finances-summary-card'
import ActiveCropsCard from '@/app/(dashboard)/_components/active-crops-card'
import { getLivestock } from '@/lib/queries/livestock'
import LivestockCard from '@/app/(dashboard)/_components/livestock-card'
import RecentTasks from '@/app/(dashboard)/_components/recent-tasks'
import { getRecentTasks } from '@/lib/queries/tasks'

const TeamPage = async ({ params }: { params: Promise<{ team_id: string }> }) => {
  const { team_id } = await params

  const cropsData =  getNextCropsToBeHarvested(team_id)
  const financesData = getQuarterlyFinances(team_id)
  const livestockData = getLivestock(team_id)
  const tasksData = getRecentTasks(team_id)

  const [crops, finances, livestock, tasks] = await Promise.all([
    cropsData,
    financesData,
    livestockData,
    tasksData,
  ])

  return (
    <div className='p-6'>
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ActiveCropsCard crops={crops} />
        <LivestockCard livestock={livestock} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 *:mt-4">
      <div className="col-span-4">
          <RecentTasks tasks={tasks} />
        </div>
        </div>
    </div>
  )
}

export default TeamPage