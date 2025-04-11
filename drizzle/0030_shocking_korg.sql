CREATE INDEX "idx_completed_at" ON "tasks" USING btree ("completed_at");

ALTER TABLE "livestock" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;