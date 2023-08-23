/* eslint-disable @typescript-eslint/no-explicit-any */
export type Role = 'ADMIN' | 'USER' | 'GUEST' | 'INACTIVE'
export type State = 'OPENED' | 'IN PROGRESS' | 'CLOSED' | 'DELETED'
export type StatusToken = 'ACTIVE' | 'INACTIVE'
export type Status =
  | 'BACKLOG'
  | 'OPEN'
  | 'IN PROGRESS'
  | 'DONE'
  | 'DELETED'
  | 'ARCHIVED'
  | 'CLOSED'
  | 'REOPENED'
  | 'PENDING'
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

export interface Task {
  [key: string]: any
  id: string //mandatory
  owner: { id: string } //mandatory
  title: string //mandatory
  description: string | null
  status: Status //mandatory
  createdAt: string
  updatedAt: string
  priority: Priority //mandatory
  deadline: string | null
  project: { id: string; name: string }
  assignee: { id: string; name: string }[] | null
  type: string | null
}

export interface Member {
  [key: string]: any
  id: string //mandatory
  owner: { id: string } //mandatory
  first_name: string
  last_name: string
  full_name: string
  email: string //mandatory
  role: string
}

export interface Project {
  [key: string]: any
  id: string //mandatory
  owner: { id: string } //mandatory
  name: string //mandatory
  description: string | null
  createdAt: string
  updatedAt: string
  members: { id: string; name: string }[] //mandatory
  service: string | null
  subService: string | null
  state: State //mandatory
}

export interface User {
  [key: string]: any
  id: string
  username: string
  hash: string
  salt: string
  role: Role
  createdAt: string
  updatedAt: string
}

export interface Token {
  [key: string]: any
  token: string
  expiresAt: string
  statusToken: StatusToken
  userID: string
  createdAt: string
}

export interface ResponseServer {
  projects?: Project[]
  tasks?: Task[]
  members?: Member[]
  error?: string
  warning?: string
  message?: string
  statusText: 'SUCCESS' | 'ERROR' | 'WARNING'
  status: 200 | 202 | 201 | 204 | 400 | 401 | 403 | 404 | 409 | 500 | 501
  count?: number
  id?: string
  profiles?: User[]
  owner?: { id: string; name: string }
  token?: string
}

export type Module = 'projects' | 'tasks' | 'members'
export interface Search {
  module: Module
  field: string
  search: string
  where:
    | 'equal'
    | 'contain'
    | 'start'
    | 'end'
    | 'greater'
    | 'less'
    | 'greaterEqual'
    | 'lessEqual'
}
