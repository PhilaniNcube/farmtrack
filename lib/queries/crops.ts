import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache"
import { db } from "../db"
import { isFarmMember } from "./farm-members"

export async function getCropsByTeamId(team_id: string) {

  const crops = await db.query.crops.findMany({
    where: (crops, { eq }) => eq(crops.team_id, team_id),
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