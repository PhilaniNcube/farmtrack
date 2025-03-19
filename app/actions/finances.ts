"use server"

import { revalidatePath } from "next/cache"
import { query } from "@/lib/db"

export type Finance = {
  id: number
  transaction_date: string
  description: string
  category: string
  type: "income" | "expense"
  amount: number
  payment_method: string
  reference_number: string
  notes: string
  created_at: string
  updated_at: string
}

export async function getFinances() {
  try {
    const result = await query("SELECT * FROM finances ORDER BY transaction_date DESC")
    return { finances: result.rows as Finance[] }
  } catch (error) {
    console.error("Failed to fetch finances:", error)
    return { error: "Failed to fetch finances" }
  }
}

export async function getFinanceById(id: number) {
  try {
    const result = await query("SELECT * FROM finances WHERE id = $1", [id])
    return { finance: result.rows[0] as Finance }
  } catch (error) {
    console.error(`Failed to fetch finance with id ${id}:`, error)
    return { error: "Failed to fetch finance" }
  }
}

export async function createFinance(formData: FormData) {
  const transaction_date = formData.get("transaction_date") as string
  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const type = formData.get("type") as "income" | "expense"
  const amount = Number.parseFloat(formData.get("amount") as string)
  const payment_method = formData.get("payment_method") as string
  const reference_number = formData.get("reference_number") as string
  const notes = formData.get("notes") as string

  try {
    const result = await query(
      `INSERT INTO finances (transaction_date, description, category, type, amount, payment_method, reference_number, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [transaction_date, description, category, type, amount, payment_method, reference_number, notes],
    )

    revalidatePath("/finances")
    return { finance: result.rows[0] as Finance }
  } catch (error) {
    console.error("Failed to create finance:", error)
    return { error: "Failed to create finance" }
  }
}

export async function updateFinance(id: number, formData: FormData) {
  const transaction_date = formData.get("transaction_date") as string
  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const type = formData.get("type") as "income" | "expense"
  const amount = Number.parseFloat(formData.get("amount") as string)
  const payment_method = formData.get("payment_method") as string
  const reference_number = formData.get("reference_number") as string
  const notes = formData.get("notes") as string

  try {
    const result = await query(
      `UPDATE finances 
       SET transaction_date = $1, description = $2, category = $3, type = $4, 
           amount = $5, payment_method = $6, reference_number = $7, notes = $8, updated_at = CURRENT_TIMESTAMP
       WHERE id = $9
       RETURNING *`,
      [transaction_date, description, category, type, amount, payment_method, reference_number, notes, id],
    )

    revalidatePath("/finances")
    return { finance: result.rows[0] as Finance }
  } catch (error) {
    console.error(`Failed to update finance with id ${id}:`, error)
    return { error: "Failed to update finance" }
  }
}

export async function deleteFinance(id: number) {
  try {
    await query("DELETE FROM finances WHERE id = $1", [id])
    revalidatePath("/finances")
    return { success: true }
  } catch (error) {
    console.error(`Failed to delete finance with id ${id}:`, error)
    return { error: "Failed to delete finance" }
  }
}

export async function getFinancialSummary() {
  try {
    const totalIncome = await query("SELECT COALESCE(SUM(amount), 0) as total FROM finances WHERE type = 'income'")

    const totalExpenses = await query("SELECT COALESCE(SUM(amount), 0) as total FROM finances WHERE type = 'expense'")

    const monthlyData = await query(`
      SELECT 
        TO_CHAR(transaction_date, 'Mon') as month,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expenses,
        SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) as profit
      FROM finances
      WHERE transaction_date >= CURRENT_DATE - INTERVAL '6 months'
      GROUP BY TO_CHAR(transaction_date, 'Mon'), EXTRACT(MONTH FROM transaction_date)
      ORDER BY EXTRACT(MONTH FROM transaction_date)
    `)

    return {
      totalIncome: Number.parseFloat(totalIncome.rows[0].total),
      totalExpenses: Number.parseFloat(totalExpenses.rows[0].total),
      netProfit: Number.parseFloat(totalIncome.rows[0].total) - Number.parseFloat(totalExpenses.rows[0].total),
      profitMargin:
        totalIncome.rows[0].total > 0
          ? ((Number.parseFloat(totalIncome.rows[0].total) - Number.parseFloat(totalExpenses.rows[0].total)) /
              Number.parseFloat(totalIncome.rows[0].total)) *
            100
          : 0,
      monthlyData: monthlyData.rows,
    }
  } catch (error) {
    console.error("Failed to fetch financial summary:", error)
    return { error: "Failed to fetch financial summary" }
  }
}

