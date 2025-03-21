"use client";

import { Button } from '@/components/ui/button'
import { CircleDashed,  UserPlus2 } from 'lucide-react';
import React, { useTransition } from 'react'

const AddMe = ({ farmId, addMeAsFarmMember }: { farmId: number, addMeAsFarmMember: (id: number) => void }) => {

    const [isPending, startTransition] = useTransition()

    return (
        <form className="ml-4" action={() => {
            startTransition(() => {
                addMeAsFarmMember(farmId)
            })

        }}>
            <Button type="submit" variant="ghost">
                {isPending ? (<CircleDashed className='animate-spin' />) : (<UserPlus2 className="h-4 w-4" />)}
                Add Me
            </Button></form>
    )
}

export default AddMe