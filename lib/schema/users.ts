import { pgTable, varchar, timestamp, boolean, integer, index } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(), // Updated to match Stack Auth ID format
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('user'), // admin, user, etc.
  profile_image_url: varchar('profile_image_url', { length: 512 }),
  is_active: boolean('is_active').notNull().default(true),
  last_login: timestamp('last_login'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
}, 
(table) => [
  index('idx_users_email').on(table.email),
  index('idx_users_id').on(table.id),
]
);

export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

import { farms } from './farms';