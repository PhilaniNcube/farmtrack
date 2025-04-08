import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { Crop, CropActivity } from "@/lib/schema"

interface ActivitiesHeaderProps {
    activities: CropActivity[]
}

export function ActivitiesHeader({ activities }: ActivitiesHeaderProps) {
    // In a real app, these would be fetched from your database
    const stats = {
        total: 12,
        completed: 8,
        pending: 3,
        inProgress: 1,
    }

    if (!activities) {
        return null
    }

    // get completed crop activities for a crop
    const completedActivities = activities.filter((activity) => activity.status === "completed").length

    // get in progress crop activities for a crop
    const inProgressActivities = activities.filter((activity) => activity.status === "in-progress").length

    // get pending crop activities for a crop
    const pendingActivities = activities.filter((activity) => activity.status === "pending").length

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Activities</p>
                            <p className="text-3xl font-bold">{activities.length}</p>
                        </div>

                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Completed</p>
                            <p className="text-3xl font-bold">{completedActivities}</p>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                            <div className="h-3 w-3 rounded-full bg-green-500" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                            <p className="text-3xl font-bold">{inProgressActivities}</p>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <div className="h-3 w-3 rounded-full bg-blue-500" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Pending</p>
                            <p className="text-3xl font-bold">{pendingActivities}</p>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                            <div className="h-3 w-3 rounded-full bg-amber-500" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
