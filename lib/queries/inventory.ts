import { desc, eq, is } from "drizzle-orm"
import { inventory } from "../schema"
import { db } from "../db"
import { unstable_cache } from 'next/cache';
import {  isFarmMember } from "./farm-members";

export async function getInventoryItems(team_id: string) {


   
    const inventoryItems = await db
        .select()
        .from(inventory)
        .where(eq(inventory.team_id, team_id))
        .orderBy(desc(inventory.created_at))
    
    return inventoryItems
}

export const getCachedInventoryItems = unstable_cache(
    async (team_id: string) => await getInventoryItems(team_id),
    ["getInventoryItems"], 
    { 
        tags: ["getInventoryItems"],
    }
)

export async function getInventoryItemById(id: number) {
    const inventoryItem = await db
        .select()
        .from(inventory)
        .where(eq(inventory.id, id))
        .limit(1)
        .execute()

    return inventoryItem[0]
}

export const getCachedInventoryItemById = unstable_cache(
    async (id: number) => await getInventoryItemById(id),
    ["getInventoryItemById"],
    { 
        tags: ["getInventoryItemById"],
    }
)