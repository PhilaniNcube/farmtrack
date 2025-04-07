// generate a neon database schema for crop activities

import { pgTable, serial, varchar, timestamp, text, integer, pgEnum } from 'drizzle-orm/pg-core';

import { teams } from './teams';
import { statusEnum } from './tasks';

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
