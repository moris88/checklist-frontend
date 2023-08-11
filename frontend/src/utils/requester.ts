import { LoginAccess, Project, RegisterAccess } from '../types/global'
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

export async function getProfileByID(token: string, id: string) {
  console.log('getProfile', token)
  return await fetch(`${SERVER_URL}/profiles/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((d) => d.json())
    .then((d) => {
      console.log('getProfile', d)
      return d.profiles
    })
    .catch((e) => {
      console.log('getProfile', e)
    })
}

export async function getProfiles(token: string) {
  console.log('getProfile', token)
  return await fetch(`${SERVER_URL}/profiles`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((d) => d.json())
    .then((d) => {
      console.log('getProfile', d)
      return d.profiles
    })
    .catch((e) => {
      console.log('getProfile', e)
    })
}

export async function createProject(
  token: string,
  data: Omit<Project, 'createdAt' | 'updatedAt' | 'id'>
) {
  return await fetch(`${SERVER_URL}/project`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((d) => d.json())
    .catch((e) => {
      console.log('getProjects', e)
    })
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

export async function getMembers(token: string) {
  return await fetch(`${SERVER_URL}/members`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((d) => d.json())
    .then((d) => d.members)
}

export async function getMemberByID(token: string, id: string) {
  return await fetch(`${SERVER_URL}/members/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((d) => d.json())
    .then((d) => d.members)
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
