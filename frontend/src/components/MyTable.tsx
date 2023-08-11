import { Table } from 'flowbite-react'
import { Member, Module, Project, Task } from '../types/global'
import { useNavigate } from 'react-router-dom'
import { Deadline, Priority, State, Status } from './badge'
import moment from 'moment'

interface Columns {
  api: string
  label: string
}

interface MyTableProps {
  columns: Columns[]
  rows: Member[] | Project[] | Task[]
  module: Module
}

const MyTable = ({ columns, rows, module }: MyTableProps) => {
  const navigate = useNavigate()
  return (
    <Table hoverable className="w-full">
      <Table.Head>
        {columns.map((column) => (
          <Table.HeadCell key={`table-head-${column.api}`}>
            {column.label}
          </Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body className="divide-y">
        {rows.map((row, index) => (
          <Table.Row
            key={row.id}
            className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
            onClick={() => navigate(`/${module}/${row.id}`)}
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
                    <State>{row[column.api] as string}</State>
                  </Table.Cell>
                )
              }
              if (module === 'task' && column.api === 'status') {
                return (
                  <Table.Cell key={`table-body-${column.api}`}>
                    <Status>{row[column.api] as string}</Status>
                  </Table.Cell>
                )
              }
              if (module === 'task' && column.api === 'priority') {
                return (
                  <Table.Cell key={`table-body-${column.api}`}>
                    <Priority>{row[column.api] as string}</Priority>
                  </Table.Cell>
                )
              }
              if (
                (module === 'task' || module === 'project') &&
                (column.api === 'createdAt' || column.api === 'updatedAt')
              ) {
                return (
                  <Table.Cell key={`table-body-${column.api}`}>
                    {moment(row[column.api]).format('DD-MM-YYYY HH:MM')}
                  </Table.Cell>
                )
              }
              if (module === 'task' && column.api === 'deadline') {
                return (
                  <Table.Cell key={`table-body-${column.api}`}>
                    <Deadline>{row[column.api] as string}</Deadline>
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
                  {row[column.api] as string}
                </Table.Cell>
              )
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default MyTable
