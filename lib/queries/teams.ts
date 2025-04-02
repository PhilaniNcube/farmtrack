import { eq } from "drizzle-orm";
import { db } from "../db";
import { teams } from "../schema/teams";
import { stackServerApp } from "@/stack";



export async function getTeam(team_id: string) {

  const team = await stackServerApp.getTeam(team_id);

  return team;
}




export async function getTeams() {
  
  const teams = await stackServerApp.listTeams();

  return teams;
}