CREATE INDEX "idx_transaction_date" ON "finances" USING btree ("transaction_date");--> statement-breakpoint
CREATE INDEX "idx_payment_method" ON "finances" USING btree ("payment_method");