"use server";

import { db } from "@/lib/db";

import { farmMembers, users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { stackServerApp } from "@/stack";

export async function addMeAsFarmMember(farmId: number) {

    // Check if the user is authenticated
    const currentUser = await stackServerApp.getUser();
  if (!currentUser?.id) {
    return 
  }

  const authUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, currentUser.id),
  });

  if (!authUser?.id) {
    console.error("User not found");
    return;
  }

  // Check if the user is already a member of the farm
  const existingMember = await db.query.farmMembers.findFirst({
    where: (farmMembers, { eq }) => eq(farmMembers.user_id, currentUser.id),
  });

  if (existingMember) {

    return;
  }



  try {
    const [newFarmMember] = await db
      .insert(farmMembers)
      .values({
        farm_id: farmId,
        user_id: currentUser.id,
        role: "member",
        joined_at: new Date(),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning({ id: farmMembers.id });

 
  } catch (error) {
    console.error("Error adding farm member:", error);
  
  }
}