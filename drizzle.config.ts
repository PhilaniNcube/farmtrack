import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './lib/schema/*.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'farmtrack',
    ssl: process.env.DB_SSL === 'true',
  },
  tablesFilter: ['!drizzle_migrations'],
} satisfies Config;