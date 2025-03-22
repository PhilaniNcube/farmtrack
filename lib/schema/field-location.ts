import { boolean, integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { farms } from "./farms";
import { z } from "zod";

export const fieldLocations = pgTable('field_locations', {
  id: serial('id').primaryKey().notNull(),
  farm_id: integer('farm_id').notNull().references(() => farms.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }),
});

export type FieldLocation = typeof fieldLocations.$inferSelect;
export type FieldLocationInsert = typeof fieldLocations.$inferInsert;

export const FieldLocationSchema = z.object({
    farm_id: z.coerce.number(),
    name: z.string(),
    description: z.string().optional(),
});