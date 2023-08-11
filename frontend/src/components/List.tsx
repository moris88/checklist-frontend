import MyTable from './MyTable'
import { useState } from 'react'
import MyModal from './MyModal'
import { Button, Spinner } from 'flowbite-react'
import { useFetch } from '../hooks'
import { useNavigate } from 'react-router-dom'
import { Member, Project, Task } from '../types/global'
import { getSkipByModule } from '../utils/utils'

interface ListProps {
  module: string
}

const List = ({ module }: ListProps) => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [id, setID] = useState<string | null>(null)
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
          {'There are no records!'}
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
          {'There are no records!'}
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
          {'There are no records!'}
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
      {showModal && (
        <MyModal
          title={`Delete ${module}`}
          message={`Do you really want to delete this ${module}? ${
            id ? `ID: ${id}` : ''
          }`}
          show={showModal}
          onClose={() => setShowModal(false)}
          onAccept={() => {
            if (id) navigate(`/${module}/delete/${id}`)
          }}
          onDecline={() => setShowModal(false)}
        />
      )}
      <section className="flex justify-end items-center px-4 my-5">
        {module === 'member' && (
          <Button onClick={() => (window.location.href = `/${module}/create`)}>
            New Member
          </Button>
        )}
        {module === 'project' && (
          <Button onClick={() => (window.location.href = `/${module}/create`)}>
            New Project
          </Button>
        )}
        {module === 'task' && (
          <Button onClick={() => (window.location.href = `/${module}/create`)}>
            New Task
          </Button>
        )}
      </section>
      <section>
        {module === 'member' && (
          <div className="px-4">
            <MyTable
              columns={[
                { label: 'N.', api: 'id' },
                { label: 'Full Name', api: 'full_name' },
                { label: 'Email', api: 'email' },
                { label: 'Role', api: 'role' },
              ]}
              rows={members}
              module={'member'}
              onRow={(id) => {
                console.log(id)
                navigate(`/${module}/${id}`)
              }}
              onDelete={(id) => {
                console.log(id)
                setID(id)
                setShowModal(true)
              }}
            />
          </div>
        )}
        {module === 'project' && (
          <div className="px-4">
            <MyTable
              columns={[
                { label: 'N.', api: 'id' },
                { label: 'Name', api: 'name' },
                { label: 'Description', api: 'description' },
                { label: 'Created At', api: 'createdAt' },
                { label: 'Updated At', api: 'updatedAt' },
                { label: 'Members', api: 'members' },
                { label: 'Service', api: 'service' },
                { label: 'Sub Service', api: 'subService' },
                { label: 'State', api: 'state' },
              ]}
              rows={projects ?? []}
              module={'project'}
              onRow={(id) => {
                console.log(id)
                navigate(`/${module}/${id}`)
              }}
              onDelete={(id) => {
                console.log(id)
                setID(id)
                setShowModal(true)
              }}
            />
          </div>
        )}
        {module === 'task' && (
          <div className="px-4">
            <MyTable
              columns={[
                { label: 'N.', api: 'id' },
                { label: 'Title', api: 'title' },
                { label: 'Description', api: 'description' },
                { label: 'Created At', api: 'createdAt' },
                { label: 'Updated At', api: 'updatedAt' },
                { label: 'Assignee', api: 'assignee' },
                { label: 'Project', api: 'projectID' },
                { label: 'Type', api: 'type' },
                { label: 'Priority', api: 'priority' },
                { label: 'Status', api: 'status' },
              ]}
              rows={tasks ?? []}
              module={'task'}
              onRow={(id) => {
                console.log(id)
                navigate(`/${module}/${id}`)
              }}
              onDelete={(id) => {
                console.log(id)
                setID(id)
                setShowModal(true)
              }}
            />
          </div>
        )}
      </section>
    </>
  )
}

export default List
