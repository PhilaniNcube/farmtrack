import { pgTable, serial, varchar, timestamp, text, numeric, integer } from 'drizzle-orm/pg-core';
import { farms } from './farms';

export const finances = pgTable('finances', {
  id: serial('id').primaryKey(),
  transaction_date: timestamp('transaction_date').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  amount: numeric('amount').notNull(),
  transaction_type: varchar('transaction_type', { length: 50 }).notNull(), // income or expense
  description: text('description'),
  payment_method: varchar('payment_method', { length: 100 }),
  associated_with: varchar('associated_with', { length: 255 }), // e.g., crop name, livestock id
  receipt_url: varchar('receipt_url', { length: 512 }),
  farm_id: integer('farm_id').references(() => farms.id).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

export type Finance = typeof finances.$inferSelect;
export type FinanceInsert = typeof finances.$inferInsert;