"use client"

import React, { useActionState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { CircleDashed, UserPlus } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { sendInviteToUser } from '@/app/actions/invite-user'

const InviteFarmMember = ({ farmId }: { team_id: string }) => {

    const [state, formAction, isPending] = useActionState(sendInviteToUser, null)


    return (
        <Dialog>
            <DialogTrigger asChild className="text-white transition-colors cursor-pointer">
                <Button>
                <UserPlus className="h-4 w-4 ml-2" />
                    <span className="">Invite</span>
           
                </Button>

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Invite a member</DialogTitle>
                    <DialogDescription>
                        Send an email invitation to a new member to join your farm.
                    </DialogDescription>
                </DialogHeader>
                <form action={formAction} className="grid gap-4 py-2">
                    <Input type="hidden" name="team_id" value={farmId} />
                    <Input type="email" placeholder="Email" name="email" className="border p-2 rounded" />
                    <Button className="bg-blue-500 text-white p-2 rounded w-full" disabled={isPending}>
                        {isPending ? <CircleDashed className='animate-spin' /> : 'Send Invite'}
                    </Button>
                </form>
                {state?.success && (
                    <div className="flex items-center justify-center mt-4 text-green-500">
                        <span className="text-sm">Invitation sent successfully!</span>
                    </div>
                )}

                {state?.error && (
                    <div className="flex items-center justify-center mt-4 text-red-500">
                        <span className="text-sm">{state.error}</span>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default InviteFarmMember