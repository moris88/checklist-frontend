import { Link, useNavigate, useParams } from 'react-router-dom'
import { Member, Project, Task } from '../types/global'
import { useFetch } from '../hooks'
import { Button, Spinner } from 'flowbite-react'
import { getSkip } from '../utils/utils'
import moment from 'moment'
import React from 'react'

interface ViewProps {
  module: string
}

const View = ({ module }: ViewProps) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { skipProject, skipMember, skipTask } = getSkip(module, id)
  const { response: responseMembers, loading: loadingMembers } = useFetch<{
    members: Member[]
  }>({
    endpoint: `/member/${id}`,
    skip: skipMember,
  })
  const {
    response: responseProjects,
    loading: loadingProjects,
    setRequest: setFetchProject,
  } = useFetch<{
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

  React.useEffect(() => {
    if (responseTasks?.tasks?.length && responseTasks.tasks.length > 0) {
      setFetchProject({
        method: 'GET',
        url: `/project/${responseTasks?.tasks[0].projectID}`,
        body: null,
      })
    }
  }, [responseTasks, setFetchProject])

  const members = responseMembers?.members ?? []
  const projects = responseProjects?.projects ?? []
  const tasks = responseTasks?.tasks ?? []

  const handleEdit = () => {
    navigate(`/${module}/edit/${id}`)
  }

  if (loadingMembers || loadingProjects || loadingTasks) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }

  return (
    <section className="flex flex-col justify-center items-center gap-2 mt-5">
      <div className="flex justify-center items-center w-full px-4 relative">
        <div className="absolute right-0">
          <div className="flex gap-3 mr-4">
            <Button color="gray" onClick={handleEdit}>
              Edit
            </Button>
            <Button onClick={() => navigate(-1)}>Done</Button>
          </div>
        </div>
        {module === 'task' && (
          <span className="font-bold rounded-lg border p-2 w-1/2 flex justify-center items-center">
            {tasks[0].title.toUpperCase()}
          </span>
        )}
        {module === 'project' && (
          <span className="font-bold rounded-lg border p-2 w-1/2 flex justify-center items-center">
            {projects[0].name.toUpperCase()}
          </span>
        )}
        {module === 'member' && (
          <span className="font-bold rounded-lg border p-2 w-1/2 flex justify-center items-center">
            {members[0].full_name.toUpperCase()}
          </span>
        )}
      </div>
      {module === 'task' && tasks.length > 0 && (
        <div className="p-4 w-full">
          <ul className="w-full flex flex-col gap-5 p-10 rounded-lg bg-slate-600">
            <li>
              <span className="font-bold">Title: </span>
              {tasks[0].title}
            </li>
            <li>
              <span className="font-bold">Description: </span>
              {tasks[0].description}
            </li>
            <li>
              <span className="font-bold">Assigne: </span>
              {tasks[0].assignee?.join(', ')}
            </li>
            <li>
              <span className="font-bold">DeadLine: </span>
              {moment(tasks[0].deadline).format('DD/MM/YYYY')}
            </li>
            <li>
              <span className="font-bold">Priority: </span>
              {tasks[0].priority}
            </li>
            <li>
              <span className="font-bold">Type: </span>
              {tasks[0].type}
            </li>
            <li>
              <span className="font-bold">Status: </span>
              {tasks[0].status}
            </li>
            <li>
              <span className="font-bold">Created At: </span>
              {moment(tasks[0].createdAt).format('DD/MM/YYYY HH:mm:ss')}
            </li>
            <li>
              <span className="font-bold">Updated At: </span>
              {moment(tasks[0].updatedAt).format('DD/MM/YYYY HH:mm:ss')}
            </li>
            <li>
              <span className="font-bold">Project: </span>
              <span className="hover:border hover:rounded-lg hover:p-2 px-2 hover:bg-gray-400">
                <Link to={`/project/${projects?.[0]?.id ?? ''}`}>
                  {projects?.[0]?.name ?? ''}
                </Link>
              </span>
            </li>
          </ul>
          {/* <pre>{JSON.stringify(tasks[0], null, 5)}</pre> */}
          {/* <pre>{JSON.stringify(projects[0], null, 5)}</pre> */}
        </div>
      )}
      {module === 'project' && projects.length !== 0 && (
        <pre>{JSON.stringify(projects[0], null, 5)}</pre>
      )}
      {module === 'member' && members.length !== 0 && (
        <pre>{JSON.stringify(members[0], null, 5)}</pre>
      )}
    </section>
  )
}

export default View
