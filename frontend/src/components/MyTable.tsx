/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Table } from 'flowbite-react'
import { Member } from '../types/global'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'
import { twMerge } from 'tailwind-merge'

interface Columns {
  api: string
  label: string
}

interface MyTableProps {
  columns: Columns[]
  rows: any[]
  onDelete: (id: string) => void
  onRow: (id: string) => void
  module: string
}

const MyTable = ({ columns, rows, onDelete, onRow, module }: MyTableProps) => {
  return (
    <Table hoverable>
      <Table.Head>
        {columns.map((column) => (
          <Table.HeadCell key={`table-head-${column.api}`}>
            {column.label}
          </Table.HeadCell>
        ))}
        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Delete</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {rows.map((row, index) => (
          <Table.Row
            key={row.id}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
            onClick={() => onRow(row.id)}
          >
            {columns.map((column) => {
              if (module === 'project' && column.api === 'id') {
                return (
                  <Table.Cell key={`table-body-${column.api}`}>
                    #P{index + 1}
                  </Table.Cell>
                )
              }
              if (module === 'task' && column.api === 'id') {
                return (
                  <Table.Cell key={`table-body-${column.api}`}>
                    #T{index + 1}
                  </Table.Cell>
                )
              }
              if (module === 'member' && column.api === 'id') {
                return (
                  <Table.Cell key={`table-body-${column.api}`}>
                    #M{index + 1}
                  </Table.Cell>
                )
              }
              if (module === 'project' && column.api === 'state') {
                return (
                  <Table.Cell key={`table-body-${column.api}`}>
                    <span
                      className={twMerge(
                        'p-2 border rounded-lg font-bold',
                        row[column.api] === 'OPENED'
                          ? 'bg-blue-500  text-black'
                          : row[column.api] === 'ACTIVE'
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-black'
                      )}
                    >
                      {row[column.api]}
                    </span>
                  </Table.Cell>
                )
              }
              if (module === 'task' && column.api === 'status') {
                return (
                  <Table.Cell key={`table-body-${column.api}`}>
                    <span
                      className={twMerge(
                        'p-2 border rounded-lg font-bold',
                        row[column.api] === 'BACKLOG'
                          ? 'bg-gray-500  text-black'
                          : row[column.api] === 'OPEN'
                          ? 'bg-green-500 text-white'
                          : row[column.api] === 'IN PROGRESS'
                          ? 'bg-yellow-500 text-black'
                          : row[column.api] === 'DONE'
                          ? 'bg-blue-500 text-white'
                          : row[column.api] === 'DELETED'
                          ? 'bg-red-500 text-white'
                          : row[column.api] === 'ARCHIVED'
                          ? 'bg-indigo-500 text-white'
                          : row[column.api] === 'CLOSED'
                          ? 'bg-stone-500 text-white'
                          : row[column.api] === 'REOPENED'
                          ? 'bg-cyan-500 text-white'
                          : 'bg-teal-500 text-black'
                      )}
                    >
                      {row[column.api]}
                    </span>
                  </Table.Cell>
                )
              }
              if (module === 'task' && column.api === 'priority') {
                return (
                  <Table.Cell key={`table-body-${column.api}`}>
                    <span
                      className={twMerge(
                        'p-2 border rounded-lg font-bold',
                        row[column.api] === 'LOW'
                          ? 'bg-green-500  text-black'
                          : row[column.api] === 'MEDIUM'
                          ? 'bg-yellow-500 text-black'
                          : row[column.api] === 'HIGH'
                          ? 'bg-orange-500 text-black'
                          : 'bg-red-500 text-black'
                      )}
                    >
                      {row[column.api]}
                    </span>
                  </Table.Cell>
                )
              }
              if (module === 'project' && column.api === 'members') {
                const users = row[column.api] as Member[]
                if (users === null)
                  return (
                    <Table.Cell key={`table-body-${column.api}`}>-</Table.Cell>
                  )
                return (
                  <Table.Cell key={`table-body-${column.api}`}>
                    {users.map((user) => user.full_name).join(', ')}
                  </Table.Cell>
                )
              }
              return (
                <Table.Cell key={`table-body-${column.api}`}>
                  {row[column.api]}
                </Table.Cell>
              )
            })}
            <Table.Cell>
              <Button
                onClick={() =>
                  (window.location.href = `/${module}/edit/${row.id}`)
                }
              >
                <PencilSquareIcon className="w-5 h-5" />
              </Button>
            </Table.Cell>
            <Table.Cell>
              <Button
                color="failure"
                onClick={() => {
                  if (onDelete) onDelete(row.id)
                }}
              >
                <TrashIcon className="w-5 h-5" />
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default MyTable
