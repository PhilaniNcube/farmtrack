"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { db, query } from "@/lib/db"

import { livestock, LivestockHealthStatus, LivestockSchema, LivestockUpdateSchema } from "@/lib/schema"
import { eq, is } from "drizzle-orm"



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
    team_id: formData.get("team_id")
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
    health_status: parsedData.data.health_status as LivestockHealthStatus,
    purpose: parsedData.data.purpose,
    notes: parsedData.data.notes,
    team_id: parsedData.data.team_id,
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
    
  }  finally {
    revalidateTag("getLivestock")
    revalidatePath(`/dashboard/team/${formData.get("team_id")}/livestock`)
    revalidatePath(`/dashboard/team/${formData.get("team_id")}`)
  }

}



export async function updateLivestock(prevState:unknown, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries())

    const parsedData = await LivestockUpdateSchema.safeParse(data)

    if (!parsedData.success) {
      return {
        error: parsedData.error.format()
      }
    }

    console.log("Parsed data:", parsedData.data)  


    const updatedLivestock = await db.update(livestock).set({
      type: parsedData.data.type,
      breed: parsedData.data.breed,
      count: parsedData.data.count,
      acquisition_date: new Date(parsedData.data.acquisition_date),
      source: parsedData.data.source,
      location: parsedData.data.location,
      health_status: parsedData.data.health_status as LivestockHealthStatus,
      purpose: parsedData.data.purpose,
      notes: parsedData.data.notes,
      team_id: parsedData.data.team_id
    }).where(eq(livestock.id, Number(parsedData.data.id))).returning()



    return {
      success: true,
      livestock: updatedLivestock
    }

  } catch (error) {
    console.error("Error updating livestock:", error)
    return {
      error: "An error occurred while updating livestock."
    }
  } 
}


export async function incrementLivestockCount( id: number ) {


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
  } 
}

export async function decrementLivestockCount( id: number, ) {
  

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
  } 
}

export async function updateLivestockCount(prevState:unknown, id: number, count: number, ) {
  



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
  } 
}

export async function updateLivestockType(prevState:unknown, formData:FormData) {


  const id = Number(formData.get("id"))
  const type = formData.get("type") as string



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



    return updatedLivestockType
  } catch (error) {
    console.error("Error updating livestock type:", error)
    return {
      error: "An error occurred while updating livestock type."
    }
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



  try {
    const updatedLivestockHealthStatus = await db.update(livestock).set({
      health_status: health_status as LivestockHealthStatus,
      updated_at: new Date()
    }).where(eq(livestock.id, id)).returning()


    return updatedLivestockHealthStatus
  } catch (error) {
    console.error("Error updating livestock health status:", error)
    return {
      error: "An error occurred while updating livestock health status."
    }
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



  try {
    const updatedLivestockLocation = await db.update(livestock).set({
      location: location,
      updated_at: new Date()
    }).where(eq(livestock.id, id)).returning()



    return updatedLivestockLocation
  }
  catch (error) {
    console.error("Error updating livestock location:", error)
    return {
      error: "An error occurred while updating livestock location."
    }
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


  try {
    const updatedLivestockNotes = await db.update(livestock).set({
      notes: notes,
      updated_at: new Date()
    }).where(eq(livestock.id, id)).returning()



    return updatedLivestockNotes
  }
  catch (error) {
    console.error("Error updating livestock notes:", error)
    return {
      error: "An error occurred while updating livestock notes."
    }
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



  try {
    const updatedLivestockPurpose = await db.update(livestock).set({
      purpose: purpose,
      updated_at: new Date()
    }).where(eq(livestock.id, id)).returning()



    return updatedLivestockPurpose
  }
  catch (error) {
    console.error("Error updating livestock purpose:", error)
    return {
      error: "An error occurred while updating livestock purpose."
    }
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



  try {
    const updatedLivestockBreed = await db.update(livestock).set({
      breed: breed,
      updated_at: new Date()
    }).where(eq(livestock.id, id)).returning()



    return updatedLivestockBreed
  }
  catch (error) {
    console.error("Error updating livestock breed:", error)
    return {
      error: "An error occurred while updating livestock breed."
    }
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



  try {
    const updatedLivestockAcquisitionDate = await db.update(livestock).set({
      acquisition_date: new Date(acquisition_date),
      updated_at: new Date()
    }).where(eq(livestock.id, id)).returning()

 

    return updatedLivestockAcquisitionDate
  }
  catch (error) {
    console.error("Error updating livestock acquisition date:", error)
    return {
      error: "An error occurred while updating livestock acquisition date."
    }
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



  try {
    const updatedLivestockSource = await db.update(livestock).set({
      source: source,
      updated_at: new Date()
    }).where(eq(livestock.id, id)).returning()



    return updatedLivestockSource
  }
  catch (error) {
    console.error("Error updating livestock source:", error)
    return {
      error: "An error occurred while updating livestock source."
    }
  }

}

export async function deleteLivestock(id: number) {
  try {
    const deletedLivestock = await db.delete(livestock)
      .where(eq(livestock.id, id))
      .returning();
    
    revalidateTag("getLivestock")
    
    return {
      success: true,
      livestock: deletedLivestock
    }
  } catch (error) {
    console.error("Error deleting livestock:", error)
    return {
      error: "An error occurred while deleting livestock."
    }
  }
}


