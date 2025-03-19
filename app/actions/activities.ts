"use server"

import { revalidatePath } from "next/cache"
import { query } from "@/lib/db"

export type Activity = {
  id: number
  activity_date: string
  activity_type: string
  description: string
  related_to: string
  related_id: number
  created_at: string
  updated_at: string
}

export async function getRecentActivities() {
  try {
    const result = await query(
      `SELECT * FROM activities 
       ORDER BY activity_date DESC, created_at DESC 
       LIMIT 5`,
    )
    return { activities: result.rows as Activity[] }
  } catch (error) {
    console.error("Failed to fetch recent activities:", error)
    return { error: "Failed to fetch recent activities" }
  }
}

export async function createActivity(
  activity_date: string,
  activity_type: string,
  description: string,
  related_to?: string,
  related_id?: number,
) {
  try {
    const result = await query(
      `INSERT INTO activities (activity_date, activity_type, description, related_to, related_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [activity_date, activity_type, description, related_to, related_id],
    )

    revalidatePath("/dashboard")
    return { activity: result.rows[0] as Activity }
  } catch (error) {
    console.error("Failed to create activity:", error)
    return { error: "Failed to create activity" }
  }
}

