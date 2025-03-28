import { eq } from "drizzle-orm";
import { db } from "../db";
import { fieldLocations } from "../schema";
import { unstable_cacheLife, unstable_cacheTag } from "next/cache";

export async function getFieldLocations(farmId:number) {


  const fields = await db.select().from(fieldLocations).where(eq(fieldLocations.farm_id, farmId));
  return fields;
}