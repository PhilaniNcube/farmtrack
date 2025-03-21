import { eq } from "drizzle-orm";
import { db } from "../db";
import { farmMembers, users } from "../schema";

export async function getFarmMembers(farmId: number) {
  // Get all users associated with this farm
  const members = await db.select().from(farmMembers).leftJoin(users, eq(users.id, farmMembers.user_id)).where(eq(farmMembers.id, farmId))

  return members;
}