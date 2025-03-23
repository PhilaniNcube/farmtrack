import { getLivestockById } from '@/lib/queries/livestock'
import React from 'react'
import { LivestockItem } from './livestock-item'

const LivestockPage = async ({params}:{params:Promise<{id:string, livestockId:string}>}) => {

    const { id, livestockId } = await params
    const farmId = Number(id)

    const animal = await getLivestockById(Number(livestockId))

    return (
        <div className="w-full p-4">
          <h1 className="text-2xl font-bold mb-4">Livestock Details</h1>
          <LivestockItem livestock={animal} />
        </div>
      )
}

export default LivestockPage