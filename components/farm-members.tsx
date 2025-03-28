
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FarmMember } from "@/lib/queries/farm-members"
import { UserPlusIcon } from "lucide-react"
import InviteFarmMember from "./invite-farm-member"

interface FarmMembersProps {
  members: FarmMember[]
}

export async function FarmMembers({ members }: FarmMembersProps) {


  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Farm Members</CardTitle>
          {/* Add button could be linked to an invite flow in the future */}
          <InviteFarmMember farmId={1} />        </div>
        <CardDescription>
          People who have access to this farm
        </CardDescription>
      </CardHeader>
      <CardContent>
        {members.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No members have joined this farm yet.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.farm_members.id}>
                  <TableCell className="font-medium w-fit">
                    <div className="">

                      <span>{member.users?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{member.users?.email}</TableCell>
                  <TableCell className="capitalize">{member.farm_members?.role}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}