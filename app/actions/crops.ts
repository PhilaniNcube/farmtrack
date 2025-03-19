"use server"

import { revalidatePath } from "next/cache"
import { query } from "@/lib/db"

export type Crop = {
  id: number
  name: string
  variety: string
  planting_date: string
  expected_harvest_date: string
  location: string
  area: number
  area_unit: string
  status: string
  notes: string
  created_at: string
  updated_at: string
}

export async function getCrops() {
  try {
    const result = await query("SELECT * FROM crops ORDER BY created_at DESC")
    return { crops: result.rows as Crop[] }
  } catch (error) {
    console.error("Failed to fetch crops:", error)
    return { error: "Failed to fetch crops" }
  }
}

export async function getCropById(id: number) {
  try {
    const result = await query("SELECT * FROM crops WHERE id = $1", [id])
    return { crop: result.rows[0] as Crop }
  } catch (error) {
    console.error(`Failed to fetch crop with id ${id}:`, error)
    return { error: "Failed to fetch crop" }
  }
}

export async function createCrop(formData: FormData) {
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
    const result = await query(
      `INSERT INTO crops (name, variety, planting_date, expected_harvest_date, location, area, area_unit, status, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [name, variety, planting_date, expected_harvest_date, location, area, area_unit, status, notes],
    )

    revalidatePath("/crops")
    return { crop: result.rows[0] as Crop }
  } catch (error) {
    console.error("Failed to create crop:", error)
    return { error: "Failed to create crop" }
  }
}

export async function updateCrop(id: number, formData: FormData) {
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
    const result = await query(
      `UPDATE crops 
       SET name = $1, variety = $2, planting_date = $3, expected_harvest_date = $4, 
           location = $5, area = $6, area_unit = $7, status = $8, notes = $9, updated_at = CURRENT_TIMESTAMP
       WHERE id = $10
       RETURNING *`,
      [name, variety, planting_date, expected_harvest_date, location, area, area_unit, status, notes, id],
    )

    revalidatePath("/crops")
    return { crop: result.rows[0] as Crop }
  } catch (error) {
    console.error(`Failed to update crop with id ${id}:`, error)
    return { error: "Failed to update crop" }
  }
}

export async function deleteCrop(id: number) {
  try {
    await query("DELETE FROM crops WHERE id = $1", [id])
    revalidatePath("/crops")
    return { success: true }
  } catch (error) {
    console.error(`Failed to delete crop with id ${id}:`, error)
    return { error: "Failed to delete crop" }
  }
}

