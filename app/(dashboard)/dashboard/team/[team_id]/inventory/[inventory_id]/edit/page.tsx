import UpdateInventoryForm from '@/components/update-inventory-form'
import { getInventoryItemById } from '@/lib/queries/inventory'
import { notFound } from 'next/navigation'
import React from 'react'

const EditInventory = async ({params}:{params:Promise<{team_id:string, inventory_id: number }>}) => {

      const { team_id, inventory_id } = await params
  
      const inventoryData = getInventoryItemById(inventory_id)
      
      const [inventory] = await Promise.all([
          inventoryData,
      ])
  
      if (!inventory) {
        return notFound()
      }

  return (
    <div className="p-6">
        <h1 className="text-3xl font-bold tracking-tight">Edit Inventory Item</h1>
        <p className="text-muted-foreground">Update the details of your inventory item</p>
        {/* Add your form or edit component here */}
        <UpdateInventoryForm inventoryItem={inventory} />
    </div>
  )
}

export default EditInventory