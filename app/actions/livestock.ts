"use server"

import { revalidatePath } from "next/cache"
import { db, query } from "@/lib/db"

import { livestock, LivestockSchema } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"


export async function addLivestock(prevState:unknown, formData: FormData) {

  try {
  


  const parsedData = await LivestockSchema.safeParse({
    type: formData.get("type"),
    breed: formData.get("breed"),
    count: Number(formData.get("count")),
    acquisition_date: formData.get("acquisition_date"),
    source: formData.get("source"),
    location: formData.get("location"),
    health_status: formData.get("health_status"),
    purpose: formData.get("purpose"),
    notes: formData.get("notes"),
    farm_id: Number(formData.get("farm_id"))
  })

  if (!parsedData.success) {
    console.log("Validation error:", parsedData.error.format())
   throw new Error("Invalid data")
  }

  const newLivestock = await db.insert(livestock).values({
    type: parsedData.data.type,
    breed: parsedData.data.breed,
    count: parsedData.data.count,
    acquisition_date: new Date(parsedData.data.acquisition_date),
    source: parsedData.data.source,
    location: parsedData.data.location,
    health_status: parsedData.data.health_status,
    purpose: parsedData.data.purpose,
    notes: parsedData.data.notes,
    farm_id: Number(parsedData.data.farm_id)
  }).returning()



  return {
    success: true,
    livestock: newLivestock
  }
    
  } catch (error) {

    console.error("Error adding livestock:", error)
    return {
      error: "An error occurred while adding livestock."
    }
    
  } finally {
    console.log("Livestock added successfully")
    revalidatePath(`/dashboard/farms/${formData.get("farm_id")}/livestock`)  
  }
  

}


export async function deleteLivestock(prevState:unknown, id: number) {
  try {
    const deletedLivestock = await db.delete(livestock).where(eq(livestock.id, id)).returning()
    revalidatePath("/livestock")
    return deletedLivestock
  } catch (error) {
    console.error("Error deleting livestock:", error)
    return {
      error: "An error occurred while deleting livestock."
    }
  } finally {
    console.log("Livestock deleted successfully")
 
    revalidatePath(`/dashboard/farms/`)  
  }
}
export async function updateLivestock(prevState:unknown, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries())

    const parsedData = await LivestockSchema.safeParse(data)

    if (!parsedData.success) {
      return {
        error: parsedData.error.format()
      }
    }

    const updatedLivestock = await db.update(livestock).set({
      type: parsedData.data.type,
      breed: parsedData.data.breed,
      count: parsedData.data.count,
      acquisition_date: new Date(parsedData.data.acquisition_date),
      source: parsedData.data.source,
      location: parsedData.data.location,
      health_status: parsedData.data.health_status,
      purpose: parsedData.data.purpose,
      notes: parsedData.data.notes,
      farm_id: parsedData.data.farm_id
    }).where(eq(livestock.id, Number(data.id))).returning()



    return {
      success: true,
      livestock: updatedLivestock
    }

  } catch (error) {
    console.error("Error updating livestock:", error)
    return {
      error: "An error occurred while updating livestock."
    }
  } finally {
    console.log("Livestock updated successfully")
    revalidatePath(`/dashboard/farms/${formData.get("farm_id")}/livestock`)
  }
}


export async function incrementLivestockCount(prevState:unknown, id: number) {

  try {
   
    const updatedLivestockCount = await db.update(livestock).set({
      count: Number(livestock.count) + 1
    }).where(eq(livestock.id, id)).returning()

 
    return updatedLivestockCount
  } catch (error) {
    console.error("Error incrementing livestock count:", error)
    return {
      error: "An error occurred while incrementing livestock count."
    }
  } finally {
    console.log("Livestock count incremented successfully")
    revalidatePath(`/dashboard/farms`)  
  }
}

export async function decrementLivestockCount(prevState:unknown, id: number) {
  try {
    const updatedLivestockCount = await db.update(livestock).set({
      count: Number(livestock.count) - 1
    }).where(eq(livestock.id, id)).returning()

    return updatedLivestockCount
  } catch (error) {
    console.error("Error decrementing livestock count:", error)
    return {
      error: "An error occurred while decrementing livestock count."
    }
  } finally {
    console.log("Livestock count decremented successfully")
    revalidatePath(`/dashboard/farms`)  
  }
}

export async function updateLivestockCount(prevState:unknown, id: number, count: number) {
  try {
    const updatedLivestockCount = await db.update(livestock).set({
      count: Number(count)
    }).where(eq(livestock.id, id)).returning()

    return updatedLivestockCount
  } catch (error) {
    console.error("Error updating livestock count:", error)
    return {
      error: "An error occurred while updating livestock count."
    }
  } finally {
    console.log("Livestock count updated successfully")
    revalidatePath(`/dashboard/farms`)  
  }
}