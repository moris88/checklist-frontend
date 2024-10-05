import { AccessToken, Module } from '@/types'

export function checkLogin() {
  const accessTokenString: string | null = localStorage.getItem('access_token')
  if (accessTokenString) {
    const accessToken = JSON.parse(accessTokenString) as AccessToken
    const today = new Date().getTime()
    if (accessToken.expiresAt) {
      const expiresAt = new Date(accessToken.expiresAt).getTime()
      if (expiresAt > today) {
        return true
      }
    }
  }
  return false
}

export function getSkip(
  module: Module,
  id: string | undefined
): { skipMember: boolean; skipProject: boolean; skipTask: boolean } {
  let skipMember = true
  let skipProject = true
  let skipTask = true

  if (module === 'member' && id) {
    skipMember = false
  }
  if (module === 'project' && id) {
    skipProject = false
  }
  if (module === 'task' && id) {
    skipTask = false
  }
  return { skipMember, skipProject, skipTask }
}

export function getSkipByModule(module: Module): {
  skipMember: boolean
  skipProject: boolean
  skipTask: boolean
} {
  let skipMember = true
  let skipProject = true
  let skipTask = true

  if (module === 'member') {
    skipMember = false
  }
  if (module === 'project') {
    skipProject = false
  }
  if (module === 'task') {
    skipTask = false
  }
  return { skipMember, skipProject, skipTask }
}

export function capitalizeFirstLetter(input: string): string {
  if (!input) {
    return input // Restituisci la stringa originale se è null o undefined
  }
  if (input.length === 0) {
    return input // Restituisci la stringa originale se è vuota
  }
  return input?.charAt(0)?.toUpperCase() + input?.slice(1)
}
