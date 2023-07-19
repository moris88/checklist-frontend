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

export interface Task {
  [key: string]: any
  id: number
  title: string
  description: string | null
  status: Status
  createdAt: Date
  updatedAt: Date
  log: string | null
  priority: Priority | null
  deadline: Date | null
  projectID: number | null
  assignee: User[] | null
  type: Type | null
}

export interface User {
  [key: string]: any
  id: number
  first_name: string
  last_name: string
  full_name: string
  email: string
  role:
    | 'TECHNICAL LEADER'
    | 'SENIOR PROJECT MANAGER'
    | 'JUNIOR PROJECT MANAGER'
    | 'JUNIOR SOLUTION'
    | 'SENIOR SOLUTION'
    | 'JUNIOR DEVELOPER'
    | 'SENIOR DEVELOPER'
    | 'JUNIOR STAGE DEVELOPER'
    | 'NONE'
}

export interface Project {
  [key: string]: any
  id: number
  name: string
  description: string | null
  createdAt: Date
  updatedAt: Date
  members: User[] | null
  service: Service | null
  subService: SubService | null
  state: 'OPENED' | 'ACTIVE' | 'CLOSED'
}

export type Store = Project | Task | User | System

export type Module = 'project' | 'task' | 'user' | 'system'

export interface System {
  [key: string]: any
  id: number
  userID: number
  projectID: number
  taskID: number
}
