import { pgTable, serial, varchar, timestamp, text } from 'drizzle-orm/pg-core';

export const farms = pgTable('farms', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  location: varchar('location', { length: 255 }),
  description: text('description'),  // New column added
  created_by: varchar('created_by', { length: 255 }).notNull(), // User ID or name of the creator   
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

export type Farm = typeof farms.$inferSelect;
export type FarmInsert = typeof farms.$inferInsert;