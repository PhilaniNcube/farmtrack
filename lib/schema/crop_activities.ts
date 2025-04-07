// generate a neon database schema for crop activities

import { pgTable, serial, varchar, timestamp, text, integer, pgEnum } from 'drizzle-orm/pg-core';

import { teams } from './teams';
import { statusEnum } from './tasks';
import { z } from 'zod';

// Define the activity type enum properly using pgEnum
export const activityTypeEnum = pgEnum('activity_type', [
    'planting',
    'harvesting',
    'fertilizing',
    'irrigating',
    'weeding',
    'pesticide_application',
    'other'
]);


export type ActivityType = typeof activityTypeEnum.enumValues[number];


export const crop_activities = pgTable('crop_activities', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    type: activityTypeEnum('type').default('other'),
    status: statusEnum('status').default('pending'),
    description: varchar('description').notNull(),
    scheduled_date: timestamp('scheduled_date').notNull(),
    completed_date: timestamp('completed_date'),
    crop_id: integer('crop_id').notNull(), // Foreign key to crops table
    team_id: varchar('team_id').references(() => teams.id).notNull(),
});

export type CropActivity = typeof crop_activities.$inferSelect;
export type CropActivityInsert = typeof crop_activities.$inferInsert;


// Schema for validation
export const CropActivitySchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    type: z.enum(['planting', 'harvesting', 'fertilizing', 'irrigating', 'weeding', 'pesticide_application', 'other']),
    status: z.enum(['pending', 'in-progress', 'completed']),
    description: z.string().min(1, { message: "Description is required" }),
    scheduled_date: z.string(),
    completed_date: z.string().optional().nullable(),
    crop_id: z.coerce.number({ message: "Crop ID is required" }),
    team_id: z.string({ message: "Team ID is required" }),
  })