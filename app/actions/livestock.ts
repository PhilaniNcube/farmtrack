"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { db, query } from "@/lib/db"

import { livestock, LivestockSchema } from "@/lib/schema"
import { eq, is } from "drizzle-orm"
import { z } from "zod"
import { isFarmMember } from "@/lib/queries/farm-members"


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

  const isMember = await isFarmMember(parsedData.data.farm_id)

  if (!isMember) {
    return {
      error: "You are not a member of this farm."
    }
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

  revalidateTag("getLivestock")

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


export async function deleteLivestock(prevState:unknown, id: number, famrId: number) {

  const isMember = await isFarmMember(famrId)

  if (!isMember) {
    return {
      error: "You are not a member of this farm."
    }
  }


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

    const isMember = await isFarmMember(parsedData.data.farm_id)

    if (!isMember) {
      return {
        error: "You are not a member of this farm."
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


export async function incrementLivestockCount(prevState:unknown, id: number, farmId: number) {
  const isMember = await isFarmMember(farmId)
  if (!isMember) {
    return {
      error: "You are not a member of this farm."
    }
  }

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

export async function decrementLivestockCount(prevState:unknown, id: number, farmId: number) {
  
  const isMember = await isFarmMember(farmId)
  
  if (!isMember) {
    return {
      error: "You are not a member of this farm."
    }
  }


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

export async function updateLivestockCount(prevState:unknown, id: number, count: number, farmId: number) {
  
  const isMember = await isFarmMember(farmId)
  
  if (!isMember) {
    return {
      error: "You are not a member of this farm."
    }
  }


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

export async function updateLivestockType(prevState:unknown, formData:FormData) {


  const id = Number(formData.get("id"))
  const type = formData.get("type") as string

  const isMember = await isFarmMember(Number(formData.get("farm_id")))
  if (!isMember) {
    return {
      error: "You are not a member of this farm."
    }
  }

  if (!id || !type) {
    return {
      error: "Invalid data"
    }
  }

  try {
    const updatedLivestockType = await db.update(livestock).set({
      type: type,
      updated_at: new Date()
    }).where(eq(livestock.id, id)).returning()

    revalidatePath(`/dashboard/farms/${updatedLivestockType[0].farm_id}/livestock/${id}`)

    return updatedLivestockType
  } catch (error) {
    console.error("Error updating livestock type:", error)
    return {
      error: "An error occurred while updating livestock type."
    }
  } finally {
    console.log("Livestock type updated successfully")
    revalidatePath(`/dashboard/farms`)  
  }
}

export async function updateLivestockHealthStatus(prevState:unknown, formData:FormData) {

  const id = Number(formData.get("id"))
  const health_status = formData.get("health_status") as string
  if (!id || !health_status) {
    return {
      error: "Invalid data"
    }
  }

  const isMember = await isFarmMember(Number(formData.get("farm_id")))
  if (!isMember) {
    return {
      error: "You are not a member of this farm."
    }
  }

  try {
    const updatedLivestockHealthStatus = await db.update(livestock).set({
      health_status: health_status,
      updated_at: new Date()
    }).where(eq(livestock.id, id)).returning()

    revalidatePath(`/dashboard/farms/${updatedLivestockHealthStatus[0].farm_id}/livestock/${id}`)

    return updatedLivestockHealthStatus
  } catch (error) {
    console.error("Error updating livestock health status:", error)
    return {
      error: "An error occurred while updating livestock health status."
    }
  } finally {
    console.log("Livestock health status updated successfully")
    revalidatePath(`/dashboard/farms`)  
  }
}

export async function updateLivestockLocation(prevState:unknown, formData:FormData) {

  const id = Number(formData.get("id"))
  const location = formData.get("location") as string
  if (!id || !location) {
    return {
      error: "Invalid data"
    }
  }


  const isMember = await isFarmMember(Number(formData.get("farm_id")))
  if (!isMember) {
    return {
      error: "You are not a member of this farm."
    }
  }

  try {
    const updatedLivestockLocation = await db.update(livestock).set({
      location: location,
      updated_at: new Date()
    }).where(eq(livestock.id, id)).returning()

    revalidatePath(`/dashboard/farms/${updatedLivestockLocation[0].farm_id}/livestock/${id}`)

    return updatedLivestockLocation
  }
  catch (error) {
    console.error("Error updating livestock location:", error)
    return {
      error: "An error occurred while updating livestock location."
    }
  }
  finally {
    console.log("Livestock location updated successfully")
    revalidatePath(`/dashboard/farms`)  
  }
}


export async function updateLivestockNotes(prevState:unknown, formData:FormData) {

  const id = Number(formData.get("id"))
  const notes = formData.get("notes") as string
  if (!id || !notes) {
    return {
      error: "Invalid data"
    }
  }

  const isMember = await isFarmMember(Number(formData.get("farm_id")))
  if (!isMember) {
    return {
      error: "You are not a member of this farm."
    }
  }

  try {
    const updatedLivestockNotes = await db.update(livestock).set({
      notes: notes,
      updated_at: new Date()
    }).where(eq(livestock.id, id)).returning()

    revalidatePath(`/dashboard/farms/${updatedLivestockNotes[0].farm_id}/livestock/${id}`)

    return updatedLivestockNotes
  }
  catch (error) {
    console.error("Error updating livestock notes:", error)
    return {
      error: "An error occurred while updating livestock notes."
    }
  }
  finally {
    console.log("Livestock notes updated successfully")
    revalidatePath(`/dashboard/farms`)  
  }
}


export async function updateLivestockPurpose(prevState:unknown, formData:FormData) {

  const id = Number(formData.get("id"))
  const purpose = formData.get("purpose") as string
  if (!id || !purpose) {
    return {
      error: "Invalid data"
    }
  }

  const isMember = await isFarmMember(Number(formData.get("farm_id")))
  if (!isMember) {
    return {
      error: "You are not a member of this farm."
    }
  }

  try {
    const updatedLivestockPurpose = await db.update(livestock).set({
      purpose: purpose,
      updated_at: new Date()
    }).where(eq(livestock.id, id)).returning()

    revalidatePath(`/dashboard/farms/${updatedLivestockPurpose[0].farm_id}/livestock/${id}`)

    return updatedLivestockPurpose
  }
  catch (error) {
    console.error("Error updating livestock purpose:", error)
    return {
      error: "An error occurred while updating livestock purpose."
    }
  }
  finally {
    console.log("Livestock purpose updated successfully")
    revalidatePath(`/dashboard/farms`)  
  }
}


export async function updateLivestockBreed(prevState:unknown, formData:FormData) {

  const id = Number(formData.get("id"))
  const breed = formData.get("breed") as string
  if (!id || !breed) {
    return {
      error: "Invalid data"
    }
  }

  const isMember = await isFarmMember(Number(formData.get("farm_id")))
  if (!isMember) {
    return {
      error: "You are not a member of this farm."
    }
  }

  try {
    const updatedLivestockBreed = await db.update(livestock).set({
      breed: breed,
      updated_at: new Date()
    }).where(eq(livestock.id, id)).returning()

    revalidatePath(`/dashboard/farms/${updatedLivestockBreed[0].farm_id}/livestock/${id}`)

    return updatedLivestockBreed
  }
  catch (error) {
    console.error("Error updating livestock breed:", error)
    return {
      error: "An error occurred while updating livestock breed."
    }
  }
  finally {
    console.log("Livestock breed updated successfully")
    revalidatePath(`/dashboard/farms`)  
  }
}


export async function updateLivestockAcquisitionDate(prevState:unknown, formData:FormData) {

  const id = Number(formData.get("id"))
  const acquisition_date = formData.get("acquisition_date") as string
  if (!id || !acquisition_date) {
    return {
      error: "Invalid data"
    }
  }

  const isMember = await isFarmMember(Number(formData.get("farm_id")))
  if (!isMember) {
    return {
      error: "You are not a member of this farm."
    }
  }

  try {
    const updatedLivestockAcquisitionDate = await db.update(livestock).set({
      acquisition_date: new Date(acquisition_date),
      updated_at: new Date()
    }).where(eq(livestock.id, id)).returning()

    revalidatePath(`/dashboard/farms/${updatedLivestockAcquisitionDate[0].farm_id}/livestock/${id}`)

    return updatedLivestockAcquisitionDate
  }
  catch (error) {
    console.error("Error updating livestock acquisition date:", error)
    return {
      error: "An error occurred while updating livestock acquisition date."
    }
  }
  finally {
    console.log("Livestock acquisition date updated successfully")
    revalidatePath(`/dashboard/farms`)  
  }
}

export async function updateLivestockSource(prevState:unknown, formData:FormData) {

  const id = Number(formData.get("id"))
  const source = formData.get("source") as string
  if (!id || !source) {
    return {
      error: "Invalid data"
    }
  }

  const isMember = await isFarmMember(Number(formData.get("farm_id")))
  if (!isMember) {
    return {
      error: "You are not a member of this farm."
    }
  }

  try {
    const updatedLivestockSource = await db.update(livestock).set({
      source: source,
      updated_at: new Date()
    }).where(eq(livestock.id, id)).returning()

    revalidatePath(`/dashboard/farms/${updatedLivestockSource[0].farm_id}/livestock/${id}`)

    return updatedLivestockSource
  }
  catch (error) {
    console.error("Error updating livestock source:", error)
    return {
      error: "An error occurred while updating livestock source."
    }
  }
  finally {
    console.log("Livestock source updated successfully")
    revalidatePath(`/dashboard/farms`)  
  }
}


