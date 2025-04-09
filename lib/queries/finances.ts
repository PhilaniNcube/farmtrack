import { and, desc, eq, gte, lte } from "drizzle-orm"
import { db } from "../db"
import { finances } from "../schema"
import { unstable_cache } from 'next/cache';
import { cachedIsFarmMember, isFarmMember } from "./farm-members";

export async function getFinances(team_id: string) {

  const financeData = await db.query.finances.findMany({
    where: eq(finances.team_id, team_id),
    orderBy: desc(finances.transaction_date),
    })

  return financeData
}

export async function getFinanceById(finance_id: number) {
  const financeData = await db.query.finances.findFirst({
    where: eq(finances.id, finance_id),
  })
  return financeData
}


export async function getQuarterlyFinances(team_id:string) {
  // Get the current date
  const currentDate = new Date()

  // Calculate the start of the current quarter
  const startOfQuarter = new Date(currentDate.getFullYear(), Math.floor(currentDate.getMonth() / 3) * 3, 1)
  // Calculate the end of the current quarter
  const endOfQuarter = new Date(currentDate.getFullYear(), Math.floor(currentDate.getMonth() / 3) * 3 + 3, 0)

  console.log("Start of Quarter: ", startOfQuarter)
  console.log("End of Quarter: ", endOfQuarter)


  // Fetch the finances within the current quarter
  const quarterlyFinances = await db.query.finances.findMany({
    where : (finances, {eq, and, gte, lte}) => 
      and(
        eq(finances.team_id, team_id),
        gte(finances.transaction_date, startOfQuarter),
        lte(finances.transaction_date, endOfQuarter)
      ),
    orderBy: (finances, { desc }) => [desc(finances.transaction_date)],
  })

  return quarterlyFinances

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



// Function that queries the finances table and returns the total income, total expenses, net profit and profit margin for a specific date range
export async function getTotalFinancesLastXDays(id: string, start_date: Date, end_date: Date) {


  const totalIncome = await db.select().from(finances).where(
    and(
      eq(finances.team_id, id),
      eq(finances.transaction_type, "income"),
      gte(finances.transaction_date, start_date),
      lte(finances.transaction_date, end_date)
    )
  ).then((res) => res.reduce((acc, curr) => acc + Number(curr.amount), 0))

  const totalExpenses = await db.select().from(finances).where(
    and(
      eq(finances.team_id, id),
      eq(finances.transaction_type, "expense"),
      gte(finances.transaction_date, start_date),
      lte(finances.transaction_date, end_date)
    )
  ).then((res) => res.reduce((acc, curr) => acc + Number(curr.amount), 0))

  const profit_margin = (totalIncome - totalExpenses) / totalIncome * 100 

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

// write a function the returns income and expenses for a defined date range but in a time series format to be used in a chart
export async function getFinancesTimeSeries(id: string, start_date: Date, end_date: Date) {

  // write a postgresql query to get income grouped by day for the defined date range with a value for each day in the range and 0 if no income for that day
  const incomeQuery =  db.query.finances.findMany({
    where: and(
      eq(finances.team_id, id),
      eq(finances.transaction_type, "income"),
      gte(finances.transaction_date, start_date),
      lte(finances.transaction_date, end_date)
    ),
    orderBy: desc(finances.transaction_date),
  })
  // write a postgresql query to get expenses grouped by day for the defined date range with a value for each day in the range and 0 if no expenses for that day      
  const expensesQuery =  db.query.finances.findMany({
    where: and(
      eq(finances.team_id, id),
      eq(finances.transaction_type, "expense"),
      gte(finances.transaction_date, start_date),
      lte(finances.transaction_date, end_date)
    ),
    orderBy: desc(finances.transaction_date),
  })

  // run both queries in parallel and return the results
  const [income, expenses] = await Promise.all([incomeQuery, expensesQuery])

  // create a date range array from start_date to end_date
  const dateRange = []
  const currentDate = new Date(start_date)
  while (currentDate <= end_date) {
    dateRange.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }
  // create a map of income and expenses by date
  const incomeMap = new Map()
  const expensesMap = new Map()
  income.forEach((transaction) => {
    const date = new Date(transaction.transaction_date).toDateString()
    incomeMap.set(date, Number(transaction.amount))
  })
  expenses.forEach((transaction) => {
    const date = new Date(transaction.transaction_date).toDateString()
    expensesMap.set(date, Number(transaction.amount))
  } 
  )   

  // create a time series array with the date and amount for each day in the date range
 
  const timeSeries = dateRange.map((date) => {
    const dateString = date.toDateString()
    return {
      date: dateString,
      income: incomeMap.get(dateString) || 0,
      expenses: expensesMap.get(dateString) || 0,
    }
  })
  return timeSeries
    
}