"use client"

import { useState } from "react"
import { CalendarCheck } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { type Task, updateTaskStatus } from "@/app/actions/tasks"

interface UpcomingTasksProps {
  tasks: Task[]
}

export function UpcomingTasks({ tasks }: UpcomingTasksProps) {
  const [localTasks, setLocalTasks] = useState(tasks)

  const handleTaskStatusChange = async (id: number, checked: boolean) => {
    const status = checked ? "completed" : "pending"

    // Optimistic update
    setLocalTasks(localTasks.map((task) => (task.id === id ? { ...task, status } : task)))

    // Server update
    await updateTaskStatus(id, status)
  }

  if (localTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
        <p>No upcoming tasks</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {localTasks.map((task) => (
        <div key={task.id} className="flex items-center space-x-2">
          <Checkbox
            id={`task-${task.id}`}
            checked={task.status === "completed"}
            onCheckedChange={(checked) => handleTaskStatusChange(task.id, checked as boolean)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor={`task-${task.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {task.title}
            </label>
            <p className="text-xs text-muted-foreground flex items-center">
              <CalendarCheck className="h-3 w-3 mr-1" />
              Due: {format(new Date(task.due_date), "MMM d, yyyy")}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

