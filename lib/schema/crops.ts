import { pgTable, serial, varchar, timestamp, text, numeric, integer } from 'drizzle-orm/pg-core';
import { farms } from './farms';
import { z } from 'zod';
import { teams } from './teams';

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
  team_id: text('team_id').references(() => teams.id).notNull(),
  notes: text('notes'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

export type Crop = typeof crops.$inferSelect;
export type CropInsert = typeof crops.$inferInsert;

export const CropSchema = z.object({
  name: z.string(),
  variety: z.string(),
  planting_date: z.string(),
  expected_harvest_date: z.string(),
  location: z.string(),
  area: z.coerce.number(),
  area_unit: z.string(),
  status: z.string(),
  notes: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  team_id: z.coerce.number(),
})

export const CropUpdateSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  variety: z.string(),
  planting_date: z.string(),
  expected_harvest_date: z.string(),
  location: z.string(),
  area: z.coerce.number(),
  area_unit: z.string(),
  status: z.string(),
  notes: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
})



export type CropUpdate = z.infer<typeof CropUpdateSchema>
export type CropInsertType = z.infer<typeof CropSchema>
