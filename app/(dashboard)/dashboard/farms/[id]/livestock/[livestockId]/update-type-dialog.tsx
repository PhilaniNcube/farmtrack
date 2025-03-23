"use client";
import { updateLivestockType } from '@/app/actions/livestock';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { CircleDashed, PencilIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useActionState } from 'react'

const UpdateTypeDialog = ({livestockId, type}:{livestockId:number, type:string}) => {

    const params = useParams()
    const farmId = Number(params.id)

    const [state, formAction, isPending] = useActionState(updateLivestockType, null)


  return (
    <Dialog>
        <DialogTrigger>
            <PencilIcon className="h-4 w-4 text-gray-500 cursor-pointer" />
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Update Animal Name</DialogTitle>
            </DialogHeader>
            <div>
                <form action={formAction}>
                    <Input type="hidden" name="farm_id" value={farmId} />
                    <Input type="hidden" name="id" value={livestockId} />
                    <Input type="text" name="type" defaultValue={type} placeholder="Enter new animal name" className="mb-4" />
                    <div className="flex justify-end mt-3">
                        <Button type="submit" className="bg-blue-600 w-1/3 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={isPending}>
                            {isPending ? <CircleDashed className="animate-spin h-4 w-4" /> : "Update"}
                        </Button>
                    </div>
                </form>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default UpdateTypeDialog