import { pgTable, serial, varchar, timestamp, text, numeric, integer } from 'drizzle-orm/pg-core';
import { farms } from './farms';
import { z } from 'zod';

export const livestock = pgTable('livestock', {
  id: serial('id').primaryKey(),
  type: varchar('type', { length: 100 }).notNull(), // e.g., cattle, poultry, etc.
  breed: varchar('breed', { length: 100 }).notNull(),
  count: integer('count').notNull(),
  acquisition_date: timestamp('acquisition_date').notNull(),
  source: varchar('source', { length: 255 }),
  location: varchar('location', { length: 255 }).notNull(),
  health_status: varchar('health_status', { length: 50 }).notNull(),
  purpose: varchar('purpose', { length: 100 }), // e.g., dairy, meat, breeding
  notes: text('notes'),
  farm_id: integer('farm_id').references(() => farms.id).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

export type Livestock = typeof livestock.$inferSelect;
export type LivestockInsert = typeof livestock.$inferInsert;

export const LivestockSchema = z.object({
  type: z.string().min(1, 'Type is required'),
  breed: z.string(),
  count: z.coerce.number().min(1, 'Count must be at least 1'),
  acquisition_date: z.string(),
  source: z.string().optional(),
  location: z.string().min(1, 'Location is required'),
  health_status: z.string().min(1, 'Health status is required'),
  purpose: z.string().optional(),
  notes: z.string().optional(),
  farm_id: z.number()
})