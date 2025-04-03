CREATE INDEX "field_locations_team_id_idx" ON "field_locations" USING btree ("team_id");--> statement-breakpoint
CREATE INDEX "field_locations_name_idx" ON "field_locations" USING btree ("name");--> statement-breakpoint
CREATE INDEX "idx_users_email" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_users_id" ON "users" USING btree ("id");--> statement-breakpoint
CREATE INDEX "idx_teams_display_name" ON "teams" USING btree ("display_name");