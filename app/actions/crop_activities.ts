"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { crop_activities,  CropActivitySchema } from "@/lib/schema/crop_activities"
import { z } from "zod"




export async function addCropActivity(prevState: unknown, formData: FormData) {
  try {
    const values = Object.fromEntries(formData.entries())
    
    const parsedData = CropActivitySchema.safeParse({
      name: values.name,
      type: values.type,
      status: values.status,
      description: values.description,
      scheduled_date: values.scheduled_date,
      completed_date: values.completed_date || null,
      crop_id: Number(values.crop_id),
      team_id: values.team_id,
    })

    if (!parsedData.success) {
      return {
        error: parsedData.error.format(),
        message: "Invalid form data"
      }
    }

    // Create activity record
    const activity = await db.insert(crop_activities).values({
      name: parsedData.data.name,
      type: parsedData.data.type,
      status: parsedData.data.status,
      description: parsedData.data.description,
      scheduled_date: new Date(parsedData.data.scheduled_date),
      completed_date: parsedData.data.completed_date ? new Date(parsedData.data.completed_date) : null,
      crop_id: parsedData.data.crop_id,
      team_id: parsedData.data.team_id,
    }).returning()

    // Revalidate paths where this data might be displayed
    const teamId = parsedData.data.team_id
    const cropId = parsedData.data.crop_id
    
    revalidatePath(`/dashboard/team/${teamId}/crops/${cropId}`)
    revalidatePath(`/dashboard/team/${teamId}/crops/${cropId}/activities`)
    
    return {
      success: true,
      activity: activity[0]
    }
  } catch (error) {
    console.error("Failed to add crop activity:", error)
    return {
      error: "Failed to add crop activity",
      message: error instanceof Error ? error.message : "An unknown error occurred"
    }
  }
}