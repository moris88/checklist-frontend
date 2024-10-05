import { Table } from '@/components'
import { Button, Spinner } from 'flowbite-react'
import { useFetch } from '@/hooks'
import { useNavigate } from 'react-router-dom'
import { Member, Module, Project, Task } from '@/types'
import { getSkipByModule } from '@/utils'

interface ListProps {
  module: Module
}

const List = ({ module }: ListProps) => {
  const navigate = useNavigate()
  const { skipProject, skipMember, skipTask } = getSkipByModule(module)
  const { response: responseMembers, loading: loadingMembers } = useFetch<{
    members: Member[]
  }>({
    endpoint: '/members',
    skip: skipMember,
  })
  const { response: responseProjects, loading: loadingProjects } = useFetch<{
    projects: Project[]
  }>({
    endpoint: '/projects',
    skip: skipProject,
  })
  const { response: responseTasks, loading: loadingTasks } = useFetch<{
    tasks: Task[]
  }>({
    endpoint: '/tasks',
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

  if (module === 'task' && tasks.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[90vh]">
        <p className="p-2 mb-5 rounded-lg bg-yellow-200 text-black">
          {'There are no task records!'}
        </p>
        <section className="flex justify-end items-center">
          <Button onClick={() => navigate(`/${module}/create`)}>
            New Task
          </Button>
        </section>
      </div>
    )
  }

  if (module === 'member' && members.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[90vh]">
        <p className="p-2 mb-5 rounded-lg bg-yellow-200 text-black">
          {'There are no member records!'}
        </p>
        <section className="flex justify-end items-center">
          <Button onClick={() => navigate(`/${module}/create`)}>
            New Member
          </Button>
        </section>
      </div>
    )
  }

  if (module === 'project' && projects.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[90vh]">
        <p className="p-2 mb-5 rounded-lg bg-yellow-200 text-black">
          {'There are no project records!'}
        </p>
        <section className="flex justify-end items-center">
          <Button onClick={() => navigate(`/${module}/create`)}>
            New Project
          </Button>
        </section>
      </div>
    )
  }

  return (
    <>
      <section className="mt-5">
        {module === 'member' && (
          <div className="px-4 " style={{ maxWidth: '100vw' }}>
            <div className="overflow-auto">
              <Table
                columns={[
                  { label: 'N.', api: 'id' },
                  { label: 'Full Name', api: 'full_name' },
                  { label: 'Email', api: 'email' },
                  { label: 'Role', api: 'role' },
                ]}
                rows={members}
                module={'member'}
              />
            </div>
          </div>
        )}
        {module === 'project' && (
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
                rows={projects ?? []}
                module={'project'}
              />
            </div>
          </div>
        )}
        {module === 'task' && (
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
                rows={tasks ?? []}
                module={'task'}
              />
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default List
