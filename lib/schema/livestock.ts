import { pgTable, serial, varchar, timestamp, text, numeric, integer } from 'drizzle-orm/pg-core';
import { farms } from './farms';

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