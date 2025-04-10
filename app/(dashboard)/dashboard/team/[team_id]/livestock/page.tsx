import React from 'react'
import LivestockTable from "./_components/livestock-table"
import { getLivestock } from '@/lib/queries/livestock'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { LivestockHeader } from './_components/livestock-header'
import { LivestockOverview } from './_components/livestock-overview'

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
      <LivestockTable livestock={livestock} />
    </div>
  )
}