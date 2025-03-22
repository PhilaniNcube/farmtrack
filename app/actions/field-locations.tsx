"use server";

import { db } from "@/lib/db";
import { fieldLocations, FieldLocationSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export async function addFieldLocation(prevState: unknown, formData: FormData) {

    try {

        const validatedFields = FieldLocationSchema.safeParse({
            farm_id: formData.get("farm_id"),
            name: formData.get("name"),
            description: formData.get("description"),
        })

        if (!validatedFields.success) {
            return {
                error: "Invalid field location data",
            }
        }

        const fieldLocation = validatedFields.data;


        const result = await db.insert(fieldLocations).values({
            farm_id: fieldLocation.farm_id,
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

    } finally {
        revalidatePath(`/dashboard/farms/${formData.get("farm_id")}/crops`);
    }


}