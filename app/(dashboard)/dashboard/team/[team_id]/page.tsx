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
import PendingTasks from '@/app/(dashboard)/_components/pending-tasks'
import InventoryCard from '@/app/(dashboard)/_components/inventory-card'
import { getInventoryItems } from '@/lib/queries/inventory'
import { CropStatus } from './_components/crop-status'
import { getFieldLocations } from '@/lib/queries/field-locations'
import { LivestockSummary } from './_components/livestock-summary'
import { InventoryLevels } from './_components/inventory-levels'

const TeamPage = async ({ params }: { params: Promise<{ team_id: string }> }) => {
  const { team_id } = await params

  const cropsData =  getNextCropsToBeHarvested(team_id)
  const financesData = getQuarterlyFinances(team_id)
  const livestockData = getLivestock(team_id)
  const tasksData = getRecentTasks(team_id)
  const inventoryData = getInventoryItems(team_id)
  const fieldsData = getFieldLocations(team_id)

  const [crops, finances, livestock, tasks, inventory, fields] = await Promise.all([
    cropsData,
    financesData,
    livestockData,
    tasksData,
    inventoryData,
    fieldsData,
  ])

  return (
    <div className='p-6'>
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ActiveCropsCard crops={crops} />
        <LivestockCard livestock={livestock} />
        <PendingTasks tasks={tasks} />
        <InventoryCard inventory={inventory} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 *:mt-4">
      <div className="col-span-4">
          <RecentTasks tasks={tasks} />
        </div>
        <div className="col-span-3">
          <CropStatus crops={crops} locations={fields} />
        </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <div className="col-span-3">
          <LivestockSummary livestock={livestock} fields={fields} />
        </div>
        <div className="col-span-4">
          <InventoryLevels inventory={inventory} fields={fields} />
        </div>
      </div>
    </div>
  )
}

export default TeamPage