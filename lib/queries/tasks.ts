import { db } from "../db";

export async function getRecentTasks(team_id: string) {

    const tasks = await db.query.tasks.findMany({
        where: (tasks, { eq }) => eq(tasks.team_id, team_id),
        orderBy: (tasks, { desc }) => desc(tasks.due_date),        
        limit: 4,
    })
    
    return tasks;

}