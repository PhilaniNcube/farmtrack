import "server-only";

import { db } from "@/lib/db";
import { stackServerApp } from "@/stack";


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