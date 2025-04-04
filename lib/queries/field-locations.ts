
import { eq } from "drizzle-orm";
import { db } from "../db";
import { fieldLocations } from "../schema";
import { unstable_cache } from "next/cache";

export async function getFieldLocations(team_id:string) {


  const fields = await db.select().from(fieldLocations).where(eq(fieldLocations.team_id, team_id)).orderBy(fieldLocations.name)
  
  return fields;
}

export const getCachedFieldLocations = unstable_cache(
  async (team_id:string) => await getFieldLocations(team_id),
  ["fieldLocations"],
  {
    tags: ["locations"],
    
  }
)