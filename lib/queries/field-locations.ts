import { eq } from "drizzle-orm";
import { db } from "../db";
import { fieldLocations } from "../schema";

export async function getFieldLocations(farmId:number) {
  const fields = await db.select().from(fieldLocations).where(eq(fieldLocations.farm_id, farmId));
  return fields;
}