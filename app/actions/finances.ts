"use server"

import { revalidatePath } from "next/cache"
import { db, query } from "@/lib/db"
import { desc, eq } from "drizzle-orm"
import { FinanceInsert, finances } from "@/lib/schema"
import { format } from "path"
import { formatDate } from "date-fns"

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

export async function createFinance(prevState: unknown, formData: FormData) {
  const transaction_date = formData.get("transaction_date") as string;
  const description = (formData.get("description") ?? "") as string;
  const category = (formData.get("category") ?? "") as string;
  const type = (formData.get("type") ?? "income") as "income" | "expense";
  const amount = (formData.get("amount") ?? "0") as string;
  const payment_method = (formData.get("payment_method") ?? "") as string;
  const farmId = (formData.get("farm_id") ?? "") as string;

  // convert transaction_date to into a timestap format
  const date = new Date(transaction_date);
 

  try {
    const financeData: FinanceInsert = {
      transaction_date: date, // Use the Date object directly
      description,
      category,
      transaction_type: type || "income",
      amount, // Pass the amount directly
      payment_method,
      associated_with: "",
      receipt_url: "",
      farm_id: Number(farmId),
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await db.insert(finances).values([financeData]); // Wrap in array

    revalidatePath(`/dashboard/farms/${farmId}/finances`);
    return { finance: result.rows[0] as Finance };
  } catch (error) {
    console.error("Failed to create finance:", error);
    return { error: "Failed to create finance" };
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


