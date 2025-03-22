import { and, desc, eq } from "drizzle-orm"
import { db } from "../db"
import { finances } from "../schema"

export async function getFinances(farmId: number) {
  const financeData = await db.query.finances.findMany({
    where: eq(finances.farm_id, farmId),
    orderBy: desc(finances.transaction_date),
    })

  return financeData
}

export async function getTotalIncome(id: number) {

   const totalIncome = await db.select().from(finances).where(
 and(
    eq(finances.farm_id, id),
    eq(finances.transaction_type, "income")
  )
  ).then((res) => res.reduce((acc, curr) => acc + Number(curr.amount), 0))

  return totalIncome
 
 
}

export async function getTotalExpenses(id: number) {
  const totalExpenses = await db.select().from(finances).where(
    and(
      eq(finances.farm_id, id),
      eq(finances.transaction_type, "expense")
    )
  ).then((res) => res.reduce((acc, curr) => acc + Number(curr.amount), 0))

  return totalExpenses
}

export async function getTotalFinances(id: number) {
    const totalExpenses = await db.select().from(finances).where(
        and(
          eq(finances.farm_id, id),
          eq(finances.transaction_type, "expense")
        )
      ).then((res) => res.reduce((acc, curr) => acc + Number(curr.amount), 0))

      const totalIncome = await db.select().from(finances).where(
        and(
           eq(finances.farm_id, id),
           eq(finances.transaction_type, "income")
         )
         ).then((res) => res.reduce((acc, curr) => acc + Number(curr.amount), 0))

         const profit_margin = (totalIncome - totalExpenses) / totalIncome * 100

        //  use the Intl.NumberFormat to format the profit margin
         const formattedProfitMargin = new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            }).format(profit_margin / 100);

  return {
    totalIncome,
    totalExpenses,
    net_profit: totalIncome - totalExpenses,
    profit_margin: formattedProfitMargin,  
  }
}