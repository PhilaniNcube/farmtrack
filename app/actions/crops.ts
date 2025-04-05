"use server"

import { revalidatePath } from "next/cache"
import { db, query } from "@/lib/db"



// create a zod object for the Crop type
import { z } from "zod"
import { crops, CropSchema, CropUpdateSchema } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { isFarmMember } from "@/lib/queries/farm-members"



export async function createCrop(prevState:unknown, formData: FormData) {

  
  const name = formData.get("name") as string
  const variety = formData.get("variety") as string
  const planting_date = formData.get("planting_date") as string
  const expected_harvest_date = formData.get("expected_harvest_date") as string
  const location = formData.get("location") as string
  const area = Number.parseFloat(formData.get("area") as string)
  const area_unit = formData.get("area_unit") as string
  const status = formData.get("status") as string
  const notes = formData.get("notes") as string
  const team_id = formData.get("team_id") as string



  try {
    const validatedFields = CropSchema.safeParse({
      name,
      variety,
      planting_date,
      expected_harvest_date,
      location,
      area,
      area_unit,
      status,
      notes,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      team_id
    })

    if (!validatedFields.success) {
      console.error("Validation failed:", validatedFields.error.format())
      return { error: "Validation failed" }
    }

    // Insert the crop record - convert string dates to Date objects for DB
    await db.insert(crops).values({
      name,
      variety,
      planting_date: new Date(planting_date),
      expected_harvest_date: new Date(expected_harvest_date),
      location,
      area: area.toString(),
      area_unit,
      status,
      notes,
      team_id
    })

    return { success: true }
  } catch (error) {
    console.error("Failed to create crop:", error)
    return { error: "Failed to create crop" }
  } finally {
    revalidatePath(`/dashboard/team/${team_id}/crops`)
    revalidatePath(`/dashboard/team/${team_id}`)
  }
}

export async function updateCrop(prevState: unknown, formData: FormData) {

  const validatedFields = CropUpdateSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    variety: formData.get("variety"),
    planting_date: formData.get("planting_date"),
    expected_harvest_date: formData.get("expected_harvest_date"),
    location: formData.get("location"),
    area: Number.parseFloat(formData.get("area") as string),
    area_unit: formData.get("area_unit"),
    status: formData.get("status"),
    notes: formData.get("notes"),
    created_at: formData.get("created_at"),
    updated_at: formData.get("updated_at"),
  })


  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error.format())
    return { error: "Validation failed" }
  }

  const id = Number.parseInt(formData.get("id") as string)
  const name = formData.get("name") as string
  const variety = formData.get("variety") as string
  const planting_date = formData.get("planting_date") as string
  const expected_harvest_date = formData.get("expected_harvest_date") as string
  const location = formData.get("location") as string
  const area = Number.parseFloat(formData.get("area") as string)
  const area_unit = formData.get("area_unit") as string
  const status = formData.get("status") as string
  const notes = formData.get("notes") as string

  try {
    const result = await db.update(crops)
      .set({
        name,
        variety,
        planting_date: new Date(planting_date),
        expected_harvest_date: new Date(expected_harvest_date),
        location,
        area: area.toString(),
        area_unit,
        status,
        notes,
        updated_at: new Date()
      }).where(eq(crops.id, id)).returning()


    return { crop: result[0] }
  } catch (error) {
    console.error(`Failed to update crop with id ${id}:`, error)
    return { error: "Failed to update crop" }
  } 


}

export async function deleteCrop(id: number) {
  try {
    await query("DELETE FROM crops WHERE id = $1", [id])

    return { success: true }
  } catch (error) {
    console.error(`Failed to delete crop with id ${id}:`, error)
    return { error: "Failed to delete crop" }
  }
}


export async function updateCropStatus(id: number, status: string) {
  try {
    const result = await db.update(crops)
      .set({ status, updated_at: new Date() })
      .where(eq(crops.id, id))
      .returning()
   
 

    return { crop: result[0] }
  } catch (error) {
    console.error(`Failed to update crop status for id ${id}:`, error)
    return { error: "Failed to update crop status" }
  } 
}

