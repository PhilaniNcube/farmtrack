import { pgTable, serial, varchar, timestamp, text, integer } from 'drizzle-orm/pg-core';

export const activities = pgTable('activities', {
  id: serial('id').primaryKey(),
  activity_type: varchar('activity_type', { length: 100 }).notNull(), // planting, harvesting, feeding, etc.
  description: text('description').notNull(),
  performed_by: varchar('performed_by', { length: 255 }),
  performed_at: timestamp('performed_at').notNull(),
  category: varchar('category', { length: 100 }).notNull(), // crops, livestock, etc.
  related_to: varchar('related_to', { length: 255 }), // specific crop, livestock, etc.
  notes: text('notes'),
  user_id: varchar('user_id', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});