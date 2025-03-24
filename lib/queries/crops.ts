import { db } from "../db"
import { eq } from "drizzle-orm"
import { crops } from "../schema"
import { isFarmMember } from "./farm-members"

export async function getCropsByFarmId(farmId: number) {

  // Check if the user is a member of the farm
  const isMember = await isFarmMember(farmId)

  if (!isMember) {
    return []
  }

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