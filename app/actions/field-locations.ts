"use server";

import { db } from "@/lib/db";
import { fieldLocations, FieldLocationSchema } from "@/lib/schema";
import { revalidateTag } from "next/cache";
import { revalidatePath } from "next/cache";

export async function addFieldLocation(prevState: unknown, formData: FormData) {




    try {

        const validatedFields = FieldLocationSchema.safeParse({
            team_id: formData.get("team_id"),
            name: formData.get("name"),
            description: formData.get("description"),
        })

        if (!validatedFields.success) {
            console.error("Validation failed:", validatedFields.error.format())
            return {
                error: "Invalid field location data",
            }
        }

        const fieldLocation = validatedFields.data;


        const result = await db.insert(fieldLocations).values({
            team_id: fieldLocation.team_id,
            name: fieldLocation.name,
            description: fieldLocation.description,
        }).returning();

        if (!result) {
            return {
                error: "Failed to add field location",
            }
        }

        return {
            success: true,
            fieldLocation: result[0],
        }



    } catch (error) {

        console.error("Error adding field location:", error);
        return {
            error: "Failed to add field location",
        }

    }  finally {
        revalidateTag("locations")
        revalidatePath(`/dashboard/team/${formData.get("team_id")}/crops/add`)
    }

}