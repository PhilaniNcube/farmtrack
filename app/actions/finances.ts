"use server"

import { revalidatePath } from "next/cache"
import { db, query } from "@/lib/db"

import { FinanceInsert, finances } from "@/lib/schema"
import { isFarmMember } from "@/lib/queries/farm-members";
import { eq } from "drizzle-orm";








export async function createFinance(prevState: unknown, formData: FormData) {
  const transaction_date = formData.get("transaction_date") as string;
  const description = (formData.get("description") ?? "") as string;
  const category = (formData.get("category") ?? "") as string;
  const type = (formData.get("type") ?? "income") as "income" | "expense";
  const amount = (formData.get("amount") ?? "0") as string;
  const payment_method = (formData.get("payment_method") ?? "") as string;
  const team_id = (formData.get("team_id") ?? "") as string;



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
      team_id: team_id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await db.insert(finances).values([financeData]); // Wrap in array



    return { finance: result.rows[0] };
  } catch (error) {
    console.error("Failed to create finance:", error);
    return { error: "Failed to create finance" };
  } finally {
    revalidatePath(`/dashboard/team/${team_id}/finances`);
    revalidatePath(`/dashboard/team/${team_id}`);
  }
}

export async function updateFinance(id: number, formData: FormData) {
  const transaction_date = formData.get("transaction_date") as string
  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const type = formData.get("transaction_type") as "income" | "expense"
  const amount = formData.get("amount") as string
  const payment_method = formData.get("payment_method") as string
  const reference_number = formData.get("reference_number") as string
  const notes = formData.get("notes") as string
  const team_id = formData.get("team_id") as string


  try {
    const financeData: FinanceInsert = {
      transaction_date: new Date(transaction_date),
      description,
      category,
      transaction_type: type,
      amount,
      payment_method,
      associated_with: "",
      receipt_url: "",
      // reference_number,
      // notes,
      updated_at: new Date(),
      id,
      team_id,
  
    }

    const result = await db.update(finances).set(financeData).where(
      eq(finances.id, id)
    ).returning()
    return { finance: result }
  } catch (error) {
    console.error(`Failed to update finance with id ${id}:`, error)
    return { error: "Failed to update finance" }
  }
}

export async function deleteFinance(id: number) {
  try {
    await query("DELETE FROM finances WHERE id = $1", [id])

    return { success: true }
  } catch (error) {
    console.error(`Failed to delete finance with id ${id}:`, error)
    return { error: "Failed to delete finance" }
  }
}


