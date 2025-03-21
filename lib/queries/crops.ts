import { db } from "../db"

export async function getCropsByFarmId(farmId: number) {
  const crops = await db.query.crops.findMany({
    where: (crops, { eq }) => eq(crops.farm_id, farmId),
    orderBy: (crops, { desc }) => [desc(crops.planting_date)]
    })
  return crops
}