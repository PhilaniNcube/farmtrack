ALTER TABLE "activities" RENAME COLUMN "team_id" TO "team_id";--> statement-breakpoint
ALTER TABLE "crops" RENAME COLUMN "team_id" TO "team_id";--> statement-breakpoint
ALTER TABLE "field_locations" RENAME COLUMN "team_id" TO "team_id";--> statement-breakpoint
ALTER TABLE "finances" RENAME COLUMN "team_id" TO "team_id";--> statement-breakpoint
ALTER TABLE "tasks" RENAME COLUMN "team_id" TO "team_id";--> statement-breakpoint
ALTER TABLE "livestock" RENAME COLUMN "team_id" TO "team_id";--> statement-breakpoint
ALTER TABLE "inventory" RENAME COLUMN "team_id" TO "team_id";--> statement-breakpoint
ALTER TABLE "activities" DROP CONSTRAINT "activities_team_id_farms_id_fk";
--> statement-breakpoint
ALTER TABLE "crops" DROP CONSTRAINT "crops_team_id_farms_id_fk";
--> statement-breakpoint
ALTER TABLE "field_locations" DROP CONSTRAINT "field_locations_team_id_farms_id_fk";
--> statement-breakpoint
ALTER TABLE "finances" DROP CONSTRAINT "finances_team_id_farms_id_fk";
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_team_id_farms_id_fk";
--> statement-breakpoint
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_team_id_farms_id_fk";
--> statement-breakpoint
ALTER TABLE "livestock" DROP CONSTRAINT "livestock_team_id_farms_id_fk";
--> statement-breakpoint
ALTER TABLE "inventory" DROP CONSTRAINT "inventory_team_id_farms_id_fk";
--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crops" ADD CONSTRAINT "crops_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "field_locations" ADD CONSTRAINT "field_locations_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finances" ADD CONSTRAINT "finances_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "livestock" ADD CONSTRAINT "livestock_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "team_id";