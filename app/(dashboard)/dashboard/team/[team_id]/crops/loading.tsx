import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, MapPin, MoveLeft, PlusCircle, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

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
        </div>
    )
}

export default loading