"use server"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/queries/users"
import { farms, users, farmMembers } from "@/lib/schema"
import { stackServerApp } from "@/stack"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

// Create a new farm
export async function createFarm(prevState:unknown, formData: FormData) {
    const authUser = await getCurrentUser()
    if (!authUser?.id) {
        return { error: "Not authenticated" }
    }

    const name = formData.get("name") as string
    const location = formData.get("location") as string
    const description = formData.get("description") as string
    const team_id = formData.get("team_id") as string

    const team = await stackServerApp.createTeam({
        displayName: name,
        creatorUserId: authUser.id,        
    })

    return {
        success: true,
        message: "Farm created successfully",
    }

    
}