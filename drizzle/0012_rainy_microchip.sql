ALTER TABLE "farm_members" DROP CONSTRAINT "farm_members_team_id_farms_id_fk";
--> statement-breakpoint
ALTER TABLE "farm_members" ADD CONSTRAINT "farm_members_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;