import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

// Create a SQL client with the database URL from environment variables
const sql = neon(process.env.DATABASE_URL!)

// Create a drizzle client
export const db = drizzle(sql)

// Helper function for direct SQL queries
export async function query(sql: string, params: any[] = []) {
  try {
    return await db.execute(sql, params)
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

