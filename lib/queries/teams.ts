import { eq } from "drizzle-orm";
import { db } from "../db";
import { teams } from "../schema/teams";
import { stackServerApp } from "@/stack";



export async function getTeamById(id: string) {

  const team = await db.query.teams.findFirst({
    where: eq(teams.id, id),  
  });

  return team;
}




export async function getTeams() {
  
  const teams = await stackServerApp.listTeams();

  return teams;
}