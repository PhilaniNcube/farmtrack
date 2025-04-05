import { db } from "../db";

export async function getRecentTasks(team_id: string) {

    const tasks = await db.query.tasks.findMany({
        where: (tasks, { eq }) => eq(tasks.team_id, team_id),
        orderBy: (tasks, { desc }) => desc(tasks.due_date),
        limit: 4,
    })

    return tasks;

}

export async function getPendingTasks(team_id: string) {

    const tasks = await db.query.tasks.findMany({
        where: (tasks, { eq, and, gte, lte }) =>
            and(
                eq(tasks.team_id, team_id),
                eq(tasks.status, "pending"),
            ),
        orderBy: (tasks, { desc }) => desc(tasks.due_date),
    })

    return tasks;
}