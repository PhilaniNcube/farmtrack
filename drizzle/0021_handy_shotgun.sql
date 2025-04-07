CREATE TYPE "public"."activity_type" AS ENUM('planting', 'harvesting', 'fertilizing', 'irrigating', 'weeding', 'pesticide_application', 'other');--> statement-breakpoint
CREATE TABLE "crop_activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" "activity_type" DEFAULT 'other',
	"status" "status" DEFAULT 'pending',
	"description" varchar NOT NULL,
	"scheduled_date" timestamp NOT NULL,
	"completed_date" timestamp,
	"crop_id" integer NOT NULL,
	"team_id" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "crop_activities" ADD CONSTRAINT "crop_activities_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;