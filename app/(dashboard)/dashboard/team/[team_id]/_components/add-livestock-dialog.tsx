import AddLivestockForm from '@/components/add-livestock-form'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { FieldLocation } from '@/lib/schema'
import { Plus } from 'lucide-react'
import React from 'react'

const AddLivestockDialog = ({ locations }: { locations: FieldLocation[] }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto gap-1" size="sm">
                    <Plus className="h-4 w-4" />
                    Add Livestock
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle></DialogTitle>
                <AddLivestockForm locations={locations} />
            </DialogContent>
        </Dialog>
    )
}

export default AddLivestockDialog