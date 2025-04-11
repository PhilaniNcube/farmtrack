import { pgTable, serial, varchar, timestamp, text, numeric, integer, index } from 'drizzle-orm/pg-core';
import { farms } from './farms';
import { teams } from './teams';

export const finances = pgTable('finances', {
  id: serial('id').primaryKey(),
  transaction_date: timestamp('transaction_date').notNull(),
  category: varchar('category').notNull(), // e.g., sales, supplies, equipment
  amount: numeric('amount').notNull(),
  transaction_type: varchar('transaction_type').notNull(), // income or expense
  description: text('description'),
  payment_method: varchar('payment_method'),
  associated_with: varchar('associated_with'), // e.g., crop name, livestock id
  receipt_url: varchar('receipt_url'),
  team_id: varchar('team_id').references(() => teams.id).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
},
(t) => [
  
  index('idx_transaction_date').on(t.transaction_date),
  index('idx_payment_method').on(t.payment_method),
] 
);

export type Finance = typeof finances.$inferSelect;
export type FinanceInsert = typeof finances.$inferInsert;
