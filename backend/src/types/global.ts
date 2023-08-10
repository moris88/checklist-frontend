export type Role = 'ADMIN' | 'USER' | 'GUEST' | 'INACTIVE'
export type RoleMember =
  | 'TECHNICAL LEADER'
  | 'SENIOR PROJECT MANAGER'
  | 'JUNIOR PROJECT MANAGER'
  | 'JUNIOR SOLUTION'
  | 'SENIOR SOLUTION'
  | 'JUNIOR DEVELOPER'
  | 'SENIOR DEVELOPER'
  | 'JUNIOR STAGE DEVELOPER'
  | 'NONE'
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
  [key: string]:
    | string
    | Member[]
    | null
    | { id: string }
    | Priority
    | Type
    | Status
    | number
  id: string
  owner: { id: string }
  title: string
  description: string | null
  status: Status
  createdAt: string
  updatedAt: string
  priority: Priority | null
  deadline: string | null
  projectID: number | null
  assignee: Member[] | null
  type: Type | null
}

export interface Member {
  [key: string]: string | RoleMember | null | { id: string }
  id: string
  owner: { id: string }
  first_name: string
  last_name: string
  full_name: string
  email: string
  role: RoleMember
}

export interface Project {
  [key: string]:
    | string
    | Member[]
    | Service
    | SubService
    | State
    | null
    | { id: string }
  id: string
  owner: { id: string }
  name: string
  description: string | null
  createdAt: string
  updatedAt: string
  members: Member[] | null
  service: Service | null
  subService: SubService | null
  state: State
}

export interface User {
  [key: string]: string | Role
  id: string
  username: string
  hash: string
  salt: string
  role: Role
  createdAt: string
  updatedAt: string
}

export interface Token {
  [key: string]: string | StatusToken
  token: string
  expiresAt: string
  statusToken: StatusToken
  userID: string
  createdAt: string
}

export type Codice =
  | 'S01'
  | 'S02'
  | 'S03'
  | 'S04'
  | 'S05'
  | 'S06'
  | 'S07'
  | 'S08'
  | 'S09'
  | 'S10'
  | 'S11'
  | 'S12'
  | 'S13'
  | 'S14'
  | 'S15'
  | 'S16'
  | 'S17'
  | 'S18'
export type CodiceWarning =
  | 'W01'
  | 'W02'
  | 'W03'
  | 'W04'
  | 'W05'
  | 'W06'
  | 'W07'
export type CodiceErrore = 'E01' | 'E02' | 'E03' | 'E04' | 'E05'
export interface ResponseServer {
  projects?: Project[]
  tasks?: Task[]
  members?: Member[]
  error?: string
  message?: string
  statusText: 'SUCCESS' | 'ERROR' | 'WARNING'
  status: 200 | 202 | 201 | 204 | 400 | 401 | 403 | 404 | 409 | 500 | 501
  count?: number
  id?: string
  profiles?: User[]
  owner?: { id: string; name: string }
  token?: string
}
