import { AccessToken } from '../types/global'

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
