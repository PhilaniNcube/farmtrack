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
  created_at: timestamp('created_at',
    {
      mode: 'date',

    }
  ).defaultNow().notNull(),
  updated_at: timestamp('updated_at', {
    mode: 'date',

  }).defaultNow().notNull()
},
  (table) => [index('idx_team_id').on(table.team_id),
  index('idx_title').on(table.title),
  index('idx_status').on(table.status),
  index('idx_priority').on(table.priority),
  index('idx_completed_at').on(table.completed_at)
  ]


);

export type Task = typeof tasks.$inferSelect;
export type TaskInsert = typeof tasks.$inferInsert;