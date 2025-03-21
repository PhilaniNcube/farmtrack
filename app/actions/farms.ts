"use server"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/queries/users"
import { farms, users } from "@/lib/schema"
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

    try {
        const [newFarm] = await db
            .insert(farms)
            .values({
                name,
                location,
                description,
                created_by: authUser.id,
                created_at: new Date(),
                updated_at: new Date(),
            })
            .returning({ id: farms.id })

        // Update the user's farm_id if they don't have one yet
        if (authUser && !authUser.farm_id) {
            await db.update(users).set({ farm_id: newFarm.id }).where(
                eq(users.id, authUser.id)
            )
        }

        revalidatePath("/dashboard/farms")
        return { success: "Farm created successfully", farmId: newFarm.id }

    }


    catch (error) {
        console.error("Error creating farm:", error)
        return { error: "Failed to create farm" }
    }
}