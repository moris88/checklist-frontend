import { Table as TableFlowbite } from 'flowbite-react'
import { Member, Module, Project, Task } from '../types/global'
import { useNavigate } from 'react-router-dom'
import { Deadline, Priority, State, Status } from './badge'
import moment from 'moment'

interface Columns {
  api: string
  label: string
}

interface MyTableFlowbiteProps {
  columns: Columns[]
  rows: Member[] | Project[] | Task[]
  module: Module
}

const Table = ({ columns, rows, module }: MyTableFlowbiteProps) => {
  const navigate = useNavigate()
  return (
    <TableFlowbite hoverable className="w-full">
      <TableFlowbite.Head>
        {columns.map((column) => (
          <TableFlowbite.HeadCell key={`TableFlowbite-head-${column.api}`}>
            {column.label}
          </TableFlowbite.HeadCell>
        ))}
      </TableFlowbite.Head>
      <TableFlowbite.Body className="divide-y">
        {rows.map((row, index) => (
          <TableFlowbite.Row
            key={row.id}
            className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
            onClick={() => navigate(`/${module}/${row.id}`)}
          >
            {columns.map((column) => {
              if (module === 'project' && column.api === 'id') {
                return (
                  <TableFlowbite.Cell key={`TableFlowbite-body-${column.api}`}>
                    #P{index + 1}
                  </TableFlowbite.Cell>
                )
              }
              if (module === 'task' && column.api === 'id') {
                return (
                  <TableFlowbite.Cell key={`TableFlowbite-body-${column.api}`}>
                    #T{index + 1}
                  </TableFlowbite.Cell>
                )
              }
              if (module === 'member' && column.api === 'id') {
                return (
                  <TableFlowbite.Cell key={`TableFlowbite-body-${column.api}`}>
                    #M{index + 1}
                  </TableFlowbite.Cell>
                )
              }
              if (module === 'project' && column.api === 'state') {
                return (
                  <TableFlowbite.Cell key={`TableFlowbite-body-${column.api}`}>
                    <State>{row[column.api] as string}</State>
                  </TableFlowbite.Cell>
                )
              }
              if (module === 'task' && column.api === 'status') {
                return (
                  <TableFlowbite.Cell key={`TableFlowbite-body-${column.api}`}>
                    <Status>{row[column.api] as string}</Status>
                  </TableFlowbite.Cell>
                )
              }
              if (module === 'task' && column.api === 'priority') {
                return (
                  <TableFlowbite.Cell key={`TableFlowbite-body-${column.api}`}>
                    <Priority>{row[column.api] as string}</Priority>
                  </TableFlowbite.Cell>
                )
              }
              if (
                (module === 'task' || module === 'project') &&
                (column.api === 'createdAt' || column.api === 'updatedAt')
              ) {
                return (
                  <TableFlowbite.Cell key={`TableFlowbite-body-${column.api}`}>
                    {moment(row[column.api] as string).format(
                      'DD-MM-YYYY HH:MM'
                    )}
                  </TableFlowbite.Cell>
                )
              }
              if (module === 'task' && column.api === 'deadline') {
                return (
                  <TableFlowbite.Cell key={`TableFlowbite-body-${column.api}`}>
                    <Deadline>{row[column.api] as string}</Deadline>
                  </TableFlowbite.Cell>
                )
              }
              if (module === 'project' && column.api === 'members') {
                const users = row[column.api] as { id: string; name: string }[]
                if (users === null)
                  return (
                    <TableFlowbite.Cell
                      key={`TableFlowbite-body-${column.api}`}
                    >
                      -
                    </TableFlowbite.Cell>
                  )
                return (
                  <TableFlowbite.Cell key={`TableFlowbite-body-${column.api}`}>
                    {users.map((user) => user.name).join(', ')}
                  </TableFlowbite.Cell>
                )
              }
              return (
                <TableFlowbite.Cell key={`TableFlowbite-body-${column.api}`}>
                  {row[column.api] as string}
                </TableFlowbite.Cell>
              )
            })}
          </TableFlowbite.Row>
        ))}
      </TableFlowbite.Body>
    </TableFlowbite>
  )
}

export default Table
