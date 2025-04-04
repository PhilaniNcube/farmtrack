import React from 'react'
import LivestockTable from "./_components/livestock-table"
import { getLivestock } from '@/lib/queries/livestock'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default async function LivestockPage({ params }: { params: Promise<{ team_id: string }> }) {

  const { team_id } = await params

  // Fetch livestock data here if needed
  const livestockData = getLivestock(team_id)

  const [livestock] = await Promise.all([
    livestockData,
  ])


  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Livestock Inventory</h2>
        <Link href={`/dashboard/team/${team_id}/livestock/add`} passHref>
          <Button className="bg-green-700 hover:bg-green-800 text-white">
            <Plus className="mr-1 h-4 w-4" />
            Add Livestock</Button>
        </Link>
      </div>
      <LivestockTable livestock={livestock} />
    </div>
  )
}