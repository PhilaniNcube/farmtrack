import { boolean, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { farms } from "./farms";
import { z } from "zod";
import { teams } from "./teams";

export const fieldLocations = pgTable('field_locations', {
  id: serial('id').primaryKey().notNull(),
  team_id: text('team_id').notNull().references(() => teams.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }),
});

export type FieldLocation = typeof fieldLocations.$inferSelect;
export type FieldLocationInsert = typeof fieldLocations.$inferInsert;

export const FieldLocationSchema = z.object({
    team_id:z.string(),
    name: z.string(),
    description: z.string().optional(),
});