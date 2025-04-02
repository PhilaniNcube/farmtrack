CREATE TABLE "field_locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "field_locations" ADD CONSTRAINT "field_locations_team_id_farms_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."farms"("id") ON DELETE no action ON UPDATE no action;