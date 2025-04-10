import { pgTable, serial, varchar, timestamp, text, numeric, integer } from 'drizzle-orm/pg-core';
import { farms } from './farms';
import { z } from 'zod';
import { teams } from './teams';

export const inventory = pgTable('inventory', {
  id: serial('id').primaryKey(),
  item_name: varchar('item_name').notNull(),
  category: varchar('category').notNull(), // e.g., seed, feed, equipment, fertilizer
  quantity: numeric('quantity').notNull(),
  unit: varchar('unit').notNull(),
  purchase_date: timestamp('purchase_date'),
  expiry_date: timestamp('expiry_date'),
  purchase_price: numeric('purchase_price'),
  supplier: varchar('supplier'),
  storage_location: varchar('storage_location'),
  reorder_level: numeric('reorder_level'),
  notes: text('notes'),
  team_id: varchar('team_id').references(() => teams.id).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

export type Inventory = typeof inventory.$inferSelect;
export type InventoryInsert = typeof inventory.$inferInsert;

export const InventorySchema = z.object({
  item_name: z.string(),
  category: z.string(),
  quantity: z.coerce.number(),
  unit: z.string(),
  purchase_date: z.string().optional(),
  expiry_date: z.string().optional(),
  purchase_price: z.coerce.number().optional(),
  supplier: z.string().optional(),
  storage_location: z.string().optional(),
  reorder_level: z.coerce.number().optional(),
  notes: z.string().optional(),
  team_id: z.string()
});

export const InventoryUpdateSchema = z.object({
  team_id: z.string(),
  id: z.coerce.number(),
  item_name: z.string(),
  category: z.string(),
  quantity: z.coerce.number(),
  unit: z.string(),
  purchase_date: z.string().optional(),
  expiry_date: z.string().optional(),
  purchase_price: z.coerce.number().optional(),
  supplier: z.string().optional(),
  storage_location: z.string().optional(),
  reorder_level: z.coerce.number().optional(),
  notes: z.string().optional()
});