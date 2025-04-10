import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import InventoryTable from './_components/inventory-table'
import { getInventoryItems } from '@/lib/queries/inventory'
import { InventoryHeader } from './_components/inventory-header'
import { InventoryOverview } from './_components/inventory-overview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LowStockAlerts } from './_components/low-stock-alerts'
import { CategoryBreakdown } from './_components/category-breakdown'

const InventoryPage = async ({ params }: { params: Promise<{ team_id: string }> }) => {

  const { team_id } = await params

  const inventoryData = getInventoryItems(team_id)

  const [inventory] = await Promise.all([
    inventoryData,
  ])

  return (
    <div className="p-6">
      <InventoryHeader team_id={team_id} />
      <InventoryOverview inventory={inventory} />

      <Tabs defaultValue="all-items" className="mt-6">
        <TabsList>
          <TabsTrigger value="all-items">All Items</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="all-items" className="space-y-4">
          {/* <InventoryFilters /> */}
          <InventoryTable inventory={inventory} />
        </TabsContent>
        <TabsContent value="low-stock" className="space-y-4">
          <LowStockAlerts inventory={inventory} />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <CategoryBreakdown inventory={inventory} />
          </div>
        </TabsContent>
      </Tabs>

      
    </div>
  )
}

export default InventoryPage