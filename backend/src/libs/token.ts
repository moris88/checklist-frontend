import * as crypto from 'crypto'
import { UserToken } from '@/types/global';


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

export function registrationUser(user: UserToken) {
    // TODO: create user
}

export function checkToken(token: string): boolean {
    // TODO: check token
    return true
}