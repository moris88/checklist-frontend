import { atom } from 'jotai'

export const access_token = atom<{ token: string; username: string } | null>(
  null
)
