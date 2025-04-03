import { pgTable, serial, varchar, timestamp, jsonb, index } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const teams = pgTable('teams', {
  id: varchar('id', { length: 255 }).primaryKey().notNull(),
  display_name: varchar('display_name', { length: 255 }).notNull(),
  profile_image_url: varchar('profile_image_url', { length: 512 }),
  server_metadata: jsonb('server_metadata'),
  client_metadata: jsonb('client_metadata'),
  client_read_only_metadata: jsonb('client_read_only_metadata'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
}, 
(table) => [
  // Add any indexes here if needed
  index('idx_teams_display_name').on(table.display_name)
]
);

export type Team = typeof teams.$inferSelect;
export type TeamInsert = typeof teams.$inferInsert;

// Schema for validating webhook payload
export const TeamWebhookSchema = z.object({
  type: z.string(),
  data: z.object({
    created_at_millis: z.number(),
    id: z.string(),
    display_name: z.string(),
    server_metadata: z.record(z.unknown()).optional(),
    profile_image_url: z.string().optional(),
    client_metadata: z.record(z.unknown()).optional(),
    client_read_only_metadata: z.record(z.unknown()).optional()
  })
});

export type TeamWebhookPayload = z.infer<typeof TeamWebhookSchema>;