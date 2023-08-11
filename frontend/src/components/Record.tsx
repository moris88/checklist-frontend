/* eslint-disable @typescript-eslint/no-explicit-any */
import { Project, Task, Member } from '../types/global'
import FormTask from './forms/FormTask'
import FormProject from './forms/FormProject'
import FormMember from './forms/FormMember'
import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks'
import { getSkip } from '../utils/utils'
import { Spinner } from 'flowbite-react'

interface RecordProps {
  module: string
}

const Record = ({ module }: RecordProps) => {
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

  if (id) {
    if (module === 'project') {
      return <FormProject defaultValues={projects[0] as unknown as Project} />
    }
    if (module === 'member') {
      return <FormMember defaultValues={members[0] as unknown as Member} />
    }
    if (module === 'task') {
      return <FormTask defaultValues={tasks[0] as unknown as Task} />
    }
  } else {
    if (module === 'project') {
      return <FormProject />
    }
    if (module === 'member') {
      return <FormMember />
    }
    if (module === 'task') {
      return <FormTask />
    }
    return <></>
  }
}

export default Record
