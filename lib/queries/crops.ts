import { db } from "../db"
import { eq } from "drizzle-orm"
import { crops } from "../schema"

export async function getCropsByFarmId(farmId: number) {
  const crops = await db.query.crops.findMany({
    where: (crops, { eq }) => eq(crops.farm_id, farmId),
    orderBy: (crops, { desc }) => [desc(crops.planting_date)]
    })
  return crops
}

export async function getCropById(cropId: number) {
  const crop = await db.query.crops.findFirst({
    where: (crops, { eq }) => eq(crops.id, cropId)
  })
  return crop
}