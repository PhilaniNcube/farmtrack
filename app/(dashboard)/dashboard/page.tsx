
import UsersTeams from "../_components/users-teams"


export default async function Dashboard() {


  return (
    <div className="flex flex-col min-h-screen w-full ">
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        
        </div>
       <UsersTeams />
      </main>
    </div>
  )
}

