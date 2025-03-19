"use server"

import { revalidatePath } from "next/cache"
import { query } from "@/lib/db"

export type Livestock = {
  id: number
  identifier: string
  name: string
  type: string
  breed: string
  birth_date: string
  status: string
  location: string
  last_health_check: string
  notes: string
  created_at: string
  updated_at: string
}

export async function getLivestock() {
  try {
    const result = await query("SELECT * FROM livestock ORDER BY created_at DESC")
    return { livestock: result.rows as Livestock[] }
  } catch (error) {
    console.error("Failed to fetch livestock:", error)
    return { error: "Failed to fetch livestock" }
  }
}

export async function getLivestockById(id: number) {
  try {
    const result = await query("SELECT * FROM livestock WHERE id = $1", [id])
    return { livestock: result.rows[0] as Livestock }
  } catch (error) {
    console.error(`Failed to fetch livestock with id ${id}:`, error)
    return { error: "Failed to fetch livestock" }
  }
}

export async function createLivestock(formData: FormData) {
  const identifier = formData.get("identifier") as string
  const name = formData.get("name") as string
  const type = formData.get("type") as string
  const breed = formData.get("breed") as string
  const birth_date = formData.get("birth_date") as string
  const status = formData.get("status") as string
  const location = formData.get("location") as string
  const last_health_check = formData.get("last_health_check") as string
  const notes = formData.get("notes") as string

  try {
    const result = await query(
      `INSERT INTO livestock (identifier, name, type, breed, birth_date, status, location, last_health_check, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [identifier, name, type, breed, birth_date, status, location, last_health_check, notes],
    )

    revalidatePath("/livestock")
    return { livestock: result.rows[0] as Livestock }
  } catch (error) {
    console.error("Failed to create livestock:", error)
    return { error: "Failed to create livestock" }
  }
}

export async function updateLivestock(id: number, formData: FormData) {
  const identifier = formData.get("identifier") as string
  const name = formData.get("name") as string
  const type = formData.get("type") as string
  const breed = formData.get("breed") as string
  const birth_date = formData.get("birth_date") as string
  const status = formData.get("status") as string
  const location = formData.get("location") as string
  const last_health_check = formData.get("last_health_check") as string
  const notes = formData.get("notes") as string

  try {
    const result = await query(
      `UPDATE livestock 
       SET identifier = $1, name = $2, type = $3, breed = $4, birth_date = $5, 
           status = $6, location = $7, last_health_check = $8, notes = $9, updated_at = CURRENT_TIMESTAMP
       WHERE id = $10
       RETURNING *`,
      [identifier, name, type, breed, birth_date, status, location, last_health_check, notes, id],
    )

    revalidatePath("/livestock")
    return { livestock: result.rows[0] as Livestock }
  } catch (error) {
    console.error(`Failed to update livestock with id ${id}:`, error)
    return { error: "Failed to update livestock" }
  }
}

export async function deleteLivestock(id: number) {
  try {
    await query("DELETE FROM livestock WHERE id = $1", [id])
    revalidatePath("/livestock")
    return { success: true }
  } catch (error) {
    console.error(`Failed to delete livestock with id ${id}:`, error)
    return { error: "Failed to delete livestock" }
  }
}

