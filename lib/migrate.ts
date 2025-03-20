import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { neon, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import { db } from './db';

// Required for Neon serverless
neonConfig.webSocketConstructor = ws;

// This script will apply any pending migrations to your database
const runMigrations = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }
  
  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);
  
  console.log('Running migrations...');
  
  await migrate(db, { migrationsFolder: './drizzle' });
  
  console.log('Migrations completed successfully');
  
  process.exit(0);
};

async function dropAllTables() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  const tables = await db.execute(
    `SELECT tablename FROM pg_tables WHERE schemaname = 'public';`
  );

  for (const table of tables.rows) {
    await db.execute(`DROP TABLE IF EXISTS "${table.tablename}" CASCADE;`);
  }

  console.log('All tables dropped successfully.');
}

// Ensure dropAllTables completes before running migrations
const main = async () => {
  try {
    await dropAllTables();
    await runMigrations();
  } catch (error) {
    console.error('Error during database reset and migration:', error);
    process.exit(1);
  }
};

main();