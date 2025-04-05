ALTER TABLE "tasks" ALTER COLUMN "priority" SET DEFAULT 'low';--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "priority" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "status" SET DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "status" DROP NOT NULL;