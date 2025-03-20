import { db } from "@/lib/db";

import { eq, and, gte, desc } from "drizzle-orm";
import { crops } from "./schema/crops";
import { tasks } from "./schema/tasks";
import { livestock } from "./schema/livestock";

// Examples using Drizzle ORM query builder

export async function getCropsWithDrizzle() {
  try {
    // Using Drizzle query builder instead of raw SQL
    const result = await db
      .select()
      .from(crops)
      .orderBy(desc(crops.created_at));
    
    return { crops: result };
  } catch (error) {
    console.error("Failed to fetch crops:", error);
    return { error: "Failed to fetch crops" };
  }
}

export async function getCropByIdWithDrizzle(id: number) {
  try {
    const result = await db
      .select()
      .from(crops)
      .where(eq(crops.id, id))
      .limit(1);
    
    return { crop: result[0] };
  } catch (error) {
    console.error(`Failed to fetch crop with id ${id}:`, error);
    return { error: "Failed to fetch crop" };
  }
}

export async function getUpcomingTasks() {
  try {
    const result = await db
      .select()
      .from(tasks)
      .where(
        and(
          eq(tasks.status, 'pending'),
          gte(tasks.due_date, new Date())
        )
      )
      .orderBy(tasks.due_date)
      .limit(5);
    
    return { tasks: result };
  } catch (error) {
    console.error("Failed to fetch upcoming tasks:", error);
    return { error: "Failed to fetch upcoming tasks" };
  }
}

export async function getLivestockByType(type: string) {
  try {
    const result = await db
      .select()
      .from(livestock)
      .where(eq(livestock.type, type));
    
    return { livestock: result };
  } catch (error) {
    console.error(`Failed to fetch livestock of type ${type}:`, error);
    return { error: "Failed to fetch livestock" };
  }
}