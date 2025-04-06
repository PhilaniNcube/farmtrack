import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache"
import { db } from "../db"
import { isFarmMember } from "./farm-members"
import { stackServerApp } from "@/stack"
import { and } from "drizzle-orm"

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

// write a function to get the next 3 crops to be harvested  based on the expected_harvest date for a team and check if the user is a member of the team
export async function getNextCropsToBeHarvested(team_id: string) {

  // check if the user is a member of the stack auth team
  const userTeam = await stackServerApp.getTeam(team_id)

  if (!userTeam) {
    throw new Error("User is not a member of this team")
  }

  // make sure that the harvest date is in the future
  const currentDate = new Date()
 
  const crops = await db.query.crops.findMany({
    where: (crops, { eq, gt, and, not }) => 
      and(
        eq(crops.team_id, team_id),
        gt(crops.expected_harvest_date, currentDate),
        not(eq(crops.status, "harvested"))
      ),
    orderBy: (crops, { asc }) => [asc(crops.expected_harvest_date)],
    limit: 3,
  })

  // if there are no crops, return an empty array
  if (crops.length === 0) {
    return []
  }

  return crops
}

export async function getCrops(team_id:string) {

  const crops = await db.query.crops.findMany({
    where: (crops, { eq }) => eq(crops.team_id, team_id),
    orderBy: (crops, { desc }) => [desc(crops.planting_date)]
  })
  return crops

}