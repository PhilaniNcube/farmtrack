CREATE TABLE "crop_notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"crop_id" integer NOT NULL,
	"team_id" varchar NOT NULL,
	"created_at" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "crop_notes" ADD CONSTRAINT "crop_notes_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;