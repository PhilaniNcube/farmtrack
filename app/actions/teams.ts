"use server";

import { db } from "@/lib/db";
import { teams } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Creates a new team in the database from Stack Auth webhook data
 */
export async function createTeam(
    id: string,
    displayName: string,
    profileImageUrl?: string,
    serverMetadata?: Record<string, unknown>,
    clientMetadata?: Record<string, unknown>,
    clientReadOnlyMetadata?: Record<string, unknown>
  ) {
    try {
      const [newTeam] = await db.insert(teams).values({
        id,
        display_name: displayName,
        profile_image_url: profileImageUrl,
        server_metadata: serverMetadata ? serverMetadata : undefined,
        client_metadata: clientMetadata ? clientMetadata : undefined,
        client_read_only_metadata: clientReadOnlyMetadata ? clientReadOnlyMetadata : undefined,
      }).returning();
      
      return { team: newTeam };
    } catch (error) {
      console.error("Error creating team:", error);
      throw error;
    } finally {
        revalidatePath("/dashboard/teams");
    }
  }


  export async function deleteTeam(id: string) {

    try {
      const deletedTeam = await db.delete(teams).where(eq(teams.id, id)).returning();
      return { team: deletedTeam };
    } catch (error) {
      console.error("Error deleting team:", error);
      throw error;
    } finally {
        revalidatePath("/dashboard/teams");
    }

  }