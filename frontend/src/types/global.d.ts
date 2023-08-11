export type Module = 'member' | 'project' | 'task'
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
export type State = 'OPENED' | 'ACTIVE' | 'CLOSED'
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
export type Type =
  | 'system integration'
  | 'widget'
  | 'webservice'
  | 'serverless'
  | 'cf-deluge'
  | 'configuration'
  | 'bug-fix'
  | 'call external'
  | 'call internal'
  | 'others'
export type Service = 'Zoho' | 'Freshworks' | 'Hubspot' | 'Zendesk' | 'others'
export type SubService =
  | 'Zoho CRM'
  | 'Zoho Creator'
  | 'Zoho Desk'
  | 'Zoho Analitycs'
  | 'Freshdesk'
  | 'Freshservice'
  | 'FreshCaller'
  | 'Zendesk Support'
  | 'Zendesk Sell'
  | 'Zendesk Guide'
  | 'others'
export type Role =
  | 'TECHNICAL LEADER'
  | 'SENIOR PROJECT MANAGER'
  | 'JUNIOR PROJECT MANAGER'
  | 'JUNIOR SOLUTION'
  | 'SENIOR SOLUTION'
  | 'JUNIOR DEVELOPER'
  | 'SENIOR DEVELOPER'
  | 'JUNIOR STAGE DEVELOPER'
  | 'NONE'

export interface Task {
  [key: string]: string | null | Status | Priority | Member[] | Type
  id: string
  title: string
  description: string | null
  status: Status
  createdAt: string
  updatedAt: string
  priority: Priority | null
  deadline: string | null
  projectID: string | null
  assignee: Member[] | null
  type: Type | null
}

export interface Member {
  [key: string]: string | Role
  id: string
  first_name: string
  last_name: string
  full_name: string
  email: string
  role: Role
}

export interface Project {
  [key: string]: string | null | User[] | Service | SubService | State
  id: string
  name: string
  description: string | null
  createdAt: string
  updatedAt: string
  members: User[] | null
  service: Service | null
  subService: SubService | null
  state: State
}

export interface User {
  id: string
  username: string
  role: 'ADMIN' | 'USER'
  createdAt: string
  updatedAt: string
  password: string | null
}

export interface AccessToken {
  token: string | null
  owner: { id: string | null; name: string | null } | null
  expiresAt: number | null
  createdAt: number | null
}

export interface LoginAccess {
  username: string
  password: string
}

export interface RegisterAccess {
  username: string
  password: string
  confirmPassword: string
}
