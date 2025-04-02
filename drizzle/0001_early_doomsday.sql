CREATE TABLE "farms" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"location" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "activities" RENAME COLUMN "user_id" TO "team_id";--> statement-breakpoint
ALTER TABLE "crops" RENAME COLUMN "user_id" TO "team_id";--> statement-breakpoint
ALTER TABLE "finances" RENAME COLUMN "user_id" TO "team_id";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "farm_name" TO "team_id";--> statement-breakpoint
ALTER TABLE "tasks" RENAME COLUMN "user_id" TO "team_id";--> statement-breakpoint
ALTER TABLE "livestock" RENAME COLUMN "user_id" TO "team_id";--> statement-breakpoint
ALTER TABLE "inventory" RENAME COLUMN "user_id" TO "team_id";--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_team_id_farms_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."farms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crops" ADD CONSTRAINT "crops_team_id_farms_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."farms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finances" ADD CONSTRAINT "finances_team_id_farms_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."farms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_team_id_farms_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."farms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_team_id_farms_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."farms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "livestock" ADD CONSTRAINT "livestock_team_id_farms_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."farms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_team_id_farms_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."farms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "password_hash";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "farm_location";