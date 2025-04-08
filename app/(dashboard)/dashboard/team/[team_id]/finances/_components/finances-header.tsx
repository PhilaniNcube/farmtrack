import { Button } from "@/components/ui/button"
import { MinusCircle, PlusCircle } from "lucide-react"
import Link from "next/link"

export function FinancesHeader({ team_id }: { team_id: string }) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Farm Finances</h1>
                <p className="text-muted-foreground">Track and manage your farm's financial transactions</p>
            </div>
            <div className="flex items-centre gap-3">
                <Link href={`/dashboard/team/${team_id}/finances/add?type=income`} className="w-full">
                    <Button  className="bg-green-600 text-white">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Income
                    </Button>
                </Link>

                <Link href={`/dashboard/team/${team_id}/finances/add?type=expense`} className="w-full">
                    <Button  className="bg-zinc-400">
                        <MinusCircle className="mr-2 h-4 w-4" />
                        Add Expense
                    </Button>
                </Link>
            </div>
        </div>
    )
}
