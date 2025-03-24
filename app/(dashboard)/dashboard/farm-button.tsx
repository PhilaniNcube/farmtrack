"use client"

import { Button } from '@/components/ui/button'
import { Farm } from '@/lib/schema'
import { useSelectedFarm } from '@/lib/stores/use-selected-farm'
import { useRouter } from 'next/navigation'
import React from 'react'

const FarmButton = ({ farm }: { farm: Farm }) => {

    const { farmId, setFarmId } = useSelectedFarm()
    const router = useRouter()

    return (
        <Button className='bg-green-600 text-white' onClick={() => {
            setFarmId(farm.id)
            router.push(`/dashboard/farms/${farm.id}`)
        }}>View Fram</Button>
    )
}

export default FarmButton