import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { PlusIcon } from 'lucide-react'
import React from 'react'
import { CreateFarmForm } from '../dashboard/profile/create-farm-form'

const CreateFarmDialog = () => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button className="bg-green-600 text-white">
                <PlusIcon className="mr-2 h-4 w-4" /> Create Farm
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogTitle className="text-lg font-medium">Create a new farm</DialogTitle>
            <CreateFarmForm />
        </DialogContent>
    </Dialog>
  )
}

export default CreateFarmDialog