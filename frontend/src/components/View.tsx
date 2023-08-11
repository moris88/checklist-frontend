/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom'
import { Member, Project, Task } from '../types/global'
import { useFetch } from '../hooks'
import { Spinner } from 'flowbite-react'
import { getSkip } from '../utils/utils'

interface ViewProps {
  module: string
}

const View = ({ module }: ViewProps) => {
  const { id } = useParams()
  const { skipProject, skipMember, skipTask } = getSkip(module, id)
  const { response: responseMembers, loading: loadingMembers } = useFetch<{
    members: Member[]
  }>({
    endpoint: `/member/${id}`,
    skip: skipMember,
  })
  const { response: responseProjects, loading: loadingProjects } = useFetch<{
    projects: Project[]
  }>({
    endpoint: `/project/${id}`,
    skip: skipProject,
  })
  const { response: responseTasks, loading: loadingTasks } = useFetch<{
    tasks: Task[]
  }>({
    endpoint: `/task/${id}`,
    skip: skipTask,
  })

  const members = responseMembers?.members ?? []
  const projects = responseProjects?.projects ?? []
  const tasks = responseTasks?.tasks ?? []

  if (loadingMembers || loadingProjects || loadingTasks) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }

  if (module === 'task' && tasks.length !== 0) {
    return <pre>{JSON.stringify(tasks[0])}</pre>
  }
  if (module === 'project' && projects.length !== 0) {
    return <pre>{JSON.stringify(projects[0], null, 5)}</pre>
  }
  if (module === 'member' && members.length !== 0) {
    return <pre>{JSON.stringify(members[0], null, 5)}</pre>
  }
  return <></>
}

export default View
