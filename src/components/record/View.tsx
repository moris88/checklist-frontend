import { Link, useNavigate, useParams } from 'react-router-dom'
import { Member, Module, Project, Task } from '@/types'
import { useFetch } from '@/hooks'
import { Button, Spinner } from 'flowbite-react'
import { getSkip } from '@/utils'
import moment from 'moment'
import React from 'react'
import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { Deadline, Priority, State, Status, Table } from '@/components'

interface ViewProps {
  module: Module
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
        url: `/project/${responseTasks?.tasks[0].project?.id}`,
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

  const handleDelete = () => {
    navigate(`/${module}/delete/${id}`)
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
            <Button color="gray" onClick={() => navigate(-1)}>
              <ArrowLeftIcon className="w-5 h-5" />
            </Button>
            <Button onClick={handleEdit}>
              <PencilIcon className="w-5 h-5" />
            </Button>
            <Button color="failure" onClick={handleDelete}>
              <TrashIcon className="w-5 h-5" />
            </Button>
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
          <table className="w-full rounded-lg bg-slate-600">
            <tr>
              <td align="right">
                <span className="font-bold mr-4">Title: </span>
              </td>
              <td>{tasks[0].title}</td>
            </tr>
            <tr>
              <td align="right">
                <span className="font-bold mr-4">Description: </span>
              </td>
              <td>{tasks[0].description}</td>
            </tr>
            <tr>
              <td align="right">
                <span className="font-bold mr-4">Type: </span>
              </td>
              <td>{tasks[0].type}</td>
            </tr>
            <tr>
              <td align="right">
                <span className="font-bold mr-4">DeadLine: </span>
              </td>
              <td>
                <Deadline size="small">
                  {moment(tasks[0].deadline).format('DD/MM/YYYY')}
                </Deadline>
              </td>
            </tr>
            <tr>
              <td align="right">
                <span className="font-bold mr-4">Priority: </span>
              </td>
              <td>
                <Priority size="small">{tasks[0].priority}</Priority>
              </td>
            </tr>
            <tr>
              <td align="right">
                <span className="font-bold mr-4">Status: </span>
              </td>
              <td>
                <Status size="small">{tasks[0].status}</Status>
              </td>
            </tr>
            <tr>
              <td align="right">
                <span className="font-bold mr-4">Project: </span>
              </td>
              <td>
                <span className="hover:font-bold hover:underline drop-shadow-lg">
                  <Link to={`/project/${projects?.[0]?.id ?? ''}`}>
                    {projects?.[0]?.name ?? ''}
                  </Link>
                </span>
              </td>
            </tr>
            <tr>
              <td align="right">
                <span className="font-bold mr-4">Created At: </span>
              </td>
              <td>
                {moment(tasks[0].createdAt).format('DD/MM/YYYY HH:mm:ss')}
              </td>
            </tr>
            <tr>
              <td align="right">
                <span className="font-bold mr-4">Updated At: </span>
              </td>
              <td>
                {moment(tasks[0].updatedAt).format('DD/MM/YYYY HH:mm:ss')}
              </td>
            </tr>
          </table>
          {/* <pre>{JSON.stringify(tasks[0], null, 5)}</pre> */}
          {/* <pre>{JSON.stringify(projects[0], null, 5)}</pre> */}
          <div className="w-full flex flex-col gap-5 p-10 rounded-lg bg-slate-600 mt-3">
            <div className="px-4 " style={{ maxWidth: '100vw' }}>
              <div className="overflow-auto">
                <Table
                  columns={[
                    { label: 'N.', api: 'id' },
                    { label: 'Full Name', api: 'full_name' },
                    { label: 'Email', api: 'email' },
                    { label: 'Role', api: 'role' },
                  ]}
                  rows={[]}
                  module={'member'}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {module === 'project' && projects.length !== 0 && (
        <div className="p-4 w-full">
          <table className="w-full rounded-lg bg-slate-600">
            <tr>
              <td align="right">
                <span className="font-bold mr-4">Name: </span>
              </td>
              <td>{projects[0].name}</td>
            </tr>
            <tr>
              <td align="right">
                <span className="font-bold mr-4">Description: </span>
              </td>
              <td>{projects[0].description}</td>
            </tr>
            <tr>
              <td align="right">
                <span className="font-bold mr-4">Service: </span>
              </td>
              <td>{projects[0].service}</td>
            </tr>
            <tr>
              <td align="right">
                <span className="font-bold mr-4">Sub Service: </span>
              </td>
              <td>{projects[0].subService}</td>
            </tr>
            <tr>
              <td align="right">
                <span className="font-bold mr-4">State: </span>
              </td>
              <td>
                <State size="small">{projects[0].state}</State>
              </td>
            </tr>
            <tr>
              <td align="right">
                <span className="font-bold mr-4">Created At: </span>
              </td>
              <td>
                {moment(projects[0].createdAt).format('DD/MM/YYYY HH:mm:ss')}
              </td>
            </tr>
            <tr>
              <td align="right">
                <span className="font-bold mr-4">Updated At: </span>
              </td>
              <td>
                {moment(projects[0].updatedAt).format('DD/MM/YYYY HH:mm:ss')}
              </td>
            </tr>
          </table>
          <div className="w-full flex flex-col gap-5 p-10 rounded-lg bg-slate-600 mt-3">
            <div className="px-4 " style={{ maxWidth: '100vw' }}>
              <div className="overflow-auto">
                <Table
                  columns={[
                    { label: 'N.', api: 'id' },
                    { label: 'Full Name', api: 'full_name' },
                    { label: 'Email', api: 'email' },
                    { label: 'Role', api: 'role' },
                  ]}
                  rows={[]}
                  module={'member'}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-5 p-10 rounded-lg bg-slate-600 mt-3">
            <div className="px-4 " style={{ maxWidth: '100vw' }}>
              <div className="overflow-auto">
                <Table
                  columns={[
                    { label: 'N.', api: 'id' },
                    { label: 'Title', api: 'title' },
                    { label: 'Description', api: 'description' },
                    { label: 'Assignee', api: 'assignee' },
                    { label: 'Project', api: 'project' },
                    { label: 'Type', api: 'type' },
                    { label: 'Priority', api: 'priority' },
                    { label: 'Status', api: 'status' },
                    { label: 'Deadline', api: 'deadline' },
                    { label: 'Created At', api: 'createdAt' },
                    { label: 'Updated At', api: 'updatedAt' },
                  ]}
                  rows={[]}
                  module={'task'}
                />
              </div>
            </div>
          </div>
          {/* <pre>{JSON.stringify(projects[0], null, 5)}</pre> */}
        </div>
      )}
      {module === 'member' && members.length !== 0 && (
        <div className="p-4 w-full">
          <table className="w-full rounded-lg bg-slate-600">
            <tr>
              <td align="right">
                <span className="font-bold mr-4">First Name: </span>
              </td>
              <td>{members[0].first_name}</td>
            </tr>
            <tr>
              <td align="right">
                <span className="font-bold mr-4">Last Name: </span>
              </td>
              <td>{members[0].last_name}</td>
            </tr>
            <tr>
              <td align="right">
                <span className="font-bold mr-4">Email: </span>
              </td>
              <td>{members[0].email}</td>
            </tr>
            <tr>
              <td align="right">
                <span className="font-bold mr-4">Role: </span>
              </td>
              <td>{members[0].role}</td>
            </tr>
          </table>
          <div className="w-full flex flex-col gap-5 p-10 rounded-lg bg-slate-600 mt-3">
            <div className="px-4 " style={{ maxWidth: '100vw' }}>
              <div className="overflow-auto">
                <Table
                  columns={[
                    { label: 'N.', api: 'id' },
                    { label: 'Name', api: 'name' },
                    { label: 'Description', api: 'description' },
                    { label: 'Members', api: 'members' },
                    { label: 'Service', api: 'service' },
                    { label: 'Sub Service', api: 'subService' },
                    { label: 'State', api: 'state' },
                    { label: 'Created At', api: 'createdAt' },
                    { label: 'Updated At', api: 'updatedAt' },
                  ]}
                  rows={[]}
                  module={'project'}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-5 p-10 rounded-lg bg-slate-600 mt-3">
            <div className="px-4 " style={{ maxWidth: '100vw' }}>
              <div className="overflow-auto">
                <Table
                  columns={[
                    { label: 'N.', api: 'id' },
                    { label: 'Title', api: 'title' },
                    { label: 'Description', api: 'description' },
                    { label: 'Assignee', api: 'assignee' },
                    { label: 'Project', api: 'project' },
                    { label: 'Type', api: 'type' },
                    { label: 'Priority', api: 'priority' },
                    { label: 'Status', api: 'status' },
                    { label: 'Deadline', api: 'deadline' },
                    { label: 'Created At', api: 'createdAt' },
                    { label: 'Updated At', api: 'updatedAt' },
                  ]}
                  rows={[]}
                  module={'task'}
                />
              </div>
            </div>
          </div>
          {/* <pre>{JSON.stringify(members[0], null, 5)}</pre> */}
        </div>
      )}
    </section>
  )
}

export default View
