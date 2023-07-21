import { System } from '../types/global'

export const XAPIKEY = import.meta.env.VITE_XAPIKEY as string
export const SERVER_URL = import.meta.env.VITE_SERVER_URL as string
export const systemDefault: System[] = [
  {
    id: 1,
    userID: 9,
    projectID: 1,
    taskID: 1,
  },
]
