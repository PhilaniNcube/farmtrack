import { Button } from '@/components/ui/button'
import React from 'react'
import { CropsHeader } from './_components/crops-header'
import { CropsSummary } from './_components/crops-summary'
import { getCrops } from '@/lib/queries/crops'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CropsFilters } from './_components/crops-filter'
import { CropsTable } from './_components/crops-table'
import { CropsCalendar } from './_components/crops-calendar'


const CropsPage = async ({ params }: { params: Promise<{ team_id: string }> }) => {

  const { team_id } = await params

  const cropsData = getCrops(team_id)

  const [crops] = await Promise.all([
    cropsData,
  ])

  return (
    <div className='p-6'>
      <CropsHeader team_id={team_id} />
      <CropsSummary crops={crops} />
      <Tabs defaultValue="list" className="mt-6">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <CropsFilters />
          <CropsTable crops={crops} />
        </TabsContent>
        <TabsContent value="calendar">
          <CropsCalendar crops={crops} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CropsPage