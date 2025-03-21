import { eq } from "drizzle-orm";
import { db } from "../db";
import { farmMembers, users, farms } from "../schema";
import { stackServerApp } from "@/stack";

export async function getFarmMembers(farmId: number) {
  // Get all users associated with this farm
  const members = await db.select().from(farmMembers).leftJoin(users, eq(users.id, farmMembers.user_id)).where(eq(farmMembers.farm_id, farmId))

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
    .leftJoin(farms, eq(farms.id, farmMembers.farm_id))
    .where(eq(farmMembers.user_id, authUser.id));

  return userFarms;
}

// get the return type of the getUserFarms function
export type UserFarms = Awaited<ReturnType<typeof getUserFarms>>[number];