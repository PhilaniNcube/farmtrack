import { pgTable, serial, varchar, timestamp, text, boolean, integer, pgEnum, index } from 'drizzle-orm/pg-core';
import { teams } from './teams';

export const statusEnum = pgEnum('status', ['pending', 'in-progress', 'completed']);
export const priorityEnum = pgEnum('priority', ['high', 'medium', 'low']);

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  due_date: timestamp('due_date').notNull(),
  priority: priorityEnum('priority').default("low"), 
  status: statusEnum('status').default("pending"), 
  category: varchar('category', { length: 100 }).notNull(), // farm area: crops, livestock, etc.
  assigned_to: varchar('assigned_to', { length: 255 }),
  related_to: varchar('related_to', { length: 255 }), // specific crop, livestock, etc.
  team_id: varchar('team_id').references(() => teams.id).notNull(),
  completed_at: timestamp('completed_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
},
(table) => ({
  teamIdIndex: index('idx_team_id').on(table.team_id),
  titleIndex: index('idx_title').on(table.title),
  statusIndex: index('idx_status').on(table.status),
  priorityIndex: index('idx_priority').on(table.priority),
}) 
);

export type Task = typeof tasks.$inferSelect;
export type TaskInsert = typeof tasks.$inferInsert;