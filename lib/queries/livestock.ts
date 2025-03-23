import { desc, eq } from "drizzle-orm"
import { db } from "../db"
import { livestock } from "../schema"

export async function getLivestock(farmId: number) {
  const livestockItems = await db
    .select()
    .from(livestock)
    .where(eq(livestock.farm_id, farmId))
    .orderBy(desc(livestock.created_at))

  return livestockItems
}

export async function getLivestockById(id: number) {
   "use cache"
  const livestockItem = await db
    .select()
    .from(livestock)
    .where(eq(livestock.id, id))
    .limit(1)
    .execute()

  return livestockItem[0]
}