import { Button } from '@/components/ui/button'
import { getInventoryItemById } from '@/lib/queries/inventory'
import { ChevronLeft, Edit, Minus, Plus, Trash } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { InventoryItemDetails } from '../_components/inventory-item-detail'

const InventoryItemPage = async ({ params }: { params: Promise<{ team_id: string, inventory_id: number }> }) => {

    const { team_id, inventory_id } = await params

    const inventoryData = getInventoryItemById(inventory_id)

    const [inventoryItem] = await Promise.all([
        inventoryData,
    ])

    if (!inventoryItem) {
        return notFound()
    }

    return (
        <div className='p-6'>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={`/dashboard/team/${team_id}/inventory`} className="flex items-center justify-center space-x-2">
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{inventoryItem.item_name}</h1>
                        <p className="text-muted-foreground">
                            {inventoryItem.category.charAt(0).toUpperCase() + inventoryItem.category.slice(1)} •{" "}
                            {inventoryItem.storage_location}
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Stock
                    </Button>
                    <Button variant="outline" size="sm">
                        <Minus className="mr-2 h-4 w-4" />
                        Remove Stock
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href={`/dashboard/team/${inventoryItem.team_id}/inventory/${inventoryItem.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Link>
                    </Button>
                    <Button variant="destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </div>
            </div>

            <div className="mt-6">
                <InventoryItemDetails item={inventoryItem} />
            </div>
        </div>
    )
}

export default InventoryItemPage