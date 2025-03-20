import { pgTable, serial, varchar, timestamp, text, numeric, integer } from 'drizzle-orm/pg-core';
import { farms } from './farms';

export const crops = pgTable('crops', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  variety: varchar('variety', { length: 255 }).notNull(),
  planting_date: timestamp('planting_date').notNull(),
  expected_harvest_date: timestamp('expected_harvest_date').notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  area: numeric('area').notNull(),
  area_unit: varchar('area_unit', { length: 50 }).notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  farm_id: integer('farm_id').references(() => farms.id).notNull(),
  notes: text('notes'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});