"use server"

import { revalidatePath } from "next/cache"
import { db, query } from "@/lib/db"
import { inventory, InventoryInsert, InventorySchema } from "@/lib/schema"
import { isFarmMember } from "@/lib/queries/farm-members"




export async function createInventoryItem(prevState: unknown, formData: FormData) {

  try {
    const item_name = formData.get("item_name") as string
    const category = formData.get("category") as string
    const quantity = Number.parseFloat(formData.get("quantity") as string)
    const unit = formData.get("unit") as string
    const purchase_date = formData.get("purchase_date") as string
    const expiry_date = formData.get("expiry_date") as string
    const notes = formData.get("notes") as string
    const team_id = formData.get("team_id") as string
    const purchase_price = Number.parseFloat(formData.get("purchase_price") as string)
    const supplier = formData.get("supplier") as string
    const storage_location = formData.get("storage_location") as string
    const reorder_level = Number.parseFloat(formData.get("reorder_level") as string)


    const validatedFields = InventorySchema.safeParse({
      item_name,
      category,
      quantity,
      unit,
      purchase_date,
      expiry_date,
      notes,
      team_id,
      purchase_price,
      supplier,
      storage_location,
      reorder_level
    })

    if (!validatedFields.success) {
      console.error("Validation failed:", validatedFields.error.format())
      return { error: "Validation failed" }
    }



    const values: InventoryInsert = {
      item_name,
      category,
      quantity: String(quantity),
      unit,
      purchase_date: purchase_date ? new Date(purchase_date) : null,
      expiry_date: expiry_date ? new Date(expiry_date) : null,
      notes,
      team_id: String(team_id),
      purchase_price:String(purchase_price),
      supplier,
      storage_location,
      reorder_level: String(reorder_level),
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = await db.insert(inventory).values(values).returning()


    return { success: true, data: result[0] }


  } catch (error) {
    console.error("Failed to create inventory item:", error)
    return { error: "Failed to create inventory item" }
  } 
}
