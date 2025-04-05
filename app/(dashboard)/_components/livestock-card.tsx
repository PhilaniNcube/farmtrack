import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Livestock } from '@/lib/schema'
import { Milk } from 'lucide-react'


const LivestockCard = ({livestock}:{livestock:Livestock[]}) => {

    // Count the number of livestock quantity
    const livestockCount = livestock.reduce((acc, item) => acc + item.count, 0) 
   


  return (
    <Card >
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Livestock</CardTitle>
      <Milk className="h-4 w-4 text-orange-300" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{livestockCount}</div>
      <p className="text-xs text-muted-foreground">individual animals</p>
    </CardContent>
  </Card>
  )
}

export default LivestockCard