import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import { schema } from './schema';


neonConfig.webSocketConstructor = ws;
// To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch
// neonConfig.poolQueryViaFetch = true;
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });

// Helper function for raw SQL queries (for backward compatibility)
export async function query(text: string, params?: any[]) {
  try {
    const result = await sql(text, params);
    return { rows: result };
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}