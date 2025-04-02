
import { db } from "@/lib/db";
import { stackServerApp } from "@/stack";
import { getUserFarms } from "./farm-members";
import { unstable_cacheLife, unstable_cacheTag } from "next/cache";

export async function getMyFarms() {


  const authUser = await stackServerApp.getUser();
  if (!authUser?.id) {
    return [];
  }

  const farms = await db.query.farms.findMany({
    where: (farms, { eq }) => eq(farms.created_by, authUser.id),
  });

  return farms;
}

export async function getAllMyFarms() {

  const authUser = await stackServerApp.getUser();
  if (!authUser?.id) {
    return [];
  }

  // Get all farms where the user is a member
  const userFarms = await getUserFarms();
  
  return userFarms.map(({ farm }) => farm);
}

