import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Livestock, Task } from '@/lib/schema'
import { Calendar, CalendarDays, Milk } from 'lucide-react'


const PendingTasks = ({tasks}:{tasks:Task[]}) => {

    // Count the number of livestock quantity
    const tasksCount = tasks.length

    // High priority tasks
    const highPriorityTasks = tasks.filter((task) => task.priority === 'high').length
   


  return (
    <Card >
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
      <CalendarDays className="h-4 w-4 text-blue-600" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{tasksCount}</div>
      <p className="text-xs text-muted-foreground">{highPriorityTasks} high priority</p>
    </CardContent>
  </Card>
  )
}

export default PendingTasks