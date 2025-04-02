import { and, desc, eq } from "drizzle-orm"
import { db } from "../db"
import { finances } from "../schema"
import { unstable_cache } from 'next/cache';
import { cachedIsFarmMember, isFarmMember } from "./farm-members";

export async function getFinances(team_id: string) {

  
  const isMember = await isFarmMember(team_id)
  if (!isMember) {
    return []
  }


  const financeData = await db.query.finances.findMany({
    where: eq(finances.team_id, team_id),
    orderBy: desc(finances.transaction_date),
    })

  return financeData
}


export const getCachedFinances = unstable_cache(
  async (team_id: string) => await getFinances(team_id),
  ["finances"], 
  { 
    tags: ["finances"],
  }
)


export async function getTotalIncome(id: string) {



   const totalIncome = await db.select().from(finances).where(
 and(
    eq(finances.team_id, id),
    eq(finances.transaction_type, "income")
  )
  ).then((res) => res.reduce((acc, curr) => acc + Number(curr.amount), 0))

  return totalIncome
 
}


export const getCachedTotalIncome = unstable_cache(
  async (id: string) => await getTotalIncome(id),
  ["getTotalIncome"], 
  { 
    tags: ["getTotalIncome"],
  }
)




export async function getTotalExpenses(id: string) {

  const isMember = await isFarmMember(id)
  if (!isMember) {
    return 0
  }

  const totalExpenses = await db.select().from(finances).where(
    and(
      eq(finances.team_id, id),
      eq(finances.transaction_type, "expense")
    )
  ).then((res) => res.reduce((acc, curr) => acc + Number(curr.amount), 0))

  return totalExpenses
}


export const getCachedTotalExpenses = unstable_cache(
  async (id: string) => await getTotalExpenses(id),
  ["getTotalExpenses"], 
  { 
    tags: ["getTotalExpenses"],
  }
)



export async function getTotalFinances(id: string) {


  const isMember = await isFarmMember(id)
  if (!isMember) {
    return {
      totalIncome: 0,
      totalExpenses: 0,
      net_profit: 0,
      profit_margin: 0,
    }
  }

    const totalExpenses = await db.select().from(finances).where(
        and(
          eq(finances.team_id, id),
          eq(finances.transaction_type, "expense")
        )
      ).then((res) => res.reduce((acc, curr) => acc + Number(curr.amount), 0))

      const totalIncome = await db.select().from(finances).where(
        and(
           eq(finances.team_id, id),
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


export const getCachedTotalFinances = unstable_cache(
  async (id: string) => await getTotalFinances(id),
  ["getTotalFinances"], 
  { 
    tags: ["getTotalFinances"],
  }
)