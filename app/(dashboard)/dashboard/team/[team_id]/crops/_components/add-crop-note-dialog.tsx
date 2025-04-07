"use client"

import { addCropNote } from '@/app/actions/crop_notes'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { startTransition, useActionState } from 'react'

const AddCropNoteDialog = () => {

    const [note, setNote] = React.useState<string>("")

    const params = useParams()

    const cropId = params.crop_id as string
    const teamId = params.team_id as string

    const clientNote = async () => {
        startTransition(async () => {

            await addCropNote(Number(cropId), teamId, note)
        })

    }

    const [state, formAction, isPending] = useActionState(clientNote, null)


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Note
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form action={() => {
                    formAction()
                    setNote("")
                }} className="space-y-4">
                    <h2 className="text-lg font-semibold">Add a Note</h2>
                    <Textarea
                        id="note"
                        name="text"
                        rows={4}
                        defaultValue=""
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        placeholder="Write your note here..."
                    />
                    <Button disabled={isPending} type="submit" className="w-full">
                        {isPending ? "Adding..." : "Add Note"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddCropNoteDialog