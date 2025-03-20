import { pgTable, serial, varchar, timestamp, text, numeric, integer } from 'drizzle-orm/pg-core';
import { farms } from './farms';

export const inventory = pgTable('inventory', {
  id: serial('id').primaryKey(),
  item_name: varchar('item_name', { length: 255 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(), // e.g., seed, feed, equipment, fertilizer
  quantity: numeric('quantity').notNull(),
  unit: varchar('unit', { length: 50 }).notNull(),
  purchase_date: timestamp('purchase_date'),
  expiry_date: timestamp('expiry_date'),
  purchase_price: numeric('purchase_price'),
  supplier: varchar('supplier', { length: 255 }),
  storage_location: varchar('storage_location', { length: 255 }),
  reorder_level: numeric('reorder_level'),
  notes: text('notes'),
  farm_id: integer('farm_id').references(() => farms.id).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});