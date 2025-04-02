import { eq } from "drizzle-orm";
import { db } from "../db";
import { teams } from "../schema/teams";



export async function getTeamById(id: string) {

  const team = await db.query.teams.findFirst({
    where: eq(teams.id, id),  
  });

  return team;
}
