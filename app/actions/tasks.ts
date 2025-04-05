"use server"

import { db } from "@/lib/db"
import { TaskInsert, tasks } from "@/lib/schema"
import { revalidatePath } from "next/cache"





type Priority = "high" | "medium" | "low"
type Status = "pending" | "in-progress" | "completed"


export async function createTask(formData: FormData) {

  const task_input : TaskInsert = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    due_date: new Date(formData.get("due_date") as string),
    priority: formData.get("priority") as Priority,
    status: formData.get("status") as Status,
    category: formData.get("category") as string,
    assigned_to: formData.get("assigned_to") as string,
    related_to: formData.get("related_to") as string,
    team_id: formData.get("team_id") as string,
  }

  // Validate the input data
  if (!task_input.title || !task_input.due_date || !task_input.category) {
    throw new Error("Title, due date, and category are required fields.")
  }
  if (task_input.priority && !["high", "medium", "low"].includes(task_input.priority)) {
    throw new Error("Invalid priority value. Must be 'high', 'medium', or 'low'.")
  }
  if (task_input.status && !["pending", "in-progress", "completed"].includes(task_input.status)) {
    throw new Error("Invalid status value. Must be 'pending', 'in-progress', or 'completed'.")
  }



  const createdTask = await db.insert(tasks).values(task_input).returning()

  revalidatePath(`/dashboard/team/${task_input.team_id}/tasks`)
  revalidatePath(`/dashboard/team/${task_input.team_id}/tasks/${createdTask[0].id}`)
  return createdTask[0]

}



