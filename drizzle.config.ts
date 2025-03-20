import 'dotenv/config';
import { config } from 'dotenv';

// Load environment variables from .env.local
config({ path: '.env.local' });

import type { Config } from 'drizzle-kit';

export default {
  schema: './lib/schema/*.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.PGHOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE || 'farmtrack',
    ssl: "require",
    url: process.env.DATABASE_URL,
  },
  tablesFilter: ['!drizzle_migrations'],
} satisfies Config;