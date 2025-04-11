"use client";

import { deleteLivestock } from '@/app/actions/livestock';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogTrigger } from '@/components/ui/dialog';
import { DialogContent } from '@radix-ui/react-dialog';
import { CircleDashed, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useTransition } from 'react'

const DeleteLivestock = () => {

    const params = useParams()

    const livestock_id = Number(params.livestock_id)
    const team_id = params.team_id as string

    const [isPending, startTransition] = useTransition()

    const router = useRouter()

    return (
        <Button variant="destructive" onClick={() => {
            startTransition(() => {
                // Call your delete function here
                deleteLivestock(livestock_id, team_id)
                router.push(`/dashboard/team/${team_id}/livestock`)
            })
        }}>
            {isPending ? <CircleDashed className="mr-2 h-4 w-4 animate-spin" /> : <Trash className="mr-2 h-4 w-4" />}
            Delete
        </Button>
    )
}

export default DeleteLivestock