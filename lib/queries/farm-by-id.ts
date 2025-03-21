import { db } from "@/lib/db";
import { farms } from "@/lib/schema";
import { eq } from "drizzle-orm";

/**
 * Fetches a farm by its ID
 * @param id The farm ID to fetch
 * @returns The farm data or null if not found
 */
export async function getFarmById(id: number) {
  if (!id) return null;
  
  try {
    const farmData = await db.query.farms.findFirst({
      where: eq(farms.id, id),
    });
    
    return farmData || null;
  } catch (error) {
    console.error("Error fetching farm by ID:", error);
    return null;
  }
}