import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Inventory, Livestock } from '@/lib/schema'
import { Milk, Warehouse } from 'lucide-react'


const InventoryCard = ({inventory}:{inventory:Inventory[]}) => {

// get low stock items
const lowStockItems = inventory.filter((item) => Number(item.quantity) <= 5).length   
   


  return (
    <Card >
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Inventory</CardTitle>
      <Warehouse className="h-4 w-4 text-red-500" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{lowStockItems}</div>
      <p className="text-xs text-muted-foreground">Low stock items</p>
    </CardContent>
  </Card>
  )
}

export default InventoryCard