import * as crypto from 'crypto'
import { Token, UserToken } from '../types/global'
import { readFileSystem, writeFileSystem } from './utils'

export function getUsersToken(): UserToken[] {
  return readFileSystem('users')
}

export function checkPassword(
  password: string,
  hash: string,
  salt: string
): boolean {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex')
  if (hashVerify === hash) {
    return true
  }
  return false
}

export function generatePassword(password: string): {
  salt: string
  hash: string
} {
  const salt = crypto.randomBytes(32).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex')
  return { salt, hash }
}

export function generateToken(): string {
  const length = 256
  const buffer = crypto.randomBytes(Math.ceil(length / 2))
  return buffer.toString('hex').slice(0, length)
}

export function registrationUser(user: UserToken): boolean {
  const users = readFileSystem('users')
  if (user) {
    if (users.find((u) => u.username === user.username)) {
      return false
    }
    users.push(user)
    return writeFileSystem(users, 'users')
  }
  return false
}

export function generateTokenUser(userId: string): { token: string | null } {
  const tokens = readFileSystem('tokens')
  const expiresAt = new Date()
  expiresAt.setHours(expiresAt.getHours() + 1)
  const token: Token = {
    token: generateToken(),
    userID: userId,
    expiresAt: expiresAt.toISOString(),
    createdAt: new Date().toISOString(),
  }
  tokens.push(token)
  if (writeFileSystem(tokens, 'tokens')) {
    return { token: token.token }
  }
  return { token: null }
}

export function checkToken(token: string): boolean {
  const today = new Date().getTime()
  const tokens = readFileSystem('tokens') as Token[]
  const myTokens = tokens.filter((t) => new Date(t.expiresAt).getTime() < today)
  writeFileSystem(myTokens, 'tokens')
  const myToken = token.replace('Bearer ', '')
  const tokenIndex = myTokens.findIndex((t) => t.token === myToken)
  return tokenIndex !== -1
}

export function getUserByToken(token: string): { id: string } | null {
  const tokens = readFileSystem('tokens')
  const tokenIndex = tokens.findIndex(
    (t) => t.token === token.replace('Bearer ', '')
  )
  if (tokenIndex !== -1) {
    const { userID } = tokens[tokenIndex]
    const users = readFileSystem('users')
    const userIndex = users.findIndex((u) => u.id === userID)
    if (userIndex !== -1) {
      const user = users[userIndex]
      return { id: user.id }
    }
  }
  return null
}

export function removeToken(username: string): boolean {
  const tokens = readFileSystem('tokens') as Token[]
  const users = readFileSystem('users') as UserToken[]
  const idUser = users.find((u) => u.username === username)?.id ?? null
  if (!idUser) return false
  const newTokens = tokens.filter((t) => t.userID !== idUser)
  return writeFileSystem(newTokens, 'tokens')
}
