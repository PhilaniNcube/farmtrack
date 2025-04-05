import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Crop } from '@/lib/schema'
import { Leaf } from 'lucide-react'
import React from 'react'

const ActiveCropsCard = ({crops}:{crops:Crop[]}) => {

    // Count the number of active crops
    const activeCropsCount = crops.filter(crop => crop.status === 'active').length

    // Count the number of crops ready that have not been harvested
    const readyForHarvestCount = crops.filter(crop => crop.status !== 'harvested').length

  return (
    <Card >
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Active Crops</CardTitle>
      <Leaf className="h-4 w-4 text-green-500" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{readyForHarvestCount}</div>
      <p className="text-xs text-muted-foreground">{`${activeCropsCount} ready for harvest`}</p>
    </CardContent>
  </Card>
  )
}

export default ActiveCropsCard