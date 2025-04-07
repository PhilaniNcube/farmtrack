"use server";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { crop_notes } from "@/lib/schema";

export async function addCropNote(crop_id: number, team_id: string, text: string) {

    try {

        if (!crop_id || !team_id || !text) {
            throw new Error("Invalid input data");
        }

        // get current timestamp
        const created_date = new Date();

        const cropNote = await db.insert(crop_notes).values([{
            text,
            crop_id,
            team_id,
            created_date: created_date,
        }]).returning()

        return cropNote[0];

    } catch (error) {

        console.error("Failed to add crop note:", error);
        return {
            error: "Failed to add crop note",
            message: error instanceof Error ? error.message : "An unknown error occurred"
        };

    }  finally {
        // Revalidate paths where this data might be displayed
        revalidatePath(`/dashboard/team/${team_id}/crops/${crop_id}`);
        revalidatePath(`/dashboard/team/${team_id}/crops/${crop_id}/notes`);
    } 

    // Validate the input data

}