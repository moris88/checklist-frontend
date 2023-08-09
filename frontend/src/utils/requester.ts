import { LoginAccess, RegisterAccess } from '../types/global'
import { SERVER_URL } from './metadata'

export async function login(data: LoginAccess) {
  return await fetch(`${SERVER_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((d) => d.json())
}

export async function logout(username: string) {
  return await fetch(`${SERVER_URL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  }).then((d) => d.json())
}

export async function register(data: RegisterAccess) {
  return await fetch(`${SERVER_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: data.username, password: data.password }),
  }).then((d) => d.json())
}

export async function getProjects(token: string) {
  console.log('getProjects', token)
  return await fetch(`${SERVER_URL}/projects`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((d) => d.json())
    .then((d) => {
      console.log('getProjects', d)
      return d.projects
    })
    .catch((e) => {
      console.log('getProjects', e)
    })
}

export async function getProjectByID(token: string, id: string) {
  return await fetch(`${SERVER_URL}/projects/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((d) => d.json())
    .then((d) => d.projects)
}

export async function getUsers(token: string) {
  return await fetch(`${SERVER_URL}/users`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((d) => d.json())
    .then((d) => d.users)
}

export async function getUserByID(token: string, id: string) {
  return await fetch(`${SERVER_URL}/users/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((d) => d.json())
    .then((d) => d.users)
}

export async function getTasks(token: string) {
  return await fetch(`${SERVER_URL}/tasks`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((d) => d.json())
    .then((d) => d.tasks)
}

export async function getTaskByID(token: string, id: string) {
  return await fetch(`${SERVER_URL}/tasks/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((d) => d.json())
    .then((d) => d.tasks)
}
