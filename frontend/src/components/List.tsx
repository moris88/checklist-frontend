import MyTable from './MyTable'
import { useState } from 'react'
import MyModal from './MyModal'
import { Button, Spinner } from 'flowbite-react'
import { useProjects, useTasks, useUsers } from '../hooks'
import { useNavigate } from 'react-router-dom'

interface ListProps {
  module: string
}

const List = ({ module }: ListProps) => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [recordId] = useState<string | null>(null)
  const { users, loading: lu } = useUsers({
    id: recordId,
    skip: module !== 'user',
  })
  const { projects, loading: lp } = useProjects({
    id: recordId,
    skip: module !== 'project',
  })
  const { tasks, loading: lt } = useTasks({
    id: recordId,
    skip: module !== 'task',
  })

  console.log(
    'module',
    module,
    module !== 'user',
    module !== 'project',
    module !== 'task'
  )
  console.log('users', lu, users)
  console.log('projects`', lp, projects)
  console.log('tasks', lt, tasks)

  if (lu || lp || lt) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }

  if (module === 'task' && tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-5 mt-10">
        <section className="mt-2 flex justify-end items-center px-4">
          <Button onClick={() => navigate(`/${module}/create`)}>
            New Task
          </Button>
        </section>
      </div>
    )
  }

  if (module === 'user' && users.length === 0) {
    return (
      <div className="flex justify-center items-center h-5 mt-10">
        <section className="mt-2 flex justify-end items-center px-4">
          <Button onClick={() => navigate(`/${module}/create`)}>
            New User
          </Button>
        </section>
      </div>
    )
  }

  if (module === 'project' && projects.length === 0) {
    return (
      <div className="flex justify-center items-center h-5 mt-10">
        <section className="mt-2 flex justify-end items-center px-4">
          <Button onClick={() => navigate(`/${module}/create`)}>
            New Project
          </Button>
        </section>
      </div>
    )
  }

  if (showModal) {
    return (
      <MyModal
        title={`Delete ${module}`}
        message={`Do you really want to delete this ${module}? ${
          recordId ? `ID: ${recordId}` : ''
        }`}
        show={showModal}
        onClose={() => setShowModal(false)}
        onAccept={() => {
          if (recordId) {
            console.log(`Deleting ${module} with id ${recordId}`)
            // removeElement(recordId)
            setShowModal(false)
          }
        }}
        onDecline={() => setShowModal(false)}
      />
    )
  }

  return (
    <>
      <section className="mt-2 flex justify-end items-center px-4">
        {module === 'user' && (
          <Button onClick={() => (window.location.href = `/${module}/create`)}>
            New User
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
      <section className="mt-2">
        {module === 'user' && (
          <div className="p-4">
            <MyTable
              columns={[
                { label: 'ID', api: 'id' },
                { label: 'Full Name', api: 'full_name' },
                { label: 'Email', api: 'email' },
                { label: 'Role', api: 'role' },
              ]}
              rows={users}
              module={'user'}
              onDelete={(id) => {
                setShowModal(true)
                console.log(id)
                // setRecordId(id)
              }}
            />
          </div>
        )}
        {module === 'project' && (
          <div className="p-4">
            <MyTable
              columns={[
                { label: 'ID', api: 'id' },
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
              onDelete={(id) => {
                setShowModal(true)
                console.log(id)
                // setRecordId(id)
              }}
            />
          </div>
        )}
        {module === 'task' && (
          <div className="p-4">
            <MyTable
              columns={[
                { label: 'ID', api: 'id' },
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
              onDelete={(id) => {
                setShowModal(true)
                console.log(id)
                // setRecordId(id)
              }}
            />
          </div>
        )}
      </section>
    </>
  )
}

export default List
