
import { eq } from "drizzle-orm";
import { db } from "../db";
import { fieldLocations } from "../schema";
import { unstable_cacheLife, unstable_cacheTag } from "next/cache";

export async function getFieldLocations(team_id:string) {


  const fields = await db.select().from(fieldLocations).where(eq(fieldLocations.team_id, team_id));
  return fields;
}