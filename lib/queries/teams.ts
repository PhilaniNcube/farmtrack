import { db } from "../db";
import { teams } from "../schema/teams";

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
  }
}

/**
 * Gets a team by its ID
 */
export async function getTeamById(id: string) {
  try {
    const team = await db.query.teams.findFirst({
      where: (teams, { eq }) => eq(teams.id, id)
    });
    
    return { team };
  } catch (error) {
    console.error(`Error fetching team with id ${id}:`, error);
    throw error;
  }
}