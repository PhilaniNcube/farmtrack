import { getTeam } from "@/lib/queries/teams";

export async function GET(request:Request) {

    const { searchParams } = new URL(request.url);
    const team_id = searchParams.get('team_id');

    if (!team_id) {
        return new Response(JSON.stringify({ error: 'Missing team_id' }), {
            status: 400,
        });
    }

    const team = await getTeam(team_id);

    if (!team) {
        return new Response(JSON.stringify({ error: 'Team not found' }), {
            status: 404,
        });
    }

    return new Response(JSON.stringify(team), {
        status: 200,
    });

} 