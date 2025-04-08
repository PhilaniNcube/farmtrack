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
                    <div className="flex flex-col space-y-2 animate-pulse">
                        <div className="h-16 w-[200px] bg-gray-200 rounded"></div>
                        <div className="h-4 w-[300px] bg-gray-200 rounded"></div>
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