import { Activity, ArrowDown, ArrowUp, Leaf, MilkIcon as Cow, Tractor } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { Activity as ActivityType } from "@/app/actions/activities"

interface RecentActivitiesProps {
  activities: ActivityType[]
}

export function RecentActivities({ activities }: RecentActivitiesProps) {
  if (activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
        <p>No recent activities</p>
      </div>
    )
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "crop":
        return <Leaf className="h-5 w-5 text-green-600" />
      case "livestock":
        return <Cow className="h-5 w-5 text-blue-600" />
      case "expense":
        return <ArrowDown className="h-5 w-5 text-red-600" />
      case "income":
        return <ArrowUp className="h-5 w-5 text-green-600" />
      case "inventory":
        return <Tractor className="h-5 w-5 text-amber-600" />
      default:
        return <Activity className="h-5 w-5 text-gray-600" />
    }
  }

  const getActivityBgColor = (type: string) => {
    switch (type) {
      case "crop":
        return "bg-green-100 dark:bg-green-900"
      case "livestock":
        return "bg-blue-100 dark:bg-blue-900"
      case "expense":
        return "bg-red-100 dark:bg-red-900"
      case "income":
        return "bg-green-100 dark:bg-green-900"
      case "inventory":
        return "bg-amber-100 dark:bg-amber-900"
      default:
        return "bg-gray-100 dark:bg-gray-800"
    }
  }

  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${getActivityBgColor(activity.activity_type)} mr-4`}
          >
            {getActivityIcon(activity.activity_type)}
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{activity.description}</p>
            {activity.related_to && <p className="text-sm text-muted-foreground">{activity.related_to}</p>}
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(activity.activity_date), { addSuffix: true })}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

