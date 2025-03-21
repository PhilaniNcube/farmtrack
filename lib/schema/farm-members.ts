// create a table with a one to many relationship with users and farms meaning many users can belong to one farm

import { boolean, integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { farms } from "./farms";
import { users } from "./users";

export const farmMembers = pgTable('farm_members', {
  id: serial('id').primaryKey().notNull(),
    farm_id: integer('farm_id').notNull().references(() => farms.id),
    user_id: varchar('user_id', { length: 255 }).notNull().references(() => users.id),
    role: varchar('role', { length: 50 }).notNull().default('member'), // member, admin, etc.
    joined_at: timestamp('joined_at').defaultNow().notNull(),
    is_active: boolean('is_active').notNull().default(true),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
});

export type FarmMember = typeof farmMembers.$inferSelect;
export type FarmMemberInsert = typeof farmMembers.$inferInsert;