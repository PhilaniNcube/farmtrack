import { desc, eq } from "drizzle-orm"
import { inventory } from "../schema"
import { db } from "../db"

export async function getInventoryItems(farmId: number) {
   "use cache"
    const inventoryItems = await db
        .select()
        .from(inventory)
        .where(eq(inventory.farm_id, farmId))
        .orderBy(desc(inventory.created_at))
    
    return inventoryItems
}