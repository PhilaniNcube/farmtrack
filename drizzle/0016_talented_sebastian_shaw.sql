ALTER TABLE "tasks" ALTER COLUMN "priority" SET DATA TYPE priority;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "status" SET DATA TYPE status;--> statement-breakpoint
CREATE INDEX "idx_team_id" ON "tasks" USING btree ("team_id");--> statement-breakpoint
CREATE INDEX "idx_title" ON "tasks" USING btree ("title");--> statement-breakpoint
CREATE INDEX "idx_status" ON "tasks" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_priority" ON "tasks" USING btree ("priority");--> statement-breakpoint
CREATE INDEX "idx_category" ON "tasks" USING btree ("category");