import { Project, Task, Member, User, Token } from '../types/global'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config() // load .env file

const { PATHDB } = process.env
const pathDb = PATHDB || ''
const { PATHTOKEN } = process.env
const pathToken = PATHTOKEN || ''
const { PATHUSER } = process.env
const pathUser = PATHUSER || ''

export const writeFile = (
  data: Project[] | Task[] | Member[],
  key: 'projects' | 'tasks' | 'members'
): boolean => {
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

export const readFile = (
  key: 'projects' | 'tasks' | 'members'
): Project[] | Task[] | Member[] => {
  try {
    const data = JSON.parse(fs.readFileSync(pathDb, 'utf8'))
    return data[key]
  } catch (error) {
    console.log('ERROR!', error)
    return []
  }
}

export const writeFileSystem = (
  data: Token[] | User[],
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

export const readFileSystem = (key: 'tokens' | 'users'): Token[] | User[] => {
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

export const trimToken = (token: string): string => {
  return token.replace('Bearer', '').trim()
}

export const checkObjects = (
  objects: { id: string; name: string }[]
): boolean => {
  for (const obj of objects) {
    // Verifica che le chiavi "id" e "name" siano presenti e non siano vuote
    if (
      !Object.prototype.hasOwnProperty.call(obj, 'id') ||
      !Object.prototype.hasOwnProperty.call(obj, 'name') ||
      !obj.id ||
      !obj.name
    ) {
      return false
    }
  }
  return true // Tutti gli oggetti hanno le chiavi "id" e "name" popolate
}
