import { desc, eq } from "drizzle-orm"
import { db } from "../db"
import { finances } from "../schema"

export async function getFinances(farmId: number) {
  const financeData = await db.query.finances.findMany({
    where: eq(finances.farm_id, farmId),
    orderBy: desc(finances.transaction_date),
    })

  return financeData
}