import { Project, Task, User } from '../types/global.d'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config() // load .env file

const { PATHDB } = process.env
const pathDb = PATHDB || ''
const { PATHTOKEN } = process.env
const pathToken = PATHTOKEN || ''
const { PATHUSER } = process.env
const pathUser = PATHUSER || ''

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
  token,
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
  token?: string
}): {
  projects: Project[] | undefined
  tasks: Task[] | undefined
  users: User[] | undefined
  error: string | undefined
  message?: string
  statusText: 'SUCCESS' | 'ERROR' | 'WARNING'
  status: 200 | 201 | 204 | 400 | 401 | 404 | 500
  count?: number
  id?: string
  token?: string
} => {
  return {
    projects: projects ?? undefined,
    tasks: tasks ?? undefined,
    users: users ?? undefined,
    message,
    count: count ?? undefined,
    statusText,
    status,
    error: error ?? undefined,
    id: id ?? undefined,
    token: token ?? undefined,
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
    const data = JSON.parse(fs.readFileSync(pathDb, 'utf8'))
    return data[key]
  } catch (error) {
    console.log('ERROR!', error)
    return []
  }
}

export const writeFileSystem = (
  data: any[],
  key: 'tokens' | 'users'
): boolean => {
  try {
    const system = JSON.parse(
      fs.readFileSync(key === 'tokens' ? pathToken : pathUser, 'utf8')
    )
    system[key] = data
    fs.writeFileSync(
      key === 'tokens' ? pathToken : pathUser,
      JSON.stringify(system),
      'utf8'
    )
    return true
  } catch (error) {
    console.log('ERROR!', error)
    return false
  }
}

export const readFileSystem = (key: 'tokens' | 'users'): any[] => {
  try {
    const system = JSON.parse(
      fs.readFileSync(key === 'tokens' ? pathToken : pathUser, 'utf8')
    )
    return system[key]
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
