import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { farmMembers, users, farms } from "../schema";
import { stackServerApp } from "@/stack";
import { cache } from "react";
import { unstable_cache } from "next/cache";

export async function getFarmMembers(team_id: string) {

  const members = await db.select().from(farmMembers).leftJoin(users, eq(users.id, farmMembers.user_id)).where(eq(farmMembers.team_id, team_id))

  return members;
}

export async function getUserFarms() {


  const authUser = await stackServerApp.getUser();

  if (!authUser?.id) {
    return [];
  }

  // Get all farms that the user is a member of
  const userFarms = await db
    .select({
      farm: farms,
      membership: farmMembers
    })
    .from(farmMembers)
    .leftJoin(farms, eq(farms.id, farmMembers.team_id))
    .where(eq(farmMembers.user_id, authUser.id));

  return userFarms;
}


export const isFarmMember = cache(async (team_id: string) => {



  const authUser = await stackServerApp.getUser();

  if (!authUser?.id) {
    return false;
  }

  // Check if the user is a member of the farm
  const farmMember = await db
    .select()
    .from(farmMembers)
    .where(and(eq(farmMembers.team_id, team_id), eq(farmMembers.user_id, authUser.id)));


  return farmMember.length > 0;
})

export const cachedIsFarmMember = unstable_cache(
  async (team_id: string) => await isFarmMember(team_id),
  ["isFarmMember"],
  {
    tags: ["isFarmMember"],
  }
)

// get the return type of the getUserFarms function
export type UserFarms = Awaited<ReturnType<typeof getUserFarms>>[number];

export type FarmMember = Awaited<ReturnType<typeof getFarmMembers>>[number];