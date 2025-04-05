import React from 'react'

const TasksPage = async ({params}:{params:Promise<{team_id:string}>}) => {

    const { team_id } = await params

  return (
    <div>TasksPage</div>
  )
}

export default TasksPage