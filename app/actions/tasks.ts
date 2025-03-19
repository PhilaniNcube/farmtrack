"use server"

import { revalidatePath } from "next/cache"
import { query } from "@/lib/db"

export type Task = {
  id: number
  title: string
  description: string
  due_date: string
  priority: string
  status: string
  related_to: string
  related_id: number
  created_at: string
  updated_at: string
}

export async function getTasks() {
  try {
    const result = await query("SELECT * FROM tasks ORDER BY due_date ASC")
    return { tasks: result.rows as Task[] }
  } catch (error) {
    console.error("Failed to fetch tasks:", error)
    return { error: "Failed to fetch tasks" }
  }
}

export async function getUpcomingTasks() {
  try {
    const result = await query(
      `SELECT * FROM tasks 
       WHERE status = 'pending' AND due_date >= CURRENT_DATE 
       ORDER BY due_date ASC 
       LIMIT 5`,
    )
    return { tasks: result.rows as Task[] }
  } catch (error) {
    console.error("Failed to fetch upcoming tasks:", error)
    return { error: "Failed to fetch upcoming tasks" }
  }
}

export async function createTask(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const due_date = formData.get("due_date") as string
  const priority = formData.get("priority") as string
  const status = (formData.get("status") as string) || "pending"
  const related_to = formData.get("related_to") as string
  const related_id = Number.parseInt(formData.get("related_id") as string) || null

  try {
    const result = await query(
      `INSERT INTO tasks (title, description, due_date, priority, status, related_to, related_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [title, description, due_date, priority, status, related_to, related_id],
    )

    revalidatePath("/dashboard")
    return { task: result.rows[0] as Task }
  } catch (error) {
    console.error("Failed to create task:", error)
    return { error: "Failed to create task" }
  }
}

export async function updateTaskStatus(id: number, status: string) {
  try {
    const result = await query(
      `UPDATE tasks 
       SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [status, id],
    )

    revalidatePath("/dashboard")
    return { task: result.rows[0] as Task }
  } catch (error) {
    console.error(`Failed to update task status with id ${id}:`, error)
    return { error: "Failed to update task status" }
  }
}

