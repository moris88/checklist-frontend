/* eslint-disable @typescript-eslint/no-explicit-any */
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
  | 'JUNIOR STAGE'
  | 'SENIOR STAGE'
  | 'OTHER'
  | 'NONE'

export interface Task {
  [key: string]: any
  id: string
  title: string
  description: string | null
  status: Status | null
  createdAt: string
  updatedAt: string
  priority: Priority | null
  deadline: string | null
  project: { id: string; name: string } | null
  assignee: { id: string; name: string }[] | null
  type: Type | null
}

export interface Member {
  [key: string]: any
  id: string
  first_name: string | null
  last_name: string
  full_name: string
  email: string
  role: Role | null
}

export interface Project {
  [key: string]: any
  id: string
  name: string
  description: string | null
  createdAt: string
  updatedAt: string
  members: { id: string; name: string }[] | null
  service: Service | null
  subService: SubService | null
  state: State | null
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
