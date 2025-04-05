CREATE TYPE "public"."priority" AS ENUM('high', 'medium', 'low');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'in-progress', 'completed');--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "priority" "priority" DEFAULT 'low';--> statement-breakpoint
CREATE INDEX "idx_status" ON "tasks" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_priority" ON "tasks" USING btree ("priority");