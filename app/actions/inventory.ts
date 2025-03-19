"use server"

import { revalidatePath } from "next/cache"
import { query } from "@/lib/db"

export type Inventory = {
  id: number
  name: string
  category: string
  quantity: number
  unit: string
  location: string
  purchase_date: string
  expiry_date: string
  status: string
  notes: string
  created_at: string
  updated_at: string
}

export async function getInventory() {
  try {
    const result = await query("SELECT * FROM inventory ORDER BY name ASC")
    return { inventory: result.rows as Inventory[] }
  } catch (error) {
    console.error("Failed to fetch inventory:", error)
    return { error: "Failed to fetch inventory" }
  }
}

export async function getInventoryById(id: number) {
  try {
    const result = await query("SELECT * FROM inventory WHERE id = $1", [id])
    return { item: result.rows[0] as Inventory }
  } catch (error) {
    console.error(`Failed to fetch inventory item with id ${id}:`, error)
    return { error: "Failed to fetch inventory item" }
  }
}

export async function createInventoryItem(formData: FormData) {
  const name = formData.get("name") as string
  const category = formData.get("category") as string
  const quantity = Number.parseFloat(formData.get("quantity") as string)
  const unit = formData.get("unit") as string
  const location = formData.get("location") as string
  const purchase_date = formData.get("purchase_date") as string
  const expiry_date = formData.get("expiry_date") as string
  const status = formData.get("status") as string
  const notes = formData.get("notes") as string

  try {
    const result = await query(
      `INSERT INTO inventory (name, category, quantity, unit, location, purchase_date, expiry_date, status, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [name, category, quantity, unit, location, purchase_date, expiry_date, status, notes],
    )

    revalidatePath("/inventory")
    return { item: result.rows[0] as Inventory }
  } catch (error) {
    console.error("Failed to create inventory item:", error)
    return { error: "Failed to create inventory item" }
  }
}

export async function updateInventoryItem(id: number, formData: FormData) {
  const name = formData.get("name") as string
  const category = formData.get("category") as string
  const quantity = Number.parseFloat(formData.get("quantity") as string)
  const unit = formData.get("unit") as string
  const location = formData.get("location") as string
  const purchase_date = formData.get("purchase_date") as string
  const expiry_date = formData.get("expiry_date") as string
  const status = formData.get("status") as string
  const notes = formData.get("notes") as string

  try {
    const result = await query(
      `UPDATE inventory 
       SET name = $1, category = $2, quantity = $3, unit = $4, location = $5, 
           purchase_date = $6, expiry_date = $7, status = $8, notes = $9, updated_at = CURRENT_TIMESTAMP
       WHERE id = $10
       RETURNING *`,
      [name, category, quantity, unit, location, purchase_date, expiry_date, status, notes, id],
    )

    revalidatePath("/inventory")
    return { item: result.rows[0] as Inventory }
  } catch (error) {
    console.error(`Failed to update inventory item with id ${id}:`, error)
    return { error: "Failed to update inventory item" }
  }
}

export async function deleteInventoryItem(id: number) {
  try {
    await query("DELETE FROM inventory WHERE id = $1", [id])
    revalidatePath("/inventory")
    return { success: true }
  } catch (error) {
    console.error(`Failed to delete inventory item with id ${id}:`, error)
    return { error: "Failed to delete inventory item" }
  }
}

