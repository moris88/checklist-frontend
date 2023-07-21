import { Project, Task, User } from '../types/global.d'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config() // load .env file

const { PATHDB } = process.env
const pathDb = PATHDB || ''

export const formatResponse = ({
  projects,
  tasks,
  users,
  error,
  message,
  statusText,
  status,
  count,
  id,
}: {
  projects?: Project[] | null
  tasks?: Task[] | null
  users?: User[] | null
  error?: string
  message?: string
  statusText: 'SUCCESS' | 'ERROR' | 'WARNING'
  status: 200 | 201 | 204 | 400 | 401 | 404 | 500
  count?: number
  id?: string
}): {
  projects: Project[] | undefined
  tasks: Task[] | undefined
  users: User[] | undefined
  error: string | null
  message?: string
  statusText: 'SUCCESS' | 'ERROR' | 'WARNING'
  status: 200 | 201 | 204 | 400 | 401 | 404 | 500
  count?: number
  id?: string
} => {
  return {
    projects: projects ?? undefined,
    tasks: tasks ?? undefined,
    users: users ?? undefined,
    message,
    count: count ?? undefined,
    statusText,
    status,
    error: error ?? null,
    id: id ?? undefined,
  }
}

export const writeFile = (data: any[], key: 'projects' | 'tasks' | 'users'): boolean => {
  try {
    const dataDB = JSON.parse(fs.readFileSync(pathDb, 'utf8'))
    dataDB[key] = data
    fs.writeFileSync(pathDb, JSON.stringify(dataDB), 'utf8')
    return true
  } catch (error) {
    console.log('ERROR!', error)
    return false
  }
}

export const readFile = (key: 'projects' | 'tasks' | 'users'): any[] => {
  try {
    console.log('readFile', fs.readFileSync(pathDb, 'utf8'))
    const data = JSON.parse(fs.readFileSync(pathDb, 'utf8'))
    console.log('data:', data)
    console.log('data[key]:', data[key])
    return data[key]
  } catch (error) {
    console.log('ERROR!', error)
    return []
  }
}

export const generateLongId = (): string => {
  const timestamp = Date.now().toString() // Ottieni il timestamp corrente come stringa
  const randomNum = Math.floor(Math.random() * 1000000).toString() // Genera un numero casuale a sei cifre come stringa
  const longId = timestamp + randomNum // Combina timestamp e numero casuale

  return longId
}