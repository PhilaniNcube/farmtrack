import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import InventoryTable from './_components/inventory-table'
import { getInventoryItems } from '@/lib/queries/inventory'

const InventoryPage = async ({ params }: { params: Promise<{ team_id: string }> }) => {

  const { team_id } = await params

  const inventoryData = getInventoryItems(team_id)

  const [inventory] = await Promise.all([
    inventoryData,
  ])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Inventory</h2>
        <Link href={`/dashboard/team/${team_id}/inventory/add`} passHref>
          <Button className="bg-green-700 hover:bg-green-800 text-white">
            <Plus className="mr-1 h-4 w-4" />
            Add Inventory</Button>
        </Link>
      </div>
      <InventoryTable inventory={inventory} />
    </div>
  )
}

export default InventoryPage