import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft } from 'lucide-react'
import React from 'react'


const loading = () => {
    return (
        <div className='p-6'>
            <div className="flex items justify-between w-full">
                <div className="flex items-center space-x-4">
                    <Button variant="outline" size="icon" asChild>
                        <>
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Loading (Crop Status)
                        </h1>
                        <p className="text-muted-foreground">Field Location • 5 hectares • Planted on </p>
                    </div>
                </div>
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-7 gap-4 mt-4">
                <Card className="col-span-3 h-[250px] bg-gray-200 rounded animate-pulse"></Card>
                <Card className="col-span-4 h-[250px] bg-gray-200 rounded animate-pulse"></Card>
            </div>
        </div>
    )
}

export default loading