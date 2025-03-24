import { desc, eq } from "drizzle-orm"
import { db } from "../db"
import { livestock } from "../schema"
import { unstable_cache } from 'next/cache';

export async function getLivestock(farmId: number) {
   ""
  const livestockItems = await db
    .select()
    .from(livestock)
    .where(eq(livestock.farm_id, farmId))
    .orderBy(desc(livestock.created_at))

  return livestockItems
}

export async function getLivestockById(id: number) {
   ""
  const livestockItem = await db
    .select()
    .from(livestock)
    .where(eq(livestock.id, id))
    .limit(1)
    .execute()

  return livestockItem[0]
}


export const getCachedLivestock = unstable_cache(
 async (farmId: number) => getLivestock(farmId),
  ["getLivestock"], 
  { 
    tags: ["getLivestock"],
   }
)