import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Crop } from '@/lib/schema'
import { formatDistance, formatDistanceStrict } from 'date-fns'
import { Leaf } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CropsCard = ({ crops }: { crops: Crop[] }) => {

    if (!crops || crops.length === 0) {
        return null; // or some placeholder content
    }


 

    return (
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Harvest</CardTitle>
                <CardDescription>Expected harvest dates</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="space-y-4">
                {crops.map((crop) => (
                     <div key={crop.id} className="flex items-center justify-between border-l-4 border-amber-500 bg-amber-50 p-3 rounded-r-md">
                     <div className="flex items-center gap-3">
                       <Leaf className="h-5 w-5 text-amber-600" />
                       <div>
                         <p className="text-sm font-medium">{crop.name}</p>
                         <p className="text-xs text-muted-foreground">{crop.area} {crop.area_unit}</p>
                       </div>
                     </div>
                     <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                      Harvest {formatDistanceStrict(new Date(crop.expected_harvest_date), new Date(), { addSuffix: true, unit: 'day' })}                       
                     </Badge>
                   </div>
                ))}
            </div>
            </CardContent>
            <Separator className="" />
            <CardFooter className='py-3'>
                <Link href={`/dashboard/team/${crops[0]?.team_id}/crops`} className='w-full'>
                <Button variant="outline" className="w-full bg-slate-100 mt-2">
                    View All Crops
                  </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default CropsCard