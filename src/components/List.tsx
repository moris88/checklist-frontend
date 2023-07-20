import useStore from '../hooks/useStore'
import { users } from '../utils/users'
import { Module, Store } from '../types/global'
import MyTable from './MyTable'
import { Spinner } from './Spinner'
import { useState } from 'react'
import MyModal from './MyModal'
import { Button } from 'flowbite-react'

interface ListProps {
  module: Module
}

const List = <T extends Store>({ module }: ListProps) => {
  const { elements, loading, removeElement } = useStore<T>({
    key: module,
    defaultValues: module === 'user' ? (users as T[]) : [],
  })
  const [showModal, setShowModal] = useState(false)
  const [recordId, setRecordId] = useState<number | null>(null)

  if (elements.length === 0) {
    return (
      <div className="flex justify-center items-center h-5 mt-10">
        <section className="mt-2 flex justify-end items-center px-4">
          {module === 'user' && (
            <Button
              onClick={() => (window.location.href = `/${module}/create`)}
            >
              New User
            </Button>
          )}
          {module === 'project' && (
            <Button
              onClick={() => (window.location.href = `/${module}/create`)}
            >
              New Project
            </Button>
          )}
          {module === 'task' && (
            <Button
              onClick={() => (window.location.href = `/${module}/create`)}
            >
              New Task
            </Button>
          )}
        </section>
      </div>
    )
  }

  if (loading) {
    return <Spinner className="flex justify-center items-center h-full" />
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
            removeElement(recordId)
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
              rows={elements}
              module={'user'}
              onDelete={(id) => {
                setShowModal(true)
                setRecordId(id)
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
              rows={elements}
              module={'project'}
              onDelete={(id) => {
                setShowModal(true)
                setRecordId(id)
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
              rows={elements}
              module={'task'}
              onDelete={(id) => {
                setShowModal(true)
                setRecordId(id)
              }}
            />
          </div>
        )}
      </section>
    </>
  )
}

export default List
