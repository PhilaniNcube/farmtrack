import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Plus } from "lucide-react"
import Link from "next/link"
import { Task } from "@/lib/schema"
import AddTaskDialog from "@/components/add-task-dialog"

export async function RecentTasks({ tasks }: { tasks: Task[] }) {

    // In a real app, these would be fetched from your database
    const tasksData = [
        {
            id: 1,
            title: "Harvest corn in Field 3",
            due_date: "2023-10-15",
            priority: "high",
            status: "pending",
            category: "crops",
            assignedTo: "John Doe",
            assignedToInitials: "JD",
            team_id: "",
        },
        {
            id: 2,
            title: "Vaccinate cattle",
            due_date: "2023-10-12",
            priority: "high",
            status: "in-progress",
            category: "livestock",
            assignedTo: "Jane Smith",
            assignedToInitials: "JS",
            team_id: "",
        },
        {
            id: 3,
            title: "Order more fertilizer",
            due_date: "2023-10-20",
            priority: "medium",
            status: "pending",
            category: "inventory",
            assignedTo: "Mike Johnson",
            assignedToInitials: "MJ",
            team_id: "",
        },
        {
            id: 4,
            title: "Repair irrigation system",
            due_date: "2023-10-18",
            priority: "medium",
            status: "pending",
            category: "maintenance",
            assignedTo: "Sarah Williams",
            assignedToInitials: "SW",
            team_id: "",
        },
    ]

    const getPriorityColor = (priority: any) => {
        switch (priority) {
            case "high":
                return "bg-red-500"
            case "medium":
                return "bg-amber-500"
            case "low":
                return "bg-green-500"
            default:
                return "bg-slate-500"
        }
    }

    const getStatusBadge = (status: any) => {
        switch (status) {
            case "pending":
                return <Badge variant="outline">Pending</Badge>
            case "in-progress":
                return <Badge variant="secondary">In Progress</Badge>
            case "completed":
                return <Badge variant="default">Completed</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    return (
        <Card className="col-span-4">
            <CardHeader className="flex flex-row items-cente justify-between">
                <div className="grid gap-2">
                    <CardTitle>Recent Tasks</CardTitle>
                    <CardDescription>Manage your upcoming farm tasks</CardDescription>
                </div>
                <AddTaskDialog

                    trigger={<Button variant="default">Create Task</Button>}
                />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {tasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between space-x-4">
                            <div className="flex items-center space-x-4">
                                <div className={`h-3 w-3 rounded-full ${getPriorityColor(task.priority)}`} />
                                <div>
                                    <p className="text-sm font-medium leading-none">{task.title}</p>
                                    <p className="text-sm text-muted-foreground">{task.category}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">{new Date(task.due_date).toLocaleDateString()}</span>
                                </div>
                                {getStatusBadge(task.status)}
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="" alt={task.team_id} />
                                    <AvatarFallback>{task.title[0] + task.title[1]}</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                {tasks.length > 0 &&
                    (
                        <Link href={`/dashboard/team/${tasks[0].team_id}/tasks`} passHref className="w-full">
                            <Button variant="outline" className="w-full">
                                View All Tasks
                            </Button>
                        </Link>
                    )
                }

            </CardFooter>
        </Card>
    )
}

export default RecentTasks