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
    const farm_id = Number.parseInt(formData.get("farm_id") as string)
    const purchase_price = Number.parseFloat(formData.get("purchase_price") as string)
    const supplier = formData.get("supplier") as string
    const storage_location = formData.get("storage_location") as string
    const reorder_level = Number.parseFloat(formData.get("reorder_level") as string)

  const isMember = await isFarmMember(Number(formData.get("farm_id")))
  if (!isMember) {
    return {
      error: "You are not a member of this farm."
    }
  }

    const validatedFields = InventorySchema.safeParse({
      item_name,
      category,
      quantity,
      unit,
      purchase_date,
      expiry_date,
      notes,
      farm_id,
      purchase_price,
      supplier,
      storage_location,
      reorder_level
    })

    if (!validatedFields.success) {
      console.error("Validation failed:", validatedFields.error.format())
      return { error: "Validation failed" }
    }

    console.log("Validated fields:", validatedFields.data)

    const values: InventoryInsert = {
      item_name,
      category,
      quantity: String(quantity),
      unit,
      purchase_date: purchase_date ? new Date(purchase_date) : null,
      expiry_date: expiry_date ? new Date(expiry_date) : null,
      notes,
      farm_id,
      purchase_price:String(purchase_price),
      supplier,
      storage_location,
      reorder_level: String(reorder_level),
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = await db.insert(inventory).values(values).returning()


    revalidatePath(`/dashboard/farms/${farm_id}/inventory`)
    return { success: true, data: result[0] }


  } catch (error) {
    console.error("Failed to create inventory item:", error)
    return { error: "Failed to create inventory item" }
  } finally {
    revalidatePath(`/dashboard/farms/${formData.get("farm_id")}/inventory`)
  }
}
