import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Leaf } from 'lucide-react'
import React from 'react'

const loading = () => {

    // Placeholder data for loading state
    const activeCropsCount = 0
    const readyForHarvestCount = 0

    // Placeholder data for loading state for 4 cards
    const metrics = [
        { title: 'Active Crops', value: activeCropsCount, icon: <Leaf className="h-4 w-4 text-green-500" />, description: 'Active crops in the field' },
        { title: 'Ready for Harvest', value: readyForHarvestCount, icon: <Leaf className="h-4 w-4 text-green-500" />, description: 'Crops ready for harvest' },
        { title: 'Total Crops', value: activeCropsCount + readyForHarvestCount, icon: <Leaf className="h-4 w-4 text-green-500" />, description: 'Total crops planted' },
        { title: 'Pending Tasks', value: 0, icon: <Leaf className="h-4 w-4 text-green-500" />, description: 'Tasks pending completion' },
    ]

    return (
        <div className="p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric, index) => (
                    <Card key={index} className="animate-pulse">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                            <Leaf className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metric.value}</div>
                            <p className="text-xs text-muted-foreground">{metric.description}</p>
                        </CardContent>
                    </Card>
                ))}

            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
                <div className="col-span-4 animate-pulse">
                    {/* Placeholder for Recent Tasks */}
                    <Card className="h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Recent Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">Loading...</div>
                        </CardContent>
                    </Card>
                </div>
                <div className="col-span-3 animate-pulse">
                    {/* Placeholder for Crop Status */}
                    <Card className="h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Crop Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">Loading...</div>
                        </CardContent>
                    </Card>
                </div>
                </div>
        </div>
    )
}

export default loading