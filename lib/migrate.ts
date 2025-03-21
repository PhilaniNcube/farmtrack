import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { neon, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

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

// Just run the migrations without dropping tables
runMigrations().catch((error) => {
  console.error('Error during migration:', error);
  process.exit(1);
});