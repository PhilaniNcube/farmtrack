CREATE INDEX "idx_health_status" ON "livestock" USING btree ("health_status");--> statement-breakpoint
CREATE INDEX "idx_purpose" ON "livestock" USING btree ("purpose");