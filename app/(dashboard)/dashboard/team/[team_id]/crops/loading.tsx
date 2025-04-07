import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, MapPin, MoveLeft, PlusCircle, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { CropsFilters } from './_components/crops-filter'

const loading = () => {

    const metrics = [

        {
            title: "Upcoming Harvests",
            value: "XXX",
            description: "Within 2 months",
            icon: Calendar,
            color: "text-amber-500",
        },
        {
            title: "Total Area",
            value: `XXX acres`,
            description: "Under cultivation",
            icon: MapPin,
            color: "text-blue-500",
        },
        {
            title: "Yield Forecast",
            value: "+12%",
            description: "Compared to last season",
            icon: TrendingUp,
            color: "text-emerald-500",
        },
    ]

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Crops Management</h1>
                    <p className="text-muted-foreground">Track and manage all your crops in one place</p>
                </div>
                <Button asChild>
                    <Link href={`/dashboard/`} className="flex items-center gap-2">
                        <MoveLeft className="mr-2 h-4 w-4" />
                        Dashboard
                    </Link>
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
                {metrics.map((metric, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                            <metric.icon className={`h-4 w-4 ${metric.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metric.value}</div>
                            <p className="text-xs text-muted-foreground">{metric.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Tabs className='mt-4' defaultValue='list'>
                <TabsList>
                    <TabsTrigger value='list'>
                        List
                    </TabsTrigger>
                    <TabsTrigger value='calendar'>
                        Calendar
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='list'>
                     <CropsFilters />
                    <Table className="mt-4">
                        <TableHeader>
                            <TableHead>Crop</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Area</TableHead>
                            <TableHead>Planting Date</TableHead>
                            <TableHead>Harvest Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Progress</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableHeader>
                        <TableBody>
                            {/* Placeholder for Crop Rows */}
                            {Array.from({ length: 14 }).map((_, index) => (
                                <TableRow key={index}>
                                   <TableCell>
                                     <Skeleton className='bg-slate-300 h-4 animate-pulse' />
                                   </TableCell>
                                   <TableCell>
                                     <Skeleton className='bg-slate-300 h-4 animate-pulse' />
                                   </TableCell>
                                   <TableCell>
                                     <Skeleton className='bg-slate-300 h-4 animate-pulse' />
                                   </TableCell>
                                   <TableCell>
                                     <Skeleton className='bg-slate-300 h-4 animate-pulse' />
                                   </TableCell>
                                   <TableCell>
                                     <Skeleton className='bg-slate-300 h-4 animate-pulse' />
                                   </TableCell>
                                   <TableCell>
                                     <Skeleton className='bg-slate-300 h-4 animate-pulse' />
                                   </TableCell>
                                   <TableCell>
                                     <Skeleton className='bg-slate-300 h-4 animate-pulse' />
                                   </TableCell>
                                   <TableCell>
                                     <Skeleton className='bg-slate-300 h-4 animate-pulse' />
                                   </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TabsContent>
                <TabsContent value='calendar'>
                    <div className="grid gap-4 md:grid-cols-[1fr_300px] mt-4">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>Crop Calendar</CardTitle>
                                <p className="text-sm text-muted-foreground">View planting and harvest dates for all crops</p>
                            </CardHeader>
                            <CardContent>
                                <Calendar className="rounded-md border" />
                            </CardContent>
                        </Card>
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>Upcoming Harvests</CardTitle>
                                <p className="text-sm text-muted-foreground">View upcoming harvests for all crops</p>
                            </CardHeader>
                            <CardContent>
                                {/* Placeholder for Upcoming Harvests */}
                                Loading...
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default loading