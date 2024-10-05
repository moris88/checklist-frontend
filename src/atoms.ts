import { atom } from 'jotai'
import { AccessToken } from '@/types'

function getAccessStateDefault() {
  const defaultAccessStateString: string | null =
    localStorage.getItem('AccessToken')
  if (defaultAccessStateString) {
    const defaultAccessState: AccessToken | null = JSON.parse(
      defaultAccessStateString
    )
    if (defaultAccessState) {
      const today = new Date().getTime()
      if (defaultAccessState.expiresAt) {
        const expiresAt = new Date(defaultAccessState.expiresAt).getTime()
        if (expiresAt > today) {
          return defaultAccessState
        }
      }
    }
  }
  return defaultState()
}

export function defaultState() {
  return {
    token: null,
    owner: null,
    expiresAt: null,
    createdAt: null,
  }
}

export function setAccessState(data: AccessToken) {
  localStorage.setItem('AccessToken', JSON.stringify(data))
}

export function clearAccessState() {
  localStorage.removeItem('AccessToken')
}

export const accessState = atom<AccessToken>(getAccessStateDefault())
