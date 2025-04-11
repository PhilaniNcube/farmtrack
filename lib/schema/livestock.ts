import { pgTable, serial, varchar, timestamp, text, numeric, integer, pgEnum, index } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { teams } from './teams';

export const healthStatusEnum = pgEnum('health_status', [
  'healthy',
  'new born',
  'sick',
  'needs_attention',
  'quarantine',
  'recovering',
  'unknown',
  'other'
]
)

export const livestock = pgTable('livestock', {
  id: serial('id').primaryKey(),
  type: varchar('type', { length: 100 }).notNull(), // e.g., cattle, poultry, etc.
  breed: varchar('breed', { length: 100 }).notNull(),
  count: integer('count').notNull(),
  acquisition_date: timestamp('acquisition_date').notNull(),
  source: varchar('source', { length: 255 }),
  location: varchar('location', { length: 255 }).notNull(),
  health_status: healthStatusEnum('health_status').default("healthy"), // default to healthy
  purpose: varchar('purpose', { length: 100 }), // e.g., dairy, meat, breeding
  notes: text('notes'),
  team_id: varchar('team_id').references(() => teams.id).notNull(),
  created_at: timestamp('created_at', {
    mode: 'date',
    withTimezone: false,
  }).defaultNow().notNull(),
  updated_at: timestamp('updated_at', {
    mode: 'date',
    withTimezone: false,
  }).defaultNow().notNull()
}, 
(table) => [
  index('idx_health_status').on(table.health_status),
  index('idx_purpose').on(table.purpose),
]


);

export type Livestock = typeof livestock.$inferSelect;
export type LivestockInsert = typeof livestock.$inferInsert;


export type LivestockHealthStatus =  'healthy' | 'new born' | 'sick' | 'needs_attention' | 'quarantine' | 'recovering' | 'unknown' | 'other'

export const LivestockSchema = z.object({
  type: z.string().min(1, 'Type is required'),
  breed: z.string(),
  count: z.coerce.number().min(1, 'Count must be at least 1'),
  acquisition_date: z.string(),
  source: z.string().optional(),
  location: z.string().min(1, 'Location is required'),
  health_status: z.enum([
    'healthy',
    'new born',
    'sick',
    'needs_attention',
    'quarantine',
    'recovering',
    'unknown',
    'other'
  ]).default('healthy'),
  purpose: z.string().optional(),
  notes: z.string().optional(),
  team_id: z.string()
})