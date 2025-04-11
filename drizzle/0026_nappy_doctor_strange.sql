CREATE TYPE "public"."health_status" AS ENUM('healthy', 'new born', 'sick', 'needs_attention', 'quarantine', 'recovering', 'unknown', 'other');--> statement-breakpoint
ALTER TABLE "livestock" ALTER COLUMN "health_status" SET DATA TYPE health_status;--> statement-breakpoint
ALTER TABLE "livestock" ALTER COLUMN "health_status" SET DEFAULT 'healthy';--> statement-breakpoint
ALTER TABLE "livestock" ALTER COLUMN "health_status" DROP NOT NULL;