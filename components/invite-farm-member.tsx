import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { UserPlus } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const InviteFarmMember = ({ farmId }: { farmId: number }) => {
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
                <form className="grid gap-4 py-2">
                    <Input type="hidden" name="farm_id" />
                    <Input type="email" placeholder="Email" className="border p-2 rounded" />
                    <Button className="bg-blue-500 text-white p-2 rounded">Send Invite</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default InviteFarmMember