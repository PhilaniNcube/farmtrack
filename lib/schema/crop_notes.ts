import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { teams } from "./teams";

export const crop_notes = pgTable('crop_notes', {
    id: serial('id').primaryKey(),
    text: text('name').notNull(),
    crop_id: integer('crop_id').notNull(), // Foreign key to crops table
    team_id: varchar('team_id').references(() => teams.id).notNull(),
    created_date: timestamp('created_date', {
        mode: 'date',
        withTimezone: false,
    }).defaultNow().notNull(),
    
});

export type CropNote = typeof crop_notes.$inferSelect;
export type CropNoteInsert = typeof crop_notes.$inferInsert;