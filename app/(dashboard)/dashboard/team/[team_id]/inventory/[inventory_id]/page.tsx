import { getInventoryItemById } from '@/lib/queries/inventory'
import { notFound } from 'next/navigation'
import React from 'react'

const InventoryItemPage = async ({params}:{params:Promise<{team_id:string, inventory_id:number }>}) => {

    const { team_id, inventory_id } = await params

    const inventoryData = getInventoryItemById(inventory_id)
    
    const [inventory] = await Promise.all([
        inventoryData,
    ])

    if (!inventory) {
      return notFound()
    }

  return (
    <div>InventoryItemPage</div>
  )
}

export default InventoryItemPage