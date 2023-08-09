import { LoginAccess, RegisterAccess } from '../types/global'
import { SERVER_URL, XAPIKEY } from './metadata'

export async function login(data: LoginAccess) {
  return await fetch(`${SERVER_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      xapikey: XAPIKEY,
    },
    body: JSON.stringify(data),
  }).then((d) => d.json())
}

export async function logout(username: string) {
  return await fetch(`${SERVER_URL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      xapikey: XAPIKEY,
    },
    body: JSON.stringify({ username }),
  }).then((d) => d.json())
}

export async function register(data: RegisterAccess) {
  return await fetch(`${SERVER_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      xapikey: XAPIKEY,
    },
    body: JSON.stringify({ username: data.username, password: data.password }),
  }).then((d) => d.json())
}
