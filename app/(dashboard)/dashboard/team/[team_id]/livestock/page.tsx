import React from 'react'
import LivestockTable from "./_components/livestock-table"
import { getLivestock } from '@/lib/queries/livestock'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { LivestockHeader } from './_components/livestock-header'
import { LivestockOverview } from './_components/livestock-overview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LivestockHealthGroups } from './_components/livestock-health-groups'


export default async function LivestockPage({ params }: { params: Promise<{ team_id: string }> }) {

  const { team_id } = await params

  // Fetch livestock data here if needed
  const livestockData = getLivestock(team_id)

  const [livestock] = await Promise.all([
    livestockData,
  ])

  return (
    <div className="p-6">
      <LivestockHeader team_id={team_id} />
      <LivestockOverview livestock={livestock} />
      <Tabs defaultValue="all-livestock" className="mt-6">
        <TabsList>
          <TabsTrigger value="all-livestock">All Livestock</TabsTrigger>
          <TabsTrigger value="health-concerns">Health Concerns</TabsTrigger>
   
        </TabsList>
        <TabsContent value="all-livestock" className="space-y-4">
          {/* <LivestockFilters /> */}
          <LivestockTable livestock={livestock} />
        </TabsContent>
        <TabsContent value="health-concerns" className="space-y-4">
          <LivestockHealthGroups livestock={livestock} />
        </TabsContent>
      
      </Tabs>
    
    </div>
  )
}