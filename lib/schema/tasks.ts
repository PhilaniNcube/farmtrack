import { pgTable, serial, varchar, timestamp, text, boolean, integer } from 'drizzle-orm/pg-core';
import { farms } from './farms';

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  due_date: timestamp('due_date').notNull(),
  priority: varchar('priority', { length: 50 }).notNull(), // high, medium, low
  status: varchar('status', { length: 50 }).notNull(), // pending, in-progress, completed
  category: varchar('category', { length: 100 }).notNull(), // farm area: crops, livestock, etc.
  assigned_to: varchar('assigned_to', { length: 255 }),
  related_to: varchar('related_to', { length: 255 }), // specific crop, livestock, etc.
  farm_id: integer('farm_id').references(() => farms.id).notNull(),
  completed_at: timestamp('completed_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});