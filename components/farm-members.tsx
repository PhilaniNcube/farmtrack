import { getFarmMembers } from "@/lib/queries/farms"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { formatDistanceToNow } from "date-fns"
import { UserPlusIcon } from "lucide-react"

interface FarmMembersProps {
  farmId: number
}

export async function FarmMembers({ farmId }: FarmMembersProps) {
  const members = await getFarmMembers(farmId)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Farm Members</CardTitle>
          {/* Add button could be linked to an invite flow in the future */}
          <UserPlusIcon className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
        </div>
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
                <TableHead className="w-[100px]">User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.profile_image_url || ""} alt={member.name} />
                        <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span>{member.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell className="capitalize">{member.role}</TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {member.created_at
                      ? formatDistanceToNow(new Date(member.created_at), { addSuffix: true })
                      : "Unknown"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}