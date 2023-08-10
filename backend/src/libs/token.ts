import * as crypto from 'crypto'
import { StatusToken, Token, User } from '../types/global'
import { readFileSystem, trimToken, writeFileSystem } from './utils'

export function getUsersToken(): User[] {
  return readFileSystem('users') as User[]
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

export function registrationUser(user: User): boolean {
  const users = readFileSystem('users') as User[]
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
  const tokens = readFileSystem('tokens') as Token[]
  const expiresAt = new Date()
  expiresAt.setHours(expiresAt.getHours() + 1)
  const token: Token = {
    token: generateToken(),
    userID: userId,
    statusToken: 'ACTIVE',
    expiresAt: expiresAt.toISOString(),
    createdAt: new Date().toISOString(),
  }
  tokens.push(token)
  if (writeFileSystem(tokens, 'tokens')) {
    return { token: token.token }
  }
  return { token: null }
}

export function checkToken(token: string, skip: boolean): boolean {
  if (token === '') return false
  const tokens = readFileSystem('tokens') as Token[]
  if (!skip) {
    const today = new Date().getTime()
    const myTokens = tokens.filter(
      (t) => new Date(t.expiresAt).getTime() > today
    )
    const expiredTokens = tokens
      .filter((t) => new Date(t.expiresAt).getTime() <= today)
      .map((t) => ({ ...t, statusToken: 'INACTIVE' })) as Token[]
    writeFileSystem([...myTokens, ...expiredTokens], 'tokens')
    const myToken = trimToken(token)
    const tokenIndex = myTokens.findIndex((t) => t.token === myToken)
    return tokenIndex !== -1
  }
  const myToken = trimToken(token)
  const tokenIndex = tokens.findIndex((t) => t.token === myToken)
  return tokenIndex !== -1
}

export function getUserByToken(token: string): { id: string } | null {
  const tokens = readFileSystem('tokens')
  const tokenIndex = tokens.findIndex(
    (t) => t.token === trimToken(token) && t.statusToken === 'ACTIVE'
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

export function regenerateToken(token: string): { token: string | null } {
  const tokens = readFileSystem('tokens') as Token[]
  const tokensSearch = tokens.filter(
    (t) => t.token === trimToken(token) && t.statusToken === 'INACTIVE'
  )
  if (tokensSearch.length > 0) {
    const [token] = tokensSearch
    const { userID } = token
    const newTokens = tokens.filter(
      (t) => t.statusToken === 'INACTIVE' && t.userID === userID
    )
    const { token: newToken } = generateTokenUser(userID)
    if (!newToken) return { token: null }
    newTokens.push({ ...token, statusToken: 'ACTIVE', token: newToken })
    writeFileSystem(newTokens, 'tokens')
    const users = readFileSystem('users') as User[]
    const user = users.find((u) => u.id === userID)
    removeToken(user?.username ?? '', 'INACTIVE')
    return { token: newToken }
  }
  return { token: null }
}

export function removeToken(username: string, status: StatusToken): boolean {
  const tokens = readFileSystem('tokens') as Token[]
  const users = readFileSystem('users') as User[]
  const idUser = users.find((u) => u.username === username)?.id ?? null
  if (!idUser) return false
  const newTokens1 = tokens.filter(
    (t) => t.userID === idUser && t.statusToken !== status
  )
  const newTokens2 = tokens.filter((t) => t.userID !== idUser)
  return writeFileSystem([...newTokens1, ...newTokens2], 'tokens')
}
