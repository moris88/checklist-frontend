const VITE_SERVER_URL =
  import.meta.env.VITE_SERVER_URL ?? 'http://localhost:5000'

export const SERVER_URL = `${VITE_SERVER_URL}/api/v1`
