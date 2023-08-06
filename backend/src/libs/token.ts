import * as crypto from 'crypto'
import { Token, UserToken } from '@/types/global';
import { readFileSystem, writeFileSystem } from './utils';

export function getUsersToken(): UserToken[] {
    return readFileSystem('users')
}

export function checkPassword(
  password: string,
  hash: string,
  salt: string
): { token: string | null } {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex')
  if (hashVerify !== hash) {
    return { token: generateToken() }   
 }
  return { token: null }
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
  const length = 32
  const buffer = crypto.randomBytes(Math.ceil(length / 2))
  return buffer.toString('hex').slice(0, length)
}

export function registrationUser(user: UserToken): boolean {
    const users = readFileSystem('users')
    if (user) {
        users.push(user)
        return writeFileSystem(users, 'users')
    }
    return false
}

export function generateTokenUser(userId: number): boolean {
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
    return writeFileSystem(tokens, 'tokens')
}

export function checkToken(token: string): boolean {
    const tokens = readFileSystem('tokens')
    const tokenIndex = tokens.findIndex((t) => t.token === token)
    return tokenIndex !== -1
}