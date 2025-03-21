"use server"

import { db } from "@/lib/db"
import { users, farms, type User, type Farm } from "@/lib/schema"
import { stackServerApp } from "@/stack"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"




// Update user profile
export async function updateUserProfile(prevState:unknown, formData: FormData) {
  const authUser = await stackServerApp.getUser()
  if (!authUser?.id) {
    return { error: "Not authenticated" }
  }

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  

  try {
    await db
      .update(users)
      .set({
        name,
        email,
  
        updated_at: new Date(),
      })
      .where(eq(users.id, authUser.id))

    revalidatePath("/dashboard/profile")
    return { success: "Profile updated successfully" }
  } catch (error) {
    console.error("Error updating profile:", error)
    return { error: "Failed to update profile" }
  }
}

