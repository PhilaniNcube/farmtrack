import AddInventoryForm from '@/components/add-inventory-form'
import AddLivestockForm from '@/components/add-livestock-form'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { FieldLocation } from '@/lib/schema'
import { Plus } from 'lucide-react'
import React from 'react'

const AddInventoryDialog = ({ locations }: { locations: FieldLocation[] }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto gap-1" size="sm">
                    <Plus className="h-4 w-4" />
                    Add Inventory
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle></DialogTitle>
                <AddInventoryForm  />
            </DialogContent>
        </Dialog>
    )
}

export default AddInventoryDialog